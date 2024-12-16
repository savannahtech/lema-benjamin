## Running the Application Locally

### Prerequisites

- Node.js (at least v16)
- npm (at least v8)
- SQLite (comes bundled with Node.js)

### Backend

1. Clone the repository.
2. Navigate into the `backend` directory.
3. Install dependencies with `npm install`.
4. Build the server in dist folder with `npm run build`.
5. Start the server in dist folder with `npm run start`.
6. Start the locally or on development with `npm run dev`.

The server should now be accessible at `http://localhost:3001`.

### Frontend

1. Clone the repository.
2. Navigate into the `client` directory.
3. Install dependencies with `npm install`.
4. Set environment variables in a `.env` file (see `.env.local.example`).
5. Start the development server with `npm run dev`.
6. Build the client side with `npm run build`.
7. Test the components with `npm run test`

The client should now be accessible at `http://localhost:5173`.

### Project Structure

```
project-root/
├── .gitignore
├── README.md
├── backend/
│   ├── .DS_Store
│   ├── config/
│   │   └── default.json
│   ├── logger.ts
│   ├── nodemon.json
│   ├── package.json
│   ├── README.md
│   ├── src/
│   │   ├── db/
│   │   │   ├── connection.ts
│   │   │   ├── posts/
│   │   │   │   ├── posts.ts
│   │   │   │   ├── query-templates.ts
│   │   │   │   └── types.ts
│   │   │   ├── users/
│   │   │   │   ├── query-templates.ts
│   │   │   │   ├── types.ts
│   │   │   │   └── users.ts
│   │   ├── index.ts
│   │   ├── routes/
│   │   │   ├── posts.ts
│   │   │   └── users.ts
│   │   ├── utils/
│   │   │   └── logger.ts
│   ├── tsconfig.json
├── client/
│   ├── .DS_Store
│   ├── .env
│   ├── .env.local.example
│   ├── .gitignore
│   ├── babel.config.js
│   ├── eslint.config.js
│   ├── index.html
│   ├── jest.config.js
│   ├── jest.setup.js
│   ├── package.json
│   ├── postcss.config.js
│   ├── public/
│   ├── README.md
│   ├── src/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets/
│   │   │   ├── icons/
│   │   │   │   ├── addCircle.svg
│   │   │   │   ├── arrow.svg
│   │   │   │   └── delete.svg
│   │   │   └── index.ts
│   │   ├── components/
│   │   │   ├── index.ts
│   │   │   ├── Loader.tsx
│   │   │   ├── NewPostCard.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── PostCard.tsx
│   │   │   ├── PostFormModal.tsx
│   │   ├── hooks/
│   │   │   ├── usePosts.ts
│   │   │   ├── useUsers.ts
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── pages/
│   │   │   ├── index.ts
│   │   │   ├── UserPosts.tsx
│   │   │   ├── Users.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── index.ts
│   │   ├── setupTests.ts
│   │   ├── tests/
│   │   │   ├── Pagination.test.tsx
│   │   │   ├── PostFormModal.test.tsx
│   │   ├── types/
│   │   │   ├── formData.ts
│   │   │   ├── posts.ts
│   │   │   ├── svg.d.ts
│   │   │   ├── users.ts
│   │   ├── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── tsconfig.test.json
│   ├── vercel.json
│   ├── vite.config.d.ts
│   ├── vite.config.js
│   ├── vite.config.ts
```
