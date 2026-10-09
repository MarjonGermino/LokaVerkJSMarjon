"use strict";
let changingValues = {
    howfarRange: 100,
    dairyFree: true,
    nutFree: true,
    time: {from: "17:00", to: "20:30"}
}
async function getData() {
    let response = (await fetch('../halloween.json'))
    return await response.json();
};

function createCard(data){
    document.querySelector(".cardRows")
    const $cardRows = document.querySelector(".cardRows"); //to put the cards into 'cardRows'
    for (let i = 0; i < data.length; i++){
        let x = data[i]
        let cardHTML
        
        const cardchecker = (htmlCard) =>{ //checkar ef cardið er ekki undifined þá býr til það
            if (htmlCard !== undefined){
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = cardHTML;
                $cardRows.append(card);
                console.log(x)
            }
        }
        cardHTML = `
            <div class="cardTemplate">
                <hr>
                <p id="street">${x.address.street}</p>
                <p id="postalCode">Póst Númer: ${x.address.postalCode}</p>
                <p id="number">Númer: ${x.address.number}</p>
                <p id="dairyfree">Dairy free: ${x.candy.dairyFree}</p>
                <p id="nutFree">Nut Free: ${x.candy.nutFree}</p>
                <p id="location">${x.location.lat}, ${x.location.lng}</p>
                <p id="time">Tími: ${x.time.from} - ${x.time.to}</p>
                <img src="${x.image}" alt="houseImage">
                <hr>
            </div>
        `;
        cardchecker(cardHTML)
        
        
        
    }
}
function mapMarkers(data){
    for (let i = 0; i < data.length; i++){
        let x = data[i]
        const marker = new Marker([x.location.lat, x.location.lng]).addTo(map);
    }
}
function filter(Dta){
    const inputFromSlider = document.querySelector('input'),
    output = document.querySelector('output');
    output.innerHTML = inputFromSlider.value;
    createCard(Dta, 100)
    inputFromSlider.addEventListener('input', function() {
        output.innerHTML = inputFromSlider.value; //til að updatea nr hjá sliderinn
        // createCard(Dta, changingValues) parseInt(i.value)
        changingValues.howfarRange = parseInt(inputFromSlider.value)
        console.log(changingValues)
        
    }, false);

    //Time
    flatpickr("#fra", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        minTime: "17:00",
        maxTime: "20:30"
    });
    flatpickr("#til", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        minTime: "17:00",
        maxTime: "20:30"
    });
    let fromTime = document.querySelector("#fra");
    let toTime = document.querySelector("#til");

    fromTime.addEventListener('change', () => {
        changingValues.time.from = fromTime.value;
        console.log(changingValues);
    });
    toTime.addEventListener('change', () => {
        changingValues.time.to = toTime.value;
        console.log(changingValues);
    });

};

async function main() {
    const jsonData = await getData();
    console.log('JsonDataLength: ',jsonData.length);

    mapMarkers(jsonData)
    filter(jsonData)

}
main();