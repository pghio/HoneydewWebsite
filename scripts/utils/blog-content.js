import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..', '..');
const BLOG_DIR = path.join(ROOT_DIR, 'public', 'blog');

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatterText = match[1];
  const data = {};

  frontmatterText.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      value = value.replace(/^["']|["']$/g, '');
      data[key] = value;
    }
  });

  return data;
}

export function loadBlogArticles({ sort = true } = {}) {
  const articles = [];

  if (!fs.existsSync(BLOG_DIR)) {
    console.warn(`Blog directory not found: ${BLOG_DIR}`);
    return articles;
  }

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md') && file !== 'CONTENT_STATUS.md');

  files.forEach((file) => {
    try {
      const fullPath = path.join(BLOG_DIR, file);
      const content = fs.readFileSync(fullPath, 'utf8');
      const frontmatter = extractFrontmatter(content);

      if (frontmatter && frontmatter.slug && frontmatter.title) {
        const publishDate = frontmatter.publishDate || '';
        const publishDateValue = publishDate ? new Date(publishDate) : null;
        articles.push({
          slug: frontmatter.slug,
          title: frontmatter.title,
          description: frontmatter.description || '',
          publishDate,
          publishDateValue,
          category: frontmatter.category || 'Article',
          featured:
            frontmatter.featured === 'true' ||
            frontmatter.featured === true ||
            frontmatter.featured === 'yes',
          keywords: frontmatter.keywords || '',
          author: frontmatter.author || 'Honeydew Team',
          image: frontmatter.image || '',
          fileName: file,
          absolutePath: fullPath,
        });
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  });

  if (sort) {
    articles.sort((a, b) => {
      const dateA = a.publishDateValue?.getTime() ?? 0;
      const dateB = b.publishDateValue?.getTime() ?? 0;
      return dateB - dateA;
    });
  }

  return articles;
}

export function splitArticlesByPublishDate(articles, now = new Date()) {
  const checkpoint = new Date(now);
  checkpoint.setHours(0, 0, 0, 0);

  const published = [];
  const scheduled = [];

  articles.forEach((article) => {
    const isPublished =
      !article.publishDateValue || article.publishDateValue <= checkpoint;
    const enriched = { ...article, isPublished };
    if (isPublished) {
      published.push(enriched);
    } else {
      scheduled.push(enriched);
    }
  });

  return { published, scheduled };
}

export { BLOG_DIR };



