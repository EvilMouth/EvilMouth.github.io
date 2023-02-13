import React from "react"
import { /*Link,*/ graphql } from "gatsby"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
// import Comment from "../components/comment"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data: { site, markdownRemark: post }, /*pageContext,*/ location }) => {
  const siteTitle = site.siteMetadata.title
  // const { previous, next } = pageContext

  return (
    <Layout
      location={location}
      title={`${siteTitle}'s Blog`}
      linkTo={`/blog/`}
      smallTitle={true}
    >
      <Seo
        title={post.frontmatter.title}
        // description={post.frontmatter.description || post.excerpt}
        description={`${post.frontmatter.title} - ${post.frontmatter.tags} - ${post.frontmatter.categories}`}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <p
          style={{
            marginTop: rhythm(3),
          }}
        >{`— ${site.siteMetadata.author.name}`}</p>
        {/* <hr
          style={{
            marginBottom: rhythm(1),
          }}
        /> */}
        {/* <footer>
          <Bio />
        </footer> */}
      </article>

      {/* <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav> */}

      {/* <Comment id={post.id} location={location} /> */}
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        categories
      }
    }
  }
`
