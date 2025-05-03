//image section
//#region
let img = document.getElementById("divImg");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("previous");
let slideshowBtn = document.getElementById("slideshow");
let stopBtn = document.getElementById("stop_slideshow");

let myImages = [
  "ali maloul.jpg",
  "doaa.jpg",
  "exodia.jpg",
  "fingerprint palastine.jpg",
  "the piramids.jpg",
  "whale.jpg",
];
function showImage(i) {
  img.src = `./assets/${myImages[i]}`;
  img.style.width = "auto";
  img.style.height = "400px";
  // console.log("img src", img.src);
  // console.log("i", i);
}
let i = 0;

//default image
img.src = `./assets/${myImages[i]}`;
img.style.width = "auto";
img.style.height = "400px";

nextBtn.onclick = () => {
  i = (i + 1) % myImages.length;
  showImage(i);
};
prevBtn.onclick = () => {
  i = (i - 1 + myImages.length) % myImages.length;
  showImage(i);
};
slideshowBtn.onclick = () => {
  let intervalle = setInterval(() => {
    i = (i + 1) % myImages.length;
    showImage(i);
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
    slideshowBtn.disabled = true;
    // console.log("intervalle", intervalle);
  }, 0.5 * 1000);
  stopBtn.onclick = () => {
    clearInterval(intervalle);
    nextBtn.style.display = "inline";
    prevBtn.style.display = "inline";
    slideshowBtn.disabled = false;
    // return;
  };
};
//#endregion

//form section getting values
//#region
let myform = document.getElementById("myform");

let addBtn = document.getElementsByTagName("button")[4];
let formInput = Array.from(document.getElementsByClassName("form-text"));

let myTable = document.getElementsByTagName("table")[0];

function getRadioValue() {
  let radioValue = document.querySelector('input[type="radio"]:checked');

  // console.log("Selected radio value:", radioValue.value);
  return radioValue.value;
}
let rows = Array.from(myTable.tBodies[0].children);
//#endregion

//coloring the table
//#region
function colorTable() {
  rows.forEach((row) => {
    let grade = parseInt(row.cells[1].textContent);
    if (grade < 50) row.style.backgroundColor = "red";
    else if (grade >= 50 && grade < 75) row.style.backgroundColor = "yellow";
    else if (grade >= 75 && grade <= 100) row.style.backgroundColor = "green";
    else row.style.backgroundColor = "black";
  });
}
//#endregion


//create a new row in the table
//#region
function createRows(myInput) {
  let tr = document.createElement("tr");

  let delBtn = document.createElement("span");
  delBtn.className = "material-symbols-outlined delete";
  delBtn.style.cursor = "pointer";
  delBtn.textContent = "delete";

  myInput[0].value =
    myInput[0].value[0].toUpperCase() + myInput[0].value.slice(1);
  for (let i = 0; i < myInput.length; i++) {
    let td = document.createElement("td");
    td.innerText = myInput[i].value;
    tr.appendChild(td);
  }
  let radioValue = document.querySelector('input[type="radio"]:checked');
  let td3 = document.createElement("td");
  td3.innerText = radioValue.value;
  tr.appendChild(td3);

  let td4 = document.createElement("td");
  td4.appendChild(delBtn);
  tr.appendChild(td4);

  let grade = parseInt(myInput[1].value);
  if (grade < 50) tr.style.backgroundColor = "red";
  else if (grade >= 50 && grade < 75) tr.style.backgroundColor = "yellow";
  else if (grade >= 75 && grade <= 100) tr.style.backgroundColor = "green";
  else tr.style.backgroundColor = "black";

  myTable.tBodies[0].appendChild(tr);
  delBtn.onclick = () => {
    delBtn.parentNode.parentNode.remove();
  };
  rows = Array.from(myTable.tBodies[0].children);


  
}
//#endregion

function errorMessage(element, message) {
  element.nextElementSibling.style.display = "inline";
  element.nextElementSibling.innerText = message;
  element.nextElementSibling.style.color = "red";

  setTimeout(() => {
    element.nextElementSibling.style.display = "none";
  }, 1500);

  return;
}


colorTable();


addBtn.onclick = () => {
  //check if the input values are empty or not
  //#region

  if (formInput[0].value.trim() == "") {
    errorMessage(formInput[0], " this field must be filled with your name");

    return;
  }
  if (
    formInput[1].value.trim() == "" ||
    formInput[0].value == "  " ||
    formInput[1].value < 0 ||
    formInput[1].value > 100
  ) {

    errorMessage(
      formInput[1],
      " this field must be filled with value bettween 0 and 100"
    );
    return;
  } else if (isNaN(formInput[1].value)) {
   
    errorMessage(formInput[1], " this field must be a number");
    return;
  }
  //#endregion

  //check if the input values are already in the table
  //#region
  
  // let inputName = formInput[0].value.trim();
  // // inputName =inputName[0].toUpperCase() + inputName.slice(1).toLowerCase();
  // formInput[0].value = inputName;
  
  
  // Collect existing student names
  let tr_values = Array.from(myTable.tBodies[0].children);
  let exestingValues = [];
  exestingValues = tr_values.map((tr) =>
    tr.cells[0].textContent.trim().toLowerCase()
  );
  // tr_values.forEach((tr) => {
  //   exestingValues.push(tr.cells[0].textContent);
  //   // console.log("tr.cells[0].textContent", tr.cells[0].textContent);
  //   // console.log("exectingValues", exestingValues);
  // });
  // console.log("tr", tr_values);

  for (let i = 0; i < exestingValues.length; i++) {

    if (exestingValues[i]== formInput[0].value.trim().toLowerCase()) {
      errorMessage(formInput[0]," this name already exists")
      return;
    }
  }

  //#endregion

  createRows(formInput);

  myform.reset();
  formInput[0].focus();
  rows = Array.from(myTable.tBodies[0].children);

};

let sort_dropDown = document.getElementById("sorting");
let filter_dropDown = document.getElementById("filtering");



//sort and filter section
//#region
sort_dropDown.onchange = (e) => {
  console.log("Selected sort option:", e.target.value);

  let sortColumn;

  switch (e.target.value) {
    case "name":
      sortColumn = 0;
      break;
    case "grade":
      sortColumn = 1;
      break;
  }

  rows.sort((a, b) => {
    let aVal = a.cells[sortColumn].textContent;
    let bVal = b.cells[sortColumn].textContent;

    if (sortColumn === 1) {
      //grade column
      return Number(aVal) - Number(bVal);
    }
    //name column
    return aVal.localeCompare(bVal);
  });

  rows.forEach((row) => myTable.tBodies[0].appendChild(row));
};

filter_dropDown.onchange = (e) => {
  console.log("Selected filter option:", e.target.value);

  rows.forEach((row) => {
    let grade = parseInt(row.cells[1].textContent);

    if (e.target.value === "all") {
      row.style.display = "";
    } 
    else if (e.target.value === "success") {
      if (grade >= 50) {
        row.style.display = "";
      }
       else {
        row.style.display = "none";
      }
    }
     else if (e.target.value === "failed") {
      if (grade < 50) {
        row.style.display = "";
      }
       else {
        row.style.display = "none";
      }
    }
  });
};
//#endregion
