ymaps.ready(init);

function init() {
    let myPlacemark;

    const myMap = new ymaps.Map('map', {
      center: [55.753994, 37.622093],
      zoom: 9
    });

    myMap.events.add('click', function (e) {
      var coords = e.get('coords');

      if (myPlacemark) {
          myPlacemark.geometry.setCoordinates(coords);
      }

      else {
          myPlacemark = createPlacemark(coords);
          myMap.geoObjects.add(myPlacemark);

          myPlacemark.events.add('dragend', function () {
              getAddress(myPlacemark.geometry.getCoordinates());
          });
      }

      getAddress(coords);
    });

    const createPlacemark = (coords) => {
        return new ymaps.Placemark(coords, {
            iconCaption: 'Поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }

    const getAddress = (coords) => {
        myPlacemark.properties.set('iconCaption', 'Поиск...');

        ymaps.geocode(coords).then(function (res) {
          var firstGeoObject = res.geoObjects.get(0);

          myPlacemark.properties
              .set({
                  iconCaption: firstGeoObject.getAdministrativeAreas(),
                  balloonContent: firstGeoObject.getAddressLine()
              });
        });
    }
}
