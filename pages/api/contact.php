<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

session_start();

// Initialize response array
$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate inputs
    if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
        $response['status'] = 'error';
        $response['message'] = 'All fields are required';
    } else {
        // Store in session for demo purposes
        $_SESSION['contact_submissions'][] = array(
            'name' => $data['name'],
            'email' => $data['email'],
            'message' => $data['message'],
            'timestamp' => date('Y-m-d H:i:s')
        );
        
        // Set success response
        $response['status'] = 'success';
        $response['message'] = 'Message received successfully';
        
        // Set a cookie to track submission
        setcookie('last_submission', date('Y-m-d H:i:s'), time() + (86400 * 30), "/");
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Return all submissions
    $response['status'] = 'success';
    $response['submissions'] = isset($_SESSION['contact_submissions']) ? $_SESSION['contact_submissions'] : array();
}

echo json_encode($response); 