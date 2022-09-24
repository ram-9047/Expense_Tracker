let myForm = document.querySelector("#my-form");
let amountInput = document.querySelector("#amount");
let descriptionInput = document.querySelector("#description");
let categoryInput = document.querySelector("#category");
let expenseList = document.querySelector("#expenses");

let url = "https://crudcrud.com/api/93954ca845884e9598910097bceef5c2";

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
      await axios.post(`${url}/expenseTracker`, expenseDetails);
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
  let response = await axios.get(`${url}/expenseTracker`);
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

        deleteBtn.addEventListener("click", () => deleteFunction(element._id));

        editBtn.addEventListener("click", () => editFunction(element));

        expenseList.appendChild(li);
      })
    : "Loading";
}

// Handle edit items
function editFunction(item) {
  // console.log(item);
  let tempItem = item;
  amountInput.value = tempItem.amount;
  descriptionInput.value = tempItem.description;
  categoryInput.value = tempItem.category;
  deleteFunction(item._id);
  // console.log("calleing display details");
  // displayDetails();
}

// ------------ Handle delete Items
async function deleteFunction(id) {
  console.log(id);
  try {
    await axios.delete(`${url}/expenseTracker/${id}`);
    await displayDetails();
  } catch (error) {
    console.log(error);
  }
}
