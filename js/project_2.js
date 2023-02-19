let selector=document.querySelector(".moviePrice");
let allDefualt=document.querySelectorAll(".main_column .default");
let countSelecton=document.getElementById("countSelecton");
let totalPrice=document.getElementById("totalPrice");
let clearAll=document.querySelector(".clearAll");

allDefualt=[...allDefualt]
clearAll.addEventListener("click",clearAllSelection)
let mainArray=[];
if(window.localStorage.getItem("mainArray")){
    mainArray= JSON.parse(window.localStorage.getItem("mainArray"));
    countSelecton.innerHTML=countSelected();
    totalPrice.innerHTML=allpPrice(mainArray);
    loopStorage(mainArray)
}
allDefualt.forEach((ele)=>{
    ele.addEventListener("click",createEleObj)
})
function createEleObj(){
    let objSelected={
        value:selector.value,
        id:allDefualt.indexOf(this),
        status:false,
    }
    allDefualt[allDefualt.indexOf(this)].classList.toggle("default");
    let toggleCheck=allDefualt[allDefualt.indexOf(this)].classList.toggle("selected");
    if(toggleCheck){
        objSelected.status=true;
        pushToMainArr(mainArray,objSelected);
    }else{
        removeFromMainArray(mainArray,objSelected)
        objSelected.status=false;
    }
    addToLocalStorage(mainArray);
    countSelecton.innerHTML=countSelected();
    totalPrice.innerHTML=allpPrice(mainArray);
}
function pushToMainArr(arr,elements){
    arr.push(elements);
    
}
function removeFromMainArray(arr,ele){
    for(let i=0;i<mainArray.length;i++){
        if(mainArray[i].id==ele.id){
            arr.splice(i,1)
        }
    }
}
function addToLocalStorage(arr){
    window.localStorage.setItem("mainArray",JSON.stringify(arr))
}
function loopStorage(arr){
    for(let i=0;i<arr.length;i++){
        if(allDefualt[arr[i].id]){
            allDefualt[arr[i].id].classList.add("selected")
            allDefualt[arr[i].id].classList.remove("default")
        }
    }
}
function countSelected(){
    return mainArray.length
}
function allpPrice(arr){
    let price=0;
    for(let i=0;i<arr.length;i++){
        price+=(+arr[i].value);
    }
    return price;
}
function clearAllSelection(){
    for(let i=0;i<allDefualt.length;i++){
        allDefualt[i].classList.remove("selected")
        allDefualt[i].classList.add("default")
    }
    window.localStorage.clear();
    mainArray=[]
    countSelecton.innerHTML=0;
    totalPrice.innerHTML=0;
}