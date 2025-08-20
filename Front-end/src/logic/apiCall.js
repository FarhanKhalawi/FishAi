/** send api request to the AI backend */
export const getPositions = async (lat, lon) => {
    try {
        const response = await fetch(`https://api.fish-ai.no/position/${lat}/${lon}`, { method: "GET" });
        const responseArray = await response.json();
        return responseArray.map(item => {
            return {
                ...item,
                id: (item.id + 1).toString()
            };
        });
    } catch (error) {
        alert(`Error fetching positions: ${error.message}`);
        throw error;
    }
};
