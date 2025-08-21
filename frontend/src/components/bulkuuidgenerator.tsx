// src/BulkUUIDGenerator.tsx
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function BulkUUIDGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = () => {
    const list = Array.from({ length: count }, () => uuidv4());
    setUuids(list);
  };

  return (
    <div>
      <h2>Bulk UUID Generator</h2>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        min={1}
      />
      <button onClick={generate}>Generate</button>
      <ul>
        {uuids.map((u) => (
          <li key={u}>{u}</li>
        ))}
      </ul>
    </div>
  );
}
