import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

const recentNotes = [
  Component.RecentNotes({
    title: "Recent Blog posts",
    limit: 3,
    filter: (f) =>
      f.slug!.startsWith("blog/") && f.slug! !== "blog/index" && !f.frontmatter?.noindex,
    linkToMore: "blog/" as SimpleSlug,
    showTags: false,
  }),
  Component.RecentNotes({
    title: "Recent articles",
    limit: 2,
    filter: (f) => f.slug!.startsWith("articles/"),
    linkToMore: "/" as SimpleSlug,
    showTags: false,
  }),
]

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [...recentNotes.map((c) => Component.MobileOnly(c)),
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

const left = [
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
  ...recentNotes.map((c) => Component.DesktopOnly(c)),
]

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta(), Component.TagList()],
  left,
  right: [
    Component.Graph({
      localGraph: {
        showTags: false,
      },
      globalGraph: {
        showTags: false,
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta()],
  left,
  right: [],
}

