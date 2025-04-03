const searchByOrderId = () => {

    const input = document.getElementById("searchOrderId").value;
    const res = document.getElementById("salesReport");

    if (input === "") {
        res.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Please enter a valid order ID.
            </div>
        `;
        return;
    }

    res.innerHTML = `
                <div class="table-responsive" id="salesReport">
                    <table class="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Image</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total amount</th>
                        </tr>
                        </thead>
                        <tbody>
        ${Array.from({ length: 10 }, (_, i) => {
            const index = i + 1;
            const quantity = index * 10;
            const amount = (quantity * 100).toLocaleString();
            return `
                        <tr>
                            <td>${index}</td>
                            <td>Toy ${index}</td>
                            <td><img alt="${index}" height="100" src="./img/${index}.jpg" width="100"></td>
                            <td>${quantity}</td>
                            <td>$ ${amount}.00</td>
                        </tr>
            `;
        }).join('')}
                        <tr>
                            <td colspan="4"><p class="text-end h5">Total amount: </p></td>
                            <td>$ 55,000.00</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
    `;
}