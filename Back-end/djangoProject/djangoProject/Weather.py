import random
import requests
from .Positions import creat_many_positions


# ========================================================================================================
# Function to get the weather condition for start position and the destination position (AI model input).
# Get weather from extern API (OpenWeatherMap.org).
# =========================================================================================================
def get_weather(lat_start, lon_start, lat_stop, lon_stop):
    api_key = "45ac42a90a7c6fc2df51e4f33461e914"
    url_start = f"https://api.openweathermap.org/data/2.5/weather?lat={lat_start}&lon={lon_start}&appid={api_key}&units=metric"
    url_stop = f"https://api.openweathermap.org/data/2.5/weather?lat={lat_stop}&lon={lon_stop}&appid={api_key}&units=metric"

    response_start = requests.get(url_start)
    response_stop = requests.get(url_stop)

    if response_start.status_code == 200 and response_stop.status_code == 200:

        data_start = response_start.json()
        data_stop = response_stop.json()

        return {
            "start_latitude": lat_start,
            "start_longitude": lon_start,
            "start_ocean_depth": round(random.uniform(200, 300), 2),
            "clouds_start": data_start["clouds"]["all"],
            "start_air_temp": data_start["main"]["temp"],
            "start_air_pressure": data_start["main"]["pressure"],
            "start_humidity_state": data_start["main"]["humidity"],
            "start_wind_speed": data_start["wind"]["speed"],
            "start_wind_direction": data_start["wind"]["deg"],
            "stop_latitude": lat_stop,
            "stop_longitude": lon_stop,
            "stop_ocean_depth": round(random.uniform(200, 300), 2),
            "clouds_stop": data_stop["clouds"]["all"],
            "stop_air_temp": data_stop["main"]["temp"],
            "stop_air_pressure": data_stop["main"]["pressure"],
            "stop_humidity_state": data_stop["main"]["humidity"],
            "stop_wind_speed": data_stop["wind"]["speed"],
            "stop_wind_direction": data_stop["wind"]["speed"],
        }

    else:
        return "Error!"


# ========================================================================================================
# Function to save the weather info for all positions in array.
# =========================================================================================================
def save_all_positions_weather_info(lat, lon):
    # create an array to store the positions weather info
    positions_info = []

    # generate a random number of positions and store it in positions variable
    positions = creat_many_positions(lat, lon)

    # loop through the number of positions and get weather
    for i, point in enumerate(positions):
        weather = get_weather(lat, lon, positions[i][0], positions[i][1])

        positions_info.append(weather)

    return positions_info
