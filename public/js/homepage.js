// http://localhost:4201
// https://reman.onrender.com

var link1 = `https://reman.onrender.com`;


async function init(){
    let image1 = document.getElementById('img1');
    image1.src = localStorage.getItem('Image');

    let image2 = document.getElementById('img2');
    image2.src = localStorage.getItem('Image');

    let man_name = document.getElementById('profile_name');
    man_name.innerHTML = localStorage.getItem('Name');

    man_name = document.getElementById('name2');
    man_name.innerHTML = localStorage.getItem('Name');


    //* get category and product count
    let data = {
        mid: localStorage.getItem('mid'),
    };
    let response = await fetch(`${link1}/manufacturer/getCategoryProductCount`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    let result = await response.json();
    //console.log(result);


    let update1 = document.getElementById('up1');
    update1.innerHTML = `Products: ${result.rows[0].ProductCount}<br> Categories: ${result.rows[0].CategoryCount}`;


    //* get category and product count by market place
    response = await fetch(`${link1}/manufacturer/getCategoryProductCountInMarketPlace`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    result = await response.json();
    //console.log(result);

    let update2 = document.getElementById('up2');
    update2.innerHTML = `Products: ${result.rows[0].MProductCount}<br> Categories: ${result.rows[0].MCategoryCount}`;


    //* get All inventory Count
    response = await fetch(`${link1}/manufacturer/getAllInventoryCount`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    result = await response.json();
    //console.log(result);


    //* get Empty inventory Count
    response = await fetch(`${link1}/manufacturer/getEmptyInventoryCount`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    let result2 = await response.json();
    //console.log(result2);

    let update3 = document.getElementById('up3');
    update3.innerHTML = `Total Inventories: ${result.rows[0].InventoryCount}<br> Empty Inventories: ${result2.rows[0].EmptyInventoryCount}`;




    //* get All Production House Count
    response = await fetch(`${link1}/manufacturer/getAllProductionHouseCount`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    result = await response.json();
    //console.log(result);


    //* get Empty Production House Count
    response = await fetch(`${link1}/manufacturer/getEmptyProductionHouseCount`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    result2 = await response.json();
    //console.log(result2);


    let update4 = document.getElementById('up4');
    update4.innerHTML = `Total Production Houses: ${result.rows[0].ProductionHouseCount}<br> Empty Production Houses: ${result2.rows[0].EmptyProductionHouseCount}`;
}

init();