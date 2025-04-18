// 부스 정보 데이터베이스
const boothData = {
  '안내': {
    zigzag: 'Y',
    events: [
      '<div style="line-height: 1.6em; margin-bottom: 10px;">⭐ <b>사용법</b> ⭐<br>• 부스 등 미니맵 항목 선택👉 내용이 보입니다🙂<br>• 제공정보 : 각 브랜드별 이벤트 항목, 필요한 SNS 링크, hashtag<br>• 해시태그 복사 기능도 있습니다.</div>',
      '<div style="line-height: 1.6em; margin-bottom: 10px;"><b>지그재그 즐겨찾기 추가방법</b><br>• 검색 말고 👉 <b>앱 온라인 파우치</b> 메뉴를 이용하세요<br>• 맨 아래로 스크롤하면 브랜드 목록을 확인할 수 있습니다<br>• 즐겨찾기도 한번에 가능!</div>',
      '<div style="line-height: 1.6em; margin-bottom: 10px;"><b>추천 코스</b><br>• 첫부스 추천: 몰바니(타포린백)<br>• 요아정 쿠폰: 입장 시 못받았으면 출구쪽 코인 확인하시는 분께 요청!</div>'
    ]
  },
  '잇퓨': {
    instagram: 'https://instagram.com/itfu_official',
    kakaotalk: 'https://pf.kakao.com/_xatQrs',
    zigzag: 'Y',
    copyCode: '@itfu_official',
    events: [
      '<div style="line-height: 1.6em; ">카카오톡 친구추가 👉 공뽑기 이벤트</div>',
      '<div style="line-height: 1.6em; ">타임어택 : 즐겨찾기 & 스토리 👉 스쿱</div>'
    ]
  },
  '투에이엔': {
    instagram: 'https://instagram.com/2an_official',
    kakaotalk: 'https://pf.kakao.com/_sgHKT',
    zigzag: 'Y',
    copyCode: '@2an_official #투에이엔 #뮤트블룸컬렉션',
    events: [
      '<div style="line-height: 1.6em; ">오픈런 5명 👉 오션글로우 프레시 키트</div>',
      '<div style="line-height: 1.6em; ">스토리 인증 👉 플러피 블러 틴트 증정</div>',
      '<div style="line-height: 1.6em; ">즐겨찾기, 플친추가 👉 베어 플래시 글로스 증정</div>',
      '<div style="line-height: 1.6em; ">모든 SNS 이벤트 참여👉 럭키드로우</div>'
    ]
  },
  '태그': {
    instagram: 'https://instagram.com/tag_official_kr',
    kakaotalk: 'https://pf.kakao.com/_tFTVn',
    zigzag: 'N',
    copyCode: '@tag_official_kr #태그 #지그재그 #지그재그뷰티페스타 #지그재그팝업 #태그틴트',
    events: [
      '<div style="line-height: 1.6em; ">팔로우, 플친 추가 👉 샘플 증정</div>',
      '<div style="line-height: 1.6em; ">SNS 인증 👉 럭키드로우</div>'
    ]
  },
  '에스네이처': {
    instagram: 'https://instagram.com/s.nature',
    kakaotalk: 'https://pf.kakao.com/_GeAxnl',
    zigzag: 'N',
    copyCode: '@s.nature @zigzag_korea #에스네이처팝업 #직잭팝업',
    events: [
      '<div style="line-height: 1.6em; ">플친추가 👉 시트마스크, 샘플</div>',
      '<div style="line-height: 1.6em; ">SNS 인증 👉 럭키드로우</div>'
    ]
  },
  '에뛰드': {
    instagram: 'https://instagram.com/etudeofficial',
    zigzag: 'N',
    events: [
      '<div style="line-height: 1.6em; ">팔로우 👉 뽑기</div>'
    ]
  },
  '베노프&얌얌프로틴': {
    kakaotalk: 'https://pf.kakao.com/_QQmNT',
    zigzag: 'Y',
    events: [
      '<div style="line-height: 1.6em; ">즐겨찾기 👉 럭키드로우</div>',
      '<div style="line-height: 1.6em; ">단백질음료 & 바 시식</div>',
      '<div style="line-height: 1.6em; ">플친 추가 👉 뽑기</div>'
    ]
  },
  '에크멀': {
    kakaotalk: 'https://pf.kakao.com/_nxdlRxb',
    instagram: 'https://www.instagram.com/equmal.official/',
    links: [
      {
        name: '설문조사',
        url: 'https://forms.gle/GXFmXQowN3KfNiUC6'
      }],
    zigzag: 'N',
    copyCode: '@equmal.official #블러리립앤치크 #에크멀팝업',
    events: [
      '<div style="line-height: 1.6em; ">플친 추가, 팔로우 👉 꽃반지</div>',
      '<div style="line-height: 1.6em; ">테스트, 설문조사 👉 뽑기</div>'
    ]
  },
  '무지개맨션': {
    instagram: 'https://www.instagram.com/muzigae_mansion/',
    zigzag: 'Y',
    events: [
      '<div style="line-height: 1.6em; ">팔로우, 즐겨찾기 👉 쿠션 공 쌓기</div>',
      '<div style="line-height: 1.6em; ">SNS 리뷰작성 👉 추첨 (본품 세트)</div>'
    ]
  },
  '에스쁘아': {
    instagram: 'https://www.instagram.com/espoir_makeup/',
    kakaotalk: 'https://pf.kakao.com/_BEpRZ',
    zigzag: 'N',
    copyCode: '#에스쁘아 #지그재그 #뷰티페스타',
    events: [
      '<div style="line-height: 1.6em; ">팔로우, 플친추가 👉 SNS업로드 시 뽑기</div>'
    ]
  },
  '몰바니': {
    instagram: 'https://www.instagram.com/molvany_official/',
    kakaotalk: 'https://pf.kakao.com/_HMdBb',
    zigzag: 'Y',
    events: [
      '<div style="line-height: 1.6em; ">즐겨찾기, 팔로우, 플친추가 👉 스쿱이벤트</div>',
      '<div style="line-height: 1.6em; ">타포린백 증정</div>'
    ]
  },
  '릴리바이레드': {
    instagram: 'https://instagram.com/lilybyred_official',
    zigzag: 'Y',
    events: [
      '<div style="line-height: 1.6em; ">팔로우, 즐겨찾기 👉 뽑기</div>'
    ]
  },
  '달바': {
    // instagram: 'https://www.instagram.com/dalba_piedmont/',
    kakaotalk: 'https://pf.kakao.com/_xhxoWDxb',
    zigzag: 'N',
    events: [
      '<div style="line-height: 1.6em; ">플친 추가 👉 공뽑기</div>'
    ]
  },
  '삐아': {
    instagram: 'https://www.instagram.com/bbia.official/',
    zigzag: 'Y',
    copyCode: '@bbia.official #삐아 #직잭뷰티페스타 #오버글레이즈',
    events: [
      '<div style="line-height: 1.6em; ">팔로우, 즐겨찾기 👉 공던지기</div>', 
      '<div style="line-height: 1.6em; ">SNS 작성 이벤트👉추첨 (오버글레이즈 본품 SET) </div>'
    ]
  },
  '입구': {
    zigzag: 'Y',
    events: [
      '<div style="line-height: 1.6em; ">팜플렛 및 종이가방 증정</div>',
      '<div style="line-height: 1.6em; ">지그재그 앱 설치 확인</div>'
    ]
  },
  '입장안내': {
    events: [
      '<div style="line-height: 1.6em; ">게임 : 요아정 쿠폰 (핑크색 코인)</div>', 
      '<div style="line-height: 1.6em; ">종이 팜플렛 👉 도장</div>'
    ]
  },
  '투표': {
    events: [
      '<div style="line-height: 1.6em; ">투표 👉 샘플 증정</div>'
    ]
  },
  '출구': {
    zigzag: 'Y',
    events: [
      '<div style="line-height: 1.6em; ">핑크색 코인 (안받았을 경우 요청)</div>',
      '<div style="line-height: 1.6em; ">스쿱 등(앱 👉 온라인 파우치 아무거나 담기, 종이 팜플렛 준비)</div>',
      '<div style="line-height: 1.6em; ">쇼핑백채우기, 웜/쿨톤 퍼담기까지 하고 나갈 때 👉 흰색 코인 준비 (젤리샵)</div>', 
      '<div style="line-height: 1.6em; ">젤리샵 후 👉 핑크 코인 준비 (요아정)</div>'
    ]
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
    debugLog('부스 정보를 찾을 수 없습니다:', boothName);
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
    });
    
    const copyCodeContent = document.createElement('div');
    copyCodeContent.className = 'copy-code-content copy-area';
    copyCodeContent.textContent = boothInfo.copyCode;
    
    // 코드 내용 영역 클릭 시에도 복사 기능 추가
    copyCodeContent.addEventListener('click', function() {
      copyToClipboard(boothInfo.copyCode);
    });
    
    copyCodeBlock.appendChild(copyButton);
    copyCodeBlock.appendChild(copyCodeContent);
    copyCodeContainer.appendChild(copyCodeBlock);
  }
  
  // 소셜 미디어 링크 처리
  const instagramLink = document.getElementById('instagram-link');
  const kakaotalkLink = document.getElementById('kakaotalk-link');
  const zigzagLink = document.getElementById('zigzag-link');
  
  // 모든 소셜 링크 초기화
  instagramLink.style.display = 'none';
  kakaotalkLink.style.display = 'none';
  zigzagLink.style.display = 'none';
  
  // 인스타그램 링크가 있으면 표시
  if (boothInfo.instagram) {
    instagramLink.href = boothInfo.instagram;
    instagramLink.style.display = 'flex';
  }
  
  // 카카오톡 링크가 있으면 표시
  if (boothInfo.kakaotalk) {
    kakaotalkLink.href = boothInfo.kakaotalk;
    kakaotalkLink.style.display = 'flex';
  }
  
  // 지그재그 링크가 있으면 표시
  if (boothInfo.zigzag) {
    zigzagLink.href = boothInfo.zigzag;
    zigzagLink.style.display = 'flex';
  }
  
  // 추가 링크 처리
  const additionalLinksContainer = document.getElementById('additional-links-container');
  if (additionalLinksContainer) {
    additionalLinksContainer.innerHTML = ''; // 기존 추가 링크 초기화
    
    // links 배열이 있는 경우 처리
    if (boothInfo.links && boothInfo.links.length > 0) {
      additionalLinksContainer.style.display = 'flex';
      
      boothInfo.links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = '_blank';
        linkElement.className = 'additional-link';
        linkElement.title = link.name;
        
        // 링크 이름에 따라 적절한 아이콘 선택
        let iconClass = 'fa-link'; 
        let linkTypeClass = 'additional-link-default'; // 기본 링크 타입 클래스
        
        // 링크 이름 소문자로 변환하여 키워드 검색
        const nameLower = link.name.toLowerCase();
        
        if (nameLower.includes('설문') || nameLower.includes('투표') || nameLower.includes('poll')) {
          iconClass = 'fa-poll';
          linkTypeClass = 'additional-link-poll';
        } else if (nameLower.includes('계정') || nameLower.includes('프로필') || nameLower.includes('user')) {
          iconClass = 'fa-user';
          linkTypeClass = 'additional-link-user';
        } else if (nameLower.includes('쿠폰') || nameLower.includes('할인') || nameLower.includes('coupon')) {
          iconClass = 'fa-ticket-alt';
          linkTypeClass = 'additional-link-ticket';
        } else if (nameLower.includes('지도') || nameLower.includes('위치') || nameLower.includes('map')) {
          iconClass = 'fa-map-marker-alt';
          linkTypeClass = 'additional-link-map';
        } else if (nameLower.includes('이벤트') || nameLower.includes('event')) {
          iconClass = 'fa-calendar-alt';
          linkTypeClass = 'additional-link-calendar';
        } else if (nameLower.includes('쇼핑') || nameLower.includes('shop')) {
          iconClass = 'fa-shopping-bag';
          linkTypeClass = 'additional-link-shopping';
        } else if (nameLower.includes('문의') || nameLower.includes('질문') || nameLower.includes('question')) {
          iconClass = 'fa-question-circle';
          linkTypeClass = 'additional-link-question';
        } else if (nameLower.includes('정보') || nameLower.includes('info')) {
          iconClass = 'fa-info-circle';
          linkTypeClass = 'additional-link-info';
        } else if (nameLower.includes('메일') || nameLower.includes('이메일') || nameLower.includes('email')) {
          iconClass = 'fa-envelope';
          linkTypeClass = 'additional-link-mail';
        } else if (nameLower.includes('PDF') || nameLower.includes('문서') || nameLower.includes('파일')) {
          iconClass = 'fa-file-pdf';
          linkTypeClass = 'additional-link-file';
        }
        
        // 추가 클래스 적용
        linkElement.classList.add(linkTypeClass);
        
        // Font Awesome 링크 아이콘 생성
        const clipIcon = document.createElement('i');
        clipIcon.className = `fas ${iconClass}`;
        linkElement.appendChild(clipIcon);
        
        // 호버 시 표시될 이름
        const linkName = document.createElement('span');
        linkName.className = 'link-name';
        linkName.textContent = link.name;
        linkElement.appendChild(linkName);
        
        additionalLinksContainer.appendChild(linkElement);
      });
    } else {
      additionalLinksContainer.style.display = 'none';
    }
  }
  
  // 주최사 부스인 경우 소셜 링크 설정 (zigzag 속성 우선 적용)
  if (isOrganizerBooth(boothName)) {
    // boothData에 정의된 zigzag 속성이 있으면 해당 값을 우선 사용
    if (boothInfo.zigzag === 'Y') {
      document.querySelector('.social-links').style.display = 'flex';
      zigzagLink.style.display = 'flex';
    } else {
      document.querySelector('.social-links').style.display = 'none';
    }
  } else {
    document.querySelector('.social-links').style.display = 'flex';
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
    // console.debug('해당 부스 요소를 찾을 수 없습니다:', boothName);
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
  textarea.style.top = '0';
  textarea.style.opacity = '0';
  
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    // 복사 명령 실행
    const successful = document.execCommand('copy');
    const msg = successful ? '성공적으로 복사되었습니다.' : '복사에 실패했습니다.';
    logMessage(msg);
    
    // 복사 버튼 텍스트 변경
    const copyButton = document.querySelector('.copy-button');
    if (copyButton) {
      copyButton.textContent = '복사됨';
      setTimeout(() => {
        copyButton.textContent = '복사';
      }, 2000);
    }
  } catch (err) {
    logMessage('복사 중 오류가 발생했습니다:', err);
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
    logMessage('로컬 스토리지 저장 실패:', e);
  }
}

