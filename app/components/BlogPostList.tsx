import Link from 'next/link';
import { BlogPost } from '../types';

interface BlogPostListProps {
  posts: BlogPost[];
  showAllPostsLink?: boolean;
}

export default function BlogPostList({ posts, showAllPostsLink = false }: BlogPostListProps) {
  return (
    <section className="mb-12">
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="textarea">
            <Link href={`/blog/${post.slug}`} className="block p-4 transition duration-150 ease-in-out">
              <h2 className="text-lg font-medium">
                {post.title}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(post.date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).replace(/(\d+)(?=(st|nd|rd|th))/, '$1$2')}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      {showAllPostsLink && (
        <div className="mt-4">
          <Link href="/blog" className="text-gray-400 transition duration-150 ease-in-out ml-4">
            all posts
          </Link>
        </div>
      )}
    </section>
  );
}
