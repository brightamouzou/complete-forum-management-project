
const navBarSlide=()=>{
    
    let nav=document.querySelector("nav")
    options=document.querySelector(".options")
    let navLinks=document.querySelector(".nav-links")
    let links=document.querySelectorAll(".nav-links li")
    
    options.addEventListener("click", ()=>{
        navLinks.classList.toggle("nav-active")

        options.classList.toggle("toggle")

        links.forEach((ele, idx)=>{
            if (ele.style.animation){

                ele.style.animation="";
            }else{
                ele.style.animation=`navLinkApparition .5s ease forwards ${idx/5+.2}s`;
                
            }
        })
    })


}

navBarSlide();
