// http://localhost:4201
// https://reman.onrender.com

var link1 = `https://reman.onrender.com`;
var bidList = [];


async function logout(){
    // http://localhost:4201
    // reman.onrender.com
    localStorage.clear();
    let result = await fetch(`${link1}/logout`, {
        method: "DELETE"
      });
    window.location.replace(`${link1}`);
}



function selected(element){
    let bid  = element.getAttribute("data-info");
    if(element.checked){
        bidList.push(bid);
        //console.log(bidList);
    }
    else{
        let index = bidList.indexOf(bid);
        if (index !== -1) {
            bidList.splice(index, 1); // Remove 1 element at the found index (removes "banana")
        }
        //console.log(bidList);
    }
}



async function init(){
    let image = document.getElementById('logoImage');
    image.src = localStorage.getItem('Image');

    let man_name = document.getElementById('profile_name');
    man_name.innerHTML = localStorage.getItem('Name');


    //* Fetch inventory info first
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

    let iid = localStorage.getItem('iid');
    for(let i=0; i<result.rows.length; i++){
        if(result.rows[i].iid == iid){
            let inventory_name = document.getElementById('inventory_name');
            let location = document.getElementById('location');
            let type = document.getElementById('type');

            // let top_name = document.getElementById('top_name');
            // top_name.innerHTML = inventory_name;


            inventory_name.innerHTML = `${result.rows[i].Name}`;
            location.innerHTML = `Location : ${result.rows[i].City}`;
            type.innerHTML = `Storage Type : ${result.rows[i].Type}`;
        }
    }



    //* Fetch Batches
    data = {
        iid: localStorage.getItem('iid'),
        pid: localStorage.getItem('pid'),
    };
   
    response = await fetch(`${link1}/manufacturer/getBatchListByPID_IID`, {
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
        let newChild = document.createElement('tr');
        let update1 = document.getElementById('up1');
        update1.innerHTML = `Product Name : ${result.rows[i].Name}`;
        
        let str = '';
        str += `<td>
        <div class="widget-26-job-emp-img">
            <img src="images/batchIcon.jpg" alt="Company" />
        </div>
    </td>
    <td>
        <div class="widget-26-job-info">
            <span class="text-dark font-weight-bold">${result.rows[i].bid}</span>
            <p class="m-0"><span class="text-muted time">Batch No.</span></p>
        </div>
    </td>
    <td>
        <div class="widget-26-job-info">
            <span class="text-dark font-weight-normal">${result.rows[i].Name}</span>
            <p class="m-0"><span class="text-muted time">Product Name</span></p>
        </div>
    </td>

    <td>
        <div class="widget-26-job-info">
            <span class="text font-weight-normal"> ${result.rows[i]["Weight/Volume"]} </span>
            <p class="m-0"><span class="text-muted time">Unit Quantity</span></p>
        </div>
    </td>


    <td>
        <div class="widget-26-job-info">
            <span class="text font-weight-normal"> ${result.rows[i].ManufacturingQuantity} </span>
            <p class="m-0"><span class="text-muted time">Quantity</span></p>
        </div>
    </td>

    <td>
        <div class="widget-26-job-info">
            <span class="text-dark font-weight-normal">${result.rows[i].ExpiryDate}</span>
            <p class="m-0"><span class="text-muted time">Expire Date</span></p>
        </div>
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
            str += `<td>
            <!-- if else cases -->
            <div class="widget-26-job-category bg-soft-warning">
                <i class="indicator bg-warning"></i>
                <span> Moderate</span>
            </div>
            </td>`;
        }
        else if(result.rows[i].BatchState == "Critical"){
            str += `<td>
            <!-- if else cases -->
            <div class="widget-26-job-category bg-soft-danger">
                <i class="indicator bg-danger"></i>
                <span> Critial  </span>
            </div>
            </td>`;
        }

        str += `<td>
        <div class="widget-26-job-info">
            <div class="custom-control custom-switch">

                <input type="checkbox" class="custom-control-input" data-info="${result.rows[i].bid}" id="customSwitch${i}" onclick="selected(this)">
                <label class="custom-control-label" for="customSwitch${i}"></label>
            </div>
        </div>
        </td>`;

        newChild.innerHTML += str;
        table.appendChild(newChild);

    }

}



async function shift(){
    console.log(bidList);
    let data = {
        iid: localStorage.getItem('iid'),
        bidL: bidList,
    };
    let response = await fetch(`${link1}/manufacturer/addToShiftingCart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if(response.ok){
        console.log("Successfully added to shifting cart");
        alert("Successfully added to shifting cart");
        window.location.replace(`${link1}/manufacturer/getSingleInventoryView`);
    }
    else{
        console.log("Error Occured! ");
        alert("Error Occured! ");
    }
}


async function addToMarketPlace(){
    console.log(bidList);
    let data = {
        iid: localStorage.getItem('iid'),
        bidL: bidList,
    };
    let response = await fetch(`${link1}/manufacturer/addToMarketPlace`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if(response.ok){
        console.log("Successfully added to market place");
        alert('Successfully added to market place');
        window.location.replace(`${link1}/manufacturer/getSingleInventoryView`);
    }
    else{
        console.log("Error Occured! ");
        alert('Error Occured! ');
    }
}


init();