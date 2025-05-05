import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import config from "./src/constants/app.constants";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const USE_BASE_PATH = process.env.VITE_USE_BASE_PATH === "true";
  const BASE_PATH = process.env.VITE_BASE_PATH;
  const APP_PORT = parseInt(process.env.VITE_APP_PORT!, 10);

  return {
    base: USE_BASE_PATH ? `/${BASE_PATH}/` : "/",
    plugins: [react()],
    server: {
      port: APP_PORT || config.APP_PORT,
    },
  };
});
