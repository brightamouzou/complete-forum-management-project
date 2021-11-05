let changeAdminParams=document.forms["changeAdminParams"]

console.log(changeAdminParams);

let {password, passwordNew, secretWord, secretWordNew}=changeAdminParams

const list=[password, passwordNew, secretWord, secretWordNew]

console.log(password, passwordNew, secretWordNew, secretWord);

const checkValidity=(a, b)=>{
    

    if (a.value!=="" && b.value===""){
        b.setCustomValidity("Ce champ ne peut pas etre vide")
    }else if(a.value==='' && b.value!==""){
        a.setCustomValidity("Ce champ ne peut pas etre vide")
    }
    else{
        b.setCustomValidity("")
    }
}

list.forEach(ele=>{
    if(ele.id.includes("password")){

        ele.addEventListener("change", ()=>{
            console.log('password');
            checkValidity(password, passwordNew)
        })
    
    }else{

        ele.addEventListener("change",()=>{
            console.log('secretWord');

            checkValidity(secretWord, secretWordNew)
        })

    }

})

changeAdminParams.addEventListener("submit", (e)=>{
    console.log("submit");

})