// 페이지 로드 시 마지막으로 방문한 부스 정보 표시
function loadEmptyBooth() {
  try {
    // 이전 방문 정보를 사용하지 않고 초기 정보를 표시
    showBoothInfo('안내');
    
    // 저장된 부스 방문 정보 삭제
    localStorage.removeItem('lastVisitedBooth');
    localStorage.removeItem('lastVisitTime');
  } catch (e) {
    logMessage('초기 정보 로드 실패:', e);
    // 오류 발생 시에도 안내 정보 표시 시도
    showBoothInfo('안내');
  }
}

// 모든 섹션 토글 함수
function toggleAllSections() {
  const sectionsContainer = document.getElementById('sections-container');
  if (sectionsContainer) {
    sectionsContainer.classList.toggle('collapsed');
  }
}

// PWA 설치 관련 변수
let deferredPrompt;
let visitStartTime;
let installPromptTimer;
const installPromptDelay = 30000; // 30초

// PWA 설치 안내 관리 함수
function handleInstallPrompt() {
  const pwaInstallPrompt = document.getElementById('pwa-install-prompt');
  const installBtn = document.getElementById('pwa-install-btn');
  const closeBtn = document.getElementById('pwa-close-btn');
  const installPromptShownKey = 'pwaInstallPromptShown';
  
  // 이미 설치 안내를 본 적이 있는지 확인
  const promptShown = localStorage.getItem(installPromptShownKey);
  
  // 방문 시작 시간 기록
  visitStartTime = Date.now();
  
  // beforeinstallprompt 이벤트 처리
  window.addEventListener('beforeinstallprompt', (e) => {
    // 브라우저 기본 설치 프롬프트 방지
    e.preventDefault();
    // 이벤트 저장
    deferredPrompt = e;
    
    // 이미 설치 안내를 본 적이 없고, 현재 타이머가 없으면 타이머 설정
    if (!promptShown && !installPromptTimer) {
      installPromptTimer = setTimeout(() => {
        showInstallPrompt();
      }, installPromptDelay);
    }
  });
  
  // 설치 버튼 클릭 이벤트
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    // 설치 프롬프트 표시
    deferredPrompt.prompt();
    // 사용자의 응답 대기
    const { outcome } = await deferredPrompt.userChoice;
    logMessage(`사용자 응답: ${outcome}`);
    // deferredPrompt 초기화
    deferredPrompt = null;
    // 설치 안내 닫기
    hideInstallPrompt();
    // 설치 안내 표시 여부 저장
    localStorage.setItem(installPromptShownKey, 'true');
  });
  
  // 닫기 버튼 클릭 이벤트
  closeBtn.addEventListener('click', () => {
    hideInstallPrompt();
    // 설치 안내 표시 여부 저장
    localStorage.setItem(installPromptShownKey, 'true');
  });
  
  // 설치 완료 이벤트 처리
  window.addEventListener('appinstalled', (e) => {
    logMessage('앱이 성공적으로 설치되었습니다.');
    // 타이머 취소
    if (installPromptTimer) {
      clearTimeout(installPromptTimer);
      installPromptTimer = null;
    }
    // 설치 안내 닫기
    hideInstallPrompt();
    // 설치 안내 표시 여부 저장
    localStorage.setItem(installPromptShownKey, 'true');
  });
}

