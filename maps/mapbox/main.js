mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2V5bXlzc2FrIiwiYSI6ImNsMXU5cHl5dTFpd2Iza3B0NWtnODRic2UifQ.fFtF5hCMrZXS-6pYiGqnKQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.5, 40],
    zoom: 9,
});

const getPlaceName = async (lngLat) => {
    try {
        const { lat, lng } = lngLat;
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`;

        const res = await fetch(url);
        const data = await res.json();

        return data;
    } catch(error) {
        console.log(error);
    }
}

const displayPopup = async ({ lngLat }) => {
    const data = await getPlaceName(lngLat);

    new mapboxgl.Popup()
        .setLngLat(data.query)
        .setHTML(data.features[0].place_name)
        .addTo(map);
}

map.on('click', displayPopup);