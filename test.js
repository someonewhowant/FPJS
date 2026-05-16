import { 
  pipe, 
  map, 
  filter, 
  prop, 
  assoc, 
  path, 
  equals, 
  allPass 
} from './index.js';

console.log('--- Начинаем тестирование Mini-Ramda ---');

const users = [
  { id: 1, name: 'Ivan', score: 80, info: { city: 'Moscow' } },
  { id: 2, name: 'Anna', score: 120, info: { city: 'Berlin' } },
  { id: 3, name: 'Petr', score: 95, info: { city: 'Moscow' } }
];

// 1. Проверка pipe и каррирования (filter, assoc, prop)
const processUsers = pipe(
  filter(user => user.score > 85),
  map(assoc('isWinner', true)),
  map(prop('name'))
);

console.log('1. Победители (score > 85):', processUsers(users)); 
// Ожидаемо: ['Anna', 'Petr']

// 2. Проверка path (безопасное чтение)
const getCity = path(['info', 'city']);
console.log('2. Город Анны:', getCity(users[1])); // 'Berlin'
console.log('2. Неизвестный путь:', path(['info', 'zip'], users[0])); // undefined

// 3. Проверка equals (глубокое сравнение)
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
console.log('3. Глубокое равенство:', equals(obj1, obj2)); // true

// 4. Проверка allPass (сложная валидация)
const isValidUser = allPass([
  user => user.score > 90,
  user => path(['info', 'city'], user) === 'Moscow'
]);

const moscowWinners = users.filter(isValidUser);
console.log('4. Победители из Москвы:', moscowWinners.map(prop('name'))); 
// Ожидаемо: ['Petr']

console.log('--- Тестирование завершено успешно! ---');
