import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["react-intl-tel-input"],
    },
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://moovr-api.vercel.app",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});
