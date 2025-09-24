// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// 1. 定义单个情报条目的数据结构
const itemSchema = z.object({
  title: z.string(),
  content: z.string().optional(), // `content` 字段是可选的
  link: z.string().url(),        // 验证 `link` 必须是合法的 URL
  publishDate: z.string(),       // `publishDate` 作为一个字符串
  points: z.number(),
  source: z.string(),
  extra: z.any().optional(),     // `extra` 字段是可选的，且接受任何类型
});

// 2. 定义整个报告文件的数据结构
const reportsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    // `date` 用于报告文件本身的日期，用于排序
    date: z.string().transform((str) => new Date(str)),
    // `data` 字段是一个包含多个情报条目的数组
    data: z.array(itemSchema),
  }),
});

export const collections = {
  'reports': reportsCollection,
};