// https://jestjs.io/zh-Hans/docs/api
import asyncDebounce from '@/index';

test('base', async () => {
  let count = 1;
  const d = asyncDebounce(() => new Promise(resolve => {
    setTimeout(() => {
      count++;
      resolve(1);
    }, 300);
  }), 200);

  const results = await Promise.all([
    d(),
    d(),
    d()
  ]);

  expect(count).toBe(2);
  expect(results).toEqual([
    1,
    1,
    1
  ]);


});