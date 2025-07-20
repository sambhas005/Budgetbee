let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateSummary() {
  let income = 0, expense = 0;
  transactions.forEach(t => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });
  document.getElementById("total-income").textContent = income.toFixed(2);
  document.getElementById("total-expense").textContent = expense.toFixed(2);
  document.getElementById("balance").textContent = (income - expense).toFixed(2);
}

function renderTransactions() {
  const list = document.getElementById("transaction-list");
  list.innerHTML = "";
  transactions.forEach((t, i) => {
    const li = document.createElement("li");
    li.classList.add(t.type);
    li.innerHTML = `
      <div>
        <strong>${t.description}</strong><br />
        <span class="date">${t.date}</span>
      </div>
      <div>
        ₹${t.amount.toFixed(2)}
        <button class="delete-btn" onclick="deleteTransaction(${i})">X</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
  updateSummary();
}

function addTransaction() {
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const date = new Date().toLocaleDateString();

  if (!desc || isNaN(amount)) {
    alert("Please enter valid description and amount.");
    return;
  }

  const transaction = { description: desc, amount, type, date };
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
  updateSummary();

  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
}

renderTransactions();
updateSummary();
 