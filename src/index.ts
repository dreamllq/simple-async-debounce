import { debounce } from 'lodash';
import Deferred from 'simple-deferred2';

const asyncDebounce: (...args: Parameters<typeof debounce>)=>((...any)=>Promise<any>) = (func, wait, options) => {
  const deferredSet: Deferred<any>[] = [];

  const debounceFunc = debounce(async (...args) => {
    const result = await func(...args);
    deferredSet.forEach(deferred => {
      deferred.resolve!(result);
    });
    deferredSet.splice(0, deferredSet.length);
  }, wait, options);

  return async (...args) => {
    const deferred = new Deferred();
    deferredSet.push(deferred);
    debounceFunc(...args);
    return deferred.promise;
  };
};

export default asyncDebounce;