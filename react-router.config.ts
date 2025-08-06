import type { Config } from "@react-router/dev/config";
export default {
  future: {
    unstable_middleware: true,
  },
  appDirectory: "app",
  buildDirectory: "build",
  ssr: true,
  basename: "/",
} satisfies Config;