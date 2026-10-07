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
function createCard(data, values){
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
function filter(Dta){
    const inputFromSlider = document.querySelector('input'),
    output = document.querySelector('output');
    output.innerHTML = inputFromSlider.value;
    createCard(Dta, 100)
    // createCard(Dta, changingValues) parseInt(i.value)
    inputFromSlider.addEventListener('input', function() {
        output.innerHTML = inputFromSlider.value; //til að updatea nr hjá sliderinn
        changingValues.howfarRange = parseInt(inputFromSlider.value)

        console.log(changingValues)

    }, false);

    const nutFreeSwitch = document.querySelector('#nutFree');
    nutFreeSwitch.addEventListener('change', () => {
        changingValues.nutFree = nutFreeSwitch.checked;
        console.log(changingValues);
    
    });
    const dairyFreeSwitch = document.querySelector('#dairyFree');
    dairyFreeSwitch.addEventListener('change', () => {
        changingValues.dairyFree = dairyFreeSwitch.checked;
        console.log(changingValues);
    });


    //Time
    flatpickr("#fra", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true
    });

    flatpickr("#til", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true
    });
}

async function main() {
    const jsonData = await getData();
    console.log('JsonDataLength: ',jsonData.length);

    filter(jsonData)

}
main();