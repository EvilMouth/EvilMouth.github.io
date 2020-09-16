import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.author.name
  const siteDescription = data.site.siteMetadata.author.summary

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" description={siteDescription} />
      <div>
        <ul>
          <li>
            <a href="/blog">read Blog</a>
          </li>
          <li>
            <a href="https://github.com/EvilMouth">fork Github</a>
          </li>
          <li>
            <a href="https://twitter.com/EvilLittleMouth">mention Twitter</a>
          </li>
          <li>
            <a href="https://telegram.me/EvilLittleMouth">chat Telegram</a>
          </li>
        </ul>
      </div>
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author {
          name
          summary
        }
      }
    }
  }
`