// 설치 안내 표시 함수
function showInstallPrompt() {
  const pwaInstallPrompt = document.getElementById('pwa-install-prompt');
  if (!pwaInstallPrompt) return;
  
  pwaInstallPrompt.style.display = 'block';
  // 애니메이션 효과를 위해 setTimeout 사용
  setTimeout(() => {
    pwaInstallPrompt.classList.add('show');
  }, 10);
}

// 설치 안내 숨기기 함수
function hideInstallPrompt() {
  const pwaInstallPrompt = document.getElementById('pwa-install-prompt');
  if (!pwaInstallPrompt) return;
  
  pwaInstallPrompt.classList.remove('show');
  // 애니메이션 완료 후 요소 숨기기
  setTimeout(() => {
    pwaInstallPrompt.style.display = 'none';
  }, 300);
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
  // 공지 팝업 처리
  handleNoticePopup();
  
  // 초기 안내 정보 표시
  loadEmptyBooth();
  
  // PWA 설치 안내 처리
  handleInstallPrompt();
  
  // 외부 링크 처리
  handleExternalLinks();
  
  // PWA 업데이트 처리
  handleAppUpdate();
  
  // 최신 버전 확인 및 페이지 자산에 버전 쿼리 추가
  if (localStorage.getItem('currentAppVersion')) {
    addVersionQueryToAssets();
  }
  
  // 페이지 로드 후 일정 시간마다 새로고침 체크
  setTimeout(checkForNewVersion, 5 * 60 * 1000); // 5분마다 체크
});

