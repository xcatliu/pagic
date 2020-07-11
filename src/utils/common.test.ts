import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { Tree, unique, pick, omit, depthFirstTraversal, sortByInsert } from './common.ts';

Deno.test('[unique]', () => {
  assertEquals(unique([1, 5, 2, 1, 2, 1]), [1, 5, 2]);
});
Deno.test('[pick]', () => {
  assertEquals(pick({ foo: 1, bar: 'Hello' }, ['foo']), { foo: 1 });
});
Deno.test('[omit]', () => {
  assertEquals(omit({ foo: 1, bar: 'Hello' }, ['foo']), { bar: 'Hello' });
});
Deno.test('[depthFirstTraversal] traversal a tree', () => {
  let tree = { value: 'a1', children: [{ value: 'b1', children: [{ value: 'c1' }] }, { value: 'b2' }] };
  let items: Tree[] = [];
  depthFirstTraversal(tree, (item) => {
    items.push(item);
  });
  assertEquals(items, [tree, tree.children[0], tree.children[0].children?.[0], tree.children[1]]);
});
Deno.test('[depthFirstTraversal] traversal a tree[]', () => {
  let tree1 = { value: 'a1', children: [{ value: 'b1' }, { value: 'b2' }] };
  let tree2 = { value: 'a2' };
  let items: Tree[] = [];
  depthFirstTraversal([tree1, tree2], (item) => {
    items.push(item);
  });
  assertEquals(items, [tree1, tree1.children[0], tree1.children[1], tree2]);
});
Deno.test('[sortByInsert] insert before:b', () => {
  assertEquals(
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
  assertEquals(
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
