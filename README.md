# simple-async-debounce

一个支持异步函数的 debounce，所有在等待期间被合并的调用共享同一次执行结果。

## 特性

- 基于 `lodash.debounce`，完整支持其 `wait` 和 `options` 参数
- 多次并发调用仅执行一次，所有调用方通过 Promise 获得相同结果
- 同时提供 ESM 和 CommonJS 导出，附带 TypeScript 类型声明

## 安装

```bash
npm i simple-async-debounce
```

### Peer Dependencies

| 包名 | 说明 |
| --- | --- |
| `lodash` | 内部使用 `lodash/debounce` |
| `simple-deferred2` | 用于管理 Promise 的延迟解析 |

## 使用

```ts
import asyncDebounce from 'simple-async-debounce';

// 创建一个防抖异步函数（等待 200ms）
const search = asyncDebounce((keyword: string) =>
  fetch(`/api/search?q=${keyword}`).then((r) => r.json())
, 200);

// 短时间内多次调用，只有最后一次会真正执行
// 所有调用方拿到的都是同一次请求的结果
const [res1, res2, res3] = await Promise.all([
  search('a'),
  search('ab'),
  search('abc'), // 仅此次触发实际请求，参数为 'abc'
]);
// res1 === res2 === res3
```

### 基础示例

```ts
import asyncDebounce from 'simple-async-debounce';

const m = async () => {
  let count = 1;
  const d = asyncDebounce(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          count++;
          resolve(1);
        }, 300);
      }),
    200
  );

  const results = await Promise.all([d(), d(), d()]);
  // count === 2 （仅执行了一次）
  // results === [1, 1, 1] （三次调用拿到同一结果）
};
m();
```

## API

```ts
function asyncDebounce(
  func: (...args: any[]) => Promise<any>,
  wait?: number,
  options?: object
): (...args: any[]) => Promise<any>;
```

### 参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `func` | `(...args) => Promise` | 需要防抖的异步函数 |
| `wait` | `number` | 等待时间（毫秒），同 lodash `debounce` 的 `wait` |
| `options` | `object` | lodash `debounce` 的 options，如 `{ leading, trailing, maxWait }` |

### 返回值

返回一个函数，调用后返回 `Promise`。在 `wait` 期间内的多次调用会被合并，最终只执行一次 `func`，所有调用方共享该结果。

## License

[MIT](./LICENSE)
