<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// OpenAI API configuration
$apiKey = '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';
$url = 'https://api.openai.com/v1/chat/completions';

$data = json_encode($input);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_error($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'CURL Error: ' . curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

http_response_code($httpCode);
echo $response;
?>
