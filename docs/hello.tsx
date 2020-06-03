// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

const Hello = () => (
  <div>
    <h1
      onClick={() => {
        console.log(123);
      }}
    >
      Hello World
    </h1>
    <a href="./index.html">index</a>
  </div>
);

export default Hello;

export const frontMatter = {
  title: 'Hello World',
  author: 'xcatliu'
};
