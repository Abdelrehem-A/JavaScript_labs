{
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
    img.src = `/assets/${myImages[i]}`;
    img.style.width = "400px";
    img.style.height = "400px";
    // console.log("img src", img.src);
    // console.log("i", i);
  }
  let i = 0;
  img.src = `/assets/${myImages[i]}`;
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
    };
  };
}

let myform = document.getElementById("myform");

let addBtn = document.getElementsByTagName("button")[4];
let myInput = Array.from(document.getElementsByClassName("form-text"));

let myTable = document.getElementsByTagName("table")[0];

function getRadioValue() {
  let radioValue = document.querySelector('input[type="radio"]:checked');

  // console.log("Selected radio value:", radioValue.value);
  return radioValue.value;
}




addBtn.onclick = () => {

  //check if the input values are empty or not
//#region 
    if(myInput[0].value=="" ){
      
    myInput[0].nextElementSibling.style.display = "inline";
    myInput[0].nextElementSibling.innerText = " this field must be filled with your name";
    myInput[0].nextElementSibling.style.color = "red";
    setTimeout(() => {
      myInput[0].nextElementSibling.style.display = "none";
    }
    , 1500);
    return;
    
  }
  else if(myInput[1].value=="" || myInput[1].value<0 || myInput[1].value>100){
    myInput[1].nextElementSibling.style.display = "inline";
    myInput[1].nextElementSibling.innerText = " this field must be filled with value bettween 0 and 100";
    myInput[1].nextElementSibling.style.color = "red";
    setTimeout(() => {
      myInput[1].nextElementSibling.style.display = "none";
    }
    , 1000);
    return;
    
  }
  //#endregion

  //check if the input values are already in the table
//#region 
let tr_values = Array.from(myTable.tBodies[0].children);
let exestingValues = [];

// Collect existing student names
tr_values.forEach((tr) => {
    exestingValues.push(tr.cells[0].textContent);
    console.log("tr.cells[0].textContent", tr.cells[0].textContent);
    console.log("exectingValues", exestingValues);
});
console.log("tr", tr_values);




for (let i = 0; i < exestingValues.length; i++) {
if (exestingValues[i] == myInput[0].value) {
myInput[0].nextElementSibling.style.display = "inline";
myInput[0].nextElementSibling.innerText = " this name already exists";
myInput[0].nextElementSibling.style.color = "red";


setTimeout(() => {
myInput[0].nextElementSibling.style.display = "none";
}, 1500);
return;
}
}

//#endregion


  
  //create a new row in the table
  //#region 
  let tr = document.createElement("tr");

  let delBtn = document.createElement("span");
  delBtn.className = "material-symbols-outlined delete";
  delBtn.style.cursor = "pointer";
  delBtn.textContent = "delete";

  myInput[0].value = myInput[0].value[0].toUpperCase() + myInput[0].value.slice(1);
    for (let i = 0; i<myInput.length; i++) {
      
      let td=document.createElement("td");
      td.innerText = myInput[i].value;
      tr.appendChild(td);
     
      
    }
    let radioValue = document.querySelector('input[type="radio"]:checked');
    let td3=document.createElement("td");
    td3.innerText = radioValue.value;
    tr.appendChild(td3);
    
    let td4=document.createElement("td");
    td4.appendChild(delBtn);
    tr.appendChild(td4);
    myTable.tBodies[0].appendChild(tr);
    delBtn.onclick = () => {
      delBtn.parentNode.parentNode.remove();
    };
  //#endregion



  };
























