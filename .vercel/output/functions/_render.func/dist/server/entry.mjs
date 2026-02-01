import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_C8TgSeEZ.mjs';
import { manifest } from './manifest_COPpvSqz.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/blog/_slug_.astro.mjs');
const _page2 = () => import('./pages/blog.astro.mjs');
const _page3 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page4 = () => import('./pages/projects.astro.mjs');
const _page5 = () => import('./pages/projects/_---slug_.astro.mjs');
const _page6 = () => import('./pages/robots.txt.astro.mjs');
const _page7 = () => import('./pages/rss.xml.astro.mjs');
const _page8 = () => import('./pages/tags/_tag_.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.7.4_jiti@1.21.0_rollup@4.40.0_typescript@5.4.2/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/blog/[slug].ts", _page1],
    ["src/pages/blog/index.astro", _page2],
    ["src/pages/blog/[...slug].astro", _page3],
    ["src/pages/projects/index.astro", _page4],
    ["src/pages/projects/[...slug].astro", _page5],
    ["src/pages/robots.txt.ts", _page6],
    ["src/pages/rss.xml.ts", _page7],
    ["src/pages/tags/[tag].astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "12bf6b50-73e1-4bf3-ba29-9ad520b12231",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
