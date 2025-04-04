let itemsPerPage = 10;
const totalItems = 20; // Total number of items

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
    res.innerHTML = showProductDetails(1);
}

const productDetails = (start, end) => {
    const length = end - start;
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
        ${Array.from({ length: length }, (_, i) => {
        const index = start + i + 1;
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

const navigateToPage = (page) => {
    const maxPage = Math.ceil(totalItems / itemsPerPage);
    return `
                <ul class="pagination">
                    <li class="page-item ${page === 1 ? 'disabled' : ''}">
                        <a class="page-link" href="#" onclick="showPage(${page-1});">Previous</a>
                    </li>
        ${Array.from({ length: maxPage }, (_, i) => {
        const index = i + 1;
        return index === page ?
            `
                    <li class="page-item active" aria-current="page">
                        <a class="page-link" href="#" onclick="showPage(${index});">${index}</a>
                    </li>`:
            `
                    <li class="page-item">
                        <a class="page-link" href="#" onclick="showPage(${index});">${index}</a>
                    </li>` ;
    }).join('')}
                    <li class="page-item ${page === maxPage ? 'disabled' : ''}">
                        <a class="page-link" href="#" onclick="showPage(${page+1});">Next</a>
                    </li>
                </ul>
    `;
}

const showProductDetails = (page) => {
    const start = (page - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, totalItems);
    return productDetails(start, end);
}

const showPage = (page) => {
    document.getElementById("productList").innerHTML = showProductDetails(page);
    document.getElementById("nav").innerHTML = navigateToPage(page);
}

const reset = () => {
    document.getElementById("searchError").innerHTML = ``;
    showPage(1);
}

(()=>{reset()})()