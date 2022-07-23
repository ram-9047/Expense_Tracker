let myForm = document.querySelector("#my-form");
let amountInput = document.querySelector("#amount");
let descriptionInput = document.querySelector("#description");
let categoryInput = document.querySelector("#category");
let expenseList = document.querySelector("#expenses");

let expenseArr = [];

let url = "https://crudcrud.com/api/cac447c4e99a4cdebc678fa4bdf04d81";

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
      })
      .catch(function failure(msg) {
        console.log(msg);
      });

    displayDetails();

    amountInput.value = "";
    descriptionInput.value = "";
    categoryInput.value = "";
  }
}

window.addEventListener("load", displayDetails);

async function displayDetails() {
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

        deleteBtn.addEventListener("click", () => deleteFunction(element));
        editBtn.addEventListener("click", () => editFunction(element));

        expenseList.appendChild(li);
      })
    : "Loading";
}

// Handle edit items
function editFunction(item) {
  // let toEdit = expenseArr.filter((element) => element.id == id);

  let newAmount = item.amount;
  let newDescription = item.description;
  let newCategory = item.category;

  let newArr = expenseArr.filter((element) => element.id != id);

  localStorage.setItem("allExpenses", JSON.stringify(newArr));
  displayDetails();

  amountInput.value = newAmount;
  descriptionInput.value = newDescription;
  categoryInput.value = newCategory;
}

// ------------ Handle delete Items
function deleteFunction(item) {
  axios
    .delete(`${url}/expenseTracker/${item._id}`)
    .then(function sucess(msg) {
      console.log(msg);
      displayDetails();
    })
    .catch(function failure(msg) {
      console.log(msg);
    });
}
