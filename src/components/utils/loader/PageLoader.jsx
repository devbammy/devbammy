import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

const PageLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && <Loader />}
      <main
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
        {children}
      </main>
    </>
  );
};

export default PageLoader;
