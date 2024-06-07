import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Loading from './Loading/Loading.jsx';

const App = lazy(() => delayForDemo(import('./App.jsx')));
const AppMini = lazy(() => delayForDemo(import('./AppMini.jsx')));

const Home = () => (
  <div>
    <h1>Home Page</h1>
    <Link to="/app">
      <button>Go to App</button>
    </Link>
    <Link to="/mini">
      <button>Go to AppMini</button>
    </Link>
  </div>
);

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement!).render(
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<App />} />
          <Route path="/mini" element={<AppMini />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
} else {
  console.error('Root element not found');
}

function delayForDemo(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 5000);
  }).then(() => promise);
}