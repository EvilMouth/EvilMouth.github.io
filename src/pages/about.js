import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const AboutIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.author.name
  const siteDescription = data.site.siteMetadata.author.summary

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="About" description={siteDescription} />
      <article>
        <p>Android Developer</p>
        <p>Love Music, See What I Am Listening</p>
        <img
          src="https://spotify-github-profile.vercel.app/api/view?uid=izyhang&cover_image=true"
          alt="spotify-github-profile"
        ></img>
      </article>
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
