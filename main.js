let itemProduct;
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let submit = document.getElementById("submit");
let category = document.getElementById("category");
let count = document.getElementById("count");
let tbody = document.getElementById("tbody");
let btnsearchTitle = document.getElementById("btnsearchTitle");

let mood = "create";
let temp;

let inputs = document.querySelectorAll(".input");

// change border when empty inputs

inputs.forEach((input) => {
  input.addEventListener("keyup", () => {
    if (input.value != "" ) {
      input.style.border = "none";
    } else {
      input.style.border = "1px solid tomato";
    }
    console.log(input);
  });
});


count.addEventListener("keyup",()=>{
  if (count.value>100) {
    count.style.border = "1px solid tomato";
  }else{
    count.style.border = "none";
  }
})

//get local storage And cheek Array 

if (localStorage.getItem("product") != null) {
  datapro = JSON.parse(localStorage.getItem("product"));
  displayProduct();
} else {
  datapro = [];
}

// total

function getTotal() {
  // +price.value => to Number      +price.value  ==  Number(price.value)

  if (price.value != "") {
    itemProduct = {
      tit: title.value,
      p: Number(price.value),
      ta: Number(taxes.value),
      ad: Number(ads.value),
      dis: Number(discount.value),
      ctgy: category.value,
    };
    let result = eval(
      ((itemProduct.p + itemProduct.ta + itemProduct.ad) * itemProduct.dis) /
        100
    );

    result = itemProduct.p + itemProduct.ta + itemProduct.ad - result;
    total.innerText = ` ${result} $`;
    total.style.backgroundColor = "#040";
    price.style.border = "none";
  } else {
    // price.style.border = "red solid 2px";
    total.style.backgroundColor = "tomato";
  }
}

// clean Data

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  category.value = "";
  count.value = "";
  total.innerHTML = "0$";
}

// Create Product

function newProduct() {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newpro.count <= 100
  ) {
    if (mood === "create") {
      if (newpro.count > 1) {
        for (let i = 1; i <= newpro.count; i++) {
          const element = newpro.count[i];
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[temp] = newpro;
      submit.innerHTML = `Create`;
      count.style.display = "block";
      getTotal();
    }
    clearData();
    
  } else {
    inputs.forEach((input) => {
      if (input.value != "") {
        input.style.border = "none";
      } else {
        input.style.border = "1px solid tomato";
      }
    });

   
  }

  // datapro.push(newpro);
  // console.log(datapro);
  localStorage.setItem("product", JSON.stringify(datapro));
}

// Main button

submit.addEventListener("click", () => {
  newProduct();
  displayProduct();
});


// show product 

function displayProduct() {
  let table = ``;

  datapro.forEach((item, index) => {
    table += `
    <tr>
      <td>${index + 1}</td>
      <td>${item.title}</td>
      <td>${item.price}</td>
      <td>${item.taxes}</td>
      <td>${item.ads}</td>
      <td>${item.discount}</td>
      <td>${total.innerHTML}</td>
      <td>${item.category}</td>
      <td><button onclick="UpdatePro(${index})" id="update">update</button></td>
      <td><button onclick="deleteitem(${index})" id="delete">delete</button></td>
    </tr>
  `;
  });

  tbody.innerHTML = table;
  let deleteAll = document.getElementById("deleteAll");
  if (datapro.length > 0) {
    deleteAll.innerHTML = `<button onclick="deleteAAll()">Delete All (${datapro.length})</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}

// Delete product

function deleteitem(index) {
  datapro.splice(index, 1);

  localStorage.product = JSON.stringify(datapro);

  displayProduct();

  console.log(index);
}

// Delete  ' All Productss ' // 

function deleteAAll() {
  localStorage.clear();
  datapro.splice(0);
  // localStorage.product = JSON.stringify(datapro);
  displayProduct();
}

// Updata Product

function UpdatePro(index) {
  title.value = datapro[index].title;
  price.value = datapro[index].price;
  taxes.value = datapro[index].taxes;
  ads.value = datapro[index].ads;
  discount.value = datapro[index].discount;
  count.style.display = "none";
  category.value = datapro[index].category;
  // console.log(index + 1);
  submit.innerText = "Update";
  getTotal();
  mood = "update";
  temp = index;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}


// Get  search  value  


let searchMod = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id == "searchTitle") {
    searchMod = "title";
  } else {
    searchMod = "category";
  }

  search.placeholder = "Search By " + searchMod;
  search.focus();
  console.log(searchMod);
  search.value = "";
  displayProduct();
}


// search


function searchData(value) {
  let table = "";
  datapro.forEach((item, index) => {
    if (searchMod == "title") {
      if (datapro[index].title.includes(value.toLowerCase())) {
        console.log(index);
        table += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.title}</td>
          <td>${item.price}</td>
          <td>${item.taxes}</td>
          <td>${item.ads}</td>
          <td>${item.discount}</td>
          <td>${total.innerHTML}</td>
          <td>${item.category}</td>
          <td><button onclick="UpdatePro(${index})" id="update">update</button></td>
          <td><button onclick="deleteitem(${index})" id="delete">delete</button></td>
        </tr>
      `;
      }

      tbody.innerHTML = table;
    } else {
      // datapro.forEach((item, index) => {
      if (datapro[index].category.includes(value.toLowerCase())) {
        console.log(index);
        table += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.title}</td>
          <td>${item.price}</td>
          <td>${item.taxes}</td>
          <td>${item.ads}</td>
          <td>${item.discount}</td>
          <td>${total.innerHTML}</td>
          <td>${item.category}</td>
          <td><button onclick="UpdatePro(${index})" id="update">update</button></td>
          <td><button onclick="deleteitem(${index})" id="delete">delete</button></td>
        </tr>
      `;
      }

      // });
    }
  });

  tbody.innerHTML = table;
}
