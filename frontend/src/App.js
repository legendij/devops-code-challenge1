import React, { useEffect, useState } from 'react';
import './App.css';
import config from './config';

function App() {
  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');

  useEffect(() => {
    const getId = async () => {
      try {
        const resp = await fetch(config.backendUrl);
        if (!resp.ok) {
          throw new Error(`Request failed with status ${resp.status}`);
        }
        const data = await resp.json();
        // backend returns: { message: "SUCCESS <guid>" }
        setSuccessMessage(data.message);
      } catch (e) {
        setFailureMessage(e.message);
      }
    };

    getId();
  }, []); // run once on load

  return (
    <div className="App">
      {!failureMessage && !successMessage && 'Fetching...'}
      {failureMessage && failureMessage}
      {successMessage && successMessage}
    </div>
  );
}

export default App;
