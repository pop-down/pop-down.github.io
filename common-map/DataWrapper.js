/**
 * 데이터 서비스 래퍼 클래스
 * 서버와 클라이언트 간의 추상화 계층 역할
 */
class DataWrapper {
  constructor() {
    this.boothData = null;
    this.mapTemplate = null;
    this.isDataLoaded = false;
  }

  /**
   * 모든 필요한 데이터를 서버에서 로드합니다
   * @returns {Promise<boolean>} 로드 성공 여부
   */
  async loadAllData() {
    try {
      // 병렬로 데이터 로드 시작
      const [boothDataResponse, mapTemplateResponse] = await Promise.all([
        this.fetchWithFallback(
          '/api/booth-data', 
          '/common-map/data/boothData.json', 
          'json'
        ),
        this.fetchWithFallback(
          '/api/map-template', 
          '/common-map/templates/boothMap.svg', 
          'text'
        )
      ]);

      this.boothData = boothDataResponse;
      this.mapTemplate = mapTemplateResponse;
      this.isDataLoaded = true;
      return true;
    } catch (error) {
      console.error('데이터 로드 중 오류 발생:', error);
      return false;
    }
  }

  /**
   * 서버 엔드포인트로 요청을 보내고, 실패 시 폴백 경로를 사용합니다
   * @param {string} primaryUrl 주요 API URL
   * @param {string} fallbackUrl 폴백 URL (로컬 파일)
   * @param {string} responseType 응답 유형 ('json' 또는 'text')
   * @returns {Promise<any>} 응답 데이터
   */
  async fetchWithFallback(primaryUrl, fallbackUrl, responseType = 'json') {
    try {
      const response = await fetch(primaryUrl);
      if (!response.ok) {
        throw new Error(`서버 요청 실패 (${response.status}): ${primaryUrl}`);
      }
      return responseType === 'json' ? await response.json() : await response.text();
    } catch (error) {
      console.warn(`서버 요청 실패: ${primaryUrl}, 폴백 사용: ${fallbackUrl}`);
      const fallbackResponse = await fetch(fallbackUrl);
      return responseType === 'json' ? await fallbackResponse.json() : await fallbackResponse.text();
    }
  }

  /**
   * 부스 데이터를 가져옵니다
   * @returns {Object} 부스 데이터 객체
   */
  getBoothData() {
    if (!this.isDataLoaded) {
      console.warn('데이터가 아직 로드되지 않았습니다');
    }
    return this.boothData;
  }

  /**
   * 맵 템플릿 HTML을 가져옵니다
   * @returns {string} SVG 맵 템플릿 HTML
   */
  getMapTemplate() {
    if (!this.isDataLoaded) {
      console.warn('데이터가 아직 로드되지 않았습니다');
    }
    return this.mapTemplate;
  }

  /**
   * 특정 부스의 정보를 가져옵니다
   * @param {string} boothName 부스 이름
   * @returns {Object|null} 부스 정보 객체 또는 찾을 수 없는 경우 null
   */
  getBoothInfo(boothName) {
    if (!this.isDataLoaded || !this.boothData) {
      console.warn('부스 데이터가 아직 로드되지 않았습니다');
      return null;
    }
    return this.boothData[boothName] || null;
  }
}

// 싱글톤 인스턴스 생성 및 내보내기
const dataService = new DataWrapper();
export default dataService; 