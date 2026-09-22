# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Marketing/brochure site for a home-renovation company ("Hecmar Reformas"), built with Angular 19 + SSR (Angular Universal via `@angular/ssr`), deployed on Vercel. All app routes are statically prerendered; a Vercel serverless function handles the contact-form email send.

## Commands

- `npm start` / `ng serve` — dev server at `http://localhost:4200`
- `ng build` — production build (SSR + prerender) to `dist/template-ssr-reformas`
- `npm run watch` — dev-config build in watch mode
- `npm test` / `ng test` — Karma/Jasmine unit tests
- `ng test --include='**/contacto.component.spec.ts'` — run a single spec file
- `npm run serve:ssr:template-ssr-reformas` — run the built SSR Node/Express server (`node dist/template-ssr-reformas/server/server.mjs`)
- `ng generate component pages/<name>` — scaffold a new standalone page component (follow existing `pages/*` pattern)

There is no lint script configured in `package.json`.

## Architecture

- **Standalone components throughout** — no `NgModule`s. Every component/page is `standalone` with its own `imports` array (see `src/app/pages/contacto/contacto.component.ts`).
- **Routing**: `src/app/app.routes.ts` defines client routes, all lazy-loaded via `loadComponent`. `src/app/app.routes.server.ts` sets `RenderMode.Prerender` for `**`, meaning every route is prerendered at build time — there is no per-request SSR data fetching for pages.
- **Dual app config**: `app.config.ts` (browser: router, hydration w/ event replay, `HttpClient` with fetch) is merged with `app.config.server.ts` (adds `provideServerRendering` + `provideServerRouting`) to produce the server config used during prerender/SSR.
- **`src/server.ts`**: the Express entry point used only when running the SSR server directly (`serve:ssr:*` script) or in non-Vercel Node hosting. It serves the built `browser/` assets and falls back to `AngularNodeAppEngine` for rendering. In production the actual deployment target is Vercel, where `api/sendEmail.js` (a standalone Vercel serverless function, not part of the Angular SSR pipeline) handles `/api/sendEmail`.
- **Contact form / email flow**: `ContactoComponent` builds a `ReactiveFormsModule` form → `EmailService.sendEmail()` POSTs to `/api/sendEmail` → `api/sendEmail.js` sends the mail via Nodemailer through an OVH SMTP relay, reading `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_RECEIVER` from environment variables (set in Vercel project settings, not committed).
- **Two `DataService` implementations exist**: `src/app/data.service.ts` (fetches `fakestoreapi.com`, still wired into `AppComponent`) and `src/app/services/data.service.ts` (empty stub, alongside the real `services/email.service.ts` and `services/seo.service.ts`). New services should go in `src/app/services/` to match the majority pattern; be aware `app.component.ts` currently depends on the top-level leftover file.
- **Styling**: Tailwind CSS (`tailwind.config.js`, content-scanned over `src/**/*.{html,ts}`) plus per-component CSS files. Global Tailwind directives live in `src/styles.css`.
- **Content is Spanish-language**; component/page names, form field labels, and copy are in Spanish (e.g. `contacto`, `servicios`, `aviso-legal`, `politica-privacidad`, `politica-cookies`). The `blog` page/route exists but is commented out in `app.routes.ts`.
- **Analytics**: `@vercel/analytics` is a dependency — check `app.component.ts`/`index.html` before assuming it's wired up anywhere else.
