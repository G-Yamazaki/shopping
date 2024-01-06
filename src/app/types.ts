import * as z from "zod";

export const itemFormSchema = z.object({
  name: z.string(),
  genre: z.string(),
  price: z.number(),
})

export const itemSchema = z.object({
  id: z.number(),
  name: z.string(),
  genre: z.string(),
  price: z.number(),
})
