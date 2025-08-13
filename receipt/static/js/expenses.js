// get expenses from django
const django_expenses = JSON.parse(document.getElementById('expenses_js').textContent);
console.log(django_expenses);

// parse the info to match the table row ids
const Expenses = {};
let counter = 0;
for (let key in django_expenses) {
  const item = django_expenses[key];
  Expenses[`${item.id}`] = {'name': item.name, 'quantity': item.quantity, 'unit': item.unit, 'cost': item.cost};
  counter += 1;
}

// add event listener for edit and delete options
var expense_option = document.querySelectorAll('.expenses_list .detail-options p');
var expense_details = document.querySelector('.expenses_details');
var expense_edit_block = document.querySelector('.edit_expenditure');
var expense_delete_block = document.querySelector('.delete-expenditure');
var addNewExpense = document.querySelector('.add-new-expense');
expense_option.forEach((option) => {
  var action = option.dataset.action;
  option.addEventListener('click', (e) => {
    const parent = option.parentElement.parentElement.dataset;
    var expense = Expenses[parent.expenseId];
    // remove details options
    expense_details.style.display = 'block';
    activeDetail();
    if (action == 'edit') {
      // set delete block to display none and show edit block
      expense_edit_block.style.display = 'block';
      expense_delete_block.style.display = 'none';
      addNewExpense.style.display = 'none';

      // set the values to be same as the expense's details
      expense_edit_block.querySelector('[name="name"]').value = expense.name;
      expense_edit_block.querySelector('[name="quantity"]').value = expense.quantity;
      expense_edit_block.querySelector('[name="unit"]').value = expense.unit;
      expense_edit_block.querySelector('[name="cost"]').value = expense.cost;
      expense_edit_block.querySelector('[name="id"]').value = parent.expenseId;
    }else{
      // set edit block to display none and show delete block
      expense_edit_block.style.display = 'none';
      addNewExpense.style.display = 'none';
      expense_delete_block.style.display = 'block';
      expense_delete_block.querySelector('[name="id"]').value = parent.expenseId;

      // set the delete to display a query
      expense_delete_block.querySelector('h3').innerHTML = `Are you sure you want to delete ${expense.name} from the database?`;
      // add event listener to record the answer
      var answerBtn = expense_delete_block.querySelectorAll('button');
      answerBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          if (btn.dataset.action == 'yes') {
            document.querySelector(`#expense-${parent.expenseId}`).remove();
          } else {}
          expense_details.style.display = 'none';
        });
    })
    }
    e.stopPropagation();
  })
});

// add event listener to close he expense details block
var expenseCloseBtn = expense_details.querySelector('.close')
expenseCloseBtn.addEventListener('click', ()=>{
  expense_details.style.display = 'none'
}) 

// event listener for displaying form to add new product
const newExpenditure = document.querySelector('.add-expense-main')
newExpenditure.addEventListener( 'click',()=>{
  expense_edit_block.style.display = 'none'
  expense_delete_block.style.display = 'none'
  expense_details.style.display = 'block'
  addNewExpense.style.display ='block'
})

const checkExpenseParams = (name, quantity, unit, cost, e)=>{
  if (name == '' || quantity == "" || unit == "" || cost == ""){
    tjtAlert("Empty input detected, ensure to fill all inputs", adminContainer)
    e.preventDefault();
  }
}

var submitBtns = expense_details.querySelectorAll('input')
submitBtns.forEach((btn)=>{
  if (btn.type == "submit"){
    var action = btn.dataset.type
    btn.addEventListener('click', (e)=>{
      if (action == 'edit'){
        var name = expense_edit_block.querySelector('[name="name"]').value
        var quantity = expense_edit_block.querySelector('[name="quantity"]').value
        var unit = expense_edit_block.querySelector('[name="unit"]').value
        var cost = expense_edit_block.querySelector('[name="cost"]').value
      }else{
        var name = addNewExpense.querySelector('[name="name"]').value
        var quantity = addNewExpense.querySelector('[name="quantity"]').value
        var unit = addNewExpense.querySelector('[name="unit"]').value
        var cost = addNewExpense.querySelector('[name="cost"]').value
      }
      checkExpenseParams(name, quantity, unit, cost, e)
    })
  }
})

      