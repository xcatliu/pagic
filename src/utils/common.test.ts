import { asserts, path } from '../../deps.ts';

import { Tree, unique, pick, omit, depthFirstTraversal, sortByInsert, getPagicConfigPath } from './common.ts';

Deno.test('[unique]', () => {
  asserts.assertEquals(unique([1, 5, 2, 1, 2, 1]), [1, 5, 2]);
});
Deno.test('[pick]', () => {
  asserts.assertEquals(pick({ foo: 1, bar: 'Hello' }, ['foo']), { foo: 1 });
});
Deno.test('[omit]', () => {
  asserts.assertEquals(omit({ foo: 1, bar: 'Hello' }, ['foo']), { bar: 'Hello' });
});
Deno.test('[depthFirstTraversal] traversal a tree', () => {
  let tree = { value: 'a1', children: [{ value: 'b1', children: [{ value: 'c1' }] }, { value: 'b2' }] };
  let items: Tree[] = [];
  depthFirstTraversal(tree, (item) => {
    items.push(item);
  });
  asserts.assertEquals(items, [tree, tree.children[0], tree.children[0].children?.[0], tree.children[1]]);
});
Deno.test('[depthFirstTraversal] traversal a tree[]', () => {
  let tree1 = { value: 'a1', children: [{ value: 'b1' }, { value: 'b2' }] };
  let tree2 = { value: 'a2' };
  let items: Tree[] = [];
  depthFirstTraversal([tree1, tree2], (item) => {
    items.push(item);
  });
  asserts.assertEquals(items, [tree1, tree1.children[0], tree1.children[1], tree2]);
});
Deno.test('[sortByInsert] insert before:b', () => {
  asserts.assertEquals(
    sortByInsert([
      { name: 'a' },
      { name: 'b' },
      {
        name: 'c',
        insert: 'before:b'
      }
    ]),
    [
      { name: 'a' },
      {
        name: 'c',
        insert: 'before:b'
      },
      { name: 'b' }
    ]
  );
});
Deno.test('[sortByInsert] insert to an inserted item', () => {
  asserts.assertEquals(
    sortByInsert([
      { name: 'a' },
      { name: 'b' },
      {
        name: 'c',
        insert: 'after:d'
      },
      {
        name: 'd',
        insert: 'before:b'
      }
    ]),
    [
      { name: 'a' },
      {
        name: 'd',
        insert: 'before:b'
      },
      {
        name: 'c',
        insert: 'after:d'
      },
      { name: 'b' }
    ]
  );
});
Deno.test('[getPagicConfigPath]', async () => {
  asserts.assertEquals(await getPagicConfigPath(), path.resolve('pagic.config.tsx'));
});
