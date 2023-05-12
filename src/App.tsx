/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Header, Footer } from './components';
import { auth, logout } from './utils/firebase';

import './sass/index.scss';
import { Authorization, Page404, ResetPassword, Welcome, Workspace } from './pages';

export function App() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const timeout = (date: number) => {
    if (Date.now() >= date) {
      logout();
      return;
    }
    const id = setInterval(() => {
      const currentDate = Date.now();
      if (currentDate >= date) {
        logout();
        clearInterval(id);
        navigate('/');
      }
    }, 300000);
  };

  useEffect(() => {
    if (loading) return;
    if (user) {
      const lastDate = new Date(user.metadata.lastSignInTime as string).getTime() + 3600 * 1000;
      timeout(lastDate);
    }
  }, [user, loading]);

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="*" element={<Page404 />} />
          {user ? (
            <Route path="/workspace" element={<Workspace />} />
          ) : (
            <>
              <Route path="/auth" element={<Authorization />} />
              <Route path="/reset" element={<ResetPassword />} />
            </>
          )}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
