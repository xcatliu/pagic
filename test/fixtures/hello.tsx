import { React } from 'https://deno.land/x/pagic/mod.ts';

const Hello = () => <h1>Hello world</h1>;

export default Hello;

export const frontMatter = {
  outputPath: 'foo/bar.html'
};
