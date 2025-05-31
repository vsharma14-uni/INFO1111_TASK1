<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Path to the JSON file
$dataFile = __DIR__ . '/maintenance_data.json';

// Ensure the data file exists
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode(['data' => []]));
}

// Read existing data
$jsonData = file_get_contents($dataFile);
$data = json_decode($jsonData, true);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Return all maintenance requests
    echo json_encode(['data' => $data['data'] ?? []]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get POST data
    $postData = json_decode(file_get_contents('php://input'), true);
    
    if (!$postData) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request data']);
        exit();
    }

    // Validate required fields
    $requiredFields = ['unit_number', 'description', 'priority', 'contact_name', 'contact_email'];
    foreach ($requiredFields as $field) {
        if (!isset($postData[$field]) || empty($postData[$field])) {
            http_response_code(400);
            echo json_encode(['error' => "Missing required field: $field"]);
            exit();
        }
    }

    // Create new maintenance request
    $newRequest = [
        'id' => uniqid(),
        'unit_number' => $postData['unit_number'],
        'description' => $postData['description'],
        'priority' => $postData['priority'],
        'contact_name' => $postData['contact_name'],
        'contact_email' => $postData['contact_email'],
        'status' => 'pending',
        'submission_date' => date('c')
    ];

    // Add to existing data
    $data['data'][] = $newRequest;

    // Save back to file
    if (file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT))) {
        echo json_encode(['message' => 'Request submitted successfully', 'data' => $newRequest]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save request']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?> 