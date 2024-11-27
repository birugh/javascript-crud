var selectedRow = null;

function onFormSubmit(e) {
    event.preventDefault();
    var formData = readFormData();
    if (selectedRow == null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
}

function readFormData() {
    var formData = {};
    formData["platKendaraan"] = document.getElementById("platKendaraan").value;
    formData["namaPemilik"] = document.getElementById("namaPemilik").value;
    formData["merek"] = document.getElementById("merek").value;
    const jenisMobilSelect = document.getElementById("jenisMobil");
    formData["jenisMobil"] = jenisMobilSelect.options[jenisMobilSelect.selectedIndex].text;
    const kerusakanSelect = document.getElementById("kerusakan");
    formData["kerusakan"] = kerusakanSelect.options[kerusakanSelect.selectedIndex].text;
    formData["biaya"] = document.getElementById("biaya").value;
    return formData;
}


function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    newRow.insertCell(0).innerHTML = data.platKendaraan;
    newRow.insertCell(1).innerHTML = data.namaPemilik;
    newRow.insertCell(2).innerHTML = data.merek;
    newRow.insertCell(3).innerHTML = data.jenisMobil;
    newRow.insertCell(4).innerHTML = data.kerusakan;
    newRow.insertCell(5).innerHTML = data.biaya;
    newRow.insertCell(6).innerHTML = `<button onClick="onEdit(this)" class="edit">Edit</button> <button onClick="onDelete(this)" class="delete">Delete</button>`;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("platKendaraan").value = selectedRow.cells[0].innerHTML;
    document.getElementById("namaPemilik").value = selectedRow.cells[1].innerHTML;
    document.getElementById("merek").value = selectedRow.cells[2].innerHTML;
    const jenisMobilDropdown = document.getElementById("jenisMobil");
    for (let i = 0; i < jenisMobilDropdown.options.length; i++) {
        if (jenisMobilDropdown.options[i].text === selectedRow.cells[3].innerHTML) {
            jenisMobilDropdown.value = jenisMobilDropdown.options[i].value;
            break;
        }
    }

    const kerusakanDropdown = document.getElementById("kerusakan");
    for (let i = 0; i < kerusakanDropdown.options.length; i++) {
        if (kerusakanDropdown.options[i].text === selectedRow.cells[4].innerHTML) {
            kerusakanDropdown.value = kerusakanDropdown.options[i].value;
            break;
        }
    }
    // document.getElementById("biaya").value = selectedRow.cells[5].innerHTML;
    document.getElementById("biaya").value = selectedRow.cells[5].innerHTML.replace(/\./g, "");
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.platKendaraan;
    selectedRow.cells[1].innerHTML = formData.namaPemilik;
    selectedRow.cells[2].innerHTML = formData.merek;
    selectedRow.cells[3].innerHTML = formData.jenisMobil;
    selectedRow.cells[4].innerHTML = formData.kerusakan;
    selectedRow.cells[5].innerHTML = formData.biaya;
}

function onDelete(td) {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        row = td.parentElement.parentElement;
        document.getElementById("storeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function resetForm() {
    document.getElementById("platKendaraan").value = '';
    document.getElementById("namaPemilik").value = '';
    document.getElementById("merek").value = '';
    document.getElementById("jenisMobil").value = '';
    document.getElementById("kerusakan").value = '';
    document.getElementById("biaya").value = '';
    selectedRow = null;
}

function calculateBiaya() {
    const jenisMobil = parseInt(document.getElementById("jenisMobil").value);
    const kerusakan = parseInt(document.getElementById("kerusakan").value);

    const totalBiaya = jenisMobil + kerusakan;

    document.getElementById("biaya").value = totalBiaya.toLocaleString('id-ID');
}

function resetBiaya() {
    document.getElementById("biaya").value = "";
}
