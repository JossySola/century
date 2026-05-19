import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes';
 
export default [
    index('./routes/_index.tsx'),
    route("*", "./routes/$.tsx"),
    route('space', './routes/space.tsx'),
    route('gaming', './routes/gaming.tsx'),
    route('science', './routes/science.tsx'),
    route('sports', './routes/sports.tsx'),
    route('tech', './routes/tech.tsx'),
    route('news', './routes/news.tsx'),
    route('signout', './routes/signout.tsx'),
    route('r/:subreddit', "./routes/subreddit.tsx"),
    ...prefix("api", [
        route("r/*", "./api/comments.ts"),
        route("comment/:id", "./api/comment.ts"),
        route("vote/:id/:vote", "./api/vote.ts"),
        route("del/:id", "./api/del.ts"),
        route("editusertext/:id", "./api/editusertext.ts"),
        route("save/:id/:category", "./api/save.ts"),
        route("unsave/:id", "./api/unsave.ts"),
        route("saved_categories", "./api/saved_categories.ts"),
    ]),
] satisfies RouteConfig;