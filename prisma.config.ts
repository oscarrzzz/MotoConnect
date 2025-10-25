import { defineConfig, env } from "prisma/config";
import * as dotenv from "dotenv";
dotenv.config(); // carga .env

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
