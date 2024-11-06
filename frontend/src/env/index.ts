import { z } from "zod";

const envSchema = z.object({
  VITE_NODE_ENV: z.enum(["dev", "production"]),
  VITE_URL_API: z.string(),
});

const _env = envSchema.safeParse(import.meta.env);

if (_env.success === false) {
  console.error(
    "❌ Alguma variável de ambiente está faltando",
    _env.error.format()
  );

  throw new Error("Alguma variável de ambiente está faltando.");
}

export const env = _env.data;
