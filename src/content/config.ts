// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const reportsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string().transform((str) => new Date(str)), 
    // 关键：我们告诉 Astro，frontmatter 里会有一个叫 data 的字段，它的内容不限
    data: z.any(),
  }),
});

export const collections = {
  'reports': reportsCollection,
};