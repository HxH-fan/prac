
-- =====================================================
-- СИСТЕМА УПРАВЛЕНИЯ БИБЛИОТЕКОЙ - ПОЛНАЯ БАЗА ДАННЫХ
-- =====================================================
-- PostgreSQL
-- Автор: Система v0
-- Дата создания: 2025-01-07

-- =====================================================
-- 1. СОЗДАНИЕ ТАБЛИЦ
-- =====================================================

-- Таблица категорий книг (с поддержкой иерархии)
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    parent_category_id INTEGER REFERENCES categories(category_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица издательств
CREATE TABLE publishers (
    publisher_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(200),
    country VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица авторов
CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE,
    death_date DATE,
    nationality VARCHAR(50),
    biography TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица читателей
CREATE TABLE readers (
    reader_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    birth_date DATE,
    address TEXT,
    registration_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'expired')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица библиотекарей
CREATE TABLE librarians (
    librarian_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    hire_date DATE DEFAULT CURRENT_DATE,
    position VARCHAR(50),
    salary DECIMAL(10,2),
    shift VARCHAR(20) CHECK (shift IN ('morning', 'afternoon', 'evening')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица книг
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    isbn VARCHAR(17) UNIQUE,
    title VARCHAR(300) NOT NULL,
    publisher_id INTEGER NOT NULL REFERENCES publishers(publisher_id),
    category_id INTEGER NOT NULL REFERENCES categories(category_id),
    publication_date DATE,
    pages_count INTEGER CHECK (pages_count > 0),
    language VARCHAR(30) DEFAULT 'Russian',
    copies_total INTEGER NOT NULL DEFAULT 1 CHECK (copies_total > 0),
    copies_available INTEGER NOT NULL DEFAULT 1 CHECK (copies_available >= 0),
    location VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_copies CHECK (copies_available <= copies_total)
);

-- Связующая таблица книги-авторы (многие ко многим)
CREATE TABLE book_authors (
    book_id INTEGER REFERENCES books(book_id) ON DELETE CASCADE,
    author_id INTEGER REFERENCES authors(author_id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'author' CHECK (role IN ('author', 'co-author', 'editor', 'translator')),
    PRIMARY KEY (book_id, author_id, role)
);

-- Таблица выдач книг
CREATE TABLE book_loans (
    loan_id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL REFERENCES books(book_id),
    reader_id INTEGER NOT NULL REFERENCES readers(reader_id),
    librarian_id INTEGER NOT NULL REFERENCES librarians(librarian_id),
    loan_date DATE DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    return_date DATE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'returned', 'overdue', 'lost')),
    fine_amount DECIMAL(8,2) DEFAULT 0.00,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_dates CHECK (due_date > loan_date),
    CONSTRAINT check_return_date CHECK (return_date IS NULL OR return_date >= loan_date)
);

-- Таблица резервирований
CREATE TABLE reservations (
    reservation_id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL REFERENCES books(book_id),
    reader_id INTEGER NOT NULL REFERENCES readers(reader_id),
    reservation_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'fulfilled', 'cancelled', 'expired')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_reservation_dates CHECK (expiry_date > reservation_date)
);
