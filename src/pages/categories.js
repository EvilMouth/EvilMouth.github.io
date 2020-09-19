import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import categoryStyles from "../styles/categories.module.css"

const Categories = ({ data, location }) => {
  const siteTitle = `${data.site.siteMetadata.author.name}'s Blog`

  // Generate A Map Of All Categories That Record Times Of Each Catrgory
  const categoriesMap = {}
  const posts = data.allMarkdownRemark.edges
  posts.forEach(post => {
    const categories = post.node.frontmatter.categories
    if (categories === null) return true
    let times = categoriesMap[categories]
    if (times === undefined) times = 0
    times += 1
    categoriesMap[categories] = times
  })

  // Generate The Tags UI
  let categoriesDiv
  if (categoriesMap !== null && Object.entries(categoriesMap).length > 0) {
    categoriesDiv = (
      <div className={categoryStyles.container}>
        <ul>
          {Object.entries(categoriesMap).map(([category, times]) => {
            return (
              <li key={category}>
                <Link to={`/categories/${category}/`}>{category}</Link>
                <span>{`(${times})`}</span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  } else {
    categoriesDiv = <p>There Are No Categories</p>
  }

  return (
    <Layout location={location} title={siteTitle} linkTo="/blog/">
      <SEO title="Tags" description={`All Tags Of ${siteTitle} Posts`} />
      <article>{categoriesDiv}</article>
    </Layout>
  )
}

export default Categories

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
            categories
          }
        }
      }
    }
  }
`
