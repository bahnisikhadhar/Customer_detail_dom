const search = document.querySelector(".search");
const searchPaan = document.querySelector(".search_paan");
const sequenceSearch = document.querySelector(".sequence");
const errorPaan = document.querySelector(".error_paan");
const formInputDetail = document.querySelector(".input_detail");
const inputName = document.querySelector(".input_name");
const inputCity = document.querySelector(".input_city");
const inputPaan = document.querySelector(".input_paan");
const inputMail = document.querySelector(".input_mail");
const addButton = document.querySelector(".add_btn");
const errorInput = document.querySelector(".error_input");
const outputList = document.querySelector(".output_list");
const searchButton = document.querySelector(".search_btn");
const crossIcon = document.querySelector(".fa-xmark")

// inputDetailArr = JSON.parse(localStorage.getItem("details")) || [];
inputDetailArr=[];
let count = 0;
let listName, listMail, listPaan, listCity;
//--------------------------------------DISPLAY FROM LOCAL STORAGE EVEN AFTER REFRESHING--------------------------------

// inputDetailArr.map((ele)=>{
//    createListElement(ele);
// })

//----------------------------------------TO RESET INPUT AND ERROR FIELD---------------------------------

function reset()
{
   inputName.value = "";
   inputCity.value = "";
   inputPaan.value = "";
   inputMail.value = "";
   errorPaan.innerText = "";
   errorInput.innerText = "";
   
}
//-------------------------------CREATE LIST ELEMENT------------------------------------------------------------

function createListElement(inputDetailObj)
{
   const listEle = document.createElement("li");
   listEle.setAttribute("id",inputDetailObj.id);
   listEle.setAttribute("class","li_decoration");
   listEle.innerHTML = `<div class="output_decor">${inputDetailObj.name}</div>
                        <div class="output_decor">${inputDetailObj.city}</div>
                        <div class="output_decor">${inputDetailObj.paan}</div>
                        <div class="output_decor">${inputDetailObj.mail}</div>
                        <button class="edit_btn">edit</button>
                        <button class="delete_btn">delete</button>`;
   outputList.appendChild(listEle);
   
}

//--------------------------------ADD OBJECT-ARRAY & SHOW ERROR MESSAGE-------------------------------------- 

function addInput(event){
    event.preventDefault();
    if(event.target.value=="Save")
    {
       SaveUpdate(event,inputName.value,inputCity.value,inputMail.value,inputPaan.value);
    }else{
//---------------------------------ERROR MESSAGES-----------------------------------------------------------------

    if(inputName.value=="" && inputCity.value=="" && inputMail.value=="" && inputPaan.value=="")
    {
       errorInput.innerText="Enter your Detail";
       setTimeout(()=>errorInput.innerText="",2000);
    }
    else if(inputName.value=="")
    {
      errorInput.innerText="Enter your Name";
       setTimeout(()=>errorInput.innerText="",2000);
    }
    else if(inputCity.value=="")
    {
      errorInput.innerText="Enter your City";
      setTimeout(()=>errorInput.innerText="",2000);
    }
    else if(inputMail.value=="")
    {
      errorInput.innerText="Enter your Mail";
      setTimeout(()=>errorInput.innerText="",2000);
    }
    else if(!(inputMail.value.includes("@") && inputMail.value.includes(".")))
    {
      errorInput.innerText="Your Mail must include @ and .";
      setTimeout(()=>errorInput.innerText="",2000);
    }
    else if(inputPaan.value=="")
    {
      errorInput.innerText="Enter your PAAN";
      setTimeout(()=>errorInput.innerText="",2000);
    }
    else if(inputPaan.value.length<10)
    {
      errorInput.innerText="PAAN should be atleast of 10 characters";
      setTimeout(()=>errorInput.innerText="",2000);
    }

    else 
    {
       const inputDetailObj={
          name:inputName.value,
          city:inputCity.value,
          paan:inputPaan.value,
          mail:inputMail.value,
          id:count++,
       };
       inputDetailArr.push(inputDetailObj);

      //  localStorage.setItem("details",JSON.stringify(inputDetailArr));

       createListElement(inputDetailObj);
       reset();
    }
    }
    }
