import React from 'react';
import Layout from '../components/Layout';
import projects from '../data/projects.json';

export default function ProjectsPage({ location }) {
  return (
    <Layout location={location} title="Projects">
      <div className="container mt-5">
        <div style={{ maxWidth: 600 }}>
          <h1>Projects</h1>
          <p>Some fulfilled a need, some were to learn, and some were to pass the time.</p>
        </div>

        <ul className="master-list">
          {projects.map(project => (
            <a
              key={project.url}
              className="master-listitem"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer">
              <h3 className="master-listitem-title">{project.title}</h3>
              <p>{project.description}</p>
            </a>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
