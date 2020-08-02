import React from 'react';
import { Link, graphql } from 'gatsby';
import projects from '../data/projects.json';
import Layout from '../components/Layout';

const DynamicLink = ({ url, ...props }) =>
  /^https?:\/\//.test(url) ? <a href={url} {...props} /> : <Link to={url} {...props} />;

const ItemList = ({ title, to, items, linkProps = {} }) => (
  <div className="showcase-list">
    <h3 className="showcase-list-title">{title}</h3>

    {items.slice(0, 3).map(item => (
      <DynamicLink key={item.url} className="showcase-listitem" url={item.url} {...linkProps}>
        <h3 className="showcase-listitem-name">{item.title}</h3>
        <p className="showcase-listitem-desc">{item.description}</p>
      </DynamicLink>
    ))}

    <Link className="showcase-list-showmore" to={to}>
      See More
    </Link>
  </div>
);

export default function HomePage({ data, location }) {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <div className="container">
        <div className="home-hero">
          <h1 className="home-title">Hey, I&apos;m Kyle.</h1>

          <p className="home-subtitle">I live at the intersection of science, art, and business.</p>
          <p className="home-description">
            Co-founded <a href="https://www.heydoctor.com">@HeyDoctor</a>. Continuing to fix healthcare{' '}
            <a href="https://www.goodrx.com">@GoodRx</a>. <br />
            Code&nbsp;
            <a href="https://github.com/kylealwyn">@GitHub</a>. Network&nbsp;
            <a href="https://linkedin.com/in/kylealwyn">@LinkedIn</a>.
          </p>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-6">
            <ItemList
              title="Latest Posts"
              to="/blog"
              items={posts.map(({ node: { frontmatter: post } }) => ({
                ...post,
                url: `/blog/${post.slug}`,
              }))}
            />
          </div>
          <div className="col-xs-12 col-sm-6">
            <ItemList
              title="Latest Projects"
              to="/projects"
              items={projects}
              linkProps={{ rel: 'noopener noreferrer', target: '_blank' }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            slug
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
