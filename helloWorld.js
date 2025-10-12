#!/usr/bin/env node
/**
 * Hello World - Places Data Example
 * A simple JavaScript/Node.js script demonstrating how to work with the places data.
 */

const fs = require('fs');

function parseCSV(csvContent) {
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index];
        });
        data.push(obj);
    }
    return data;
}

function helloWorld() {
    console.log("Hello World! Welcome to the Places Data Repository");
    console.log("=".repeat(50));
    
    // Read and display CSV data
    console.log("\nPlaces from CSV:");
    try {
        const csvContent = fs.readFileSync('places.csv', 'utf8');
        const places = parseCSV(csvContent);
        places.forEach(place => {
            console.log(`- ${place.name}: ${place.description}`);
            console.log(`  Coordinates: (${place.latitude}, ${place.longitude})`);
        });
    } catch (error) {
        console.log("places.csv not found!");
    }
    
    // Read and display GeoJSON data
    console.log("\nPlaces from GeoJSON:");
    try {
        const geojsonContent = fs.readFileSync('places.geojson', 'utf8');
        const data = JSON.parse(geojsonContent);
        data.features.forEach(feature => {
            const props = feature.properties;
            const coords = feature.geometry.coordinates;
            console.log(`- ${props.name}: ${props.description}`);
            console.log(`  Coordinates: (${coords[1]}, ${coords[0]})`); // lat, lon
        });
    } catch (error) {
        console.log("places.geojson not found!");
    }
}

if (require.main === module) {
    helloWorld();
}

module.exports = { helloWorld };