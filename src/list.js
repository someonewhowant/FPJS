import { curry } from './core.js';

/**
 * src/list.js
 * 
 * # Описание реализации Шага 3: Работа со списками
 * 
 * В этом модуле мы реализуем основные функции трансформации массивов. 
 * Все функции следуют правилу "Data Last" (данные передаются последними) 
 * и автоматически каррированы.
 */

/**
 * map(fn, list)
 * Применяет функцию к каждому элементу и возвращает новый массив.
 */
export const map = curry((fn, list) => list.map(fn));

/**
 * filter(predicate, list)
 * Оставляет только те элементы, которые удовлетворяют условию.
 */
export const filter = curry((predicate, list) => list.filter(predicate));

/**
 * reduce(fn, init, list)
 * Сворачивает массив в одно значение.
 */
export const reduce = curry((fn, init, list) => list.reduce(fn, init));

/**
 * head(list)
 * Возвращает первый элемент списка.
 */
export const head = (list) => list[0];

/**
 * tail(list)
 * Возвращает все элементы списка, кроме первого.
 */
export const tail = (list) => list.slice(1);
