let itemsPerPage = 10;
const totalItems = 10; // Total number of items

const ORDER_ID = "order ID";
const CONTACT_NO = "contact no";

const orderDate = Array.from({length: totalItems}, (_, i) => new Date(2024, Math.floor((Math.random() * 12) + 1), Math.floor((Math.random() * 31) + 1)).toLocaleDateString('en-CA'));
const deliveryDate = Array.from({length: totalItems}, (_, i) => new Date(2024, i, 15).toLocaleDateString('en-CA'));
const customer = ["Eva", "Jack", "Chris", "Grace", "Ben", "Diana", "Amy", "Hank", "Frank", "Ivy"];
const contactNo = Array.from({length: totalItems}, (_, i) => 98000000 + i + 1);
const status = ["accepted", "accepted", "rejected", "accepted", "accepted", "accepted", "rejected", "accepted", "accepted", "accepted"];

let sortDirection = {}; // Track sort direction for each column

const sortTable = (columnIndex) => {
    const rows = Array.from({length: totalItems}, (_, i) => ({
        orderDate: orderDate[i],
        deliveryDate: deliveryDate[i],
        customer: customer[i],
        contactNo: contactNo[i],
        status: status[i],
        idx: i + 1
    }));

    const columnKeys = ["idx", "orderDate", "customer", "contactNo", "deliveryDate", "status"];
    const key = columnKeys[columnIndex];

    sortDirection[key] = !sortDirection[key]; // Toggle sort direction

    const table = document.getElementById("orderTable");

    rows.sort((a, b) => {
        if (a[key] < b[key]) return sortDirection[key] ? -1 : 1;
        if (a[key] > b[key]) return sortDirection[key] ? 1 : -1;
        return 0;
    });

    // Update table data
    table.innerHTML = `
        <table class="table table-striped table-sm">
            <thead>
            <tr>
            ${Array.from({length: 7}, (_, i) => {
        const col = ["#", "Order Date", "Customer", "Contact No.", "Delivery Date", "Order Status", "Details"][i];
        const isCurrentColumn = i === columnIndex;
        return `
                    <th scope="col">
                        ${col}
                        <a href="#" onclick="sortTable(${i})">
                        ${!isCurrentColumn ? `
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
                            </svg>` :
                        sortDirection[key] ? `
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                            </svg>` : `
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>`}
                        </a>
                    </th>
                `;
    }).join('')}
            </tr>
            </thead>
            <tbody>
            ${rows.map((row, i) => {
        const statusClass = row.status === "accepted" ? "bg-success" : "bg-danger";
        return `
                    <tr>
                        <td>${row.idx}</td>
                        <td>${row.orderDate}</td>
                        <td>${row.customer}</td>
                        <td>${row.contactNo}</td>
                        <td>${row.deliveryDate}</td>
                        <td><span class="badge ${statusClass}">${row.status}</span></td>
                        <td>
                            <button class="btn btn-outline-secondary btn-sm" id="detailsButton${i + 1}" type="submit">Details</button>
                        </td>
                    </tr>
                `;
    }).join('')}
            </tbody>
        </table>
    `;
};

const defaultOrderDetails = () => {
    return `
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                ${Array.from({length: 7}, (_, i) => {
        const col = ["#", "Order Date", "Customer", "Contact No.", "Delivery Date", "Order Status", "Details"][i];
        const columnKeys = ["idx", "orderDate", "customer", "contactNo", "deliveryDate", "status"];
        const key = columnKeys[i];
        const direction = sortDirection[key] ? 'up' : 'down';
        return `
                        <th scope="col">
                            ${col}
                            <a href="#" onclick="sortTable(${i})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                            </a>
                        </th>
                    `;
    }).join('')}
                </tr>
                </thead>
                <tbody>
                ${Array.from({length: 10}, (_, i) => {
        const idx = i + 1;
        const statusClass = status[i] === "accepted" ? "bg-success" : "bg-danger";
        return `
                        <tr>
                            <td>${idx}</td>
                            <td>${orderDate[i]}</td>
                            <td>${customer[i]}</td>
                            <td>${contactNo[i]}</td>
                            <td>${deliveryDate[i]}</td>
                            <td><span class="badge ${statusClass}">${status[i]}</span></td>
                            <td>
                                <button class="btn btn-outline-secondary btn-sm" id="detailsButton${idx}" type="submit">Details</button>
                            </td>
                        </tr>
                    `;
    }).join('')}
                </tbody>
            </table>
    `;
}

const search = (searchBy) => {
    const input =
        searchBy === ORDER_ID ?
            document.getElementById("searchOrderId") :
            document.getElementById("searchPhone");

    const res =
        searchBy === ORDER_ID ?
            document.getElementById("searchOrderIdError") :
            document.getElementById("searchPhoneError");

    if (input.value === "") {
        res.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Please enter a valid order ID.
            </div>
        `;
        return;
    }

    const table = document.getElementById("orderTable");
    table.innerHTML = defaultOrderDetails();
}

const reset = () => {
    document.getElementById("searchOrderIdError").innerHTML = ``;
    document.getElementById("searchPhoneError").innerHTML = ``;
    document.getElementById("orderTable").innerHTML = defaultOrderDetails();
}

(() => {
    reset();
})();
