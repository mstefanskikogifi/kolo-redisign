

(function ($) {
    function RetailLocalizer2() {
        var temp = $('.googleMap2.googleMap').attr('data-type');
        var temp2 = $('.googleMap2.googleMap').attr('data-site');
        this.apiBaseData = {
            "request": {
                "SiteName": temp2,
                "DataType": temp
            }
        }
        this.request = null;
    }

    RetailLocalizer2.prototype.api = function (url, data) {
        var data2 = $.extend(true, {}, this.apiBaseData, { request: data });
        if (this.request) {
            this.request.abort();
        }
        return this.request = $.ajax({
            url: url + "?" + Date.now(),
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data2),
            dataType: 'json'
        });
    }

    RetailLocalizer2.prototype.getByZipCode = function (code, done, key, radious, searchByRadius) {
        return this.api('/Handlers/GoogleMap20.asmx/GetGoogleMapPointsByZipCode', { ZipCode: code, ApiKey: key, Radious: radious, SearchByRadius: searchByRadius }).done(done);
    }

    RetailLocalizer2.prototype.getByRegionCity = function (region, city, done, key, radious, searchByRadius, retailerTypes, cityName) {
        if (controller.tools.equalsStr(cityName, controller.elements.$inputCityLabel)) {
            citiName = "";
        }

        return this.api('/Handlers/GoogleMap20.asmx/SearchGoogleMapPointsByRegionAndCity', { Region: region, City: city, SearchCityName: cityName, ApiKey: key, Radious: radious, SearchByRadius: searchByRadius, RetailerTypes: retailerTypes }).done(done);
    }

    RetailLocalizer2.prototype.getCities = function (region, done) {
        return this.api('/Handlers/GoogleMap20.asmx/GetCities', { Region: region }).done(done);
    }

    RetailLocalizer2.prototype.getByCity = function (city, done, key, radious, searchByRadius, retailerTypes, cityName) {
        var rt = retailerTypes ? retailerTypes.slice() : null;
        if (controller.tools.equalsStr(cityName, controller.elements.$inputCityLabel)) {
            citiName = "";
        }
        return this.api('/Handlers/GoogleMap20.asmx/SearchGoogleMapPointsByCity', {
            City: city, SearchCityName: cityName, ApiKey: key, Radious: radious, SearchByRadius: searchByRadius, RetailerTypes: rt
        }).done(done);
    }

    RetailLocalizer2.prototype.search = function (searchData, done) {
        var request = $.extend(true, this.searchData, { ApiKey: key, Radious: radious, SearchByRadius: searchByRadius, });
        return this.api('/Handlers/GoogleMap20.asmx/Search', request).done(done);
    }

    RetailLocalizer2.prototype.getBypoint = function (longi, lat, radius, done, retailerTypes) {
        return this.api('/Handlers/GoogleMap20.asmx/GetGoogleMapPoints', { Longitude: longi, Latitude: lat, SearchRadious: radius, RetailerTypes: retailerTypes }).done(done);
    }

    var retailLoc = new RetailLocalizer2();


    var controller = {
        elements: {
            $container: $('.googleMap2.googleMap'),
            $formZip: $('.googleMap2 .filterZip'),
            $inputZip: $('.googleMap2 #target'),
            $formRegionCity: $('.googleMap2 .filterCity'),
            $formCityName: $('.googleMap2 .filterCityName'),
            $inputCityName: $('.googleMap2 .filterCityName [type=text]'),
            $inputCityLabel: $('.googleMap2 .filterCityName [type=text]').data('label'),
            $inputRegion: $('.googleMap2 #AreaDropDown'),
            $inputCity: $('.googleMap2 #CityDropDown'),
            $retailerTypeList: $(".googleMap2 .retailerTypesList"),
            $results: $('.googleMap2 .google-search-result'),
            $resultsList: $('.googleMap2 .google-search-result ul'),
            $map: $('.googleMap2 #map-canvas'),
            $defaultMarkers: eval($('.googleMap2.googleMap').attr('data-markers')),
            $retailerTypes: eval($('.googleMap2.googleMap').attr('data-retailer-types')),
            $center: $('.googleMap2.googleMap').attr('data-center'),
            $apiKey: $('.googleMap2.googleMap').attr('data-apikey'),
            $radius: $('.googleMap2.googleMap').attr('data-radius'),
            $searchByRadius: $('.googleMap2.googleMap').attr('data-search-by-radius'),
            $deafultZoom: 19,
            $highlightedIcon: $('.googleMap2.googleMap').attr('data-highlighted-icon'),
            $defaulttMarker: "/content/images/pozzi-ginori/marker.png",
            Long: 0.0,
            Lat: 0.0,
        },
        fields: {
            $WebUrl: 'WebUrl',
            $ContactEmail: 'ContactEmail',
            $ShowroomUrl: 'ShowroomUrl',
        },
        controls: {
            init: function () {
                var _this = this;

                //controller.elements.$map.hide();
                controller.elements.$formCityName.closest("form").trigger("reset");

                this.filterByZipCode();
                this.filterByRegionCity.init();
                this.thisLocation();
                this.searchForCurrentLocation();
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
            searchForCurrentLocation: function () {
                $('.googleMap2 .currLocation a').click();
            },
            thisLocation: function () {
                $('.googleMap2 .currLocation a').on('click', function () {
                    var temp = controller.elements.$container.attr('data-apikey');
                    var temp2;
                    $.post('https://www.googleapis.com/geolocation/v1/geolocate?key=' + temp, '', function (resp) {
                        if (controller.elements.$container.attr('data-radius')) {
                            temp2 = controller.elements.$container.attr('data-radius');
                        } else {
                            temp2 = 40;
                        }

                        var retailerTypes = controller.tools.getSelectedRetailerTypes();

                        controller.elements.Long = resp.location.lng;
                        controller.elements.Lat = resp.location.lat;

                        retailLoc.getBypoint(resp.location.lng, resp.location.lat, temp2, controller.controls.insertResults, retailerTypes)
                    });
                });
            },

            //filter by region/city
            filterByRegionCity: {
                init: function () {
                    this.updateCityInput();
                    this.filterByCityName();
                    this.filterByRetailerType();
                    this.submit();
                },

                filterByRetailerType: function () {
                    $("#RetailerTypesAll", controller.elements.$retailerTypeList).
                        on('change', function () {
                            var isChecked = $(this).is(':checked');

                            $(".retailerType", controller.elements.$retailerTypeList)
                                .each(function () {
                                    $(this).prop("checked", isChecked);
                                });

                            var data = controller.tools.getSearchData();
                            if (data.City.length < 1 && data.SearchCity.length < 1) {
                                controller.controls.searchForCurrentLocation();
                            }
                            else {
                                $('[type=button]', controller.elements.$formRegionCity).trigger('click');
                            }
                        });

                    $(".retailerType", controller.elements.$retailerTypeList).
                        not("#RetailerTypesAll").
                        on('change', function () {
                            var data = controller.tools.getSearchData();
                            if (data.City.length < 1 && data.SearchCity.length < 1) {
                                controller.controls.searchForCurrentLocation();
                            }
                            else {
                                $('[type=button]', controller.elements.$formRegionCity).trigger('click');
                            }
                        });
                },

                filterByCityName: function () {

                    $('[type=text]', controller.elements.$formCityName).keypress(function (e) {
                        if (e.which == 13) {
                                $('[type=button]', controller.elements.$formRegionCity).trigger('click');
                            }
                        })
                        .focusin(function (e) {
                            var v = $(this).val();
                            if (controller.tools.equalsStr(v, controller.elements.$inputCityLabel)) {
                                $(this).val('');
                            }
                        })
                        .focusout(function (e) {
                            var v = $(this).val();
                            if (v == undefined || v.trim().length == 0) {
                                $(this).val(controller.elements.$inputCityLabel);
                            }
                        })
                        ;

                    $('[type=button]', controller.elements.$formCityName).on('click', function () {
                        $('[type=button]', controller.elements.$formRegionCity).trigger('click');
                    });
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
                        if (!controller.controls.filterByRegionCity.validate()) {
                            return;
                        }

                        var region, city;
                        var retailerTypes = controller.tools.getSelectedRetailerTypes();
                        var searchCity = controller.tools.getSearchCityName();

                        if (controller.elements.$container.attr('data-isregionenable') == true) {
                            region = controller.elements.$inputRegion.val().trim(),
                                city = controller.elements.$inputCity.val().trim();

                            if ((city && (city != -1) && region && (region != -1)) || searchCity.length > 0) {
                                retailLoc.getByRegionCity(region, city, controller.controls.insertResults, controller.elements.$apiKey, controller.elements.$radius, retailerTypes, searchCity);
                            }
                        } else {
                            city = controller.elements.$inputCity.val().trim();
                            if ((city && (city != -1)) || searchCity.length > 0) {
                                retailLoc.getByCity(city, controller.controls.insertResults, controller.elements.$apiKey, controller.elements.$radius, controller.elements.$searchByRadius,
                                    retailerTypes, searchCity);
                            }

                        }
                    });
                },

                validate: function () {
                    var region = controller.elements.$inputRegion.val().trim();
                    var city = controller.elements.$inputCity.val().trim();
                    var searchCityName = controller.tools.getSearchCityName();

                    controller.elements.$inputCity.removeClass("redFrame");

                    if (region && region != -1) {
                        if (city && (city == -1) && searchCityName.length < 1) {
                            controller.elements.$inputCity.addClass("redFrame");
                            return false;
                        }
                    }

                    return true;
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

            createShowroomURL: function (urlObject) {
                if (urlObject == undefined || urlObject == null) {
                    return;
                }

                var url = urlObject.Value.replace(/ /g, "");
                var urlList = url.split(";");

                var divTag = $('<div>');

                $(urlList).each(function (index, value) {
                    if (value.indexOf('http://') >= 0)
                        value = value.replace('http://', '');

                    var data = {
                        href: value,
                        text: controller.tools.stringIsEmpty(urlObject.Label) ? value : urlObject.Label
                    };
                    var aTag = $('<a/>', data);
                    var pTag = $('<p>').append(aTag);
                    divTag.append(pTag);
                });

                return divTag;
            },

            createMail: function (mailObiect) {
                var mail = $("<a>").attr("href", "mailto:" + mailObiect.Value).text(mailObiect.Value);
                return mail;
            },

            removeElement: function (nodeList, elementName) {
                $(nodeList.childNodes).each(function (index, value) {
                    if (value.className === elementName) {
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
                    $el = $el.data('marker', controller.tools.getRetailerTypeMarker(item.RetailerTypeKey));

                    var url = null;
                    if (item.Highlighted) {
                        $el.addClass('highlighted');
                        url = controller.elements.$highlightedIcon;
                    }
                    if (url === null || url === undefined || url === '') {
                        url = controller.tools.getRetailerTypeMarker(item.RetailerTypeKey);
                    }

                    if (!(url === null || url === undefined || url === '')) {
                        $el.find('.marker').prepend('<img id="Active marker" src="' + url + '" />');
                    }

                    $(item.SortFields).each(function (index, value) {
                        var p = $('<p>');

                        if (index == 0)
                            p.addClass('firstElement');

                        if (value.Value === "" || value.Value === null)
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
                        else if (value.ItemName == controller.fields.$ShowroomUrl) {
                            var url = controller.controls.createShowroomURL(value);
                            p.append(url);
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
                $(document).on("load", controller.controls.matchHeight);
                (function () {
                    $(function () {
                        controller.controls.matchHeight();
                    });
                })();
                //END

                if ($('.google-search-result ul li').length === 3) {
                    $('.google-search-result ul li:not(.template)').css('width', '48%');
                } else $('.google-search-result ul li:not(.template)').css('width', '31.3333%');
            },

            matchHeight: function () {
                $('.google-search-result ul').each(function () {
                    $(this).children('li:not(.template)').matchHeight({
                        byRow: true
                    });
                });
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

                // FIXME: np. salon blue i refleks w białymstoku mają identyczne współrzędne
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

                var iconUrl = itm.data('marker');
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
                var results = $.grep(retailersList, function (value, index) {
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
                if (controller.map.gmap.zoom > controller.elements.$deafultZoom)
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
            },

            stringIsEmpty: function (v) {
                return v === undefined || v == null || v.length < 1;
            },

            equalsStr: function (s1, s2) {
                return s1 != undefined && s2 != undefined && s1 && s2 && s1.search(s2) == 0 && s1.length == s2.length;
            },

            getSearchCityName: function () {
                var city = controller.elements.$inputCityName.val().trim();
                var label = controller.elements.$inputCityLabel;
                var result = controller.tools.equalsStr(city, label) ? "" : city;
                return result;
            },

            getSelectedRetailerTypes: function () {
                var retailerTypes = [];
                $(".retailerType:checked", controller.elements.$retailerTypeList).each(function () { retailerTypes.push($(this).val()); });
                return retailerTypes;
            },

            getSearchData: function () {
                var city = controller.elements.$inputCity.val().trim();
                var region = controller.elements.$inputRegion ? controller.elements.$inputRegion.val().trim() : null;
                var result = {
                    Region: region && region != -1 ? region : "",
                    City: city && city != -1 ? city : "",
                    SearchCity: controller.tools.getSearchCityName(),
                    RetailerTypes: controller.tools.getSelectedRetailerTypes(),
                    Longitude: controller.elements.Long,
                    Latitude: controller.elements.Lat,
                    SearchRadious: controller.elements.$radius ? controller.elements.$radius : 40,
                };

                return result;
            },

            getRetailerTypeMarker: function (retailerType) {
                for (var i = 0; i < controller.elements.$retailerTypes.length; i++) {
                    var rt = controller.elements.$retailerTypes[i];
                    if (controller.tools.equalsStr(rt.Key, retailerType)) {
                        return rt.MapMarkerUrl;
                    }
                }

                return controller.elements.$defaulttMarker;
            }

        }
    }

    $(window).on('load', function () {
        controller.map.init();
        controller.controls.init();
    });

})(jQuery);