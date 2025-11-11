<?php
// Turn off error printing so it doesn't break JSON
error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Content-Type: application/json');
$response = array();

// 1. DATABASE CONNECTION
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_system";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database Connection Failed: " . $conn->connect_error]);
    exit();
}

// 2. SAFELY GET DATA (The ?? '' prevents crashes if keys are missing)
$firstName = $_POST['first-name'] ?? ''; 
$lastName  = $_POST['last-name'] ?? '';
$email     = $_POST['email'] ?? '';
$phone     = $_POST['number'] ?? ''; // Matches HTML name="number"
$pass      = $_POST['password'] ?? '';

// 3. VALIDATION
if (empty($firstName) || empty($lastName) || empty($email) || empty($phone) || empty($pass)) {
    echo json_encode(["success" => false, "message" => "Please fill in all fields."]);
    exit();
}

// 4. PREPARE DATA
$fullName = $firstName . " " . $lastName;

// 5. INSERT
// CRITICAL: Ensure your database column is named 'phone', NOT 'number'
$stmt = $conn->prepare("INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)");

if ($stmt) {
    $stmt->bind_param("ssss", $fullName, $email, $phone, $pass);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Signup successful! Welcome, " . $fullName;
    } else {
        if ($conn->errno == 1062) {
             $response['success'] = false;
             $response['message'] = "This email is already registered.";
        } else {
             $response['success'] = false;
             $response['message'] = "Database Error: " . $stmt->error;
        }
    }
    $stmt->close();
} else {
    $response['success'] = false;
    $response['message'] = "SQL Prepare Failed: " . $conn->error;
}

$conn->close();
echo json_encode($response);
?>
