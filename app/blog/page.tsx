import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogPostList from '../components/BlogPostList';
import { BlogPost } from '../types';

export default function BlogIndex() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  const posts: BlogPost[] = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title || slug,
      date: matterResult.data.date ? new Date(matterResult.data.date).toISOString() : 'Unknown date',
    };
  });

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-3xl mx-auto">
      <BlogPostList posts={posts} />
    </div>
  );
}
