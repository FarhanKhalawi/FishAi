/* Generate dummy positions */
export const generateDummyData = (numRecords) => {
    let records = [];
    let id = 1;
    for (let i = 0; i < numRecords; i++) {
        let record = {
            id : id.toString(),
            latitude : Math.round( (Math.random() + 68) * 1000000 ) / 1000000,
            longitude : Math.round( (Math.random() * (13 - 11) + 11) * 1000000 ) / 1000000,
            depth : (Math.random() * 199 + 90).toFixed( 0 ),
            tonnes : (Math.random() * 4.9 + 0.1).toFixed( 2 )
        };
        records.push( record );
        id++;
    }
    return records;
}

/* Generate dummy history log */
export const generateDummyHistory = (numItems) => {
    let data = [];

    for (let i = 1; i <= numItems; i++) {
        const item = {
            id : i.toString(),
            day : Math.floor( Math.random() * 31 ) + 1,
            date : `${Math.floor( Math.random() * 12 ) + 1}.2023`,
            from : `Latitude: ${(Math.random() * (90 - (-90)) + (-90)).toFixed( 2 )}, Longitude: ${(Math.random() * (180 - (-180)) + (-180)).toFixed( 2 )}`,
            to : `Latitude: ${(Math.random() * (90 - (-90)) + (-90)).toFixed( 2 )}, Longitude: ${(Math.random() * (180 - (-180)) + (-180)).toFixed( 2 )}`,
            fishWeight : `${Math.floor( Math.random() * 10 ) + 1} kg`,
        };

        data.push( item );
    }
    return data;
}

/* Generate dummy graph data */
const generateDummyGraph = (num) => {
    let weight = [];
    for (let _ = 1; _ <= num; _++) {
        weight.push( Math.random() * 500 )
    }
    return weight;
}
export const generateDummyGraphData = (num) => {
    return {
        labels : ["week 1", "week 2", "week 3", "week 4"],
        datasets : [
            {
                data : generateDummyGraph( num )

            },
        ],
    };
}

/* Generate dummy date picker data */
export const extractAndSortDates = (num) => {
    const dataArray = generateDummyHistory(num);
    const datesArray = dataArray.map( item => item.date ) // extract date attribute
    const uniqueDatesArray = [...new Set( datesArray )] // remove duplicates
    return uniqueDatesArray.sort( (a, b) => {
        const dateA = new Date( `20${a.split( '.' )[1]}`, a.split( '.' )[0] - 1 )
        const dateB = new Date( `20${b.split( '.' )[1]}`, b.split( '.' )[0] - 1 )
        return dateB - dateA // sort from newest to oldest
    } )
}
