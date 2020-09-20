const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              excerpt
              fields {
                slug
              }
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                tags
                categories
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // Create TagPosts And CategoryPosts Pages
  const blogPostList = path.resolve(`./src/templates/blog-post-list.js`)
  const tagMapPosts = {}
  const categoryMapPosts = {}
  posts.forEach(post => {
    const tags = post.node.frontmatter.tags
    if (tags !== null && tags.length > 0) {
      tags.forEach(tag => {
        const tagPost = tagMapPosts[tag]
        if (tagPost === undefined) tagMapPosts[tag] = [post]
        else tagPost.push(post)
      })
      Object.entries(tagMapPosts).forEach(([tag, posts]) => {
        const slug = `/blog/tags/${tag}/`
        createPage({
          path: slug,
          component: blogPostList,
          context: {
            slug,
            posts,
          },
        })
      })
    }
    const categories = post.node.frontmatter.categories
    if (categories !== null) {
      const categoryPosts = categoryMapPosts[categories]
      if (categoryPosts === undefined) categoryMapPosts[categories] = [post]
      else categoryPosts.push(post)
    }
    Object.entries(categoryMapPosts).forEach(([tag, posts]) => {
      const slug = `/blog/categories/${tag}/`
      createPage({
        path: slug,
        component: blogPostList,
        context: {
          slug,
          posts,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
