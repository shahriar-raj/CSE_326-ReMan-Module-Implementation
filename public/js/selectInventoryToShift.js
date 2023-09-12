// http://localhost:4201
// https://reman.onrender.com

var link1 = `https://reman.onrender.com`;


async function clickedOnInventory(button){
    let iidto = button.getAttribute("data-info");
    let iidfrom = localStorage.getItem("iid");
    let storedListString = localStorage.getItem('bidList');
    let storedList = JSON.parse(storedListString);
    let data = {
        toiid: iidto,
        fromiid: iidfrom,
        bidList: storedList
        
    };
    let response = await fetch(`${link1}/manufacturer/shiftToOtherInventory`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });


    if(response.ok){
        alert('Shifting is done successfully!');
        window.location.replace(`${link1}/manufacturer/showInventory`);
    }
    else{
        alert("Some Error Occured with shifting!")
    }
    //localStorage.setItem('iid',iid);
    //window.location.replace(`${link1}/manufacturer/getSingleInventoryView`);
}

async function initializeInventoryList(){
    let data = {
        mid: localStorage.getItem('mid'),
        iid: localStorage.getItem('iid'),
    };
    let response = await fetch(`${link1}/manufacturer/getAllInventoriesExceptOne`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    let result = await response.json();
    console.log(result);


    let inventory_list = document.getElementById('inventory_list');
    //* Remove all child elements
    while (inventory_list.firstChild) {
        inventory_list.removeChild(inventory_list.firstChild);
    }
    for(let i=0; i<result.rows.length; i++){

        let newChild = document.createElement('li');

        let availability = Number(result.rows[i].Availability);

        if(availability >= 0 && availability <= 18){
            newChild.innerHTML = `
            <button type="button" class="btn btn-outline-dark mb-4" id="inv-button" data-info="${result.rows[i].iid}" onclick="clickedOnInventory(this)">
                <div class="button-content">
                    <p style="font-weight: bold; font-size: x-large;"> ${result.rows[i].Name} </p>
                    <p class="subscript" >Location :  ${result.rows[i].City} </p>
                    <p class="subscript">Type :  ${result.rows[i].Type} </p>
                    <p class="ava" id="aval"> Availability: </p> <!-- New line to add "Availability" text -->
                </div>
                <div class="progress right-aligned">
                    <div class="bar" style="width:${availability}%" id="bar18">
                        <p class="percent">${result.rows[i].Availability}%</p>
                    </div>
                </div>
            </button>
        `;
        }
        else if (availability >= 19 && availability <= 40){
            newChild.innerHTML = `
            <button type="button" class="btn btn-outline-dark mb-4" id="inv-button" data-info="${result.rows[i].iid}" onclick="clickedOnInventory(this)">
                <div class="button-content">
                    <p style="font-weight: bold; font-size: x-large;"> ${result.rows[i].Name} </p>
                    <p class="subscript" >Location :  ${result.rows[i].City} </p>
                    <p class="subscript">Type :  ${result.rows[i].Type} </p>
                    <p class="ava" id="aval"> Availability: </p> <!-- New line to add "Availability" text -->
                </div>
                <div class="progress right-aligned">
                    <div class="bar" style="width:${availability}%" id="bar40">
                        <p class="percent">${result.rows[i].Availability}%</p>
                    </div>
                </div>
            </button>
        `;

        }
        else{
            newChild.innerHTML = `
            <button type="button" class="btn btn-outline-dark mb-4" id="inv-button" data-info="${result.rows[i].iid}" onclick="clickedOnInventory(this)">
                <div class="button-content">
                    <p style="font-weight: bold; font-size: x-large;"> ${result.rows[i].Name} </p>
                    <p class="subscript" >Location :  ${result.rows[i].City} </p>
                    <p class="subscript">Type :  ${result.rows[i].Type} </p>
                    <p class="ava" id="aval"> Availability: </p> <!-- New line to add "Availability" text -->
                </div>
                <div class="progress right-aligned">
                    <div class="bar" style="width:${availability}%" id="bar80">
                        <p class="percent">${result.rows[i].Availability}%</p>
                    </div>
                </div>
            </button>
        `;
        }

        

        // Append the new child element to the parent element
        inventory_list.appendChild(newChild);
    }
}



function init(){
    let image = document.getElementById('logoImage');
    image.src = localStorage.getItem('Image');

    let man_name = document.getElementById('profile_name');
    man_name.innerHTML = localStorage.getItem('Name');
}

init();
initializeInventoryList();