// PWA 앱 환경인지 확인하는 함수
function isPWAEnvironment() {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.matchMedia('(display-mode: fullscreen)').matches || 
         window.navigator.standalone === true;
}

// 로컬 환경에서만 로그를 출력하는 유틸리티 함수
function debugLog(message, ...args) {
  // 로컬 환경에서만 로그 출력 (localhost 또는 파일 프로토콜)
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' || 
      window.location.protocol === 'file:') {
    console.debug(message, ...args);
  }
}

// 로컬 환경에서만 로그를 출력하는 유틸리티 함수 (일반 로그)
function logMessage(message, ...args) {
  // 로컬 환경에서만 로그 출력 (localhost 또는 파일 프로토콜)
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' || 
      window.location.protocol === 'file:') {
    console.log(message, ...args);
  }
}

// PWA 업데이트 감지 및 처리 함수
function handleAppUpdate() {
  // 서비스 워커가 지원되는 환경인지 확인
  if ('serviceWorker' in navigator) {
    // 일반 브라우저 환경에서도 업데이트 확인 설정
    // PWA 앱 환경인지 확인하는 조건 제거
    
    // 서비스 워커 버전 체크 - 현재 실행 중인 서비스 워커에서 버전 정보 가져오기
    navigator.serviceWorker.ready.then(registration => {
      if (registration.active) {
        // 서비스 워커에 버전 요청 메시지 전송
        registration.active.postMessage({ type: 'GET_VERSION' });
      }
    });
    
    // 서비스 워커로부터 메시지 수신 리스너
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
        // 업데이트가 있다는 알림 표시
        showUpdateNotification(event.data.version);
      } else if (event.data && event.data.type === 'CURRENT_VERSION') {
        // 현재 서비스 워커 버전 정보 저장
        localStorage.setItem('currentAppVersion', event.data.version);
        
        // 버전 정보를 받은 후 자산에 버전 쿼리 추가
        addVersionQueryToAssets();
      }
    });
    
    // 주기적으로 업데이트 확인 (1시간마다)
    setInterval(() => {
      checkForUpdates();
    }, 60 * 60 * 1000); // 1시간
    
    // 페이지 로드 시 즉시 업데이트 확인
    checkForUpdates();
  }
}

