import React, { useEffect, useState } from "react";
import "./style.css";

const ExpenseManager = () => {
  let liremo = "";
  let pricees = 0;
  let categories = "";

  const [color, setColor] = useState("");
  const [Income, setIncome] = useState("0.00");
  const [Expense, setExpense] = useState("0.00");
  const [Balance, setBalance] = useState("0.00");

  const income = () => {
    let income = document.getElementById("expensAmt").value;
    let vals = Number(income) + Number(Income);
    setIncome(() => vals.toFixed(2));
    document.getElementById("expensAmt").value = "";
  };
  useEffect(() => {
    setBalance(() => (Income - Expense).toFixed(2));
  }, [Income, Expense]);

  const editable = (event) => {
    let x = event.target;


    if (x.parentNode.className === "edit") {
      let li = x.parentNode.parentNode.parentNode; 
      var name = li.children[1].children[0].innerHTML;
      var category = li.children[1].children[1].innerHTML;
      var date = li.children[1].children[3].children[0].innerHTML;
      var amount = li.children[2].children[1].innerHTML;

      document.getElementById("name").value = name;
      document.getElementById("date").value = date;
      document.getElementById("amount").value = amount;
      document.getElementById("category").value = category;

      categories = category;
      pricees = amount;
      liremo = li;
    }
    if (x.parentNode.className === "delete") {
      let li = x.parentNode.parentNode.parentNode;

      let category = li.children[1].children[1].innerHTML;
      let amount = li.children[2].children[1].innerHTML;

      if (category === "Grocery") {
        document.getElementById("grocery").innerHTML -= amount;
      } else if (category === "Veggies") {
        document.getElementById("veggi").innerHTML -= amount;
      } else if (category === "Travelling") {
        document.getElementById("travel").innerHTML -= amount;
      } else if (category === "Miscellaneous") {
        document.getElementById("misc").innerHTML -= amount;
      }
      setExpense(() => (Number(Expense) - amount).toFixed(2));
      li.remove();
    }
  };

  const add = () => {
    if (liremo !== "") {
      liremo.remove();
      liremo = "";
      console.log(pricees);
    }
    let color = "";
    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    if (date === "" && amount !== "" && category !== "") {
      alert("choose Date !!!!");
    } else if (date !== "" && amount === "" && category !== "") {
      alert("Amount field is empty.");
    } else if (name === "" && date !== "" && amount !== "" && category !== "") {
      alert("Name field is empty.");
    } else if (date === "" && amount === "" && category === "") {
      alert("All fields are empty. Fill all the fields first");
    } else if (category === "") {
      alert("category field is empty.");
    } else {
      /* ----------Categories color---------*/
      if (category === "Grocery") {
        color = "#6734BA";
        let add = document.getElementById("grocery").innerHTML;
        if (categories === "Grocery") {
          let val = Number(add) + Number(amount) - pricees;
          document.getElementById("grocery").innerHTML = val;
        } else {
          let val = Number(add) + Number(amount);
          document.getElementById("grocery").innerHTML = val;

          if (categories === "Veggies") {
            document.getElementById("veggi").innerHTML -= pricees;
          } else if (categories === "Travelling") {
            document.getElementById("travel").innerHTML -= pricees;
          } else if (categories === "Miscellaneous") {
            document.getElementById("misc").innerHTML -= pricees;
          }
        }
      } else if (category === "Veggies") {
        color = "#89C541";
        let add = document.getElementById("veggi").innerHTML;
        if (categories === "Veggies") {
          let val = Number(add) + Number(amount) - pricees;
          document.getElementById("veggi").innerHTML = val;
        } else {
          let val = Number(add) + Number(amount);
          document.getElementById("veggi").innerHTML = val;

          if (categories === "Grocery") {
            document.getElementById("grocery").innerHTML -= pricees;
          } else if (categories === "Travelling") {
            document.getElementById("travel").innerHTML -= pricees;
          } else if (categories === "Miscellaneous") {
            document.getElementById("misc").innerHTML -= pricees;
          }
        }
      } else if (category === "Travelling") {
        color = "#1194F6";
        let add = document.getElementById("travel").innerHTML;
        if (categories === "Travelling") {
          let val = Number(add) + Number(amount) - pricees;
          document.getElementById("travel").innerHTML = val;
        } else {
          let val = Number(add) + Number(amount);
          document.getElementById("travel").innerHTML = val;

          if (categories === "Veggies") {
            document.getElementById("veggi").innerHTML -= pricees;
          } else if (categories === "Grocery") {
            document.getElementById("grocery").innerHTML -= pricees;
          } else if (categories === "Miscellaneous") {
            document.getElementById("misc").innerHTML -= pricees;
          }
        }
      } else if (category === "Miscellaneous") {
        color = "#5F7D8C";
        let add = document.getElementById("misc").innerHTML;
        if (categories === "Miscellaneous") {
          let val = Number(add) + Number(amount) - pricees;
          document.getElementById("misc").innerHTML = val;
        } else {
          let val = Number(add) + Number(amount);
          document.getElementById("misc").innerHTML = val;

          if (categories === "Veggies") {
            document.getElementById("veggi").innerHTML -= pricees;
          } else if (categories === "Grocery") {
            document.getElementById("grocery").innerHTML -= pricees;
          } else if (categories === "Travelling") {
            document.getElementById("travel").innerHTML -= pricees;
          }
        }
      }

      /*--------Adding list---------*/
      let element = document.getElementById("center2");
      let list = document.createElement("li");
      list.innerHTML = `
        <div id='adjust'>
        <div class='delete' style = "cursor: pointer"><i class="fa-solid fa-trash-can"></i></div>
        <div class='edit' style = "cursor: pointer"><i class="fa-solid fa-pen-to-square"></i></div>
             </div>
             <div id='content' style= "border-color: ${color}">
        <span id='text'>${name}</span> <span id='categories' style= "color: ${color}">${category}</span> <br />
        <i><span id='date'>${date}</span></i>
            </div>
            <div id='Rs' ><span>₹</span><span id='price'>${amount}</span></div>
        `;
      element.append(list);

      let expense = Number(amount) + Number(Expense) - pricees;
      let balance = Income - expense;
      console.log(expense);

      setExpense(() => expense.toFixed(2));
      setBalance(() => balance.toFixed(2));

      document.getElementById("name").value = "";
      document.getElementById("date").value = "";
      document.getElementById("amount").value = "";
      document.getElementById("category").value = "";
    }
    pricees = 0;
    categories = "";
  };
  return (
    <div>
      <h1 id="heading">Expense Manager</h1>
      <div id="entry">
        <div id="incomeInpt">
          <h4>New entry</h4>
          <div>
            <span style={{ fontSize: "14px", marginLeft: "5px" }}>
              Add your income:{" "}
            </span>
            <input id="expensAmt" type="number" placeholder="Income" />
            <button onClick={income} style={{ cursor: "pointer" }}>
              Add
            </button>
          </div>
        </div>
        <hr />
        <div id="flexing">
          <div id="input">
            <button disabled>₹</button>
            <input id="amount" type="number" placeholder="Expense" />
          </div>
          <div>
            <input id="name" type="text" placeholder="Name" />
          </div>
          <div>
            <select name="Category" id="category" required>
              <option value="" selected disabled hidden>
                --Select Category--
              </option>
              <option value="Grocery">Grocery</option>
              <option value="Veggies">Veggies</option>
              <option value="Travelling">Travelling</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>
          <div>
            {" "}
            <input id="date" type="date" />{" "}
          </div>
        </div>
        <button onClick={add}>Save entry</button>
      </div>

      <div id="center">
        <div id="center1">
          <div id="calculation">
            <div id="income">
              <span>₹</span>
              <span>{Income}</span>
              <br /> Income
            </div>
            <div id="expense">
              <span>₹</span>
              <span>{Expense}</span>
              <br />
              Expense
            </div>
            <div id="balance">
              <span>₹</span>
              <span>{Balance}</span>
              <br />
              Balance
            </div>
          </div>
          <div id="chart">
            <h3>Expenses by Category</h3>
            <div id="catego">
              <p style={{ color: "#6734BA" }}>
                Grocery:{" "}
                <span class="shift">
                  <span>₹</span>
                  <span id="grocery">0</span>
                </span>
              </p>
              <p style={{ color: "#89C541" }}>
                Veggies:{" "}
                <span class="shift">
                  <span>₹</span>
                  <span id="veggi">0</span>
                </span>
              </p>
              <p style={{ color: "#1194F6" }}>
                Travelling:{" "}
                <span class="shift">
                  <span>₹</span>
                  <span id="travel">0</span>
                </span>
              </p>
              <p style={{ color: "#5F7D8C" }}>
                Miscellaneous:{" "}
                <span class="shift">
                  <span>₹</span>
                  <span id="misc">0</span>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div id="center2" onClick={editable}>
          <h4 id="history">Expense History</h4>
        </div>
      </div>
    </div>
  );
};

export default ExpenseManager;
