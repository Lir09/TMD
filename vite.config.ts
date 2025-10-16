import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/TMD/", // ✅ 깃허브 리포지토리 이름과 동일하게!
});