// 서비스 워커 업데이트 확인 함수
function checkForUpdates() {
  if ('serviceWorker' in navigator) {
    // 마지막 업데이트 확인 시간 확인
    const lastUpdateCheck = localStorage.getItem('lastUpdateCheck');
    const now = Date.now();
    
    // 마지막 확인 시간이 있고 1시간이 지나지 않았으면 스킵 (3600000ms = 1시간)
    if (lastUpdateCheck && (now - parseInt(lastUpdateCheck) < 3600000)) {
      logMessage('[App] 최근에 이미 업데이트를 확인했습니다. 다음 확인을 건너뜁니다.');
      return;
    }
    
    // 현재 시간을 마지막 업데이트 확인 시간으로 저장
    localStorage.setItem('lastUpdateCheck', now.toString());
    
    navigator.serviceWorker.ready.then(registration => {
      registration.update()
        .then(() => {
          logMessage('[App] 서비스 워커 업데이트 확인 완료');
        })
        .catch(err => {
          logMessage('[App] 서비스 워커 업데이트 확인 실패:', err);
        });
    });
  }
}

// 스크립트와 스타일시트 파일에 버전 쿼리 파라미터 추가
function addVersionQueryToAssets() {
  // 서비스 워커에서 가져온 버전 사용
  const version = localStorage.getItem('currentAppVersion') || 'v1';
  
  // 모든 스크립트와 스타일시트 링크 수정
  const links = document.querySelectorAll('link[rel="stylesheet"]');
  const scripts = document.querySelectorAll('script[src]');
  
  // 스타일시트 링크에 버전 파라미터 추가
  links.forEach(link => {
    if (link.href && !link.href.includes('cdnjs') && !link.href.includes('fonts.googleapis')) {
      link.href = appendVersionQuery(link.href, version);
    }
  });
  
  // 스크립트 태그에 버전 파라미터 추가
  scripts.forEach(script => {
    if (script.src && !script.src.includes('cdnjs')) {
      script.src = appendVersionQuery(script.src, version);
    }
  });
  
  logMessage('[App] 자산 파일에 버전 쿼리 파라미터 추가 완료');
}

