<?php
// Check if user is logged in using cookie
$user_logged_in = isset($_COOKIE['user_session']);

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $user_logged_in) {
    $description = $_POST['description'] ?? '';
    $location = $_POST['location'] ?? '';
    $priority = $_POST['priority'] ?? 'normal';
    
    $sql = "INSERT INTO maintenance_requests (description, location, priority, status, created_at) 
            VALUES (?, ?, ?, 'pending', NOW())";
    executeQuery($sql, [$description, $location, $priority]);
    
    header('Location: /maintenance?success=1');
    exit;
}

// Fetch existing maintenance requests
$requests = executeQuery("SELECT * FROM maintenance_requests ORDER BY created_at DESC")->fetchAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maintenance Requests - Strata Management</title>
    <link href="/styles/tailwind.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Maintenance Requests</h1>
        
        <?php if ($user_logged_in): ?>
            <form method="POST" class="bg-white p-6 rounded-lg shadow-md mb-8">
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2">Description</label>
                    <textarea name="description" required
                        class="w-full p-2 border rounded"></textarea>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2">Location</label>
                    <input type="text" name="location" required
                        class="w-full p-2 border rounded">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2">Priority</label>
                    <select name="priority" class="w-full p-2 border rounded">
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>
                <button type="submit" 
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Submit Request
                </button>
            </form>
        <?php else: ?>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8">
                <p>Please log in to submit maintenance requests.</p>
            </div>
        <?php endif; ?>

        <div class="bg-white rounded-lg shadow-md">
            <h2 class="text-xl font-bold p-6 border-b">Recent Requests</h2>
            <div class="divide-y">
                <?php foreach ($requests as $request): ?>
                    <div class="p-6">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="font-semibold"><?= htmlspecialchars($request['location']) ?></h3>
                                <p class="text-gray-600 mt-1"><?= htmlspecialchars($request['description']) ?></p>
                            </div>
                            <span class="px-3 py-1 rounded-full text-sm
                                <?= $request['priority'] === 'urgent' ? 'bg-red-100 text-red-800' : 
                                    ($request['priority'] === 'high' ? 'bg-orange-100 text-orange-800' : 
                                    'bg-blue-100 text-blue-800') ?>">
                                <?= ucfirst(htmlspecialchars($request['priority'])) ?>
                            </span>
                        </div>
                        <div class="mt-4 text-sm text-gray-500">
                            Submitted: <?= date('F j, Y', strtotime($request['created_at'])) ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</body>
</html> 