// config.js에서 설정 가져오기
import { APP_VERSION, APP_CONFIG, UPDATE_HISTORY } from './config.js';

// 히스토리 상태 관리를 위한 변수
const HISTORY_STATES = {
  TAB: 'tab',      // 현재 탭
  BOOTH: 'booth'   // 현재 선택된 부스
};

// URL 해시를 파싱하여 현재 상태 가져오기
function parseUrlHash() {
  const hash = window.location.hash.substring(1);
  const params = {};
  
  if (hash) {
    hash.split('&').forEach(param => {
      const [key, value] = param.split('=');
      if (key && value) {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      }
    });
  }
  
  return params;
}

// 상태를 URL 해시로 업데이트
function updateUrlHash(state, value) {
  const currentState = parseUrlHash();
  
  if (value) {
    currentState[state] = value;
  } else {
    delete currentState[state];
  }
  
  const newHash = Object.entries(currentState)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&');
  
  // 현재 URL에서 해시만 변경 (페이지 새로고침 없음)
  window.history.replaceState(null, document.title, newHash ? `#${newHash}` : window.location.pathname);
}

// 다시 탐색할 때(예: 뒤로가기/앞으로가기) 상태 복원
window.handleHistoryNavigation = function() {
  const state = parseUrlHash();
  
  // 탭 상태 복원
  if (state[HISTORY_STATES.TAB]) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
      if (button.getAttribute('data-tab') === state[HISTORY_STATES.TAB]) {
        // 기존 활성화 클래스 제거
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // 새 탭 활성화
        button.classList.add('active');
        document.getElementById(state[HISTORY_STATES.TAB]).classList.add('active');
      }
    });
  }
  
  // 부스 상태 복원
  if (state[HISTORY_STATES.BOOTH]) {
    window.showBoothInfo(state[HISTORY_STATES.BOOTH]);
  }
}

