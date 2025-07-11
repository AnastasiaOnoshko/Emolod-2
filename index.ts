import promptSync from 'prompt-sync';
const prompt = promptSync();

//Завдання 1

type UserData = {
    fullName: string;
};

function People(firstName: string, lastName: string): boolean {
    return firstName.trim().length > 0 && lastName.trim().length > 0;
}

let firstName = prompt('Введіть ім’я: ');
let lastName = prompt('Введіть прізвище: ');

if (People(firstName, lastName)) {
    let user: UserData = {
        fullName: `${firstName.trim()} ${lastName.trim()}`
    };
    console.log('Користувача створено: ' + user.fullName);
} else {
    console.log('Ім’я або прізвище не може бути порожнім.');
}

//Завдання 2

function Perevirka(storedValue: string, inputValue: string): boolean {
    return storedValue === inputValue;
}

type User = {
    login: string;
    password: string;
};

console.log('Будь ласка, введіть свої дані для входу: ');
let userLogin = prompt('Login: ');
let userPassword = prompt('Password: ');

if (Perevirka('admin', userLogin) && Perevirka('12345', userPassword)) {
    let user: User = {
        login: userLogin,
        password: userPassword
    };
    console.log('Вхід успішний');
} else {
    console.log('Доступ заборонено');
}

//Завдання 3

type Product = {
    name: string;
    description: string;
    quantity: number;
    price: number;
};
function perevirkaTekstu(value: string): boolean {
    return value.trim().length > 5;
}

function perevirkaChysla(value: number): boolean {
    return !isNaN(value) && value > 0;
}

console.log('Введіть дані товару:');

let name = prompt('Назва товару:');
let description = prompt('Опис товару:');
let quantityInput = prompt('Кількість:');
let priceInput = prompt('Ціна:');

let quantity = Number(quantityInput);
let price = Number(priceInput);

if (
    perevirkaTekstu(name) &&
    perevirkaTekstu(description) &&
    perevirkaChysla(quantity) &&
    perevirkaChysla(price)
) {
    let product: Product = {
        name: name!.trim(),
        description: description!.trim(),
        quantity,
        price
    };

    console.log('Товар успішно створений:');
    console.log(product);
} else {
    console.log('Помилка: перевірте правильність введених даних.');
}


//Завдання 4

function PerevirkaNumber(Chyslo: number): boolean {
    return !isNaN(Chyslo) && Chyslo > 0;
}

let heightCm = Number(prompt('Введіть свій зріст у сантиметрах: '));
let weightKg = Number(prompt('Введіть свою вагу у кілограмах: '));

if (PerevirkaNumber(heightCm) && PerevirkaNumber(weightKg)) {
    let heightM = heightCm / 100;
    let IMT = weightKg / (heightM * heightM);

    console.log('Ваш IMT: ' + IMT.toFixed(2));

    if (IMT < 18.5) {
        console.log('У вас недостатня вага');
    } else if (IMT >= 18.5 && IMT <= 24.9) {
        console.log('Ваша вага у нормі');
    } else if (IMT >= 25 && IMT <= 29.9) {
        console.log('У вас надмірна вага');
    } else {
        console.log('У вас є ожиріння');
    }

} else {
    console.log('Виникла помилка: ваші дані мають бути числами більше нулю ');
}


//Завдання 5

interface User {
  email: string;
  password: string;
  birthDate: string;
}

function checkLength(type: string, min: number, max: number): boolean {
  return type.length >= min && type.length <= max;
}

function includesSymbol(type: string, symbol: string): boolean {
  return type.includes(symbol);
}

function notSameChar(type: string): boolean {
  return !/^(.)(\1)*$/.test(type);
}

function calculateAge(birthDate: string): number | null {
  let birth = new Date(birthDate);
  if (isNaN(birth.getTime())) return null;
  let today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  let m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

console.log('Реєстрація нового користувача:');

let email = prompt('Email: ');
let password = prompt('Пароль: ');
let birth = prompt('Дата народження (YYYY-MM-DD): ');

let valid = true;

if (!checkLength(email, 8, 100) || !includesSymbol(email, '@') || !includesSymbol(email, '.')) {
  console.log('Email має бути ≥8 символів і містити @ та .');
  valid = false;
}

if (!checkLength(password, 9, 15) || !notSameChar(password)) {
  console.log('Пароль має бути >8 і <16 символів та не з одного виду символів');
  valid = false;
}

const age = calculateAge(birth);
if (age === null || age < 18 || age > 99) {
  console.log('Вік має бути ≥18 і ≤99 років, введіть коректну дату (YYYY-MM-DD)');
  valid = false;
}

if (valid) {
  const user: User = {
    email: email,
    password: password,
    birthDate: birth,
  };
  console.log('Реєстрація успішна!');
  console.log('User:', user);
} else {
  console.log('Реєстрація неуспішна. Спробуйте ще раз.');
}


//Завдання 6

function convertTemperature(temperature: string) {
  
  let parts = temperature.trim().split(' ');

  if (parts.length !== 2) {
    console.log('Введи так: число і пробіл, а потім C або F');
    return;
  }

  let numberPart = parts[0];
  let typePart = parts[1].toUpperCase();
  let numberValue = Number(numberPart);

  if (isNaN(numberValue)) {
    console.log('Перше має бути число');
    return;
  }

  if (typePart !== 'C' && typePart !== 'F') {
    console.log('Пиши C або F після числа');
    return;
  }

  if (typePart === 'C') {
    let result = (numberValue * 9 / 5) + 32;
    console.log('Температура в F: ' + result.toFixed(2));
  }

  else {
    let result = (numberValue - 32) * 5 / 9;
    console.log('Температура в C: ' + result.toFixed(2));
  }
}

let userInput = prompt('Введи температуру, наприклад: 100 C або 32 F');
if (userInput) {
  convertTemperature(userInput);
} else {
  console.log('Ти нічого не ввів');
}
