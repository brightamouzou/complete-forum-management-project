addForumAdmin=document.forms["addForumAdmin"]

formLabels=document.querySelectorAll("form label")

formLabels.forEach(ele, ()=>{
    ele.style.classList.add("positionStatic")
})