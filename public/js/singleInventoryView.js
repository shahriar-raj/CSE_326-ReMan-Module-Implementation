// http://localhost:4201
// https://reman.onrender.com

var link1 = `https://reman.onrender.com`;

var products;


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
}


function clickProduct(element){
    let pid = element.getAttribute("data-info");
    localStorage.setItem('pid',pid);
    window.location.replace(`${link1}/manufacturer/getBatchListPage`);
}




async function fetchProduct(){
    let data = {
        mid: localStorage.getItem('mid'),
        iid: localStorage.getItem('iid'),
    };
    //* Fetch Inventory List
    let response = await fetch(`${link1}/manufacturer/getProductByInventory`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    products = await response.json();
    

    let table = document.getElementById('product_list');
    //* Remove all child elements
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    for(let i=0; i<products.rows.length; i++){

            let newChild = document.createElement('tr');
            // newChild.onclick = "clickProduct(this)";
            newChild.setAttribute("data-info", `${products.rows[i].pid}`);
            newChild.setAttribute("onclick", `clickProduct(this)`);

            newChild.innerHTML = `<td>
            <div class="widget-26-job-emp-img">
                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Company" />
            </div>
        </td>
        <td>
            <div class="widget-26-job-info">
                <span class="text-info font-weight-bold">${products.rows[i].Name}</span>
                <p class="m-0"><span class="text-muted time">Product Name</span></p>
            </div>
        </td>
        <td>
            <div class="widget-26-job-info">
                <span class="text font-weight-normal">${products.rows[i].Category_Name}</span>
                <p class="m-0"><span class="text-muted time">Category</span></p>
            </div>
        </td>

        <td>
            <div class="widget-26-job-info">
                <span class="text font-weight-normal">${products.rows[i]["Weight/Volume"]}</span>
                <p class="m-0"><span class="text-muted time">Unit Size </span></p>
            </div>
        </td>

        <td>
            <div class="widget-26-job-info">
                <span class="text font-weight-normal">${products.rows[i].TotalQuantity}</span>
                <p class="m-0"><span class="text-muted time">Quantity</span></p>
            </div>
        </td>
        <td>
            <div class="widget-26-job-info">
                <span class="text font-weight-normal"> ${products.rows[i]["Unit Price"]} &#2547</span>
                <p class="m-0"><span class="text-muted time">Base Price</span></p>
            </div>
        </td>
        <td>
            <div class="widget-26-job-info">
                <span class="text font-weight-normal">${products.rows[i].Rating}</span>
                <p class="m-0"><span class="text-muted time">Rating</span></p>
            </div>
        </td>`;

        str = '';
        str += `<td>
        <div class="widget-26-job-starred">
            <a href="">`;

            let floatnum = parseFloat(products.rows[i].Rating);
            floatnum = Math.floor(floatnum);

            for(let j=1; j<=floatnum; j++){
                str += `<svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-star starred"
                >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>`;
            }

            for(let j=1;j<=(5-floatnum); j++){
                str += `<svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-star"
                >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>`;
            }
            str +=  `</a>
            </div>
            </td>`;
            newChild.innerHTML += str;
            table.appendChild(newChild);
        }
    }


    async function fetchCategories(){
        let data = {
            iid: localStorage.getItem('iid'),
        };
        //* Fetch Inventory List
        let response = await fetch(`${link1}/manufacturer/getCategoryByIID`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        let result = await response.json();
        console.log(result);

        let category = document.getElementById('exampleFormControlSelect1');
        //* Remove all child elements
        while (category.firstChild) {
            category.removeChild(category.firstChild);
        }

        category.innerHTML += `<option>category</option>`;
        for(let i=0; i<result.rows.length; i++){
            category.innerHTML += `<option>${result.rows[i].Category_Name}</option>`;
        }
    }


    function search(element){
        let category = document.getElementById('exampleFormControlSelect1');
        let search = document.getElementById('search');

        let selectedIndex = category.selectedIndex;
        let cat = category.options[selectedIndex].value;
        let srch = search.value;

        if(srch == '' && cat == "category"){
            alert('Search field is empty!');
        }
        else if(srch == ''){
                let table = document.getElementById('product_list');
                //* Remove all child elements
                while (table.firstChild) {
                    table.removeChild(table.firstChild);
                }

                for(let i=0; i<products.rows.length; i++){
                    if(products.rows[i].Category_Name.toLowerCase().includes(cat.toLowerCase())){
                        let newChild = document.createElement('tr');
                        // newChild.onclick = "clickProduct(this)";
                        newChild.setAttribute("data-info", `${products.rows[i].pid}`);
                        newChild.setAttribute("onclick", `clickProduct(this)`);

                        newChild.innerHTML = `<td>
                        <div class="widget-26-job-emp-img">
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Company" />
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-info">
                            <span class="text-info font-weight-bold">${products.rows[i].Name}</span>
                            <p class="m-0"><span class="text-muted time">Product Name</span></p>
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-info">
                            <span class="text font-weight-normal">${products.rows[i].Category_Name}</span>
                            <p class="m-0"><span class="text-muted time">Category</span></p>
                        </div>
                    </td>

                    <td>
                        <div class="widget-26-job-info">
                            <span class="text font-weight-normal">${products.rows[i]["Weight/Volume"]}</span>
                            <p class="m-0"><span class="text-muted time">Unit Size </span></p>
                        </div>
                    </td>

                    <td>
                        <div class="widget-26-job-info">
                            <span class="text font-weight-normal">${products.rows[i].TotalQuantity}</span>
                            <p class="m-0"><span class="text-muted time">Quantity</span></p>
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-info">
                            <span class="text font-weight-normal"> ${products.rows[i]["Unit Price"]} &#2547</span>
                            <p class="m-0"><span class="text-muted time">Base Price</span></p>
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-info">
                            <span class="text font-weight-normal">${products.rows[i].Rating}</span>
                            <p class="m-0"><span class="text-muted time">Rating</span></p>
                        </div>
                    </td>`;

                    str = '';
                    str += `<td>
                    <div class="widget-26-job-starred">
                        <a href="">`;

                        let floatnum = parseFloat(products.rows[i].Rating);
                        floatnum = Math.floor(floatnum);

                        for(let j=1; j<=floatnum; j++){
                            str += `<svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-star starred"
                            >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>`;
                        }

                        for(let j=1;j<=(5-floatnum); j++){
                            str += `<svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-star"
                            >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>`;
                        }
                        str +=  `</a>
                        </div>
                        </td>`;
                        newChild.innerHTML += str;
                        table.appendChild(newChild);
                    }
            }
    }
    else {
        let table = document.getElementById('product_list');
                //* Remove all child elements
                while (table.firstChild) {
                    table.removeChild(table.firstChild);
                }

                for(let i=0; i<products.rows.length; i++){
                    if(products.rows[i].Name.toLowerCase().includes(srch.toLowerCase())){
                        let newChild = document.createElement('tr');
                        // newChild.onclick = "clickProduct(this)";
                        newChild.setAttribute("data-info", `${products.rows[i].pid}`);
                        newChild.setAttribute("onclick", `clickProduct(this)`);

                        newChild.innerHTML = `<td>
                        <div class="widget-26-job-emp-img">
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Company" />
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-info">
                            <span class="text-info font-weight-bold">${products.rows[i].Name}</span>
                            <p class="m-0"><span class="text-muted time">Product Name</span></p>
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-info">
                            <span class="text font-weight-normal">${products.rows[i].Category_Name}</span>
                            <p class="m-0"><span class="text-muted time">Category</span></p>
                        </div>
                    </td>

                    <td>
                        <div class="widget-26-job-info">
                            <span class="text font-weight-normal">${products.rows[i]["Weight/Volume"]}</span>
                            <p class="m-0"><span class="text-muted time">Unit Size </span></p>
                        </div>
                    </td>

                    <td>
                        <div class="widget-26-job-info">
                            <span class="text font-weight-normal">${products.rows[i].TotalQuantity}</span>
                            <p class="m-0"><span class="text-muted time">Quantity</span></p>
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-info">
                            <span class="text font-weight-normal"> ${products.rows[i]["Unit Price"]} &#2547</span>
                            <p class="m-0"><span class="text-muted time">Base Price</span></p>
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-info">
                            <span class="text font-weight-normal">${products.rows[i].Rating}</span>
                            <p class="m-0"><span class="text-muted time">Rating</span></p>
                        </div>
                    </td>`;

                    str = '';
                    str += `<td>
                    <div class="widget-26-job-starred">
                        <a href="">`;

                        let floatnum = parseFloat(products.rows[i].Rating);
                        floatnum = Math.floor(floatnum);

                        for(let j=1; j<=floatnum; j++){
                            str += `<svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-star starred"
                            >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>`;
                        }

                        for(let j=1;j<=(5-floatnum); j++){
                            str += `<svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-star"
                            >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>`;
                        }
                        str +=  `</a>
                        </div>
                        </td>`;
                        newChild.innerHTML += str;
                        table.appendChild(newChild);
                    }
            }
    }
}

init();
fetchProduct();
fetchCategories();