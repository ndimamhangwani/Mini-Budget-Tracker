// lesson4.js — Budget Tracker Homework
// Fill in every TODO below, then open index.html in Chrome (F12 -> Console)
// TODO 1: Create a ValidationError class that extends Error.
// It should set this.name to 'ValidationError'.

class ValidationError extends Error {
  constructor(message) {
    super(message); // Call parent Error constructor
    this.name = 'ValidationError'; // Set custom error name
  }
}

const BudgetTracker = (() => {
 // TODO 2: Declare a private transactions array.
 // Nothing outside this module should be able to access it directly.
 const transactions = []; // Private storage for all transactions

 // TODO 3: Write a private validate() function.
 // It receives (amount, description).
 // Throw a ValidationError if:
 // - amount is not a number, OR amount is 0 or negative
 // - description is missing or an empty string
 const validate = (amount, description) => {

  // Check if amount is invalid
  if (typeof amount !== 'number' || amount <= 0) {
    throw new ValidationError('Amount must be a positive number');
  }

  // Check if description is empty or missing
  if (!description || description.trim() === '') {
    throw new ValidationError('Description is required');
  }
 };

 return {
 // TODO 4: addIncome(amount, description)
 // Call validate() first.
 // If valid: push { type: 'income', amount, description } to transactions.
 // Return a success string: 'Income added: R{amount} ({description})'
 // If invalid: catch the error and return 'Error: {error.message}'
 addIncome(amount, description) {
  try {
    validate(amount, description); // Validate input

    // Add income transaction
    transactions.push({ type: 'income', amount, description });

    return `Income added: R${amount} (${description})`;
  } catch (error) {
    return `Error: ${error.message}`; // Handle validation error
  }
 },

 // TODO 5: addExpense(amount, description)
 // Same pattern as addIncome but type is 'expense'.
 // Return: 'Expense added: R{amount} ({description})'
 addExpense(amount, description) {
  try {
    validate(amount, description); // Validate input

    // Add expense transaction
    transactions.push({ type: 'expense', amount, description });

    return `Expense added: R${amount} (${description})`;
  } catch (error) {
    return `Error: ${error.message}`; // Handle error
  }
 },

 // TODO 6: getBalance()
 // Return the current balance: total income minus total expenses.
 // Hint: use .filter() and .reduce()
 getBalance() {

  // Calculate total income
  const totalIncome = transactions
    .filter(t => t.type === 'income') // Only income
    .reduce((sum, t) => sum + t.amount, 0); // Sum amounts

  // Calculate total expenses
  const totalExpenses = transactions
    .filter(t => t.type === 'expense') // Only expenses
    .reduce((sum, t) => sum + t.amount, 0);

  return totalIncome - totalExpenses; // Return balance
 },

 // TODO 7: getSummary()
 // Return an object with this exact shape:
 // { totalIncome, totalExpenses, balance, count }
 // count = total number of transactions
 getSummary() {

  // Reuse same logic to calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome, // Total income amount
    totalExpenses, // Total expenses amount
    balance: totalIncome - totalExpenses, // Net balance
    count: transactions.length // Number of valid transactions
  };
 },

 // TODO 8: getTransactions()
 // Return a COPY of the transactions array — not the original.
 // Hint: use the spread operator [...array]
 getTransactions() {
  return [...transactions]; // Return a shallow copy (protects original array)
 }
 };
})();

// ── TEST YOUR TRACKER BELOW ──────────────────────────────
// These lines run automatically when you open index.html in Chrome.
// Open F12 -> Console tab to see the output.
console.log(BudgetTracker.addIncome(5000, 'Monthly salary'));
console.log(BudgetTracker.addIncome(1200, 'Freelance work'));
console.log(BudgetTracker.addExpense(1500, 'Rent'));
console.log(BudgetTracker.addExpense(800, 'Groceries'));
console.log(BudgetTracker.addExpense(300, 'Transport'));
console.log(BudgetTracker.addIncome(-100, 'Bad income'));
console.log(BudgetTracker.addExpense(0, ''));
console.log('Balance: R' + BudgetTracker.getBalance());
console.log(BudgetTracker.getSummary());
console.table(BudgetTracker.getTransactions());
