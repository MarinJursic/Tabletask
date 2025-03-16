import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// 🔹 Define Pagination Meta Schema
export const PaginationMetaSchema = z.object({
  currentPage: z.number(),
  itemCount: z.number(),
  itemsPerPage: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
});

// 🔹 Define Content Item Schema (Includes Avatar in Name Column)
export const ContentItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatarUrl: z.string().optional(), // Avatar image for content
});

// 🔹 Define Trends Item Schema (Formats Data Properly)
export const TrendsItemSchema = z.object({
  id: z.string(),
  name: z.string(), // Was "title"
  date: z.string(), // Formatted retrievalDate
  description: z.string(), // Was "summary"
  url: z.string().url(), // Open new tab on row click
});

// 🔹 Infer TypeScript Types from Zod
export type ContentItem = z.infer<typeof ContentItemSchema>;
export type TrendsItem = z.infer<typeof TrendsItemSchema>;
export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

export type TableType = ContentItem | TrendsItem;
