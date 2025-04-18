/**
 * 메인 애플리케이션 코드
 * 컴포넌트를 초기화하고 연결합니다
 */
import dataService from './DataWrapper.js';
import MapRenderer from './MapRenderer.js';
import BoothInfoDisplay from './BoothInfoDisplay.js';

class ZigzagMapApp {
  constructor() {
    this.dataService = dataService;
    this.mapRenderer = null;
    this.boothInfoDisplay = null;
    
    // 마지막 방문 부스 키
    this.lastVisitedBoothKey = 'lastVisitedBooth';
  }

  /**
   * 애플리케이션을 초기화합니다
   */
  async initialize() {
    console.log('지그재그 맵 애플리케이션을 초기화합니다...');
    
    // 데이터 로드
    await this.dataService.loadAllData();
    
    // 컴포넌트 초기화
    this.initializeComponents();
    
    // 이벤트 리스너 설정
    this.setupEventListeners();
    
    // 초기 상태 설정
    this.setupInitialState();
    
    console.log('애플리케이션 초기화가 완료되었습니다');
  }

  /**
   * 컴포넌트를 초기화합니다
   */
  initializeComponents() {
    // 맵 렌더러 초기화
    const mapContainer = document.getElementById('map-wrapper');
    this.mapRenderer = new MapRenderer(
      mapContainer, 
      (boothName) => this.handleBoothSelection(boothName)
    );
    
    // 맵 렌더링
    const mapTemplate = this.dataService.getMapTemplate();
    if (mapTemplate) {
      this.mapRenderer.render(mapTemplate);
    }
    
    // 부스 정보 디스플레이 초기화
    const infoContainer = document.querySelector('.info-panel');
    this.boothInfoDisplay = new BoothInfoDisplay(infoContainer);
  }

  /**
   * 이벤트 리스너를 설정합니다
   */
  setupEventListeners() {
    // 메인 타이틀 클릭 시 안내 정보 표시
    const mainTitle = document.getElementById('main-title');
    if (mainTitle) {
      mainTitle.addEventListener('click', () => {
        this.showBoothInfo('안내');
      });
    }
    
    // 외부 링크 처리
    this.handleExternalLinks();
  }

  /**
   * 초기 상태를 설정합니다
   */
  setupInitialState() {
    // 마지막으로 방문한 부스 정보 불러오기
    const lastVisitedBooth = localStorage.getItem(this.lastVisitedBoothKey);
    
    if (lastVisitedBooth) {
      // 마지막으로 방문한 부스 정보 표시
      this.showBoothInfo(lastVisitedBooth);
    } else {
      // 기본 안내 정보 표시
      this.showBoothInfo('안내');
    }
  }

  /**
   * 부스 선택 처리
   * @param {string} boothName 선택된 부스 이름
   */
  handleBoothSelection(boothName) {
    this.showBoothInfo(boothName);
    this.saveLastVisitedBooth(boothName);
  }

  /**
   * 부스 정보를 표시합니다
   * @param {string} boothName 부스 이름
   */
  showBoothInfo(boothName) {
    // 데이터 서비스에서 부스 정보 가져오기
    const boothInfo = this.dataService.getBoothInfo(boothName);
    
    if (!boothInfo) {
      console.warn(`'${boothName}' 부스 정보를 찾을 수 없습니다`);
      return;
    }
    
    // 안내 정보일 경우 부스 선택 상태 초기화
    if (boothName === '안내' && this.mapRenderer) {
      this.mapRenderer.clearSelection();
    } else if (this.mapRenderer) {
      // 아닐 경우 맵에서 해당 부스 선택
      this.mapRenderer.selectBoothByName(boothName);
    }
    
    // 부스 정보 표시
    if (this.boothInfoDisplay) {
      this.boothInfoDisplay.displayBoothInfo(boothName, boothInfo);
    }
  }

  /**
   * 마지막으로 방문한 부스를 저장합니다
   * @param {string} boothName 부스 이름
   */
  saveLastVisitedBooth(boothName) {
    if (boothName !== '안내') {
      localStorage.setItem(this.lastVisitedBoothKey, boothName);
    }
  }

  /**
   * 외부 링크 처리를 설정합니다
   */
  handleExternalLinks() {
    // 모든 소셜 미디어 링크 요소 가져오기
    const socialLinks = document.querySelectorAll('.social-links a');
    
    // 각 링크에 대해 처리
    socialLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // 링크 유형에 따라 앱 스키마 또는 유니버설 링크 적용
        if (href) {
          // 인스타그램 링크 처리
          if (href.includes('instagram.com')) {
            const instaPath = href.split('instagram.com/')[1];
            // 인스타그램 앱 스키마로 시도
            const instaAppUrl = `instagram://user?username=${instaPath}`;
            
            // 앱 열기 시도
            this.tryOpenApp(e, instaAppUrl, href);
          } 
          // 카카오톡 링크 처리
          else if (href.includes('pf.kakao.com')) {
            const kakaoId = href.split('pf.kakao.com/')[1];
            // 카카오톡 채널 앱 스키마로 시도
            const kakaoAppUrl = `kakaoplus://plusfriend/home/${kakaoId}`;
            
            // 앱 열기 시도
            this.tryOpenApp(e, kakaoAppUrl, href);
          }
        }
      });
    });
  }

  /**
   * 앱으로 열기 시도
   * @param {Event} event 이벤트 객체
   * @param {string} appUrl 앱 URL 스키마
   * @param {string} webUrl 웹 URL
   */
  tryOpenApp(event, appUrl, webUrl) {
    // 모바일 디바이스 확인
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // 기본 이벤트 방지
      event.preventDefault();
      
      // 히든 iframe 생성
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = appUrl;
      document.body.appendChild(iframe);
      
      // 타임아웃 설정 - 앱이 없으면 웹으로 이동
      setTimeout(() => {
        document.body.removeChild(iframe);
        window.location.href = webUrl;
      }, 500);
    }
    // 모바일이 아닌 경우 기본 웹 링크로 처리
  }
}

// 애플리케이션 인스턴스 생성 및 내보내기
const app = new ZigzagMapApp();
export default app;

// 페이지 로드 시 애플리케이션 초기화
document.addEventListener('DOMContentLoaded', () => {
  app.initialize().catch(error => {
    console.error('애플리케이션 초기화 중 오류 발생:', error);
  });
}); 