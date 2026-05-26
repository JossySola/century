# The 21st Century Times

Inspired by *The New York Times*, **The 21st Century Times** is a Reddit-powered news web app that surfaces popular posts from categories like world news, technology, sports, space, science, and gaming.  
Users can browse posts, open detailed modals, read comments, and interact with Reddit (upvote, comment, save/unsave) when signed in.

## Features

- Category-based feeds (`news`, `tech`, `sports`, `space`, `science`, `gaming`)
- Dynamic subreddit route (`/r/:subreddit`)
- Search for subreddits
- Post modal with preview, metadata, comments drawer, and actions
- Reddit OAuth integration (app-only + user auth flows)
- Voting, commenting, saving, and unsaving
- Optimistic UI updates for voting
- Skeleton loading states for posts and comments
- Unit tests for core auth/query/action utilities

## Tech Stack

- **Framework:** React Router (framework mode)
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling/UI:** TailwindCSS + HeroUI + Motion
- **Testing:** Vitest + mocks
- **Deployment:** Vercel
- **API Source:** Reddit API (OAuth + OAuth-less fallback where applicable)

## Project Structure

```txt
century/
├── app/                              # React Router app source
│   ├── api/                          # Server API routes (Reddit actions/data)
│   │   ├── comment.ts                # POST comment to a Reddit post
│   │   ├── comments.ts               # GET post comments by permalink
│   │   ├── del.ts                    # Delete comment/post action
│   │   ├── editusertext.ts           # Edit user text (comment/post body)
│   │   ├── save.ts                   # Save post/comment
│   │   ├── saved_categories.ts       # Fetch saved categories/items
│   │   ├── signout.ts                # Revoke tokens + destroy session
│   │   ├── unsave.ts                 # Unsave post/comment
│   │   └── vote.ts                   # Upvote/unvote endpoint
│   ├── routes/                       # Page routes
│   │   ├── $.tsx                     # Catch-all route
│   │   ├── _index.tsx                # Home feed (worldnews default)
│   │   ├── gaming.tsx                # Gaming category feed
│   │   ├── news.tsx                  # News category feed
│   │   ├── science.tsx               # Science category feed
│   │   ├── search.tsx                # Subreddit search page
│   │   ├── space.tsx                 # Space category feed
│   │   ├── sports.tsx                # Sports category feed
│   │   ├── subreddit.tsx             # Dynamic subreddit feed (/r/:subreddit)
│   │   └── tech.tsx                  # Technology category feed
│   ├── test/                         # Unit/integration test files
│   │   ├── mocks/                    # Mock handlers and test server setup
│   │   └── unit-testing/             # Feature-focused test suites
│   ├── ui/                           # Reusable UI components
│   │   ├── buttons/                  # Action buttons (upvote, signout)
│   │   ├── cards/                    # Card components (preview, t1, t5)
│   │   ├── drawers/                  # Drawer UIs (comments panel)
│   │   ├── dropdown/                 # Dropdown components (sign menu)
│   │   ├── inputs/                   # Input controls (search, comment form)
│   │   ├── lists/                    # List/nav components
│   │   ├── modals/                   # Modal components (t3 post modal)
│   │   ├── skeletons/                # Loading skeleton components
│   │   ├── icons.tsx                 # Shared custom icons
│   │   └── navbar.tsx                # Top navigation bar
│   ├── utils/                        # Shared logic/helpers
│   │   ├── actions/                  # Action-layer helpers
│   │   ├── authorization/            # OAuth/token/session auth helpers
│   │   ├── formatting/               # Formatting utilities (counts, etc.)
│   │   ├── querying/                 # Reddit API query helpers
│   │   ├── custom-hooks.tsx          # App custom hooks
│   │   └── types.ts                  # Shared TypeScript types
│   ├── app.css                       # Global app styles
│   ├── root.tsx                      # Root layout, loader, providers
│   ├── routes.ts                     # Route definitions/mapping
│   └── sessions.server.ts            # Cookie session storage config
├── public/                           # Static assets served directly
├── .env                              # Environment variables
├── package.json                      # Dependencies and scripts
├── react-router.config.ts            # React Router framework config
├── tailwind.config.ts                # TailwindCSS config
├── tsconfig.json                     # TypeScript config
├── vite.config.ts                    # Vite bundler config
└── vitest.config.ts                  # Vitest testing config
```

## Getting Started
### 1. Install dependencies
```bash
npm install
```
### 2. Configure environment variables
Creates a `.env` file in the root with your Reddit app credentials and session secret (example keys):
```env
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
SESSION_SECRET=your_session_secret
```
### 3. Run development server
```bash
npm run dev
```
### 4. Scripts
```bash
npm run dev        # Start local development server
npm run build      # Build for production
npm run start      # Run production server (if configured)
npm run test       # Run tests
```

### Authentication Note
- The app uses Reddit OAuth for user-authenticated actions.
- App-Only OAuth Flow is used as fallback for public/feed data.
- Signing out revokes Reddit tokens and destroys local session cookie.
*For more information, read this [documentation](https://github.com/reddit-archive/reddit/wiki/oauth2)*

### Testing
Tests are located under:
- `app/test/unit-testing/*`
- `app/test/mocks/*`
Run:
```bash
npm run test
```

### Deployment
This project is deployed on **Vercel** and is compatible with preview deployments and production builds.