// 부스 정보 데이터베이스
// 이미 선언되었는지 확인하여 중복 선언 방지
if (typeof window.boothData === 'undefined') {
  window.boothData = {
    '안내': {
      coupang: 'N',
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">부스 검색 기능을 통해 부스를 택하세요</div>',
      ]
    },
    // 여기에 만약 더 많은 부스 정보가 있다면 추가하세요
'아이오페': {
      instagram: 'https://www.instagram.com/iope_official/',
      kakaotalk: 'https://pf.kakao.com/_Bqfxes',
      coupang: 'N',
      copyCode: '#쿠팡뷰티 #메가뷰티쇼 #아이오페 @iope_official',
      images: ['https://i.imgur.com/5slkw7v.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">플친 👉🏻 핀볼게임</div>'
      ]
    },
    '닥터자르트': {
      instagram: 'https://www.instagram.com/drjart_kr/',
      kakaotalk: 'https://pf.kakao.com/_UTxfuE',
      coupang: 'https://www.coupang.com/np/products/brand-shop?brandName=%EB%8B%A5%ED%84%B0%EC%9E%90%EB%A5%B4%ED%8A%B8',
      copyCode: '#쿠팡뷰티#메가뷰티쇼#닥터자르트',
      images: ['https://i.imgur.com/b0H0Uni.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">플친 + 브랜드샵 + 게시물 👉🏻 게임</div>'
      ]
    },
    '에스쁘아': {
      instagram: 'https://www.instagram.com/espoir_makeup/',
      kakaotalk: 'https://pf.kakao.com/_BEpRZ',
      coupang: 'N',
      copyCode: '@espoir_makeup #쿠팡메가뷰티쇼',
      images: ['https://i.imgur.com/f3gmPfA.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">팔로우 + 친추 👉🏻 샘플</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">팔로우 + 친추 + 스토리/피드 👉🏻 가챠</div>'
      ]
    },
    '에뛰드': {
      instagram: 'https://www.instagram.com/etudeofficial/',
      kakaotalk: 'https://pf.kakao.com/_FRxjxfR',
      coupang: 'N',
      copyCode: '@etudeofficial #메가뷰티쇼 #에뛰드 #클라우드필터쿠션',
      images: ['https://i.imgur.com/E6wmvl3.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">팔로우 + 피드 👉🏻 본품 (룩앤마이아이즈)</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">핸드스탭퍼 게임 👉🏻 성공시 본품(더블래스팅 파운데이션)</div>'
      ]
    },
    '더페이스샵': {
      instagram: 'https://www.instagram.com/thefaceshop.official/',
      kakaotalk: 'https://pf.kakao.com/_xisxdGR',
      coupang: 'N',
      copyCode: '#쿠팡뷰티#쿠팡메가뷰티쇼#더페이스샵#잉크파데',
      images: ['https://i.imgur.com/L61rquE.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">팔로우 + 스토리 업로드 👉🏻 향수 미니어처</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">쿠션 타워 게임 👉🏻 등수별 사은품</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">쿠션 꾸미기 👉🏻 럭드</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">현장구매 시 증정품</div>'
      ]
    },
    '지베르니': {
      instagram: 'https://www.instagram.com/giverny_korea/',
      kakaotalk: 'https://pf.kakao.com/_LHxbXxl',
      coupang: 'N',
      copyCode: '#쿠팡뷰티 #메가뷰티쇼 #지베르니',
      images: ['https://i.imgur.com/hqT9mPv.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">팔로우 + 게시물 업로드 👉🏻 두더지 잡기 게임</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">플친 👉🏻 신문네컷</div>'
      ]
    },
    '닥터지': {
      instagram: 'https://www.instagram.com/dr.g_official/',
      kakaotalk: 'https://pf.kakao.com/_HuEsE',
      coupang: 'N',
      copyCode: '@dr.g_official #닥터지 #쿠팡뷰티 #메가뷰티쇼',
      images: ['https://i.imgur.com/sWH9q9c.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">팔로우 + 업로드 👉🏻 뽑기 (시간걸림)</div>'
      ]
    },
    'AHC': {
      instagram: 'https://www.instagram.com/ahc.official/',
      kakaotalk: 'https://pf.kakao.com/_ermfl',
      coupang: 'N',
      copyCode: '#AHC #쿠팡뷰티 #메가뷰티쇼 #AHC쿠팡메가뷰티쇼 #SKINGAME_T_SHOT @ahc.official',
      images: ['https://i.imgur.com/BEc7U1N.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">선착순 50명 👉🏻 레드파우치백</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">팔로우 + 플친 + 업로드 👉🏻 공뽑기</div>'
      ]
    },
    '바닐라코': {
      instagram: 'https://www.instagram.com/banilaco_official/',
      kakaotalk: 'https://pf.kakao.com/_tsWfxd',
      coupang: 'N',
      copyCode: '#쿠팡뷰티 #메가뷰티쇼 #바닐라코',
      images: ['https://i.imgur.com/i0MIQtL.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">플친 + 업로드 + 퀴즈 👉🏻 룰렛</div>'
      ]
    },
    '웰라쥬': {
      instagram: 'https://www.instagram.com/wellage.official/',
      kakaotalk: 'https://pf.kakao.com/_qrEVxl',
      coupang: 'N',
      copyCode: '',
      images: ['https://i.imgur.com/NNKDDr5.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">팔로우 + 친추 👉🏻 체험권+체험키트</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">게시물 업로드 👉🏻 웰라쥬 마스크</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">덕력고사 게임</div>'
      ]
    },
    '토니모리': {
      instagram: 'https://www.instagram.com/tonymoly/',
      kakaotalk: 'https://pf.kakao.com/_AcKrI',
      coupang: 'N',
      copyCode: '@tonymoly #쿠팡뷰티 #메가뷰티쇼 #토니모리 #tonymoly',
      images: ['https://i.imgur.com/GqjdWds.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">인스타 팔로우 + 게시물 업로드 👉🏻 게임</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">틱톡 팔로우 👉🏻 추가 기회</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">플친 👉🏻 추가 기회</div>'
      ]
    },
    '아벤느': {
      // instagram: 'https://www.instagram.com/avenekorea/',
      kakaotalk: 'https://pf.kakao.com/_VGFXxl',
      coupang: 'https://www.coupang.com/np/products/brand-shop?brandName=%EC%95%84%EB%B2%A4%EB%8A%90',
      copyCode: '#아벤느 #시칼파트 #쿠팡뷰티 #메가뷰티쇼',
      images: ['https://i.imgur.com/NjRpYnI.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">플친 + 브랜드샵 + 업로드 👉🏻 핀볼임</div>'
      ]
    },
    '메디힐': {
      instagram: 'https://www.instagram.com/mediheal_official/',
      kakaotalk: 'https://pf.kakao.com/_zueIxd',
      coupang: 'N',
      copyCode: '#메디힐 #쿠팡 #쿠팡뷰티 #메가뷰티쇼 @mediheal_official',
      images: ['https://i.imgur.com/P8D6by2.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">플친 👉🏻 게임 (마스크팩 1-10매)</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">인증샷 👉🏻 마스크팩 1매</div>'
      ]
    },
    '차앤박': {
      instagram: 'https://www.instagram.com/cnplaboratory.official/',
      kakaotalk: 'https://pf.kakao.com/_pHuwd',
      coupang: 'N',
      copyCode: '#쿠팡뷰티 #메가뷰티쇼 #CNP',
      images: ['https://i.imgur.com/1ayAJsT.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">업로드 👉🏻 가챠</div>'
      ]
    },
    '스킨푸드': {
      instagram: 'https://www.instagram.com/skinfood_official/',
      kakaotalk: 'https://pf.kakao.com/_pUUqR',
      coupang: 'N',
      copyCode: '#스킨푸드 #쿠팡뷰티 #메가뷰티쇼',
      images: ['https://i.imgur.com/MaaudYR.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">플친 👉🏻 샘플3종 (블랙슈가마스크, 첫세럼, 클오)</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">인스타 업로드 👉🏻 미나리패드2매+마스크1매</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">인형푸기 게임</div>'
      ]
    },
    '아리얼': {
      instagram: 'https://www.instagram.com/ariul_official/',
      kakaotalk: 'https://pf.kakao.com/_KUsxjM',
      coupang: 'N',
      copyCode: '#쿠팡뷰티 #메가뷰티쇼 #아리얼',
      images: ['https://i.imgur.com/Sj8xrwR.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">피드 👉🏻 가챠</div>'
      ]
    },
    '레스노베': {
      instagram: 'https://www.instagram.com/resnovae_official/',
      kakaotalk: 'https://pf.kakao.com/_xbxoxowG',
      coupang: 'N',
      copyCode: '#쿠팡뷰티 #메가뷰티쇼 #레스노베',
      images: ['https://i.imgur.com/zeIV7RS.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">팔로우/친추 택일 👉🏻 에어볼이벤트</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">스토리/피드 👉🏻 본품 (제로 포어 필링 패드)</div>'
      ]
    }
  };
}

