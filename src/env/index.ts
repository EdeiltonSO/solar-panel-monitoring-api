import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    SMTP_HOST_DEVELOPMENT: z.string(),
    SMTP_HOST_PRODUCTION: z.string(),
    SMTP_SERVICE_NAME: z.string(),
    SMTP_EMAIL: z.string(),
    SMTP_USER: z.string(),
    SMTP_PASSWORD: z.string(),
    SMTP_PORT: z.coerce.number(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('Invalid environment variables!', _env.error.format())

    throw new Error('Invalid environment variables!')
}

export const env = _env.data