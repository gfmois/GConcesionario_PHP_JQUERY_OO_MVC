import { loadDetails } from './ShopController.js'

function initMap(data) {
    const intialCity = { // Ontinyent
        lat: 38.82374681367459,
        lng: -0.6071697584863179
    }

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: intialCity
    });

    $.each(data, function(index, dataCar) {
        let position = {
            lat: parseFloat(dataCar.lat),
            lng: parseFloat(dataCar.lng)
        }

        let nIcon = {
            url: dataCar.carUrl, // url
            scaledSize: new google.maps.Size(80, 50), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };

        let lIcon = {
            url: dataCar.carUrl, // url
            scaledSize: new google.maps.Size(130, 100), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        }

        const marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: nIcon
        })

        const infowindow = new google.maps.InfoWindow();

        marker.addListener('mouseover', function() {
            let apiURL = "https://api.bigdatacloud.net/data/reverse-geocode-client"
            let url = "?latitude=0&longitude=0&localityLanguage=en"
            let params = new URLSearchParams(url)

            params.set('latitude', position.lat)
            params.set('longitude', position.lng)

            apiURL += '?' + params.toString()

            ajaxPromise('GET', apiURL, 'json').then((response) => {
                // infowindow.setContent(response.locality + ', ' + response.countryCode)
                let infoBox = document.createElement('div')
                let infoCarTitle = document.createElement('div')
                let infoCarBodyType = document.createElement('div')
                let infoCarLocation = document.createElement('div')
                let infoCarLocationIcon = document.createElement('i')
                let infoCarBodyTypeIcon = document.createElement('i')

                infoBox.className = "infoBox"
                infoCarTitle.className = "infoCarTitle"
                infoCarBodyType.className = "infoCarBodyType"
                infoCarLocation.className = "infoCarLocation"

                infoCarLocationIcon.className = "fa-solid fa-location-dot"
                infoCarBodyTypeIcon.className = "fa-solid fa-car"

                infoCarTitle.appendChild(infoCarBodyTypeIcon)
                infoCarTitle.appendChild(document.createTextNode(' ' + dataCar.brand_name + ' ' + dataCar.model_name))
                infoCarLocation.appendChild(infoCarLocationIcon)
                infoCarLocation.appendChild(document.createTextNode(' ' + response.locality + ', ' + response.countryCode))

                infoBox.appendChild(infoCarTitle)
                infoBox.appendChild(infoCarBodyType)
                infoBox.appendChild(infoCarLocation)

                infowindow.setContent(infoBox)
            })

            infowindow.open(map, this);
        });

        marker.addListener('mouseout', function() {
            infowindow.close();
        });

        marker.addListener('click', function() {
            let itemsOfList = document.getElementById('shopList')
            while (itemsOfList.firstChild) {
                itemsOfList.removeChild(itemsOfList.lastChild);
            }
            loadDetails(dataCar.id)
        })

        marker.set('idCar', dataCar.vin_number)

        $('#' + dataCar.vin_number).mouseenter(function() {
            if ($(this).attr('id') == marker.get('idCar')) {
                marker.setIcon(lIcon)
                map.panTo(marker.position);
            }
        })

        $('#' + dataCar.vin_number).mouseleave(function() {
            if ($(this).attr('id') == marker.get('idCar')) {
                marker.setIcon(nIcon)
                map.panTo(intialCity)
            }
        })
    });
}

export { initMap }