// 공지 팝업 관리 함수
window.handleNoticePopup = function() {
  const noticePopup = document.getElementById('notice-popup');
  const confirmBtn = document.getElementById('notice-confirm-btn');
  const noticeShownKey = 'noticeShown';
  
  // localStorage에서 공지 표시 여부 확인
  const noticeShown = localStorage.getItem(noticeShownKey);
  
  // 공지를 이미 본 적이 없으면 팝업 표시
  if (!noticeShown) {
    noticePopup.style.display = 'flex';
  }
  
  // 확인 버튼 클릭 시 처리
  confirmBtn.addEventListener('click', function() {
    // 공지 팝업 숨기기
    noticePopup.style.display = 'none';
    
    // localStorage에 공지 표시 완료 저장
    localStorage.setItem(noticeShownKey, 'true');
  });
}

// 부스 방문 상태 관리
const VISITED_BOOTHS_KEY = 'visitedBooths';

window.getVisitedBooths = function() {
  const visitedBooths = localStorage.getItem(VISITED_BOOTHS_KEY);
  return visitedBooths ? JSON.parse(visitedBooths) : {};
}

window.saveVisitedBooths = function(visitedBooths) {
  localStorage.setItem(VISITED_BOOTHS_KEY, JSON.stringify(visitedBooths));
}

window.toggleBoothVisit = function(boothName) {
  const visitedBooths = window.getVisitedBooths();
  visitedBooths[boothName] = !visitedBooths[boothName];
  window.saveVisitedBooths(visitedBooths);
  window.updateBoothVisitUI(boothName);
  window.sortBoothList();
  
  // 방문체크 라벨 재설정
  window.updateVisitCheckLabel();
}

window.isBoothVisited = function(boothName) {
  const visitedBooths = window.getVisitedBooths();
  return visitedBooths[boothName] || false;
}

window.updateBoothVisitUI = function(boothName) {
  const visited = window.isBoothVisited(boothName);
  
  // 토글 버튼 업데이트
  const toggleBtns = document.querySelectorAll(`[data-booth="${boothName}"] .visit-toggle`);
  toggleBtns.forEach(toggleBtn => {
    toggleBtn.classList.toggle('visited', visited);
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.style.color = visited ? 'white' : '';
    }
  });
  
  // 리스트 아이템 업데이트
  const listItems = document.querySelectorAll(`.booth-list-item[data-booth="${boothName}"]`);
  listItems.forEach(listItem => {
    listItem.classList.toggle('visited', visited);
  });
  
  // 부스 정보 패널의 토글 버튼 업데이트
  const boothInfoToggle = document.querySelector(`#selected-booth-name .visit-toggle`);
  if (boothInfoToggle) {
    boothInfoToggle.classList.toggle('visited', visited);
    const icon = boothInfoToggle.querySelector('i');
    if (icon) {
      icon.style.color = visited ? 'white' : '';
    }
  }
}

// 방문체크 라벨 업데이트 함수
window.updateVisitCheckLabel = function() {
  const boothList = document.querySelector('.booth-list');
  const listItems = boothList.querySelectorAll('.booth-list-item');
  
  // 모든 방문체크 라벨 제거
  listItems.forEach(item => {
    const checkLabel = item.querySelector('.visit-check-label');
    if (checkLabel) {
      checkLabel.remove();
    }
  });
  
  // 첫 번째 항목에 방문체크 라벨 추가
  if (listItems.length > 0) {
    const firstItem = listItems[0];
    const container = firstItem.querySelector('.booth-name');
    if (container) {
      const checkLabel = document.createElement('span');
      checkLabel.className = 'visit-check-label';
      checkLabel.textContent = '방문체크';
      
      // 부스 이름과 토글 버튼 사이에 삽입
      const nameSpan = container.querySelector('span');
      if (nameSpan) {
        nameSpan.after(checkLabel);
      } else {
        container.appendChild(checkLabel);
      }
    }
  }
}

// 부스 리스트 정렬 함수
window.sortBoothList = function() {
  const boothList = document.querySelector('.booth-list');
  const items = Array.from(boothList.children);
  
  items.sort((a, b) => {
    const aVisited = a.classList.contains('visited');
    const bVisited = b.classList.contains('visited');
    
    if (aVisited === bVisited) {
      return a.textContent.localeCompare(b.textContent);
    }
    return aVisited ? 1 : -1;
  });
  
  items.forEach(item => boothList.appendChild(item));
  
  // 정렬 후 방문체크 라벨 업데이트
  window.updateVisitCheckLabel();
}

// 나머지 필요한 함수들도 이와 같이 window 객체에 할당하세요

