import assert from 'node:assert/strict';
import { test } from 'node:test';

import { verdictFromDrag } from '../src/swipe.ts';

test('right is yes, left is no, up is redo', () => {
  assert.equal(verdictFromDrag(200, 10), 'yes');
  assert.equal(verdictFromDrag(-200, 10), 'no');
  assert.equal(verdictFromDrag(20, -200), 'redo');
});

test('a short drag springs back', () => {
  assert.equal(verdictFromDrag(60, -60), null);
});

test('the bigger movement wins', () => {
  assert.equal(verdictFromDrag(150, -300), 'redo');
  assert.equal(verdictFromDrag(300, -150), 'yes');
  assert.equal(verdictFromDrag(0, 300), null);
});
