import { curry } from './core.js';

/**
 * src/object.js
 * 
 * # Описание реализации Шага 4: Работа с объектами
 * 
 * В этом модуле мы реализуем утилиты для работы со структурами данных. 
 * Основной упор сделан на иммутабельность — мы никогда не меняем исходный объект.
 */

/**
 * prop(key, obj)
 * Возвращает значение свойства по ключу.
 */
export const prop = curry((key, obj) => obj[key]);

/**
 * path(keys, obj)
 * Безопасное получение значения по пути (массиву ключей).
 * Если на каком-то этапе значение отсутствует, возвращает undefined.
 */
export const path = curry((keys, obj) => 
  keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
);

/**
 * assoc(key, value, obj)
 * Иммутабельное добавление или обновление свойства.
 * Возвращает НОВЫЙ объект, используя Spread-оператор.
 */
export const assoc = curry((key, value, obj) => ({
  ...obj,
  [key]: value
}));

/**
 * pick(keys, obj)
 * Создает новый объект, содержащий только указанные ключи из исходного объекта.
 */
export const pick = curry((keys, obj) => 
  keys.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key];
    return acc;
  }, {})
);
