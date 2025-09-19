react-springboot-todo-starter

React(프론트) + Spring Boot(백엔드)로 간단한 Todo REST 앱을 만드는 실습 저장소입니다.
개발 중에는 CRA 프록시로 CORS 없이 빠르게 연동하고, 백엔드는 MySQL 8를 사용합니다.

✅ 기능

GET /api/hello – 서버 헬스 체크(문자/JSON)

Todo CRUD

GET /api/todos – 목록

POST /api/todos – 생성

PATCH /api/todos/{id}/toggle – 완료/미완료 토글

DELETE /api/todos/{id} – 삭제

🧰 기술 스택

Frontend: React 19 + react-scripts 5

Backend: Spring Boot 3.5.x, Gradle 8, Java 17+ (로컬은 23도 OK)

DB: MySQL 8.x, Spring Data JPA, HikariCP


트러블슈팅(이번 실습에서 실제로 만났던 이슈)

Failed to fetch: 백엔드 미기동/URL 오타/CORS → 프록시 설정 후 상대경로 사용

HTML(index.html) 응답: /api를 프론트(3002)로 직접 호출 → 프록시 설정 누락

Ambiguous mapping: 같은 경로/HTTP 메서드로 매핑 중복 → 경로 정리

Failed to configure a DataSource: JPA 켰는데 DB 설정 없음 → 드라이버/URL/계정 설정 or JPA 제외

Access denied for user '"root"': username에 따옴표 포함 → 따옴표 제거

open-in-view 파싱 오류: properties 인라인 주석 사용 → 주석은 다음 줄에

not-null property ... Todo.completed: completed가 null → 원시형 boolean + 기본값 or @PrePersist/@Builder.Default
