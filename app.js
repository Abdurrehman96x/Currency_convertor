//const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr =document.querySelector(".from select");
const toCurr =document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(Element)=>{
    let currCode = Element.value;
    let countryCode =countryList[currCode];
    let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = Element.parentElement.querySelector("img");
    img.src=newSrc;
}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount =document.querySelector("form input ");
    let amtVal =amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
        
    }
    console.log(amtVal);
    console.log(fromCurr.value,toCurr.value);
    //const URL =`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    const URL =`https://2024-03-06.currency-api.pages.dev/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
    

    let response =await fetch(URL);
    let data = await response.json();
    let rate =data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount =amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;
    
    console.log(response);
    console.log(data);
    console.log(rate);
})