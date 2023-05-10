# simple-async-debounce

能够异步执行的debounce

## 安装

```
npm i simple-async-debounce
```

## 依赖

- lodash
- simple-deferred2


## 使用

```ts
import asyncDebounce from 'simple-async-debounce';

const m = async ()=>{
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
  // count === 1
  // results === [1,1,1]
}
m()
```
