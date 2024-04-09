import { d as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_CK6YqLPI.mjs';

const html = "<h1 id=\"how-to-contribute\">How to contribute</h1>\n<p>Currently, I am maintaining ufc-api all by myself.</p>\n<br>\n<p>It would be much appreciated if you were to star it on github: <a href=\"https://github.com/eliasuran/ufc-api\">https://github.com/eliasuran/ufc-api</a>.</p>\n<br>\n<p>If you wish to contribute to ufc-api, just clone the project and make your changes in a branch:</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#B392F0\">git</span><span style=\"color:#9ECBFF\"> clone</span><span style=\"color:#9ECBFF\"> https://github.com/eliasuran/ufc-api.git</span></span>\n<span class=\"line\"><span style=\"color:#79B8FF\">cd</span><span style=\"color:#9ECBFF\"> ufc-api</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">git</span><span style=\"color:#9ECBFF\"> checkout</span><span style=\"color:#79B8FF\"> -b</span><span style=\"color:#9ECBFF\"> awesome-feature</span></span>\n<span class=\"line\"></span></code></pre>\n<p>When you have made your change, push the changes:</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#B392F0\">git</span><span style=\"color:#9ECBFF\"> push</span><span style=\"color:#9ECBFF\"> origin</span><span style=\"color:#9ECBFF\"> awesome-feature</span></span>\n<span class=\"line\"></span></code></pre>\n<p>And then make a pull request on the github website :)</p>";

				const frontmatter = {"title":"How to contribute","desc":"How you can contribute to ufc-api","category":"y Contribution"};
				const file = "/Users/elura001/repos/ufc-api/docs/src/content/pages/How_to_contribute.md";
				const url = "/How_to_contribute";
				function rawContent() {
					return "# How to contribute\n\nCurrently, I am maintaining ufc-api all by myself.\n\n<br />\n\nIt would be much appreciated if you were to star it on github: https://github.com/eliasuran/ufc-api.\n\n<br />\n\nIf you wish to contribute to ufc-api, just clone the project and make your changes in a branch:\n\n```bash\ngit clone https://github.com/eliasuran/ufc-api.git\ncd ufc-api\ngit checkout -b awesome-feature\n```\n\nWhen you have made your change, push the changes:\n\n```bash\ngit push origin awesome-feature\n```\n\nAnd then make a pull request on the github website :)\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"how-to-contribute","text":"How to contribute"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
