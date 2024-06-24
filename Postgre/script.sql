-- Create the User table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    login_credential VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255)
);

-- Create the Student table that inherits from User
CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    RA INT,
    course VARCHAR(255),
    FOREIGN KEY (student_id) REFERENCES users (id)
);

-- Create the Company table that inherits from User
CREATE TABLE company (
    company_id SERIAL PRIMARY KEY,
    document VARCHAR(14),
    website VARCHAR(255),
    FOREIGN KEY (company_id) REFERENCES users (id)
);

-- Create the Job table
CREATE TABLE job (
    job_id SERIAL PRIMARY KEY,
    description TEXT,
    company_name VARCHAR(255),
    job_name VARCHAR(255),
    photo BYTEA,
    FOREIGN KEY (company_name) REFERENCES users (login_credential)
);

-- Create the Resume table
CREATE TABLE resume (
    resume_id SERIAL PRIMARY KEY,
    file_name VARCHAR(255),
    student_id INT,
    FOREIGN KEY (student_id) REFERENCES student (student_id)
);


-- useful queries:
SELECT
    u.id,
    u.login_credential,
    u.password,
    u.name,
    s.RA,
    s.course
FROM
    users u
JOIN
    student s ON u.id = s.student_id;