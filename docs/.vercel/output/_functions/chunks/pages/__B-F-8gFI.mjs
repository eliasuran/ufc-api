/* empty css                           */
import { c as createAstro, d as createComponent, r as renderTemplate, e as addAttribute, A as AstroError, f as UnknownContentCollectionError, g as renderUniqueStylesheet, h as renderScriptElement, i as createHeadAndContent, j as renderComponent, u as unescapeHTML, m as maybeRenderHead, F as Fragment, k as renderHead, l as renderSlot } from '../astro_CK6YqLPI.mjs';
import { p as prependForwardSlash } from '../astro/assets-service_Dt69Ungj.mjs';
/* empty css                           */

const $$Astro$3 = createAstro();
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/elura001/repos/ufc-api/docs/node_modules/.pnpm/astro@4.5.16_typescript@5.4.4/node_modules/astro/components/ViewTransitions.astro", void 0);

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}, {})?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      entries = await Promise.all(
        lazyImports.map(async (lazyImport) => {
          const entry = await lazyImport();
          return type === "content" ? {
            id: entry.id,
            slug: entry.slug,
            body: entry.body,
            collection: entry.collection,
            data: entry.data,
            async render() {
              return render({
                collection: entry.collection,
                id: entry.id,
                renderEntryImport: await getRenderEntryImport(collection, entry.slug)
              });
            }
          } : {
            id: entry.id,
            collection: entry.collection,
            data: entry.data
          };
        })
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/pages/How_to_contribute.md": () => import('../How_to_contribute_DqISqGox.mjs'),"/src/content/pages/Introduction.md": () => import('../Introduction_B5uEhDJc.mjs'),"/src/content/pages/test.md": () => import('../test_Dq69dXHG.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"pages":{"type":"content","entries":{"how_to_contribute":"/src/content/pages/How_to_contribute.md","introduction":"/src/content/pages/Introduction.md","test":"/src/content/pages/test.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/pages/How_to_contribute.md": () => import('../How_to_contribute_Ctzh0jCy.mjs'),"/src/content/pages/Introduction.md": () => import('../Introduction_BJyyT-Og.mjs'),"/src/content/pages/test.md": () => import('../test_Cnv9A6CC.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const $$Astro$2 = createAstro();
const $$Sidenav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Sidenav;
  const pages = await getCollection("pages");
  const sortedCategory = Object.groupBy(pages, ({ data }) => data.category);
  const sorted = Object.entries(sortedCategory).toSorted();
  return renderTemplate`${maybeRenderHead()}<div class="w-64 p-6 h-screen bg-primary flex flex-col overflow-y-scroll text-bg"> <a href="/" class="text-3xl my-2 italic font-bold">ufc-api</a> ${sorted.map((category) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a${addAttribute(`/${category[1] && category[1][0].slug}`, "href")} class="text-lg"> ${category[0].split(" ").slice(1).join(" ")} </a> ${category[1] && category[1].map((page) => renderTemplate`<a${addAttribute(`/${page.slug}`, "href")}${addAttribute(`${page.slug === Astro2.url.pathname.split("/")[1] && "font-bold"} hover:underline rounded-md ml-4 p-1`, "class")}> ${page.data.title} </a>`)}` })}`)} </div>`;
}, "/Users/elura001/repos/ufc-api/docs/src/components/Sidenav.astro", void 0);

const $$Astro$1 = createAstro();
const $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, desc } = Astro2.props;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"${addAttribute(desc, "content")}><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(desc, "content")}>${renderHead()}</head> <body class="absolute font-mono overflow-hidden bg-bg text-text flex"> ${renderComponent($$result, "Sidenav", $$Sidenav, {})} <div class="p-12"> ${renderSlot($$result, $$slots["default"])} </div> </body></html>`;
}, "/Users/elura001/repos/ufc-api/docs/src/layouts/BaseLayout.astro", void 0);

const $$Astro = createAstro();
async function getStaticPaths() {
  const pages = await getCollection("pages");
  return pages.map((page) => ({
    params: { slug: page.slug },
    props: { page }
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.props;
  const { Content } = await page.render();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": page.data.title, "desc": page.data.desc }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="text-text prose h-screen overflow-y-scroll"> ${renderComponent($$result2, "Content", Content, {})} </div> ` })} `;
}, "/Users/elura001/repos/ufc-api/docs/src/pages/[...slug].astro", void 0);

const $$file = "/Users/elura001/repos/ufc-api/docs/src/pages/[...slug].astro";
const $$url = "/[...slug]";

const ____slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$BaseLayout as $, ____slug_ as _ };
