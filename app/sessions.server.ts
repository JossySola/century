import { createCookieSessionStorage } from "react-router";

type SessionData = {
  access_token: string;
  access_mode: string;
  access_expires_in: string;
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
        maxAge: 86400,
        path: "/",
        secure: true,
        secrets: [process.env.SESSION_SECRET!],
      },
    },
  );

export { getSession, commitSession, destroySession };
