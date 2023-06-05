/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Buffer } from 'buffer';
import { Header, Footer } from './components';
import { auth, logout } from './utils/firebase';

import './sass/index.scss';
import { Authorization, Page404, ResetPassword, Welcome, Workspace } from './pages';
import Loading from './pages/Loading/Loading';

export function App() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();

  const tokenChanged = () => {
    const id = setInterval(() => {
      const token = localStorage.getItem('acces-token');
      if (token) {
        const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const expireTime = decoded.exp * 1000;
        const currentTime = Date.now();
        if (currentTime >= expireTime) {
          logout();
          localStorage.removeItem('acces-token');
          clearInterval(id);
          navigate('/');
        }
      } else {
        logout();
        clearInterval(id);
        navigate('/');
      }
    }, 5000);
  };

  useEffect(() => {
    if (loading) return;
    if (user) {
      tokenChanged();
    }
  }, [user, loading]);

  useEffect(() => {
    if (location.pathname === '/auth' && user) {
      navigate('/');
    }
  }, [location, user]);

  return (
    <div className="app">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <main className="main">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="*" element={<Page404 />} />
              {user ? (
                <Route path="/main" element={<Workspace />} />
              ) : (
                <>
                  <Route path="/auth" element={<Authorization />} />
                  <Route path="/reset" element={<ResetPassword />} />
                </>
              )}
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
