import { type RouteConfig, index, route } from '@react-router/dev/routes';
 
export default [
    index('./routes/index.tsx'),
    route('space', './routes/space.tsx'),
    route('gaming', './routes/gaming.tsx'),
    route('science', './routes/science.tsx'),
    route('sports', './routes/sports.tsx'),
    route('tech', './routes/tech.tsx')
] satisfies RouteConfig;