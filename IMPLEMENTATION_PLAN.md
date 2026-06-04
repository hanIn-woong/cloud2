# 게시판 구현 상세 계획서

본 계획서는 `게시판_prd.md`를 바탕으로 단계별 구현 과정을 상세히 기술합니다. 각 단계 완료 후 사용자의 확인을 거쳐 다음 단계로 진행합니다.

## 1단계: 환경 설정 및 연동 확인
- [x] 백엔드 CORS 설정 (프론트엔드 연동 허용)
- [x] 백엔드 테스트용 API 엔드포인트 생성 (`/api/test`)
- [x] 프론트엔드에서 백엔드 API 호출 및 응답 확인 (콘솔 출력)
- [x] **사용자 확인 및 승인**

## 2. 단계: 백엔드 API 구현 (ArrayList 기반)
- [x] Lombok 의존성 추가 및 설정
- [x] `Post` 모델 클래스 작성 (Lombok `@Data`, `@Builder` 등 활용)
- [x] `PostService` 클래스 작성 (ArrayList를 이용한 CRUD 로직 구현)
- [x] `PostController` 클래스 작성 (Rest API 엔드포인트 구현)
- [x] API 동작 테스트 (List, Detail, Create, Update, Delete)
- [x] **사용자 확인 및 승인**

## 3단계: 프론트엔드 UI 및 라우팅 설정
- [x] `react-router-dom` 설치 및 설정
- [x] 기본 레이아웃 및 페이지 컴포넌트 구조 생성
    - 목록 (`PostList`)
    - 상세 (`PostDetail`)
    - 작성/수정 (`PostForm`)
- [x] 라우팅 기능 확인 (페이지 이동)
- [x] **사용자 확인 및 승인**

## 4단계: 프론트엔드-백엔드 기능 연동 (Axios 활용)
- [x] Axios 인스턴스 설정 (base URL 설정)
- [x] 목록 조회 기능 연동 (GET /api/posts)
- [x] 게시글 작성 기능 연동 (POST /api/posts)
- [x] 게시글 상세 조회 기능 연동 (GET /api/posts/{id})
- [x] 게시글 수정 및 삭제 기능 연동 (PUT/DELETE, 비밀번호 확인 포함)
- [x] **사용자 확인 및 승인**

## 5단계: 마무리 및 검증
- [x] 입력값 검증 (Validation) 추가
- [x] 예외 처리 및 사용자 피드백 (Alert 등) 강화
- [x] 전체 기능 최종 테스트 및 코드 정리
- [x] **최종 승인**
