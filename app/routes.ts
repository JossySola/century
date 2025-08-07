/*
import { 
    type RouteConfig,
} from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default flatRoutes() satisfies RouteConfig;
*/

import { type RouteConfig, index } from '@react-router/dev/routes';
 
export default [index('routes/index.tsx')] satisfies RouteConfig;