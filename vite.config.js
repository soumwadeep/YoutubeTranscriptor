import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.FIREBASE_API_KEY": JSON.stringify(env.FIREBASE_API_KEY),
      "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(
        env.FIREBASE_AUTH_DOMAIN
      ),
      "process.env.FIREBASE_PROJECT_ID": JSON.stringify(
        env.FIREBASE_PROJECT_ID
      ),
      "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(
        env.FIREBASE_STORAGE_BUCKET
      ),
      "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
        env.FIREBASE_MESSAGING_SENDER_ID
      ),
      "process.env.YOUTUBE_API_KEY": JSON.stringify(env.YOUTUBE_API_KEY),
      "process.env.YOUTUBE_WORK_API_KEY": JSON.stringify(
        env.YOUTUBE_WORK_API_KEY
      ),
      "process.env.YOUTUBE_WORK_CLIENT_ID": JSON.stringify(
        env.YOUTUBE_WORK_CLIENT_ID
      ),
      "process.env.YOUTUBE_WORK_CLIENT_SECRET_KEY": JSON.stringify(
        env.YOUTUBE_WORK_CLIENT_SECRET_KEY
      ),
    },
    plugins: [react()],
  };
});
