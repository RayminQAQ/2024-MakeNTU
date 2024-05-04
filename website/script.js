/* Variables: Google map */
let map_long = "25.0236", map_lat = "121.3337";


/* Variables: Google style sheet */
// sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
const sheetId = "1-F8nYTU8w1TFZgpZv1x5V9FatVYM7CsaZ_DzSqMXqfI";
// sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
const sheetName = encodeURIComponent("Sheet1");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

const excelToID = { 
  "釣到魚" : "isCatchFish", 
  "魚鏢距離 (GPS經度)" : "hook_distance_lat",
  "魚鏢距離 (GPS緯度)" : "hook_distance_long",
  "溫度" : "temperature",
  "濕度" : "humid",
  "大氣壓" : "airPressure",
  "海浪(x, y軸)" : "wave_xy",
  "波浪(z軸辨識計算)" : "wave_z",
}

/* Google style sheet */
function loadData() {
  $.ajax({
      type: "GET",
      url: sheetURL,
      dataType: "text",
      success: function (response) {
        var data = $.csv.toObjects(response);
        data = data[0]; // csv format into object

        // Iterate through each object in the array
        console.log("GET: ", data);

        for (const key in data) {
          console.log(`Update -> ${key}: ${data[key]} (id=${excelToID[key]})`);
          id = document.getElementById(excelToID[key]);
          id.textContent = data[key];

          // Update
          if("魚鏢距離 (GPS經度)" == key){map_long = data[key]}
          else if("魚鏢距離 (GPS緯度)" == key){map_lat = data[key]}
        }
      },
      error: function (error) {
          console.error("Error loading data: ", error);
      }
  });
}

/* Google map */
function initMap() {
  let YOUR_LAT = map_long; // 使用你想要的緯度值
  let YOUR_LON = map_lat; // 使用你想要的經度值
  let mapSrc = `https://maps.google.com/maps?q=${YOUR_LAT},${YOUR_LON}&hl=es&z=14&amp;output=embed`;
  document.getElementById("googleMap").innerHTML = `
    <iframe src="${mapSrc}" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
  `;
}

loadData();
initMap();

setInterval(loadData, 3000);
setInterval(initMap, 3000);