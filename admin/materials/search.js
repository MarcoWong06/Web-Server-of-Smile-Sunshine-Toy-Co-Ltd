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
    res.innerHTML = defaultMaterialDetails();
}

const reset = () => {
    document.getElementById("searchError").innerHTML = ``;
    document.getElementById("materialList").innerHTML = defaultMaterialDetails();
}

const defaultMaterialDetails = () => {
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
                            <th scope="col">Re-order level</th>
                        </tr>
                        </thead>
                        <tbody>
        ${Array.from({ length: 30 }, (_, i) => {
        const index = i + 1;
        return `
                        <tr>
                            <td>${index}</td>
                            <td>Material ${index}</td>
                            <td>${10000+index*100}</td>
                            <td>${15000+index*100}</td>
                            <td>pices</td>
                            <td>5000</td>
                        </tr>
            `;
    }).join('')}
                        </tbody>
                    </table>
                </div>
    `;
}

(()=>{reset()})()