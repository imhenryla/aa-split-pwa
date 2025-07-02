
const people = [];
const bills = [];

document.getElementById("addPersonForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("personName").value.trim();
  if (name && !people.includes(name)) {
    people.push(name);
    updatePeopleList();
    updateButtons();
    document.getElementById("personName").value = "";
  }
});

function updatePeopleList() {
  const list = document.getElementById("peopleList");
  list.innerHTML = "";
  people.forEach(p => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = p;
    list.appendChild(li);
  });
}

function updateButtons() {
  const payerDiv = document.getElementById("payerButtons");
  const includedDiv = document.getElementById("includedGroup");
  payerDiv.innerHTML = "";
  includedDiv.innerHTML = "";

  people.forEach(p => {
    const payerBtn = document.createElement("input");
    payerBtn.type = "radio";
    payerBtn.className = "btn-check";
    payerBtn.name = "payer";
    payerBtn.value = p;
    payerBtn.id = "payer-" + p;

    const payerLabel = document.createElement("label");
    payerLabel.className = "btn btn-outline-primary";
    payerLabel.htmlFor = payerBtn.id;
    payerLabel.textContent = p;

    payerDiv.appendChild(payerBtn);
    payerDiv.appendChild(payerLabel);

    const includedChk = document.createElement("input");
    includedChk.type = "checkbox";
    includedChk.className = "btn-check";
    includedChk.value = p;
    includedChk.id = "included-" + p;

    const includedLabel = document.createElement("label");
    includedLabel.className = "btn btn-outline-secondary";
    includedLabel.htmlFor = includedChk.id;
    includedLabel.textContent = p;

    includedDiv.appendChild(includedChk);
    includedDiv.appendChild(includedLabel);
  });
}

document.getElementById("addBillForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const purpose = document.getElementById("purpose").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const payer = document.querySelector("input[name='payer']:checked");
  const included = Array.from(document.querySelectorAll("#includedGroup input:checked")).map(i => i.value);

  if (purpose && amount > 0 && payer && included.length > 0) {
    bills.push({ purpose, amount, payer: payer.value, included });
    document.getElementById("purpose").value = "";
    document.getElementById("amount").value = "";
    updateBills();
    updateResult();
  }
});

function updateBills() {
  const list = document.getElementById("billsList");
  list.innerHTML = "";
  bills.forEach((b, i) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${b.payer} 付了 ${b.amount} 元（${b.purpose}，${b.included.join("、")}）`;
    list.appendChild(li);
  });
}

function updateResult() {
  const balance = {};
  people.forEach(p => balance[p] = 0);
  bills.forEach(b => {
    const share = b.amount / b.included.length;
    b.included.forEach(p => {
      balance[p] -= share;
    });
    balance[b.payer] += b.amount;
  });

  const balanceList = document.getElementById("balanceList");
  balanceList.innerHTML = "";
  Object.keys(balance).forEach(p => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${p}：${balance[p].toFixed(2)} 元`;
    balanceList.appendChild(li);
  });

  const settlementList = document.getElementById("settlementList");
  settlementList.innerHTML = "（尚未實作）";
}
