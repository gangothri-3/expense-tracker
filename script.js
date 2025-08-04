// 📄 script.js
const form = document.getElementById("expense-form");
const tableBody = document.querySelector("#expense-table tbody");
const chartCanvas = document.getElementById("expense-chart");
let expenses = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  const expense = { title, amount, category, date };
  expenses.push(expense);
  updateTable();
  updateChart();
  form.reset();
});

function updateTable() {
  tableBody.innerHTML = "";
  expenses.forEach((exp) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${exp.title}</td>
      <td>${exp.amount}</td>
      <td>${exp.category}</td>
      <td>${exp.date}</td>
    `;
    tableBody.appendChild(row);
  });
}

function updateChart() {
  const categorySums = {};
  expenses.forEach(({ category, amount }) => {
    categorySums[category] = (categorySums[category] || 0) + amount;
  });

  const labels = Object.keys(categorySums);
  const data = Object.values(categorySums);

  if (window.expenseChart) window.expenseChart.destroy();

  window.expenseChart = new Chart(chartCanvas, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#9C27B0"]
      }]
    },
    options: {
      responsive: true
    }
  });
}
