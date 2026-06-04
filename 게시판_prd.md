# 게시판 애플리케이션 PRD (Product Requirements Document)

## 1. 프로젝트 개요
본 프로젝트는 **React**와 **Spring Boot(MVC)**를 활용하여 기본적인 CRUD(Create, Read, Update, Delete) 기능을 갖춘 간단한 웹 게시판을 구현하는 것을 목표로 합니다.

## 2. 기술 스택 (제안)
*   **Frontend**: React (Vite 기반), React Router DOM (라우팅)
*   **Backend**: Java 21, Spring Boot (Spring Web MVC)
*   **Storage**: In-Memory Storage (ArrayList)
*   **Libraries**: Lombok (Boilerplate 코드 제거)

## 3. 핵심 기능 요구사항 (Functional Requirements)
... (생략) ...
*   **MVC 패턴 준수**: Model, View(React), Controller의 역할을 명확히 분리하여 구현합니다.

### 3.1. 게시글 목록 조회 (Read - List)
*   사용자는 전체 게시글의 목록을 볼 수 있습니다.
*   목록에는 게시글 ID, 제목, 작성자, 작성일이 표시됩니다.
*   (선택) 페이지네이션 기능이 제공됩니다.

### 3.2. 게시글 상세 조회 (Read - Detail)
*   사용자는 목록에서 특정 게시글을 클릭하여 상세 내용을 볼 수 있습니다.
*   상세 페이지에는 제목, 작성자, 작성일, 본문 내용이 표시됩니다.

### 3.3. 게시글 작성 (Create)
*   사용자는 새로운 게시글을 작성할 수 있습니다.
*   입력 항목: 제목, 작성자, 비밀번호(수정/삭제용), 본문
*   필수 입력값 검증이 포함되어야 합니다.

### 3.4. 게시글 수정 (Update)
*   사용자는 자신이 작성한 게시글을 수정할 수 있습니다.
*   수정 시 작성할 때 입력한 비밀번호 확인 절차가 필요합니다. (또는 인증/인가 시스템 도입)
*   수정 항목: 제목, 본문

### 3.5. 게시글 삭제 (Delete)
*   사용자는 자신이 작성한 게시글을 삭제할 수 있습니다.
*   삭제 시 작성할 때 입력한 비밀번호 확인 절차가 필요합니다. (또는 인증/인가 시스템 도입)

## 4. 데이터 모델 (Schema)

**Post Entity**
*   `id` (Long, PK): 게시글 고유 식별자
*   `title` (String): 게시글 제목
*   `content` (Text): 게시글 본문
*   `author` (String): 작성자 이름
*   `password` (String): 게시글 비밀번호 (수정/삭제 권한 확인용)
*   `createdAt` (DateTime): 작성 일시
*   `updatedAt` (DateTime): 수정 일시

## 5. UI/UX 화면 구성 (Views)
1.  **목록 페이지 (`/`)**: 게시글 리스트 출력 및 '글쓰기' 버튼 제공
2.  **상세 페이지 (`/posts/{id}`)**: 게시글 내용 출력 및 '수정', '삭제', '목록' 버튼 제공
3.  **작성 페이지 (`/write`)**: 폼 입력 및 '저장', '취소' 버튼 제공
4.  **수정 페이지 (`/edit/{id}`)**: 기존 데이터 폼 입력 및 '수정완료', '취소' 버튼 제공
5.  **비밀번호 확인 모달/페이지**: 수정 또는 삭제 전 권한 확인용

## 6. 개발 단계 계획 (Implementation Steps)
1.  **1단계 (환경 설정)**: 백엔드/프론트엔드 기본 프로젝트 구성 및 연동 확인 (CORS 등)
2.  **2단계 (백엔드 API)**: Post 도메인 클래스, Service(ArrayList 관리), Controller 개발 및 테스트
3.  **3단계 (프론트엔드 UI)**: 게시판 UI 컴포넌트(목록, 상세, 폼) 퍼블리싱 및 라우팅 설정
4.  **4단계 (기능 연동)**: 프론트엔드에서 백엔드 API를 호출하여 실제 데이터 처리
5.  **5단계 (마무리)**: 에러 처리, 입력 검증 강화 및 최종 테스트
