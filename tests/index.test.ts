// https://jestjs.io/zh-Hans/docs/api
import asyncDebounce from '@/index';

test('base', async () => {
  let count = 1;
  let _args:number[] = [];
  const d = asyncDebounce((...args: number[]) => new Promise(resolve => {
    setTimeout(() => {
      _args = args;
      count++;
      resolve(1);
    }, 300);
  }), 200);

  const results = await Promise.all([
    d(1, 2),
    d(2, 3),
    d(3, 4)
  ]);

  expect(count).toBe(2);
  expect(results).toEqual([
    1,
    1,
    1
  ]);
  expect(_args).toEqual([3, 4]);


});