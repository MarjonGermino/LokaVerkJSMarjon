"use strict";
async function getData() {
    let response = (await fetch('../halloween.json'))
    return await response.json();
};
async function main() {
    const jsonData = await getData();
    
    console.log(jsonData.length);
}
main();