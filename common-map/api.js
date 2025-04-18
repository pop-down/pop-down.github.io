/**
 * 부스 데이터를 가져오는 함수
 * @returns {Promise<Object>} 부스 데이터
 */
async function getBoothData() {
  try {
    const response = await fetch('/api/booth-data');
    if (!response.ok) {
      throw new Error('부스 데이터를 가져오는데 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('부스 데이터 가져오기 오류:', error);
    // 오류 발생 시 로컬에 저장된 데이터 사용
    return fetch('/common-map/data/boothData.json').then(res => res.json());
  }
}

/**
 * SVG 맵 템플릿을 가져오는 함수
 * @returns {Promise<string>} SVG 맵 HTML
 */
async function getMapTemplate() {
  try {
    const response = await fetch('/api/map-template');
    if (!response.ok) {
      throw new Error('맵 템플릿을 가져오는데 실패했습니다.');
    }
    return await response.text();
  } catch (error) {
    console.error('맵 템플릿 가져오기 오류:', error);
    // 오류 발생 시 로컬에 저장된 템플릿 사용
    return fetch('/common-map/templates/boothMap.svg').then(res => res.text());
  }
}

export {
  getBoothData,
  getMapTemplate
}; 