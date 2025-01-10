<?php

// 设定文件路径
$filePath = './IP/Data.json';

// 获取当前时间
$currentTime = date('Y-m-d H:i:s');

// 初始化一个 cURL 对象
$ch = curl_init();

// 设置 cURL 选项
curl_setopt($ch, CURLOPT_URL, 'https://webapi-pc.meitu.com/common/ip_location?ip=');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// 忽略 SSL 证书验证
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Disable SSL peer verification
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // Disable SSL host verification

// 执行 cURL 请求并获取返回数据
$response = curl_exec($ch);

// 检查是否有 cURL 错误
if (curl_errno($ch)) {
    echo json_encode([
        'status_code' => 500,
        'msg' => 'Error: ' . curl_error($ch)
    ]);
    curl_close($ch);
    exit();
}

// 关闭 cURL 资源，释放系统资源
curl_close($ch);

// 解析 JSON 数据
$data = json_decode($response, true);

// 检查是否解析成功
if (!$data || !isset($data['data']) || empty($data['data'])) {
    echo json_encode([
        'status_code' => 500,
        'msg' => 'Error: Unable to parse JSON data.'
    ]);
    exit();
}

// 从数据中获取 IP 地址列表
$ipAddresses = array_keys($data['data']); // 假设 API 返回的数据包含多个 IP 地址

// 处理每个 IP 地址
foreach ($ipAddresses as $ip) {
    $ipData = $data['data'][$ip];
    
    // 组装新的 JSON 数组
    $newData = [
        'current_time' => $currentTime,
        'ip' => $ip,
        'latitude' => $ipData['latitude'],
        'longitude' => $ipData['longitude'],
        'location' => $ipData['continent'] . ' ' . $ipData['nation'] . ' ' . $ipData['province'] . ' ' . $ipData['city'] . ' ' . $ipData['isp']
    ];

    // 确保文件夹存在
    if (!file_exists(dirname($filePath))) {
        mkdir(dirname($filePath), 0755, true);
    }

    // 判断文件是否存在
    if (file_exists($filePath)) {
        // 文件存在，读取现有数据并追加
        $existingData = json_decode(file_get_contents($filePath), true);
        if (!is_array($existingData)) {
            $existingData = [];
        }
        $existingData[] = $newData;
        $jsonData = json_encode($existingData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    } else {
        // 文件不存在，创建文件并写入
        $jsonData = json_encode([$newData], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    // 写入数据到文件
    file_put_contents($filePath, $jsonData);
}

// 返回成功消息
echo json_encode([
    'status_code' => 200,
    'msg' => 'Data saved successfully.'
]);

?>
