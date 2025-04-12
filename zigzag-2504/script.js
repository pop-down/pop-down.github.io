// 부스 정보 데이터베이스
const boothData = {
  '안내': {
    zigzag: 'Y',
    events: [
      '<div style="line-height: 1.6em; margin-bottom: 10px;">⭐ <b>사용법</b> ⭐<br>• 부스 등 미니맵 항목 선택👉 내용이 보입니다🙂<br>• 제공정보 : 각 브랜드별 이벤트 항목, 필요한 SNS 링크, hashtag<br>• 해시태그 복사 기능도 있습니다.</div>',
      '<div style="line-height: 1.6em; margin-bottom: 10px;"><b>지그재그 즐겨찾기 추가방법</b><br>• 검색 말고 👉 <b>앱 온라인 파우치</b> 메뉴를 이용하세요<br>• 맨 아래로 스크롤하면 브랜드 목록을 확인할 수 있습니다<br>• 즐겨찾기도 한번에 가능!<br>(이 사이트는 지그재그 앱과 바로 연결할 수 없어서, 온라인 파우치가 아닌 이벤트 페이지로만 연결되어 있는 점 참고해주세요🙇)</div>',
      '<div style="line-height: 1.6em; margin-bottom: 10px;"><b>추천 코스</b><br>• 첫부스 추천: 몰바니(타포린백)<br>• 요아정 쿠폰: 입장 시 못받았으면 출구쪽 코인 확인하시는 분께 요청!</div>'
    ]
  },
  '잇퓨': {
    instagram: 'https://instagram.com/itpu',
    kakaotalk: 'https://pf.kakao.com/_xatQrs',
    zigzag: 'N',
    events: [
      '<div style="line-height: 1.6em; ">카카오톡 친구추가 👉 공뽑기 이벤트</div>',
      '<div style="line-height: 1.6em; ">타임어택 (스쿱)</div>'
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
    instagram: 'https://instagram.com/tag_beauty',
    kakaotalk: 'https://pf.kakao.com/_tFTVn',
    zigzag: 'N',
    copyCode: '@tag_official_kr #태그 #지그재그 #지그재그뷰티페스타 #지그재그팝업 #태그틴트',
    events: [
      '<div style="line-height: 1.6em; ">팔로우, 플친 추가 👉 샘플 증정</div>',
      '<div style="line-height: 1.6em; ">SNS 인증 👉 럭키드로우</div>'
    ]
  },
  '에스네이처': {
    instagram: 'https://instagram.com/snature_official',
    kakaotalk: 'https://pf.kakao.com/_GeAxnl',
    zigzag: 'N',
    copyCode: '@s.nature @zigzag_korea #에스네이처팝업 #직잭팝업',
    events: [
      '<div style="line-height: 1.6em; ">플친추가 👉 시트마스크, 샘플</div>',
      '<div style="line-height: 1.6em; ">SNS 인증 👉 럭키드로우</div>'
    ]
  },
  '에뛰드': {
    instagram: 'https://instagram.com/etude_official',
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
      '<div style="line-height: 1.6em; ">단백질음료&바 시식</div>',
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
      '<div style="line-height: 1.6em; ">팔로우, 즐겨찾기 👉 쿠션 공 쌓기</div>'
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
      '<div style="line-height: 1.6em; ">팔로우, 즐겨찾기 👉 럭드</div>'
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
    events: [
      '<div style="line-height: 1.6em; ">팔로우, 즐겨찾기 👉 공던지기</div>', 
      '<div style="line-height: 1.6em; ">SNS 작성 이벤트:추첨</div>'
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
      '<div style="line-height: 1.6em; ">게임 : 요아정 쿠폰</div>', 
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
      '<div style="line-height: 1.6em; ">요아정 쿠폰 (핑크색 코인 안받았으면 요청)</div>',
      '<div style="line-height: 1.6em; ">스쿱 등(앱 👉 온라인파우치 아무거나 담기, 종이 팜플렛 준비)</div>',
      '<div style="line-height: 1.6em; ">쇼핑백채우기, 웜/쿨톤 퍼담기까지 하고 나갈 때 👉 흰색 코인 준비(젤리샵)</div>', 
      '<div style="line-height: 1.6em; ">젤리샵 후 👉 핑크 코인 준비(요아정)</div>'
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

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
  // 공지 팝업 처리
  handleNoticePopup();
  
  // 초기 안내 정보 표시
  loadLastVisitedBooth();
});

// 주최사 부스인지 확인하는 함수
function isOrganizerBooth(boothName) {
  return ['입장안내', '출구', '투표', '입구'].includes(boothName);
}
