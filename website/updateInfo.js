// script.js
document.addEventListener('DOMContentLoaded', function() {
    /* 
    function updateAirPressure() {
        // Simulate fetching new data
        document.getElementById('airPressure').textContent = `${28 + Math.random()} KPa`;
    }

    function updateWaveHeight() {
        // Simulate fetching new data
        document.getElementById('waveHeight').textContent = `${1 + Math.random().toFixed(2)} m`;
    }
    */
    function addUpdate() {
        let updates = document.getElementById('updateList');
        let newUpdate = document.createElement('li');
        newUpdate.textContent = `New update at ${new Date().toLocaleTimeString()}\n`;
        updates.appendChild(newUpdate);
    }

    //setInterval(updateAirPressure, 5000); // Update air pressure every 5 seconds
    //setInterval(updateWaveHeight, 5000); // Update wave height every 5 seconds
    setInterval(addUpdate, 10000); // Add new update every 10 seconds
});
