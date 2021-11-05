

(function ($) {
    function RetailLocalizer() {
        var temp = $('.googleMap1.googleMap').attr('data-type');
        var temp2 = $('.googleMap1.googleMap').attr('data-site');
        this.apiBaseData = {
            "request": {
                "SiteName": temp2,
                "DataType": temp
            }
        }
        this.request = null;
    }

    RetailLocalizer.prototype.api = function (url, data) {
        data = $.extend(true, this.apiBaseData, { request: data });
        if (this.request) {
            this.request.abort();
        }
        return this.request = $.ajax({
            url: url,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json'
        });
    }

    RetailLocalizer.prototype.getByZipCode = function (code, done, key, radious, searchByRadius) {
        return this.api('/Handlers/GoogleMap.asmx/GetGoogleMapPointsByZipCode', { ZipCode: code, ApiKey: key, Radious: radious, SearchByRadius: searchByRadius }).done(done);
    }

    RetailLocalizer.prototype.getByRegionCity = function (region, city, done, key, radious, searchByRadius) {
        return this.api('/Handlers/GoogleMap.asmx/GetGoogleMapPointsByRegionAndCity', { Region: region, City: city, ApiKey: key, Radious: radious, SearchByRadius: searchByRadius }).done(done);
    }

    RetailLocalizer.prototype.getCities = function (region, done) {
        return this.api('/Handlers/GoogleMap.asmx/GetCities', { Region: region }).done(done);
    }
    RetailLocalizer.prototype.getByCity = function (city, done, key, radious, searchByRadius) {
        return this.api('/Handlers/GoogleMap.asmx/GetGoogleMapPointsByCity', { City: city, ApiKey: key, Radious: radious, SearchByRadius: searchByRadius }).done(done);
    }
    RetailLocalizer.prototype.getBypoint = function (longi, lat, radius, done) {
        return this.api('/Handlers/GoogleMap.asmx/GetGoogleMapPoints', { Longitude: longi, Latitude: lat, SearchRadious: radius }).done(done);
    }
    var retailLoc = new RetailLocalizer();


    var controller = {
        elements: {
            $container: $('.googleMap1.googleMap'),
            $formZip: $('.googleMap1 .filterZip'),
            $inputZip: $('.googleMap1 #target'),
            $formRegionCity: $('.googleMap1 .filterCity'),
            $inputRegion: $('.googleMap1 #AreaDropDown'),
            $inputCity: $('.googleMap1 #CityDropDown'),
            $results: $('.googleMap1 .google-search-result'),
            $resultsList: $('.googleMap1 .google-search-result ul'),
            $map: $('.googleMap1 #map-canvas'),
            $defaultMarkers: eval($('.googleMap1.googleMap').attr('data-markers')),
            $center: $('.googleMap1.googleMap').attr('data-center'),
            $apiKey: $('.googleMap1.googleMap').attr('data-apikey'),
            $radius: $('.googleMap1.googleMap').attr('data-radius'),
            $searchByRadius: $('.googleMap1.googleMap').attr('data-search-by-radius'),
            $deafultZoom: 19,
            $highlightedIcon: $('.googleMap1.googleMap').attr('data-highlighted-icon'),
            $defaulttMarker: "/content/images/pozzi-ginori/marker.png"
        },
        fields: {
            $WebUrl: 'WebUrl',
            $ContactEmail: 'ContactEmail'
        },
        controls: {
            init: function () {
                var _this = this;

                //controller.elements.$map.hide();

                this.filterByZipCode();
                this.filterByRegionCity.init();
                this.thisLocation();
            },

            //filter by zip code
            filterByZipCode: function () {
                $('.filterZip [type=text]').keypress(function (e) {
                    if (e.which == 13) {
                        $('.filterZip [type=button]').trigger('click');
                    }
                });

                $('.filterZip [type=button]').on('click', function () {
                    //var code = controller.elements.$inputZip.val().trim();
                    var zipInput =  document.querySelector('.googleMap1 #target')
                    console.log(zipInput)
                    var code = zipInput.value.trim()
                    console.log(code)
                    if (code.length) {
                        retailLoc.getByZipCode(code, controller.controls.insertResults, controller.elements.$apiKey, controller.elements.$radius, controller.elements.$searchByRadius, controller.elements.$searchByRadius);
                    }
                });
            },
            thisLocation: function () {
                $('.googleMap1 .currLocation a').on('click', function () {
                    var temp = controller.elements.$container.attr('data-apikey');
                    var temp2;
                    $.post('https://www.googleapis.com/geolocation/v1/geolocate?key=' + temp, '', function (resp) {
                        if (controller.elements.$container.attr('data-radius')) {
                            temp2 = controller.elements.$container.attr('data-radius');
                        } else {
                            temp2 = 40;
                        }

                        retailLoc.getBypoint(resp.location.lng, resp.location.lat, temp2, controller.controls.insertResults)
                    });
                });
            },

            //filter by region/city
            filterByRegionCity: {
                init: function () {
                    this.updateCityInput();
                    this.submit();
                },

                updateCityInput: function () {
                    var $inputRegion = controller.elements.$inputRegion,
                        $inputCity = controller.elements.$inputCity;
                    //$inputCity.prop('disabled', true);
                    controller.elements.$inputRegion.on('change', function () {
                        var val = $(this).val();
                        $inputCity.find('option:gt(0)').remove();
                        if (val != -1) {
                            retailLoc.getCities(val, function (data) {
                                for (var i = 0; i < data.d.length; i++) {
                                    var city = data.d[i];
                                    $inputCity.append($('<option />').attr('value', city).text(city));
                                }
                            });
                            $inputCity.prop('disabled', false);
                        }
                        else $inputCity.prop('disabled', true);
                    });
                    $inputRegion.trigger('change');
                },

                submit: function () {
                    $('[type=button]', controller.elements.$formRegionCity).on('click', function () {
                        var region, city;

                        if (controller.elements.$container.attr('data-isregionenable') == true) {
                            region = controller.elements.$inputRegion.val().trim(),
                           city = controller.elements.$inputCity.val().trim();
                            if (city && (city != -1) && region && (region != -1)) {
                                retailLoc.getByRegionCity(region, city, controller.controls.insertResults, controller.elements.$apiKey, controller.elements.$radius);
                            }
                        } else {
                            city = controller.elements.$inputCity.val().trim();
                            if (city && (city != -1)) {
                                retailLoc.getByCity(city, controller.controls.insertResults, controller.elements.$apiKey, controller.elements.$radius, controller.elements.$searchByRadius);
                            }

                        }
                    });
                }
            },

            createURL: function (urlObject) {
                var url = urlObject.Value.replace(/ /g, "");
                var urlList = url.split(";");

                var divTag = $('<div>');

                $(urlList).each(function (index, value) {
                    if (value.indexOf('http://') >= 0)
                        value = value.replace('http://', '');

                    var aTag = $('<a/>',
                            {
                                target: "_blank",
                                href: 'http://' + value,
                                text: value
                            });
                    var pTag = $('<p>').append(aTag);
                    divTag.append(pTag);
                });

                return divTag;
            },

            createMail: function (mailObiect) {
                var mail = $("<a>").attr("href", "mailto:" + mailObiect.Value).text(mailObiect.Value);
                return mail;
            },

            removeElement: function(nodeList, elementName) {
                $(nodeList.childNodes).each(function (index, value) {
                    if(value.className === elementName){
                        nodeList.removeChild(nodeList.childNodes[index]);
                    }
                });
            },

            //insert results into list
            insertResults: function (data) {
                if (controller.elements.$container.attr('data-sortingoption') == 'Name') {

                    function compare(a, b) {
                        if (a.Name < b.Name)
                            return -1;
                        if (a.Name > b.Name)
                            return 1;
                        return 0;
                    }

                    data.d.sort(compare);

                }

                if (controller.map.markers != null)
                    controller.map.deleteMarkers();
                if (controller.map.infoWindows != null)
                    controller.map.deleteAllInfoWindows();

                var items = data.d;

                $('.counter').html(items.length);

                $('li:not(.template)', controller.elements.$resultsList).remove();
                for (var i = 0; i < items.length; i++) {
                    var item = items[i],

                    $el = $('li:first', controller.elements.$resultsList).clone(true).removeClass('template').data('lat', parseFloat(item.Latitude)).data('lng', parseFloat(item.Longitude));

                    $el = $el.data('lat', parseFloat(item.Latitude)).data('lng', parseFloat(item.Longitude));

                    if (item.Highlighted) {
                        $el.addClass('highlighted');
                        var url = controller.elements.$highlightedIcon;
                        if (url === null || url === undefined || url === '')
                            url = controller.elements.$defaulttMarker;
                        $el.find('.marker').prepend('<img id="Active marker" src="' + url + '" />');
                    }

                    $(item.SortFields).each(function (index, value) {
                        var p = $('<p>');

                        if (index == 0)
                            p.addClass('firstElement');

                        if (value.Value === "")
                            return;

                        if (value.ShowLabel) {
                            var label = $("<label>").text(value.Label + " ");
                            p.append(label);
                        }
                        if (value.ItemName == controller.fields.$WebUrl) {
                            var url = controller.controls.createURL(value);
                            p.append(url);
                        }
                        else if (value.ItemName == controller.fields.$ContactEmail) {
                            var email = controller.controls.createMail(value);
                            p.append(email);
                        }
                        else
                            p.append(value.Value);

                        $el.append(p);
                        if (value.PutEmptyLine)
                            $el.append($('<br/>'));
                    });

                    if (isNaN(parseFloat(item.Latitude)) || isNaN(parseFloat(item.Longitude)))
                        controller.controls.removeElement($el[0], 'see-on-map button');

                    controller.elements.$resultsList.append($el);

                    controller.map.addMarker($el, item.Highlighted);
                }
                if (controller.map.canAutoScale(items))
                    controller.map.autoScale();
                else {
                }

                var temp = $('.delRet');
                if (temp) {
                    temp.empty();
                }

                if (items.length > 0) {
                    controller.elements.$results.fadeIn(300);
                    controller.tools.scrollTo(controller.elements.$results);
                }
                else {
                    var text = "";

                    switch (controller.elements.$container.attr('data-type')) {
                        case 'Retailers':
                            text = $('.nr_retailers').text();
                            break;
                        case 'Installers':
                            text = $('.nr_installers').text();
                            break;
                        case 'ServicePoints':
                            text = $('.nr_servicepoints').text();
                            break;
                        default:
                    }

                    $('#map-canvas ').before('<p class="delRet"></br> ' + text + '</p>');
                }

                //AUTOHEIGHT BOX RETAILERS, GOOGLEMAP SEARCH
                (function () {
                    $(function () {
                        $('.google-search-result ul').each(function () {
                            $(this).children('li:not(.template)').matchHeight({
                                byRow: true
                            });
                        });
                    });
                })();
                //END

                if ($('.google-search-result ul li').length === 3) {
                    $('.google-search-result ul li:not(.template)').css('width', '48%');
                } else $('.google-search-result ul li:not(.template)').css('width', '31.3333%');
            }
        },

        map: {
            gmap: false,
            markers: [],
            infoWindows: [],
            init: function () {
                var _this = this;

                _this.initGmap();

                controller.elements.$resultsList.on('click', '.see-on-map', function () {
                    _this.showPoint($(this).closest('li'));
                    return false;
                });
            },

            initGmap: function () {

                if (this.gmap)
                    return;
                else {
                    if (controller.elements.$container.length < 1) {
                        this.gmap = true;
                        return;
                    }
                }

                var mapOptions = {
                    zoom: 4,
                    panControl: true,
                    zoomControl: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var $cont = controller.elements.$container;
                /*if ($cont.attr('data-center') && $cont.attr('data-center') !== '') {
                    var pos = $cont.attr('data-center').split(',');
                    mapOptions.center = new google.maps.LatLng(pos[0], pos[1]);
                }*/
                var latitude = parseFloat($cont.attr('data-center').split(",")[0]);
                var longitude = parseFloat($cont.attr('data-center').split(",")[1]);

                if (!isNaN(latitude) && !isNaN(longitude)) {
                    mapOptions.center = { lat: latitude, lng: longitude };
                }

                if ($cont.attr('data-zoom') && $cont.attr('data-zoom') !== '') {
                    mapOptions.zoom = parseInt($cont.attr('data-zoom'));
                }
                if ($cont.attr('data-controls') && $cont.attr('data-controls') !== '') {
                    mapOptions.panControl = $cont.attr('data-controls');
                    mapOptions.zoomControl = $cont.attr('data-controls');
                    mapOptions.mapTypeControl = $cont.attr('data-controls');
                    mapOptions.scaleControl = $cont.attr('data-controls');
                    mapOptions.streetViewControl = $cont.attr('data-controls');
                    mapOptions.overviewMapControl = $cont.attr('data-controls');
                }
                if ($cont.attr('data-mapType') && $cont.attr('data-mapType') !== '') {
                    var mapType = $cont.attr('data-mapType').toUpperCase();

                    if (mapType) {
                        mapOptions.mapTypeId = google.maps.MapTypeId[mapType];
                    }
                    /*
                    switch (mapType) {
                        case (mapType = 'ROADMAP'):
                            mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
                            break;
                        case (mapType = 'SATELLITE'):
                            mapOptions.mapTypeId = google.maps.MapTypeId.SATELLITE;
                            break;
                        case (mapType = 'HYBRID'):
                            mapOptions.mapTypeId = google.maps.MapTypeId.HYBRID;
                            break;
                        case (mapType = 'TERRAIN'):
                            mapOptions.mapTypeId = google.maps.MapTypeId.TERRAIN;
                            break;
                        default:
                    }*/
                }

                this.gmap = new google.maps.Map(controller.elements.$map[0], mapOptions);

                controller.map.addDeafoultMarkets(controller.elements.$defaultMarkers, this.gmap);

                controller.elements.$map.fadeIn(300);

            },

            showPoint: function ($item) {
                var _this = this,

                latLng = { lat: $item.data('lat'), lng: $item.data('lng') };

                var mrr = $.grep(_this.markers, function (element, index) {
                    return element.getPosition().lat().toFixed(7) === latLng.lat.toFixed(7) && element.getPosition().lng().toFixed(7) === latLng.lng.toFixed(7);
                });

                google.maps.event.trigger(mrr[0], 'click');

                controller.elements.$map.fadeIn(300);
                controller.tools.scrollTo();
            },

            addMarker: function (itm, isHighlighted) {
                var _this = this;

                var latLng = { lat: itm.data('lat'), lng: itm.data('lng') };

                if (isNaN(parseFloat(latLng.lat)) || isNaN(parseFloat(latLng.lng))) {
                    return;
                }

                var layout = $(itm).remove('button');
                layout = $('<div>' + $(layout).html() + '</div>');

                var infowindow = new google.maps.InfoWindow({
                    content: layout[0]
                });

                controller.map.infoWindows.push(infowindow);

                var iconUrl = controller.elements.$defaulttMarker;
                if (isHighlighted && controller.elements.$highlightedIcon !== undefined && controller.elements.$highlightedIcon !== '') {
                    iconUrl = controller.elements.$highlightedIcon;
                }

                var mark = new google.maps.Marker({
                    map: _this.gmap,
                    position: latLng,
                    icon: iconUrl
                });

                _this.markers.push(mark);

                google.maps.event.addListener(mark, "click", function () {
                    controller.map.closeAllInfoWindows();
                    infowindow.open(_this.gmap, this);
                });
            },

            canAutoScale: function (retailersList) {
                var results = $.grep(retailersList, function(value, index) {
                    return !isNaN(parseFloat(value.Latitude)) && !isNaN(parseFloat(value.Longitude));
                });
                if (results.length == 0)
                    return false;
                return true;
            },

            autoScale: function () {
                var bounds = new google.maps.LatLngBounds();

                $(controller.map.markers).each(function (index, value) {
                    bounds.extend(new google.maps.LatLng(value.getPosition().lat(), value.getPosition().lng()));
                });
                controller.map.gmap.fitBounds(bounds);
                if(controller.map.gmap.zoom > controller.elements.$deafultZoom)
                    controller.map.gmap.setZoom(controller.elements.$deafultZoom);
            },



            addDeafoultMarkets: function ($items, $map) {
                var _this = this;

                $($items).each(function () {
                    var currentMarker = this;
                    if (currentMarker.Image === null) return;

                    if (currentMarker.ContentId === undefined || currentMarker.ContentId === null) {
                        currentMarker.ContentId = 'div:nth-child(' + (i + 1) + ')[id=""]';
                    }
                    else {
                        currentMarker.ContentId = '#' + currentMarker.ContentId;
                    }

                    var markerTitle = $(this).find(currentMarker.ContentId + ' .title', $(this)).html();

                    if (currentMarker.Image.Src === '' || currentMarker.Image.Src === undefined || currentMarker.Image.Src === null) {
                        currentMarker.Image.Src = '/content/images/pozzi-ginori/marker.png';
                    }

                    var marker = new google.maps.Marker({
                        map: $map,
                        icon: currentMarker.Image.Src + "?mw=50&mh=50",
                        title: markerTitle,
                        position: new google.maps.LatLng(currentMarker.PositionX, currentMarker.PositionY)
                    });

                    controller.map.markers.push(marker);

                    var infowindow = new google.maps.InfoWindow({
                        content: currentMarker.Content
                    });

                    controller.map.infoWindows.push(infowindow);

                    google.maps.event.addListener(marker, "click", function () {
                        controller.map.closeAllInfoWindows();
                        infowindow.open(_this.gmap, marker);
                    });
                });
            },

            deleteMarkers: function () {
                for (var i = 0; i < controller.map.markers.length; i++) {
                    controller.map.markers[i].setMap(null);
                }
                controller.map.markers = [];
            },

            closeAllInfoWindows: function () {
                for (var i = 0; i < controller.map.infoWindows.length; i++) {
                    controller.map.infoWindows[i].close();
                }
            },

            deleteAllInfoWindows: function () {
                for (var i = 0; i < controller.map.infoWindows.length; i++) {
                    controller.map.infoWindows[i].setMap(null);
                }
                controller.map.infoWindows = [];
            }
        },

        tools: {
            scrollTo: function ($el, speed) {
                $el = $el || controller.elements.$map;
                speed = speed || 300;
                var eventsStop = 'mousewheel.ajaxGetContentScrollTo DOMMouseScroll.ajaxGetContentScrollTo';

                $('html,body').stop().animate({
                    scrollTop: $el.offset().top - Math.round($(window).height() * 0.1)
                }, speed, function () {
                    $(window).off(eventsStop);
                });

                $(window).on(eventsStop, function () {
                    $('html,body').stop(true);
                    $(window).off(eventsStop);
                });
            }
        }
    }

    window.addEventListener('DOMContentLoaded', function() {
        console.log('DOM fully loaded and parsed');
        window.initialize = function () {
            controller.map.init();
        };
        controller.controls.init();
    })


})(jQuery);
