const searchByProductId = () => {

    const input = document.getElementById("searchProductId").value;
    const err = document.getElementById("searchError");
    const res = document.getElementById("productList");

    if (input === "") {
        err.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Please enter a valid product ID.
            </div>
        `;
        return;
    }

    err.innerHTML = ``;
    res.innerHTML = defaultProductDetails();
}

const reset = () => {
    document.getElementById("searchError").innerHTML = ``;
    document.getElementById("productList").innerHTML = defaultProductDetails();
}

const defaultProductDetails = () => {
    return `
                <div class="table-responsive">
                    <table class="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Product Image</th>
                            <th scope="col">Single cost</th>
                            <th scope="col">Details</th>
                        </tr>
                        </thead>
                        <tbody>
        ${Array.from({ length: 20 }, (_, i) => {
        const index = i + 1;
        const amount = ((index%2+1) * 10).toLocaleString();
        return `
                        <tr>
                            <td>${index}</td>
                            <td>Toy ${index}</td>
                            <td>Description of Toy ${index}</td>
                            <td><img alt="${index}" height="100" src="./img/${index}.jpg" width="100"></td>
                            <td>$ ${amount}.00</td>
                            <td>
                                <button class="btn btn-outline-secondary btn-sm" id="detailsButton${index}" type="submit">Details</button>
                            </td>
                        </tr>
            `;
    }).join('')}
                        </tbody>
                    </table>
                </div>
    `;
}

(()=>{reset()})()