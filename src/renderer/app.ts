import type { Component, PageContext, PageProps } from './types';
import { createSSRApp, h } from 'vue';

import { setPageContext } from './usePageContext';
import PageLayout from './PageLayout.vue';

export function createApp(Page: Component, pageProps: PageProps, pageContext: PageContext) {
  const app = createSSRApp({
    render() {
      return h(PageLayout, {}, {
        default: () => h(Page, pageProps || {})
      });
    }
  });

  setPageContext(app, pageContext);

  return app;
}

export function getPageTitle(pageContext: {
  exports: { documentProps?: { title: string } }
  documentProps?: { title: string }
}): string {
  const title =
    // For static titles (defined in the `export { documentProps }` of the page's `.page.js`)
    (pageContext.exports.documentProps || {}).title ||
    // For dynamic tiles (defined in the `export addContextProps()` of the page's `.page.server.js`)
    (pageContext.documentProps || {}).title ||
    'SaaSGlue';

  return title;
}
