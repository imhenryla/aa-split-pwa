<!DOCTYPE html>
<html lang="zh-Hant">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>AA制還款計算工具 (PWA)</title>

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">

  <!-- App Icon & Manifest -->
  <link rel="manifest" href="manifest.json">
  <link rel="apple-touch-icon" href="icon.png">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="AA Split">

  <!-- 自訂樣式 -->
  <style>
    body {
      padding: 1rem;
      background-color: #f8f9fa;
    }

    .card-header {
      font-weight: bold;
    }

    .btn-group .btn {
      margin: 2px;
    }

    h5 {
      margin-top: 1rem;
    }
  </style>
</head>

<body>
  <div class="container">
    <h2 class="mb-4 text-center">AA制還款計算工具 (PWA)</h2>

    <!-- 新增人員區塊 -->
    <div class="card mb-4 shadow-sm">
      <div class="card-header">新增人員</div>
      <div class="card-body">
        <form id="addPersonForm" class="row g-2">
          <div class="col-sm">
            <input type="text" id="personName" class="form-control" placeholder="輸入姓名" required />
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary">新增</button>
          </div>
        </form>
        <ul id="peopleList" class="mt-3 list-group"></ul>
      </div>
    </div>

    <!-- 新增帳目區塊 -->
    <div class="card mb-4 shadow-sm">
      <div class="card-header">新增帳目</div>
      <div class="card-body">
        <form id="addBillForm">
          <div class="mb-3">
            <label for="purpose" class="form-label">用途</label>
            <input type="text" id="purpose" class="form-control" placeholder="例如：晚餐" required />
          </div>
          <div class="mb-3">
            <label for="amount" class="form-label">金額 (TWD)</label>
            <input type="number" id="amount" class="form-control" min="0" step="1" required />
          </div>
          <div class="mb-3">
            <label class="form-label">付款人</label>
            <div id="payerButtons" class="btn-group flex-wrap" role="group"></div>
          </div>
          <div class="mb-3">
            <label class="form-label">包含人員</label>
            <div id="includedGroup" class="btn-group flex-wrap" role="group"></div>
          </div>
          <button type="submit" class="btn btn-success">新增帳目</button>
        </form>
      </div>
    </div>

    <!-- 帳目紀錄區塊 -->
    <div class="card mb-4 shadow-sm">
      <div class="card-header">帳目紀錄</div>
      <div class="card-body">
        <ul id="billsList" class="list-group"></ul>
      </div>
    </div>

    <!-- 還款結果區塊 -->
    <div class="card mb-4 shadow-sm">
      <div class="card-header">還款結果</div>
      <div class="card-body">
        <h5>每人餘額</h5>
        <ul id="balanceList" class="list-group mb-3"></ul>
        <h5>還款建議</h5>
        <ul id="settlementList" class="list-group"></ul>
      </div>
    </div>
  </div>

  <!-- Bootstrap JS (含 Popper) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

  <!-- PWA 註冊 -->
  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js')
        .then(() => console.log('✅ Service Worker 註冊成功'))
        .catch(err => console.error('❌ 註冊失敗:', err));
    }
  </script>

  <!-- 應用邏輯 -->
  <script src="app.js"></script>
</body>

</html>
