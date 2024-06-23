import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import React from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-supabase-auth.vercel.app",
  //認証を使うのでSSRで出力
  output: "server",
  adapter: vercel(),
  integrations: [tailwind(), React()],
});
