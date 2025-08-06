import type { Config } from "@react-router/dev/config";
export default {
  appDirectory: "app",
  buildDirectory: "build",
  ssr: true,
  basename: "/",
  future: {
    unstable_middleware: true,
  },
} satisfies Config;