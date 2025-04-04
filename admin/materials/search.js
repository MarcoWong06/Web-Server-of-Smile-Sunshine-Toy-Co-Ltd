let itemsPerPage = 10;
const totalItems = 30; // Total number of items

const searchByMaterialId = () => {

    const input = document.getElementById("searchMaterialId").value;
    const err = document.getElementById("searchError");
    const res = document.getElementById("materialList");

    if (input === "") {
        err.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Please enter a valid material ID.
            </div>
        `;
        return;
    }

    err.innerHTML = ``;
    res.innerHTML = showMaterialDetails(1);
}

const materialDetails = (start, end) => {
    const length = end - start;
    return `
                <div class="table-responsive">
                    <table class="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Physical Quantity</th>
                            <th scope="col">Reserved Quantity</th>
                            <th scope="col">Unit</th>
                            <th scope="col">Material Image</th>
                            <th scope="col">Re-order level</th>
                        </tr>
                        </thead>
                        <tbody>
        ${Array.from({ length: length }, (_, i) => {
        const index = start + i + 1;
        return `
                        <tr>
                            <td>${index}</td>
                            <td>Material ${index}</td>
                            <td>${10000+index*100}</td>
                            <td>${15000+index*100}</td>
                            <td>pices</td>
                            <td><img src="./img/${index}.jpeg" alt="${index}" width="100" height="100"></td>
                            <td>5000</td>
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

const showMaterialDetails = (page) => {
    const start = (page - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, totalItems);
    return materialDetails(start, end);
}

const showPage = (page) => {
    document.getElementById("materialList").innerHTML = showMaterialDetails(page);
    document.getElementById("nav").innerHTML = navigateToPage(page);
}

const reset = () => {
    document.getElementById("searchError").innerHTML = ``;
    showPage(1);
}

(()=>{reset()})()