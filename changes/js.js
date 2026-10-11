"use strict";
let changingValues = {
    howfarRange: 100,
    dairyFree: true,
    nutFree: true,
    time: {from: "17:00", to: "20:30"}
}
let whereAmI = {
    lat: 64.13890271227935,
    lng: -21.903670386999238
}
async function getData() {
    let response = (await fetch('../halloween.json'))
    return await response.json();
};
function calculateDistance(lat1, lng1, lat2, lng2) { //Tók þetta frá Gervigreind til að Calculatea Distanceið
    const R = 6371; // Earth radius in km

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c *10; // *1000 fyrir metrum
}
class Card{
    constructor(address, location, candy, time, image, html){
        this.address = address
        this.location = location
        this.candy = candy
        this.time = time
        this.image = image
        this.html = html
    }
}

function createCard(data){
    document.querySelector(".cardRows").remove()
    const $cardRows = document.createElement("div")
    $cardRows.classList.add('cardRows'); 
    document.body.append($cardRows) //removes all of the cards elem then creates a new div with .cardRows.
    let emptyArrayOfCards = []
    let cardHTML;


    const cardchecker = (htmlCard) =>{ //checkar ef cardið er ekki undifined þá býr til það
        if (htmlCard !== undefined){
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = cardHTML;
            $cardRows.append(card);
            console.log(x)
        }
    }

    for (let i = 0; i<data.length;i++){
        let x = data[i]
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
        emptyArrayOfCards.push(new Card(x.address, x.postalCode, x.location, 
                                        x.candy, x.time, x.image, cardHTML))
    }
    
    
        
}

function filter(Dta){
    const inputFromSlider = document.querySelector('input'),
    output = document.querySelector('output');
    
    output.innerHTML = inputFromSlider.value;
    createCard(Dta, 100)
    inputFromSlider.addEventListener('input', function() {
        output.innerHTML = inputFromSlider.value; //til að updatea nr hjá sliderinn
        changingValues.howfarRange = parseInt(inputFromSlider.value)
        console.log(changingValues)
        createCard(Dta, changingValues)
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
function mapMarkers(data){
    const redIcon = new Icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', 
        iconSize: [25, 41], 
        iconAnchor: [12, 41], 
        popupAnchor: [1, -34], 
        shadowSize: [41, 41] 
    });
    const greenIcon = new Icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', 
        iconSize: [25, 41], 
        iconAnchor: [12, 41], 
        popupAnchor: [1, -34], 
        shadowSize: [41, 41] 
    });
    const yellowIcon = new Icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png', 
        iconSize: [25, 41], 
        iconAnchor: [12, 41], 
        popupAnchor: [1, -34], 
        shadowSize: [41, 41] 
    });
    for (let i = 0; i < data.length; i++){
        let x = data[i]
        if (x.candy.dairyFree){
            const marker = new Marker([x.location.lat, x.location.lng], {icon: redIcon }).addTo(map);
        }
        else if (x.candy.nutFree){
            const marker = new Marker([x.location.lat, x.location.lng], {icon: yellowIcon }).addTo(map);
        }
        else{ 
            const marker = new Marker([x.location.lat, x.location.lng], {icon: greenIcon }).addTo(map);
        }
    }
    const userMarker = new Marker([whereAmI.lat, whereAmI.lng],).addTo(map);
}

async function main() {
    const jsonData = await getData();
    console.log('JsonDataLength: ',jsonData.length);

    mapMarkers(jsonData)
    filter(jsonData)

}
main();