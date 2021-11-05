const signup=document.forms["signup"]

const {name, username, password, passwordConfirm, secretWordConfirm, secretWord }=signup;

const list=[name, username, password, passwordConfirm, secretWord, secretWordConfirm]

function checkCompability(a,b){


    if(a.value !== b.value){
        b.classList.remove("border-success")
        b.classList.add("border-danger")
        b.setCustomValidity("Le deux mots secrets d'administrateurs saisis ne concordent pas")


        a.classList.remove("border-success")
        a.classList.add("border-danger")
    }else{

        b.classList.remove("border-danger")
        b.classList.add("border-success")
        b.setCustomValidity("")

        a.classList.remove("border-danger")
        a.classList.add("border-success")

    }

    
}

function onChanges(ele){
    ele.addEventListener('change', (e)=>{
        console.log(e.target.id);
    
        if (!(e.target.value.replace(/\s+/,"")).length || e.target.value===""){
            ele.classList.add("border-success")
    
            ele.classList.add("border-danger")
    
            
        }else{
            ele.classList.remove("border-danger")
    
            ele.classList.add("border-success")
        }

        if (e.target.id==="secretWordConfirm" || e.target.id==="secretWord"){

            checkCompability(secretWord, secretWordConfirm);
        }

        if (e.target.id==="passwordConfirm" || e.target.id==="password"){

            checkCompability(password, passwordConfirm);
        }



               
        
    
    })
}



list.forEach(ele=>{
    onChanges(ele)
    
})

