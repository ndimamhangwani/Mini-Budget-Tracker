// lesson4.js — Budget Tracker Homework

// Create a custom error class that extends the built-in Error class
class ValidationError extends Error {
  constructor(message) {
    super(message); // Call parent constructor to set error message
    this.name = 'ValidationError'; // Set custom error name
  }
}

// Create a module using an IIFE (Immediately Invoked Function Expression)
const BudgetTracker = (() => {

  // Private array to store transactions (not accessible outside)
  const transactions = [];

  // Private validation function to check inputs
  const validate = (amount, description) => {

    // Check if amount is not a number OR less than or equal to 0
    if (typeof amount !== 'number' || amount <= 0) {
      throw new ValidationError('Amount must be a positive number'); // Throw custom error
    }

    // Check if description is missing or empty
    if (!description || description.trim() === '') {
      throw new ValidationError('Description is required'); // Throw custom error
    }
  };

  // Return public methods (accessible outside the module)
  return {

    // Function to add income
    addIncome(amount, description) {
      try {
        validate(amount, description); // Validate inputs first

        // Add valid transaction to the array
        transactions.push({ type: 'income', amount, description });

        // Return success message
        return `Income added: R${amount} (${description})`;

      } catch (error) {
        // Catch validation errors and return formatted message
        return `Error: ${error.message}`;
      }
    },

    // Function to add expense
    addExpense(amount, description) {
      try {
        validate(amount, description); // Validate inputs

        // Add expense transaction
        transactions.push({ type: 'expense', amount, description });

        // Return success message
        return `Expense added: R${amount} (${description})`;

      } catch (error) {
        // Handle errors
        return `Error: ${error.message}`;
      }
    },

    // Function to calculate balance
    getBalance() {

      // Get total income using filter + reduce
      const totalIncome = transactions
        .filter(t => t.type === 'income') // Only income transactions
        .reduce((sum, t) => sum + t.amount, 0); // Add amounts

      // Get total expenses
      const totalExpenses = transactions
        .filter(t => t.type === 'expense') // Only expenses
        .reduce((sum, t) => sum + t.amount, 0); // Add amounts

      // Return balance (income - expenses)
      return totalIncome - totalExpenses;
    },

    // Function to return summary object
    getSummary() {

      // Calculate total income
      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      // Calculate total expenses
      const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      // Return summary object
      return {
        totalIncome, // total income amount
        totalExpenses, // total expenses amount
        balance: totalIncome - totalExpenses, // calculated balance
        count: transactions.length // total number of transactions
      };
    },

    // Function to get transactions safely
    getTransactions() {
      return [...transactions]; // Return a copy using spread operator (protects original data)
    }
  };

})(); // Immediately invoke the function


// TESTING TRACKER 

// Add income transactions
console.log(BudgetTracker.addIncome(5000, 'Monthly salary'));
console.log(BudgetTracker.addIncome(1200, 'Freelance work'));

// Add expense transactions
console.log(BudgetTracker.addExpense(1500, 'Rent'));
console.log(BudgetTracker.addExpense(800, 'Groceries'));
console.log(BudgetTracker.addExpense(300, 'Transport'));

// Test invalid inputs
console.log(BudgetTracker.addIncome(-100, 'Bad income')); // Should show error
console.log(BudgetTracker.addExpense(0, '')); // Should show error

// Display balance
console.log('Balance: R' + BudgetTracker.getBalance());

// Display summary object
console.log(BudgetTracker.getSummary());

// Display transactions in table format
console.table(BudgetTracker.getTransactions());
