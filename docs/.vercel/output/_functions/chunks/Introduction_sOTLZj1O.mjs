import { d as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_CK6YqLPI.mjs';

const html = "<h1 id=\"introduction\">Introduction</h1>\n<p>inside folder</p>";

				const frontmatter = {"title":"Introduction","desc":"Introduction to ufc-api","category":"a Getting Started"};
				const file = "/Users/elura001/repos/ufc-api/docs/src/content/pages/Introduction.md";
				const url = "/Introduction";
				function rawContent() {
					return "\n# Introduction\n\ninside folder\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"introduction","text":"Introduction"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
