import React, { useState, useEffect } from 'react';
import IdleDemo from './components/IdleDemo';

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
    <div>Hello {name}，this is a Idle demo</div>
    <IdleDemo />
  </div>);
}

export default App;
