# How to add an article

1. Create a folder under `src/pages/blog`. Its name must be written in kebab-case notation, SSR plugin will translate folder name into URL, article will be accessible under the URL. (e.g. http://saasglue.com/blog/folder-name-will-be-here).
2. In recently created folder create 2 mandatory files `index.page.server.ts` and `index.page.vue`.
3. SSR plugin uses `index.page.server.ts` to generate document's `title` and `description`. These are used for SEO.
4. `index.page.vue` is the actual article. SSR plugin will generate an html page based on this file. Open any existing `index.page.vue` and copy the sceleton for the new article.
5. Open `src/pages/blog/articles.ts` file and add an information about new article to the default export of the file. This file exports list of existing articles, the list is used to generate article cards at `/blog` page and a list of 6 latest articles in the main footer.
6. Make sure that meta information of the article is the same in both `index.page.server.ts` and `index.page.vue` files (e.g. article title, tags, url, image).
