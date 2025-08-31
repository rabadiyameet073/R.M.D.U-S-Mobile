<?php
session_start();

$orderId = $_GET['order_id'] ?? 'Unknown';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
        .success-container { background: white; padding: 40px; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; max-width: 500px; }
        .success-icon { font-size: 4em; color: #28a745; margin-bottom: 20px; }
        .btn { padding: 12px 25px; margin: 10px; border: none; border-radius: 5px; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn-primary { background: #007bff; color: white; }
        .btn-success { background: #28a745; color: white; }
    </style>
</head>
<body>
    <div class="success-container">
        <div class="success-icon">✅</div>
        <h1>Order Placed Successfully!</h1>
        <h3>Order ID: <?php echo htmlspecialchars($orderId); ?></h3>
        <p>Thank you for your purchase! Your order has been confirmed and will be processed shortly.</p>
        <p>You will receive an email confirmation with order details.</p>
        
        <a href="cart.html" class="btn btn-primary">Continue Shopping</a>
        <a href="order_tracking.php?id=<?php echo $orderId; ?>" class="btn btn-success">Track Order</a>
    </div>
</body>
</html>
