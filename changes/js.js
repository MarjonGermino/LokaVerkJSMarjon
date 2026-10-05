"use strict";
async function getData() {
    let response = (await fetch('../halloween.json'))
    return await response.json();
};
function createCard(data){
    document.querySelector(".cardTemplate").remove(); //removea templateið
    const $cardRows = document.querySelector(".cardRows"); //to put the cards into 'cardRows'
    for (let i = 0; i < data.length; i++){
        let x = data[i]

        const cardHTML = `
            <div class="cardTemplate">
                <hr>
                <p id="street">${x.address.street}</p>
                <p id="postalCode">${x.address.postalCode}</p>
                <p id="number">${x.address.number}</p>
                <p id="location">${x.location.lat}, ${x.location.lng}</p>
                <p id="time">${x.time.from} - ${x.time.to}</p>
                <img src="${x.image}" alt="houseImage">
                <hr>
            </div>
        `;
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = cardHTML;
        $cardRows.append(card);

        console.log(x)
    }
}
function filter(){
    let $listRange = document.querySelector(".listRange");

    let i = document.querySelector('input'),
    o = document.querySelector('output');

    o.innerHTML = i.value;

    i.addEventListener('input', function () {
        console.log(i.value);
        
    }, false);
}
async function main() {
    const jsonData = await getData();
    createCard(jsonData)
    console.log(jsonData.length);

    filter()
    
    
}
main();