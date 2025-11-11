<?php
// Enable error logging to a file instead of displaying
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_errors.log');

header('Content-Type: application/json');
$response = array();

try {
    // 1. DATABASE CONNECTION
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "user_system";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        throw new Exception("Database Connection Failed: " . $conn->connect_error);
    }

    // 2. CHECK IF DATA WAS RECEIVED
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Invalid request method. Expected POST.");
    }

    // 3. SAFELY GET DATA
    $firstName = trim($_POST['first-name'] ?? ''); 
    $lastName  = trim($_POST['last-name'] ?? '');
    $email     = trim($_POST['email'] ?? '');
    $phone     = trim($_POST['number'] ?? '');
    $pass      = $_POST['password'] ?? '';

    // 4. SERVER-SIDE VALIDATION
    if (empty($firstName) || empty($lastName) || empty($email) || empty($phone) || empty($pass)) {
        throw new Exception("Please fill in all fields.");
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email format.");
    }

    // Validate phone number (10 digits)
    if (!preg_match('/^[0-9]{10}$/', $phone)) {
        throw new Exception("Invalid phone number. Must be 10 digits.");
    }

    // 5. PREPARE DATA
    $fullName = $firstName . " " . $lastName;
    
    // Hash password for security (NEVER store plain text passwords!)
    $hashedPassword = password_hash($pass, PASSWORD_DEFAULT);

    // 6. CHECK IF EMAIL ALREADY EXISTS
    $checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $checkStmt->store_result();
    
    if ($checkStmt->num_rows > 0) {
        $checkStmt->close();
        throw new Exception("This email is already registered.");
    }
    $checkStmt->close();

    // 7. INSERT NEW USER
    $stmt = $conn->prepare("INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)");
    
    if (!$stmt) {
        throw new Exception("SQL Prepare Failed: " . $conn->error);
    }

    $stmt->bind_param("ssss", $fullName, $email, $phone, $hashedPassword);

    if (!$stmt->execute()) {
        throw new Exception("Database Error: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();

    // SUCCESS RESPONSE
    $response['success'] = true;
    $response['message'] = "Signup successful! Welcome, " . $fullName;

} catch (Exception $e) {
    // ERROR RESPONSE
    $response['success'] = false;
    $response['message'] = $e->getMessage();
    
    // Log the error
    error_log("Signup Error: " . $e->getMessage());
}

echo json_encode($response);
?>
