// 부스 정보 데이터베이스
const boothData = {
  '안내': {
    zigzag: 'Y',
    events: ['지그재그 즐겨찾기 메뉴 : 검색 ❌ <br>👉 <b>온라인 파우치</b> 메뉴 하단으로 들어가는것을 추천']
  },
  '잇퓨': {
    instagram: 'https://instagram.com/itpu',
    kakaotalk: 'https://pf.kakao.com/_xatQrs',
    zigzag: 'N',
    events: ['카카오톡 친구추가 👉 공뽑기 이벤트', '타임어택 (스쿱)']
  },
  '투에이엔': {
    instagram: 'https://instagram.com/2an_official',
    kakaotalk: 'https://pf.kakao.com/_sgHKT',
    zigzag: 'Y',
    copyCode: '@2an_official #투에이엔 #뮤트블룸컬렉션',
    events: ['오픈런 5명 👉 오션글로우 프레시 키트', '스토리 인증 👉 플러피 블러 틴트 증정', '즐겨찾기, 플친추가 👉 베어 플래시 글로스 증정', '모든 SNS 이벤트 참여👉 럭키드로우']
  },
  '태그': {
    instagram: 'https://instagram.com/tag_beauty',
    kakaotalk: 'https://pf.kakao.com/_tFTVn',
    zigzag: 'N',
    copyCode: '@tag_official_kr #태그 #지그재그 #지그재그뷰티페스타 #지그재그팝업 #태그틴트',
    events: ['팔로우 시 & 플친 추가 👉 샘플 증정', 'SNS 인증 👉 럭키드로우']
  },
  '에스네이처': {
    instagram: 'https://instagram.com/snature_official',
    kakaotalk: 'https://pf.kakao.com/_GeAxnl',
    zigzag: 'N',
    copyCode: '@s.nature @zigzag_korea #에스네이처팝업 #직잭팝업',
    events: ['플친추가 👉 시트마스크, 샘플', 'SNS 인증 👉 럭키드로우']
  },
  '에뛰드': {
    instagram: 'https://instagram.com/etude_official',
    zigzag: 'N',
    events: ['팔로우 👉 뽑기']
  },
  '베노프&얌얌프로틴': {
    kakaotalk: 'https://pf.kakao.com/_QQmNT',
    zigzag: 'Y',
    events: ['즐겨찾기 👉 럭키드로우', '단백질음료&바 시식', '플친 추가 👉 뽑기']
  },
  '에크멀': {
    kakaotalk: 'https://pf.kakao.com/_nxdlRxb',
    zigzag: 'N',
    copyCode: '@eckmal #에크멀 #지그재그팝업스토어',
    events: ['플친 & 팔로우 👉 꽃반지', '테스트 & 설문조사 👉 뽑기']
  },
  '무지개맨션': {
    instagram: 'https://www.instagram.com/muzigae_mansion/',
    zigzag: 'Y',
    events: ['플친추가, 즐겨찾기 👉 쿠션 공 쌓기']
  },
  '에스쁘아': {
    instagram: 'https://www.instagram.com/espoir_makeup/',
    kakaotalk: 'https://pf.kakao.com/_BEpRZ',
    zigzag: 'N',
    copyCode: '#에스쁘아 #지그재그 #뷰티페스타',
    events: ['팔로우, 플친추가 👉 SNS업로드 시 뽑기']
  },
  '몰바니': {
    instagram: 'https://www.instagram.com/molvany_official/',
    kakaotalk: 'https://pf.kakao.com/_HMdBb',
    zigzag: 'Y',
    events: ['즐겨찾기, 팔로우, 플친추가 👉 스쿱이벤트','타포린백 증정']
  },
  '릴리바이레드': {
    instagram: 'https://instagram.com/lilybyred_official',
    zigzag: 'Y',
    events: ['팔로우, 즐겨찾기 👉 럭드']
  },
  '달바': {
    // instagram: 'https://www.instagram.com/dalba_piedmont/',
    kakaotalk: 'https://pf.kakao.com/_xhxoWDxb',
    zigzag: 'Y',
    events: ['플친 추가 👉 공뽑기']
  },
  '삐아': {
    instagram: 'https://www.instagram.com/bbia.official/',
    zigzag: 'Y',
    events: ['팔로우 & 즐겨찾기 👉 공던지기', 'SNS 작성 이벤트:추첨']
  },
  '입구': {
    zigzag: 'Y',
    events: ['팜플렛 및 종이가방 증정','지그재그 앱 설치 확인']
  },
  '입장안내': {
    events: ['게임 : 요아정 쿠폰', '종이 팜플렛 👉 도장']
  },
  '투표': {
    events: ['투표 👉 샘플 증정']
  },
  '출구': {
    zigzag: 'Y',
    events: ['요아정 쿠폰 (핑크색 코인 안받았으면 요청)', '스쿱 등(앱 👉 온라인파우치 아무거나 담기, 종이 팜플렛 준비)', '웜/쿨톤 퍼담기까지 하고 나갈 때 👉 흰색 코인 준비(젤리샵)', '젤리샵 후 👉 핑크 코인 준비(요아정)']
  }
};

