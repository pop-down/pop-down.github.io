// 앱 버전 정보
const APP_VERSION = {
  current: '0.2.6.2',           // 현재 버전
  minRequired: '0.2.5.0',       // 최소 필요 버전
  latest: '0.2.6.2'            // 최신 버전
};

// 앱 기본 설정
const APP_CONFIG = {
  name: '쿠팡 메가 뷰티쇼',
  description: '쿠팡 메가 뷰티쇼 부스 정보 및 안내',
  updateCheckInterval: 3600000, // 업데이트 체크 간격 (1시간)
  cacheVersion: '0.2.6.2'        // 캐시 버전
};

// 업데이트 이력
const UPDATE_HISTORY = [
  {
    date: '2025-04-22',
    version: '0.2.6.2',
    description: '브라우저 뒤로가기 기능 개선 및 히스토리 관리 최적화'
  },
  {
    date: '2025-04-21',
    version: '0.2.6.1',
    description: '시스템 뒤로가기 기능 수정 및 개선'
  },
  {
    date: '2025-04-20',
    version: '0.2.6.0',
    description: 'SVG 부스 지도 추가 및 부스 방문 체크 시각화 기능 구현'
  },
  {
    date: '2025-04-19',
    version: '0.2.5.5',
    description: '뒤로가기 버튼 추가 및 탭/부스 상태 기억 기능 구현 (안드로이드/iOS 뒤로가기 버튼과 호환)'
  },
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
  },
  {
    date: '2025-04-18',
    version: '0.2.5.4',
    description: 'ES 모듈 로딩 버그 수정 및 정적 환경 배포 문제 해결'
  }
];

// 내보내기
export {
  APP_VERSION,
  APP_CONFIG,
  UPDATE_HISTORY
}; 