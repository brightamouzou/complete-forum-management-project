const Forum=require("../models/Forum")

module.exports=async(req, res, next)=>{

    try{
        const forums=await Forum.find()       

        let forumsClone=Object.keys(forums).map((ele,id)=>forums[id])

        /*
        function formatDate(a){
            return new Date(a).getTime()
        }*/


        /*//Tri de clone en utilisqnt le tri pqr insertion

        
        for(let i=1; i<forumsClone.length; i++){
            k=forumsClone[i]
            j=i


            while(j>0 && formatDate(forumsClone[j-1].createdAt)<formatDate(k.createdAt)){
                forumsClone[j]=forumsClone[j-1]
                j--
            }

            forumsClone[j]=k


        }*/




        forumsClone.reverse()
        if (forumsClone.length){
            req.session.forums=forumsClone
            const user=req.session.user
            next()
        }else{
            req.session.forums="Aucun forum ajouté pour l'instant"
            next()
        }

    }catch(err){
        next()
    }

}

