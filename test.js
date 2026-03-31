// Get HTML elements
const amountInput = document.getElementById('amountInput');
const descInput = document.getElementById('descriptionInput');
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expensesEl = document.getElementById('expenses');
const listEl = document.getElementById('transactions');

// Update UI function
function updateUI() {

  // Get summary from module
  const summary = BudgetTracker.getSummary();

  // Update values on screen
  incomeEl.textContent = `Income: R${summary.totalIncome}`;
  expensesEl.textContent = `Expenses: R${summary.totalExpenses}`;
  balanceEl.textContent = `Balance: R${summary.balance}`;

  // Clear transaction list
  listEl.innerHTML = '';

  // Loop through transactions and display them
  BudgetTracker.getTransactions().forEach(t => {
    const li = document.createElement('li');

    // Show type, amount and description
    li.textContent = `${t.type}: R${t.amount} (${t.description})`;

    listEl.appendChild(li);
  });
}

// Add income function
function addIncome() {
  const amount = Number(amountInput.value);
  const desc = descInput.value;

  const result = BudgetTracker.addIncome(amount, desc);

  console.log(result); // Show in console
  updateUI(); // Update browser UI

  // Clear inputs after adding
  amountInput.value = '';
  descInput.value = '';
}

// Add expense function
function addExpense() {
  const amount = Number(amountInput.value);
  const desc = descInput.value;

  const result = BudgetTracker.addExpense(amount, desc);

  console.log(result); // Console output
  updateUI(); // Update UI

  // Clear inputs
  amountInput.value = '';
  descInput.value = '';
}

//? Bonus:  The functionality for category

function addIncome() {
  const amount = Number(amountInput.value);
  const desc = descInput.value;
  const category = document.getElementById('categoryInput').value; // get category

  const result = BudgetTracker.addIncome(amount, desc, category);

  console.log(result);
  updateUI();

  amountInput.value = '';
  descInput.value = '';
}

function addExpense() {
  const amount = Number(amountInput.value);
  const desc = descInput.value;
  const category = document.getElementById('categoryInput').value; // get category

  const result = BudgetTracker.addExpense(amount, desc, category);

  console.log(result);
  updateUI();

  amountInput.value = '';
  descInput.value = '';
}
