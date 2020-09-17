import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.author.name
  const siteDescription = data.site.siteMetadata.author.summary

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" description={siteDescription} />
    </Layout>
  )
}

export default AboutIndex

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