// 공지 팝업 관리 함수
function handleNoticePopup() {
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

// 부스 정보 표시 함수
function showBoothInfo(boothName) {
  // 부스 정보 가져오기
  const boothInfo = boothData[boothName];
  
  if (!boothInfo) {
    console.debug('부스 정보를 찾을 수 없습니다:', boothName);
    return;
  }
  
  // 기본 정보 영역 숨기기
  document.getElementById('default-info').style.display = 'none';
  
  // 부스 정보 영역 표시
  const boothInfoElement = document.getElementById('booth-info');
  boothInfoElement.style.display = 'block';
  
  // 부스 이름 표시 (초기 정보일 경우 표시 안함)
  if (boothName === '안내') {
    document.getElementById('selected-booth-name').textContent = '안내';
  } else {
    document.getElementById('selected-booth-name').textContent = boothName;
  }
  
  // 특별 부스 (투표, 출구, 입장안내) 처리
  const sectionsContainer = document.getElementById('sections-container');
  
  if (!sectionsContainer) {
    console.error('sections-container 요소를 찾을 수 없습니다.');
    return;
  }
  
  // 이벤트 섹션 처리
  const eventsSectionContainer = document.getElementById('events-section-container');
  const eventListElement = document.getElementById('event-list');
  eventListElement.innerHTML = ''; // 기존 목록 초기화
  
  if (boothInfo.events && boothInfo.events.length > 0) {
    eventsSectionContainer.style.display = 'block';
    
    boothInfo.events.forEach(event => {
      const li = document.createElement('li');
      li.innerHTML = event;
      eventListElement.appendChild(li);
    });
  } else {
    eventsSectionContainer.style.display = 'none';
  }
  
  // 복사 코드 영역 처리
  const copyCodeContainer = document.getElementById('copy-code-container');
  copyCodeContainer.innerHTML = ''; // 기존 내용 초기화
  
  // 복사 코드가 있는 경우에만 표시
  if (boothInfo.copyCode) {
    const copyCodeBlock = document.createElement('div');
    copyCodeBlock.className = 'copy-code-block';
    
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = '복사';
    copyButton.addEventListener('click', function() {
      copyToClipboard(boothInfo.copyCode);
      this.textContent = '복사됨';
      setTimeout(() => {
        this.textContent = '복사';
      }, 2000);
    });
    
    const copyCodeContent = document.createElement('div');
    copyCodeContent.className = 'copy-code-content copy-area';
    copyCodeContent.textContent = boothInfo.copyCode;
    
    // 코드 내용 영역 클릭 시에도 복사 기능 추가
    copyCodeContent.addEventListener('click', function() {
      copyToClipboard(boothInfo.copyCode);
      copyButton.textContent = '복사됨';
      setTimeout(() => {
        copyButton.textContent = '복사';
      }, 2000);
    });
    
    copyCodeBlock.appendChild(copyButton);
    copyCodeBlock.appendChild(copyCodeContent);
    copyCodeContainer.appendChild(copyCodeBlock);
  }
  
  // 소셜 미디어 링크 처리
  const instagramLink = document.getElementById('instagram-link');
  const kakaotalkLink = document.getElementById('kakaotalk-link');
  const zigzagLink = document.getElementById('zigzag-link');
  
  // 주최사 부스인 경우 소셜 링크 설정 (zigzag 속성 우선 적용)
  if (isOrganizerBooth(boothName)) {
    // boothData에 정의된 zigzag 속성이 있으면 해당 값을 우선 사용
    if (boothInfo.zigzag === 'Y') {
      document.querySelector('.social-links').style.display = 'flex';
      instagramLink.style.display = 'none';
      kakaotalkLink.style.display = 'none';
      zigzagLink.style.display = 'flex';
    } else {
      document.querySelector('.social-links').style.display = 'none';
    }
  } else {
    document.querySelector('.social-links').style.display = 'flex';
    
    // 인스타그램 링크 설정
    if (boothInfo.instagram) {
      instagramLink.href = boothInfo.instagram;
      instagramLink.style.display = 'flex';
    } else {
      instagramLink.style.display = 'none';
    }
    
    // 카카오톡 링크 설정
    if (boothInfo.kakaotalk) {
      kakaotalkLink.href = boothInfo.kakaotalk;
      kakaotalkLink.style.display = 'flex';
    } else {
      kakaotalkLink.style.display = 'none';
    }
    
    // 지그재그 링크 설정
    if (boothInfo.zigzag === 'Y') {
      zigzagLink.style.display = 'flex';
    } else {
      zigzagLink.style.display = 'none';
    }
  }
  
  // 대응하는 부스 요소 찾기 및 시각적 효과 적용
  highlightBooth(boothName);
}

// 부스 요소를 강조 표시하는 함수
function highlightBooth(boothName) {
  // 모든 부스에서 선택 상태 제거
  document.querySelectorAll('.booth-wrapper').forEach(wrapper => {
    // 선택 클래스 제거
    wrapper.classList.remove('selected');
    
    // z-index 초기화
    wrapper.style.zIndex = '';
    
    // 부스 색상 초기화 - 호버 시에만 색상 변경 적용
    if (wrapper.classList.contains('booth-group')) {
      // 원 요소 색상 복원
      const circle = wrapper.querySelector('circle.booth');
      if (circle && circle._origFill) {
        circle.setAttribute('fill', circle._origFill);
      }
    } else {
      // 사각형 요소 색상 복원
      const rect = wrapper.querySelector('rect.booth');
      if (rect && rect._origFill) {
        rect.setAttribute('fill', rect._origFill);
      }
    }
  });
  
  // 선택할 부스 찾기
  const boothWrapper = document.querySelector(`.booth-wrapper[data-name="${boothName}"]`);
  
  if (!boothWrapper) {
    console.error('해당 부스 요소를 찾을 수 없습니다:', boothName);
    return;
  }
  
  // 선택 상태로 설정
  boothWrapper.classList.add('selected');
  
  // 선택된 부스에 z-index 1000 설정 (호버 시 9999보다 낮은 값)
  boothWrapper.style.zIndex = '1000';
  
  // 전역 변수 업데이트
  window.selectedBooth = boothWrapper;
}

// 클립보드에 텍스트 복사 함수
function copyToClipboard(text) {
  // 임시 텍스트 영역 생성
  const textarea = document.createElement('textarea');
  textarea.value = text;
  
  // 화면 밖으로 이동시켜서 보이지 않게 처리
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    // 복사 명령 실행
    const successful = document.execCommand('copy');
    const msg = successful ? '성공적으로 복사되었습니다.' : '복사에 실패했습니다.';
    console.log(msg);
  } catch (err) {
    console.error('복사 중 오류가 발생했습니다:', err);
  }
  
  // 임시 요소 제거
  document.body.removeChild(textarea);
}