// 부스 정보 표시 함수
window.showBoothInfo = function(boothName) {
  // 부스 정보 패널 요소
  const boothInfoPanel = document.getElementById('booth-info');
  const defaultInfoPanel = document.getElementById('default-info');
  const selectedBoothName = document.getElementById('selected-booth-name');
  const eventList = document.getElementById('event-list');
  const eventsSectionContainer = document.getElementById('events-section-container');
  const instagramLink = document.getElementById('instagram-link');
  const kakaotalkLink = document.getElementById('kakaotalk-link');
  const coupangLink = document.getElementById('coupang-link');
  const additionalLinksContainer = document.getElementById('additional-links-container');
  const copyCodeContainer = document.getElementById('copy-code-container');
  const sectionsContainer = document.getElementById('sections-container');
  
  // 미니맵 정보가 없습니다 메시지 숨기기
  const mapContainer = document.getElementById('map-container');
  const noMapInfoMessage = mapContainer.querySelector('div[style*="text-align: center"]');
  if (noMapInfoMessage) {
    noMapInfoMessage.style.display = 'none';
  }
  
  // 부스 데이터 가져오기
  const boothData = window.boothData[boothName];
  
  // 히스토리 상태 업데이트
  if (boothName !== '안내') {
    updateUrlHash(HISTORY_STATES.BOOTH, boothName);
  } else {
    updateUrlHash(HISTORY_STATES.BOOTH, null); // 안내 상태일 때는 부스 상태 제거
  }
  
  // 부스 정보가 있으면 표시
  if (boothData) {
    // 기본 정보 패널 숨기기
    defaultInfoPanel.style.display = 'none';
    
    // 부스 정보 패널 표시
    boothInfoPanel.style.display = 'block';
    
    // 부스 이름 표시
    selectedBoothName.textContent = boothName;
    
    // 부스 이름 옆에 방문 토글 버튼 추가
    const boothNameElement = document.getElementById('selected-booth-name');
    boothNameElement.innerHTML = `
      <span>${boothName}</span>
      <button class="visit-toggle ${window.isBoothVisited(boothName) ? 'visited' : ''}" 
              onclick="window.toggleBoothVisit('${boothName}')">
        <i class="fas fa-check"></i>
      </button>
    `;
    
    // 이벤트 목록 초기화
    eventList.innerHTML = '';
    
    // 스크롤 영역 컨테이너 생성
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'info-panel-scroll';
    
    // 복사 코드가 있으면 표시
    if (boothData.copyCode) {
      copyCodeContainer.innerHTML = `
        <div class="copy-code-section" onclick="window.copyToClipboard('${boothData.copyCode.replace(/'/g, "\\'")}')
          .then(() => {
            const button = this.querySelector('.copy-code-button');
            button.textContent = '복사됨';
            setTimeout(() => button.textContent = '복사', 2000);
          })">
          <div class="copy-code-title">해시태그</div>
          <div class="copy-code-content">
            <div class="copy-code-text">
              ${boothData.copyCode}
            </div>
          </div>
          <button class="copy-code-button" onclick="event.stopPropagation(); window.copyToClipboard('${boothData.copyCode.replace(/'/g, "\\'")}')
            .then(() => {
              this.textContent = '복사됨';
              setTimeout(() => this.textContent = '복사', 2000);
            })">
            복사
          </button>
        </div>
      `;
    } else {
      copyCodeContainer.innerHTML = '';
    }
    
    // 이벤트가 있으면 표시
    if (boothData.notes && boothData.notes.length > 0) {
      // 이벤트 섹션 표시
      eventsSectionContainer.style.display = 'block';
      
      // 이벤트 목록에 이벤트 추가
      boothData.notes.forEach(event => {
        const li = document.createElement('li');
        li.className = 'event-list-item';
        li.innerHTML = event;
        eventList.appendChild(li);
      });
    } else {
      // 이벤트가 없으면 섹션 숨기기
      eventsSectionContainer.style.display = 'none';
    }
    
    // 기존 이미지 섹션 제거
    const existingImageSection = document.getElementById('images-section-container');
    if (existingImageSection) {
      existingImageSection.remove();
    }
    
    // 이미지 섹션 추가
    if (boothData.images && boothData.images.length > 0) {
      const imageSection = document.createElement('div');
      imageSection.className = 'booth-section';
      imageSection.id = 'images-section-container';
      
      const imageSectionContent = document.createElement('div');
      imageSectionContent.className = 'section-content';
      imageSectionContent.id = 'images-section';
      
      const imageContainer = document.createElement('div');
      imageContainer.className = 'booth-images';
      
      // 이미지 추가
      boothData.images.forEach((imageUrl, index) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'booth-image-wrapper';
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.className = 'booth-image';
        img.alt = `${boothName} 이미지 ${index + 1}`;
        img.onclick = () => window.showImageModal(imageUrl);
        
        imageWrapper.appendChild(img);
        imageContainer.appendChild(imageWrapper);
      });
      
      imageSectionContent.appendChild(imageContainer);
      imageSection.appendChild(imageSectionContent);
      sectionsContainer.appendChild(imageSection);
    }
    
    // 소셜 링크 설정
    if (boothData.instagram) {
      instagramLink.href = boothData.instagram;
      instagramLink.style.display = 'flex';
    } else {
      instagramLink.style.display = 'none';
    }
    
    if (boothData.kakaotalk) {
      kakaotalkLink.href = boothData.kakaotalk;
      kakaotalkLink.style.display = 'flex';
    } else {
      kakaotalkLink.style.display = 'none';
    }
    
    if (boothData.coupang && boothData.coupang !== 'N') {
      coupangLink.href = boothData.coupang;
      coupangLink.style.display = 'flex';
    } else {
      coupangLink.style.display = 'none';
    }
    
    // 추가 링크 설정
    additionalLinksContainer.innerHTML = '';
    
    // 스크롤 영역에 내용 추가
    scrollContainer.appendChild(copyCodeContainer);
    scrollContainer.appendChild(sectionsContainer);
    
    // 기존 스크롤 영역 제거
    const existingScrollContainer = boothInfoPanel.querySelector('.info-panel-scroll');
    if (existingScrollContainer) {
      existingScrollContainer.remove();
    }
    
    // 고정 영역 생성
    const fixedContainer = document.createElement('div');
    fixedContainer.className = 'info-panel-fixed';
    fixedContainer.appendChild(document.querySelector('.social-links'));
    
    // 패널에 스크롤 영역과 고정 영역 추가
    boothInfoPanel.innerHTML = '';
    boothInfoPanel.appendChild(selectedBoothName);
    boothInfoPanel.appendChild(scrollContainer);
    boothInfoPanel.appendChild(fixedContainer);
    
    // 부스 강조 효과
    window.highlightBooth(boothName);
  } else {
    // 부스 정보가 없으면 기본 정보 표시
    defaultInfoPanel.style.display = 'block';
    boothInfoPanel.style.display = 'none';
    
    // 부스 강조 효과 제거
    document.querySelectorAll('.booth-wrapper').forEach(booth => {
      booth.classList.remove('selected');
    });
  }
}

