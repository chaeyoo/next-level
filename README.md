# Next Level (게시판)

> Next.js 15, React 19, Server Component를 적극 활용하여 구성한 게시판 웹앱
> 

## 프로젝트 소개

넥스트와 리액트 최신 버전을 습득하고 서버 컴포넌트를 적극 활용하여 제작한 앱입니다.

## 기술 스택

**Language & Major Library**

- Next, Typescript, zustand, Tailwind, Next-auth, tinymce(editor)

**Package Manager, Build tool**

- pnpm

**Database**

- postgre

**CI/CD**

- vervel

## DEMO

- [Next Level](https://next-level-theta.vercel.app)
- 테스트 계정: ID - [test3@email.com](mailto:test2@email.com) | PW - 123456

- 게시판 대시보드 통계
- 게시판 상세
- 게시판 목록
- 로그인
- 게시판 등록
- 게시판 수정
- 회원가입

## 주요기능

**대시보드 통계 3종**

- 게시판 통계, 카테고리 별 통계, 댓글 많은 게시물 순위

**회원가입**

- 이메일, 비밀번호, 닉네임 설정

**로그인**

- 이메일, 비밀번호
- Next-auth Authentication

**게시판 (Authorization 반영)**

- 게시글목록  - 카테고리 필터링, 작성자/제목 검색 기능
- 게시글 상세 - 조회 로그 적재
- 게시글 등록 - 에디터 추가
- 게시글 수정, 삭제
- 좋아요

## 데이터 구조

```sql
CREATE TABLE public.categories (
	id serial4 NOT NULL,
	name varchar(50) NOT NULL,
	CONSTRAINT categories_name_key UNIQUE (name),
	CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public."comments" (
	id serial4 NOT NULL,
	post_id int4 NULL,
	user_id uuid NULL,
	parent_id int4 NULL,
	"content" text NOT NULL,
	created_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT comments_pkey PRIMARY KEY (id),
	CONSTRAINT comments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public."comments"(id),
	CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE,
	CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.likes (
	id serial4 NOT NULL,
	user_id uuid NULL,
	post_id int4 NULL,
	created_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT likes_pkey PRIMARY KEY (id),
	CONSTRAINT likes_user_id_post_id_key UNIQUE (user_id, post_id),
	CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE,
	CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.posts (
	id serial4 NOT NULL,
	user_id uuid NULL,
	category_id int4 NOT NULL DEFAULT 1,
	title varchar(200) NOT NULL,
	"content" text NOT NULL,
	created_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT posts_pkey PRIMARY KEY (id),
	CONSTRAINT posts_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id),
	CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.users (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	"name" varchar(255) NOT NULL,
	email text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);
CREATE TABLE public.view_logs (
	id serial4 NOT NULL,
	user_id uuid NULL,
	post_id int4 NULL,
	viewed_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT view_logs_pkey PRIMARY KEY (id),
	CONSTRAINT view_logs_user_id_post_id_key UNIQUE (user_id, post_id),
	CONSTRAINT view_logs_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE,
	CONSTRAINT view_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
```

## 프로젝트 시작하기

### 설치

```
pnpm i
```

### 실행

```
pnpm run dev
```
