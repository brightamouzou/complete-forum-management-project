commentContent=document.getElementById("commentInput");
commentSubmit=document.getElementById("commentSubmit");


commentContent.addEventListener("input", (e)=>{

    if (e.target.value.replace(/\s+/, "").length){
       
        commentSubmit.removeAttribute("disabled")
    }else{
        commentSubmit.setAttribute("disabled", "true")
    }
})

const list=["reflexion1.png", "reflexion2.png", "reflexion3.jpg"]

let forumLabelImage=document.getElementById("forumLabelImage")


const random=Math.floor(Math.random()*3)

window.addEventListener("load", ()=>{
    forumLabelImage.setAttribute("src", `./images/${list[random]}`)
})


let comments=document.querySelectorAll(".comments")

let anwserDispatch=document.querySelectorAll(".anwserDispatch")


comments.forEach((comment, idx)=>{

    let form=document.getElementById(`answer${idx}`)

    form.addEventListener("click", (event)=>{
        event.stopPropagation()
    })

    comment.addEventListener("focusin", (e)=>{
        e.stopPropagation()

        anwserDispatch[idx].addEventListener("click", (ev)=>{
            ev.target.style.display="none"
            ev.stopPropagation()
            form.style.display="block"

        })

    })

    window.addEventListener("click", ()=>{
        anwserDispatch[idx].style.display="block"
        form.style.display="none"
    })

    
})




