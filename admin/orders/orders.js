const ORDER_ID = "order ID";
const CONTACT_NO = "contact no";

const defaultOrderDetails = () => {
    return `
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                ${Array.from({ length:7 }, (_, i) => {
                    const col = ["#", "Order Date", "Customer", "Contact No.", "Delivery Date", "Order Status", "Details"][i];
                    return `
                        <th scope="col">${col}</th>
                    `;
                }).join('')}
                </tr>
                </thead>
                <tbody>
                ${Array.from({ length: 10}, (_, i) => {
                    const idx = i + 1;
                    const orderDate = new Date(2024, i, 1).toLocaleDateString('en-GB');
                    const deliveryDate = new Date(2024, i, 15).toLocaleDateString('en-GB');
                    const customer = ["Amy", "Ben", "Chris", "Diana", "Eva", "Frank", "Grace", "Hank", "Ivy", "Jack"][i];
                    const contactNo = `9800000${idx}`;
                    const status = ["accepted", "accepted", "rejected", "accepted", "accepted", "accepted", "rejected", "accepted", "accepted", "accepted"][i];
                    const statusClass = status === "accepted" ? "bg-success" : "bg-danger";
                    return `
                        <tr>
                            <td>${idx}</td>
                            <td>${orderDate}</td>
                            <td>${customer}</td>
                            <td>${contactNo}</td>
                            <td>${deliveryDate}</td>
                            <td><span class="badge ${statusClass}">${status}</span></td>
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

(() => { reset(); })();