// 부스 강조 표시 함수
window.highlightBooth = function(boothName) {
  // 모든 부스 강조 효과 제거
  document.querySelectorAll('.booth-wrapper').forEach(booth => {
    booth.classList.remove('selected');
  });
  
  // 선택된 부스 강조 효과 추가
  const selectedBooth = document.querySelector(`.booth-wrapper[data-name="${boothName}"]`);
  if (selectedBooth) {
    selectedBooth.classList.add('selected');
  }
}

// 클립보드에 복사 함수
window.copyToClipboard = function(text) {
  // 텍스트 복사 함수
  return new Promise((resolve, reject) => {
    if (!navigator.clipboard) {
      // 구형 브라우저 지원
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        textArea.remove();
        resolve();
      } catch (err) {
        textArea.remove();
        reject(err);
      }
    } else {
      // 모던 브라우저
      navigator.clipboard.writeText(text)
        .then(resolve)
        .catch(reject);
    }
  });
}

// 마지막 방문 부스 저장 함수
window.saveLastVisitedBooth = function(boothName) {
  localStorage.setItem('lastVisitedBooth', boothName);
}

// 빈 부스 정보 로드 함수
window.loadEmptyBooth = function() {
  const boothInfoElement = document.getElementById('booth-info');
  const defaultInfoElement = document.getElementById('default-info');
  
  // 기본 정보 표시
  boothInfoElement.style.display = 'none';
  defaultInfoElement.style.display = 'block';
  
  // 마지막 방문 부스 정보 가져오기
  const lastVisitedBooth = localStorage.getItem('lastVisitedBooth');
  
  // 마지막 방문 부스가 있으면 해당 부스 정보 표시
  if (lastVisitedBooth && window.boothData[lastVisitedBooth]) {
    window.showBoothInfo(lastVisitedBooth);
    window.highlightBooth(lastVisitedBooth);
  } else {
    // 마지막 방문 부스가 없으면 안내 정보 표시
    window.showBoothInfo('안내');
  }
}

// 모든 섹션 토글 함수
window.toggleAllSections = function() {
  const sections = document.querySelectorAll('.booth-section');
  const toggleButton = document.getElementById('toggle-all-sections');
  
  // 모든 섹션이 열려있는지 확인
  let allOpen = true;
  sections.forEach(section => {
    if (section.style.display === 'none') {
      allOpen = false;
    }
  });
  
  // 모든 섹션 토글
  sections.forEach(section => {
    section.style.display = allOpen ? 'none' : 'block';
  });
  
  // 버튼 텍스트 변경
  toggleButton.textContent = allOpen ? '모두 펼치기' : '모두 접기';
}

// PWA 설치 프롬프트 처리 함수
window.handleInstallPrompt = function() {
  let deferredPrompt;
  
  // beforeinstallprompt 이벤트 처리
  window.addEventListener('beforeinstallprompt', (e) => {
    // 기본 동작 방지
    e.preventDefault();
    
    // 이벤트 저장
    deferredPrompt = e;
    
    // 설치 프롬프트 표시
    window.showInstallPrompt();
  });
  
  // 설치 버튼 클릭 이벤트
  const installButton = document.getElementById('pwa-install-btn');
  if (installButton) {
    installButton.addEventListener('click', () => {
      // 설치 프롬프트 숨기기
      window.hideInstallPrompt();
      
      // 설치 프롬프트 표시
      deferredPrompt.prompt();
      
      // 사용자 응답 처리
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('사용자가 PWA 설치를 수락했습니다.');
        } else {
          console.log('사용자가 PWA 설치를 거부했습니다.');
        }
        
        // 프롬프트 초기화
        deferredPrompt = null;
      });
    });
  }
  
  // 닫기 버튼 클릭 이벤트
  const closeButton = document.getElementById('pwa-close-btn');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      window.hideInstallPrompt();
    });
  }
}

// 설치 프롬프트 표시 함수
window.showInstallPrompt = function() {
  const promptElement = document.getElementById('pwa-install-prompt');
  if (promptElement) {
    promptElement.style.display = 'block';
  }
}

// 설치 프롬프트 숨기기 함수
window.hideInstallPrompt = function() {
  const promptElement = document.getElementById('pwa-install-prompt');
  if (promptElement) {
    promptElement.style.display = 'none';
  }
}

// PWA 환경 확인 함수
window.isPWAEnvironment = function() {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true;
}

// 디버그 로그 함수
window.debugLog = function(message, ...args) {
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' || 
      window.location.protocol === 'file:') {
    console.debug(message, ...args);
  }
}

// 일반 로그 함수
window.logMessage = function(message, ...args) {
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' || 
      window.location.protocol === 'file:') {
    console.log(message, ...args);
  }
}

// 앱 업데이트 처리 함수
window.handleAppUpdate = function() {
  // 업데이트 확인
  window.checkForUpdates();
  
  // 자산 URL에 버전 쿼리 추가
  window.addVersionQueryToAssets();
  
  // 새 버전 확인
  window.checkForNewVersion();
}

