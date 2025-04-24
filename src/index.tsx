import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactGA from "react-ga4";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

let gaConfig = {};
if (process.env.REACT_APP_GA_DEBUG === 'true') {
  console.log("GA debug mode")
  gaConfig = {
    gaOptions: {
      debug_mode: true,
    },
    gtagOptions: {
      debug_mode: true,
    }
  }
}

ReactGA.initialize('G-SNX27VCYT3', { ...gaConfig })
ReactGA.send('pageview');

function RedirectHandler() {
  const location = useLocation();
  useEffect(() => {
    ReactGA.event({
      category: 'Redirect',
      action: 'SubpathVisit',
      label: location.pathname
    });
  }, [location.pathname]);
  return <Navigate to="/" replace />;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<RedirectHandler />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals((metric) => {
  // "metric" has { name, value, delta, id, entries, ... }
  // We'll log them as an "event" in GA4
  ReactGA.event({
    category: 'Web Vitals',
    action: metric.name,         // e.g. 'CLS', 'LCP', 'FID', 'TTFB'
    label: metric.id,            // unique identifier for this metric instance
    value: Math.round(metric.value), // typically an integer
    nonInteraction: true,        // so it doesn't affect bounce rate
  });
});