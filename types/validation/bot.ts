import { z } from "zod";

// Base schema matching the database table
export const botSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().min(1, "User ID is required"),
  name: z.string().min(1, "Bot name is required").max(100, "Name is too long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description is too long"),
  image: z.string().url("Must be a valid image URL"),
  iconImage: z.string().url("Must be a valid icon URL"),
  link: z.string().url("Must be a valid Telegram link"),
  repoLink: z.string().url("Must be a valid GitHub repository link"),
  status: z.enum(["active", "down"]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Create schema (omit auto-generated fields and userId - will be added server-side)
export const createBotSchema = botSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

// Update schema (all fields optional except id)
export const updateBotSchema = botSchema
  .omit({
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial()
  .required({ id: true });

// Type exports
export type Bot = z.infer<typeof botSchema>;
export type CreateBot = z.infer<typeof createBotSchema>;
export type UpdateBot = z.infer<typeof updateBotSchema>;
