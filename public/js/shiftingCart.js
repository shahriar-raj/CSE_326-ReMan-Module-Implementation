// http://localhost:4201
// https://reman.onrender.com

var link1 = `https://reman.onrender.com`;

var bidList = [];
var result;

async function initList(){
    let table = document.getElementById('product_list');
    //* Remove all child elements
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    for(let i=0; i<result.rows.length; i++){
        let index = bidList.indexOf(result.rows[i].bid);
        if(index != -1){
       
            let newChild = document.createElement('tr');

            let str = '';

            str += `             <td scope="row" class="border-0">
            <div class="p-2">
                <img src="images/batchIcon.jpg"
                    alt="" width="70" class="img-fluid rounded shadow-sm">
                <div class="ml-3 d-inline-block align-middle">
                    <h5 class="mb-0"> <a href="#"
                            class="text-dark d-inline-block align-middle">Batch No : xyz
                        </a></h5>
                    <span class="text-muted font-weight-normal font-italic d-block">
                        Product: ${result.rows[i].Name}
                    </span>
                    <span class="text-muted font-weight-normal font-italic d-block">
                        Category: ${result.rows[i].Category_Name}
                    </span>
                </div>
            </div>
        </td>
        <td class="border-0 align-middle"><strong>${result.rows[i]["Weight/Volume"]}</strong></td>
        <td class="border-0 align-middle"><strong>${result.rows[i].ManufacturingQuantity}</strong></td>

        <td class="border-0 align-middle">
            ${result.rows[i].ExpiryDate.split('T')[0]}
        </td>`;

        if(result.rows[i].BatchState == "Fresh"){
            str += `<td>
            <!-- if else cases -->
            <div class="widget-26-job-category bg-soft-success">
                <i class="indicator bg-success"></i>
                <span> Fresh  </span>
            </div>
            </td>`;
        }
        else if(result.rows[i].BatchState == "Moderate"){
            str += `<td class="border-0 align-middle">
            <div class="widget-26-job-category bg-soft-success rounded">
                <i class="indicator bg-success"></i>
                <i class="fa fa-solid fa-circle" style="color: #ffc107;"></i>
                <span> </span>
                <span> Fresh </span>
            </div>
            </td>`;
        }
        else if(result.rows[i].BatchState == "Critical"){
            str += `<td class="border-0 align-middle">
            <div class="widget-26-job-category bg-soft-danger rounded">
                <i class="indicator bg-danger"></i>
                <i class="fa fa-solid fa-circle" style="color: #dc3545;"></i>
                <span> Critial </span>
            </div>
            </td>`;
        }

        str += `<td class="border-0 align-middle">
        <i class="fa fa-trash" data-info="${result.rows[i].bid}" onclick="remove(this)"></i>
        </td>`;

        newChild.innerHTML += str;
        table.appendChild(newChild);
    }
    }
}


function remove(element){
    let bid  = element.getAttribute("data-info");
    let index = bidList.indexOf(bid);
    if (index !== -1) {
        bidList.splice(index, 1); // Remove 1 element at the found index (removes "banana")
        initList();
    }
}


function confirmShift(){
    let myListString = JSON.stringify(bidList);
    localStorage.setItem('bidList', myListString);
}


async function init(){
    let image = document.getElementById('logoImage');
    image.src = localStorage.getItem('Image');

    let man_name = document.getElementById('profile_name');
    man_name.innerHTML = localStorage.getItem('Name');



    let data = {
        mid: localStorage.getItem('mid'),
    };
    let response = await fetch(`${link1}/manufacturer/getInventoryList`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    result = await response.json();

    let iid = localStorage.getItem('iid');
    for(let i=0; i<result.rows.length; i++){
        if(result.rows[i].iid == iid){
            let update1 = document.getElementById('up1');
            update1.innerHTML = `Now showing the shift cart for: ${result.rows[i].Name}`;
        }
    }


    data = {
        iid: localStorage.getItem('iid'),
    };
    //* Fetch Inventory List
    response = await fetch(`${link1}/manufacturer/getShiftingCartInfo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    result = await response.json();
    console.log(result);

    let table = document.getElementById('product_list');
    //* Remove all child elements
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    for(let i=0; i<result.rows.length; i++){
        bidList.push(result.rows[i].bid);
        let newChild = document.createElement('tr');

        let str = '';

        str += `             <td scope="row" class="border-0">
        <div class="p-2">
            <img src="images/batchIcon.jpg"
                alt="" width="70" class="img-fluid rounded shadow-sm">
            <div class="ml-3 d-inline-block align-middle">
                <h5 class="mb-0"> <a href="#"
                        class="text-dark d-inline-block align-middle">Batch No : xyz
                    </a></h5>
                <span class="text-muted font-weight-normal font-italic d-block">
                    Product: ${result.rows[i].Name}
                </span>
                <span class="text-muted font-weight-normal font-italic d-block">
                    Category: ${result.rows[i].Category_Name}
                </span>
            </div>
        </div>
    </td>
    <td class="border-0 align-middle"><strong>${result.rows[i]["Weight/Volume"]}</strong></td>
    <td class="border-0 align-middle"><strong>${result.rows[i].ManufacturingQuantity}</strong></td>

    <td class="border-0 align-middle">
        ${result.rows[i].ExpiryDate.split('T')[0]}
    </td>`;

    if(result.rows[i].BatchState == "Fresh"){
        str += `<td>
        <!-- if else cases -->
        <div class="widget-26-job-category bg-soft-success">
            <i class="indicator bg-success"></i>
            <span> Fresh  </span>
        </div>
        </td>`;
    }
    else if(result.rows[i].BatchState == "Moderate"){
        str += `<td class="border-0 align-middle">
        <div class="widget-26-job-category bg-soft-success rounded">
            <i class="indicator bg-success"></i>
            <i class="fa fa-solid fa-circle" style="color: #ffc107;"></i>
            <span> </span>
            <span> Fresh </span>
        </div>
        </td>`;
    }
    else if(result.rows[i].BatchState == "Critical"){
        str += `<td class="border-0 align-middle">
        <div class="widget-26-job-category bg-soft-danger rounded">
            <i class="indicator bg-danger"></i>
            <i class="fa fa-solid fa-circle" style="color: #dc3545;"></i>
            <span> Critial </span>
        </div>
        </td>`;
    }

    str += `<td class="border-0 align-middle">
    <i class="fa fa-trash" data-info="${result.rows[i].bid}" onclick="remove(this)"></i>
    </td>`;

    newChild.innerHTML += str;
    table.appendChild(newChild);

    }
    console.log(bidList);
}

init();