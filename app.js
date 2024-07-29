const budget = document.getElementById('budget')
const productName = document.getElementById('product-name')
const amountSpent = document.getElementById('amount')
const dateInput = document.getElementById('date')
const addExpenseButton = document.getElementById('add-btn')
const totalIncome = document.getElementById('total-income')
const totalExpenses = document.getElementById('total-Expenses')
const balance = document.getElementById('balance')
const expenseHistory = document.getElementById('expense-history')
const updateExpenseButton = document.getElementById('updateExpense') 
const deleteModal = document.getElementById('deleteModal');
const confirmDeleteButton = document.getElementById('confirmDelete');
const cancelDeleteButton = document.getElementById('cancelDelete');


const expenseLocalStorage = JSON.parse(localStorage.getItem('expenses'))
let expenses = expenseLocalStorage || []

const numberLocalStorage = Number(localStorage.getItem('income'))
let income = numberLocalStorage || 0;

let editingExpenseId = null;

const updateBudget = () => {
    const totalExpensesValue = expenses.reduce((accumulator, expense) => accumulator + expense.amount, 0)

    totalExpenses.textContent = `$${totalExpensesValue}`

    const balanceValue = income - totalExpensesValue
    balance.textContent = `$${balanceValue}`
}


const updateExpenseHistory = () => {
  expenseHistory.innerHTML = ''
  expenses.forEach(expense => {
      const expenseRow = expenseHistory.insertRow()
      const descriptionCell = expenseRow.insertCell()
      const amountCell = expenseRow.insertCell()
      const dateCell = expenseRow.insertCell()
      const modifyCell = expenseRow.insertCell()

      descriptionCell.textContent = expense.description
      amountCell.textContent = `$${expense.amount}`
      dateCell.textContent = expense.date;

      
      modifyCell.innerHTML = `
      <button class="edit-btn" data-id="${expense.id}">edit</button>
      <button class="delete-btn" data-id="${expense.id}">delete</button>
      `
  })
}


const addExpense = (description, amount, date) => {
    const newExpense = {
        id: Date.now(), 
        description: description,
        amount: amount, 
        date: date 
    };
    expenses.push(newExpense)
    localStorage.setItem('expenses', JSON.stringify(expenses))
    updateExpenseHistory()
    updateBudget()
}; 


const deleteExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== id)
  localStorage.setItem('expenses', JSON.stringify(expenses))
  updateExpenseHistory();
  updateBudget();
};


const editExpense = (id) => {
  const expense = expenses.find(exp => exp.id === id);
  if (expense) {
      productName.value = expense.description;
      amountSpent.value = expense.amount;
      dateInput.value = expense.date;
      editingExpenseId = id; 
      addExpenseButton.classList.add('hidden')
      updateExpenseButton.classList.remove('hidden')
    
  }
};


addExpenseButton.addEventListener('click', (e) => {
  e.preventDefault();
  const description = productName.value;
  const amount = Number(amountSpent.value);
  const date = dateInput.value;

  if (description && amount && date) {
    addExpense(description, amount, date);
    productName.value = '';
    amountSpent.value = '';
    dateInput.value = '';
    alert('Expense added successfully!');

  } else {

    alert('Please fill in all required fields.'); 

  }
});

let expenseIdToDelete = null

const showModal = (id) => {
  expenseIdToDelete = id;
  deleteModal.classList.remove('hidden');
}


const hideModal = () => {
  deleteModal.classList.add('hidden');
  expenseIdToDelete = null;
}


confirmDeleteButton.addEventListener('click', () => {
  if (expenseIdToDelete !== null) {
    deleteExpense(expenseIdToDelete);
    hideModal();
  }
});

cancelDeleteButton.addEventListener('click', hideModal);

updateExpenseButton.addEventListener('click', (e) => {
  e.preventDefault();
  const description = productName.value;
  const amount = Number(amountSpent.value);
  const date = dateInput.value;

  if (description && amount && date) {
    expenses = expenses.map(expense => {
      if (expense.id === editingExpenseId) {
        return { ...expense, description, amount, date };
      }
      return expense;
    });

    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateExpenseHistory();
    updateBudget();

    productName.value = '';
    amountSpent.value = '';
    dateInput.value = '';
    editingExpenseId = null;
    addExpenseButton.classList.remove('hidden');
    updateExpenseButton.classList.add('hidden');

    
    alert('Expense updated successfully!');
  }
});


expenseHistory.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = Number(e.target.dataset.id);
    showModal(id); 
  }

  if (e.target.classList.contains('edit-btn')) {
    const id = Number(e.target.dataset.id);
    editExpense(id);
  }
});


expenseHistory.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
      const id = Number(e.target.dataset.id);
      showModal(id);
  }

  if (e.target.classList.contains('edit-btn')) {
      const id = Number(e.target.dataset.id);
      editExpense(id);
  }
});


const updateIncome = () => {
  const newIncome = Number(budget.value);
  if (!isNaN(newIncome)) {
      income = newIncome;
      localStorage.setItem('income', income);
      totalIncome.textContent = `$${income}`;
      updateBudget();
  }
};

budget.addEventListener('change', updateIncome);


totalIncome.textContent = `$${income}`;
updateExpenseHistory();
updateBudget();


updateExpenseButton.addEventListener('click', (e) => {
  e.preventDefault();
  const description = productName.value;
  const amount = Number(amountSpent.value);
  const date = dateInput.value;

  if (description && amount && date) {
    expenses = expenses.map(expense => {
      if (expense.id === editingExpenseId) {
        return { ...expense, description, amount, date };
      }
      return expense;
    });

    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateExpenseHistory();
    updateBudget();

   
    productName.value = '';
    amountSpent.value = '';
    dateInput.value = '';
    editingExpenseId = null;
    addExpenseButton.classList.remove('hidden');
    updateExpenseButton.classList.add('hidden');
  }
});
 