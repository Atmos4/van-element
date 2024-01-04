import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Van Element - Docs",
  description: "Documentation for Van Element",
  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.color.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#fe3434' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'Van Element' }],
  ],
  themeConfig: {
    logo: {
      src: "/logo.color.svg",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Get started", link: "/intro/get-started" },
      { text: "Tutorial", link: "/intro/tutorial" },
      { text: "Examples", link: "/examples" },
    ],

    sidebar: [
      {
        text: "Introduction",
        base: "/intro/",
        items: [
          { text: "Get started", link: "get-started" },
          { text: "Installation", link: "installation" },
          { text: "Tutorial", link: "tutorial" },
        ],
      },
      {
        text: "Learn",
        base: "/learn/",
        items: [
          { text: "Overview", link: "overview" },
          { text: "Attributes", link: "attributes" },
          { text: "Lifecycle", link: "lifecycle" },
          { text: "Slots", link: "slots" },
          { text: "Styles", link: "styles" },
          { text: "Options", link: "shadow-options" },
        ],
      },
      { text: "Examples", link: "examples" },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/Atmos4/van-element" },
    ],
  },
  vue: {
    template: {
      compilerOptions: {
        // All custom elements will be Van Elements
        isCustomElement: (tag) => tag.includes("-"),
      },
    },
  },
});
