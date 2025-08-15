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
    route('r/:subreddit', "./routes/r.$subreddit.tsx"),
    ...prefix("api", [
        route("subreddit/*", "./api/subreddit.$.tsx"),
        route("author/:name", "./api/author.$name.tsx"),
    ]),
] satisfies RouteConfig;