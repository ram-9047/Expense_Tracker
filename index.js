let myForm = document.querySelector("#my-form");
let amountInput = document.querySelector("#amount");
let descriptionInput = document.querySelector("#description");
let categoryInput = document.querySelector("#category");
let expenseList = document.querySelector("#expenses");

let url = "https://crudcrud.com/api/cac447c4e99a4cdebc678fa4bdf04d81";

window.addEventListener("DOMContentLoaded", () => displayDetails());
myForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
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

    axios
      .post(`${url}/expenseTracker`, expenseDetails)
      .then(function sucess(msg) {
        console.log(msg);
        displayDetails();
      })
      .catch(function failure(msg) {
        console.log(msg);
      });

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
  console.log("calleing display details");
  // displayDetails();
}

// ------------ Handle delete Items
function deleteFunction(id) {
  console.log(id);
  axios
    .delete(`${url}/expenseTracker/${id}`)
    .then(function sucess(msg) {
      console.log(msg);
      displayDetails();
    })
    .catch(function failure(msg) {
      console.log(msg);
    });
}
