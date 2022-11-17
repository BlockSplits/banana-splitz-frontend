import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "banana-splitz",
  e2e: {
    baseUrl: "http://localhost:3000"
  },
});