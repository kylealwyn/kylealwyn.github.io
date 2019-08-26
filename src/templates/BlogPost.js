import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

export default function BlogPostTemplate({ data, location }) {
  const post = data.markdownRemark;

  return (
    <Layout
      location={location}
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}>
      <div className="container mt-5">
        <header className="post-header">
          <h1 className="post-title">{post.frontmatter.title}</h1>
          <p className="post-date">{post.frontmatter.date}</p>
        </header>

        <article className="container-narrow" style={{ padding: 0 }}>
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />

          <hr style={{}} />

          {/* <ul
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
        </ul> */}
        </article>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 140)
      html
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        description
      }
    }
  }
`;
