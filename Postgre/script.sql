-- Create the User table
CREATE TABLE User (
    id SERIAL PRIMARY KEY,
    login_credential VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the Student table that inherits from User
CREATE TABLE Student (
    student_id SERIAL PRIMARY KEY,
    RA INT,
    name VARCHAR(255),
    course VARCHAR(255),
    FOREIGN KEY (student_id) REFERENCES User (id)
);

-- Create the Company table that inherits from User
CREATE TABLE Company (
    company_id SERIAL PRIMARY KEY,
    CNPJ VARCHAR(14),
    name VARCHAR(255),
    job_info TEXT,
    FOREIGN KEY (company_id) REFERENCES User (id)
);

-- Create the Job table
CREATE TABLE Job (
    job_id SERIAL PRIMARY KEY,
    description TEXT,
    company_name VARCHAR(255),
    photo BYTEA,
    FOREIGN KEY (company_name) REFERENCES User (login_credential)
);

-- Create the Resume table
CREATE TABLE Resume (
    resume_id SERIAL PRIMARY KEY,
    file_name VARCHAR(255),
    student_id INT,
    FOREIGN KEY (student_id) REFERENCES Student (student_id)
);
