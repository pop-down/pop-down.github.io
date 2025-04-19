// config.js에서 설정 가져오기
import { APP_VERSION, APP_CONFIG, UPDATE_HISTORY } from './config.js';

// 전역 변수 설정
window.UPDATE_HISTORY = UPDATE_HISTORY;
window.APP_VERSION = APP_VERSION;
window.APP_CONFIG = APP_CONFIG;
console.log('모듈에서 로드된 UPDATE_HISTORY:', UPDATE_HISTORY);

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

// URL 해시 빌드 함수
function buildUrlHash(state) {
  const newHash = Object.entries(state)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&');
  
  return newHash ? `#${newHash}` : '';
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
  // 상태 객체에 실제 데이터를 포함시켜 브라우저 이력이 제대로 작동하도록 함
  window.history.pushState(
    { [state]: value, timestamp: new Date().getTime() },   // 상태 객체
    document.title,                                        // 타이틀
    newHash ? `#${newHash}` : window.location.pathname    // URL
  );
  
  // 디버깅 메시지
  console.log(`히스토리 엔트리 추가: ${state}=${value}, URL=${window.location.href}`);
}

// 현재 활성화된 부스 정보 초기화
function resetActiveBoothInfo() {
  const boothInfoElement = document.getElementById('booth-info');
  const defaultInfoElement = document.getElementById('default-info');
  
  // 기본 정보 표시
  boothInfoElement.style.display = 'none';
  defaultInfoElement.style.display = 'block';
  
  // 모든 부스 강조 효과 제거
  document.querySelectorAll('.booth-wrapper').forEach(booth => {
    booth.classList.remove('selected');
  });
}

// 다시 탐색할 때(예: 뒤로가기/앞으로가기) 상태 복원
window.handleHistoryNavigation = function(passedState) {
  // 상태 객체 가져오기
  let state = passedState;
  
  // 전달된 상태가 없으면 URL 해시에서 파싱
  if (!state) {
    state = parseUrlHash();
  }
  
  // 디버깅 메시지
  console.log('탐색 상태 복원:', state);
  
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
        '<div style="line-height: 1.6em; margin-bottom: 10px;">부스를 택하세요</div>',
      ]
    },
    // 여기에 만약 더 많은 부스 정보가 있다면 추가하세요
