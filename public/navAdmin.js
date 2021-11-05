let adminInfos=document.querySelector('.adminInfos')
let adminInfosContainer=document.querySelector('.adminInfosContainer')
let nav=document.querySelector("nav")


adminInfos.addEventListener("mouseover", (e)=>{
    e.stopPropagation()
    adminInfos.classList.add("dropUp")
    adminInfosContainer.style.display="block"
    console.log(adminInfos.childNodes);
    nav.style.height="10vh"
})

adminInfos.addEventListener("mouseout", ()=>{
    adminInfos.classList.remove("dropUp")
    adminInfosContainer.style.display="none"
})

console.log("fdg");