// 업데이트 확인 함수
window.checkForUpdates = function() {
  // 서비스 워커 등록
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => {
        // 업데이트 확인
        registration.update();
        
        // 업데이트 발견 시 처리
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          // 상태 변경 감지
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // 새 버전 사용 가능
              window.showUpdateNotification('새 버전이 있습니다. 새로고침하세요.');
            }
          });
        });
      })
      .catch(error => {
        console.error('서비스 워커 등록 실패:', error);
      });
  }
}

// 자산 URL에 버전 쿼리 추가 함수
window.addVersionQuery = function(url, version) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${version}`;
}

// 자산 URL에 버전 쿼리 추가 함수
window.addVersionQueryToAssets = function() {
  // 스크립트 및 스타일시트 요소 선택
  const scripts = document.querySelectorAll('script[src]');
  const styles = document.querySelectorAll('link[rel="stylesheet"]');
  
  // 버전 쿼리 추가
  scripts.forEach(script => {
    script.src = window.addVersionQuery(script.src, new Date().getTime());
  });
  
  styles.forEach(style => {
    style.href = window.addVersionQuery(style.href, new Date().getTime());
  });
}

// 새 버전 확인 함수
window.checkForNewVersion = function() {
  // 현재 버전
  const currentVersion = APP_VERSION.current;
  
  // 서버에서 최신 버전 확인
  fetch('./version.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('버전 정보를 가져올 수 없습니다');
      }
      return response.json();
    })
    .then(data => {
      if (data.version !== currentVersion) {
        // 새 버전 사용 가능
        window.showNewVersionBanner(data.version);
      }
    })
    .catch(error => {
      console.error('버전 확인 실패:', error);
      // 서버에서 버전을 가져올 수 없는 경우 config.js의 버전 사용
      if (APP_VERSION.latest !== currentVersion) {
        window.showNewVersionBanner(APP_VERSION.latest);
      }
    });
}

// 새 버전 배너 표시 함수
window.showNewVersionBanner = function(version) {
  // 배너 요소 생성
  const banner = document.createElement('div');
  banner.className = 'update-banner';
  banner.innerHTML = `
    <div class="update-banner-content">
      <div class="update-banner-message">
        <i class="fas fa-sync-alt"></i> 새 버전(${version})이 있습니다!
      </div>
      <div class="update-banner-buttons">
        <button class="update-button">업데이트</button>
        <button class="close-button">닫기</button>
      </div>
    </div>
  `;
  
  // 배너 추가
  document.body.appendChild(banner);
  
  // 업데이트 버튼 클릭 이벤트
  const updateButton = banner.querySelector('.update-button');
  updateButton.addEventListener('click', () => {
    window.updateApplication();
  });
  
  // 닫기 버튼 클릭 이벤트
  const closeButton = banner.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    window.hideUpdateNotification(banner);
  });
  
  // PWA 환경인 경우 PWA 업데이트 알림 표시
  if (window.isPWAEnvironment()) {
    window.showPWAUpdateNotification(version);
  }
}

// 업데이트 알림 표시 함수
window.showUpdateNotification = function(version) {
  // 알림 요소 생성
  const notification = document.createElement('div');
  notification.className = 'update-notification';
  notification.innerHTML = `
    <div class="update-notification-content">
      <div class="update-notification-message">
        <i class="fas fa-sync-alt"></i> 새 버전(${version})이 있습니다!
      </div>
      <div class="update-notification-buttons">
        <button class="update-button">업데이트</button>
        <button class="close-button">닫기</button>
      </div>
    </div>
  `;
  
  // 알림 추가
  document.body.appendChild(notification);
  
  // 업데이트 버튼 클릭 이벤트
  const updateButton = notification.querySelector('.update-button');
  updateButton.addEventListener('click', () => {
    window.updateApplication();
  });
  
  // 닫기 버튼 클릭 이벤트
  const closeButton = notification.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    window.hideUpdateNotification(notification);
  });
  
  // 5초 후 자동으로 닫기
  setTimeout(() => {
    window.hideUpdateNotification(notification);
  }, 5000);
}

// PWA 업데이트 알림 표시 함수
window.showPWAUpdateNotification = function(version) {
  // 알림 요소 생성
  const notification = document.createElement('div');
  notification.className = 'pwa-update-notification';
  notification.innerHTML = `
    <div class="pwa-update-notification-content">
      <div class="pwa-update-notification-message">
        <i class="fas fa-mobile-alt"></i> 새 버전(${version})이 있습니다! 앱을 업데이트하세요.
      </div>
      <div class="pwa-update-notification-buttons">
        <button class="update-button">업데이트</button>
        <button class="close-button">닫기</button>
      </div>
    </div>
  `;
  
  // 알림 추가
  document.body.appendChild(notification);
  
  // 업데이트 버튼 클릭 이벤트
  const updateButton = notification.querySelector('.update-button');
  updateButton.addEventListener('click', () => {
    // 앱 스토어로 이동
    window.location.href = 'https://apps.apple.com/app/id123456789';
  });
  
  // 닫기 버튼 클릭 이벤트
  const closeButton = notification.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    window.hideUpdateNotification(notification);
  });
  
  // 5초 후 자동으로 닫기
  setTimeout(() => {
    window.hideUpdateNotification(notification);
  }, 5000);
}

// 애플리케이션 업데이트 함수
window.updateApplication = function() {
  // 페이지 새로고침
  window.location.reload();
}

// 업데이트 알림 숨기기 함수
window.hideUpdateNotification = function(notification) {
  notification.style.opacity = '0';
  setTimeout(() => {
    notification.remove();
  }, 300);
}

// 주최 부스 확인 함수
window.isOrganizerBooth = function(boothName) {
  return boothName === '입구' || boothName === '출구' || boothName === '입장안내' || boothName === '투표';
}

// 외부 링크 처리 함수
window.handleExternalLinks = function() {
  // 모든 외부 링크 선택
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  
  // 각 링크에 이벤트 추가
  externalLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      // 링크 URL 가져오기
      const url = this.getAttribute('href');
      
      // 앱 URL 및 웹 URL 설정
      let appUrl = '';
      let webUrl = url;
      
      // 인스타그램 링크 처리
      if (url.includes('instagram.com')) {
        appUrl = `instagram://user?username=${url.split('instagram.com/')[1]}`;
      }
      
      // 카카오톡 링크 처리
      if (url.includes('pf.kakao.com')) {
        appUrl = url;
      }
      
      // 앱 URL이 있으면 앱 열기 시도
      if (appUrl) {
        event.preventDefault();
        window.tryOpenApp(event, appUrl, webUrl);
      }
    });
  });
}

