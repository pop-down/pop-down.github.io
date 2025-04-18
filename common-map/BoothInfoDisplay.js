/**
 * 부스 정보 표시를 담당하는 클래스
 */
class BoothInfoDisplay {
  /**
   * BoothInfoDisplay 생성자
   * @param {HTMLElement} container 부스 정보를 표시할 컨테이너 요소
   */
  constructor(container) {
    this.container = container;
    this.elements = {
      defaultInfo: null,
      boothInfo: null,
      boothName: null,
      eventList: null,
      eventsSection: null,
      copyCodeContainer: null,
      instagramLink: null,
      kakaotalkLink: null,
      zigzagLink: null,
      additionalLinks: null
    };

    this.initializeElements();
  }

  /**
   * 필요한 DOM 요소 참조 초기화
   */
  initializeElements() {
    if (!this.container) {
      console.error('부스 정보 컨테이너가 없습니다');
      return;
    }

    this.elements = {
      defaultInfo: document.getElementById('default-info'),
      boothInfo: document.getElementById('booth-info'),
      boothName: document.getElementById('selected-booth-name'),
      eventList: document.getElementById('event-list'),
      eventsSection: document.getElementById('events-section-container'),
      copyCodeContainer: document.getElementById('copy-code-container'),
      instagramLink: document.getElementById('instagram-link'),
      kakaotalkLink: document.getElementById('kakaotalk-link'),
      zigzagLink: document.getElementById('zigzag-link'),
      additionalLinks: document.getElementById('additional-links-container')
    };
  }

  /**
   * 부스 정보를 표시합니다
   * @param {string} boothName 부스 이름
   * @param {Object} boothInfo 부스 정보 객체
   */
  displayBoothInfo(boothName, boothInfo) {
    if (!boothInfo) {
      console.warn(`'${boothName}' 부스 정보를 찾을 수 없습니다`);
      return;
    }

    // 기본 정보 영역 숨기기
    if (this.elements.defaultInfo) {
      this.elements.defaultInfo.style.display = 'none';
    }
    
    // 부스 정보 영역 표시
    if (this.elements.boothInfo) {
      this.elements.boothInfo.style.display = 'block';
    }
    
    // 부스 이름 표시
    if (this.elements.boothName) {
      this.elements.boothName.textContent = boothName;
    }
    
    // 이벤트 정보 표시
    this.displayEvents(boothInfo.events);
    
    // 소셜 링크 표시
    this.displaySocialLinks(boothInfo);
    
    // 복사 코드 표시
    this.displayCopyCode(boothInfo.copyCode);
    
    // 추가 링크 표시
    this.displayAdditionalLinks(boothInfo.links);
  }

  /**
   * 이벤트 정보를 표시합니다
   * @param {Array} events 이벤트 목록
   */
  displayEvents(events) {
    if (!this.elements.eventList || !this.elements.eventsSection) return;
    
    // 이벤트 목록 초기화
    this.elements.eventList.innerHTML = '';
    
    if (events && events.length > 0) {
      // 이벤트 섹션 표시
      this.elements.eventsSection.style.display = 'block';
      
      // 각 이벤트 항목 추가
      events.forEach(event => {
        const li = document.createElement('li');
        li.innerHTML = event;
        this.elements.eventList.appendChild(li);
      });
    } else {
      // 이벤트가 없으면 섹션 숨기기
      this.elements.eventsSection.style.display = 'none';
    }
  }

  /**
   * 소셜 미디어 링크를 표시합니다
   * @param {Object} boothInfo 부스 정보 객체
   */
  displaySocialLinks(boothInfo) {
    // 인스타그램 링크
    if (this.elements.instagramLink) {
      if (boothInfo.instagram) {
        this.elements.instagramLink.href = boothInfo.instagram;
        this.elements.instagramLink.style.display = 'inline-block';
      } else {
        this.elements.instagramLink.style.display = 'none';
      }
    }
    
    // 카카오톡 링크
    if (this.elements.kakaotalkLink) {
      if (boothInfo.kakaotalk) {
        this.elements.kakaotalkLink.href = boothInfo.kakaotalk;
        this.elements.kakaotalkLink.style.display = 'inline-block';
      } else {
        this.elements.kakaotalkLink.style.display = 'none';
      }
    }
    
    // 지그재그 링크
    if (this.elements.zigzagLink) {
      if (boothInfo.zigzag === 'Y') {
        this.elements.zigzagLink.style.display = 'inline-block';
      } else {
        this.elements.zigzagLink.style.display = 'none';
      }
    }
  }

  /**
   * 복사 코드를 표시합니다
   * @param {string} copyCode 복사할 코드
   */
  displayCopyCode(copyCode) {
    if (!this.elements.copyCodeContainer) return;
    
    // 복사 코드 컨테이너 초기화
    this.elements.copyCodeContainer.innerHTML = '';
    
    // 복사 코드가 있으면 표시
    if (copyCode) {
      const copyCodeBlock = document.createElement('div');
      copyCodeBlock.className = 'copy-code-block';
      
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-button';
      copyButton.textContent = '복사';
      copyButton.addEventListener('click', () => this.copyToClipboard(copyCode, copyButton));
      
      const codeText = document.createElement('div');
      codeText.className = 'copy-code-text';
      codeText.textContent = copyCode;
      
      copyCodeBlock.appendChild(codeText);
      copyCodeBlock.appendChild(copyButton);
      this.elements.copyCodeContainer.appendChild(copyCodeBlock);
    }
  }

  /**
   * 추가 링크를 표시합니다
   * @param {Array} links 추가 링크 목록
   */
  displayAdditionalLinks(links) {
    if (!this.elements.additionalLinks) return;
    
    // 추가 링크 컨테이너 초기화
    this.elements.additionalLinks.innerHTML = '';
    
    // 추가 링크가 있으면 표시
    if (links && links.length > 0) {
      this.elements.additionalLinks.style.display = 'inline-block';
      
      links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.className = 'additional-link';
        linkElement.target = '_blank';
        linkElement.title = link.name;
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-external-link-alt';
        
        linkElement.appendChild(icon);
        this.elements.additionalLinks.appendChild(linkElement);
      });
    } else {
      this.elements.additionalLinks.style.display = 'none';
    }
  }

  /**
   * 텍스트를 클립보드에 복사합니다
   * @param {string} text 복사할 텍스트
   * @param {HTMLElement} button 복사 버튼 요소
   */
  copyToClipboard(text, button) {
    // 임시 textarea 요소 생성
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    
    // 텍스트 선택 및 복사
    textarea.select();
    let success = false;
    try {
      success = document.execCommand('copy');
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
    
    // 임시 요소 제거
    document.body.removeChild(textarea);
    
    // 버튼 상태 업데이트
    if (success && button) {
      const originalText = button.textContent;
      button.textContent = '복사됨';
      
      // 3초 후 원래 텍스트로 복원
      setTimeout(() => {
        button.textContent = originalText;
      }, 3000);
    }
    
    return success;
  }

  /**
   * 기본 정보 화면으로 돌아갑니다
   */
  resetToDefault() {
    if (this.elements.boothInfo) {
      this.elements.boothInfo.style.display = 'none';
    }
    
    if (this.elements.defaultInfo) {
      this.elements.defaultInfo.style.display = 'block';
    }
  }
}

export default BoothInfoDisplay; 