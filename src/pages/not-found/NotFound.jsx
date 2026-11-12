import { Link } from 'react-router-dom';
import { useSeo } from '../../lib/useSeo';

const NotFound = () => {
  // Keep missing pages out of search results.
  useSeo({ title: 'Page not found', noindex: true });

  return (
  <header className="page-head wrap" style={{ minHeight: '70svh' }}>
    <h1>This page doesn’t exist</h1>
    <p>The link may be old, or the project may have moved. Try the project list instead.</p>
    <div className="btn-row" style={{ marginTop: 32 }}>
      <Link to="/#work" className="btn btn--primary">
        See all projects
      </Link>
      <Link to="/" className="btn">
        Go to the home page
      </Link>
    </div>
  </header>
  );
};

export default NotFound;
