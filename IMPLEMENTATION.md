# Реализация Mini-Ramda: Руководство

В этом файле собраны технические советы по реализации ключевых узлов библиотеки.

## 1. Ядро (Core)

### Как реализовать `curry`?
Основная идея: сравнивать количество переданных аргументов с `fn.length`.

```javascript
const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return (...args2) => curried.apply(this, [...args, ...args2]);
    }
  };
};
```

### Как реализовать `pipe`?
Используйте `reduce` для последовательного вызова функций.

```javascript
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
```

## 2. Списки (List)

Все методы должны быть каррированы и следовать правилу "Data Last".

```javascript
// Пример для map
const map = curry((fn, list) => list.map(fn));

// Теперь мы можем использовать это так:
const doubleAll = map(x => x * 2);
doubleAll([1, 2, 3]); // [2, 4, 6]
```

## 3. Объекты (Object)

### Иммутабельный `assoc`
Никогда не меняйте исходный объект!

```javascript
const assoc = curry((key, val, obj) => ({
  ...obj,
  [key]: val
}));
```

### Глубокий `path`
Используйте рекурсию для прохода по массиву ключей.

```javascript
const path = curry((keys, obj) => {
  if (keys.length === 0 || obj === null || obj === undefined) {
    return obj;
  }
  const [first, ...rest] = keys;
  return path(rest, obj[first]);
});
```

## 4. Логика (Logic)

### Рекурсивный `equals`
Для глубокого сравнения объектов нужно:
1. Проверить типы.
2. Если это примитивы — сравнить через `===`.
3. Если объекты — сравнить количество ключей и рекурсивно проверить каждое значение.

```javascript
const equals = curry((a, b) => {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a === 'object' && a !== null && b !== null) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => equals(a[key], b[key]));
  }
  return false;
});
```