//------------------------------------------TO DELETE OUTPUT DETAILS------------------------------------------------------------

function deleteList(event){
   //  console.log(event.target.parentElement.parentElement);
   //  event.path[1].remove(); 
   event.target.parentElement.remove();
    console.log(inputDetailArr);
    
    // delete from the array
    inputDetailArr.forEach((ele,index)=>{
      //  if(parseInt(event.path[1].id)==ele.id){
         if(event.target.parentElement.id == ele.id){
          inputDetailArr.splice(index,1);
       }
    })
   //  localStorage.setItem("details",JSON.stringify(inputDetailArr));
    }

//-------------------------------------------TO EDIT DETAILS--------------------------------------------------------------

function editList(event){
    console.log(event)
    listName = event.path[1].childNodes[0];
    listCity = event.path[1].childNodes[2];
    listPaan = event.path[1].childNodes[4];
    listMail = event.path[1].childNodes[6];

    inputName.value = listName.textContent;
    inputCity.value = listCity.textContent;
    inputPaan.value = listPaan.textContent;
    inputMail.value = listMail.textContent;
    addButton.value = "Save";
 }

// -------------------------------------------TO SAVE THE UPDATED VALUE----------------------------------------------

function SaveUpdate(event,nameText,cityText,mailText,paanText)
{
   listName.textContent = nameText;
   listCity.textContent = cityText;
   listMail.textContent = mailText;
   listPaan.textContent = paanText;
   addButton.value = "Add";

// update the array
inputDetailArr.forEach((ele,index)=>{
   if(listName.parentNode.parentNode.id==ele.id){
      ele.name = nameText;
      ele.city = cityText;
      ele.paan = paanText;
      ele.mail = mailText;
   }
})
// localStorage.setItem("details",JSON.stringify(inputDetailArr));

reset();
}
//-------------------------------------------FILTER NAME(A TO Z & Z TO A)--------------------------------------------------------

function filterName(event)
{
   outputList.innerHTML = "";
   let temp;
   if(event.target.value == "select"){
    temp = inputDetailArr.sort((a,b)=>a.id-b.id);
   }else if(event.target.value == "A_to_Z"){
    temp = inputDetailArr.sort((a,b)=>a.name>b.name? 1:-1);
   }
   else if (event.target.value == "Z_to_A"){
    temp = inputDetailArr.sort((a,b)=>a.name>b.name? -1:1);
   }

   temp.forEach(ele=>{
       createListElement(ele);
   })
}
//------------------------------------------------FILTER BY PAAN NUMBER---------------------------------------------------

function filterPaan(event){
    outputList.innerHTML = "";
let searchInput= inputDetailArr.filter((ele)=>{
   if(ele.paan.includes(searchPaan.value)){
      return ele;
   }
 })

if(searchInput.length!==0)
{
   searchInput.forEach((ele)=>{
      createListElement(ele);
   })
}
else{
   outputList.innerHTML=`<div class="error_paan error"> PAAN NOT FOUND </div>`
}

// searchButton.addEventListener("click",(event)=>{
//    outputList.innerHTML = "";
//     inputDetailArr.forEach((ele)=>{
//     if(searchPaan.value==ele.paan)
//     {
//        createListElement(ele);
//     }
// })
// })
crossIcon.addEventListener("click",(event)=>{
    outputList.innerHTML = "";
    inputDetailArr.forEach((ele)=>{
        createListElement(ele);
    })
    searchPaan.value="";
})

}

//---------------------------------------------------ADD EVENT LISTNERS-------------------------------------------

    addButton.addEventListener("click",addInput);

    outputList.addEventListener("click",(event)=>{
        console.log(event)
           if(event.target.classList.contains("delete_btn"))
           {
              deleteList(event);
           }
           else if(event.target.classList.contains("edit_btn"))
           {
              editList(event);
           }
           
        })


search.addEventListener("click",(event)=>{
    event.preventDefault();
    if(event.target.classList.contains("sequence")){
    filterName(event);
    }
    else if(event.target.classList.contains("search_paan")){
        searchPaan.addEventListener("input",filterPaan);
    }
})