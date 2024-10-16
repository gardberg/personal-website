import { ReactNode } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames.map(filename => {
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title || filename.replace(/\.md$/, '').replace(/-/g, ' '),
      date: data.date
    };
  });

  // Sort posts by date from the markdown frontmatter
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      {children}
    </>
  )
}
