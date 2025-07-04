// Импорт модуля для работы с вводом в консоли
import readline from "readline"

// Создание интерфейса для чтения ввода
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Функция для асинхронного ввода данных
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

// Функция определения дня недели
function getDayOfWeek(day, month, year) {
  const date = new Date(year, month - 1, day)
  const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
  return days[date.getDay()]
}

// Функция определения високосного года
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

// Функция вычисления возраста
function calculateAge(birthDay, birthMonth, birthYear) {
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1
  const currentDay = today.getDate()

  let age = currentYear - birthYear

  // Проверяем, прошел ли день рождения в этом году
  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age--
  }

  return age
}

// Функция создания цифр из звездочек
function createDigitPattern(digit) {
  const patterns = {
    0: [" *** ", "*   *", "*   *", "*   *", " *** "],
    1: ["  *  ", " **  ", "  *  ", "  *  ", " *** "],
    2: [" *** ", "*   *", "  ** ", " *   ", "*****"],
    3: [" *** ", "*   *", "  ** ", "*   *", " *** "],
    4: ["*   *", "*   *", "*****", "    *", "    *"],
    5: ["*****", "*    ", "**** ", "    *", "**** "],
    6: [" *** ", "*    ", "**** ", "*   *", " *** "],
    7: ["*****", "    *", "   * ", "  *  ", " *   "],
    8: [" *** ", "*   *", " *** ", "*   *", " *** "],
    9: [" *** ", "*   *", " ****", "    *", " *** "],
    " ": ["     ", "     ", "     ", "     ", "     "],
  }

  return patterns[digit] || patterns[" "]
}

// Функция отображения даты звездочками
function displayDateWithStars(day, month, year) {
  // Форматируем дату как строку с ведущими нулями
  const dateString = `${day.toString().padStart(2, "0")} ${month.toString().padStart(2, "0")} ${year}`

  console.log("\nДата рождения в формате электронного табло:")
  console.log("=".repeat(50))

  // Создаем массив паттернов для каждого символа
  const digitPatterns = dateString.split("").map((char) => createDigitPattern(char))

  // Выводим каждую строку паттерна
  for (let row = 0; row < 5; row++) {
    let line = ""
    for (let col = 0; col < digitPatterns.length; col++) {
      line += digitPatterns[col][row] + " "
    }
    console.log(line)
  }
  console.log("=".repeat(50))
}

// Функция валидации ввода
function validateInput(day, month, year) {
  const errors = []

  // Проверка дня
  if (isNaN(day) || day < 1 || day > 31) {
    errors.push("День должен быть числом от 1 до 31")
  }

  // Проверка месяца
  if (isNaN(month) || month < 1 || month > 12) {
    errors.push("Месяц должен быть числом от 1 до 12")
  }

  // Проверка года
  const currentYear = new Date().getFullYear()
  if (isNaN(year) || year < 1900 || year > currentYear) {
    errors.push(`Год должен быть числом от 1900 до ${currentYear}`)
  }

  // Проверка корректности даты
  if (errors.length === 0) {
    const date = new Date(year, month - 1, day)
    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
      errors.push("Указанная дата не существует")
    }
  }

  return errors
}

// Основная функция программы
async function main() {
  try {
    console.log("=".repeat(60))
    console.log("ПРОГРАММА АНАЛИЗА ДАТЫ РОЖДЕНИЯ")
    console.log("=".repeat(60))

    // Ввод данных с валидацией
    let day, month, year
    let isValidInput = false

    while (!isValidInput) {
      const dayInput = await askQuestion("Введите день рождения (1-31): ")
      const monthInput = await askQuestion("Введите месяц рождения (1-12): ")
      const yearInput = await askQuestion("Введите год рождения: ")

      day = Number.parseInt(dayInput)
      month = Number.parseInt(monthInput)
      year = Number.parseInt(yearInput)

      const errors = validateInput(day, month, year)

      if (errors.length === 0) {
        isValidInput = true
      } else {
        console.log("\nОШИБКИ ВВОДА:")
        errors.forEach((error) => console.log(`- ${error}`))
        console.log("\nПопробуйте еще раз.\n")
      }
    }

    // Выполнение расчетов
    console.log("\n" + "=".repeat(60))
    console.log("РЕЗУЛЬТАТЫ АНАЛИЗА")
    console.log("=".repeat(60))

    const dayOfWeek = getDayOfWeek(day, month, year)
    const isLeap = isLeapYear(year)
    const age = calculateAge(day, month, year)

    console.log(`Дата рождения: ${day}.${month}.${year}`)
    console.log(`День недели: ${dayOfWeek}`)
    console.log(`Високосный год: ${isLeap ? "Да" : "Нет"}`)
    console.log(`Текущий возраст: ${age} лет`)

    // Отображение даты звездочками
    displayDateWithStars(day, month, year)

    console.log("\nПрограмма завершена успешно!")
  } catch (error) {
    console.error("Произошла ошибка:", error.message)
  } finally {
    rl.close()
  }
}

// Запуск программы
main()
