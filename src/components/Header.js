import React from 'react';
import { Link } from 'gatsby';
import sig from '../assets/images/signature.png';

export default function Header() {
  return (
    <header className="container app-header">
      <div className="d-flex align-items-center">
        <Link to="/" aria-label="Navigate to home">
          <img src={sig} style={{ width: 45 }} alt="Kyle Alwyn's logo" />
        </Link>
        <div className="ml-auto">
          <ul className="list-unstyled d-flex">
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li className="ml-4">
              <Link to="/projects">Projects</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
