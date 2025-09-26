import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // dynamic routes → use SSR
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'details/:id',
    renderMode: RenderMode.Server,
  },

  // everything else → prerender
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
