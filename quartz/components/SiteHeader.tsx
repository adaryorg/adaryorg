import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, joinSegments, pathToRoot } from "../util/path"

const navigation = [
  { label: "Home", path: "", matches: (slug: string) => slug === "index" },
  { label: "Articles", path: "articles", matches: (slug: string) => slug.startsWith("articles") },
  { label: "Blog", path: "blog", matches: (slug: string) => slug.startsWith("blog") },
]

const SiteHeader: QuartzComponent = ({ fileData, cfg }: QuartzComponentProps) => {
  const slug = fileData.slug ?? ("index" as FullSlug)
  const baseDir = pathToRoot(slug)

  return (
    <div class="site-nav">
      <a class="site-nav-brand" href={baseDir} aria-label={`${cfg.pageTitle} home`}>
        <img class="site-nav-mark" src={joinSegments(baseDir, "static/icon.png")} alt="" width="36" height="36" />
        <span class="site-nav-name">
          adary<strong>.org</strong>
        </span>
      </a>
      <p class="site-nav-tagline">
        Linux, DevOps, and a <strong>mechanical keyboard</strong> problem.
      </p>
      <nav aria-label="Main navigation">
        <ul>
          {navigation.map((item) => {
            const active = item.matches(slug)
            const href = item.path === "" ? baseDir : joinSegments(baseDir, item.path)

            return (
              <li>
                <a href={href} aria-current={active ? "page" : undefined}>
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default (() => SiteHeader) satisfies QuartzComponentConstructor
