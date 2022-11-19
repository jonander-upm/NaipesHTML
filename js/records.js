var xhr;

init();

function init() {
    xhr = new XMLHttpRequest();
    xhr.open("GET", "http://fenw.etsisi.upm.es:10000/records", true);
    xhr.responseType = "json";
    xhr.onload = paintTable;
    xhr.send();
}

function paintTable() {
    if(xhr.status === 200) {
        let tableElement = document.getElementById("tablaRecords");
        let recordNum = 1;
        for(let record of xhr.response) {
            let row = document.createElement("tr");
            addCell(row, recordNum);
            for(let cell in record) {
                let val = record[cell]
                if(cell === "recordDate") {
                    val = new Date(val).toLocaleDateString();
                }
                addCell(row, val);
            }
            tableElement.appendChild(row);
            recordNum++;
        }
    }
}

function addCell(row, value) {
    let recordNumCell = document.createElement("td");
    recordNumCell.innerHTML = value.toString();
    row.appendChild(recordNumCell);
}