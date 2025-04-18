// 앱 버전 정보
const APP_VERSION = {
  current: '0.2.5.3',           // 현재 버전
  minRequired: '0.2.5.1',       // 최소 필요 버전
  latest: '0.2.5.3'            // 최신 버전
};

// 앱 기본 설정
const APP_CONFIG = {
  name: '쿠팡 메가 뷰티쇼',
  description: '쿠팡 메가 뷰티쇼 부스 정보 및 안내',
  updateCheckInterval: 3600000, // 업데이트 체크 간격 (1시간)
  cacheVersion: '0.2.5.3'        // 캐시 버전
};

// 업데이트 이력
const UPDATE_HISTORY = [
  {
    date: '2025-04-18',
    version: '0.2.5.1',
    description: '이미지 모달 기능 개선 및 UI 버그 수정'
  },
  {
    date: '2025-04-18',
    version: '0.2.5.2',
    description: '부스 정보 업데이트 및 검색 기능 개선'
  },
  {
    date: '2025-04-18',
    version: '0.2.5.3',
    description: '모듈 시스템 적용 및 설정 파일 분리'
  }
];

// 내보내기
export {
  APP_VERSION,
  APP_CONFIG,
  UPDATE_HISTORY
}; 