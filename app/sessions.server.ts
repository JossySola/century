import { createCookieSessionStorage } from "react-router";

type SessionData = {
  access_token: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      cookie: {
        name: "__session",
        httpOnly: true,
        maxAge: 8400,
        path: "/",
        secure: true,
        secrets: [process.env.SESSION_SECRET!],
      },
    },
  );

export { getSession, commitSession, destroySession };