// 앱 열기 시도 함수
window.tryOpenApp = function(event, appUrl, webUrl) {
  // 앱 열기 시도
  window.location.href = appUrl;
  
  // 앱이 열리지 않으면 웹 URL로 이동
  setTimeout(() => {
    window.location.href = webUrl;
  }, 1000);
}

// 부스 선택 함수
window.selectBooth = function(boothId) {
  // 부스 정보 가져오기
  const boothName = boothId;
  
  // 부스 정보 표시
  window.showBoothInfo(boothName);
  
  // 부스 강조 표시
  window.highlightBooth(boothName);
  
  // 최근 방문 부스 저장
  window.saveLastVisitedBooth(boothName);
  
  // 맵 탭으로 이동
  window.showTab('map');
}

// 탭 초기화 함수
window.initializeTabs = function() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // 각 탭 버튼에 클릭 이벤트 추가
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // 활성 탭 변경
      const tabId = this.getAttribute('data-tab');
      window.showTab(tabId);
      
      // 미니맵 탭 선택 시 초기화
      if (tabId === 'map') {
        window.initializeMapTab();
      }
    });
  });
}

// 탭 표시 함수
window.showTab = function(tabId) {
  // 모든 탭 버튼 비활성화
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active');
  });
  
  // 모든 탭 내용 숨기기
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  // 선택된 탭 버튼 활성화
  const selectedButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
  if (selectedButton) {
    selectedButton.classList.add('active');
  }
  
  // 선택된 탭 내용 표시
  const selectedContent = document.getElementById(tabId);
  if (selectedContent) {
    selectedContent.classList.add('active');
  }
  
  // 히스토리 상태 업데이트
  updateUrlHash(HISTORY_STATES.TAB, tabId);
}

// 미니맵 탭 초기화 함수
window.initializeMapTab = function() {
  // 미니맵 정보가 없습니다 메시지 표시
  const mapContainer = document.getElementById('map-container');
  mapContainer.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">미니맵 정보가 없습니다</div>';
  
  // 정보 패널 초기화
  const boothInfoElement = document.getElementById('booth-info');
  const defaultInfoElement = document.getElementById('default-info');
  
  // 기본 정보 표시
  boothInfoElement.style.display = 'none';
  defaultInfoElement.style.display = 'block';
  
  // 기본 정보 내용 변경
  defaultInfoElement.innerHTML = '<div class="no-booth-selected">부스 검색 기능을 통해 정보를 보기 원하는 부스를 택하세요</div>';
}

// 부스 리스트 초기화 함수
window.initializeBoothList = function() {
  const boothList = document.querySelector('.booth-list');
  const searchInput = document.querySelector('.search-input');
  
  // 부스 리스트 초기화
  boothList.innerHTML = '';
  
  // 부스 데이터베이스에서 부스 목록 생성
  Object.keys(window.boothData).forEach((boothName, index) => {
    if (boothName !== '안내') {
      const li = document.createElement('li');
      li.className = 'booth-list-item';
      li.setAttribute('data-booth', boothName);
      
      // 방문 상태에 따라 visited 클래스 추가
      if (window.isBoothVisited(boothName)) {
        li.classList.add('visited');
      }
      
      // 부스 이름과 토글 버튼을 포함하는 컨테이너 생성
      const container = document.createElement('div');
      container.className = 'booth-name';
      
      // 부스 이름 텍스트 추가
      const nameSpan = document.createElement('span');
      nameSpan.textContent = boothName;
      container.appendChild(nameSpan);
      
      // 방문체크 라벨 추가 (첫 번째 항목에만)
      if (index === 0) {
        const checkLabel = document.createElement('span');
        checkLabel.className = 'visit-check-label';
        checkLabel.textContent = '방문체크';
        container.appendChild(checkLabel);
      }
      
      // 방문 토글 버튼 추가
      const toggleBtn = document.createElement('button');
      toggleBtn.className = `visit-toggle ${window.isBoothVisited(boothName) ? 'visited' : ''}`;
      toggleBtn.innerHTML = '<i class="fas fa-check"></i>';
      toggleBtn.onclick = (e) => {
        e.stopPropagation();
        window.toggleBoothVisit(boothName);
      };
      
      container.appendChild(toggleBtn);
      li.appendChild(container);
      
      li.addEventListener('click', () => {
        // 부스 정보 표시
        window.showBoothInfo(boothName);
        
        // 부스 리스트에서 선택된 부스 강조
        document.querySelectorAll('.booth-list li').forEach(item => {
          item.classList.remove('selected');
        });
        li.classList.add('selected');
        
        // 정보 탭으로 이동
        window.showTab('map');
      });
      
      boothList.appendChild(li);
    }
  });
  
  // 검색 기능 추가
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    
    // 부스 리스트 필터링
    document.querySelectorAll('.booth-list li').forEach(li => {
      const boothName = li.getAttribute('data-booth').toLowerCase();
      const boothData = window.boothData[li.getAttribute('data-booth')];
      const instagramId = boothData.instagram ? 
        new URL(boothData.instagram).pathname.split('/')[1].toLowerCase() : '';
      
      if (boothName.includes(searchTerm) || instagramId.includes(searchTerm)) {
        li.style.display = 'block';
      } else {
        li.style.display = 'none';
      }
    });
  });
  
  // 부스 리스트 정렬
  window.sortBoothList();
  
  // 정렬 후 첫 번째 항목에 방문체크 라벨 추가
  const firstItem = boothList.querySelector('.booth-list-item');
  if (firstItem) {
    const container = firstItem.querySelector('.booth-name');
    if (container && !container.querySelector('.visit-check-label')) {
      const checkLabel = document.createElement('span');
      checkLabel.className = 'visit-check-label';
      checkLabel.textContent = '방문체크';
      
      // 부스 이름과 토글 버튼 사이에 삽입
      const nameSpan = container.querySelector('span');
      if (nameSpan) {
        nameSpan.after(checkLabel);
      } else {
        container.appendChild(checkLabel);
      }
    }
  }
}

