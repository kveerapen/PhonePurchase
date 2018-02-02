import CustomersJson from "./Customers.json";
import CustomersCSV from "./Customers.txt";
import {
  generateCustomerDetailsTable,
  generatePhoneDetailsTable,
  generateNumberOfPhonesTable
} from "./Tables.js";

const taxRate = 0.2;
const phone = 120;
const accessory = 10;

let phoneIncTax;
let accessoryIncTax;
let PriceOfPurchase;

// The price of each full purchase including tax i.e. phone and accessory.
const CalculatePriceOfPurchase = () => {
  phoneIncTax = phone + phone * taxRate;
  accessoryIncTax = accessory + accessory * taxRate;
  return (PriceOfPurchase = phoneIncTax + accessoryIncTax);
};
CalculatePriceOfPurchase();

//Promise gets text file and checks for response. It passes the text in text file to handleInitalText()
fetch(CustomersCSV).then(function(response) {
  //console.log(response);
  if (response.ok) {
    return response.text().then(handleInitialText);
  } else {
    throw new Error(`Response not OK`);
  }
});

//prints the text into the textarea in HTML.
//handleText performs all the calculations.
const handleInitialText = text => {
  document.getElementById("data").value = text;
  handleText(text);
};

//passes through text file, maps it to an array, generates 3 tables.
const handleText = text => {
  //console.log(text);
  let users = splitArray(text);
  //console.log(users);
  generateCustomerDetailsTable(users);
  users = processBankBalance(users);
  //console.log(users);
  generatePhoneDetailsTable(phone, accessory);
  generateNumberOfPhonesTable(users);
};

//calculates number of phones the user can buy and how much it will cost
//maps the existing array and adds 2 new columns for number of phones and cost.
const processBankBalance = users => {
  return users.map(users => {
    let balance = users.balance;
    let name = users.name;
    let numberOfPhones = 0;
    let cost = 0;
    if (balance < PriceOfPurchase) {
      //console.log(`Hi ${name}, you have insufficient funds.`);
    } else {
      numberOfPhones = Math.floor(balance / PriceOfPurchase);
      cost = numberOfPhones * PriceOfPurchase;
      balance -= cost;
      // Print number of phones bought.
      //console.log(
      //`Hi ${name}, you have bought ${numberOfPhones} phones with accessories.`
      //);
      // Print amount spent.
      //console.log(`You have spent £${cost} altogether.`);
    }
    const newUsers = { ...users, numberOfPhones, cost };
    return newUsers;
  });
};

//Maps the text string to an array with tags Name and Balance.
function splitArray(text) {
  const arr = text.split("\n").slice(1);
  const mapped = arr.map(row => {
    const parts = row.split(", ");
    return {
      name: parts[0],
      balance: parts[1]
    };
  });
  return mapped;
}

//On clicking the submit button, calls function WriteText
//WriteText takes the updated version of the text area...
//...and reperforms handling that text and edits the existing tables
document.getElementById("Submit").onclick = WriteText;
function WriteText() {
  let data = document.getElementById("data").value;
  if (!data.length) {
    console.log("Please type");
  } else {
    handleText(data);
  }
}

// Mapping an array with a Recursive function
/*
  const next = (rows, result) => {
    if (!rows.length) return result;

    const parts = rows[0].split(", ");
    result.push({
      name: parts[0],
      balance: parts[1]
    });
    return next(rows.slice(1), result);
  };
  const mapped = next(arr, []);
  */

//Mapping an array with a For Each statement
/*
  const mapped = {};
  arr.forEach(row => {
    const parts = row.split(", ");
    mapped[parts[0]] = parts[1];
  });*?

  //Mapping an array using array.reduce
  /*
  const total = arr.reduce((sum, row) => {
    const parts = row.split(", ");
    return sum + parseFloat(parts[1]);
  }, 0); */
//console.log(mapped);

//Mapping an array using a 'For Of' loop
/*for (const row of arr) {
    const parts = row.split(", ");
    mapped.push({
      name: parts[0],
      balance: parts[1]
    });
  }*/
