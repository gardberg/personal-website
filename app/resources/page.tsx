import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

export default async function Resources() {
  const resourcesFile = path.join(process.cwd(), 'resources', 'favorite-links.md');
  const fileContents = fs.readFileSync(resourcesFile, 'utf8');

  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return (
    <article className="prose lg:prose-4xl max-w-3xl mx-auto">
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
