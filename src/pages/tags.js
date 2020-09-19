import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import tagStyles from "../styles/tags.module.css"

const Tags = ({ data, location }) => {
  const siteTitle = `${data.site.siteMetadata.author.name}'s Blog`

  // Generate A Map Of All Tags That Record Times Of Each Tag
  const tagsMap = {}
  const posts = data.allMarkdownRemark.edges
  posts.forEach(post => {
    const tags = post.node.frontmatter.tags
    if (tags === null) return true
    tags.forEach(tag => {
      let times = tagsMap[tag]
      if (times === undefined) times = 0
      times += 1
      tagsMap[tag] = times
    })
  })

  // Generate The Tags UI
  let tagsDiv
  if (tagsMap !== null && Object.entries(tagsMap).length > 0) {
    tagsDiv = (
      <div className={tagStyles.cloud}>
        {Object.entries(tagsMap).map(([tag, times]) => {
          const size = 12 + (times - 1) * 4
          return (
            <Link
              key={tag}
              to={`/tags/${tag}/`}
              style={{
                fontSize: size,
              }}
            >
              {tag}
            </Link>
          )
        })}
      </div>
    )
  } else {
    tagsDiv = <p>There Are No Tags</p>
  }

  return (
    <Layout location={location} title={siteTitle} linkTo="/blog/">
      <SEO title="Tags" description={`All Tags Of ${siteTitle} Posts`} />
      <article>{tagsDiv}</article>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author {
          name
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`
