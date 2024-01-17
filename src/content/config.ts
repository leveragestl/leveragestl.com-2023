// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define your collection(s)
const postsCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    excerpt: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    author: z.string().default('Matt Kreikemeier'),
    publishDate: z.string().transform(str => new Date(str)),
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

const projectsCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    excerpt: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    author: z.string().default('Matt Kreikemeier'),
    publishDate: z.string().transform(str => new Date(str)),
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'posts': postsCollection,
  'projects': projectsCollection,
};