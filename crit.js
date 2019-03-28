document.addEventListener('DOMContentLoaded',(e)=>{


    const crit = document.querySelectorAll(".card");    
    const critArray = Array.from(crit);
    
    critArray.forEach(crit=> 
        crit.addEventListener('click',(e)=>clickHandler(e,crit))
    );

})

clickHandler = (e,crit) =>{
    let fumble
    
    if (e.target.classList.contains("fumble")){
        fumble = true
    }
    else{
        fumble = false
    }

    let backText = crit.childNodes[1].childNodes[3].childNodes[1]
    let critType = (e.target.innerHTML).toLowerCase()


    if (fumble && critType==="magic"){
        critType = "fmagic";
    }

    cardTransition(e,crit, backText, critType)    
    
}

cardTransition = (e,crit, backText, critType) => {
    if (crit.classList.contains("card-transform")){
        crit.classList.remove("card-transform")
    }
    else {
        critFetch(e,crit, backText, critType)
    }
}


critFetch = (e,crit, backText, critType) => {
    fetch(`https://fierce-bastion-18567.herokuapp.com/api/v1/crits?category=${critType}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(r=>{
            return r.json()
        })
        .then(critData => {
            console.log("Data from fetch", critData)
            makeCard(critData,crit,backText, e)
            showBack(e,crit)
         } )

}   

    makeCard = (critData,crit,backText) => {
        cardDisplay(critData, crit, backText) 
    }

    cardDisplay= (critData, crit, backText) => {
        backText.innerHTML = ""
        h1 = document.createElement("h1")
        h1.append(critData.name)
        backText.append(h1)
        backText.append(critData.description)
    }

    showBack= (e,crit) =>{
        crit.classList.add("card-transform")
    }