// 로컬 스토리지에 최근 방문한 부스 저장
function saveLastVisitedBooth(boothName) {
  try {
    localStorage.setItem('lastVisitedBooth', boothName);
    localStorage.setItem('lastVisitTime', new Date().toISOString());
  } catch (e) {
    console.log('로컬 스토리지 저장 실패:', e);
  }
}

// 페이지 로드 시 마지막으로 방문한 부스 정보 표시
function loadLastVisitedBooth() {
  try {
    // 이전 방문 정보를 사용하지 않고 초기 정보를 표시
    showBoothInfo('안내');
    
    // 저장된 부스 방문 정보 삭제
    localStorage.removeItem('lastVisitedBooth');
    localStorage.removeItem('lastVisitTime');
  } catch (e) {
    console.log('초기 정보 로드 실패:', e);
  }
}

// 모든 섹션 토글 함수
function toggleAllSections() {
  const sectionsContainer = document.getElementById('sections-container');
  if (sectionsContainer) {
    sectionsContainer.classList.toggle('collapsed');
  }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
  // 공지 팝업 처리
  handleNoticePopup();
});

// 주최사 부스인지 확인하는 함수
function isOrganizerBooth(boothName) {
  return ['입장안내', '출구', '투표', '입구'].includes(boothName);
}
