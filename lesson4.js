// lesson4.js — Budget Tracker Homework with Bonus

// TODO 1: ValidationError class
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

const BudgetTracker = (() => {
  // TODO 2: private transactions array
  const transactions = [];

  // Private savings goal variable
  let savingsGoal = 0;

  // TODO 3: private validate function
  const validate = (amount, description) => {
    if (typeof amount !== 'number' || amount <= 0)
      throw new ValidationError('Amount must be a positive number');
    if (!description || description.trim() === '')
      throw new ValidationError('Description cannot be empty');
  };

  return {
    // TODO 4: addIncome with category (Bonus 1)
    addIncome(amount, description, category = 'uncategorized') {
      try {
        validate(amount, description);

        // Push transaction with category
        transactions.push({ type: 'income', amount, description, category });

        return `Income added: R${amount} (${description})`;
      } catch (error) {
        return `Error: ${error.message}`;
      }
    },

    // TODO 5: addExpense with category (Bonus 1)
    addExpense(amount, description, category = 'uncategorized') {
      try {
        validate(amount, description);

        transactions.push({ type: 'expense', amount, description, category });

        return `Expense added: R${amount} (${description})`;
      } catch (error) {
        return `Error: ${error.message}`;
      }
    },

    // TODO 6: getBalance
    getBalance() {
      return transactions.reduce(
        (total, t) => (t.type === 'income' ? total + t.amount : total - t.amount),
        0
      );
    },

    // TODO 7: getSummary
    getSummary() {
      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        totalIncome,
        totalExpenses,
        balance: totalIncome - totalExpenses,
        count: transactions.length
      };
    },

    // TODO 8: getTransactions
    getTransactions() {
      return [...transactions]; // return copy
    },

    // Bonus 1: getReportByCategory
    getReportByCategory() {
      const report = {};
      transactions.forEach(t => {
        if (!report[t.category]) report[t.category] = 0;
        report[t.category] += t.amount;
      });
      return report;
    },

    // Bonus 2: setSavingsGoal
    setSavingsGoal(amount) {
      if (typeof amount !== 'number' || amount <= 0)
        throw new ValidationError('Goal must be a positive number');
      savingsGoal = amount;
      return `Savings goal set: R${amount}`;
    },

    // Bonus 2: checkGoal
    checkGoal() {
      const balance = this.getBalance();
      if (balance >= savingsGoal) {
        return `Goal reached! You have R${balance}, goal was R${savingsGoal}.`;
      } else {
        const remaining = savingsGoal - balance;
        return `R${remaining} to go. Balance: R${balance}, Goal: R${savingsGoal}.`;
      }
    }
  };
})();