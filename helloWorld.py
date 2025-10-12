#!/usr/bin/env python3
"""
Hello World - Places Data Example
A simple Python script demonstrating how to work with the places data.
"""

import csv
import json

def hello_world():
    """Simple hello world function that displays places data."""
    print("Hello World! Welcome to the Places Data Repository")
    print("=" * 50)
    
    # Read and display CSV data
    print("\nPlaces from CSV:")
    try:
        with open('places.csv', 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                print(f"- {row['name']}: {row['description']}")
                print(f"  Coordinates: ({row['latitude']}, {row['longitude']})")
    except FileNotFoundError:
        print("places.csv not found!")
    
    # Read and display GeoJSON data
    print("\nPlaces from GeoJSON:")
    try:
        with open('places.geojson', 'r', encoding='utf-8') as file:
            data = json.load(file)
            for feature in data['features']:
                props = feature['properties']
                coords = feature['geometry']['coordinates']
                print(f"- {props['name']}: {props['description']}")
                print(f"  Coordinates: ({coords[1]}, {coords[0]})")  # lat, lon
    except FileNotFoundError:
        print("places.geojson not found!")

if __name__ == "__main__":
    hello_world()