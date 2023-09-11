// http://localhost:4201
// https://reman.onrender.com

var link1 = `http://localhost:4201`;



async function clickedOnInventory(button){
    let iid = button.getAttribute("data-info");
    localStorage.setItem('iid',iid);
    window.location.replace(`${link1}/manufacturer/getSingleInventoryView`);
}



async function logout(){
    // http://localhost:4201
    // reman.onrender.com
    localStorage.clear();
    let result = await fetch(`${link1}/logout`, {
        method: "DELETE"
      });
    window.location.replace(`${link1}`);
  }



async function initializeInventoryList(){
    

    // http://localhost:4201
    // reman.onrender.com
    let data = {
        mid: localStorage.getItem('mid'),
    };
    //* Fetch Inventory List
    let response = await fetch(`${link1}/manufacturer/getInventoryList`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    let result = await response.json();

    let inventory_list = document.getElementById('inventory_list');
    //* Remove all child elements
    while (inventory_list.firstChild) {
        inventory_list.removeChild(inventory_list.firstChild);
    }


    for(let i=0; i<result.rows.length; i++){

        let newChild = document.createElement('li');
        newChild.innerHTML = `
        <button type="button" class="btn btn-outline-dark mb-4" id="inv-button" data-info="${result.rows[i].iid}" onclick="clickedOnInventory(this)">
            <div class="button-content">
                <p style="font-weight: bold; font-size: x-large;"> ${result.rows[i].Name} </p>
                <p class="subscript" >Location :  ${result.rows[i].City} </p>
                <p class="subscript">Type :  ${result.rows[i].Type} </p>
                <p class="ava" id="aval"> Availability: </p> <!-- New line to add "Availability" text -->
            </div>
            <div class="progress right-aligned">
                <div class="bar" style="width:80%" id="bar80">
                    <p class="percent">80%</p>
                </div>
            </div>
        </button>
    `;

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