// URL에 버전 쿼리 파라미터 추가하는 함수
function appendVersionQuery(url, version) {
  // URL 파싱
  const urlObj = new URL(url, window.location.href);
  
  // 이미 v 파라미터가 있으면 제거
  urlObj.searchParams.delete('v');
  
  // 새 버전 파라미터 추가
  urlObj.searchParams.append('v', version);
  
  return urlObj.href;
}

// 새 버전이 있는지 확인하는 함수
function checkForNewVersion() {
  // 최소한의 네트워크 요청으로 버전 확인
  fetch('./service-worker.js?check=' + Date.now())
    .then(response => response.text())
    .then(text => {
      // 서비스 워커 코드에서 버전 추출
      const versionMatch = text.match(/CACHE_VERSION\s*=\s*['"]([^'"]+)['"]/);
      
      if (versionMatch && versionMatch[1]) {
        const remoteVersion = versionMatch[1];
        const currentVersion = localStorage.getItem('currentAppVersion');
        
        logMessage(`[App] 원격 버전: ${remoteVersion}, 현재 버전: ${currentVersion}`);
        
        // 버전이 다르면 새로고침 안내
        if (currentVersion && remoteVersion !== currentVersion) {
          if (confirm('새 버전의 앱이 있습니다. 새로고침 하시겠습니까?')) {
            // 캐시를 완전히 무시하고 새로고침
            window.location.reload(true);
          }
        }
      }
    })
    .catch(err => {
      logMessage('[App] 버전 확인 중 오류:', err);
    });
  
  // 다음 체크 예약
  setTimeout(checkForNewVersion, 5 * 60 * 1000); // 5분마다 체크
}

