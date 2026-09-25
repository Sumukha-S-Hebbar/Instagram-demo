/**
 * Django REST Framework API Client using browser `fetch`
 * Base URL: http://localhost:8000
 * Auth Header: Authorization: Token <token_key>
 */

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function getAuthHeaders(token) {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    if (token) {
        // Standard DRF Token format: Authorization: Token <key>
        headers['Authorization'] = `Token ${token}`;
    }
    return headers;
}

/**
 * 1. POST /users/auth/login/
 */
export async function loginUser(email, password) {
    const response = await fetch(`${BASE_URL}/users/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || data.detail || data.non_field_errors?.[0] || 'Login failed. Please check credentials.');
    }
    return data;
}

/**
 * 2. POST /users/auth/logout/
 */
export async function logoutUser(token) {
    try {
        await fetch(`${BASE_URL}/users/auth/logout/`, {
            method: 'POST',
            headers: getAuthHeaders(token)
        });
    } catch (e) {
        console.error('Logout error:', e);
    }
}

/**
 * 3. GET /users/profile/
 */
export async function fetchProfile(token) {
    const response = await fetch(`${BASE_URL}/users/profile/`, {
        method: 'GET',
        headers: getAuthHeaders(token)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || 'Failed to fetch profile.');
    }
    return data;
}

/**
 * 4. GET /users/posts/
 */
export async function fetchPosts(token) {
    const response = await fetch(`${BASE_URL}/users/posts/`, {
        method: 'GET',
        headers: getAuthHeaders(token)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || 'Failed to fetch posts.');
    }
    return data;
}

/**
 * 5. POST /users/posts/
 */
export async function createPost(token, imageUrl, caption) {
    const response = await fetch(`${BASE_URL}/users/posts/`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify({ caption, image: imageUrl })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || data.error || 'Failed to create post.');
    }
    return data;
}

/**
 * 6. PATCH /users/posts/<id>/
 * Request Header: Authorization: Token <token_key>
 * Request Body: { "caption": "Panther Spotted!!!" }
 * Response: { "id": 7, "user": 3, "username": "testuser", "caption": "Panther Spotted!!!", "image": "...", ... }
 */
export async function updatePostCaption(token, postId, newCaption) {
    const response = await fetch(`${BASE_URL}/users/posts/${postId}/`, {
        method: 'PATCH',
        headers: getAuthHeaders(token),
        body: JSON.stringify({ caption: newCaption })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || data.error || 'Failed to update post caption.');
    }
    return data;
}

/**
 * 7. DELETE /users/posts/<id>/
 * Request Header: Authorization: Token <token_key>
 * Response: { "detail": "Post deleted successfully." }
 */
export async function deletePost(token, postId) {
    const response = await fetch(`${BASE_URL}/users/posts/${postId}/`, {
        method: 'DELETE',
        headers: getAuthHeaders(token)
    });
    const data = await response.json();
    if (!response.ok && response.status !== 204) {
        throw new Error(data.detail || 'Failed to delete post.');
    }
    return data?.detail || 'Post deleted successfully.';
}
