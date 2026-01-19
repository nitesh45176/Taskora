import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        // For headings
        heading: ["Plus Jakarta Sans", "sans-serif"],
        // For body text
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
