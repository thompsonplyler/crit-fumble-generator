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

    let frontText = crit.childNodes[1].childNodes[1].childNodes[0]//.childNodes[1]
    let backText = crit.childNodes[1].childNodes[3].childNodes[1]
    console.log("This is the text you see right away:", frontText)
    let critType = e.target.innerText.toLowerCase()//.toLoweCase()
    
    console.log("CritType from event", critType)


    if (fumble && critType==="magic"){
        critType = "fmagic";
    }
    console.log(backText)
    cardTransition(e,crit, backText, critType, frontText)    
    
}

cardTransition = (e,crit, backText, critType, frontText) => {
    if (crit.classList.contains("card-transform")){
        crit.classList.remove("card-transform")
        frontText.classList.remove("card-front-vanish")
    }
    else {
        critFetch(e,crit, backText, critType, frontText)
    }
}


critFetch = (e,crit, backText, critType, frontText) => {
    console.log("e",e,"\n", "crit", crit,"\n", "backText", backText,"\n", "critType", critType,"\n", "frontText", frontText)
    fetch(`https://fierce-bastion-18567.herokuapp.com/api/v1/crits?category=${critType}`,{
        // fetch(`http://localhost:3001/api/v1/crits?category=${critType}`,{        
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
            makeCard(critData,crit,backText, e, frontText)
            showBack(e,crit, frontText)
         } )

}   

    makeCard = (critData,crit,backText) => {
        cardDisplay(critData, crit, backText) 
    }

    cardDisplay= (critData, crit, backText) => {
        backText.innerHTML = ""
        h1 = document.createElement("h2")
        h1.append(critData.name)
        backText.append(h1)
        backText.append(critData.description)
    }

    showBack= (e,crit, frontText) =>{
        console.log(frontText)
        crit.classList.add("card-transform")
        frontText.classList.add("card-front-vanish")
        
    }