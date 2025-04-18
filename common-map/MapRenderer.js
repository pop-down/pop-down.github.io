/**
 * SVG 맵 렌더링 및 이벤트 처리를 담당하는 클래스
 */
class MapRenderer {
  /**
   * MapRenderer 생성자
   * @param {HTMLElement} container 맵을 렌더링할 컨테이너 요소
   * @param {Function} onBoothSelect 부스 선택 시 호출될 콜백 함수
   */
  constructor(container, onBoothSelect) {
    this.container = container;
    this.onBoothSelect = onBoothSelect;
    this.mapElement = null;
    this.boothElements = []; // 부스 요소 참조 저장
    this.selectedBooth = null;
  }

  /**
   * SVG 맵을 렌더링합니다
   * @param {string} svgContent SVG 맵 템플릿 HTML
   */
  render(svgContent) {
    if (!this.container) {
      console.error('맵 컨테이너가 없습니다');
      return;
    }

    // SVG 렌더링
    this.container.innerHTML = svgContent;
    this.mapElement = this.container.querySelector('#booth-map');
    
    // 부스 요소 이벤트 연결
    this.attachBoothEvents();
  }

  /**
   * 부스 요소에 이벤트 리스너 연결
   */
  attachBoothEvents() {
    this.boothElements = this.container.querySelectorAll('.booth-wrapper');
    this.boothElements.forEach(booth => {
      booth.addEventListener('click', () => this.handleBoothClick(booth));
    });
  }

  /**
   * 부스 클릭 이벤트 처리
   * @param {HTMLElement} boothElement 클릭된 부스 요소
   */
  handleBoothClick(boothElement) {
    const boothName = boothElement.getAttribute('data-name');
    if (!boothName) return;
    
    // 기존 선택 부스 스타일 제거
    this.clearSelection();
    
    // 현재 선택 부스 스타일 추가
    boothElement.classList.add('selected');
    this.selectedBooth = boothElement;
    
    // 콜백 호출
    if (this.onBoothSelect) {
      this.onBoothSelect(boothName);
    }
  }

  /**
   * 특정 부스를 이름으로 선택합니다
   * @param {string} boothName 선택할 부스 이름
   */
  selectBoothByName(boothName) {
    this.clearSelection();
    
    const boothElement = Array.from(this.boothElements).find(
      element => element.getAttribute('data-name') === boothName
    );
    
    if (boothElement) {
      boothElement.classList.add('selected');
      this.selectedBooth = boothElement;
      
      // 콜백 호출
      if (this.onBoothSelect) {
        this.onBoothSelect(boothName);
      }
    }
  }

  /**
   * 모든 부스 선택 상태 초기화
   */
  clearSelection() {
    if (this.selectedBooth) {
      this.selectedBooth.classList.remove('selected');
      this.selectedBooth = null;
    }
  }
}

export default MapRenderer; 