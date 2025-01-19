const withMDX = import('@next/mdx').then(mod => mod.default())

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  output: 'export',
}

module.exports = async () => {
  const mdxConfig = await withMDX
  return mdxConfig(nextConfig)
}
