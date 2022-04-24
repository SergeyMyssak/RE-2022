
const container = document.getElementById("popup");
const content = document.getElementById("popup-content");
const closeBtn = document.getElementById("popup-close-btn");

const overlay = new ol.Overlay({
    element: container,
});

closeBtn.onclick = () => {
    overlay.setPosition(undefined);
    closeBtn.blur();
}

const map = new ol.Map({
    target: "map",
    layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
    overlays: [overlay],
    view: new ol.View({
        center: [-74.5, 34],
        zoom: 9
    })
});

map.on("singleclick", ({ coordinate }) => {
    const hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));

    overlay.setPosition(coordinate);
    content.innerHTML = `<p>You clicked here: <br/>${hdms}</p>`
});