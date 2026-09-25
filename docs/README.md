# 📸 Instagram Demo — Project Documentation & Architectural Blueprint

Welcome to the **Instagram Demo Project**! This project is designed as both a fully functional mini-Instagram web application and an educational reference to master:
1. **Component-Based UI Architecture**: How encapsulated components (such as `<PostCard />` and `<ProfileHeader />`) allow you to reuse and stamp out UI sections simply by invoking the component name.
2. **Django REST Framework (DRF) Backend Architecture**: RESTful conventions, Token Authentication with `Authorization: Token <token_key>`, serializers, and CRUD viewsets (Create, Read, Update Caption, Delete).

---

## 📚 Documentation Index

Click on the links below to explore each detailed specification document:

| Document | Key Focus Area |
| :--- | :--- |
| 📘 [**Component Architecture Guide**](./COMPONENT_ARCHITECTURE.md) | Component theory, UI breakdown, Props/State data flow, and code examples demonstrating section duplication. |
| 🔌 [**API Specification**](./API_SPECIFICATION.md) | Full endpoint contracts for `http://localhost:8000`, headers, request/response JSON schemas, error codes, and curl commands. |
| 🗄️ [**Database Schema & DRF Models**](./DATABASE_SCHEMA.md) | Relational design (User, Profile, Post), DRF Serializers, and migration specifications. |
| 🚀 [**Project Roadmap & Execution Plan**](./PROJECT_ROADMAP.md) | Step-by-step implementation milestones for backend, frontend, and verification. |

---

## 🏗️ High-Level System Architecture

```mermaid
graph TD
    subgraph Client ["Frontend Component Architecture"]
        UI["App Container"] --> AuthComp["LoginCard Component"]
        UI --> NavComp["Navbar / Header Component"]
        UI --> ProfileComp["ProfileSection Component"]
        ProfileComp --> DP["Avatar / DP Logo"]
        ProfileComp --> GetProfBtn["'Get Profile' Trigger"]
        ProfileComp --> ProfDetails["ProfileDetails Card"]
        UI --> PostSec["Your Posts Section"]
        PostSec --> PostList["Post Grid / Feed"]
        PostList --> P1["PostCard #1"]
        PostList --> P2["PostCard #2"]
        PostList --> P3["PostCard #N (Duplicated / Stamped)"]
        P1 --> EditCap["Update Caption Modal/Form"]
        P1 --> DelBtn["Delete Action"]
    end

    subgraph Backend ["Django REST Framework @ localhost:8000"]
        Router["DRF URL Router"]
        AuthView["Token Auth View"]
        ProfileView["Profile ViewSet / APIView"]
        PostView["Post ViewSet (CRUD)"]
        
        Router --> AuthView
        Router --> ProfileView
        Router --> PostView
    end

    subgraph Storage ["Database & Media"]
        DB[("SQLite / PostgreSQL")]
        Media[("Static / Media Storage")]
    end

    Client -- "HTTP / JSON + Header: Token <key>" --> Router
    Backend --> DB
    Backend --> Media
```

---

## ⚡ Core User Journey & Interaction Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as User
    participant Browser as Frontend App
    participant DRF as DRF Backend (localhost:8000)
    participant DB as Database

    User->>Browser: Enters Username & Password
    Browser->>DRF: POST /api/auth/login/
    DRF->>DB: Validate user & issue Token
    DB-->>DRF: User Authenticated
    DRF-->>Browser: 200 OK {token: "12345trdfw3", user_id: 1, ...}
    Browser->>Browser: Store Token & Render Profile Logo (DP)

    User->>Browser: Clicks "Get Profile"
    Browser->>DRF: GET /api/profile/ (Header: "Authorization: Token 12345trdfw3")
    DRF->>DB: Query User Profile
    DB-->>DRF: Profile Record (bio, stats, avatar)
    DRF-->>Browser: 200 OK {username: "alex", bio: "...", ...}
    Browser->>Browser: Render Profile Details

    User->>Browser: Clicks "Your Posts"
    Browser->>DRF: GET /api/posts/ (Header: "Authorization: Token 12345trdfw3")
    DRF->>DB: Query Posts for current user
    DB-->>DRF: List of Post Objects
    DRF-->>Browser: 200 OK [{id: 1, caption: "...", image_url: "..."}, ...]
    Browser->>Browser: Renders <PostCard /> for each post

    User->>Browser: Edits Caption & Clicks "Update"
    Browser->>DRF: PATCH /api/posts/1/ {caption: "New Caption"}
    DRF->>DB: Update caption field
    DB-->>DRF: Post updated
    DRF-->>Browser: 200 OK {id: 1, caption: "New Caption", ...}
    Browser->>Browser: Update UI state for PostCard #1

    User->>Browser: Clicks "Delete Post"
    Browser->>DRF: DELETE /api/posts/1/
    DRF->>DB: Delete post record
    DB-->>DRF: Deleted
    DRF-->>Browser: 204 No Content
    Browser->>Browser: Remove PostCard #1 from UI
```

---

## 🔑 Key Conventions
- **Base API URL**: `http://localhost:8000`
- **Authentication Scheme**: DRF Token Authentication (`Authorization: Token <token_key>`). Note: Explicitly standard DRF `Token` prefix, **NOT** `Bearer`.
- **Data Interchange**: `application/json` for all request & response payloads.
