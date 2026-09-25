# 🔌 Django REST Framework (DRF) API Specification

**Base URL**: `http://localhost:8000`  
**Authentication Header**: `Authorization: Token <token_key>` *(e.g. `Authorization: Token 38df5c02b324e5e8f1379e1ab287cca69a562b02`)*  

---

## 1. Authentication Endpoints

### 1.1 User Login
* **Route**: `POST http://localhost:8000/users/auth/login/`
* **Request Body**:
  ```json
  {
    "email": "test@gmail.com",
    "password": "django_user"
  }
  ```
* **Success Response (`200 OK`)**:
  ```json
  {
    "token": "c0794a639ed85570159d21bd360efb9d873d3b27",
    "user": {
      "id": 2,
      "email": "test@gmail.com",
      "username": "testuser",
      "first_name": "Test",
      "middle_name": null,
      "last_name": "User"
    }
  }
  ```

---

### 1.2 User Logout
* **Route**: `POST http://localhost:8000/users/auth/logout/`
* **Headers**: `Authorization: Token <token_key>`
* **Success Response (`200 OK`)**:
  ```json
  {
    "detail": "Successfully logged out."
  }
  ```

---

## 2. Profile Endpoint

### 2.1 Get User Profile
* **Route**: `GET http://localhost:8000/users/profile/`
* **Headers**: `Authorization: Token <token_key>`
* **Success Response (`200 OK`)**:
  ```json
  {
    "id": 1,
    "user": {
      "id": 2,
      "email": "test@gmail.com",
      "username": "testuser",
      "first_name": "Test",
      "middle_name": null,
      "last_name": "User"
    },
    "profile_picture": "http://localhost:8000/media/profiles/Tiger.jpg",
    "bio": "Software Engineer",
    "followers_count": 0,
    "following_count": 0,
    "created_at": "2026-09-25T23:45:01.437435+05:30",
    "updated_at": "2026-09-25T23:45:01.437455+05:30"
  }
  ```

---

## 3. Posts Endpoints

### 3.1 List Posts
* **Route**: `GET http://localhost:8000/users/posts/`
* **Headers**: `Authorization: Token <token_key>`
* **Success Response (`200 OK`)**:
  ```json
  [
    {
      "id": 7,
      "user": 3,
      "username": "testuser",
      "caption": "Panther Spotted!!!",
      "image": "http://localhost:8000/media/posts/Panther_EQPK7VP.jpg",
      "likes_count": 0,
      "comments_count": 0,
      "shares_count": 0,
      "is_liked": false,
      "created_at": "2026-09-26T00:43:36.442750+05:30",
      "updated_at": "2026-09-26T00:44:25.961003+05:30"
    }
  ]
  ```

---

### 3.2 Create Post (Binary File Upload)
* **Route**: `POST http://localhost:8000/users/posts/`
* **Headers**: `Authorization: Token <token_key>`
* **Content-Type**: `multipart/form-data`
* **Request Body (FormData)**:
  - `caption`: `First Post` (Text)
  - `image`: `<binary File (e.g. Panther.jpg)>` (File)
* **Success Response (`201 Created` / `200 OK`)**:
  ```json
  {
    "id": 7,
    "user": 3,
    "username": "testuser",
    "caption": "First Post",
    "image": "http://localhost:8000/media/posts/Panther_EQPK7VP.jpg",
    "likes_count": 0,
    "comments_count": 0,
    "shares_count": 0,
    "is_liked": false,
    "created_at": "2026-09-26T00:43:36.442750+05:30",
    "updated_at": "2026-09-26T00:44:25.961003+05:30"
  }
  ```

---

### 3.3 Update Post Caption
* **Route**: `PATCH http://localhost:8000/users/posts/{id}/`
* **Headers**: `Authorization: Token <token_key>`, `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "caption": "Panther Spotted!!!"
  }
  ```
* **Success Response (`200 OK`)**:
  ```json
  {
    "id": 7,
    "user": 3,
    "username": "testuser",
    "caption": "Panther Spotted!!!",
    "image": "http://localhost:8000/media/posts/Panther_EQPK7VP.jpg",
    "likes_count": 0,
    "comments_count": 0,
    "shares_count": 0,
    "is_liked": false,
    "created_at": "2026-09-26T00:43:36.442750+05:30",
    "updated_at": "2026-09-26T00:44:25.961003+05:30"
  }
  ```

---

### 3.4 Delete Post
* **Route**: `DELETE http://localhost:8000/users/posts/{id}/`
* **Headers**: `Authorization: Token <token_key>`
* **Success Response (`200 OK`)**:
  ```json
  {
    "detail": "Post deleted successfully."
  }
  ```
