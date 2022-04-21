let map;
let geocoder;
let address;
let addressPopup;
let marker;

const initMap = () => {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 9,
        center: { lat: 40, lng: -74.5 },
    });
    geocoder = new google.maps.Geocoder();
   
    address = document.createElement('p');
    address.id = "address";

    addressPopup = document.createElement('div');
    addressPopup.id = "addressPopup";
    addressPopup.appendChild(address);

    map.controls[google.maps.ControlPosition.LEFT_TOP].push(addressPopup);
    marker = new google.maps.Marker({ map });

    map.addListener("click", displayPopup);
}


const displayPopup = async ({ latLng }) => {
    clear();

    const data = await getPlaceName(latLng);

    marker.setPosition(data[0].geometry.location);
    marker.setMap(map);

    addressPopup.style.display = "block";
    address.innerText = data[0].formatted_address;
}
  
const getPlaceName = async (latLng) => {
    const data = await geocoder.geocode({ location: latLng });
    const { results } = data;

    return results;
}

const clear = () => {
    marker.setMap(null);
    addressPopup.style.display = "none";
    address.innerText = "";
}

window.initMap = initMap;