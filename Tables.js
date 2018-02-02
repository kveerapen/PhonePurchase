const CreateRow = users =>
  `<tr>
      <td>${users.name}</td>
      <td>${users.balance}</td>
  </tr>`;

const CreateDefaultRow = (phone, accessory) => `
  <tr>
    <td>£${phone}</td>
    <td>£${accessory}</td>
  </tr>
`;

const CreateHeaderCell = header => `<th>${header}</th>`;

const CreateHeaderRow = headers => `
  <tr>
    ${headers.map(CreateHeaderCell).join("")}
  </tr>
`;

const GenerateTable = rows => `
  <table>
    ${rows}
  </table>
`;

export function generateCustomerDetailsTable(users) {
  let listOfRows = users.map(CreateRow).join("");
  let headers = CreateHeaderRow(["Name", "Balance"]);
  let rows = headers + listOfRows;
  //console.log(rows);
  let table = GenerateTable(rows);
  document.getElementById("CustomerDetails").innerHTML = table;
}

export function generatePhoneDetailsTable(phone, accessory) {
  const headers = CreateHeaderRow(["Phone Price", "Accessory Price"]);
  let rows = CreateDefaultRow(phone, accessory);
  rows = headers + rows;
  //console.log(rows);
  let table = GenerateTable(rows);
  document.getElementById("PhonesandAccessories").innerHTML = table;
}

const CreateRowForCostAndNumberOfRows = users =>
  `<tr>
      <td>${users.name}</td>
      <td>${users.numberOfPhones}</td>
      <td>£${users.cost}</td>
  </tr>`;

export function generateNumberOfPhonesTable(users) {
  const headers = CreateHeaderRow(["Name", "Number of Phones", "Total Cost"]);
  let listOfRows = users.map(CreateRowForCostAndNumberOfRows).join("");
  let rows = headers + listOfRows;
  //console.log(rows);
  let table = GenerateTable(rows);
  document.getElementById("CostandNumberofPhones").innerHTML = table;
}
