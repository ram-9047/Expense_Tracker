let myForm = document.querySelector("#my-form");
let amountInput = document.querySelector("#amount");
let descriptionInput = document.querySelector("#description");
let categoryInput = document.querySelector("#category");
let expenseList = document.querySelector("#expenses");

// let url = "https://crudcrud.com/api/93954ca845884e9598910097bceef5c2";
let url = "http://localhost:3030";

myForm.addEventListener("submit", onSubmit);

window.addEventListener("DOMContentLoaded", () => displayDetails());

async function onSubmit(e) {
  e.preventDefault();

  if (
    amountInput.value == "" ||
    descriptionInput.value == "" ||
    categoryInput == ""
  ) {
    window.alert("please fill all the fields");
  } else {
    let expenseDetails = {
      amount: amountInput.value,
      description: descriptionInput.value,
      category: categoryInput.value,
    };

    try {
      await axios.post(`${url}/add-item`, expenseDetails);
      displayDetails();
    } catch (error) {
      console.log(error);
    }

    amountInput.value = "";
    descriptionInput.value = "";
    categoryInput.value = "";
  }
}

async function displayDetails() {
  console.log("handle dislay details");
  let response = await axios.get(`${url}`);
  let temp = await response.data;
  console.log(temp, "data from fetch");
  expenseList.innerHTML = "";

  temp
    ? temp.forEach((element) => {
        let li = document.createElement("li");
        li.className = "list";
        li.appendChild(
          document.createTextNode(
            `amount: ${element.amount}, description: ${element.description}, category: ${element.category}`
          )
        );
        li.setAttribute("id", element.id);

        let deleteBtn = document.createElement("button");
        let editBtn = document.createElement("button");

        deleteBtn.appendChild(document.createTextNode("Delete"));
        editBtn.appendChild(document.createTextNode("Edit"));

        li.appendChild(deleteBtn);
        li.appendChild(editBtn);

        deleteBtn.addEventListener("click", () => deleteFunction(element.id));
        editBtn.addEventListener("click", () => editFunction(element.id));

        expenseList.appendChild(li);
      })
    : "<h2>Loading</h1>";
}

// Handle edit items
async function editFunction(itemId) {
  // console.log(itemId);
  try {
    let editData = await axios.get(`${url}/edit-item/${itemId}`);
    let data = editData.data;
    console.log(data, "this data need to be updated");
    amountInput.value = data.amount;
    descriptionInput.value = data.description;
    categoryInput.value = data.category;
  } catch (error) {
    console.log(error, "error in sending edit request");
  }
}

// ------------ Handle delete Items
async function deleteFunction(itemId) {
  // console.log(itemId);
  try {
    await axios.post(`${url}/delete-item/${itemId}`);
    await displayDetails();
  } catch (error) {
    console.log(error);
  }
}
