import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Tádova Díra",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fbf1c7", // gruvbox light bg
          lightgray: "#ebdbb2", // bg1 — borders, outlines
          gray: "#bdae93", // bg3 — graph links
          darkgray: "#3c3836", // fg1 — body text
          dark: "#282828", // fg0 — headings, icons
          secondary: "#458588", // blue — links
          tertiary: "#689d6a", // aqua — hover / visited
          highlight: "rgba(215, 153, 33, 0.15)", // yellow tint
          textHighlight: "#fabd2f88", // bright yellow marker
        },
        darkMode: {
          light: "#282828", // dark bg0
          lightgray: "#3c3836", // bg1 — borders, code bg
          gray: "#7c6f64", // bg4 — graph links
          darkgray: "#ebdbb2", // fg1 — body text
          dark: "#fbf1c7", // fg0 — headings, icons
          secondary: "#83a598", // bright blue — links
          tertiary: "#8ec07c", // bright aqua — hover
          highlight: "rgba(60, 56, 54, 0.4)", // bg1 tint
          textHighlight: "#fabd2f88", // bright yellow marker
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
