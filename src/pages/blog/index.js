import React from "react"
import { graphql } from "gatsby"

import BlogPostListTemplate from "../../templates/blog-post-list"

const BlogIndex = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges

  return <BlogPostListTemplate location={location} pageContext={{ posts }} />
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
