var salesCirc = document.getElementById("sales")
var incomeCirc = document.getElementById("income")
var expensesCirc = document.getElementById("expenses")
var salesNum = document.querySelector(".sales .number")
var incomeNum = document.querySelector(".income .number")
var expensesNum = document.querySelector(".expenses .number")
// calculate percentage increase from previous 24hours

// fill orders in table

// change circle according to percentage
let sales_percentage = 81;
let income_percentage = 44;
let expenses_percentage = 62;
let circumference = 226.19;

insightVisual(sales_percentage, salesCirc, salesNum)
insightVisual(income_percentage, incomeCirc, incomeNum)
insightVisual(expenses_percentage, expensesCirc, expensesNum)

function insightVisual(percentage, insight, number){
  // animate percentage
  let counter = 0;
  let interval = 1000/percentage;
  setInterval(() => {
  if(counter == percentage){
    clearInterval()
  }else{
    counter += 1;
    number.innerHTML = counter + "%"
  }
  }, interval)

  // animate circle
  let stroke_dashoffset = circumference - (percentage/100) * circumference;
  insight.animate(
    [
      {strokeDashoffset : circumference }, {strokeDashoffset:stroke_dashoffset}
    ],
      {duration: 1000,
        easing: 'linear',
        fill: "forwards"
      }
  )

}
