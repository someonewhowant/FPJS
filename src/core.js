/**
 * src/core.js
 * 
 * # Описание реализации Шага 1: Curry
 * 
 * Функция `curry` — это обертка, которая проверяет количество переданных аргументов (`args.length`).
 * 1. Если количество аргументов достаточно для вызова исходной функции (`fn.length`), 
 *    мы вызываем её.
 * 2. Если аргументов меньше, мы возвращаем новую функцию, которая ожидает остальные аргументы,
 *    используя рекурсию для накопления всех параметров.
 */

export const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
};

/**
 * # Описание реализации Шага 2: Pipe & Compose
 * 
 * Pipe реализует концепцию конвейера (Pipeline). 
 * Мы используем `reduce`, чтобы последовательно передать результат выполнения 
 * одной функции на вход следующей.
 */

export const pipe = (...fns) => (initialValue) =>
  fns.reduce((acc, fn) => fn(acc), initialValue);

export const compose = (...fns) => (initialValue) =>
  fns.reduceRight((acc, fn) => fn(acc), initialValue);
