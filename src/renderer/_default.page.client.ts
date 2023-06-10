import type { PageContextClient } from './types';
import { createApp, getPageTitle } from './app';

export function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;

  if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined');

  createApp(Page, pageProps, pageContext).mount('#app');

  document.title = getPageTitle(pageContext);
}
