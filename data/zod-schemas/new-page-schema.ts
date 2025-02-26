import { z } from 'zod'

export const newPageSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'required' })
    .max(80, { message: 'must be less than 80 characters' }),
  description: z
    .string()
    .min(3, { message: 'must be at least 3 characters' })
    .max(80, { message: 'must be less than 80 characters' })
    .optional()
    .or(z.literal('')),
  slug: z
    .string()
    .min(1, 'cannot be empty') // Ensure the slug is not empty
    .max(100, 'is too long') // Optional: Set a maximum length
    .regex(
      /^[a-z0-9-]+$/,
      'can only contain lowercase letters, numbers, and hyphens'
    ) // Validate the format
    .refine((slug) => !slug.startsWith('-') && !slug.endsWith('-'), {
      message: 'Slug cannot start or end with a hyphen',
    }),
})
