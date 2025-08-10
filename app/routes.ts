import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes';
 
export default [
    index('./routes/news.tsx'),
    route('space', './routes/space.tsx'),
    route('gaming', './routes/gaming.tsx'),
    route('science', './routes/science.tsx'),
    route('sports', './routes/sports.tsx'),
    route('tech', './routes/tech.tsx'),
    ...prefix("api", [
        route("subreddit/*", "./api/subreddit.tsx"),
    ]),
] satisfies RouteConfig;