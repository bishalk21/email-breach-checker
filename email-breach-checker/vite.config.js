import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  env: {
    REACT_APP_API_ENDPOINT: "https://email-breach-checker.vercel.app/",
  },
});
