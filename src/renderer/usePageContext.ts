// `usePageContext` allows us to access `pageContext` in any Vue component.
// See https://vite-plugin-ssr.com/pageContext-anywhere

import { inject } from 'vue';
import { PageContext } from './types';

const key = Symbol();

export function usePageContext(): PageContext { 
  return inject(key);
}

export function setPageContext(app: any, pageContext: PageContext): void {
  app.provide(key, pageContext);
};
