"use strict";
async function getData() {
    let response = (await fetch('../halloween.json'))
    return await response.json();
};
function createCard(data){
    const $cardRows = document.querySelector(".cardRows"); //to put the cards into 'cardRows'
    
    for (let i = 0; i < data.length; i++){
        let I = data[i]

        
        const $cardtemp = document.querySelector(".cardTemplate");
        
        const copyCard = $cardtemp.cloneNode(true);
        $cardRows.appendChild(copyCard);
        console.log(I)
    }
    
}
async function main() {
    const jsonData = await getData();
    createCard(jsonData)
    console.log(jsonData.length);
}
main();