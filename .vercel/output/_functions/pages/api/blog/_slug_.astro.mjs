import { g as getEntry } from '../../../chunks/_astro_content_DH8OuLc9.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
async function GET({ params }) {
  const slug = params.slug;
  const entry = await getEntry("blog", slug);
  console.log("🚀 ~ GET ~ entry:", entry);
  return slug;
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
