// @deno-types="https://deno.land/x/pagic@v0.8.5/src/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

const Hello = () => {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <h1>Hello world</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Count +1</button>
    </>
  );
};

export default Hello;
