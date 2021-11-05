

(function ($) {
    function GoogleMapPOI() {
        var temp = $('.googleMapPOI.googleMap').attr('data-type');
        var temp2 = $('.googleMapPOI.googleMap').attr('data-site');
        this.apiBaseData = {
            "request": {
                "SiteName": temp2,
                "DataType": temp
            }
        }
        this.request = null;
    }

    GoogleMapPOI.prototype.api = function (url, data) {
        var data = $.extend(true, this.apiBaseData, { request: data });
        if (this.request) {
            this.request.abort();
        }
        return this.request = $.ajax({
            url: url + "?" + Date.now(),
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json'
        });
    }

    var retailLoc = new GoogleMapPOI();

    var controller = {
        elements: {
            $container: $('.googleMapPOI.googleMap'),
            $results: $('.googleMapPOI .google-search-result'),
            $resultsList: $('.googleMapPOI .google-search-result ul'),
            $map: $('.googleMapPOI #map-canvas'),
            $defaultMarkers: eval($('.googleMapPOI.googleMap').attr('data-markers')),
            $retailerTypes: eval($('.googleMapPOI.googleMap').attr('data-retailer-types')),
            $center: $('.googleMapPOI.googleMap').attr('data-center'),
            $apiKey: $('.googleMapPOI.googleMap').attr('data-apikey'),
            $radius: $('.googleMapPOI.googleMap').attr('data-radius'),
            $zoom: $('.googleMapPOI.googleMap').attr('data-zoom'),
            $searchByRadius: $('.googleMapPOI.googleMap').attr('data-search-by-radius'),
            $deafultZoom: 14,
            $highlightedIcon: $('.googleMapPOI.googleMap').attr('data-highlighted-icon'),
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

                    var url = controller.tools.getRetailerTypeMarker(item.RetailerTypeKey);
                    $el.find('.marker').prepend('<img id="Active marker" src="' + url + '" />');

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
                    zoom: 8,
                    panControl: true,
                    zoomControl: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var $cont = controller.elements.$container;
                var latitude = parseFloat(controller.elements.$center.split(",")[0]);
                var longitude = parseFloat(controller.elements.$center.split(",")[1]);

                if (!isNaN(latitude) && !isNaN(longitude)) {
                    mapOptions.center = { lat: latitude, lng: longitude };
                }
                else if (controller.elements.$defaultMarkers.length == 1) {
                    var m = controller.elements.$defaultMarkers[0];
                    mapOptions.center = new google.maps.LatLng(m.PositionX, m.PositionY);
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
                }

                this.gmap = new google.maps.Map(controller.elements.$map[0], mapOptions);

                controller.map.addDeafaultMarkers(controller.elements.$defaultMarkers, this.gmap);
                if (controller.elements.$defaultMarkers.length > 1 && mapOptions.center === undefined)
                    controller.map.autoScale();

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



            addDeafaultMarkers: function ($items, $map) {
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
        controller.controls.init();
        controller.map.init();
    });

})(jQuery);