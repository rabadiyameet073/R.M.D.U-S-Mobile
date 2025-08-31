<?php
session_start();

// Handle multiple input methods
$cartData = [];
$totalAmount = 0;

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['cart_data'])) {
    $cartData = json_decode($_POST['cart_data'], true);
    $totalAmount = floatval($_POST['total_amount']);
} else {
    // Use sample data for testing
    $cartData = [
        ['id' => 1, 'name' => 'Infinix Hot 60i 5G', 'price' => 9299, 'quantity' => 3],
        ['id' => 2, 'name' => 'Infinix GT 30', 'price' => 21999, 'quantity' => 1],
        ['id' => 3, 'name' => 'iQOO Neo 10r', 'price' => 25000, 'quantity' => 1]
    ];
    $totalAmount = 74896;
}

// Handle order submission
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['place_order'])) {
    $orderId = 'MOB' . date('YmdHis') . rand(100, 999);
    header('Location: order_success.php?order_id=' . $orderId);
    exit;
}

$discountPercent = 15;
$discountAmount = $totalAmount * 0.15;
$afterDiscount = $totalAmount - $discountAmount;
$gstAmount = $afterDiscount * 0.18;
$finalTotal = $afterDiscount + $gstAmount;
?>
<!DOCTYPE html>
<html>
<head>
    <title>Checkout Working!</title>
    <style>
        body { font-family: Arial; padding: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; }
        .btn { background: #28a745; color: white; padding: 15px 30px; border: none; border-radius: 5px; cursor: pointer; width: 100%; font-size: 16px; }
        .item { padding: 10px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }
        .total { background: #e8f5e8; padding: 15px; margin: 20px 0; border-radius: 5px; font-size: 1.2em; font-weight: bold; }
        input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; }
    </style>
</head>
<body>
    <div class="container">
        <h2>✅ Checkout is Working!</h2>
        
        <h3>Order Summary</h3>
        <?php foreach($cartData as $item): ?>
            <div class="item">
                <span><?php echo $item['name']; ?> (×<?php echo $item['quantity']; ?>)</span>
                <span>₹<?php echo number_format($item['price'] * $item['quantity']); ?></span>
            </div>
        <?php endforeach; ?>
        
        <div class="total">
            <div>Subtotal: ₹<?php echo number_format($totalAmount); ?></div>
            <div>Discount (15%): -₹<?php echo number_format($discountAmount, 2); ?></div>
            <div>GST (18%): ₹<?php echo number_format($gstAmount, 2); ?></div>
            <div style="border-top: 2px solid #007bff; padding-top: 10px; margin-top: 10px;">
                Final Total: ₹<?php echo number_format($finalTotal, 2); ?>
            </div>
        </div>
        
        <form method="POST">
            <h3>Customer Information</h3>
            <input type="text" name="customer_name" placeholder="Full Name" required>
            <input type="email" name="customer_email" placeholder="Email" required>
            <input type="tel" name="customer_phone" placeholder="Phone" required>
            
            <input type="hidden" name="place_order" value="1">
            <button type="submit" class="btn">Place Order - ₹<?php echo number_format($finalTotal, 2); ?></button>
        </form>
    </div>
</body>
</html>
