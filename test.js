// Get elements from HTML
const amountInput = document.getElementById('amount');
const descInput = document.getElementById('description');
const balanceEl = document.getElementById('balance');
const listEl = document.getElementById('transactions');

// Function to update UI
function updateUI() {
  const summary = BudgetTracker.getSummary();

  // Update balance
  balanceEl.textContent = `Balance: R${summary.balance}`;

  // Clear list
  listEl.innerHTML = '';

  // Add transactions to list
  BudgetTracker.getTransactions().forEach(t => {
    const li = document.createElement('li');
    li.textContent = `${t.type}: R${t.amount} (${t.description})`;
    listEl.appendChild(li);
  });
}

// Add income
function addIncome() {
  const amount = Number(amountInput.value);
  const desc = descInput.value;

  const result = BudgetTracker.addIncome(amount, desc);

  console.log(result); // still logs to console
  updateUI(); // update browser UI
}

// Add expense
function addExpense() {
  const amount = Number(amountInput.value);
  const desc = descInput.value;

  const result = BudgetTracker.addExpense(amount, desc);

  console.log(result); // console output
  updateUI(); // update UI
}
