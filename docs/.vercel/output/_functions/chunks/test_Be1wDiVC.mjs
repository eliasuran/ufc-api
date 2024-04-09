import { d as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_CK6YqLPI.mjs';

const html = "<h1 id=\"xpp\">xpp</h1>";

				const frontmatter = {"title":"test1","desc":"Introduction to ufc-api","category":"a Getting Started"};
				const file = "/Users/elura001/repos/ufc-api/docs/src/content/pages/test.md";
				const url = "/test";
				function rawContent() {
					return "\n# xpp\n\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"xpp","text":"xpp"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
