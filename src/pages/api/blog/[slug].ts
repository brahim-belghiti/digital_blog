export const prerender = false;

import { getEntry } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET({ params }: APIContext) {
  const slug = params.slug!;
  const entry = await getEntry('blog', slug);
  console.log('🚀 ~ GET ~ entry:', entry);
  return slug;
  // if (!entry) {
  //   return new Response(JSON.stringify({ error: 'Not found' }), {
  //     status: 404,
  //   });
  // }

  // return new Response(
  //   JSON.stringify({
  //     content: entry.body,
  //     frontmatter: entry.data,
  //   }),
  //   {
  //     status: 200,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // );
}