// 이미지 모달 표시 함수
window.showImageModal = function(imageUrl) {
  // 모달 요소 생성
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  
  // 모달 내용 생성
  const modalContent = document.createElement('div');
  modalContent.className = 'image-modal-content';
  
  // 이미지 요소 생성
  const img = document.createElement('img');
  img.src = imageUrl;
  img.className = 'modal-image';
  
  // 닫기 버튼 생성
  const closeBtn = document.createElement('span');
  closeBtn.className = 'image-modal-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', function() {
    document.body.removeChild(modal);
  });
  
  // 모달 닫기 이벤트 (모달 외부 클릭 시)
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
  
  // 모달 내용에 요소 추가
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(img);
  modal.appendChild(modalContent);
  
  // 모달을 body에 추가
  document.body.appendChild(modal);
  
  // 모달 표시 애니메이션
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

// 업데이트 이력 관리 함수
window.handleUpdateHistory = function() {
  const toggleBtn = document.querySelector('.update-history-toggle');
  const contentDiv = document.querySelector('.update-history-content');
  const displayDiv = document.getElementById('update-history-display');
  
  // 업데이트 이력 토글
  toggleBtn.addEventListener('click', function() {
    if (contentDiv.style.display === 'none') {
      contentDiv.style.display = 'block';
      toggleBtn.textContent = '▲';
      window.displayUpdateHistory(UPDATE_HISTORY);
    } else {
      contentDiv.style.display = 'none';
      toggleBtn.textContent = '▼';
    }
  });
  
  // 업데이트 이력 표시 함수
  window.displayUpdateHistory = function(jsonData) {
    if (!Array.isArray(jsonData)) {
      displayDiv.innerHTML = '<p>업데이트 이력 형식이 올바르지 않습니다.</p>';
      return;
    }
    
    // 날짜 기준 내림차순 정렬
    jsonData.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    let html = '';
    
    jsonData.forEach(item => {
      html += `
        <div class="update-history-item">
          <div class="update-history-date">${item.date} - 버전 ${item.version}</div>
          <div class="update-history-description">${item.description}</div>
        </div>
      `;
    });
    
    displayDiv.innerHTML = html || '<p>업데이트 이력이 없습니다.</p>';
  }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  // 공지 팝업 처리
  window.handleNoticePopup();
  
  // PWA 설치 프롬프트 처리
  if (window.handleInstallPrompt) {
    window.handleInstallPrompt();
  }
  
  // 앱 업데이트 처리
  if (window.handleAppUpdate) {
    window.handleAppUpdate();
  }
  
  // 외부 링크 처리
  if (window.handleExternalLinks) {
    window.handleExternalLinks();
  }
  
  // 탭 초기화
  if (window.initializeTabs) {
    window.initializeTabs();
  }
  
  // 부스 리스트 초기화
  if (window.initializeBoothList) {
    window.initializeBoothList();
  }
  
  // 업데이트 이력 관리 초기화
  if (window.handleUpdateHistory) {
    window.handleUpdateHistory();
  }
  
  // 뒤로가기 버튼 추가
  const container = document.querySelector('.container');
  const backButton = document.createElement('button');
  backButton.className = 'back-button';
  backButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
  backButton.addEventListener('click', function() {
    window.history.back();
  });
  
  // 컨테이너 맨 앞에 뒤로가기 버튼 추가
  container.insertBefore(backButton, container.firstChild);
  
  // URL 해시에서 초기 상태 복원
  window.handleHistoryNavigation();
  
  // 뒤로가기/앞으로가기 이벤트 처리
  window.addEventListener('popstate', function() {
    window.handleHistoryNavigation();
  });
  
  // 초기 탭 설정 (URL 해시 기반 상태 복원 이후에 실행)
  const state = parseUrlHash();
  if (!state[HISTORY_STATES.TAB] && window.showTab) {
    window.showTab('guide');
  }
}); 