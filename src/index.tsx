import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactGA from "react-ga4";

ReactGA.initialize('G-SNX27VCYT3');
ReactGA.send('pageview');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
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