-- Create maintenance requests table
CREATE TABLE IF NOT EXISTS maintenance_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    priority ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal',
    status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    unit_number VARCHAR(50) NOT NULL,
    entitlements INT NOT NULL DEFAULT 1,
    role ENUM('owner', 'committee', 'admin') DEFAULT 'owner',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    document_type ENUM('insurance', 'financial', 'minutes', 'other') NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by INT,
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Create levy notices table
CREATE TABLE IF NOT EXISTS levy_notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    status ENUM('pending', 'paid', 'overdue') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
); 