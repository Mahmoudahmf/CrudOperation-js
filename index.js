var productName = document.getElementById("productName");

var productId = document.getElementById("productId");

var productPrice = document.getElementById("productPrice");

var productCtegory = document.getElementById("productCtegory");

var productDescription = document.getElementById("productDescription");

var mainBtn = document.getElementById("mainBtn");

var userNameAlert = document.getElementById("userNameAlert");

var productContainer;

if (localStorage.getItem("myProducts" == null)) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("myProducts"));
  displayProducts();
}

function countUp() {
  for (let i = 0; i < array.length; i++) {}
}

function addProduct() {
  var product = {
    id: Math.random(),
    name: productName.value,
    price: productPrice.value,
    category: productCtegory.value,
    Descr: productDescription.value,
  };

  productContainer.push(product);
  localStorage.setItem("myProducts", JSON.stringify(productContainer));
  clearForm();
  displayProducts();
}

function displayProducts() {
  var cartoona = "";
  for (let i = 0; i < productContainer.length; i++) {
    cartoona += `<tr>
        <td>${i + 1}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].Descr}</td>
        <td><button onclick="retrieveProduct(${i})" class="btn btn-outline-warning">Edit</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
    </tr>`;
    document.getElementById("tableBody").innerHTML = cartoona;
  }
}

function retrieveProduct(productIndex) {
  productId.value = productContainer[productIndex].id;
  productName.value = productContainer[productIndex].name;
  productPrice.value = productContainer[productIndex].price;
  productCtegory.value = productContainer[productIndex].category;
  productDescription.value = productContainer[productIndex].Descr;
  mainBtn.style.setProperty("display", "none");
  document.getElementById("editBtn").style.setProperty("display", "block");
}

function editProduct() {
  const product = productContainer.find((e) => e.id === +productId.value);
  product.name = productName.value;
  product.price = productPrice.value;
  product.Descr = productDescription.value;
  product.category = productCtegory.value;

  localStorage.setItem("myProducts", JSON.stringify(productContainer));
  productContainer = JSON.parse(localStorage.getItem("myProducts"));
  displayProducts();
  clearForm();
  document.getElementById("editBtn").style.setProperty("display", "none");
  document.getElementById("mainBtn").style.setProperty("display", "block");
}

function validateProductName() {
  var regex = /^[A-Z][a-z]{4,8}$/;
  if (regex.test(productName.value) == true) {
    console.log(productName.value);
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    userNameAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    userNameAlert.classList.replace("d-none", "d-block");
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    return false;
  }
}
productName.addEventListener("keyup", validateProductName);

function searchProduct(searchTerm) {
  var cartona = ``;
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true ||
      productContainer[i].category
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true ||
      productContainer[i].price
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true
    ) {
      cartona += `<tr>
        <td>${i + 1}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].Descr}</td>
        <td><button class="btn btn-outline-warning">Edit</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
        </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = cartona;
}
function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCtegory.value = "";
  productDescription.value = "";
}

function deleteProduct(productIndex) {
  productContainer.splice(productIndex, 1);
  localStorage.setItem("myProducts", JSON.stringify(productContainer));
  displayProducts();
}
