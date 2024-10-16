const withMDX = import('@next/mdx').then(mod => mod.default())

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

module.exports = async () => {
  const mdxConfig = await withMDX
  return mdxConfig(nextConfig)
}
