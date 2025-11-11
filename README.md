# 📝 Sign-Up Form

A responsive and accessible **full-stack sign-up form** built with **HTML, CSS, JavaScript, PHP, and MySQL**.  
Originally part of *The Odin Project* curriculum, this version extends the frontend project into a complete, database-backed application.

---

## 🌟 Features

### 🧩 Layout & Design
- Responsive **two-column layout** optimized for desktop and adaptable to mobile screens.  
- Modern, clean styling using **custom fonts, colors, and CSS variables**.  
- Clear focus indicators and **accessible color contrast**.  
- Custom text selection color for a unique user experience.

### ⚙️ Client-Side Validation
- Required field checks for all inputs.  
- Email validation using HTML5 `type="email"`.  
- Phone number validation using regex and the `pattern` attribute.  
- Password strength validation via JavaScript:
  - Minimum 8 characters  
  - At least one uppercase, lowercase, number, and special character  
- Password confirmation check (passwords must match).  
- Real-time error messages and smooth animations for feedback.

---

## ⚙️ Full-Stack & Backend
- **Server-Side Logic:** PHP scripts securely process and validate submitted form data.  
- **Database Integration:** Connects to a **MySQL** database to store user information.  
- **Secure Data Handling:** Uses **prepared statements** to prevent SQL injection attacks.  
- **Dynamic Feedback:** Displays live server responses such as “Email already in use.”  
- **Local Deployment:** Fully runnable on **Windows using XAMPP** (`localhost` environment).

---

## 🧠 Technologies Used

- **Frontend**
  - HTML5  
  - CSS3  
    - Flexbox  
    - CSS Grid  
    - Custom properties (variables)  
    - Pseudo-classes (`:focus`, `:invalid`)  
    - Pseudo-elements (`::before`, `::selection`)  
    - Keyframe animations and transitions  
  - JavaScript  
    - DOM manipulation  
    - Event listeners (`input`, `blur`)  
    - Regular expressions (regex) for validation  
    - Fetch API (for async requests)

- **Backend**
  - **PHP**
    - Server-side scripting for data processing  
    - MySQLi (for database communication)  
    - JSON encoding/decoding for API-style responses  
  - **MySQL**
    - Relational database for persistent user storage  
  - **XAMPP Stack**
    - Local development environment: **Apache + MySQL + PHP**
    - Tested on **Windows 10/11**

---

## 🛠️ Setup Instructions

To run this project locally on **Windows**, you must use a local server stack like **XAMPP**.

### 1️⃣ Install XAMPP
- Download and install from [https://www.apachefriends.org/download.html](https://www.apachefriends.org/download.html)
- Start the **Apache** and **MySQL** modules from the **XAMPP Control Panel**.

### 2️⃣ Clone the Repository
Clone it directly into your XAMPP’s web root folder:
```bash
cd C:\xampp\htdocs
git clone https://github.com/yourusername/sign-up-form.git

3️⃣ Create the Database

Open your browser and go to:

http://localhost/phpmyadmin


Click New → create a database named:

user_system


Import the provided database.sql file (or manually create a users table matching your schema).
(Tip: Export your phpMyAdmin table and include it as database.sql in your repo for easy setup.)

4️⃣ Run the Application

In your browser, visit:

http://localhost/sign-up-form/


You should see your responsive sign-up page running via Apache and connected to MySQL.

🧾 Acknowledgements

Project idea and structure inspired by The Odin Project – Sign-Up Form assignment.

Extended to full-stack functionality by integrating PHP and MySQL.

Thanks to the open-source community for CSS and JavaScript inspiration.

📄 License

This project is open-source and available under the MIT License
.

Created as part of The Odin Project curriculum to practice front-end design, client-side validation, and now full-stack (PHP + MySQL) integration.
