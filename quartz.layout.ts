import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
  Component.Comments({
    provider: 'giscus',
    options: {
      // from data-repo
      repo: 'adaryorg/adaryorg',
      // from data-repo-id
      repoId: 'R_kgDOOM6MYw',
      // from data-category
      category: 'Announcements',
      // from data-category-id
      categoryId: 'DIC_kwDOOM6MY84CojWz',
    }
  }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/adaryorg",
      "Discord Community": "https://discord.gg/qwB6Cmqg",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.RecentNotes({ title: "Recent Blog Posts", limit: 5, showTags: false,
   filter: (f) =>
      f.slug!.startsWith("blog/") && f.slug! !== "blog/index" && !f.frontmatter?.noindex,
    linkToMore: "blog/" as SimpleSlug,
    }),
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.RecentNotes({ title: "Recent Articles", limit: 5, showTags: false,
   filter: (f) =>
      f.slug!.startsWith("articles/") && f.slug! !== "articles/index" && !f.frontmatter?.noindex,
    linkToMore: "articles/" as SimpleSlug,
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
