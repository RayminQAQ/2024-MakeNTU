/* Variables: Google map */
let map_long = "25.0436950";
let map_lat = "121.15599800";

/* Variables: Google style sheet */
// sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
const sheetId = "1-F8nYTU8w1TFZgpZv1x5V9FatVYM7CsaZ_DzSqMXqfI";
// sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
const sheetName = encodeURIComponent("Sheet1");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

const excelToID = {
  "X加速度": "x-acceleration",
  "X旋轉": "x-rotation",
  "Y加速度": "y-acceleration",
  "Y旋轉": "y-rotation",
  "Z加速度": "z-acceleration",
  "Z旋轉": "z-rotation",
  "有魚": "isCatchFish",
  "氣壓": "airPressure",
  "溫度": "temperature",
  "經度": "hook_distance_lat",
  "緯度": "hook_distance_long",
}


/* Google style sheet */
function convertToDD(decimalDegrees) {
  let seperated = decimalDegrees.split(".");
  return seperated[0] + "." + seperated[1] + seperated[2];
}

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
          // console.log(`Update -> ${key}: ${data[key]} (id=${excelToID[key]})`);
          id = document.getElementById(excelToID[key]);
          id.textContent = data[key];

          // Update key
          switch(key){
            case "經度":
              map_long = convertToDD(data[key]);
              id.textContent = map_long + " °N";
              break;
            case "緯度":
              map_lat = convertToDD(data[key]);
              id.textContent = map_lat + " °E";
              break; 
           case "有魚":
              let text = "沒有";
              if(data[key] === "1"){text = "有"};
              id.textContent = text;
              break;
            case "溫度":
              id.textContent = id.textContent + " °C";
              break; 
            case "X加速度":
            case "Y加速度":
            case "Z加速度":
              id.textContent = key + ": " + id.textContent + " m/s^2";
              break; 
            case "X旋轉":
            case "Y旋轉":
            case "Z旋轉":
              id.textContent = key + ": " + id.textContent + "°";
              break; 
            case "氣壓":
              id.textContent = id.textContent + " hPa";
              break;
          }
        }
      },
      error: function (error) {
          console.error("Error loading data: ", error);
      }
  });
}

/* Google map */
/* 
function initMap() {
  let YOUR_LAT = map_long;
  let YOUR_LON = map_lat;
  let mapSrc = `https://maps.google.com/maps?q=${YOUR_LAT},${YOUR_LON}&hl=es&z=14&amp;output=embed`;
  document.getElementById("googleMap").innerHTML = `
    <iframe src="${mapSrc}" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
  `;

  console.log("Map: " + YOUR_LAT + " " + YOUR_LON);
}
*/
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("googleMap"), {
    center: { lat: map_lat, lng: map_long },
    zoom: 8,
  });
}

loadData();
initMap();

setInterval(loadData, 3000);
setInterval(initMap, 3000);