// 사용자 인터페이스에 새 버전 알림 표시 (헤더 배너)
function showNewVersionBanner(version) {
  // 이미 배너가 있는지 확인
  if (document.getElementById('version-update-banner')) {
    return;
  }
  
  // 배너 생성
  const banner = document.createElement('div');
  banner.id = 'version-update-banner';
  banner.className = 'version-update-banner';
  banner.innerHTML = `
    <div class="banner-content">
      <span>새 버전(${version})이 있습니다.</span>
      <div class="banner-buttons">
        <button id="refresh-now-btn">새로고침</button>
        <button id="close-banner-btn">✕</button>
      </div>
    </div>
  `;
  
  // 배너를 body의 맨 위에 추가
  document.body.insertBefore(banner, document.body.firstChild);
  
  // 새로고침 버튼 이벤트
  document.getElementById('refresh-now-btn').addEventListener('click', () => {
    window.location.reload(true);
  });
  
  // 닫기 버튼 이벤트
  document.getElementById('close-banner-btn').addEventListener('click', () => {
    document.body.removeChild(banner);
  });
  
  // 스타일 추가
  const style = document.createElement('style');
  style.textContent = `
    .version-update-banner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: #ffeb3b;
      color: #333;
      padding: 8px 16px;
      text-align: center;
      z-index: 9999;
      font-size: 14px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .banner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .banner-buttons {
      display: flex;
      gap: 8px;
    }
    .banner-buttons button {
      padding: 4px 8px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    #refresh-now-btn {
      background-color: #4caf50;
      color: white;
    }
    #close-banner-btn {
      background-color: transparent;
      color: #333;
    }
  `;
  document.head.appendChild(style);
}

// 업데이트 알림 표시 함수 수정
function showUpdateNotification(version) {
  // 이미 알림을 표시했는지 확인
  const updateShownKey = 'updateNotificationShown-' + version;
  if (localStorage.getItem(updateShownKey)) {
    logMessage('[App] 이미 이 버전의 업데이트 알림을 표시했습니다.');
    return;
  }
  
  // 현재 설치된 버전과 새 버전 비교
  const currentVersion = localStorage.getItem('currentAppVersion');
  if (currentVersion === version) {
    logMessage('[App] 현재 버전과 동일한 업데이트입니다. 알림을 표시하지 않습니다.');
    return;
  }
  
  // 첫 설치인 경우 현재 버전을 저장하고 알림 표시하지 않음
  if (!currentVersion) {
    localStorage.setItem('currentAppVersion', version);
    localStorage.setItem(updateShownKey, 'true');
    logMessage('[App] 첫 설치이므로 업데이트 알림을 표시하지 않습니다.');
    return;
  }
  
  // 첫 방문 시간 확인
  const firstVisitTime = localStorage.getItem('firstVisitTime');
  const now = Date.now();
  
  // 첫 방문 기록이 없으면 저장
  if (!firstVisitTime) {
    localStorage.setItem('firstVisitTime', now.toString());
  }
  // 첫 방문 후 5분 이내라면 알림 표시하지 않음 (초기 설치로 간주)
  else if (now - parseInt(firstVisitTime) < 300000) { // 5분 = 300,000ms
    logMessage('[App] 앱 초기 설치 후 5분 이내이므로 업데이트 알림을 표시하지 않습니다.');
    return;
  }
  
  // PWA 환경에서는 기존 알림 표시
  if (isPWAEnvironment()) {
    showPWAUpdateNotification(version);
  } else {
    // 일반 브라우저에서는 헤더 배너 표시
    showNewVersionBanner(version);
  }
  
  // 알림 표시 여부 저장
  localStorage.setItem(updateShownKey, 'true');
}

