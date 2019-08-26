import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

export default function BlogPage({ data, location }) {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title="Blog">
      <div className="container mt-5">
        <div>
          <h1>Notebook</h1>
          <p>Banterings about life, startups, and code.</p>
        </div>

        <ul className="master-list">
          {posts.map(({ node: { frontmatter: post } }) => (
            <Link key={post.slug} className="master-listitem" to={`/blog/${post.slug}`}>
              <h3 className="master-listitem-title">{post.title}</h3>
              <p>{post.description}</p>
              <time className="master-listitem-date">
                <small>{post.date}</small>
              </time>
            </Link>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            slug
            date(formatString: "MMMM YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
