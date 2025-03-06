var table = document.getElementById("table");
let dis_sum = document.getElementById("sum");

async function loadandParseCSV() {
  try {
    let response = await fetch("./service_usages.csv");
    let csvText = await response.text();
    let data = parseCSVToObjects(csvText);
    cre(data);
  } catch (error) {
    console.error("Ошибка загрузки CSV:", error);
  }
}

function parseCSVToObjects(csvString) {
  let lines = csvString.trim().split("\n");
  let headers = [
    "username",
    "workspace_title",
    "api_token_name",
    "usage_duration_in_ms",
    "usage_started_at",
    "service_name",
    "service_cost_per_ms",
  ];
  let result = [];

  for (let i = 1; i < lines.length; i++) {
    let values = lines[i].split(",").map((v) => v.replace(/"/g, "").trim());
    let obj = {};

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[j];
    }

    result.push(obj);
  }

  return result;
}

function cre(smth) {
  let sum = 0;
  for (let i = 0; i < smth.length; i++) {
    let tr = document.createElement("tr");

    tr.innerHTML = `
            <th>${smth[i].workspace_title}</th>
            <th>${smth[i].api_token_name}</th>
            <th>${smth[i].usage_duration_in_ms}</th>
            <th>${smth[i].usage_started_at}</th>
            <th>${smth[i].service_name}</th>
            <th>${smth[i].service_cost_per_ms}</th>
        `;

    let duration = parseFloat(smth[i].usage_duration_in_ms);
    let cost = parseFloat(smth[i].service_cost_per_ms);

    if (!isNaN(duration) && !isNaN(cost)) {
      sum += duration * cost;
    }

    table.appendChild(tr);
  }

  dis_sum.innerHTML = sum;
}

loadandParseCSV();
