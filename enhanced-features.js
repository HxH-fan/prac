// Дополнительные улучшения для программы

// 1. Система локализации
const LOCALES = {
  ru: {
    days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    months: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    messages: {
      enterDay: "Введите день рождения (1-31): ",
      enterMonth: "Введите месяц рождения (1-12): ",
      enterYear: "Введите год рождения: ",
      isLeapYear: "Високосный год",
      currentAge: "Текущий возраст",
    },
  },
  en: {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    messages: {
      enterDay: "Enter birth day (1-31): ",
      enterMonth: "Enter birth month (1-12): ",
      enterYear: "Enter birth year: ",
      isLeapYear: "Leap year",
      currentAge: "Current age",
    },
  },
}

// 2. Расширенные паттерны символов
const EXTENDED_PATTERNS = {
  ":": ["     ", "  *  ", "     ", "  *  ", "     "],
  "-": ["     ", "     ", "*****", "     ", "     "],
  ".": ["     ", "     ", "     ", "     ", "  *  "],
}

// 3. Конфигурационный класс
class BirthdayAnalyzerConfig {
  constructor() {
    this.locale = "ru"
    this.dateFormat = "dd.mm.yyyy"
    this.starPattern = "*"
    this.enableColors = false
  }

  setLocale(locale) {
    if (LOCALES[locale]) {
      this.locale = locale
    }
  }

  setDateFormat(format) {
    this.dateFormat = format
  }

  setStarPattern(pattern) {
    this.starPattern = pattern
  }
}

// 4. Класс для работы с историей
class BirthdayHistory {
  constructor() {
    this.history = []
  }

  addEntry(day, month, year, results) {
    this.history.push({
      date: new Date(),
      birthDate: { day, month, year },
      results: results,
      timestamp: Date.now(),
    })
  }

  getHistory() {
    return this.history
  }

  clearHistory() {
    this.history = []
  }
}

// 5. Утилиты для тестирования
class TestUtils {
  static generateTestCases() {
    return [
      { day: 29, month: 2, year: 2020, expected: { isLeap: true } }, // Високосный год
      { day: 29, month: 2, year: 2021, expected: { isValid: false } }, // Невалидная дата
      { day: 1, month: 1, year: 2000, expected: { dayOfWeek: "Суббота" } },
      { day: 31, month: 12, year: 1999, expected: { dayOfWeek: "Пятница" } },
    ]
  }

  static runTests(testFunction) {
    const testCases = this.generateTestCases()
    let passed = 0
    let failed = 0

    testCases.forEach((testCase, index) => {
      try {
        const result = testFunction(testCase)
        if (result) {
          console.log(`✅ Тест ${index + 1} пройден`)
          passed++
        } else {
          console.log(`❌ Тест ${index + 1} провален`)
          failed++
        }
      } catch (error) {
        console.log(`❌ Тест ${index + 1} провален с ошибкой: ${error.message}`)
        failed++
      }
    })

    console.log(`\nРезультаты тестирования: ${passed} пройдено, ${failed} провалено`)
  }
}

// 6. Логирование и мониторинг
class Logger {
  constructor() {
    this.logs = []
  }

  log(level, message, data = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: level,
      message: message,
      data: data,
    }

    this.logs.push(logEntry)

    if (level === "ERROR") {
      console.error(`[${logEntry.timestamp}] ERROR: ${message}`, data)
    } else if (level === "WARN") {
      console.warn(`[${logEntry.timestamp}] WARN: ${message}`, data)
    } else {
      console.log(`[${logEntry.timestamp}] ${level}: ${message}`, data)
    }
  }

  getLogs() {
    return this.logs
  }

  exportLogs() {
    return JSON.stringify(this.logs, null, 2)
  }
}

console.log("Дополнительные функции загружены успешно!")
console.log("Доступны классы: BirthdayAnalyzerConfig, BirthdayHistory, TestUtils, Logger")
