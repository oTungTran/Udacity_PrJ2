import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';

import Layout from './components/Templates/Layout/Layout';
import NotFound from './components/Pages/NotFound/NotFound';
import Auth from './components/Templates/Auth';
import SingIn from './components/Pages/SingIn/SingIn';

const HomePage = lazy(() => import('./components/Pages/Home/Home'));
const LeaderboardPage = lazy(() => import('./components/Pages/Leaderboard/Leaderboard'));
const NewPage = lazy(() => import('./components/Pages/NewQuestion/NewQuestion'));
const PollDetailPage = lazy(() => import('./components/Pages/PollDetail/PollDetail'));

export default function App() {
  const location = useLocation();
  const [prevUrl, setPrevUrl] = useState<string>();

  useEffect(() => {
    setPrevUrl(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="login" element={<SingIn prevRouter={prevUrl} />} />
      <Route path="/" element={<Auth><Layout /></Auth>}>
        <Route index element={<Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense>} />
        <Route path="leaderboard" element={<Suspense fallback={<div>Loading...</div>}><LeaderboardPage /></Suspense>} />
        <Route path="add" element={<Suspense fallback={<div>Loading...</div>}><NewPage /></Suspense>} />
        <Route path="questions/:questionId" element={<Suspense fallback={<div>Loading...</div>}><PollDetailPage /></Suspense>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
