import random


# =============================================================================================
# Create four positions from the current position: One north, one south, one west and one east
# =============================================================================================
def create_four_positions(lat, lon):
    # the positions are 5-8 km from the current position
    lat_north = round(lat + random.uniform(0.05, 0.1), 4)
    lon_north = lon

    lat_south = round(lat - random.uniform(0.05, 0.1), 4)
    lon_south = lon

    lat_west = lat
    lon_west = round(lon + random.uniform(0.1, 0.2), 4)

    lat_east = lat
    lon_east = round(lon - random.uniform(0.1, 0.2), 4)

    # Return a list of the four points
    return [(lat_north, lon_north), (lat_south, lon_south), (lat_west, lon_west), (lat_east, lon_east)]


# ===========================================================
# Create random number of positions from the current position
# ===========================================================
def creat_many_positions(lat, lon):
    # generate a random number of positions between 2 and 10
    number_of_positions = random.randint(2, 10)

    # create an array to store the positions
    positions = []

    # loop through the number of positions
    for i in range(number_of_positions):
        position = (round(lat + random.uniform(-0.1, 0.1), 4),
                    round(lon + random.uniform(-0.1, 0.1), 4))

        # add the position to the positions array
        positions.append(position)

    # return the positions array
    return positions
