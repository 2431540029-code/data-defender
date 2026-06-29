import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    fs: {
      // Cho phép truy cập và xử lý chính xác tài nguyên tĩnh
      strict: false
    }
  }
});