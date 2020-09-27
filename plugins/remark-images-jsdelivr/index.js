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
      const jsdelivrUrl = prefix + url
      console.info(jsdelivrUrl)
      node.url = jsdelivrUrl
    })

    // deal with `gatsby-remark-images` plugin
    visit(markdownAST, [`html`], node => {
      const { url } = node
      if (!url) return
      if (url.endsWith("jpg") || url.endsWith("jpeg") || url.endsWith("png")) {
        let html = node.value
        const found = html.match(/\/static\/.+(\.jpg|\.jpeg|\.png)/g)
        if (found === null) return
        found.forEach((url, index) => {
          const jsdelivrUrl = prefix + url
          if (index === 0) {
            console.info(jsdelivrUrl)
          }
          html = html.replace(url, jsdelivrUrl)
        })
        node.value = html
      }
    })
  }

  return markdownAST
}
