import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import React from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  //デバッグモードを有効にする
  server: {
    host: true, // これにより、すべてのネットワークインターフェースにバインドされます
    port: 4321, // 必要に応じてポート番号を変更
  },
  site: "https://astro-supabase-auth.vercel.app",
  output: "server",
  adapter: vercel(),
  integrations: [tailwind(), React()],
});
