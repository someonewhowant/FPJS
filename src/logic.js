import { curry } from './core.js';

/**
 * src/logic.js
 * 
 * # Описание реализации Шага 5: Логика и сравнение
 * 
 * Эти функции позволяют строить сложные условия и выполнять глубокое сравнение данных.
 */

/**
 * equals(a, b)
 * Глубокое сравнение двух значений.
 * 1. Если это примитивы — сравниваем по значению.
 * 2. Если объекты/массивы — рекурсивно проверяем все ключи и значения.
 */
export const equals = curry((a, b) => {
  if (a === b) return true;

  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key) || !equals(a[key], b[key])) {
      return false;
    }
  }

  return true;
});

/**
 * allPass(predicates, val)
 * Принимает массив функций-предикатов и значение.
 * Возвращает true, если значение проходит ВСЕ проверки.
 */
export const allPass = curry((predicates, val) => 
  predicates.every(fn => fn(val))
);
