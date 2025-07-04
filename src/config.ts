import * as dotenv from 'dotenv';
import { z } from 'zod/v4';

export const Config = z.object({
  port: z.coerce.number().int().positive().default(3000),
  apiKey: z.string().trim().min(1, 'API key is required'),
  baseUrl: z.url().default('https://openrouter.ai/api/v1'),
});
export type Config = z.infer<typeof Config>;

export const getConfig = (): Config => {
  dotenv.config();
  return Config.parse({
    port: process.env.PORT,
    apiKey: process.env.API_KEY,
    baseUrl: process.env.BASE_URL,
  });
};
