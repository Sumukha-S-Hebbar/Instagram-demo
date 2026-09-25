# 📸 Instagram Demo — Next.js & Tailwind CSS Frontend

A modern, component-driven Instagram web application built with **Next.js (App Router)**, **React**, and **Tailwind CSS**, connecting via standard browser \etch\ to **Django REST Framework (DRF)** APIs using Token Authentication (\Authorization: Token <key>\).

---

## 📁 Project Structure

\\	ext
├── docs/                 # Architectural specifications & DRF endpoint docs
├── public/               # Static assets & public icons
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.jsx    # Root Layout & Tailwind styles
│   │   ├── globals.css   # Global styles & Tailwind imports
│   │   ├── page.jsx      # Root router (redirects to /login or /home)
│   │   ├── login/        # Route /login (Sign-in form & Token retrieval)
│   │   │   └── page.jsx
│   │   ├── home/         # Route /home (Overview & Component Concept Sandbox)
│   │   │   └── page.jsx
│   │   ├── profile/      # Route /profile (DP logo, 'Get Profile' trigger & bio details)
│   │   │   └── page.jsx
│   │   └── posts/        # Route /posts (Your Posts feed, caption editing & deletion)
│   │       └── page.jsx
│   ├── components/       # Reusable React UI Components
│   │   ├── Navbar.jsx
│   │   ├── LoginCard.jsx
│   │   ├── ProfileAvatar.jsx
│   │   ├── ProfileDetails.jsx
│   │   ├── PostCard.jsx  # Reusable post section with update & delete options
│   │   └── CreatePostModal.jsx
│   └── lib/
│       └── api.js        # DRF API client using browser fetch
├── .env                  # Environment variables (NEXT_PUBLIC_API_URL)
├── .env.example
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
\
---

## 🚀 Application Routes

| Path | Description |
| :--- | :--- |
| \/login\ | Login screen with username/password. Saves token and redirects to \/home\. |
| \/home\ | Main dashboard showing user DP logo, welcome overview, and Component Reusability demo. |
| \/profile\ | Displays user DP and '⚡ Get Profile' button calling DRF \GET /api/profile/\ with \Authorization: Token <key>\. |
| \/posts\ | 'Your Posts' feed displaying posts with \<PostCard />\ components, caption editing (\PATCH\), and deletion (\DELETE\). |

---

## 🧩 Component-Based Architecture in Practice

In this project, UI sections are built using isolated components:
- **\<PostCard post={p} onUpdateCaption={...} onDeletePost={...} />\**: Reusable post card.
- In \/home\ or \/posts\, writing the component name \<PostCard ... />\ again stamps out an identical section with independent state (like counter, inline caption edit, and delete action).
