import React, { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState(0);

  useEffect(() => {
    async function getName() {
      const remoteName = await (await fetch("/api/GetName?name=ex90rts")).text();
      setName(remoteName);
    };

    getName();
  }, []);

  return (<div>
    <div>Hello {name}</div>
  </div>);
}

export default App;
