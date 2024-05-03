// sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
const sheetId = "1-F8nYTU8w1TFZgpZv1x5V9FatVYM7CsaZ_DzSqMXqfI";
// sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
const sheetName = encodeURIComponent("Sheet1");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

$.ajax({
  type: "GET",
  url: sheetURL,
  dataType: "text",
  success: function (response) {
    // var data = $.csv.toArrays(response);
    var data = $.csv.toObjects(response);
    
    // [Note]: 'data' is an Array of Objects
    console.log(data);
    
    // ADD CODE FOR WEBPAGE
    document.cookie = data;
    
    // Iterate through each object in the array
    // console.log("Object name: " + data[0]["釣到魚"]);
    data.forEach(function(obj) {
      // Access the "釣到魚" property of each object
      console.log(obj["釣到魚"]);
    });
  },
});

function catchFish(DOMelement){
  

}