// PWA 환경에서의 업데이트 알림 표시 (기존 알림)
function showPWAUpdateNotification(version) {
  // 알림 요소 생성
  const updateNotification = document.createElement('div');
  updateNotification.className = 'update-notification';
  updateNotification.innerHTML = `
    <div class="update-content">
      <h3>업데이트 알림</h3>
      <p>새 버전(${version})의 앱이 준비되었습니다. 업데이트하시겠습니까?</p>
      <div class="update-buttons">
        <button id="update-now-btn">지금 업데이트</button>
        <button id="update-later-btn">나중에</button>
      </div>
    </div>
  `;
  
  // 알림을 body에 추가
  document.body.appendChild(updateNotification);
  
  // 애니메이션 효과를 위한 지연
  setTimeout(() => {
    updateNotification.classList.add('show');
  }, 10);
  
  // 지금 업데이트 버튼 이벤트
  const updateNowBtn = document.getElementById('update-now-btn');
  updateNowBtn.addEventListener('click', () => {
    // 업데이트 진행
    updateApplication();
    // 알림 닫기
    hideUpdateNotification(updateNotification);
  });
  
  // 나중에 버튼 이벤트
  const updateLaterBtn = document.getElementById('update-later-btn');
  updateLaterBtn.addEventListener('click', () => {
    // 알림만 닫기
    hideUpdateNotification(updateNotification);
  });
}

// 애플리케이션 업데이트 함수
function updateApplication() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      // 서비스 워커에 skipWaiting 메시지 전송
      registration.active.postMessage({ type: 'SKIP_WAITING' });
      
      // 화면 새로고침 (새 서비스 워커 활성화를 위해)
      window.location.reload();
    });
  }
}

// 업데이트 알림 숨기기 함수
function hideUpdateNotification(notification) {
  notification.classList.remove('show');
  // 애니메이션 완료 후 요소 제거
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

// 주최사 부스인지 확인하는 함수
function isOrganizerBooth(boothName) {
  return ['입장안내', '출구', '투표', '입구'].includes(boothName);
}

// 외부 링크를 모바일 기본 앱으로 열도록 처리하는 함수
function handleExternalLinks() {
  // 모든 소셜 미디어 링크 요소 가져오기
  const socialLinks = document.querySelectorAll('.social-links a');
  
  // 각 링크에 대해 처리
  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // 링크 유형에 따라 앱 스키마 또는 유니버설 링크 적용
      if (href) {
        // 인스타그램 링크 처리
        if (href.includes('instagram.com')) {
          const instaPath = href.split('instagram.com/')[1];
          // 인스타그램 앱 스키마로 시도
          const instaAppUrl = `instagram://user?username=${instaPath}`;
          
          // iOS나 Android에서 앱 열기 시도
          tryOpenApp(e, instaAppUrl, href);
        } 
        // 카카오톡 링크 처리
        else if (href.includes('pf.kakao.com')) {
          const kakaoId = href.split('pf.kakao.com/')[1];
          // 카카오톡 채널 앱 스키마로 시도
          const kakaoAppUrl = `kakaoplus://plusfriend/home/${kakaoId}`;
          
          // iOS나 Android에서 앱 열기 시도
          tryOpenApp(e, kakaoAppUrl, href);
        }
        // 지그재그 링크 처리
        // else if (href.includes('zigzag.kr')) {
        //   // 지그재그 앱 스키마나 딥링크 구조에 맞게 수정 필요
        //   // 현재 데이터로는 정확한 스키마를 알 수 없어 웹으로 열기만 구현
        //   const zigzagAppUrl = href.replace('https://', 'zigzag://');
          
        //   // iOS나 Android에서 앱 열기 시도
        //   tryOpenApp(e, zigzagAppUrl, href);
        // }
      }
    });
  });
  
  // 추가 링크 요소도 처리
  const additionalLinks = document.querySelectorAll('.additional-link');
  additionalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // 특정 앱으로 연결 가능한 링크 처리
      if (href && href.includes('forms.gle')) {
        // 구글 폼은 구글 앱으로 열기 시도
        const googleFormsAppUrl = `https://docs.google.com/forms/d/e${href.split('forms.gle/')[1]}`;
        tryOpenApp(e, googleFormsAppUrl, href);
      }
    });
  });
}

// 앱으로 열기 시도 함수
function tryOpenApp(event, appUrl, webUrl) {
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
