import { vercelPreset } from '@vercel/react-router/vite';
import type { Config } from "@react-router/dev/config";
export default {
  appDirectory: "app",
  buildDirectory: "build",
  ssr: true,
  basename: "/",
  presets: [vercelPreset()],
  future: {
    unstable_middleware: true,
  },
} satisfies Config;