import random
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .Weather import save_all_positions_weather_info


@require_GET
def main_api(request, lat, lon):
    # create an array to store the response from AI model
    positions_info = []

    # call the save_all_positions_weather_info function
    info = save_all_positions_weather_info(float(lat), float(lon))

    # loop through the number of positions and added the info to positions_info
    for i, point in enumerate(info):
        position_info = {
            "id": i,
            "depth": info[i]["stop_ocean_depth"],
            "latitude": info[i]["stop_latitude"],
            "longitude": info[i]["stop_longitude"],
            # random number of tonnes until the model gets
            "tonnes": round(random.uniform(0, 40), 2)
        }

        positions_info.append(position_info)

    return JsonResponse(positions_info, safe=False)

