// src/App.tsx
import { useState } from 'react';
import PremiumCheckout from './components/premiumcheckout';
import BulkUUIDGenerator from './components/bulkuuidgenerator';

function App() {
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);

  return (
    <div>
      <h1>Dev Tools Playground</h1>

      {/* Free tools */}
      <div>
        <h2>UUID Generator (Single)</h2>
        <button onClick={() => alert('Your UUID: ' + crypto.randomUUID())}>Generate UUID</button>
      </div>

      {/* Premium */}
      <div>
        {premiumUnlocked ? (
          <BulkUUIDGenerator />
        ) : (
          <div>
            <h2>Premium Tool</h2>
            <p>Pay $5 (test) to unlock bulk UUID generator.</p>
            <PremiumCheckout onSuccess={() => setPremiumUnlocked(true)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;