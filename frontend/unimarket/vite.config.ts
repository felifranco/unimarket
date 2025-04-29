import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import config from "./src/constants/app.constants";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    base: "/unimarket/",
    plugins: [react()],
    server: {
      port: config.APP_PORT,
    },
  };
});
