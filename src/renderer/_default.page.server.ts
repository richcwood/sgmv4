import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server';
import { renderToString as renderToString_ } from '@vue/server-renderer';
import type { App } from 'vue';

import type { PageContextServer } from './types';
import { createApp, getPageTitle } from './app';

export async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext;

  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined');

  const appHtml = await renderToString(createApp(Page, pageProps, pageContext));
  const { documentProps } = pageContext as any;

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${documentProps?.description}" />
        <link rel="icon" type="image/png" sizes="32x32" href="/SaasIconRevised.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet" />

        <!-- Load the HubSpot tracking code -->
        <!-- Start of HubSpot Embed Code -->
        <script type="text/javascript" id="hs-script-loader" defer src="//js.hs-scripts.com/7462802.js"></script>
        <script>
          window.addEventListener('DOMContentLoaded', function() {
              const _hsq = window._hsq = window._hsq || [];

              _hsq.push(['setPath', location.pathname]);
              _hsq.push(['trackPageView']);
          });
        </script>
        <!-- End of HubSpot Embed Code -->
  
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-181507791-2"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
    
          gtag('config', 'UA-181507791-2');
        </script>
        <script>
          window.MonacoEnvironment = Object.assign({}, window.MonacoEnvironment, {
            getWorkerUrl (moduleId, label) {
              const paths = {
                javascript: '/monacoeditorwork/ts.worker.bundle.js',
                typescript: '/monacoeditorwork/ts.worker.bundle.js',
                editorWorkerService: '/monacoeditorwork/editor.worker.bundle.js',
              };

              return paths[label] || paths['editorWorkerService'];
            }
          });
        </script>

        <title>${getPageTitle(pageContext)}</title>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`;

  return { documentHtml };
}

async function renderToString(app: App) {
  let err: unknown;
  // Workaround: renderToString_() swallows errors in production, see https://github.com/vuejs/core/issues/7876
  app.config.errorHandler = (err_) => {
    err = err_;
  };

  const appHtml = await renderToString_(app);
  if (err) throw err;

  return appHtml;
}

export const passToClient = ['pageProps', 'documentProps', 'urlPathname'];
