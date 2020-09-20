const visit = require("unist-util-visit")

const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
const isProduction = "production" === activeEnv

module.exports = ({ markdownAST }, pluginOptions) => {
  const { enabled, prefix } = pluginOptions

  if (isProduction && enabled && prefix) {
    // link url to jsdelivr
    visit(markdownAST, [`image`], node => {
      const { url } = node
      if (
        url.startsWith("//") ||
        url.startsWith("http://") ||
        url.startsWith("https://")
      )
        return
      node.url = prefix + url
    })

    // deal with `gatsby-remark-images` plugin
    visit(markdownAST, [`html`], node => {
      const { url } = node
      if (!url) return
      if (url.endsWith("jpg") || url.endsWith("jpeg") || url.endsWith("png")) {
        const { value } = node
        node.value = value.replace(/\/static\//g, `${prefix}/static/`)
      }
    })
  }
  
  return markdownAST
}