'아이오페': {
      instagram: 'https://www.instagram.com/iope_official/',
      kakaotalk: 'https://pf.kakao.com/_Bqfxes',
      coupang: 'N',
      instagram_enable: false,
      kakaotalk_enable: true,
      copyCode: '#쿠팡뷰티 #메가뷰티쇼 #아이오페 @iope_official',
      images: ['https://i.imgur.com/5slkw7v.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">플친 👉🏻 핀볼게임(미니)</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">업로드 👉🏻 추첨(4/21~) 본품 증정(비타민C 40%) </div>'
      ]
    },
    '닥터자르트': {
      instagram: 'https://www.instagram.com/drjart_kr/',
      kakaotalk: 'https://pf.kakao.com/_UTxfuE',
      coupang: 'https://www.coupang.com/np/products/brand-shop?brandName=%EB%8B%A5%ED%84%B0%EC%9E%90%EB%A5%B4%ED%8A%B8',
      instagram_enable: false,
      kakaotalk_enable: true,
      copyCode: '#쿠팡뷰티#메가뷰티쇼#닥터자르트',
      images: ['https://i.imgur.com/b0H0Uni.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">플친 + 브랜드샵 + 게시물 👉🏻 게임, 본품증정(한정) </div>'
      ]
    },
    '에스쁘아': {
      instagram: 'https://www.instagram.com/espoir_makeup/',
      kakaotalk: 'https://pf.kakao.com/_BEpRZ',
      coupang: 'N',
      instagram_enable: true,
      kakaotalk_enable: true,
      copyCode: '@espoir_makeup #쿠팡메가뷰티쇼',
      images: ['https://i.imgur.com/f3gmPfA.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">팔로우 + 플친 👉🏻 샘플</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">팔로우 + 플친 + 스토리/피드 👉🏻 가챠 (대부분 미니사이즈 같음)</div>'
      ]
    },
    '에뛰드': {
      instagram: 'https://www.instagram.com/etudeofficial/',
      kakaotalk: 'https://pf.kakao.com/_FRxjxfR',
      coupang: 'N',
      instagram_enable: true,
      kakaotalk_enable: false,
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
      instagram_enable: true,
      kakaotalk_enable: false,
      copyCode: '#쿠팡뷰티 #쿠팡메가뷰티쇼 #더페이스샵 #잉크파데 @thefaceshop.official',
      images: ['https://i.imgur.com/L61rquE.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">1. 팔로우 + <font color="blue">스토리</font> 업로드 👉🏻 향수 미니어처</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">2. 쿠션 꾸미기 👉🏻 럭드</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">3. 쿠션 타워 게임 👉🏻 등수별 사은품</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">현장구매 시 증정품</div>'
      ]
    },
    '지베르니': {
      instagram: 'https://www.instagram.com/giverny_korea/',
      kakaotalk: 'https://pf.kakao.com/_LHxbXxl',
      coupang: 'N',
      instagram_enable: true,
      kakaotalk_enable: true,
      copyCode: '#쿠팡뷰티 #메가뷰티쇼 #지베르니 @giverny_korea',
      images: ['https://i.imgur.com/hqT9mPv.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">팔로우 + 게시물 업로드 👉🏻 두더지 게임 (본품)</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">플친 👉🏻 신문네컷</div>'
      ]
    },
    '닥터지': {
      instagram: 'https://www.instagram.com/dr.g_official/',
      kakaotalk: 'https://pf.kakao.com/_HuEsE',
      coupang: 'N',
      instagram_enable: true,
      kakaotalk_enable: false,
      copyCode: '@dr.g_official #닥터지 #쿠팡뷰티 #메가뷰티쇼',
      images: ['https://i.imgur.com/sWH9q9c.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">팔로우 + 업로드 👉🏻 뽑기</div>'
      ]
    },
    'AHC': {
      instagram: 'https://www.instagram.com/ahc.official/',
      kakaotalk: 'https://pf.kakao.com/_ermfl',
      coupang: 'N',
      instagram_enable: true,
      kakaotalk_enable: true,
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
      instagram_enable: false,
      kakaotalk_enable: true,
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
      instagram_enable: true,
      kakaotalk_enable: true,
      copyCode: '#쿠팡뷰티 #메가뷰티쇼 #웰라쥬 @wellage.official',
      images: ['https://i.imgur.com/NNKDDr5.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">팔로우 + 플친 👉🏻 체험권+체험키트</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">게시물 업로드 👉🏻 웰라쥬 마스크</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">덕력고사 게임 (럭드)</div>'
      ]
    },
    '토니모리': {
      instagram: 'https://www.instagram.com/tonymoly/',
      kakaotalk: 'https://pf.kakao.com/_AcKrI',
      coupang: 'N',
      instagram_enable: true,
      kakaotalk_enable: true,
      copyCode: '@tonymoly #쿠팡뷰티 #메가뷰티쇼 #토니모리 #tonymoly',
      images: ['https://i.imgur.com/GqjdWds.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">인스타 팔로우 + 게시물 업로드 👉🏻 게임 (미니제품)</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">틱톡 팔로우 👉🏻 추가 기회</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">플친 👉🏻 추가 기회</div>'
      ]
    },
    '아벤느': {
      // instagram: 'https://www.instagram.com/avenekorea/',
      kakaotalk: 'https://pf.kakao.com/_VGFXxl',
      coupang: 'https://www.coupang.com/np/products/brand-shop?brandName=%EC%95%84%EB%B2%A4%EB%8A%90',
      instagram: 'https://www.instagram.com/',
      instagram_enable: false,
      kakaotalk_enable: true,
      copyCode: '#아벤느 #시칼파트 #쿠팡뷰티 #메가뷰티쇼',
      images: ['https://i.imgur.com/NjRpYnI.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">플친 + 브랜드샵 + 업로드 👉🏻 핀볼 게임</div>'
      ]
    },
    '메디힐': {
      instagram: 'https://www.instagram.com/mediheal_official/',
      kakaotalk: 'https://pf.kakao.com/_zueIxd',
      coupang: 'N',
      instagram_enable: false,
      kakaotalk_enable: true,
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
      instagram_enable: false,
      kakaotalk_enable: false,
      copyCode: '#쿠팡뷰티 #메가뷰티쇼 #CNP',
      images: ['https://i.imgur.com/1ayAJsT.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">업로드 👉🏻 가챠</div>',
        '<div style="line-height: 1.6em; margin-bottom: 10px;">종이백 증정(뷰티박스에 딱맞아요!) </div>'
      ]
    },
    '스킨푸드': {
      instagram: 'https://www.instagram.com/skinfood_official/',
      kakaotalk: 'https://pf.kakao.com/_pUUqR',
      coupang: 'N',
      instagram_enable: false,
      kakaotalk_enable: true,
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
      instagram_enable: false,
      kakaotalk_enable: false,
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
      instagram_enable: true,
      kakaotalk_enable: true,
      copyCode: '#쿠팡뷰티 #메가뷰티쇼 #레스노베 @resnovae_official',
      images: ['https://i.imgur.com/zeIV7RS.jpeg'],
      notes: [
        '<div style="line-height: 1.6em; margin-bottom: 10px;">팔로우/플친 택일 👉🏻 에어볼이벤트</div>',
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
  
  // SVG 부스 요소 업데이트
  const boothSvgElement = document.querySelector(`.booth-wrapper[data-name="${boothName}"]`);
  if (boothSvgElement) {
    boothSvgElement.classList.toggle('visited', visited);
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

// 부스 정보 표시 함수
window.showBoothInfo = function(boothName) {
  // 현재 선택된 부스 정보 가져오기
  const currentState = parseUrlHash();
  const currentBooth = currentState[HISTORY_STATES.BOOTH];
  
  // 같은 부스를 선택한 경우 URL 해시 업데이트를 하지 않음
  if (currentBooth === boothName) {
    // 부스 데이터 가져오기
    const boothData = window.boothData[boothName];
    displayBoothInfo(boothName, boothData);
    return;
  }
  
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
  
  // 부스 데이터 가져오기
  const boothData = window.boothData[boothName];
  
  // 히스토리 상태 업데이트
  if (boothName !== '안내') {
    updateUrlHash(HISTORY_STATES.BOOTH, boothName);
  } else {
    updateUrlHash(HISTORY_STATES.BOOTH, null); // 안내 상태일 때는 부스 상태 제거
  }
  
  // 부스 정보 표시 함수 호출
  displayBoothInfo(boothName, boothData);
}

// 부스 정보 표시 내부 함수
function displayBoothInfo(boothName, boothData) {
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
      <span class="booth-title">${boothName}</span>
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
    // 인스타그램 링크 설정
    if (boothData.instagram) {
      instagramLink.href = boothData.instagram;
      instagramLink.style.display = 'flex';
      
      // instagram_enable 속성에 따라 스타일 적용
      const instagramIcon = instagramLink.querySelector('i');
      if (instagramIcon) {
        if (boothData.instagram_enable === false) {
          instagramIcon.style.color = '#999'; // 회색으로 표시
          instagramLink.style.opacity = '0.5';
          instagramLink.title = '인스타그램 (비활성화)';
        } else {
          instagramIcon.style.color = ''; // 기본 색상으로 복원
          instagramLink.style.opacity = '1';
          instagramLink.title = '인스타그램';
        }
      }
    } else {
      instagramLink.style.display = 'none';
    }
    
    // 카카오톡 링크 설정
    if (boothData.kakaotalk) {
      kakaotalkLink.href = boothData.kakaotalk;
      kakaotalkLink.style.display = 'flex';
      
      // kakaotalk_enable 속성에 따라 스타일 적용
      const kakaotalkIcon = kakaotalkLink.querySelector('i');
      if (kakaotalkIcon) {
        if (boothData.kakaotalk_enable === false) {
          kakaotalkIcon.style.color = '#999'; // 회색으로 표시
          kakaotalkLink.style.opacity = '0.5';
          kakaotalkLink.title = '카카오톡 (비활성화)';
        } else {
          kakaotalkIcon.style.color = ''; // 기본 색상으로 복원
          kakaotalkLink.style.opacity = '1';
          kakaotalkLink.title = '카카오톡';
        }
      }
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
    fixedContainer.appendChild(document.querySelector('.social-links').cloneNode(true));
    
    // 패널에 스크롤 영역과 고정 영역 추가
    boothInfoPanel.innerHTML = '';
    boothInfoPanel.appendChild(selectedBoothName);
    boothInfoPanel.appendChild(scrollContainer);
    
    // 고정 영역은 스크롤과 분리하여 직접 패널에 추가
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
    // 선택 상태만 제거하고 방문 상태는 유지
    booth.classList.remove('selected');
  });
  
  // 선택된 부스 강조 효과 추가
  const selectedBooth = document.querySelector(`.booth-wrapper[data-name="${boothName}"]`);
  if (selectedBooth) {
    selectedBooth.classList.add('selected');
    
    // 방문 상태 확인 및 유지
    const isVisited = window.isBoothVisited(boothName);
    if (isVisited) {
      selectedBooth.classList.add('visited');
    }
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
  // 현재 활성화된 탭 클래스 제거
  document.querySelectorAll('.tab-content').forEach(function(content) {
    content.classList.remove('active');
  });
  document.querySelectorAll('.tab-button').forEach(function(button) {
    button.classList.remove('active');
  });
  
  // 선택한 탭 활성화
  document.getElementById(tabId).classList.add('active');
  document.querySelector(`.tab-button[data-tab="${tabId}"]`).classList.add('active');
  
  // 맵 컨테이너 요소 및 토글 버튼 가져오기
  const mapContainer = document.getElementById('map-container');
  const toggleBtn = document.getElementById('map-toggle-btn');
  
  // 로컬 스토리지에서 맵 상태 불러오기
  const isCollapsed = localStorage.getItem('mapCollapsed') === 'true';
  console.log('탭 전환 - 저장된 맵 상태:', isCollapsed ? '접힘' : '펼침');
  
  // 선택한 탭이 지도 탭인지 확인하고 body 클래스 업데이트
  if (tabId === 'map') {
    document.body.classList.add('map-tab-active');
    
    // 지도 탭으로 변경 시 토글 버튼 상태 업데이트
    if (toggleBtn) {
      if (isCollapsed) {
        toggleBtn.classList.add('collapsed');
        toggleBtn.classList.remove('expanded');
        if (mapContainer) {
          mapContainer.classList.add('collapsed');
        }
      } else {
        toggleBtn.classList.add('expanded');
        toggleBtn.classList.remove('collapsed');
        if (mapContainer) {
          mapContainer.classList.remove('collapsed');
        }
      }
    }
  } else if (tabId === 'info') {
    // 정보 탭으로 변경 시
    document.body.classList.remove('map-tab-active');
    
    // 정보 탭에서는 로컬 스토리지 상태에 따라 지도 표시
    if (toggleBtn && mapContainer) {
      if (isCollapsed) {
        toggleBtn.classList.add('collapsed');
        toggleBtn.classList.remove('expanded');
        mapContainer.classList.add('collapsed');
      } else {
        toggleBtn.classList.add('expanded');
        toggleBtn.classList.remove('collapsed');
        mapContainer.classList.remove('collapsed');
      }
    }
  } else {
    // 다른 탭으로 변경 시
    document.body.classList.remove('map-tab-active');
    
    // 지도 탭이 아닌 경우 토글 버튼 collapsed 상태로 설정
    if (toggleBtn) {
      toggleBtn.classList.add('collapsed');
      toggleBtn.classList.remove('expanded');
    }
    
    // 지도 탭이 아닐 때는 지도 컨테이너 반드시 숨김
    if (mapContainer) {
      mapContainer.classList.add('collapsed');
    }
  }
  
  // 높이 재계산 및 레이아웃 조정
  if (window.updateMapContainerRatio) {
    window.updateMapContainerRatio();
  }
  
  if (window.adjustLayoutOnResize) {
    window.adjustLayoutOnResize(tabId);
  }
  
  // 로컬 스토리지에 탭 정보 저장
  localStorage.setItem('lastActiveTab', tabId);
  
  // URL 해시 업데이트
  const currentState = parseUrlHash();
  currentState[HISTORY_STATES.TAB] = tabId;
  const newHash = buildUrlHash(currentState);
  
  // 이력 상태 업데이트
  window.history.pushState(currentState, '', newHash);
  
  console.log(`탭 변경 완료: ${tabId}, URL 해시: ${newHash}`);
}

// 미니맵 탭 초기화 함수
window.initializeMapTab = function() {
  // 미니맵 컨테이너 가져오기
  const mapContainer = document.getElementById('map-container');
  
  // SVG 미니맵이 이미 존재하는지 확인
  const existingSvg = mapContainer.querySelector('svg');
  
  // 기존 "미니맵 정보가 없습니다" 메시지 제거
  const noMapInfoMessage = mapContainer.querySelector('div[style*="text-align: center"]');
  if (noMapInfoMessage) {
    noMapInfoMessage.remove();
  }
  
  // 정보 패널 초기화
  const boothInfoElement = document.getElementById('booth-info');
  const defaultInfoElement = document.getElementById('default-info');
  
  // 기본 정보 표시
  boothInfoElement.style.display = 'none';
  defaultInfoElement.style.display = 'block';
  
  // 기본 정보 내용 변경
  defaultInfoElement.innerHTML = '<div class="no-booth-selected">정보를 보기 원하는 부스를 택하세요</div>';
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
        window.showTab('info');
        
        // 맵 컨테이너 표시 (collapsed 제거)
        const mapContainer = document.getElementById('map-container');
        const toggleBtn = document.getElementById('map-toggle-btn');
        if (mapContainer) {
          mapContainer.classList.remove('collapsed');
          if (toggleBtn) {
            toggleBtn.classList.add('expanded');
            toggleBtn.classList.remove('collapsed');
          }
          localStorage.setItem('mapCollapsed', 'false');
          
          // info-panel 높이 재계산 및 레이아웃 조정
          if (window.updateMapContainerRatio) {
            window.updateMapContainerRatio();
          }
        }
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

// 업데이트 이력 토글 초기화
window.initializeUpdateHistoryToggle = function() {
  const updateHistoryToggle = document.querySelector('.update-history-toggle');
  const updateHistoryContent = document.querySelector('.update-history-content');
  const updateHistoryDisplay = document.getElementById('update-history-display');
  
  if (updateHistoryToggle && updateHistoryContent) {
    updateHistoryToggle.addEventListener('click', function() {
      this.classList.toggle('collapsed');
      if (updateHistoryContent.style.display === 'none' || updateHistoryContent.style.display === '') {
        updateHistoryContent.style.display = 'block';
        this.textContent = '▲';
        
        // 업데이트 이력 표시 - 토글 열때 표시
        if (updateHistoryDisplay) {
          if (typeof window.UPDATE_HISTORY !== 'undefined' && window.UPDATE_HISTORY) {
            console.log('업데이트 이력 표시:', window.UPDATE_HISTORY);
            window.displayUpdateHistory(window.UPDATE_HISTORY);
          } else if (typeof UPDATE_HISTORY !== 'undefined') {
            // 모듈에서 직접 임포트한 UPDATE_HISTORY 사용 시도
            console.log('모듈에서 직접 UPDATE_HISTORY 사용:', UPDATE_HISTORY);
            window.displayUpdateHistory(UPDATE_HISTORY);
          } else {
            console.error('업데이트 이력 데이터를 찾을 수 없습니다.');
            updateHistoryDisplay.innerHTML = '<p>업데이트 이력을 불러올 수 없습니다.</p>';
          }
        } else {
          console.error('업데이트 이력 표시 영역을 찾을 수 없습니다.');
        }
      } else {
        updateHistoryContent.style.display = 'none';
        this.textContent = '▼';
      }
    });
  } else {
    console.error('업데이트 이력 토글 또는 콘텐츠 영역을 찾을 수 없습니다.', {
      toggle: updateHistoryToggle,
      content: updateHistoryContent
    });
  }
}

// 업데이트 이력 표시 함수
window.displayUpdateHistory = function(updateHistory) {
  const updateHistoryDisplay = document.getElementById('update-history-display');
  if (!updateHistoryDisplay) {
    console.error('업데이트 이력 표시 영역을 찾을 수 없습니다.');
    return;
  }
  
  // 업데이트 이력 초기화
  updateHistoryDisplay.innerHTML = '';
  
  // 날짜순 정렬 (최신 항목이 먼저 오도록)
  const sortedHistory = [...updateHistory].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  
  // 이력 항목 추가
  sortedHistory.forEach(item => {
    const historyItem = document.createElement('div');
    historyItem.className = 'update-history-item';
    
    const dateVersion = document.createElement('div');
    dateVersion.className = 'update-history-date';
    dateVersion.textContent = `${item.date} (v${item.version})`;
    
    const description = document.createElement('div');
    description.className = 'update-history-description';
    description.textContent = item.description;
    
    historyItem.appendChild(dateVersion);
    historyItem.appendChild(description);
    updateHistoryDisplay.appendChild(historyItem);
  });
}

// 데이터 저장 안내 토글 초기화
window.initializeDataStorageToggle = function() {
  const dataStorageToggle = document.querySelector('.data-storage-toggle');
  const dataStorageContent = document.querySelector('.data-storage-content');
  
  if (dataStorageToggle && dataStorageContent) {
    dataStorageToggle.addEventListener('click', function() {
      this.classList.toggle('collapsed');
      if (dataStorageContent.style.display === 'none' || dataStorageContent.style.display === '') {
        dataStorageContent.style.display = 'block';
        this.textContent = '▲';
      } else {
        dataStorageContent.style.display = 'none';
        this.textContent = '▼';
      }
    });
  }
}

// DOM이 로드된 후 초기화 함수들 실행
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

  console.log('페이지 초기화: 지도를 접힌 상태로 설정');
  
  // 새로고침 시 무조건 지도 접힌 상태로 설정
  const mapContainer = document.getElementById('map-container');
  const toggleBtn = document.getElementById('map-toggle-btn');
  
  // 지도 상태를 접힌 상태로 강제 설정
  if (mapContainer && toggleBtn) {
    // 지도 접기
    mapContainer.classList.add('expanded');
    toggleBtn.classList.add('expanded');
    toggleBtn.classList.remove('collapsed');
    
    // 로컬 스토리지에 접힌 상태로 저장
    localStorage.setItem('mapCollapsed', 'false');
    
    // 레이아웃 높이 재계산
    if (window.updateMapContainerRatio) {
      window.updateMapContainerRatio();
    }
  }
  
  // 맵 토글 버튼 초기화 함수 호출
  if (window.initializeMapToggleButton) {
    window.initializeMapToggleButton();
  }
  
  // 레이아웃 강제 조정 (맵 표시 상태 반영)
  setTimeout(function() {
    if (window.adjustLayoutOnResize) {
      window.adjustLayoutOnResize();
    }
  }, 100);
  
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
  
  // URL 해시에서 초기 상태 복원 - 초기 탭 설정은 나중에 처리하므로 지금은 하지 않음
  // window.handleHistoryNavigation(); - 주석 처리
  
  // 뒤로가기/앞으로가기 이벤트 처리
  window.addEventListener('popstate', function(event) {
    // 디버깅 메시지
    console.log('Popstate 이벤트 발생:', event.state, window.location.hash);
    
    // event.state에 유효한 데이터가 있으면 그 값을 사용
    // 없으면 URL 해시 파싱
    window.handleHistoryNavigation(event.state);
  });
  
  // info-panel과 map-container 레이아웃 고정
  setupFixedLayout();
  
  // 부스 데이터 로드
  fetch('data/booths.json?v=' + APP_CONFIG.version)
    .then(response => response.json())
    .then(data => {
      
      // 부스 데이터
      window.boothData = data;
      
      // 탭 초기화
      if (window.initializeTabs) {
        window.initializeTabs();
      }
      
      // 부스 목록 초기화
      if (window.initializeBoothList) {
        window.initializeBoothList();
      }
      
      // 업데이트 기록 토글 초기화
      window.initializeUpdateHistoryToggle();
      
      // 데이터 저장 안내 토글 초기화
      window.initializeDataStorageToggle();
      
      // URL 해시 파싱
      const state = parseUrlHash();
      const tabState = state[HISTORY_STATES.TAB];
      const boothState = state[HISTORY_STATES.BOOTH];
      
      console.log('URL 해시 기반 탭 상태:', tabState);
      console.log('URL 해시 기반 부스 상태:', boothState);
      
      // 최종 탭 활성화 처리
      // URL에 탭 정보가 있으면 최우선 적용
      if (tabState) {
        console.log('URL 해시 기반으로 탭 활성화:', tabState);
        showTab(tabState);
      }
      // URL에 탭 정보가 없고, 부스 정보도 없으며, 로컬 스토리지에 탭 정보가 있는 경우
      else if (!boothState) {
        const lastActiveTab = localStorage.getItem('lastActiveTab');
        if (lastActiveTab) {
          console.log('로컬 스토리지 기반으로 탭 활성화:', lastActiveTab);
          showTab(lastActiveTab);
        } else {
          // 기본 탭 활성화 (지도 탭)
          console.log('기본 탭(map) 활성화');
          showTab('map');
        }
      }
      
      // 앱 버전 표시
      const appVersionElement = document.getElementById('app-version');
      if (appVersionElement) {
        appVersionElement.textContent = 'Ver ' + APP_CONFIG.version + ' ' + APP_CONFIG.date;
      }
      
      // 지도 탭 초기화
      initializeMapTab();
      
      // URL에 부스 정보가 있으면 해당 부스 선택
      if (boothState) {
        selectBooth(boothState);
      }
      
      // SVG 부스 요소에 방문 상태 적용
      const visitedBooths = window.getVisitedBooths();
      if (visitedBooths) {
        Object.keys(visitedBooths).forEach(boothName => {
          if (visitedBooths[boothName]) {
            const boothSvgElement = document.querySelector(`.booth-wrapper[data-name="${boothName}"]`);
            if (boothSvgElement) {
              boothSvgElement.classList.add('visited');
            }
          }
        });
      }
    });
});

// 고정 레이아웃 설정 함수
function setupFixedLayout() {
  const mapContainer = document.getElementById('map-container');
  const infoPanel = document.getElementById('info-panel');
  const boothInfo = document.getElementById('booth-info');
  const defaultInfo = document.getElementById('default-info');
  
  if (mapContainer && infoPanel) {
    // 맵 컨테이너 비율 계산 및 적용
    updateMapContainerRatio();
    
    // 스타일 요소 생성
    const style = document.createElement('style');
    style.textContent = `
      #info-panel {
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
      }
      
      #booth-info, #default-info {
        height: 100%;
        overflow: hidden;
        position: relative;
      }
      
      .info-panel-scroll {
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--main-pink) #f0f0f0;
      }
      
      .info-panel-scroll::-webkit-scrollbar {
        width: 6px;
      }
      
      .info-panel-scroll::-webkit-scrollbar-thumb {
        background-color: var(--main-pink);
        border-radius: 3px;
      }
      
      .info-panel-scroll::-webkit-scrollbar-track {
        background: #f0f0f0;
        border-radius: 3px;
      }
    `;
    
    // 스타일 요소 추가
    document.head.appendChild(style);
    
    // adjustLayoutOnResize 호출
    adjustLayoutOnResize();
    
    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', adjustLayoutOnResize);
  }
}

// 윈도우 크기 변경 시 레이아웃 조정
window.adjustLayoutOnResize = function(forceTabId) {
  // 맵 컨테이너 비율 계산 및 업데이트
  updateMapContainerRatio();
  
  // SVG 지도 스케일 및 위치 조정
  adjustMapScale();
  
  // 맵 컨테이너 크기와 탭 콘텐츠 크기 조정
  const mapContainer = document.getElementById('map-container');
  if (mapContainer) {
    // 현재 사용할 탭 ID 결정 (우선순위: 강제 탭 ID > URL 해시 > DOM 활성 탭)
    let currentTabId;
    
    if (forceTabId) {
      // 함수 호출 시 전달된 탭 ID가 있으면 우선 사용
      currentTabId = forceTabId;
      console.log('강제 지정된 탭 ID 사용:', currentTabId);
    } else {
      // URL 해시에서 탭 정보 확인
      const urlState = parseUrlHash();
      const urlTabId = urlState[HISTORY_STATES.TAB];
      
      if (urlTabId) {
        // URL 해시에 탭 정보가 있으면 사용
        currentTabId = urlTabId;
        console.log('URL 해시에서 탭 ID 사용:', currentTabId);
      } else {
        // DOM에서 현재 활성화된 탭 찾기
        const activeTab = document.querySelector('.tab-button.active');
        currentTabId = activeTab ? activeTab.getAttribute('data-tab') : '';
        console.log('DOM 활성 탭 ID 사용:', currentTabId);
      }
    }
    
    // 지도 탭이 아닌 경우
    if (currentTabId !== 'info') {
      // 정보 탭일 경우 토글 버튼의 제어에 맡김 (현재 상태 유지)
    
        // 정보 탭이 아닌 다른 탭의 경우 맵 컨테이너 숨김
        console.log('다른 탭: 맵 컨테이너 숨김');
        if (!mapContainer.classList.contains('collapsed')) {
          mapContainer.classList.add('collapsed');
          // 맵이 접혔을 때 info-panel 높이 재계산
          updateMapContainerRatio();
        }
    } else {
      // 지도 탭인 경우 로컬 스토리지 설정에 따라 표시
      const isMapCollapsed = localStorage.getItem('mapCollapsed') === 'true';
      console.log('맵 탭: 저장된 상태에 따라 표시', isMapCollapsed ? '접힘' : '펼침');
      if (isMapCollapsed) {
        if (!mapContainer.classList.contains('collapsed')) {
          mapContainer.classList.add('collapsed');
        }
      } else {
        mapContainer.classList.remove('collapsed');
      }
    }
  }
}

// 지도 토글 버튼 초기화 함수
window.initializeMapToggleButton = function() {
  const mapContainer = document.getElementById('map-container');
  const toggleBtn = document.getElementById('map-toggle-btn');
  
  if (!toggleBtn) {
    console.error('지도 토글 버튼을 찾을 수 없습니다.');
    return;
  }
  
  // 초기 상태 설정 - 로컬스토리지에서 지도 접힘 상태 불러오기
  const isCollapsed = localStorage.getItem('mapCollapsed') === 'true';
  console.log('지도 초기 상태:', isCollapsed ? '접힘' : '펼침');
  
  // 버튼과 컨테이너 상태 동기화
  if (isCollapsed) {
    toggleBtn.classList.add('collapsed');
    toggleBtn.classList.remove('expanded');
    if (mapContainer) {
      mapContainer.classList.add('collapsed');
    }
  } else {
    toggleBtn.classList.add('expanded');
    toggleBtn.classList.remove('collapsed');
    if (mapContainer) {
      mapContainer.classList.remove('collapsed');
    }
  }
  
  // updateMapContainerRatio 호출하여 높이 재계산
  if (window.updateMapContainerRatio) {
    window.updateMapContainerRatio();
  }
  
  // URL 해시에서 탭 정보 가져오기
  const urlState = parseUrlHash();
  const urlTabId = urlState[HISTORY_STATES.TAB];
  console.log('URL 해시 탭 정보:', urlTabId);
  
  // 레이아웃 강제 조정 - URL 탭 정보 전달
  if (window.adjustLayoutOnResize) {
    window.adjustLayoutOnResize(urlTabId);
  }
  
  // 기존 이벤트 리스너 제거 (중복 이벤트 방지)
  toggleBtn.removeEventListener('click', toggleBtnClickHandler);
  
  // 버튼 클릭 이벤트 핸들러 함수
  function toggleBtnClickHandler(event) {
    console.log('지도 토글 버튼 클릭됨');
    
    // 현재 활성 탭 확인
    const currentActiveTab = document.querySelector('.tab-button.active').getAttribute('data-tab');
    console.log('현재 활성 탭:', currentActiveTab);
    
    // 현재 맵 탭이 아니면서 정보 탭도 아닌 경우 -> 정보 탭으로 이동 후 맵 확장
    if (currentActiveTab !== 'map' && currentActiveTab !== 'info') {
      console.log('다른 탭에서 정보 탭으로 이동');
      
      // 정보 탭으로 이동
      window.showTab('info');
      
      // 맵 컨테이너 열기 (collapsed 제거)
      const mapContainer = document.getElementById('map-container');
      if (mapContainer) {
        mapContainer.classList.remove('collapsed');
        toggleBtn.classList.add('expanded');
        toggleBtn.classList.remove('collapsed');
        localStorage.setItem('mapCollapsed', 'false');
      }
      
      // info-panel 높이 재계산과 레이아웃 조정
      if (window.updateMapContainerRatio) {
        window.updateMapContainerRatio();
      }
      
      if (window.adjustLayoutOnResize) {
        window.adjustLayoutOnResize('info');
      }
      return;
    }
    
    // 정보 탭인 경우 맵 컨테이너 토글
    if (currentActiveTab === 'info') {
      console.log('정보 탭에서 맵 토글');
      const mapContainer = document.getElementById('map-container');
      if (mapContainer) {
        if (mapContainer.classList.contains('collapsed')) {
          // 맵 펼치기
          mapContainer.classList.remove('collapsed');
          toggleBtn.classList.add('expanded');
          toggleBtn.classList.remove('collapsed');
          localStorage.setItem('mapCollapsed', 'false');
        } else {
          // 맵 접기
          mapContainer.classList.add('collapsed');
          toggleBtn.classList.add('collapsed');
          toggleBtn.classList.remove('expanded');
          localStorage.setItem('mapCollapsed', 'true');
        }
        
        // info-panel 높이 재계산을 위해 updateMapContainerRatio 호출
        if (window.updateMapContainerRatio) {
          window.updateMapContainerRatio();
        }
        
        // 레이아웃 조정
        if (window.adjustLayoutOnResize) {
          window.adjustLayoutOnResize('info');
        }
      }
      return;
    }
    
    // 맵 탭인 경우 기존 토글 기능 수행
    console.log('맵 토글 동작 수행:', mapContainer.classList.contains('collapsed') ? '펼치기' : '접기');
    if (mapContainer.classList.contains('collapsed')) {
      mapContainer.classList.remove('collapsed');
      toggleBtn.classList.add('expanded');
      toggleBtn.classList.remove('collapsed');
      localStorage.setItem('mapCollapsed', 'false');
    } else {
      mapContainer.classList.add('collapsed');
      toggleBtn.classList.add('collapsed');
      toggleBtn.classList.remove('expanded');
      localStorage.setItem('mapCollapsed', 'true');
    }
    
    // info-panel 높이 재계산을 위해 updateMapContainerRatio 호출
    if (window.updateMapContainerRatio) {
      window.updateMapContainerRatio();
    }
    
    // 레이아웃 조정
    if (window.adjustLayoutOnResize) {
      window.adjustLayoutOnResize('map');
    }
  }
  
  // 새 이벤트 리스너 등록
  toggleBtn.addEventListener('click', toggleBtnClickHandler);
  
  // 활성 탭이 변경될 때 아이콘 상태 업데이트
  document.querySelectorAll('.tab-button').forEach(button => {
    // 기존 이벤트 리스너 제거
    button.removeEventListener('click', tabButtonClickHandler);
    
    // 탭 버튼 클릭 이벤트 핸들러
    function tabButtonClickHandler() {
      // 탭이 맵이 아닌 경우 아이콘 상태 업데이트
      const tabId = this.getAttribute('data-tab');
      if (tabId !== 'map') {
        toggleBtn.classList.add('collapsed');
        toggleBtn.classList.remove('expanded');
      } else {
        // 맵 탭에서는 저장된 상태에 따라 표시
        const isMapCollapsed = localStorage.getItem('mapCollapsed') === 'true';
        if (isMapCollapsed) {
          toggleBtn.classList.add('collapsed');
          toggleBtn.classList.remove('expanded');
        } else {
          toggleBtn.classList.add('expanded');
          toggleBtn.classList.remove('collapsed');
        }
      }
      
      // info-panel 높이 재계산을 위해 updateMapContainerRatio 호출
      updateMapContainerRatio();
      
      // 레이아웃 조정
      adjustLayoutOnResize(tabId);
    }
    
    // 새 이벤트 리스너 등록
    button.addEventListener('click', tabButtonClickHandler);
  });
}

// 맵 컨테이너 비율 업데이트
window.updateMapContainerRatio = function() {
  const mapContainer = document.getElementById('map-container');
  const mapWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--map-width'));
  const mapHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--map-height'));
  
  if (mapContainer) {
    // 맵 컨테이너 비율 계산
    const mapRatio = mapHeight / mapWidth;
    document.documentElement.style.setProperty('--map-ratio', mapRatio);
    
    // 맵 컨테이너가 접혀있는지 확인
    if (mapContainer.classList.contains('collapsed')) {
      // 맵이 접혀있으면 맵 컨테이너 높이를 0으로 설정
      document.documentElement.style.setProperty('--map-container-height', '0px');
    } else {
      // 맵이 펼쳐져 있으면 맵 컨테이너 높이를 계산해서 설정
      const mapContainerWidth = mapContainer.clientWidth;
      const calculatedHeight = mapContainerWidth * mapRatio;
      document.documentElement.style.setProperty('--map-container-height', `${calculatedHeight}px`);
    }
  }
}

// SVG 지도 스케일 및 위치 조정
function adjustMapScale() {
  const exhibitionMap = document.getElementById('exhibition-map');
  
  if (exhibitionMap) {
    // SVG 뷰박스 속성 조정
    // SVG가 컨테이너에 맞게 조정되도록 설정
    exhibitionMap.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  }
}