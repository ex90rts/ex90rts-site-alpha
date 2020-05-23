import React, { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState(0);

  useEffect(async () => {
    const remoteName = await (await fetch("/api/GetName?name=ex90rts")).text();
    setName(remoteName);
  }, []);

  return <div>Hello {name}</div>;
}

export default App;
