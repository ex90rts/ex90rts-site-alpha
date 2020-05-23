import React from 'react';

function App() {
  const name = await (await fetch('/api/GetName?name=ex90rts')).text();
  return <div>Hello {name}</div>;
}

export default App;
