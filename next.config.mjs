import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'vesper',
          bypassInlineCode: true,
          keepBackground: false,
          defaultLang: {
            block: 'text',
            inline: 'text',
          },
          transformers: [
            transformerNotationDiff(),
            transformerNotationHighlight(),
            transformerMetaHighlight(),
          ],
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
