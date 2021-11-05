/// <reference path="publishConfig.js" />
/// <reference path="../lib/jquery.styleSelect.js" />
/// <reference path="../lib/jquery.styleSelect.js" />
GlobalMethod = typeof (GlobalMethod) == 'object' ? GlobalMethod : {};
GlobalMethod.LitteCarousel = function () { };

(function ($) {
    var idofcurrentelement;

    // Polyfill Element.closest() for IE 9+
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function (s) {
            var el = this;

            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }

    var App = {

        pageClass: '',

        start: function () {

            var swp = document.querySelectorAll(".swiper-container");
            setTimeout(function () {
              var swiperIsOn = document.querySelector('[data-swiperison="true"]');
              if (swiperIsOn) {
                swp.forEach(function (swiperInstance) {
                  swiperInstance.style.display = "block";
                  var swiper = new Swiper(swiperInstance, {
                    slidesPerView: 4,
                    navigation: {
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    },
                    breakpoints: {
                      1024: {
                        slidesPerView: 3,
                      },
                      480: {
                        slidesPerView: 2,
                      },
                    },
                    centerInsufficientSlides: true,
                  });

                  var swiperSlides = swiperInstance.querySelectorAll(".swiper-slide");
                  var swiperNextButton = swiperInstance.querySelector(
                    ".swiper-button-next"
                  );
                  var swiperPrevButton = swiperInstance.querySelector(
                    ".swiper-button-prev"
                  );

                  if (window.innerWidth > 1024) {
                    if (swiperSlides.length <= 4) {
                      swiperNextButton.style.display = "none";
                      swiperPrevButton.style.display = "none";
                    }
                  } else {
                    if (swiperSlides.length < 3) {
                      swiperNextButton.style.display = "none";
                      swiperPrevButton.style.display = "none";
                    }
                  }

                  swiperSlides.forEach(function (slide) {
                    slide.addEventListener("mouseover", function (event) {
                      slide.querySelector("img").style.transform = "scale(1.2)";
                    });
                    slide.addEventListener("mouseout", function (event) {
                      slide.querySelector("img").style.transform = "scale(1)";
                    });
                    slide.addEventListener("click", function (event) {
                      event.preventDefault();
                    });
                    // slide.addEventListener("click", function(event) {
                    //   event.preventDefault();
                    //   var product = slide.closest("a");
                    //   if (product) {
                    //     product.href = slide.dataset.url;
                    //     var productImage = product.querySelector(".product-image");
                    //     var text = product.querySelector(".text p");
                    //     var code = product.querySelector(".code");
                    //     var price = product.querySelector(".price");
                    //     var size = product.querySelector(".size");

                    //     if (productImage) {
                    //       productImage.src = slide.dataset.img;
                    //     }

                    //     if (text) {
                    //       text.textContent = slide.dataset.text;
                    //     }

                    //     if (code) {
                    //       code.textContent = slide.dataset.code;
                    //     }

                    //     if (price) {
                    //       price.textContent = slide.dataset.price;
                    //     }

                    //     if (size) {
                    //       size.textContent = slide.dataset.size;
                    //     }
                    //   }
                    // });
                  });
                });
              }
            }, 100);


            if ($('.pageeditor').length == 0 && navigator.appVersion.indexOf("MSIE 7") == -1) {//disable autoComplete for IE7
                App.searchAutoComplete();
            }

            if ($('.error404').length) {
                $('html, body, form, .error404').css('height', '100%');
            }

            if ($('.error404').length > 0) {
                $('html').css('height', '100%');
                $('body').addClass('errorPage');
            }

            //disable "if" beacouse not always present these classes
            //if ($('.slide').length > 0 || $('.text-slide').length > 0) {
            App.bigSlider();
            //}

            if (($('.simple-slider').length > 0 || $('.product-slide-wraper').length > 0) && $('.pageeditor').length == 0) {
                App.litteCarousel();
                GlobalMethod.LitteCarousel = App.litteCarousel;
            }

            if ($('.sliders-inspirations').length > 0 && $('.pageeditor').length == 0) {
                App.inspirationCarousel();
            }

            if ($('select').length > 0 || $('.checkbox-list').length > 0 || $('.styleCheckbox').length > 0 || $('input[type="checkbox"]').length > 0/* || $('input[type="radio"]').length > 0*/) {
                App.inputStyle();
            }

            if ($('#overlaps').length > 0) {
                App.overlap();
            }

            if ($('.filters').length > 0) {
                App.subcategoryFiltrs();
                App.noResults();
            }

            if ($('.video-type').length > 0 || $('[video-id]').length > 0 && $('.plugin-disable').length == 0 && $('.pageeditor').length == 0) {
                App.videoEmbed();
            }

            if ($('.showroom-gallery').length > 0 && $('.pageeditor').length == 0) {
                App.showroomCarousel();
            }

            if ($('.email-updates').length > 0 && $('.pageeditor').length == 0) {
                App.emailUpdates();
            }

            if ($('.projects').length > 0 && $('.pageeditor').length == 0) {
                App.projectsCarousel();
            }

            if ($('.single-designer').length > 0 && $('.pageeditor').length == 0) {
                App.designerPopup();
            }

            if ($('#map-canvas').length > 0 && $('.plugin-disable').length == 0 && $('.pageeditor').length == 0) {
                App.googleMap();
            }

            if ($('#tabs').length > 0) {
                App.searchResultsTabs();
            }

            if (navigator.appVersion.indexOf("MSIE 7") != -1) {
                App.ie7Fix();
            }

            if ($('.pageeditor').length > 0) {
                App.emptyPlaceholder();
                App.brandPointsSet();
            }

            if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                var ieversion = new Number(RegExp.$1);
                if (ieversion = 7) {
                    App.placeholderIeFix();
                }
            }

            if ($('.social-plugins').length > 0 && $('.plugin-disable').length == 0) {
                App.socialPlugins();
            }

            if ($('.pageeditor').length == 0) {
            	App.resizeWindow();
            	App.loadWindow();
                App.responsiveNavigation();
                App.itemsListStyle();
            }

            if ($('.searchResults-icon').length > 0) {
                App.searchResultClear();
            }

            if ($('#flashcontent').length > 0) {
                App.addFlash();
            }

            if ($('.brochures-filters').length > 0) {
                App.brochuresButtons();
            }

            if ($('.filters-container').length > 0 || $('.lt-ie8').length > 0 || $('.downloads-filtersUp').length > 0) {
                App.dropdownFix();
            }

            if ($('.press .sort-select').length > 0) {
                App.fixPress();
            }

            if ($('.checkbox-list').length > 0 || $('.selectLight').length > 0) {
                App.lockScroll();
            }
            if ($('.downloads-filters').length > 0) {
                App.filesDownloadButtonDisable();
            }

            if ($('.scfRequired').length > 0) {
                $('.scfRequired').text('*');
            }


            var $ulStyle = $('.filtr-contener .style-select .styleSelect_item_content ul');
            var $ulSize = $('.filtr-contener .size-select .styleSelect_item_content ul');
            App.filtrInspirations($ulStyle, $ulSize);


            App.hideShowElement();
            App.boxHover();
            App.boxesPosition(3);
            App.scrollToBottom();
            App.secondAside();
            App.placeholderSet();
            App.handleEmailSender();
        },

        filtrInspirations: function ($ulStyle, $ulSize) {

            var cookieName = "filtr-inspirations";

            var cookieOb = { idStyle: '', nameStyle: '', idSize: '', nameSize: '' };

            function createCookie(name, cookieObj, days) {
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    $.cookie(name, JSON.stringify(cookieObj), { expires: date.toGMTString() });
                }
                else
                    $.cookie(name, JSON.stringify(cookieObj));
            }

            function readCookie(name) {
                var cookie = $.cookie(name);
                if (cookie === undefined || cookie === null)
                    return { idStyle: '', nameStyle: '', idSize: '', nameSize: '' };
                else
                    return $.parseJSON(cookie);
            }

            function init() {
                var carusel = getParammeters("isCarusel");
                var linkInspirations = getParammeters("isLinkInspirations");
                //if (($ulSize && $ulStyle && !linkInspirations) && ($ulSize && $ulStyle && !carusel)) return;

                var cookie = readCookie(cookieName);

                var idStyle = '';
                var nameStyle = '';
                var idSize = '';
                var idName = '';
                var nameSize = '';

                if (linkInspirations) {
                    idSize = getParammeters('idSize')[1];
                    nameSize = $($ulSize[0]).find('li[id="' + idSize + '"]').text();
                    idStyle = getParammeters('idStyle')[1];
                    idName = getParammeters('collection')[1];
                    if ($ulStyle) {
                        var nameStyle = $ulStyle.find("li[id='" + idStyle + "'] span").text();
                    }

                } else if (carusel) {
                    var itemName = getParammeters('itemName')[1];
                    var $inspiration = $('a[data-itemname="' + itemName + '"]');
                    console.log($inspiration);
                    $inspiration.trigger("click");
                } else if (!cookie || cookie === null) {
                    return;
                } else {
                    var idStyle = cookie.idStyle;
                    var nameStyle = cookie.nameStyle;
                    var idSize = cookie.idSize;
                    var nameSize = cookie.nameSize;
                }

                if (idStyle !== undefined && idStyle !== null && idStyle !== "" && $ulStyle) {
                    $ulStyle.find("li span.selected").removeClass('selected');
                    var selectorStyle = "li[id='" + idStyle + "'] span";
                    var spanLiStyle = $ulStyle.find(selectorStyle)[0];
                    var $spanLiStyle = $(spanLiStyle);
                    $spanLiStyle.addClass('selected');
                    var spanStyle = $ulStyle.parent().parent().parent().parent().find('span.activeSelect');
                    var $spanStyle = $(spanStyle);
                    $spanStyle.text(nameStyle);
                    $spanStyle.attr('id', idStyle);

                    if ($ulSize)
                        getSizeElement(idStyle, $ulSize.find('li'), $('ul.filtr-inspirations li'));
                }

                if (idSize !== undefined && idSize !== null && idSize !== "" && $ulSize) {
                    $ulSize.find("li span.selected").removeClass('selected');
                    var selectorSize = "li[id='" + idSize + "'] span";
                    var spanLiSize = $ulSize.find(selectorSize)[0];
                    var $spanLiSize = $(spanLiSize);
                    $spanLiSize.addClass('selected');
                    var spanSize = $ulSize.parent().parent().parent().parent().find('span.activeSelect');
                    var $spanSize = $(spanSize);
                    $spanSize.text(nameSize);
                    $spanSize.attr('id', idSize);
                }

                createCookie(cookieName, cookie);
                if (idStyle === "" && idSize === "") return;

                showInspiration(idStyle, idSize, idName);
            }

            function getParammeters(name) {
                return new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            }

            function equalInspirationArray(arr, ele) {
                var equal = false;
                for (i = 0; i < arr.length; i++) {
                    if (parseInt(arr[i]) == ele) {
                        equal = true;
                        break;
                    } else {
                        equal = false;
                    }
                }
                return equal;
            }


            function showInspiration(idStyle, idSize, idName) {
                var $inspirations = $('ul.filtr-inspirations li');
                var attrIdStyle = 'data-style';
                var attrIdSize = 'data-size';
                var attrIdName = 'data-itemname';
                if (idStyle === undefined || idStyle === '') {
                    idStyle = "-1";
                }
                if (idSize === undefined || idSize === '') {
                    idSize = "-1";
                }

                if (idStyle === '-1' && idSize === '-1') {
                    $inspirations.show();
                    $inspirations.addClass('showed');
                    $ulSize.each(function () {
                        var li = $(this);
                        li.show();
                    });
                }
                else {
                    $inspirations.each(function () {
                        var $liE = $(this);
                        var collectionArray = $liE.attr(attrIdName).split(';');
                        var visible = true;
                        if (idStyle === '-1' && idSize !== '-1') {
                            visible = $liE.attr(attrIdSize) === idSize;
                        } else if (idStyle !== '-1' && idSize === '-1') {
                            visible = $liE.attr(attrIdStyle) === idStyle;
                        } else if (idStyle !== '-1' && idSize !== '-1') {
                            visible = $liE.attr(attrIdStyle) === idStyle && $liE.attr(attrIdSize) === idSize;
                        }

                        if (visible) {
                            $liE.show();
                            $liE.addClass('showed');
                        } else {
                            $liE.hide();
                            $liE.removeClass('showed');
                        }
                    });
                }
            }

            function handleClick($li, filtrName) {
                var idStyle = '-1';
                var idSize = '-1';
                var idName = '-1;'
                var cookieOb = readCookie(cookieName);
                if ($('.main-inspiration').hasClass("active")) {
                    $('.main-inspiration').removeClass("active");
                    $('.main-inspiration').hide();
                    $('.hot-spot').remove();
                    idofcurrentelement = -1;
                }

                var id = $li.attr('id');

                if (!id) return;
                var $inspirations = $('ul.filtr-inspirations li');

                var name = $li.find('span').text();
                var ddl = $('.filtr-contener .size-select .styleSelect_item_content ul');

                if (filtrName === 'style') {
                    idStyle = id;
                    cookieOb.idStyle = id;
                    cookieOb.nameStyle = name;
                    cookieOb.idSize = "";
                    cookieOb.nameSize = "";
                    createCookie(cookieName, cookieOb);
                    getSizeElement(id, ddl, $inspirations);

                    $ulStyle.find("li span.selected").removeClass('selected');
                    var selectorStyle = "li[id='" + idStyle + "'] span";
                    var spanLiStyle = $ulStyle.find(selectorStyle)[0];
                    var $spanLiStyle = $(spanLiStyle);
                    $spanLiStyle.addClass('selected');
                    var spanStyle = $ulStyle.parent().parent().parent().parent().find('span.activeSelect');
                    var $spanStyle = $(spanStyle);
                    $spanStyle.text(name);
                    $spanStyle.attr('id', idStyle);
                }
                else {
                    idSize = id;
                    cookieOb.idSize = id;
                    cookieOb.nameSize = name;
                    createCookie(cookieName, cookieOb);

                    $ulSize.find("li span.selected").removeClass('selected');
                    var selectorSize = "li[id='" + idSize + "'] span";
                    var spanLiSize = $ulSize.find(selectorSize)[0];
                    var $spanLiSize = $(spanLiSize);
                    $spanLiSize.addClass('selected');
                    var spanSize = $ulSize.parent().parent().parent().parent().find('span.activeSelect');
                    var $spanSize = $(spanSize);
                    $spanSize.text(name);
                    $spanSize.attr('id', idSize);
                }

                if (filtrName === 'style') {
                    var size = $('.size-select span.activeSelect')[0];
                    if (size != undefined)
                        idSize = size.id;
                } else {
                    var style = $('.style-select span.activeSelect')[0];
                    if (style != undefined)
                        idStyle = style.id;
                }

                showInspiration(idStyle, idSize, idName);
            }

            function getSizeElement(styleId, dropDownListSize, inspirations) {
                var tab = [];
                inspirations.each(function () {
                    var element = $(this)
                    if (element.attr('data-style') === styleId) {
                        tab.push(element.attr('data-size'));
                    }
                });
                tab = $.unique(tab);
                var liList = $('.filtr-contener .size-select .styleSelect_item_content ul').find('li');
                liList.each(function () {
                    var element = $(this);
                    element.show();
                });

                liList.each(function () {
                    var element = $(this);
                    var id = element.attr('id');
                    var sizeContainsElement = tab.indexOf(id);
                    if (sizeContainsElement == '-1' && id !== '-1') {
                        element.hide();
                    }
                });

                var elements = liList.filter(function () { return $(this).css('display') !== 'none' });

                if (styleId === '-1') {
                    liList.each(function () {
                        var element = $(this);
                        element.show();
                    });
                }

                if (elements.length !== 0) {
                    var selectedElement = elements[0];
                    var list = $('.filtr-contener .size-select .styleSelect_item_content ul');
                    var spanSize;
                    if ($ulSize.parent().parent().parent().parent().find('span.activeSelect').length == 1) {
                        spanSize = $ulSize.parent().parent().parent().parent().find('span.activeSelect');
                    } else {
                        spanSize = $ulSize.parent().parent().parent().parent().parent().find('span.activeSelect');
                    }
                }
            }

            $ulStyle.children('li').click(function (e) {
                $li = $(this);

                handleClick($li, 'style');
                $(window).trigger('resize');
            });

            $ulSize.children('li').click(function (e) {
                $li = $(this);

                handleClick($li, 'size');
                $(window).trigger('resize');
            });
            init();
        },

        handleEmailSender: function () {

            var sendMail = function ($btn, ids, name) {
                if (ids.length === 0) return;

                var data = { mediaIds: ids, name: name };

                //Show loader
                $('.loaderSend').show();

                $.ajax({
                    'type': 'POST',
                    'url': '/Services/DownloadFilesService/GenerateLinkZipFilesService.asmx/GenerateLink',
                    'contentType': 'application/json; charset=utf-8',
                    'dataType': 'json',
                    'data': JSON.stringify(data),
                    'async': true,
                    'success': function (data, textStatus, jqXHR) {
                        var linkText = $btn.attr("data-ready-to-send");
                        var attrValue = 'mailto:' + '?subject=' + data.d.Subject + '&body=' + data.d.Body;
                        document.location.href = attrValue;
                        //$btn.attr('mail-to', attrValue);
                        //$btn.text(linkText);
                    },
                    'error': function () {

                    },
                    'complete': function () {
                        //Hide loader
                        $('.loaderSend').hide();
                    }
                });
            };

            var handleBroschures = function ($btn) {
                var id = [];
                $(".brochures-list .ez-checkbox.ez-checked").each(function (index, value) {
                    id.push($(value).next('input[type="hidden"]')[0].value);
                });

                sendMail($btn, id, "broschures");
            };

            var handleDownloads = function ($btn) {
                var id = [];
                $(".downloads-mainPanel .ez-checkbox.ez-checked").each(function (index, value) {
                    id.push($(value).next('input[type="hidden"]')[0].value);
                });

                sendMail($btn, id, "downloads");
            };

            $("#sendEmailBtn").on("click", function (e) {
                e.preventDefault();
                var $btn = $(this);
                var which = $btn.attr("data-site");

                if (which) {
                    switch (which) {
                        case "broschures":
                            handleBroschures($btn);
                            break;
                        case "downloads":
                            handleDownloads($btn);
                            break;
                    }
                }
            });
        },

        //global functions
        categorySize: function () {

            var conteners = $('.list-category, .contener-site-index');

            if (App.viewport().width < 768) {//clear categorySize settings
                unsetNextRow();
                return false;
            } else if (App.viewport().width < 980) {
                unsetNextRow();
                $('header').removeClass('device1').removeClass('device2');
                conteners = $('.contener-site-index');

            } else if (App.viewport().width < 1380 && $('header').hasClass('device1')) {//the same device
                return false;
            } else if (App.viewport().width >= 1380 && $('header').hasClass('device2')) {//the same device
                return false;
            }

            //clear categorySize settings
            unsetNextRow();
            $('header').removeClass('device1').removeClass('device2');


            //is toBigCategory?
            conteners.each(function () {

                contenerWidth = $(this).width();

                if (contenerWidth > $('.site-index-lists').width()) {
                    setNextRow($(this));
                } else {
                    if (App.viewport().width < 980) {
                        $('header').removeClass('device2').removeClass('device1');
                    }
                    else if (App.viewport().width < 1380) {
                        $('header').removeClass('device2').addClass('device1');
                    } else {
                        $('header').removeClass('device1').addClass('device2');
                    }

                }
            });



            //set next row blocks
            function setNextRow(o) {

                var contener = o;
                var contentWidth = 0;
                var maxHeight = 0;
                var heights = [];
                var nextRowHeights = [];
                contener.addClass('toBigCategory');

                //find next-row block
                contener.find('.index-list').each(function (index) {

                    contentWidth += $(this).outerWidth(true);

                    if (contentWidth > $('.large-12').width()) {
                        $(this).addClass('nextRow');
                        nextRowHeights.push($(this).height());
                    } else {
                        heights.push($(this).height());
                    }
                });
                contener.removeClass('toBigCategory');

                //insert next-row to existing blocks
                $('.index-list.nextRow', contener).each(function () {

                    var min = heights[0];
                    var minIndex = 0;
                    for (var i = 1; i < heights.length; i++) {
                        if ((heights[i] < min && heights[i] != -1) || min == -1) {
                            minIndex = i;
                            min = heights[i];
                        }
                    }
                    if (maxHeight < min) {
                        maxHeight = min;
                    }
                    heights[minIndex] = -1;
                    $(this).removeClass('index-list')
                           .removeClass('nextRow')
                           .addClass('index-listNew')
                           .appendTo($($('.index-list', contener)[minIndex]));
                });

                //set nextRow's parent padding
                $('.index-listNew').each(function () {
                    var height = $(this).parent().find('h3').outerHeight(true) + $(this).parent().find('ul').outerHeight(true);
                    $(this).css('margin-top', maxHeight - height);
                });

                //set device flag
                if (App.viewport().width < 980) {
                    $('header').removeClass('device2').removeClass('device1');
                }
                else if (App.viewport().width < 1380) {
                    $('header').removeClass('device2').addClass('device1');
                } else {
                    $('header').removeClass('device1').addClass('device2');
                }

            }

            //clear next-rows position
            function unsetNextRow() {
                $('.index-listNew').each(function () {
                    contener = $(this).parent().parent();
                    $(this).removeClass('index-listNew')
                           .addClass('index-list')
                           .css('margin-top', 'auto')
                           .appendTo(contener);
                });
            }

            //if ($(window).width() > 980 && $('.list-category').length > 0) {
            //    $('.list-category .index-list').each(function (index, value) {
            //        var col = $(this);
            //        var rows = col.find('li').length;
            //        var header = 2;//h3 is around 2x size of one list item
            //        var counting = parseInt(rows) + parseInt(header);
            //        //$(this).removeClass('nextRow');
            //        if (counting < 9) {
            //            $(this).addClass('a' + counting);
            //        }
            //        else {
            //            var counting2 = counting - 9;
            //            $(this).addClass('b' + counting2);
            //        }
            //    });
            //    function sort() {
            //        var elem = $('.list-category').find('.index-list').sort(sortMe);
            //        $('.list-category').prepend(elem);
            //        function sortMe(a, b) {
            //            return a.className < b.className;
            //        }
            //    }
            //    sort();
            //}
        },

        searchAutoComplete: function () {

            var getHtml = function (source) {
                var $ul = $('<ul>').append($('<li>').append($('<h3>').append(source.Header)));

                if (source.IsAll) {
                    $('.autoComplete li.see-all').show();
                } else {
                    $('.autoComplete li.see-all').hide();
                }

                for (var i = 0; i < source.Results.length; i++) {
                    $ul.append($('<li>').append($('<h3>').append(source.Results[i].Header).append($('<a>').attr('href', source.Results[i].RedirectUrl).append(">>"))));
                    for (var j = 0; j < source.Results[i].Items.length; j++) {
                        $ul.find("li").last().append($('<a>').attr("href", source.Results[i].Items[j].Url).append(source.Results[i].Items[j].DisplayName));
                    }
                }

                return $ul.find("li");
            }

            var delayTimer;
            var xhr = null;
            var call = function (word) {
                clearTimeout(delayTimer);
                delayTimer = setTimeout(function () {
                    if (xhr)
                    {
                        xhr.abort();
                    }
                    xhr = $.ajax({
                        'type': 'POST',
                        'url': '/Services/SearchAutoComplete/AutoComplete.asmx/Get',
                        'contentType': 'application/json; charset=utf-8',
                        'dataType': 'json',
                        'data': JSON.stringify({ term: word }),
                        'async': true,
                        'success': function (data, textStatus, jqXHR) {
                            $("#Menu_search div.autoComplete ul li:not(:last)").remove();
                            $("#Menu_search div.autoComplete ul li:last").before(getHtml(data.d));

                            $('.autoComplete li.see-all h3').html($('<a>').attr("href", data.d.FirstPartUrl + "?searchTerm=" + word).html(data.d.SeeAll));
                            $('.autoComplete').show();
                        },
                        'error': function () {

                        },
                        'complete': function () {
                        }
                    });
                }, 500);


            }

            var autoComplete = $('.autoComplete');

            $('.search-term').on('keyup', function () {

                var searchWord = $(this).val();

                if (searchWord.length > 2) {
                    call(searchWord);
                } else {
                    autoComplete.hide();
                }
            });

            $('html').on('click', function () {
                autoComplete.hide();
            });

            autoComplete.on('click', function (e) {
                e.stopPropagation();
            });

            $(function () {
                //Set button disabled
                $(".search-form input[type=submit]").attr("disabled", "");

                //Append a change event listener to you inputs
                $('.search-form input').change(function () {
                    //Validate your form here, example:`
                    var validated = false;
                    if ($('.search-term').val().length > 2) validated = true;

                    //If form is validated enable form
                    if (validated) $(".search-form input[type=submit]").removeAttr("disabled");
                });

                //Trigger change function once to check if the form is validated on page load
                $('.search-form input:first').trigger('change');

                if ($("body").width() < 980) {
                    $(".search-form input[type=submit]").removeAttr("disabled");
                };
            })
        },

        bigSlider: function () {
            /*
             * Litte Carousel: http://www.gmarwaha.com/jquery/jcarousellite/
             */
            $('.bigCarousel,.verticalCarouselText,.horizontalCarouselText,.smallCarousel').each(function () {

                //set other position

                if (($(this).hasClass('horizontalCarouselText') || $(this).hasClass('verticalCarouselText')) && $(this).attr('data-imgposition') == 1) {
                    $(this).addClass('other-position');
                }

                var slidesNo = $(this).find('ul li').length;
                var carouselClass = '.' + $(this).attr('class').split(" ").join(".");
                var pagination = $(document.createElement('div'));
                var autoSpeed = null;
                var circular = true;
                var direction = $(this).attr('data-direction') == 1;
                if ($(this).attr('data-speed') && $(this).attr('data-speed').length > 2)
                    autoSpeed = parseInt($(this).attr('data-speed'));
                //console.log(auto);
                pagination.addClass('pagination');
                var list = "";
                var btnGo = [];


                if (slidesNo > 1) {

                    //set pagination buttons
                    for (var i = 0; i < slidesNo; i++) {

                        var button = $(document.createElement('button'));
                        button.addClass('' + i).text(i);

                        if (i == 0)
                            button.addClass('active');

                        pagination.append(button);
                        btnGo.push(carouselClass.replace(". ", "") + ' .' + i);

                        button.on('click', function (e) {
                            e.preventDefault();
                        })
                    }

                    auto = false;
                    pagination.appendTo($(this));

                    if ($('.pageeditor').length == 0) {

                        $(this).jCarouselLite({
                            btnNext: ".product-slide-wraper .next",
                            btnPrev: ".product-slide-wraper .prev",
                            auto: autoSpeed,
                            speed: 500,
                            visible: 1,
                            scroll: 1,
                            circular: circular,
                            vertical: direction,
                            btnGo: btnGo,
                            beforeStart: function (a) {
                                $(carouselClass + ' .pagination button').removeClass('active');
                                if (a <= slidesNo && a > 0) {
                                    $(carouselClass + ' .pagination .' + (a - 1)).addClass('active');
                                }
                                else {
                                    var no = Math.floor(a / slidesNo);
                                    if (a - (no * slidesNo) - 1 >= 0) {
                                        $(carouselClass + ' .pagination .' + (a - (no * slidesNo) - 1)).addClass('active');
                                    } else {
                                        $(carouselClass + ' .pagination .' + (slidesNo + (a - (no * slidesNo) - 1))).addClass('active');
                                    }

                                }
                            },
                            afterEnd: function (a) {

                            }
                        });
                    }
                }

                //OTHER CAROUSEL DISPLAY IN EDIT MODE
                if ($('.pageeditor').length > 0) {

                    $('ul', $(this)).css({
                        'left': '0',
                        'top': '0',
                        'position': 'absolute'
                    });

                    $('.pagination button', $(this)).on('click', function () {
                        var pagination = $(this).parent();
                        var div = pagination.parent();
                        var no = $(this).attr('class');
                        if ($(this).hasClass('active'))
                            return false;
                        pagination.find('button').removeClass('active');
                        $(this).addClass('active');
                        $('ul li', div).each(function (index, data) {

                            if (index == no) {
                                $(this).parent().css('top', -1 * (parseInt(no)) * $(this).height());
                            }
                        });
                    });
                }
            });
        },

        litteCarousel: function () {
            /*
             * Litte Carousel: http://www.gmarwaha.com/jquery/jcarousellite/
             */

            if ($('.product-slide-wraper').length) {
                //product carousel
                if ($('.product-slide-wraper').find('li').length <= 4) {
                    $('.product-content').find('.next').hide();
                    $('.product-content').find('.prev').hide();
                    $('.product-slide-wraper').addClass('staticCarousel');

                } else {
                    var auto = false;//5000;
                    var speed = 500;
                    var visible = 4;
                    $('.product-slide-wraper').jCarouselLite({
                        btnNext: ".product-content .next",
                        btnPrev: ".product-content .prev",
                        btnGo: ['.asd', '.asddas', '.asddsa', '.asdasd', '#novocontent_0_ProductTemplate_NamePanelId > h1'],
                        //btnGo: $.map($('.product-slide-wraper ul li').get(), function (v, i) {
                        //    return '.product-slide-wraper ul li:eq(' + i + ')';
                        //}),
                        auto: auto,
                        speed: speed,
                        circular: false,
                        visible: visible,
                        scroll: 1,
                        start: 0

                    });
                    $('.product-slide-wraper ul').css('margin', '0');
                }

                var selectedimg = 0,
					slideCount = $('.product-slide-wraper ul li').length;

                $('.product-content .prev').hide();

                document.getElementsByClassName("product-slide-wraper")[0].addEventListener("keydown", function (event) {
                    if (event.keyCode == "37") {
                        if (selectedimg <= 0) {
                            return;
                        }
                        selectedimg--;

                        if (0 >= selectedimg) {
                            selectedimg = $('.product-slide-wraper ul li').length - 1;
                        }
                        $(".product-slide-wraper ul li:eq(" + selectedimg + ")").click();
                    }
                    if (event.keyCode == "39") {
                        if ((selectedimg + 1) >= $('.product-slide-wraper ul li').length) {
                            return;
                        }
                        selectedimg++;
                        //console.log("wybrany" + selectedimg);
                        //console.log($('.product-slide-wraper ul li').length)
                        if ($('.product-slide-wraper ul li').length <= (selectedimg)) {
                            selectedimg = 0;
                        } else {
                            //selectedimg++
                        }
                        $(".product-slide-wraper ul li:eq(" + selectedimg + ")").click();
                    }
                });
            }

            function updateView() {
                if (selectedimg > 0) {
                    $('.product-content .prev').show();
                }
                else {
                    $('.product-content .prev').hide();
                }
                if ((selectedimg + 1) >= slideCount) {
                    $('.product-content .next').hide();
                }
                else {
                    $('.product-content .next').show();
                }
            }


            $('.product-slide-wraper ul li').on('click', function () {
                var currentImg = $('.product-content img').clone();

                $(".product-slide-wraper ul li").removeClass('current');
                $(this).addClass('current');

                var newImg = $(this).find('img').attr('src');
                var newImgTitle = $(this).find('img').attr('title');
                var newImgAlt = $(this).find('img').attr('alt');
                selectedimg = $('.product-slide-wraper ul li').index(this);
                //console.log(selectedimg);
                var scallingAttrIndex;
                if (currentImg.attr('src')) {
                    scallingAttrIndex = currentImg.attr('src').indexOf('?');
                } else {
                    scallingAttrIndex = '-1';
                }
                var scallingAttr = '';
                if (scallingAttrIndex != -1) {
                    scallingAttr = currentImg.attr('src').substr(scallingAttrIndex, currentImg.attr('src').length);
                }
                var urlEnd = newImg.indexOf('?mw');
                $('.product-content img').remove();
                var $img;
                if ($(this).find('img').hasClass('video-type')) {
                    var id = $(this).find('img').attr('video-id');
                    $img = $('<img class="video-type" video-id="' + id + '" src="' + (urlEnd == -1 ? newImg : newImg.substring(0, urlEnd)) + '"></img>').appendTo($('.product-content'));

                } else {
                    $img = $('<img src="' + (urlEnd == -1 ? newImg + scallingAttr : newImg.substring(0, urlEnd)) + scallingAttr + '" + alt="' + newImgAlt + '"  + title="' + newImgTitle + '"></img>').appendTo($('.product-content'));
                }
                $img.on('load', function () {
                    $('.product-content').css('min-height', $img.height() + 'px');
                });
                //$(this).html(currentImg);
                $('.video-type').off('click');
                App.videoEmbed();
                updateView();

            }).eq(0).click();

            $('.product-content .next').on('click', function () {
                if ((selectedimg + 1) >= slideCount) {
                    return;
                }
                selectedimg++;
                //console.log("wybrany" + selectedimg);
                //console.log($('.product-slide-wraper ul li').length)
                //$(".product-slide-wraper ul li").removeClass('current');
                $(".product-slide-wraper ul li:eq(" + selectedimg + ")").click();//.addClass('current');
                updateView();
            })

            $('.product-content .prev').on('click', function () {
                if (selectedimg <= 0) {
                    return;
                }
                selectedimg--;

                //if (0 >= selectedimg) {
                //selectedimg = $('.product-slide-wraper ul li').length - 1;
                //}
                //$(".product-slide-wraper ul li").removeClass('current');
                $(".product-slide-wraper ul li:eq(" + selectedimg + ")").click();//.addClass('current');
                updateView();
            })

            //responsive carousel container
            if (App.viewport().width < 767) {
                $('.product-slide-wraper').width($('.main-product').width() - 46);
            }

            $(window).resize(function () {
                if (App.viewport().width < 767) {
                    $('.product-slide-wraper').width($('.main-product').width() - 46);
                } else {
                    $('.product-slide-wraper').css('width', '');
                }
            });

            //four element carousel
            //$('.simple-slider').each(function (index) {

            //    if ($(this).find('li').length <= 4 && App.viewport().width > 979) {

            //        var auto = 0;
            //        var speed = 0;
            //        $(this).find('.next').hide();
            //        $(this).find('.prev').hide();
            //    }
            //    else if ($(this).find('li').length > 2) {

            //        $(this).find('.next').removeClass('hide');
            //        $(this).find('.prev').removeClass('hide');
            //        var auto = 8000 * (index + 2);
            //        var speed = 400;

            //        $(this).jCarouselLite({
            //            btnNext: '#' + $(this).attr('id') + " .next",
            //            btnPrev: '#' + $(this).attr('id') + " .prev",
            //            auto: auto,
            //            speed: speed,
            //            visible: 4,
            //            //start: 1,
            //            scroll: 1
            //        });
            //    }
            //});

            //Slick Carousel http://kenwheeler.github.io/slick/
            $(".single-designer .simple-slider .simple-slider-list").slick({
                arrows: true,
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 2,
                prevArrow: "<input type='button' class='prev' value='<' />",
                nextArrow: "<input type='button' class='next' value='>' />",
                responsive: [
				  {
				      breakpoint: 480,
				      settings: {
				          slidesToShow: 1,
				          slidesToScroll: 1
				      }
				  }
                ]
            });

            $(".simple-slider .simple-slider-list").slick({
                arrows: true,
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 4,
                prevArrow: "<input type='button' class='prev' value='<' />",
                nextArrow: "<input type='button' class='next' value='>' />",
                responsive: [
				  {
				      breakpoint: 980,
				      settings: {
				          slidesToShow: 3,
				          slidesToScroll: 3
				      }
				  },
				  {
				      breakpoint: 600,
				      settings: {
				          slidesToShow: 2,
				          slidesToScroll: 2
				      }
				  },
				  {
				      breakpoint: 480,
				      settings: {
				          slidesToShow: 1,
				          slidesToScroll: 1
				      }
				  }
                ]
            });

            //Block mouse right-click
            $(".simple-slider-list li a").mousedown(function (e) {
                if (e.button == 2) {
                    return false;
                }
                return true;
            });
        },

        inspirationCarousel: function () {
            /*
             * INSPIRATIONS CAROUSELS SCROLLBAR jQuery UI
             */

            //carousel function
            var carousel = function () {

                //scrollpane parts
                var scrollPane = $(".scroll-pane"),
                    scrollContent = $(".small-carousel");
                var smallContent = $('.small-carousel');

                var smallWidth = ($('.small-carousel>li').outerWidth(true)) * $('.small-carousel>li').length;

                $('.small-carousel').width(smallWidth);

                //calculate carousels width after window resize event
                $(window).resize(function () {
                    var smallWidth = ($('.small-carousel>li').outerWidth(true)) * $('.small-carousel>li').length;
                });

                //calculate actual active item position
                var index = $('.small-carousel>li.active').index();
                var itemSize = $('.small-carousel>li').outerWidth(true);
                var scrollValue = ((index + 1) * itemSize * 100) / scrollContent.width();
                var marginLeft = Math.round(scrollValue / 100 * (scrollPane.width() - scrollContent.width()));
                if (index == 0) {
                    scrollValue = 0;
                    $('.small-carousel').css({ marginLeft: 0 });
                } else {
                    $('.small-carousel').css({ marginLeft: marginLeft });
                }

                //build slider
                var scrollbar = $(".scroll-bar").slider({
                    step: 0.1,
                    animate: 500,
                    value: scrollValue,
                    slide: function (event, ui) {

                        if (scrollContent.width() > scrollPane.width()) {

                            scrollContent.css("margin-left", Math.round(
                              ui.value / 100 * (scrollPane.width() - scrollContent.width())
                            ) + "px");

                        } else {
                            scrollContent.css("margin-left", 0);
                        }

                    },
                    change: function (event, ui) {

                        if (scrollContent.width() > scrollPane.width()) {
                            scrollContent.animate({
                                "margin-left": Math.round(
                                  ui.value / 100 * (scrollPane.width() - scrollContent.width())
                                ) + "px"
                            }, 500);

                        } else {
                            scrollContent.animate({ "margin-left": 0 }, 500);
                        }
                    }
                });

                //append icon to handle
                var handleHelper = scrollbar.find(".ui-slider-handle")
                .mousedown(function () {
                    scrollbar.width(handleHelper.width());
                })
                .mouseup(function () {
                    scrollbar.width("100%");
                })
                .append("<span class='ui-icon ui-icon-grip-dotted-vertical'></span>")
                .wrap("<div class='ui-handle-helper-parent'></div>").parent();

                //change overflow to hidden now that slider handles the scrolling
                scrollPane.css("overflow", "hidden");

                //size scrollbar and handle proportionally to scroll distance
                function sizeScrollbar() {
                    scrollContent.width($('.small-carousel>li').outerWidth(true) * $('.small-carousel>li').length);//mine
                    scrollbar.width(scrollPane.width());//mine
                    scrollbar.parent().width(scrollPane.width());//mine
                    var remainder = scrollContent.width() - scrollPane.width();
                    var proportion = remainder / scrollContent.width();
                    var handleSize = scrollPane.width() - (proportion * scrollPane.width());

                    scrollbar.find(".ui-slider-handle").css({
                        width: handleSize,
                        "margin-left": -handleSize / 2
                    });
                    handleHelper.width("").width(scrollbar.width() - handleSize);

                }

                //reset slider value based on scroll content position
                function resetValue() {
                    var remainder = scrollPane.width() - scrollContent.width();
                    var leftVal = scrollContent.css("margin-left") === "auto" ? 0 :
                      parseInt(scrollContent.css("margin-left"));
                    var percentage = Math.round(leftVal / remainder * 100);
                    scrollbar.slider("value", percentage);
                }

                //if the slider is 100% and window gets larger, reveal content
                function reflowContent() {
                    var showing = scrollContent.width() + parseInt(scrollContent.css("margin-left"), 10);
                    var gap = scrollPane.width() - showing;
                    if (gap > 0) {
                        scrollContent.css("margin-left", parseInt(scrollContent.css("margin-left"), 10) + gap);
                    }
                }

                //change handle position on window resize
                //resize text scrollBar height
                $(window).resize(function () {
                    //resetValue();
                    sizeScrollbar();
                    reflowContent();

                    if (App.viewport().width > 979) {
                        $('.main-inspiration .text').height($('.main-inspiration .image-contener img').height() - 5);
                        $('.main-inspiration .text').jScrollPane({ autoReinitialise: true });

                    } else {

                        if ($('.main-inspiration .text').find('.jspPane').length > 0) {

                            if ($('.main-inspiration .text').hasClass('hide')) {
                                hideClass = 'hide';
                            } else {
                                hideClass = '';
                            }
                            var content = $('.main-inspiration .text .jspPane').clone();
                            var newContent = $('<div class="text large-3 large-9tab ' + hideClass + '"></div>').html(content.html());
                            $('.main-inspiration .text').html('');
                            newContent.appendTo($('.main-inspiration'));

                            $('.close-desc').on('click', function () {
                                $('.popup-wraper').remove();
                                $('.main-inspiration .text').fadeOut(1000, function () {
                                    $('.main-inspiration .image-contener').addClass('imageOnly');
                                });
                                $('.inspiration-desc#showDescription').removeClass('hide').removeClass('mobile-nonHide').removeClass('mobile-hide');
                                $('.inspiration-desc#hideDescription').addClass('hide');
                            });
                        }
                    }

                    if ($('.ui-dialog').length > 0) {
                        currentWidth = $('.ui-dialog .main-product').outerWidth(true);
                        $('.ui-dialog').width(currentWidth).css('left', ((App.viewport(true).width - currentWidth - 18) / 2) + 'px');
                    }
                });

                //init scrollbar size
                setTimeout(sizeScrollbar, 10);//safari wants a timeout

                //swipe event
                var excludeElements = 'a';
                var swipeStep = ($('.small-carousel>li').outerWidth(true) * 100) / scrollContent.width();
                $('.small-carousel').swipe({
                    excludedElements: excludeElements,
                    swipeLeft: function (event, direction, distance, duration, fingerCount) {

                        var currentStep = scrollbar.slider("value") + (swipeStep * 2);
                        scrollbar.slider("value", currentStep);

                    },
                    swipeRight: function (event, direction, distance, duration, fingerCount) {

                        var currentStep = scrollbar.slider("value") - (swipeStep * 2);
                        scrollbar.slider("value", currentStep);
                    }
                });
            }

            //start coarousel function
            if ($('.small-carousel').length) {

                var listLength = 0;
                var contenerWidth = $('.small-carousel-wrapper').width();
                $('.small-carousel li').each(function () {
                    listLength += $(this).outerWidth(true);
                });

                if (contenerWidth < listLength) {
                    carousel();
                }
            }

            //resize text contener
            //only for desktop and tablet
            if (App.viewport().width > 979) {
                setTimeout(function () {//waiting for ajax response

                    if ($('.main-inspiration .image-contener img').height() - 5 > 100) {
                        $('.main-inspiration .text').height($('.main-inspiration .image-contener img').height() - 5);
                    }
                    $('.main-inspiration .text').jScrollPane({ autoReinitialise: true });

                }, 500);
            }

            /*
            * SHOW/HIDE HOT-SPOTS AND DESCRIPTION
            */

            $('.hotSpot').on('click', function (e) {
                e.preventDefault();
                if ($(this).attr('id') == 'showHotSpots') {
                    $('.hot-spot').fadeIn(1000);
                    //$('#HotSpotButtonID').val('hideHotSpots');
                    //$('#HotSpotButtonID').attr('data-hotSpot', 'hideHotSpots');
                } else {
                    $('.hot-spot').fadeOut(1000);
                    //$('#HotSpotButtonID').val('showHotSpots');
                    //$('#HotSpotButtonID').attr('data-hotSpot', 'showHotSpots');
                }
                $('.hotSpot.hide').removeClass('hide');
                $(this).addClass('hide');

            })


            $('.inspiration-desc').on('click', function (e) {
                e.preventDefault();
                if ($(this).attr('id') == 'showDescription') {

                    if (App.viewport().width < 768) {
                        $('<div class="popup-wraper inspiration-desc-wraper"><div>').appendTo('body');
                    }

                    $('.main-inspiration .image-contener').removeClass('imageOnly');
                    $('.main-inspiration .text').removeClass('hide').fadeIn(1000, function () {

                    });

                } else {
                    $('.popup-wraper').remove();
                    $('.main-inspiration .text').fadeOut(1000, function () {

                        $('.main-inspiration .image-contener').addClass('imageOnly');
                        $(this).addClass('hide');

                    });
                }


                $('.inspiration-desc').removeClass('hide').removeClass('mobile-nonHide').removeClass('mobile-hide');
                $(this).addClass('hide');
            })

            $('.close-desc').on('click', function () {
                $('.popup-wraper').remove();
                $('.main-inspiration .text').fadeOut(1000, function () {
                    $('.main-inspiration .image-contener').addClass('imageOnly');
                });
                $('.inspiration-desc#showDescription').removeClass('hide').removeClass('mobile-nonHide').removeClass('mobile-hide');
                $('.inspiration-desc#hideDescription').addClass('hide');
            });

            /*
            * HOT-SPOTS PRODUCT SHOW 845
            */
            $('.hot-spot').on('click', function () {
                var width;
                function widthCheck() {
                    if ($('html').hasClass('lt-ie9')) {
                        width = 810;
                    } else if ($(window).width() > 768) {
                        width = content.width();
                    } else if ($(window).width() <= 768) {
                        width = '100%';
                    }
                }
                var productId = $(this).attr('hotspotid');
                var content = $(".productPopup[hotspotid='" + productId + "']");
                widthCheck();
                var height = content.height();
                var bg = $('<div></div>').addClass('popup-wraper');
                bg.appendTo($('body'));
                content.dialog({
                    width: width,
                    close: function (event, ui) {
                        $('.popup-wraper').remove();
                        $(this).dialog("destroy");
                    }
                });
                $(window).on('load resize', function () {
                    widthCheck();
                    content.dialog('option', 'width', width);
                });
            });
        },

        showroomCarousel: function () {
            $('.showroom-gallery a').on('click', function (e) {

                e.preventDefault();

                //build popup elements
                var bg = $('<div></div>').addClass('popup-wraper');
                var content = $('<div></div>').addClass('popupGallery');
                var content1 = $('<div></div>').addClass('large-9 large-12mob');

                //get visible elements
                $('.showroom-gallery ul').clone().appendTo(content1);

                //crop images to correct size
                content1.find('img').each(function (i, item) {
                    var src = $(item).attr('src');
                    if (src.indexOf('?') != -1) {
                        newSrc = src.substring(0, src.indexOf('?')) + "?w=845";
                    } else {
                        newSrc = src + "?w=845";
                    }
                    $(item).attr('src', newSrc);
                });

                //get hidden elements
                $('.showroom-gallery .hidden-elements .element').each(function (i, item) {
                    var newItem = $($('.showroom-gallery ul li')[0]).clone();
                    newItem.find('img').attr('src', $(item).find('.url').html() + "?w=845");
                    newItem.appendTo($('ul', content1));
                });

                content1.appendTo(content);
                var leftNav = $('<span></span>').addClass('gallery-nav-left');
                leftNav.appendTo(content);
                var rightNav = $('<span></span>').addClass('gallery-nav-right');
                rightNav.appendTo(content);

                if ($('.large-9').length == 0) {
                    var template = $('<div class="large-9"></div>');
                    template.appendTo('body');
                }

                content.dialog({
                    width: $('.large-9').width(),
                    modal: true,
                    close: function (event, ui) {
                        $('.popup-wraper').remove();
                        $(this).dialog("destroy");
                    },
                    position: {
                        my: "top",
                        at: "top",
                        of: window
                    }
                });
                $('.popupGallery ul li').each(function () {
                    var newClass = $(this).attr('class').replace('large-3', 'large-9')
                    $(this).attr('class', newClass);
                });
                if (App.viewport().width < 768) {
                    content.dialog('option', 'width', '100%');
                    content.dialog('option', 'height', 'auto');
                    content.dialog('option', 'maxWidth', 400);
                    content.dialog('option', 'modal', true);
                    content.dialog('option', 'width', '100%');
                    $('.popupGallery ul li').each(function () {
                        $(this).removeClass('large-3').removeClass('large-6mob');
                        $(this).css({ 'width': $('.popupGallery').width() });
                    });
                }
                bg.appendTo($('body'));
                $('.popupGallery').jCarouselLite({
                    btnPrev: $('.gallery-nav-left'),
                    btnNext: $('.gallery-nav-right'),
                    visible: 1,
                    scroll: 1
                });
                $(window).resize(function () {
                    if ($('.popupGallery').length > 0) {
                        $('.popupGallery ul li').each(function () {
                            $(this).css({ 'width': $('.popupGallery').width() });
                        });
                        if (App.viewport().width < 768) {
                            content.dialog('option', 'width', '100%');
                        } else {
                            content.dialog('option', 'width', $('.large-9').width());
                        }
                    }
                });
            });
        },

        projectsCarousel: function () {
            $('.projectsGallery').each(function () {

                var slidesNo = $(this).find('ul li').length;
                var carouselClass = '.' + $(this).attr('class').split(" ").join(".");
                var pagination = $(document.createElement('div'));
                var auto = 5000;
                var direction = $(this).attr('data-direction') == 1;
                if ($(this).attr('data-speed') && $(this).attr('data-speed').length > 2)
                    auto = parseInt($(this).attr('data-speed'));
                pagination.addClass('pagination');
                var list = "";
                var btnGo = [];

                for (var i = 0; i < slidesNo; i++) {
                    var button = $(document.createElement('button'));
                    button.addClass('' + i).text(i);
                    if (i == 0)
                        button.addClass('active');
                    pagination.append(button);
                    btnGo.push(carouselClass + ' .' + i);
                    button.on('click', function (e) {
                        e.preventDefault();
                    })
                }


                if (slidesNo > 1) {
                    pagination.appendTo($(this));
                    var liResize = $('.projectsGallery').width();
                    $('.projectsGallery ul li').width(liResize);

                    var leftNav = $('<div></div>').addClass('gallery-nav-left');
                    leftNav.appendTo('.projectsGallery');
                    var rightNav = $('<div></div>').addClass('gallery-nav-right');
                    rightNav.appendTo('.projectsGallery');
                    var leftArrowPosX = 20;
                    var rightArrowPosX = $('.projectsGallery').width() - $('.gallery-nav-right').width() - leftArrowPosX;
                    $('.gallery-nav-left').css({ 'left': leftArrowPosX });
                    $('.gallery-nav-right').css({ 'left': rightArrowPosX });
                    $('.projectsGallery').jCarouselLite({
                        btnPrev: $('.gallery-nav-left'),
                        btnNext: $('.gallery-nav-right'),
                        auto: 0,
                        speed: 1000,
                        visible: 1,
                        scroll: 1,
                        vertical: direction,
                        btnGo: btnGo,
                        beforeStart: function (a) {
                            $(carouselClass + ' .pagination button').removeClass('active');
                            if (a <= slidesNo && a > 0) {
                                $(carouselClass + ' .pagination .' + (a - 1)).addClass('active');
                            }
                            else {
                                var no = Math.floor(a / slidesNo);
                                if (a - (no * slidesNo) - 1 >= 0) {
                                    $(carouselClass + ' .pagination .' + (a - (no * slidesNo) - 1)).addClass('active');
                                } else {
                                    $(carouselClass + ' .pagination .' + (slidesNo + (a - (no * slidesNo) - 1))).addClass('active');
                                }

                            }
                        },
                        afterEnd: function (a) {

                        }
                    });
                }
            });

            //scroll
            var header = $('.projectsDesc h3'),
                container = $('.projectsDesc'),
                content = $('.project-desc'),
                gallery = $('.projectsGallery');

            if (App.viewport().width > 979) {

                setTimeout(function () {
                    $('.projectsDesc').height(gallery.height() - 5);

                    $('.project-desc').css('height', $('.projectsDesc').height() - $('.projectsDesc h3').outerHeight(true));

                    var element = $('.scroll-pane').jScrollPane({
                        verticalDragMaxHeight: 80,
                        autoReinitialise: true,
                        autoReinitialiseDelay: 0

                    });
                }, 500);

            }

            //resize window
            $(window).resize(function () {
                if (App.viewport().width > 979) {

                    $('.projectsDesc').height(gallery.height() - 5);
                    $('.gallery-nav-right').css({ 'left': gallery.width() - $('.gallery-nav-right').width() - 20 });
                    $('.project-desc').css('height', $('.projectsDesc').height() - $('.projectsDesc h3').outerHeight(true));

                    $('.project-desc').jScrollPane({
                        verticalDragMaxHeight: 80,
                        autoReinitialise: true,
                        autoReinitialiseDelay: 0
                    });

                } else {
                    if ($('.project-desc .jspPane').length > 0) {

                        var content = $('.project-desc .jspPane').clone();
                        var newContent = $('<div class="project-desc"></div>');
                        var headerContent = $('.projectsDesc h3');

                        $('.projectsDesc').html('');
                        headerContent.appendTo($('.projectsDesc'));
                        newContent.appendTo($('.projectsDesc'));

                        $('.project-desc').html(content.html());

                    }

                    //set correct arrow Positions
                    var leftArrowPosX = 20;
                    var rightArrowPosX = $('.projectsGallery').width() - $('.gallery-nav-right').width() - leftArrowPosX;
                    $('.gallery-nav-left').css({ 'left': leftArrowPosX });
                    $('.gallery-nav-right').css({ 'left': rightArrowPosX });

                }
            });
        },

        viewport: function () {
            var e = window, a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return { width: e[a + 'Width'], height: e[a + 'Height'] };
        },

        designerPopup: function () {
            $('.small-media .product-thumb, .small-media .collection-thumb').on('click', function () {
                if ($(this).hasClass('product-thumb')) {
                    var content = $('.designer-popup-lists .products-list-popup', $(this).parents('.single-designer'));
                }
                else {
                    content = $('.designer-popup-lists .collections-list-popup', $(this).parents('.single-designer'));
                }

                var bg = $('<div></div>').addClass('popup-wraper');
                bg.appendTo($('body'));

                content.dialog({
                    width: $('.large-9').width() + 40,
                    position: {
                        my: 'center', at: 'center', of: window,
                        collision: 'none'
                    },
                    close: function (event, ui) {
                        $('.popup-wraper').remove();
                        $(this).dialog("destroy");
                    }
                });
                var dialToWin = $(window).height() / 5;
                if (content.dialog('isOpen')) {
                    var topPos = $('.ui-dialog').css('top');
                    if (topPos === '0px') {
                        $('.ui-dialog').css('top', dialToWin);
                    }
                }

                if (App.viewport().width < 768) {
                    GlobalMethod.mobileComponentsSize();
                }

                $('.item-list', content).height($('.item-list ul li', content).outerHeight(true) * 2);
                $('.item-list', content).jScrollPane({
                    verticalDragMaxHeight: 80
                });
            });
        },

        boxHover: function () {
            $('.hyperBox').on('mouseenter', function () {

                if ($(this).attr('data-hovercolor') != undefined && $(this).attr('data-hovercolor').length > 3) {

                    $(this).attr('data-hovercolorold', $(this).css('background-color'));
                    $(this).removeClass('defaultHover').css('background-color', $(this).attr('data-hovercolor'));
                }
            })
            $('.hyperBox').on('mouseleave', function () {
                if ($(this).attr('data-hovercolorold') != undefined && $(this).attr('data-hovercolorold').length > 3) {
                    $(this).css('background-color', $(this).attr('data-hovercolorold'));
                }
            })
        },

        hideShowElement: function () {
            /*
             * COOKIES POLITICY
             */
            var cookie = $('.cookies');
            if ((cookie.attr('data-enable') == 'True' || cookie.attr('data-enable') == 'true') && (!$.cookie('cookies') || $.cookie('cookies') == 'undefined')) {
                var cookieParagraph = $('.cookies-content p');
                var cookieContent = cookieParagraph.html();
                var more = '<span class="more-pref">&nbsp;</span><span class="more">' + cookie.attr('data-more') + '</span><span class="fullText" style="display: none;">' + cookieContent + '</span><div class="clear"></div>';

                if (cookieContent.length > 250) {
                    var str1 = cookieContent.substring(0, 250);
                    cookieParagraph.html(str1);
                    $(more).insertAfter(cookieParagraph);
                }

                cookie.insertBefore($('.button_map_contener')).show();

                $('span.more').on('click', function () {
                    $('.cookies-content p').html($('.fullText').html());

                    $('.cookies .close').on('click', function () {

                        cookie.animate({ height: '0px' }, 1000);

                        if (cookie.attr('data-show') != 'always') {
                            $.cookie('cookies', true, {
                                expires: 30,
                                path: '/'
                            });
                        }

                    });
                });

                $('.cookies .close').on('click', function () {

                    cookie.animate({ height: '0px' }, 1000);

                    if (cookie.attr('data-show') != 'always') {
                        $.cookie('cookies', true, {
                            expires: 30,
                            path: '/'
                        });
                    }

                });

                $('.cookies .more').on('click', function () {

                    var height = 0;
                    $('.cookies .cookies-more').children().each(function () {
                        height += $(this).outerHeight(true);
                    });
                    $('.cookies .cookies-more').animate({ height: height }, 1000);
                    $(this).hide();
                });
            }

            /*
             * SITE_INDEX HIDE/SHOW
             */
            $('#site_index').on('click', function (e) {
                e.preventDefault();
                var height = 0;

                $('.site-index-lists').find('.contener-site-index').each(function () {
                    height += $(this).outerHeight(true);
                });

                if ($(this).hasClass('open')) {
                    $('.site-index-lists').animate({ height: '0px' }, 1000);
                    $(this).removeClass('open');
                } else {
                    $('.site-index-lists').animate({ height: height + 'px' }, 1000, function () {
                        $(this).css('height', 'auto');

                    });
                    $("html, body").animate({ scrollTop: $(document).height() }, 1000);
                    $(this).addClass('open');
                }
            })

            /*
             * LANGUAGE HIDE/SHOW
             */
            $('.languageButton').on('click', function (e) {
                e.preventDefault();
                var height = $('.languages ul').outerHeight(true);
                if ($(this).hasClass('open')) {
                    $('.languages').animate({ height: '0px' }, 1000);
                    $(this).removeClass('open');
                } else {
                    $('.languages').animate({ height: height + 'px' }, 1000);
                    $(this).addClass('open');
                }
            })

            /*
             * SANITEC MAP HIDE/SHOW
             */
            $('#sanitec_map').on('click', function (e) {
                e.preventDefault();

                if ($(this).hasClass('open')) {
                    $('.brands-map').animate({ height: '0px' }, 1000, function () {
                        $('.brands-map').css({ "display": "none", "height": "" })
                    });
                    $(this).removeClass('open');
                } else {

                    if ($('.brands-map').hasClass('hide')) {
                        $('.brands-map').removeClass('hide').insertBefore($('.button_map_contener'));
                        //App.activePointMap();
                    }

                    //var newHeight = $('.main-content').width() * 0.5768;
                    var newHeight = $('.brands-map').height();

                    $('#interactiveMap, #svgMap').height(newHeight);

                    //if (App.viewport().width < 768) {
                    //    newHeight *= 1.5;
                    //    $('#interactiveMap, #svgMap').height(newHeight);
                    //    newHeight += $('.brands-desc-container>.brands-desc').height();
                    //}

                    $('.brands-map').css({ height: '0px' });
                    $('.brands-map').show();
                    $('.brands-map').animate({ height: newHeight + 'px' }, 1000, function () {

                        //if (App.viewport().width < 768) {
                        //    newHeight = $('.brands-map').height() + $('.brands-desc-container>.brands-desc').height();
                        //    $('.brands-map').animate({ height: newHeight + 'px' }, 300);
                        //}
                        $('.brands-map').css({ height: '' });
                    });
                    $(this).addClass('open');
                }

                //$(window).resize(function () {
                //    App.activeMapResize();
                //});
            })

            /*
             * JOB OFFERS HIDE/SHOW
             */
            $('.job-offers .arrow').on('click', function () {
                $(this).toggleClass('open');
                var details = $(this).parent().parent().find('.details');
                var height = 0;
                details.children().each(function () {
                    height += $(this).outerHeight(true);
                })
                if ($(this).hasClass('open')) {
                    details.animate({ height: height }, 1000);
                } else {
                    details.animate({ height: '0px' }, 1000);
                }
            });

            /*
             * FAQ HIDE/SHOW
             */
            $('.faq-partials ul li h3').on('click', function () {
                $(this).toggleClass('open');
                elem1 = $(this).siblings('.details');
                elem2 = $(this).children('span.arrow');
                if (!$(this).hasClass('open')) {
                    elem1.animate({ 'height': 0 });
                    elem2.removeClass('open');
                } else {
                    var height = 0;
                    elem1.children().each(function (i, item) {
                        height = height + $(item).height();
                    });
                    //console.log(height);
                    var temp = elem1.css('height', 'auto').height();
                    elem1.height("0").animate({ height: temp })
                    elem2.addClass('open');
                }
            });

            /*
             * SITE_INDEX & SANITEC MAP HIDE/SHOW
             */
            $('.list-category-buttons ul li').on('click', function (e) {
                e.preventDefault()
                $('.list-category-buttons ul li').removeClass('active');
                $(this).addClass('active');
            })

            /*
             * INDEPENDENT MORE BUTTON SWITCH---------------------------  TEST THIS!!!!!!!!!
             */
            if ($('.independent ul li').length > 6) {
                $('.more-independent').show();
                $('.independent .independent-button').on('click', function () {
                    if ($(this).hasClass('more-independent')) {
                        $(this).hide();
                        $('.less-independent').show();
                        $('.independent ul li').show(500);
                    } else {
                        $(this).hide();
                        $('.more-independent').show();
                        $('.independent ul li').each(function (index, data) {
                            if (index >= 6) {
                                $(data).hide(500);
                            }
                        });
                    }
                });
            }
        },

        filesDownloadButtonDisable: function () {

            checkFiles();
            $('.downloads-mainPanel input, .downloads-filters input').on('change', function () {
                checkFiles();
            });

            function checkFiles() {
                if ($('.downloads-mainPanel .ez-checked').length == 0) {
                    $('.downloads-rightFilters button').attr('disabled', 'disabled');
                } else {
                    $('.downloads-rightFilters button').removeAttr('disabled');
                }
            }
        },

        activeMapResize: function () {
            var newHeight = $('#svgMap').width() * 0.5768;

            $('.brands-map').attr('data-height', $('.group-layer').outerHeight(true));

            if ($('#sanitec_map').hasClass('open')) {
                var height = newHeight;
                if (App.viewport().width < 768) {

                    height += $('.brands-desc-container>.brands-desc').height();

                }
                $('.brands-map').css({ height: height + 'px' });

                $('#interactiveMap, #svgMap').css({ height: newHeight + 'px' });
            }
        },

        inputStyle: function () {
            /*
             * STYLE SELECT  http://www.8stream.com/blog/entry/styleselect
             */

            var options = {
                styleClass: "selectDark",
                optionsWidth: '175px',
                jScrollPane: 1,
                jScrollPaneOptions: {
                    autoReinitialise: true,
                    autoReinitialiseDelay: 0,
                    mouseWheelSpeed: 20
                }
            };
            var options1 = {
                styleClass: "selectLight",
                optionsWidth: '180px',
                jScrollPane: 1,
                jScrollPaneOptions: {
                    autoReinitialise: true,
                    autoReinitialiseDelay: 0,
                    mouseWheelSpeed: 20
                }
            };
            $('select').each(function (index) {
                if (!$(this).attr('data-name')) {
                    $(this).attr('data-name', 'tab' + index + '[]');
                }
            });
            $(".styled-select select").styleSelect(options);
            $(".no-name-select select").styleSelect(options);
            $(".boxType-select select").styleSelect(options);
            $(".brand-select select").styleSelect(options1);
            $(".type-select select").styleSelect(options1);
            $(".category-select select").styleSelect(options1);
            $(".subcategory-select select").styleSelect(options1);
            $(".collection-select select").styleSelect(options1);
            $(".style-select select").styleSelect(options1);
            $(".size-select select").styleSelect(options1);
            $(".filetype-select select").styleSelect(options1);
            $(".position-select select").styleSelect(options1);
            $(".email-updates-select select").styleSelect(options1);
            $(".scfDropListGeneralPanel select").styleSelect(options1);
            $(".scfDateSelectorGeneralPanel select").styleSelect(options1);
            $(".whoiam select").styleSelect(options1);
            $(".order-list .text select").styleSelect(options);//form select

            /*
             * STYLE CHECKBOX  http://www.itsalif.info/content/ezmark-jquery-checkbox-radiobutton-plugin
             */
            $('.styleCheckbox').each(function () {

                if ($(this).hasClass('checkboxFix')) {
                    $(this).removeClass('checkboxFix');
                    var classStr = $(this).attr('class');
                    var input = $(this).find('input').clone();
                    input.attr('class', classStr);
                    input.insertAfter($(this));
                    $(this).remove();
                }
            });
            $('.styleCheckbox').ezMark();
            $('.scfCheckbox input').ezMark();
            $('.myListStyleCheckbox, .styleRadio').ezMark({
                checkboxCls: 'myListCheckbox',
                checkedCls: 'myListCheckbox-checked'
            });//mylist checkbox

            /*
             * CHECKBOXES LIST SWITCH
             */
            $('.checkbox-list').each(function () {

                var list = $(this).find('.checkboxes-content');
                var listItems = list.find('li')
                var newHeight = 0;
                $(this).find('.default-value').html($(this).find('.default-value').html().replace(' ', '&nbsp;'));

                //calculate list width

                list.parent().show();//show list elements before calculate time
                list.show().width(500);
                list.parent().parent().parent().show();
                var maxWidth = 0;
                var elemWidth = 0;
                var counter = 0;
                $(' ul li label', $(this)).each(function () {

                    //elemWidth = parseInt($(this).css('width'));
                    elemWidth = $(this).width();
                    if (elemWidth > maxWidth) {
                        maxWidth = elemWidth;
                    }

                });
                //canceled
                0 && $(' ul li label', $(this)).each(function () {
                    $(this).css('width', maxWidth + "px");
                });
                //maxWidth = $(this).closest('.checkbox-list').width();


                // hide/show buttons
                if ($('ul li input:checkbox:checked', list).length == $('ul li input:checkbox', list).length) {
                    $('ul li button.check', list).hide();
                    $('ul li button.uncheck', list).removeClass('hidden').show();
                }
                else if ($('ul li input:checkbox:checked', list).length > 0) {
                    $('ul li button.check', list).show();
                    $('ul li button.uncheck', list).removeClass('hidden').show();

                } else {
                    $('ul li button.check', list).show();
                    $('ul li button.uncheck', list).hide();
                }

                ////calculate list height
                counter = Math.min(listItems.length, 6);

                list.css('width', '');

                listItems.each(function (i) {
                    if (i < counter) {
                        newHeight += $(this).height();
                    }
                })

                list.hide(); //hide list elements before calculate time
                if (App.viewport().width <= 767) {
                    list.parent().hide();
                    list.parent().parent().parent().hide();
                }
                list.find('.checkboxes').height(newHeight);


                //jscrollPane inicialize
                list.find('.checkboxes').jScrollPane({
                    verticalDragMaxHeight: 77,
                    autoReinitialise: true,
                    autoReinitialiseDelay: 100,
                    mouseWheelSpeed: 20
                });
                list.width(maxWidth);
                list.addClass('active-checkbox-list');

                //hide show checkbox list
                $(this).on('click', function (e) {

                    e.stopPropagation();

                    if (list.css('display') == 'block') {
                        $('.checkboxes-content').hide();
                        $('.checkbox-list').removeClass('opened');
                        if (list.hasClass('change')) {
                            list.removeClass('change');
                            //Filtration.startFiltration();
                        }

                    } else {
                        var makeRequest = false;
                        $('.checkboxes-content').each(function (index, item) {
                            if ($(item).css('display') == 'block') {
                                $('.checkbox-list').removeClass('opened');
                                $(item).removeClass('change').hide();
                                //makeRequest = true;
                            }
                        });
                        if (makeRequest) {
                            Filtration.startFiltration();
                        }
                        //('.checkboxes-content').hide();
                        list.toggle();
                        $(this).addClass('opened');
                    }
                    //hide other selects
                    $('.selectLight .styleSelect_item, .selectDark .styleSelect_item').hide();
                    var checkboxWidth = $('.jspPane ul li .ez-checkbox').width();
                    var containerWidth = maxWidth;// + checkboxWidth + 50;
                    var minContainer = $('.checkbox-list').width();
                    $('.jspPane, .jspContainer, .checkboxes-content, .checkboxes', $(this)).css({ 'width': containerWidth + "px", 'min-width': minContainer + "px" });

                });

                //update selected checkboxes
                $('li', list).each(function () {
                    var $this = $(this),
                        $checkbox1 = $('input[type=checkbox]', this).eq(0),
                        $checkbox2 = $('input[type=checkbox]', this).eq(1);
                    if ($checkbox2.prop('checked') && !$checkbox1.prop('checked')) {
                        $checkbox1.prop('checked', true);
                        $('.ez-checkbox', this).addClass('ez-checked');
                    }

                });

            });
            App.subcategoryFiltersFix();

            //update currently checked checkboxes
            //$('.checkboxes-content ul li').each(function () {
            //    var $ez = $('.ez-checkbox', this);
            //    $ez.toggleClass('ez-checked', $('input[type=checkbox]', $ez).prop('checked'));
            //});

            $('.checkboxes-content ul li').on('click', function (e) {

                if ($(this).hasClass('disable-checkbox')) {
                    return false;
                }

                var checkbox = $(this).find('.ez-checkbox');
                var input = checkbox.find('input[type="checkbox"]');

                //console.log(input.length, input.prop('checked'), e.target);
                if (input.is(':checked')) {

                    input.prop('checked', false);
                    //  checkbox.removeClass('ez-checked');
                } else {

                    input.prop('checked', true);
                    checkbox.addClass('ez-checked');
                    //SAME ABOVE IN update selected checkboxes
                }
                $(this).parents().find('.checkboxes').addClass('activeFilter');
                //console.log($(this).parents());
                input.trigger('change');

            });

            //update selected checkboxes
            $('.checkbox-list').each(function () {
                $('.checkboxes li', this).each(function () {
                    var $this = $(this);
                });
            });

            function refreshNav(element) {
                //var pane = $('.checkboxes').each(function () {
                //var api = element.data('jsp');
                //api.reinitialise();
                //});
            }


            /*
                 * Check/uncheck all
                 */
            //checks
            $('.checkbox-list li button').on('click', function (e) {

                e.preventDefault();

                var contener = $(this).parents('.jspPane');

                if ($(this).hasClass('check')) {

                    //$('ul li input:checkbox', contener).each(function () {
                    //    if ($(this).prop('disabled') == false) {
                    //    }
                    //});
                    $('ul li:not(.disable-checkbox) input:checkbox', contener).prop('checked', true);
                    $('ul li:not(.disable-checkbox) .ez-checkbox', contener).addClass('ez-checked');
                    $('ul li button.check', contener).hide();
                    $('ul li button.uncheck', contener).show();

                }
                if ($(this).hasClass('uncheck')) {

                    $('ul li input:checkbox', contener).prop('checked', false);
                    $('ul li .ez-checkbox', contener).removeClass('ez-checked');
                    $('ul li button.check', contener).show();
                    $('ul li button.uncheck', contener).hide();
                }

                $(this).parents('.checkboxes-content').addClass('change');
                //call ajax filter enable/disable
                //productFilters();
            });

            $('.checkbox-list li input:checkbox').change(function () {

                var contener = $(this).parents('.jspPane');

                if ($('ul li input:checkbox:checked', contener).length == $('ul li input:checkbox', contener).length) {
                    $('ul li button.check', contener).hide();
                    $('ul li button.uncheck', contener).show();
                }
                else if ($('ul li input:checkbox:checked', contener).length > 0) {
                    $('ul li button.check', contener).show();
                    $('ul li button.uncheck', contener).show();
                } else {
                    $('ul li button.check', contener).show();
                    $('ul li button.uncheck', contener).hide();
                }
                $(this).parents('.checkboxes-content').addClass('change');
                $(this).parents('.checkboxes').addClass('activeFilter');
                //call ajax filter enable/disable
                //productFilters();
            });

            $('.styleCheckbox').on('change', function (e) {
                var $target = $(e.target);

                $target.parents('li').children('div.ez-checkbox').toggleClass('ez-checked');
                if ($($target).parents('li').children('input').first().prop('checked')) {
                    //console.log("style on")
                    $($target).parents('li').children('input').first().removeAttr('checked');
                    $target.parents('li').children('div.ez-checkbox').removeClass('ez-checked');
                } else {
                    //console.log("style else")
                    $($target).parents('li').children('input').first().prop('checked', true);
                    $target.parents('li').children('div.ez-checkbox').addClass('ez-checked');
                }
            });

            $('.downloads-leftFilters-new .jspPane ul li').on('click', function (e) {
                var $target = $(e.target);

                $target.closest('div.ez-checkbox').toggleClass('ez-checked', $target.is(':checked'));
            });

            function visibleFilter() {
                if ($('.cloud-filters .active-filters-element').length > 0) {
                    $('.downloads-active-filters').css('display', 'block');
                }
                else {
                    $('.downloads-active-filters').css('display', 'none');
                }
            };
            visibleFilter();

            $('.checkbox-list').on('click', function () {
                $.each($(this).find('li'),
                    function () {
                        if ($(this).children('input').prop('checked')) {
                            $(this).children('div.ez-checkbox').addClass('ez-checked');
                        } else {
                            $(this).children('div.ez-checkbox').removeClass('ez-checked');
                        }
                    });
            });

            $('#selectall').on('change', function (e) {
                $('.styleCheckbox').prop('checked', $(this).prop('checked'));

                var isCheck = false;
                if (this.closest('div.ez-checkbox.ez-checked')) {
                    isCheck = true;
                }

                $('.styleCheckbox').closest('div.ez-checkbox').toggleClass('ez-checked', isCheck);
                $('.styleCheckbox.ez-hide').prop('checked', isCheck);
            });

            $('.selectall .ez-checkbox + label, .scfCheckbox .ez-checkbox + label').click(function (event) {
                event.preventDefault();
                $(this).prev('.ez-checkbox').trigger('click');
            });

            $('.to-download li .ez-checkbox').on('change', function (e) {
                e.preventDefault();
                var that = this;

                var selectAll = $('#selectall');
                selectAll.closest('div.ez-checkbox').removeClass('ez-checked');
                selectAll.prop('checked', false);

                if (!$(e.target).is(':checked')) {
                    $(that).toggleClass('ez-checked', false);
                } else {
                    $(that).toggleClass('ez-checked', true);
                }
                App.filesDownloadButtonDisable();
            });

            $('html').on('click', function () {
                var makeRequest = false;
                $('.checkboxes-content').each(function (index, item) {
                    $(item).hide();
                    if ($(item).hasClass('change')) {
                        $(item).removeClass('change').hide();
                        makeRequest = true;
                    }
                });
                if (makeRequest) {
                    // Filtration.startFiltration();
                }
                $('.checkboxes-content').hide();
            });

            $('.checkboxes-content').on('click', function (e) {
                e.stopPropagation();
            });

            $('.checkboxes-content .apply').on('click', function () {
                Filtration.startFiltration();
                $(this).closest('.checkboxes-content').hide();
                $(".filters .markers-wrap .markers-title").show();
                return false;
            });
        },

        subcategoryFiltersFix: function () {

            if ($('.filters>ul>li').length < 2) {
                $('.filters>ul>li').addClass('no-table');
            } else {
                $('.filters>ul>li').removeClass('no-table');
            }
        },

        subcategoryFiltrs: function () {
            /*
            * COLOR CHECKBOX
            */
            $('.color-choice').each(function () {
                if ($(this).find('input:checkbox').is(':checked')) {
                    $(this).addClass('active');
                }

                if ($(this).find('input:checkbox').is(':disabled')) {
                    $(this).addClass('disabled-color')
                }
            });

            $('.color-choice').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();


                var makeRequest = false;
                $('.checkboxes-content').each(function (index, item) {
                    if ($(item).hasClass('change')) {
                        $(item).removeClass('change').hide();
                        makeRequest = true;
                    }
                });
                if (makeRequest) {
                    Filtration.startFiltration();
                    return false;
                }

                if ($(this).hasClass('active') == false && $(this).hasClass('disabled-color') == false) {

                    $(this).addClass('active');
                    $(this).parent().addClass('activeFilter');
                    //$('.colorTitle').html($(this).attr('data-color'));
                    $(this).find('input:checkbox').prop('checked', true);

                    //call ajax filter enable/disable
                    //productFilters();
                    Filtration.startFiltration();

                } else if ($(this).hasClass('disabled-color') == false) {
                    $(this).removeClass('active');
                    $(this).find('input:checkbox').prop('checked', false);

                    //call ajax filter enable/disable
                    //productFilters();
                    Filtration.startFiltration();
                }

            })

            $('.color-choice').on('mouseenter', function (e) {

                if ($(this).hasClass('disabled-color') == false) {

                    var img = $(this).find('img').clone();
                    var loupe = $('<div></div>').addClass('loupe').html(img);
                    loupe.appendTo($(this));
                    loupe.on('mouseenter', function (e) {
                        $(this).remove();
                    });
                }
            })

            $('.color-choice').on('mouseleave', function (e) {
                $(this).find('.loupe').remove();
            })

            /*
             * ZIP SETTINGS jQuery UI
             */

            $(".zip-size").each(function () {
                var min = parseInt($(this).attr('data-min'));
                var max = parseInt($(this).attr('data-max'));
                var step = parseInt($(this).attr('data-step'));
                var currentMax = parseInt($(this).parent().find('#CurrentDataMax').val());
                var currentMin = parseInt($(this).parent().find('#CurrentDataMin').val());

                if (currentMax <= 0) currentMax = max;
                var slider = $(this);
                $(this).slider({
                    range: true,
                    min: min,
                    max: max,
                    step: step,
                    values: [currentMin, currentMax],
                    slide: function (event, ui) {

                        var maximumMin = parseInt(slider.attr('data-maximummin'));
                        var minimumMax = parseInt(slider.attr('data-minimummax'));

                        if (maximumMin > -1 && maximumMin < ui.values[0] && ui.values[0] == ui.value) {

                            $(ui.handle).parent().slider("values", 0, maximumMin);
                            slider.parent().find('.values').html(maximumMin + " - " + ui.values[1]);
                            slider.parent().find('#Min').val(maximumMin);
                            slider.parent().find('#Max').val(ui.values[1]);
                            return false;
                        }

                        if (minimumMax > -1 && minimumMax > ui.values[1] && ui.values[1] == ui.value) {

                            $(ui.handle).parent().slider("values", 1, minimumMax);
                            slider.parent().find('.values').html(ui.values[0] + " - " + minimumMax);
                            slider.parent().find('#Min').val(ui.values[0]);
                            slider.parent().find('#Max').val(minimumMax);
                            return false;
                        }

                        slider.parent().find('.values').html(ui.values[0] + " - " + ui.values[1]);
                        slider.parent().find('#Min').val(ui.values[0]);
                        slider.parent().find('#Max').val(ui.values[1]);

                    },
                    start: function (event, ui) {
                        var makeRequest = false;
                        $('.checkboxes-content').each(function (index, item) {
                            if ($(item).hasClass('change')) {
                                $(item).removeClass('change').hide();
                                makeRequest = true;
                            }
                        });
                        if (makeRequest) {

                            $(ui.handle).parent().slider("disable");
                            Filtration.startFiltration();
                            //ui.slider('disable');
                        }
                    },
                    stop: function (event, ui) {

                        if (!$(ui.handle).hasClass('ui-state-hover')) {
                            $(ui.handle).parent().find('.ui-slider-range').removeClass('rightActive').removeClass('leftActive');

                        }

                        //call ajax filter enable/disable
                        //productFilters();
                        $(ui.handle).parent().parent().addClass('activeFilter');
                        $(ui.handle).parent().slider("disable");
                        Filtration.startFiltration();
                    }
                });
                $(this).parent().find('.values').html($(this).slider("values", 0) + " - " + $(this).slider("values", 1));
                $(this).parent().find('#Min').val($(this).slider("values", 0));
                $(this).parent().find('#Max').val($(this).slider("values", 1));

                $(this).find('.ui-state-default').on('mouseover', function () {

                    var handlers = $(this).parent().find('.ui-slider-handle');

                    if (parseInt($(this).css('left').replace('px', '')) >= parseInt($(handlers[0]).css('left').replace('px', '')) && parseInt($(this).css('left').replace('px', '')) >= parseInt($(handlers[1]).css('left').replace('px', ''))) {
                        $(this).parent().find('.ui-slider-range').addClass('rightActive');
                    } else {
                        $(this).parent().find('.ui-slider-range').addClass('leftActive');
                    }

                });
                $(this).find('.ui-state-default').on('mouseleave', function () {

                    if (!$(this).hasClass('ui-state-active')) {
                        $(this).parent().find('.ui-slider-range').removeClass('rightActive').removeClass('leftActive');
                    }

                });
            });
            Filtration.getFiltersState();
            Filtration.markerRender();
            /*
             * Select fire productFilters() after change
             */
            $('.filters select').on('change', function () {
                //call ajax filter enable/disable
                //productFilters();
                Filtration.startFiltration();
            })


            /*
             * Filters Display IE7 fix
             */
            if (navigator.appVersion.indexOf("MSIE 7") != -1) {

                var colorWidth = 0;
                var itemWidth = 0;
                var contenerWidth = $('.filters>ul').width();
                var itemMargin = $('.filters>ul>li').outerWidth(true) - $('.filters ul li').width();
                itemWidth = (contenerWidth / ($('.filters>ul>li').length)) - itemMargin;
                $('.filters>ul>li').each(function () {
                    $(this).width(itemWidth);
                });
            }

            //Filters switch enable/disable
            //productFilters();
            App.subcategoryFiltersFix();
        },

        itemsListStyle: function () {
            /*
            * SHIFT LIST/GRID STYLE
            */

            if ($.cookie("listStyle") == 'true') {
                $('.item-list-button.active').removeClass('active');
                $('.item-list-button.list-button').addClass('active');
                $('.subcategories-page .item-list').addClass('list-style');
            }

            $('.item-list-button').on('click', function () {
                $('.item-list-button.active').removeClass('active');
                $(this).addClass('active');
                if ($(this).hasClass('list-button')) {
                    $('.item-list').addClass('list-style');
                    $.cookie("listStyle", true, { path: '/' });
                } else {
                    $('.item-list').removeClass('list-style');
                    $.cookie("listStyle", false, { path: '/' });
                }
            });
        },

        imagesPopup: function (newImgUrl) {
            $('<div/>', {
                'class': 'popup large-9'
            }).appendTo('body');
            $('<img/>', {
                'class': 'popupImage',
                src: newImgUrl
            }).appendTo('.popup');
            var leftNav = $('<span></span>').addClass('gallery-nav-left');
            var rightNav = $('<span></span>').addClass('gallery-nav-right');
            leftNav.prependTo('.popup');
            rightNav.appendTo('.popup');
        },

        overlap: function () {
            /*
             * PRODUCTS OVERLAPS HIDE/SHOW jQuery UI
             */
            $('#overlaps').tabs({
                beforeActivate: function (event, ui) {
                    $('li[aria-controls=technical]').on('click', function () {
                        $('.imageSize').each(function () {
                            $(this).remove();
                        });
                        $('#technical ul li img').each(function () {
                            var imgUrl = $(this).attr('src');
                            var subIndex = imgUrl.indexOf('?mw');
                            var newImgUrl = imgUrl.substr(0, subIndex - 1);
                            $('<img class="imageSize" src="' + newImgUrl + '">').appendTo($(this).parent()).css({ 'position': 'fixed', 'z-index': '-99999', 'top': 0, 'visibility': 'hidden' });
                        });
                    });
                },
                create: function (event, ui) {
                    $('#technical ul li img').unbind('click').on('click', function () {
                        var imgWidth = $('.imageSize').width();
                        function ifWindow() {
                            var imgWidth = $('.imageSize').width();
                            var imgHeight = $('.popupImage').height() * 1.1;
                            var windowHeight = $(window).height();
                            var dialW = ($(window).width() / 2) - ($('.ui-dialog').width() / 2);
                            var dialH;
                            if (imgHeight > windowHeight) {
                                dialH = 0;
                            } else {
                                dialH = ($(window).height() / 2) - ($('.ui-dialog').height() / 2);
                            }
                            if ($(window).width() > 768) {
                                $('.popup').dialog('option', 'position', {
                                    my: 'center', at: 'center', of: window,
                                    collision: 'none'
                                });
                                $('.ui-dialog').css({
                                    'width': 'auto',
                                    'top': dialH,
                                    'left': dialW
                                });
                            } else if ($(window).width() < 768 && $(window).width() > 600) {
                                $('.popup').dialog('option', {
                                    position: {
                                        my: 'center', at: 'center', of: window,
                                        collision: 'none'
                                    },
                                    width: imgWidth
                                });
                                $('.ui-dialog').css({
                                    'width': 'auto',
                                    'top': dialH,
                                    'left': dialW
                                });
                            } else {
                                $('.popup').removeClass('large-9');
                                $('.ui-dialog').css({
                                    'width': '100%',
                                    'top': dialH,
                                    'left': '0'
                                });
                            }
                        }
                        function nonStandardImage() {
                            var imgHeight = $('.popupImage').height();
                            var windowHeight = $(window).height();
                            if ($('.popupImage').width() > $(window).width()) {
                                $('.popupImage').css({
                                    'width': '100%',
                                    'height': 'auto'
                                });
                            }
                            if (imgHeight > windowHeight) {
                                $('.ui-dialog').css({
                                    'height': windowHeight,
                                    'max-height': windowHeight
                                });
                                $('.popupImage').css({
                                    'width': '100%',
                                    'max-height': windowHeight * 0.9,
                                    'height': 'auto'
                                });
                            }
                        }

                        $(this).each(function () {
                            var imgUrl = $(this).attr('src');
                            var subIndex = imgUrl.indexOf('?mw');
                            var newImgUrl = imgUrl.substr(0, subIndex);
                            App.imagesPopup(newImgUrl + "?mw=845");
                            var dialogStart = $('.popup').dialog({
                                //autoOpen: false,
                                modal: true,
                                width: imgWidth,
                                open: function (event, ui) {
                                    $('.ui-dialog').css('width', 'auto');
                                    $('.ui-dialog').wrap('<div class="popup-wraper"></div>');
                                    ifWindow();
                                    nonStandardImage();
                                },
                                position: {
                                    my: 'center-5%', at: 'center-5%', of: document,
                                    collision: 'none'
                                },
                                close: function (event, ui) {
                                    $('.popup-wraper').remove();
                                    $('.popup').remove();
                                    $('.popupImage').remove();
                                    $('.imageSize').remove();
                                }
                            });
                        });
                        $(window).on('load resize', function () {
                            ifWindow();
                            nonStandardImage();
                        });
                    });
                },
                activate: function (event, ui) {
                    $('#technical ul li img').unbind('click').on('click', function () {
                        var imgWidth = $('.imageSize').width();
                        function ifWindow() {
                            var imgWidth = $('.imageSize').width();
                            var imgHeight = $('.popupImage').height() * 1.1;
                            var windowHeight = $(window).height();
                            var dialW = ($(window).width() / 2) - ($('.ui-dialog').width() / 2);
                            var dialH;
                            if (imgHeight > windowHeight) {
                                dialH = 0;
                            } else {
                                dialH = ($(window).height() / 2) - ($('.ui-dialog').height() / 2);
                            }
                            if ($(window).width() > 768) {
                                $('.popup').dialog('option', 'position', {
                                    my: 'center', at: 'center', of: window,
                                    collision: 'none'
                                });
                                $('.ui-dialog').css({
                                    'width': 'auto',
                                    'top': dialH,
                                    'left': dialW
                                });
                            } else if ($(window).width() < 768 && $(window).width() > 600) {
                                $('.popup').dialog('option', {
                                    position: {
                                        my: 'center', at: 'center', of: window,
                                        collision: 'none'
                                    },
                                    width: imgWidth
                                });
                                $('.ui-dialog').css({
                                    'width': 'auto',
                                    'top': dialH,
                                    'left': dialW
                                });
                            } else {
                                $('.popup').removeClass('large-9');
                                $('.ui-dialog').css({
                                    'width': '100%',
                                    'top': dialH,
                                    'left': '0'
                                });
                            }
                        }
                        function nonStandardImage() {
                            var imgHeight = $('.popupImage').height();
                            var windowHeight = $(window).height();
                            if ($('.popupImage').width() > $(window).width()) {
                                $('.popupImage').css({
                                    'width': '100%',
                                    'height': 'auto'
                                });
                            }
                            if (imgHeight > windowHeight) {
                                $('.ui-dialog').css({
                                    'height': windowHeight,
                                    'max-height': windowHeight
                                });
                                $('.popupImage').css({
                                    'width': '100%',
                                    'max-height': windowHeight * 0.9,
                                    'height': 'auto'
                                });
                            }
                        }

                        $(this).each(function () {
                            var imgUrl = $(this).attr('src');
                            var subIndex = imgUrl.indexOf('?mw');
                            var newImgUrl = imgUrl.substr(0, subIndex);
                            App.imagesPopup(newImgUrl + "?mw=845");
                            var dialogStart = $('.popup').dialog({
                                //autoOpen: false,
                                modal: true,
                                width: imgWidth,
                                open: function (event, ui) {
                                    $('.ui-dialog').css('width', 'auto');
                                    $('.ui-dialog').wrap('<div class="popup-wraper"></div>');
                                    ifWindow();
                                    nonStandardImage();
                                },
                                position: {
                                    my: 'center-5%', at: 'center-5%', of: document,
                                    collision: 'none'
                                },
                                close: function (event, ui) {
                                    $('.popup-wraper').remove();
                                    $('.popup').remove();
                                    $('.popupImage').remove();
                                    $('.imageSize').remove();
                                }
                            });
                        });
                        $(window).on('load resize', function () {
                            ifWindow();
                            nonStandardImage();
                        });
                    });
                }
            });
        },

        videoEmbed: function () {
            //$('.video-type').youTubeVideo('video-type');
            //$('.video-type').each(function () {
            $('.product-content [video-id], .main-content [video-id]').each(function () {
                var id = $(this).attr('video-id');

                if (id.length === 0) {
                    return;
                }

                var imgPlay = $('<span></span>').addClass('imgPlay');
                //if it isn't product carousel
                //if ($('product-slide').length != 0) {

                //set video image
                if ($(this).css('position') != "absolute")
                    $(this).css('position', 'relative');


                //if ($('product-slide').length != 0) {
                //set pictureId
                if (id.indexOf('&') != -1) {
                    var pictureId = id.substring(0, id.indexOf('&'));
                } else {
                    var pictureId = id;
                }

                if ($('img', $(this)).length > 0) {
                    $(this).find('img').attr('src', 'http://img.youtube.com/vi/' + pictureId + '/maxresdefault.jpg');
                }
                else {
                    var img = $('<img></img>');
                    img.attr('src', 'http://img.youtube.com/vi/' + pictureId + '/maxresdefault.jpg');
                    if ($(this).find('a').length > 0) {
                        img.appendTo($(this).find('a'));
                    } else {
                        img.appendTo($(this));
                    }

                }

                imgPlay.appendTo($(this));
                //}
                //} else {
                //imgPlay.appendTo($(this).parent());
                //}


                //run popup video
                $(this).on('click', function () {

                    if ($(this).parent().hasClass('tip')) {//video off for tips list and video list
                        return 0;
                    }

                    var id = $(this).attr('video-id');

                    if (id.length > 11) {
                        index = id.indexOf('v=') + 2;
                        id = id.substring(index, index + 11);
                    }
                    var contener = $(this);
                    if (!App.player) {//set youtube api js(flash)/iframe

                        var playerVersion = swfobject.getFlashPlayerVersion();
                        var majorVersion = playerVersion.major;
                        var tag = document.createElement('script');



                        //   if (majorVersion > 9) {//flash player

                        //      createPlayer(id, 'flash', contener);

                        //   } else {//iframe player

                        tag.src = "//www.youtube.com/iframe_api";
                        $('script').each(function () {
                            if ($(this).src == tag.src) return false;
                        });
                        var firstScriptTag = document.getElementsByTagName('script')[0];
                        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                        //     }

                        window.onYouTubeIframeAPIReady = function () {//iframe api callback function
                            createPlayer(id, 'iframe', contener);
                        }


                    } else {
                        createPlayer(id, 'iframe', contener);
                    }

                    function createPlayer(id, type, contener) {

                        var isPopup = true;

                        if (contener.hasClass('video-content') || contener.hasClass('mainMedia-subcontent')) {
                            var video = $('<div id="player"></div>');
                            contener.html(video);
                            isPopup = false;

                        } else {
                            var video = $('<div></div>').addClass('yt-player');//.addClass('hiden').hide();
                            video.html('<div id="player"></div><button type="button" title="Close" class="removeBox"></button>');
                            video.appendTo('body');
                            showVideo(); //thumbile
                        }


                        if (type == 'iframe') {//create iframe player

                            App.player = new YT.Player('player', {
                                //height: '80%',
                                //width: '90%',
                                videoId: id,
                                playerVars: {
                                    'rel': 0,
                                    'showinfo': 0,
                                    'enablejsapi': 1,
                                    'autoplay': 1
                                },
                                events: {
                                    'onReady': onPlayerReady
                                }
                            });
                        } else {//create flash player

                            var params = {
                                allowScriptAccess: "always",
                                allowfullscreen: "true"
                            };
                            var atts = { id: "player" };
                            swfobject.embedSWF("http://www.youtube.com/v/" + id + "?enablejsapi=1&playerapiid=ytplayer&version=3", "player", "425", "356", "8", null, null, params, atts);
                        }

                        function onPlayerReady(event) {//iframe player callback function
                            //if (isPopup == true) {
                            //    //showVideo();
                            //}
                        }

                        window.onYouTubePlayerReady = function () {//flash player callback function
                            //if (isPopup == true) {
                            //    //showVideo();
                            //}
                            ytplayer = document.getElementById("player");
                            ytplayer.playVideo();

                        }
                    }

                    function videoResize() {
                        var wideoWraper = $('.yt-player');
                        var videoWidth = $('.main-content').width();
                        var videoHeight = videoWidth * (2 / 4);
                        var videoTop = 0;
                        var videoLeft = 0;

                        if (videoHeight < $(window).height()) {
                            videoTop = ($(window).height() - videoHeight) / 2;
                        } else if (videoHeight >= $(window).height()) {
                            videoHeight = $(window).height();
                        }

                        if (videoWidth < $(window).width()) {
                            videoLeft = ($(window).width() - videoWidth) / 2;
                        } else if (videoWidth >= $(window).width()) {
                            videoWidth = $(window).width();
                        }

                        wideoWraper.css({
                            position: 'fixed',
                            width: videoWidth,
                            zIndex: 5,
                            height: videoHeight,
                            top: videoTop,
                            left: videoLeft,
                            display: 'block'
                        });
                    }

                    function showVideo(id) {
                        var bg = $('<div></div>').addClass('popup-wraper');

                        //var bg = $('<div></div>').addClass('popup-wraper');
                        bg.appendTo($('body'));

                        videoResize();
                        $('.removeBox').on('click', function () {
                            $('.popup-wraper').remove();
                            $('.yt-player').remove();
                        });
                    }


                    //responsive video popup
                    var globalTimer = null;

                    $(window).resize(function () {

                        clearTimeout(globalTimer);
                        globalTimer = setTimeout(videoResize, 400);

                    });
                });
                //responsive video play button
                $(window).resize(function () {
                    playImgSet();
                });
            });

            $(window).load(function () {
                playImgSet();
            });

            function playImgSet() {
                $('[video-id]').each(function () {
                    $(this).children('.imgPlay').position({
                        my: 'center',
                        at: 'center',
                        of: $(this)
                    });
                });
            }
        },

        googleMap: function () {
            var tempkey = $('.googleMap').attr('data-apikey');
            if (tempkey) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                //script.src = 'http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=geometry,places&' +
                //    'callback=initialize';
                script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=geometry,places&' +
                    'callback=initialize' + '&key=' + tempkey;
                document.body.appendChild(script);
                $('input#target').on('focus', function () {
                    $('.pac-container').css('min-width', '230px');
                });
            }
        },

        boxesPosition: function (a) {
            //set boxes css class for tablet and mobile
            GlobalMethod.boxesPosition(a);

            //calculate boxes height and position for mobile
            var agentSettings = App.viewport();

            if (agentSettings.width < 768 && $('.pageeditor').length == 0) {
                GlobalMethod.mobileComponentsSize();
                $.event.trigger({
                    type: "carouselReset"
                });
            }

            var globalTimer = null;

            $(window).resize(function () {

                agentSettings = App.viewport();

                if (agentSettings.width < 768 && $('.pageeditor').length == 0) {

                    clearTimeout(globalTimer);
                    //globalTimer = setTimeout(mobileComponentsSize, 100);//recalculate mobile settings
                    GlobalMethod.mobileComponentsSize();

                } else {
                    GlobalMethod.mobileSizeReset();//clear mobile settings
                }
            });
        },

        activePointMap: function () {

            if (navigator.appVersion.indexOf("MSIE 7") == -1 && navigator.appVersion.indexOf("MSIE 8") == -1) {

                var R = Raphael("interactiveMap");
            } else {
                var R = Raphael("interactiveMap", 950, 548);
            }

            var attr = {
                fill: "#e1e5e5",
                stroke: "#666",
                "stroke-width": 0.3,
                "stroke-linejoin": "round"
            };
            var eur = {};

            eur.pl = R.path("m589.61,179.74,3.0052,2.6958-0.0442,1.4142-3.0052-3.0494-1.0607-0.088,0.0442,2.1656,0.92808,1.0164,0.30936,2.5191,0.66291,0.3094,0.0442,0.8838,1.3258,0.1326,0.48614,0.9281,8.1759-0.044,0.0442-1.1049,1.0607-0.044,0.83968-0.7513,3.3146-0.2651,1.2374,1.4584,5.5685-0.442,0.7955,0.9723,9.2366,0.2652,0.7071,0.8397,11.093,0.2209,1.1932-1.1048,4.9056-0.044,0.17678-0.9723,2.7842-0.044,1.0165,1.9004,2.2097,0.1325,0.57453,0.8397,1.4584,0.1326,0,1.0165,0.88389,0.044,0.26516,5.1265,0.57453,1.0165,0,2.6516,1.2816,0.2652-0.13258,3.0494,1.1048-0.1326,0.0884,3.0494,0.88388,0.2652,0.30936,2.2538,0.92808,0.8839,0.13258,2.033,0.97227,1.149,0,2.7843,0.97228,1.0606,0,3.9775-2.9168,1.9887-3.0052,1.0607-2.961,2.9168-0.97228,3.0052,0.97228,0.9723,1.7678,0.1326,2.1213,0.8838,0.97228,2.1214,0.97227,0.9722,0.0884,4.0659-1.6794,1.812-1.1932,2.8726,2.6516,1.149-0.0884,5.7453,6.8059,7.2478,0.13258,0.7955-2.4307,0.3094,0.83969,2.0771,1.9004,1.9004,0,3.8448-3.403-0.2209,0,1.0164-2.961,0-11.004,15.954-1.1932,0.9723,0.13258,1.9887,1.2374,0.9281-0.22097,6.143,2.1213,1.1049-0.44195,0.9722-4.8614-0.7955-1.7678-0.4419-1.0607-0.9281-2.3865-0.4419-1.812-3.5797-2.1213-0.9281-1.5468-0.221-1.0165-0.8839-1.4142,0.9723-1.7678-0.8839-1.591-0.088-2.1655,1.0607-1.2816,1.9887-1.8562-0.044-1.6794-2.1213-5.1707,0.088-3.4913,4.2868-2.6958-0.1326-1.2816-4.11-3.6681-2.6075-0.30936-1.4142-1.3258,0.1326-3.0936,3.8007-2.2097-0.1768-0.61871-1.7678-1.6352-0.3977-0.0884-3.5355-2.6516-0.088-0.0884-4.2427-4.0217-0.7955-3.0494-2.6958-1.8562,1.8562-1.2374,0.088-0.97227-2.1214-0.79549-1.9445,1.1932-2.4307-5.3917,0.2652-3.6239-2.8284-2.0771-0.221,0.88389,2.2097,0.7513,1.812-2.6516,0.4419-1.2816,1.7236-1.6794-0.2652-2.1655-4.0659-2.8284-2.2539,3.7123-3.3145-0.88389-1.3259-2.8284-0.044-1.3258,1.3259-1.1048-2.033-1.6794-0.044-0.92808-2.0329-2.3423-0.088-0.97227-0.7513-2.8726-1.2816-1.0165-2.961-3.0052-2.0772s-0.17678-1.4584,0.0442-1.7235c0.22097-0.2652,1.2816-4.0659,1.2816-4.0659l-4.2868-3.8891,0.92807-3.0494-2.0771-1.1932,0.0442-1.5468,3.0936-3.2704-1.2374-5.1265-1.7678-1.9004,0.0442-2.2981,2.2981-1.8119-1.7236-2.0772-4.6404-2.9168-0.0442-2.8284,4.11-3.8449v-7.292l-1.3258-0.9281,0.22097-4.0659,2.8726,2.1655,1.0607-2.8284-3.182-2.2981,2.2981-1.2374,3.1378-1.8562h4.773l4.0659-0.8839,3.0494-1.2816,5.7894-0.9723,4.3752-5.701,4.552-0.3094,3.2704-2.6516,2.7842-0.3978,5.2149-0.9722,0.88388-0.9281h4.994z").attr(attr);
            eur.cz = R.path("m542.57,252.48-0.19888,0.6629-0.0884,0.5082,0,0.2431,0.0221,0.3978,0.0663,2.055-1.7899,0.3535-0.64082,0.9723-1.5689-0.4861-0.19887-1.6352-1.3479-1.9888-3.1378,0.044-0.24307,1.1712,1.127,0.8839-0.28726,1.0164-2.6958-0.066-1.0607,1.0385-2.8505,0.9502-4.4636,0.5303-0.64082,1.5689-2.4528,0.1989-1.4805,1.6794-1.8782,0.066-1.127,1.8782-1.5689-0.8618-3.6239,0.1326-2.1213,1.7678-3.8007,0.2872-0.33145,2.8727,2.6516,1.9224,1.2816,2.0992,0.90598,1.6131-1.6573,1.4363,0.0221,2.9831,1.1932,3.1599,3.2041,3.8891,2.8505,1.0607,1.9666,4.8392,1.9887,0.9502,0.97227,1.9667,2.9168,0.9722,2.2318,2.961,0.59662,1.1712,1.149,1.7235,1.3258,1.1049,3.8228,0.1768,1.9004-1.0607,1.127,0.9723,1.7678-0.022,0.0884-3.0715,3.403-0.3978,0.19887-4.7287,2.1876,1.4805,4.4194,0.5082,2.7621,1.3037,1.9666,1.127,2.0992,0.9943,1.2374,0.9502,4.4194-0.1105,2.1434-1.149,1.8783,2.1655,1.8562,0.221,1.7899,0.088,1.7899-2.6075,6.7838,0.1326,4.0217-1.8783,0.86179-1.8561,2.1434-1.0607,0.95017-3.2482,2.2981-1.7678,5.6127-3.5355-0.0221-3.4914-2.6516-0.1547-0.0884-4.1984-4.0217-0.8176-3.0052-2.6737-1.9004,1.7898-1.2595,0.1105-1.7678-4.1101,1.2153-2.3864-5.4138,0.2651-3.646-2.8505-2.055-0.1768,1.6352,3.9554-2.6296,0.4641-1.2816,1.7456-1.7015-0.3093-2.1655-3.9996-2.8505-2.3202,3.7565-3.2704-0.92808-1.3258-2.74-0.066-1.3479,1.3037-1.127-1.9887-1.6573-0.044-0.95017-2.055-2.3865-0.1105-0.92807-0.685-2.8284-1.3259-1.0828-2.9168z").attr(attr);
            eur.sk = R.path("m640.63,295.12-2-0.5-1.1094-0.9375-2.375-0.4687-1.8438-3.5469-2.1094-0.9531-1.5312-0.2344-1.0312-0.8437-1.4219,0.9375-1.7656-0.875-1.5781-0.094-2.1719,1.0625-1.2969,2-1.8438-0.031-1.6719-2.1407-5.1719,0.062-3.5,4.3282-2.7031-0.1563-1.2812-4.0937-3.6719-2.6407-0.29687-1.3906-1.3125,0.1563-3.1094,3.7812-2.1719-0.1719-0.625-1.75-1.7031-0.4218-5.7188,3.5937-2.2031,1.6875-0.98438,3.2656-2.1719,1.0625-0.8125,1.8594-4.0469,1.875-6.7812-0.125-1.7812,2.625-1.3594,3.6563-1.1562,3.9218,1.25,3.1563,3.8946,2.9105,5.1652,4.7214,3.9246,2.29,6.7656-0.078,4.3125-1.0157,1.6875-1.0625-0.79688-3.7187,2.1562-1.1875,8-0.3438,0.64063-2.8593,3.0156,1.2187,3.1406,1.2969,0.85937-2.3125,3.0469-1.1094,1.4531-2.7187,1.5156-2.5,3.25-0.7032,1.6719,1.0781,4.8594,0,3.2812-1.2343,1.3281,2.1406,1.8594,2.125,4.0156-0.062,1-1.0469,0-2.8593,1.8906-2.1407,1.1719-2.9531,2.0625-2.9687z").attr(attr);
            eur.hu = R.path("m569.46,315.67,5.1875,4.75,3.9375,2.2969,6.75-0.125,4.2812-0.9844,1.6875-1.0781-0.75-3.75,2.1406-1.1406,7.9531-0.375,0.70313-2.8282,6.1094,2.4844,0.89063-2.2969,3.0469-1.125,2.9688-5.2187,3.2344-0.7031,1.6875,1.1093,4.8594-0.016,3.2656-1.2187,1.3125,2.1406,1.9062,2.125,3.9844-0.094,1.0156-1.0312,2.0625,0.078,0.89062,2.8593,3.0781,0.2813-0.14063,1.8437,1.0781,0.9688,3.125,0.9375,1.625,1.25-0.73438,1.0469-2.4219,2.7187-1.6094,1.0469-4.1094,0.9219-3.1094,3.0625-0.84375,1.25-0.0469,2.7187-2.1094,2.9688-0.90625,2.0468-1.1875,0.9532-0.57812,3.2343-0.28125,1.7969-1.2031,3.0313-2.6094,1.2656,0.17187,3.9219-2.2656,1.7812-0.95313,2.0469-3.7031,0.1094-1.5938,1.625-4.6719,0.1406-1.0781,1.125-1.0625,0.1406-1.125-1.0625-3.9219,0.8125-2.1094-0.8906-2.7031-0.2031-3.0312,3.0781-3.5312,0.25-2.4844,2.5-2.2969-0.4844-1.1875-0.031-0.90625,1.875-1.8125,1.0313-4.625,0.062-1.4375-1.1719-3.7344,0.062-2-2.1563-1.125-0.75-3.0938-0.25-0.9375-0.9062-0.67188-3-1.4688-0.9219-1.5781-0.9375-6.2812-6.0156-1.25-1.0469-0.10938-3.0781-1.5781-1.8594,0.21875-3.7187,2.9688-2.3907-0.0469-0.8593-1.1094-1.0782,1.0781-1.8437,0.125-3.2188,2.8906-0.7343-0.125-2.3282-2.2188-1.1562-0.78125-1.5938,3.2812-0.4062,1.0312,1.3594,4.8594-0.4532-0.95312-1.7343,0.0156-1.9219,0.89063-1.875,1.0938-0.8281z").attr(attr);
            eur.ro = R.path("m647.34,316.82-0.82864,1.1822-2.3202,2.5964-1.591,1.0164-4.1101,0.9171-3.1267,3.0383-0.81759,1.2485-0.0663,2.7511-2.1434,2.972-0.88388,2.0109-1.1932,0.9722-0.86179,5.0271-1.1822,3.0384-2.6075,1.2706,0.14363,3.9112-2.2539,1.7898-0.93913,2.0329-3.7123,0.099-1.5799,1.6794-4.6625,0.1215-1.0828,1.127-1.0717,0.1215,2.1324,1.9446,2.7179,2.044,1.359,2.8726,1.812,1.1048-0.0884,5.8779,3.1599,2.1323,2.0329,0.9281,2.9721,0.9612,2.1655,1.0275-0.0884,1.8562-1.3148,1.149,2.2097,2.0219-2.9279,1.1159,0.99437,2.044,2.9168,0.7292,0.68501,2.1213,2.3754-0.9612,2.8616,0.8176,0.80655,3.1157,2.3312-1.0275,1.0165-2.044,0.79549-2.1655,2.0219,0.3977,2.1434,1.7015,1.812,1.127-1.9004,0.8617-2.8947,0.3425,0.3204,2.0219,1.2374,2.1545,3.414,1.7346,3.1709,1.823,0.76235,1.1933-1.9998,1.8893-0.87283,1.149,0.90598,1.9556,4.9939-0.044,2.1655-1.0717,2.8837,0.221,3.2372,0.9722,3.3256,0.9944,5.679-0.1215,1.1932-1.138,6.6402,0.099,2.1876,1.0054,2.8616,0.9502,3.6902-0.1437,2.1103-1.1048,2.9721-2.9831,3.182-3.7676,2.0882-0.9722,2.8284-1.1049,3.7676-0.917,1.1712-1.1049s2.7511-0.011,2.7953-0.011,1.6683-0.9723,1.6683-0.9723l2.508,0.066,1.1601,2.3534,1.0054,0.7955,1.8562-1.2154,1.2706,0.044,1.7125,1.1822,1.1048,0.099,1.2043-1.3368,2.7842,3.2151,1.0938,1.0496,5.69-0.1547,1.2595-2.1876,0.0884-6.0767-1.2927-1.823,0.22097-0.9723,1.0165-0.9391,0.7292-2.055,1.1932-1.8893-0.86179-1.0828,0.64082-1.1159,1.829-1.65-1.1816-0.3937,0.33622-0.9463-0.93945-0.8217-0.88388-2.0993,0.30936-1.0164,1.6241-0.9502,1.149,0.066v0.9391l-0.0331,1.6352-0.15402,1.2434,0.70331,0.639,0.26576,0.9192,1.3284-1.0891,3.9554-0.3646,2.044-1.0827-0.0773-7.0048,0.80655-1.9446-1.7567-1.9445-1.2927-0.8286-4.5852-0.011-2.2981,2.7731-3.9775,0.3867-0.34251,1.6794-4.7398,0.011-3.0604-3.1267-2.0108-2.044,0.74025-1.9777-0.67396-3.7012-0.60767-1.359-0.53033-9.6454,1.4142-1.3369-0.44194-4.795-1.0496-2.3865-1.7346-2.6627-4.2979-3.9885-3.6018-3.0936-0.19887-2.9279-2.0661-0.7403-2.729-4.0658-1.1049-2.2981-0.7513-2.0882-0.64081-1.7236-1.823-2.1765-0.83969-1.0054-1.5689-0.9944-1.6573-0.685-2.7179,0.7513-1.8341,0.9833-1.2374,1.2374-0.0221,2.1103-1.0165,1.6794-3.6792,0.232-0.90598,0.8286-4.9718,0.1216-1.2153,0.8728-2.276,0.9281-1.2706,2.1103-1.0496,1.0938-2.7069-0.3757-2.5522-2.9057-1.2153-0.8839-2.6737,0.1105-0.47509,0.8507-2.8174-0.033-1.1712-1.0054-1.812-0.1547-1.0828,1.3258-2.0771-1.1159-1.37-0.9943-0.26517,0.022-1.4584,1.0275-1.7015-0.9944-1.149-0.8728-1.2153-0.8176-0.66291,0.6076-0.30936,1.8783z").attr(attr);
            eur.md = R.path("m722.39,361.46,0.66291-1.9666-0.64081-3.646-0.64082-1.4584-0.50823-9.6565,1.4142-1.2816-0.44194-4.8614-1.0165-2.2539-1.7678-2.6958-3.7786-3.5576-4.1101-3.5577-0.22097-2.9389-2.055-0.7513-2.7179-4.0217-1.127-2.276-1.3921-3.867-2.6296-3.1598-1.5689-0.9944-1.6573-0.685,0.61872-1.2595,1.0165-0.9502,5.6348-0.044,2.1655-1.9004,1.6352-0.1767,0.83969-0.9281,1.2153,0.088,1.2595,1.0165,2.7842,1.0164,0.97227,0.7955,0.15468,0.9281,4.0438,0.2873,0.83969,2.0771,1.9224-0.1105,1.0165-1.1491,1.3258,0.1105,2.055,2.0109,1.6573,2.2097,1.4363-1.127,1.7899-0.1989,0.7292,2.254,0.19887,1.8561-1.0386,1.2153,0.15468,4.9498,1.8341,0.685,2.3423,2.1655,0.68501,0.044,1.0607-0.9501,0.92808,1.0606,0.19887,3.867,0.92808,1.0386-0.55243,1.5247,1.5247,1.4805,1.9004,0.044,0.95018,0.7954,1.149,1.2375,0.7513,3.0052,0.33146,0.9944-0.15467,0.7955,1.7678,1.0385,0.28726,1.0165-1.7678,1.1711-1.2595,0.5966-1.127-0.6187-0.92808-0.8176-0.83969,0.9281-1.2595,0.8618-0.99437-0.7955-0.8176-1.0827-1.8561,1.8119-1.2595-0.1768-0.17678-1.7235-0.7292-0.9281-1.7899,0.8839-1.2153,0.9722,0.0221,2.8064,0.90598,0.9943,0.44194,4.9056-1.6794,1.3258-0.83969,0.066-1.0165,1.0828,0.22097,2.7621-2.0329,1.2153,0.0442,3.845-0.7734,1.0606z").attr(attr);
            eur.ua = R.path("m746.38,364.57-1.75-1.9375-1.3125-0.8438-4.5625,0-2.3125,2.7813-3.9688,0.4375-0.34375,1.6562-4.7812-0.031-4.9062-5.1875,5.3438,0.3438,0.8125-1.0625,0-3.875,2-1.2188-0.1875-2.75,0.9375-1.0937,0.875-0.031,1.6562-1.375-0.4375-4.8438-0.875-0.9687-0.0312-2.9063,1.3125-1,1.6875-0.7812,0.78125,0.9375,0.125,1.6875,1.25,0.1562,1.875-1.75,0.90625,1.1563,0.875,0.625,1.3438-0.8125,0.78125-0.8438,0.90625,0.75,1.1562,0.5625,3.0312-1.6875-0.28125-1.0312-1.7812-1.0313,0.15625-0.8125-1.0938-4.0312-1.1562-1.2188-0.90625-0.7812-1.9062-0.094-1.5625-1.4687,0.59375-1.5-1-1.0313-0.15625-3.8125-0.90625-1.0625-1.0625,0.9063-0.6875-0.094-2.375-2.0937-1.8125-0.7188-0.15625-4.9687,1.0625-1.1875-0.21875-1.9063-0.75-2.1875-1.8125,0.1563-1.4375,1.1562-1.625-2.1875-2.0312-2-1.375-0.1562-1,1.125-1.9062,0.125-0.875-2.0313-4-0.3437-0.1875-0.875-0.96875-0.8125-2.75-1.0313-1.25-1-1.2812-0.125-0.78125,0.9688-1.6875,0.1875-2.1562,1.875-5.625,0.062-1.0312,0.9062-0.625,1.25-2.6875,0.75-1.9062,1.0313-1.1562,1.2187-0.0937,2.1563-1,1.625-3.6875,0.2187-0.90625,0.8438-4.9688,0.094-1.2188,0.9375-2.25,0.9063-1.3125,2.125-1.0625,1.0625-2.6562-0.4063-2.5312-2.8437-1.2188-0.9063-2.6562,0.094-0.5,0.875-2.8125-0.062-1.1562-1-1.8438-0.1563-1.0938,1.3125-2-1.0312-1.5-1.0625-0.1875-0.031-1.5,1.0938-1.8125-1.0625-2.2188-1.625-0.65625,0.5937-0.3125,1.9063-1.9062,0.375-1.625-1.25-3.125-0.9688-1.0625-0.9375,0.125-1.8437-3.0938-0.3438-0.90625-2.8125-2.0312-0.094,0.0312-2.8438,1.8438-2.125,1.1562-2.9375,2.0938-3-0.125-2.5937,4.5625,0.75,0.4375-0.9688-2.125-1.125,0.25-6.0937-1.2188-0.9375-0.125-2.0313,1.1562-0.9375,11.031-15.969,2.875-0.031,0.0625-1,3.375,0.1875,0.0625-3.75-1.9375-1.9063-0.84375-2.125,2.4062-0.3437-0.0937-0.7813-6.8438-7.2187,0.0937-5.75-2.625-1.1563,1.1562-2.8437,1.0312-1.1875,0,2.4062,1.625,0.5313,1.2812-0.2813,1.4688,1.2188,1.25-1.1875,0.71875-0.8438,1.0312-0.9375,0-1.25,1.1875-1.6875,1.625-1.2187,4.9375-0.062,1.8438-1.0625,1.5312-0.875,2.875,0.125,1.0312,0.9375,3.75-0.031,1.9062-1.0625,2.125-0.031,1.25,1.1875,0.59375,0,1.2812,0.8438,5.1562,0.125,0.6875,0.8125,3.0625,0.1562,2-1.1562,0.84375,1.0625,0.25,0.9062,0.90625,1,0.90625,1.1875,1.6562-1.0625,1.5312-0.7812,0.6875,0.75,0.875,1.1562,0.34375,0.625,0.5625-0.3437,0.375-1.2188,1.9688-0.125,1.9688-0.062,1.0625-2.0625,1.0312,1.0625,0.3125,1.0313,1.875,0.125,0.96875-1.1875,0.75,0.062,0.84375,1.7812,0.375,1,0.15625,0.2813,0.5,0.1562,0.4375-0.375,0.0937-1.4062,0.5625-0.5625,1.2812-1.6875,0.84375-0.1563,1-1.0625,1.1875,0.8125,0.65625,0.3438,0.40625,2.75,0.625,0.3125,0.25,0.7187,0.59375,0.3438,1.1875,0.031,0.46875-0.9062,0.75-1.3125,2.0625-1.0313,0.6875,1,2.2188,0.062,1.0312-1.0625,2.8438,0,0.34375,0.9063,1.3438,1.8437,1.6562,1.1875,0.90625,0.125,0.96875-1.0625-0.1875-2.9062-1.125-1.0313-0.90625-1.125-0.15625-1.875,1.375-1.3125-0.28125-2.6875,2.9062-2.875,0.28125-2.1562,3.8438-0.2813,1.3125-1.8437,4.6562-0.2188,2.0312,0.375,0.84375,0.8438,2.1875-0.9375,2.125-2.0313,0.0937-3.8125,5.9375-0.062,0.71875,0.6563,2.1875-1.75,0.9375-2.0313,3.8125-0.031,1.1562,1,1.9375-1.0313,4.8125,3.25,0.4375,2.9375,1.75,0.875,2,1.0938,2.125,1.9687-0.5625,1.1875-2.3125,0.8125-1.25,0.8438,1.0625,1.4375,1.1562,0.5937,0.53125,3.125,0.40625,2.7813,1.0312,0.1562,1.1562-0.9687,2.5625-0.062,1.0625,1.0312,2.0625-1,2.3125-0.9687,1.375,0.875,0.5625,2.0625,2.6875,0.3125,1.0625,2.75,1.1875,2.0312,0.71875,4.8125,0.28125,1.3438,1,1,1.0938,0.031,1.7188,0.7188,1.875-1.125,1.3125-0.875,3.1875-0.062,1.5938,2.1562,1.9375-1.1875,1.0625,1.0938,2.3125-0.8438,1.875-2.0937,1.125-0.094,1.9062-0.9687,2.0312-1,0.84375-0.875,1.0938-0.2188,1.0312,1.4375,2,1.4063,0.0937,1.375,0.71875,1.1562,1-0.031,2.125,0.8125,0.9375,0,2.0938,2.9687,0.875-0.8437,0.0625-2.9688,2.125-0.4687,0.9375,0.3437,0.71875,0.8438,1.375,0.062,1.1562-1.0938,1.5312,1.0625,0.9375,0.9063,2.0938,1.3437,1.875-2.0312,2.0625,0.75,1.3438,1.0312,1.4062-0.094,1.375-0.875,1.9375,1.8438,0.84375,1.1875,2.125-0.031,1.0938-1,1-1.0312,1.125,0.2187,0.0312,0.9375,0.15625,2.0313,0.625,1.0937,1.0938,0.7813-0.0937,2.9687-0.875,1.0938-0.84375,1.0937-0.46875,1.9063-2.7188,0.9375,1.2188,1.125,1.5938,0.875,2.0312,0.031,1.3125,0.9688-3.125,0.9375-0.8125,0.9687,0.0625,3.0938,2.9375,1.2187,0.8125,1.9688,0.34375,1.7812,1.625,0.9688-0.6875,2.0312-0.34375,6.875-1.8438,1-8.0625,0.3438-1.75,1.0312-1.2188,1.7813,0.875,1.9687-1.0938,1.3125-1.9688,0.6563-2,1.125-1.0938,3.1875,0.90625,2.8125,0.59375,4.0625-1.1562,1.8125-0.96875-0.8438-2.1562,0.094-0.84375,0.9375-2.9375,0.3125-2.125,2.5625-0.84375,1.2188-0.5625,1.875-1.6875-0.9063-1.9688,0.9688-1.0625,1.875-1.0938,1.1562,0.0625,2.0938-1.1875,0.75-0.3125-2-2.875,0.2187-1.5312,1-0.625,1.4063-1.25,1.5625-1.9062-1.1563-1.375,0.094-1.1562,0.9375-2,2-1.4062,2.1875-2.125,2.0625-1.0938,2.6875-0.875,1.9687-1,2.0938-1.2607,0.459-0.11114-0.9599,2.1219-2.5616,0.4375-2.7813-0.5625-1.3125-1.0938-0.5937-0.65625,1.75-0.0937,2.7187-1.375,1.25-1.4688,0.25-1.0312,1.2813-0.34375,1.3437-2.1098,0.3309-1.6916,0.3545-0.3308,0.7585,0.0385,0.4937,1.6875-0.094,1.4062,0.4375,2.125,0.5625,0.6875,2.1563,2.3438,1.9375,1.4688,2.0312,2.5312,2.8438,2.4375,1.75,1.6875,1.2187,2.8438-0.6562,1.2188-2.875,0.875-1.0625,2,1.9687,1.9062-2.125,1.0938-0.9375,5.8125,0,1.4688,1.0625-3.0938,2.375-0.0625,1.4688,0.90625,2.1875-1,1.25-1.9375,0.8437-3.375,0.6563-2.4375,0.3125-1.4062-1.1563-1.75-0.9687-2.1875,1.8437,0.25,2.4063-2,1.0625-1.5625,1.8125-0.9375,1.7812-2.8125-0.9375-2.0625,1.0938-0.8125,1.2187-2,0.9063-1.0312,2.9062-1.9688,1.9688-1.2812,2.1875-1.7812,0.9375-2.0312,0.875-2.875,0-1.8125-1.9375-2.4375-0.9688,2.2188-1.5-0.84375-2.4687-0.125-2.3125,0.96875-0.9375,0.15625-2.1875-2.5625-1.7813-2.5938-0.9062-1.9062,1.1562-3.1875-3.375-3.7812,0.2813-1.2188,1.1562-2.3125-0.031-0.78125-2.1563,2.25-2.1875,2.0312-0.875,1-2,2.0312-1.0937,1.8125-1.9688,3.2812-1.9062,1.5938-0.875,2.25-1.3125-0.40625-0.9063-1.5625-0.625,0.01-1.7272,1.1692-1.3018,2.2272,0.4353,1.4062-0.1875,0.517-0.4852-0.48391-0.8674-0.93934-1.0849-1.5-0.1875-1.4062,1.125-1.5938,0.9687-1.0938,1.7188-2.0938,0.625-1.6875-1.25-0.875-1.125-2.1562,1.2187-0.875,0.8125-2.8125,0.094-2.625,1.9375-3.375,0.094-1.8125-2.0938-2.1875,0.062-0.96875,0.8125-3.5938,0.031-1.5,0.1875-1.923-1.3538,0.46936-0.7349,1.5252,0.6398,1.2096-0.5824,2.2188-0.031,0.27708-0.455-1.8286-0.1878-0.18176-0.6171,2.9978-0.709-0.51451-1.0312-2.2188-1.0625-0.53217-0.875,2.8447-0.3438,2.4062,0.1875,1.8125,0.062,1.2188-1.8437-5.1875-0.1875-1.9374-1.4691,0.4375-3.75-2.9062-4.6875,0.15625,2.4375,1.7188,1.8437-0.53125,2.375,0.4375,3.125-3.4375,0.2188-0.40625,0.875,1.6244,1.8453-1.5618,0.3734-1.0884-3.5578-0.88036,1.4016-1.1562,0.6875-4.4375,0.3125-1.4375,1.0312-1.875,0.8438-0.4375,3.9062-0.71875,3.125-2.0625,3-1.9062,3.3438-0.96875,1.5312-1.1875,1.1875-1.7812,0.2188-1.2188,1.9062-0.8125,2.0938-1.25,0.8437-0.6875,1.25,0.125,1.2813,0.8125,0.6562,0.46875,1.0313,0.65625,1.5312z").attr(attr);
            eur.by = R.path("m754.42,223.36-4.6846,0.21-1.2927,1.834-3.8338,0.2873-0.27621,2.1765-2.9058,2.8506,0.27621,2.7068-1.37,1.3038,0.15468,1.8893,2.044,2.1876,0.15468,2.8837-0.97227,1.0275-0.90598-0.1326-1.6462-1.1601-1.3479-1.812-0.32041-0.9059-2.8505-0.033-1.0275,1.0606-2.2318-0.077-0.68501-0.9833-2.0771,1.0275-1.2043,2.1876-1.1932,0-0.58557-0.3314-0.25411-0.7182-0.62977-0.3314-0.4088-2.729-1.8341-1.1712-0.99436,1.0386-0.86179,0.1768-1.8341,2.2207-0.11048,1.4363-0.4309,0.3646-0.49718-0.1657-0.50824-1.2153-0.86178-1.823-0.7513-0.088-0.97227,1.1932-1.8562-0.1215-0.29831-1.0055-1.0496-1.0496-1.0607,2.033-3.9443,0.1988-0.39775,1.1933-0.55243,0.3204-0.34629-0.7052-1.5209-1.7586-1.6462,0.7955-1.5689,1.0054-0.89493-1.1601-0.92808-1.0054-0.23202-0.895-0.82864-1.0827-2.0329,1.138-3.0604-0.1547-0.66291-0.7955-5.1597-0.1215-1.2816-0.8397-0.60767-0.011-1.2706-1.1822-2.0992,0.033-1.9114,1.0606-3.7344,0.022-1.0386-0.928-2.8837-0.1326-3.403,1.9335-4.9166,0.077-1.6241,1.2264-1.1932,1.6683-0.011,1.2595-2.9831,2.961-1.4695-1.2043-1.2816,0.2873-1.6241-0.5745,0.0111-2.2871,0.66291-0.7181-0.0663-4.0659-0.95018-0.9391-1.0165-2.1213-2.1213-0.9281-1.7346-0.1326-0.99436-0.9723,0.99436-3.0162,2.95-2.9058,2.9831-1.0496,2.9389-1.9887,0-3.9665-0.98332-1.0827,0.0221-2.7732-0.99437-1.138-0.12153-2.0329-0.93913-0.906-0.28726-2.2539-0.91703-0.2652-0.0552-3.0383-1.138,0.1215,0.15468-3.0605-1.2816-0.2541,0.011-2.6406-0.62977-1.0606,5.8226-0.088,1.9004-1.0717,2.0661,1.149,1.1932-0.088,1.7015-1.9887,2.972-0.2652,0.91703-2.8505s2.4086,0.3425,2.4307,0.2983c0.0221-0.044,0.78445-1.1049,0.78445-1.1049l0.74025-2.1986,2.3202-0.9391,0.86178,1.0827,0.20992,2.0329,0.80655,0.2431,2.1876-0.2872,0.92808-1.5689-1.1601-1.3259-2.276-0.8507-0.78445-0.232,0.25412-1.1601,0.91703-0.8176,1.0828-1.7346,0.88388-1.2817-1.2043-1.8782,0.20992-3.1047,2.0219-2.1102,2.7953-0.9502,0.23202-3.1157,1.9445-0.8507,0.93913,0.011,0.85073,0.917,1.2485-1.0607,0.16573-1.0054,0.7292-1.0275,0.81759-0.6629-3.7565-0.4088-0.0442-2.8726,1.1159-1.7678,0.13258-1.9335,2.5301-2.3312,2.0771-1.9777,1.3369,0.066,4.552,0.088,1.3479-2.1876,0.88388-1.9777,0.11049-0.906,1.9445-1.0386,1.0938-1.0606,1.6573,0.088,1.3921,1.0827,0.7734-0.2762,1.0275-0.8176,2.0329,0.8287,1.0828,2.3754,1.1048-0.4419,1.0054-1.0165,1.6573-0.7734,3.1046-0.055,1.0275,1.0054,0.0442,3.9554,0.7292,1.1159,1.0607-0.011,1.3037-1.0496,1.9335-2.0551,1.127-0.8507,2.7732-0.1878,2.95,0.1657,1.9556,1.8341,1.2043,1.1822,2.0219,0.7623,1.9114,1.0607,0.0442,2.3754-1.127,0.8397,0.0994,2.8063,1.9445,2.0992,1.0496,1.0055-0.0331,1.0606-1.1601,1.0607-0.69606,1.8341-0.13258,2.1434,2.1545,1.1048,2.9279,1.7788-0.98332,1.0938-0.27621,0.9613,2.2318,1.1048,0.80655,1.7457,1.138,2.2539,1.0386,0.8286,3.9112,1.0165,2.1655,1.9335-0.0553,1.1048-0.91702,1.9336,0.96122,1.149s1.7788-0.099,1.823-0.099,2.1213-1.1049,2.1213-1.1049l1.9777,1.1049,1.7567,0.2099,0.49718,3.2151,0.7734,0.8287,2.1987,0.044,0.90598,0.8618-0.0884,1.8561-1.8893,1.2485-1.359,1.9887-0.91703,2.0219-1.0165,0.8508-1.5468,1.0054-1.4916-0.066-1.5468-1.0496-1.2927-0.895-3.5797,0.033-1.3479,2.8616-0.0884,2.1876,2.1434,1.9004,2.0108,1.8009-0.011,2.0329,0.8176,2.0329,0.16572,2.254,1.0054,3.7786,1.9224,0.9943z").attr(attr);
            eur.ru = R.path("m640.66,187.65-0.1875,0.9375-4.9062,0.062-1.2188,1.1094-11.047-0.2344-0.71875-0.8125-9.2344-0.2813-0.79688-0.9843-5.5625,0.4531-1.2344-1.4531-2.1875,0.1875-0.14063-1.125,2.0625-1.875,1.1875-0.8282-0.42187-5.0781,1.3906-1.1875,5.4375-0.1562,2.375-2.6563,1.0469-1.125,1.0781-1.625,0.96875-1.9375,0.48438-0.6562,0.5,0.3281-1.0312,1.9844-1.0312,1.8125-1.2188,1.3281-1.7031,1.6875,0.1875,1.9219,2.7031,0.2031,3.0625,0.125,1.1719-0.7188-0.15625-3.3125-0.23437-1.6562,1.2344-1.1563,1.7969,0.6563,2.3906,1.1875,2.0156,0.031,1.7812,0.9375,1.1406,1.1094,3.8906-0.4532,1.3125-0.875,1.7344,1.0313,0.65625,1.9375,1.4219,0.25,0.51562,1.25-0.73437,2.75-0.9375,1.8594,0.0937,3.6875z").attr(attr);
            eur.lt = R.path("m684.79,159.88-0.14063,1.9375-1.125,1.75,0.0625,2.875,3.6719,0.3906-0.71875,0.6406-0.75,1.0469-0.1875,1.0312-1.2344,1.0469-0.84375-0.8906-0.95312-0.047-1.9531,0.875-0.25,3.1094-2.7656,0.9218-2.0312,2.1094-0.21875,3.125,1.2031,1.9063-1.9531,2.9531-0.90625,0.875-0.23438,1.1562,3.0312,1.0938,1.125,1.2656-0.89062,1.5938-2.1875,0.2812-0.8125-0.2344-0.20313-2-0.875-1.0937-2.2969,0.9219-0.73438,2.2031-0.82812,1.1094-2.4219-0.2813-0.92187,2.8125-2.9531,0.2656-1.6875,2-1.2188,0.1094-2.0469-1.1719-1.8906,1.0938-5.7656,0.094-0.29688-5.0781-0.875-0.078-0.0156-1.0157-1.4531-0.1093-0.60937-0.875-2.1562-0.1094-1.0156-1.9063-2.7969,0.047-1.0781-1.375-0.0937-3.6718,0.95313-1.8438,0.71875-2.7187-0.51563-1.2969-1.4219-0.2656-0.65625-1.9219-1.7188-1.0156-1.3125,0.875-3.875,0.4375-1.125-1.1094-1.8125-0.9219-2.0156-0.031-2.3594-1.1875-1.8125-0.6875-0.0781-1.375-0.98437-0.9531-0.0625-1.0781-0.28125-0.75-0.64063,0.016-0.6875,0.1718-0.25,1.7188-0.46875-0.3125,0.0781-1.4375,0.82812-2.25-0.45312-1.25-0.20313-1.5,0.1875-4.3906,0.15625-2.9219,1.8125-0.8906,1.0938-2.1094,1.0938-0.9063,1.7656-1.2031,2.1719-0.9375,1.8906-0.9844,6.0312-0.125,1.0938,1.0938,1.6406,0.031,1.2969-1.1719,2.0781,0.3594,0.59375,1.0781,0.53125,0.8438,0.65625-1.2656,0.96875-0.8907,1.8438,0.016,0.84375,1.0469,1.375-0.016,1-0.9531,2.2656,0.1562,0.76562,0.8594,2.1719,1.1875,1.8594-1.2031,1.875,0.1406,0.98438,0.6094,1.125-0.7188,0.14062-0.9844,0.9375-1.0156,1-1.1875,1.1406,0.047,0.96875,0.9531-0.25,1.4063,1.0156,0.9219,1.0156,1.8593,7,0.094,2.0156,1.7969,1.0312,1.2344,2.0781,1.9219,2.0781,2.0781,1,0.8906,0.89063,0.1094,0.89062,0.8906z").attr(attr);
            eur.lv = R.path("m700.68,148.56-1.1094,1.0469-1.9531,1.0313-0.0937,0.9218-0.92187,1.9844-1.3438,2.1719-5.8594-0.1563-4.6094,4.3125-1.3281-0.2343-0.89062-0.8907-0.875-0.1093-5.2031-4.8907-0.98437-1.1875-2.0156-1.8281-7-0.094-1.0312-1.8594-1.0156-0.9531,0.25-1.3594-0.95313-1-1.1406-0.031-1.9375,2.1875-0.1875,0.9688-1.0781,0.7344-0.98437-0.5625-1.875-0.1875-1.8594,1.2187-2.1562-1.1875-0.8125-0.8594-2.25-0.1718-0.98437,0.9531-1.3906,0.031-0.84375-1.0625-1.8125,0-1,0.8906-0.65625,1.2344-1.125-1.8906-2.0625-0.3438-1.3125,1.1406-1.6094-0.016-1.1094-1.0781-6.0312,0.125-1.9062,0.9531-2.1875,0.9532-1.7969,1.25-1.0469,0.8593-1.125,2.125-1.7812,0.875-1.3438-0.3281,0.26563-2.4531-0.125-3.1406,0.85937-1.0469-0.15625-0.9219-0.96875-0.9375,0.26563-3.1406,1-1.0781,0.21875-2.7344,1.8281-1.2188,1.0156-0.875,0.98437-2,0-5.8281,0.875-0.9531,0.26563-1.2344,1.6719-2.1094,2.2031,0.031,0.89062-0.7812,2.8594-1.1406,1.3438-0.8594,0.89062-0.1719,1.0469-0.9687,0.85937,0.1093,0.125,2.6563,0.96875,1.1406,2,2.0313,1.1875,1.0312,1.0156-0.016,0.6875,0.9219,1.0781,1.1406,0.0156,2.9688,1.0938,1.0312,0.90625,0.9844,1.9844-0.094,0.84375,1.0469,2.2656-0.031,1.9062-1.125,1.0625-0.8282,2.0469-2.0937,1.0469-1.0156,0.98437-0.9219-0.17187-2.9219-1.1562-1.0312,0.125-1.9532-1-1.0781,0.0469-1.9844-1.0156-1.0625-0.17188-0.8906,1.3281-1.1875,0.875,0.078,1.1875-1.0937,1.9531-0.9219,1.8906-0.9531,1.0312-1.0469,2.0469,0.031,1.0312,0,0.96875-0.9844,1.9844,2.1094,0.90625,0.9219,1.9219-0.125,1.125,1.1875,2.0469,0.094,0.85937,1.9531,1.0312,0.9062,1.0625,1.1094,1.125,0.8594,0.96875,1.1406,1.9531-0.25,1.0469-0.9219,0.95313-0.9375,2.7969-0.094,1.1094,1.125,2.1875-0.1562,1.75,0.2187,0.375,1.875,1.6875,0.9844,1,0,1.0469,0.9063,0.98438,1.0937-1.0781,0.9844,0,0.9844-0.85937,1.0312,0.82812,1.0313,0.0937,1.0625-0.73437,1.0468-0.29688,1.7344,2.9062,0.2969-0.0156,1.9219,1.0312,1.0468,1.0469,1.8438,1.0625,0.9844,0.1875,1.8437,0.92188,1.1563,0.9375,2.1562-0.125,0.8906-0.9375,1.0157z").attr(attr);
            eur.ee = R.path("m689.73,121.54-2.1719,0.1563-1.1562-1.125-2.7969,0.078-1.9844,1.8437-1.9688,0.2813-0.96875-1.125-1.1875-0.9219-1.0938-1.1563-0.92187-0.8281-0.875-1.9531-2.0312-0.094-1.1562-1.1875-1.8906,0.125-2.8906-3.0313-0.96875,0.9688-3.0938,0-1.0469,1.0312-3.8594,1.8594-1.1875,1.125-0.84375-0.1094-0.1875-1.8906,1.1406-1.0469-0.0469-4.7343,0.85937-0.1875,0.1875-1.7813-1.8594-0.2656-1.25,1.0937-1.0156,1.0313-1,0.9219-0.9375-0.9219-0.89062-0.078-0.95313-0.8438-1.0625-0.2344-0.17187-0.8437-1.0625-1,0.0625-0.9063-1-1.4062-0.84375-0.5625-0.78125-0.125-1.1562,0.8594-0.90625,1.0468,0.59375,1.0313-0.85938,0.4062-0.6875,0.6563-1,0.8125-1.1406,0.1875-0.20313,1.1406-0.85937,0.7344-1.1406,0.2656-0.79687,0.6875-2.0781,0.3438-0.95312,0.094-1.0312,0.6562-0.6875,1.25-0.32813,1.9063-0.29687,0.8906-0.5,0.1875-0.29688,0.875-1.0469,0.2344-0.0156-2.2344,1.0469-1.0469,0.625-0.9062-0.70313-0.9844-0.9375-1.1094-1.0469-0.1719-0.73438-0.7968-0.29687-0.9532,1.375-0.2031,0.875-0.8594-1.125-1.0781-0.73438-0.9375-0.39062-0.3281,0.75-0.6563,1.1562,0.7657,1.0625,0.2031,0.29687-0.8125,1.5312-0.3438,0.42188-0.75,1.1094-0.2656,0.84375-1.0625-0.1875-2.6562-0.65625-0.8594-0.51562-1.1875-2.0469,0.1406-0.78125-0.4375-0.79687-0.7344,1.7969-0.2031,1.4688-0.078,0.85938-0.031,0.5625-0.6406,0.0156-1.125,1.0938-0.9375,0.51563-0.1562,0.5625,0.4218,0.35937,0.7344-0.0625,0.8281,0.625,0.2969,0.76563-0.047,1.0781-0.2343,0.45313,0.7031,0.20312,0.8437,0.0156,0.7188,0.46875,0.625-0.35938,0.4531-0.90625,0.047-0.45312-0.031-0.375,0.7813-0.75,0.125-0.89063-0.031-0.3125,0.7344-0.3125,0.9843-0.375,0.1719-0.3125,1.0938,0.40625,0.8437,0.79688,0.2813,0.875-0.1563s0.8125-0.9375,0.89062-0.9531c0.0781-0.016,0.71875-0.1719,1.0156-0.1563,0.29687,0.016,1.0156,0.9532,1.0156,0.9532l1,0.7343,0.84375,0.2188-0.0469-1.25-0.59375-0.7813v-0.9062l0.71875-0.7344,0.67187-0.4844,0.76563,0.2813,0.48437,0.8437,1.375,0.3594,0.0937-0.75-0.25-0.9531-0.40625-0.4219,1.3438-0.2031,1.1719-0.062,1.4844,0.25,0.45313-0.6875-0.125-0.4063-0.40612-0.2344-0.45313,0.2344-1.3125,0.1406-1.0781-0.1875-1.2812-0.875-0.35938-1.3125,0.89063-0.5-0.84375-0.4843-0.95313,0.2812-1.2188,0.031-0.98437-0.8594,1.4844-0.4375,1.0781-0.016,0.73437,0.078,0.3125-0.5781,0.75-0.7032-0.14062-0.5781-0.95313-0.9531-0.0625-0.9844,1.7344-0.125,1.3281-0.016,0.46875-1.0782,3.4375,0.1875-0.0781-0.9218-0.89063-0.9688,0.57813-1.3281,1.625,0.1719,1.7031-1.0157,3.375,0.1719,0.82813-1.0312-0.0156-1.125,0.34375-0.1563,0.67188-0.078,0.875,1.3437,1.2969-0.7812,1.5-0.2813,1.25,0.9532,1.0781-0.6719,0.92187-2.1719,0.85933,0.7344,0.76562-0.6719,0.46875-1.3437,0.29688,0.047,0.23437,0.7188,0.70313,0.625,0.65625-0.4688,0.98437-0.5937,0.59375,0.4062,0.54688,0.047,0.79687,0.047s0.90625,0.4844,0.96875,0.5937c0.0625,0.1094,0.39063,0.4532,0.39063,0.4532l1.0625,0.2031,2.4062-0.078h1.7344l1.3438,1.0937,8.6875,0.1094,1.8906-0.031,1.5-0.75,0.875,0.7188,0.70312,0.5469,0.0781,0.6562-1.3906,0.5938-1.3125,0.4218-0.78125,1.8594-0.0781,3.0469,0.0312,0.7344-2.125,2.4062-0.95313,0.7344-0.0781,3.8437,1.1719,1.0938,0.0312,1.7812,1.1875,1.0938-0.14062,1.9687-1.1562,1.4063-0.0156,1.625,1.4531,1.3125,1.5938,0.8594,0.0312,0.078-0.0312,3,1.9219,0.9531,0.0625,0.4062-0.9375,0.7032-1.4844-0.031-0.71875,0.9687,0.1875,1.1563-0.9375,0.7343-1.0312,1.0469z").attr(attr);
            eur.bg = R.path("m646.4,393.17,4.2969,2.3906,0.76562,1.2032-1.9688,1.875-0.90625,1.1562,0.92188,1.9688,5-0.062,2.1562-1.0625,2.9219,0.2343,6.5312,1.9532,5.6719-0.125,1.2031-1.125,6.6562,0.078,2.125,1.0156,2.8906,0.9531,3.6875-0.1562,2.1094-1.0938,3.0156-3.0312,3.125-3.7188,4.9219-2.0937,3.7656-0.9219,1.1875-1.0781,2.7969-0.031,1.7031-0.9532,2.5156,0.047,1.0938,2.3594,1.0156,0.7812,1.875-1.1875,1.2656,0.031,1.6875,1.1875,1.1094,0.094,1.2188-1.3125,2.1719,2.4844,0.65625,0.7813,1.0469,0.9843,5.7031-0.1562,1.2656,1.0312-0.14063,5.0625-0.9375,1.9844-1.1406-0.1094-0.96875-0.7656-0.96875-0.078-0.875,0.7969-1.5938,0.1719-0.5,1.1406-0.15625,1.4844-0.98438,1.2969-0.90625,0.7031-0.0781,6.0156,1.2656,1.375,0,0.8125-0.875,1.125-1.3125,0.094-0.92187,0.8438-0.125,1.1406-1,0.8125-0.17188,1.1094-0.9375,0.2656-0.51562,0.6562-1.0312,0.9532,0.84375,0.7812,1.1719-0.4687,1.8125-0.125,0.26563,1.1562,0.8125,0.6094,0.98437,0.7031,0.0781,1.3906,0.875,1.1875,2.25,2.125,0.54687,0.7657-0.0625,1-2.6719-0.031-0.98438,0.031-1.125,1.0781-1.0156,0.75-1.0781,0.1562-1.2812-0.8593-1.4844-1.125-1.2188-1.0469-3.8594,0-0.8125,1.0781-1.0625,0.8906-1.3125,1.1094-2.7969-0.078-1.0938,1.8594-0.875,1.1875-1.8906,1-0.875,0.9844-2.2344,0.094-1.1094,0.75,0.0156,1.3593,0.76562,0.8907,0.17188,1.0156,0.90625,1.125,0.21875,1.9062-0.89063,0.9063-1.4062,0.7812-3.7969,0.062-1.3125,1.1875-3.7031-0.078-1.0312,0.7813-1.7031,0.2656-1.5781-1.2656-0.79687-0.7656-0.85938-0.2657-1.1562-0.7656s-1.6875-0.1562-1.75-0.094c-0.0625,0.062-1.0156,1.0781-1.0156,1.0781l-1.2656,0.2657-0.875-1.4844-0.90625-1.625-1-0.5313-1.6562,0.3594-3.3438,0.094-1.7344,0.7813-1.2188,1.25-1.25,0.125-0.79688,0.7968-6.0469,0.016-1.0312,0.8282-2.875,0.094-0.98438,0.9687-2.6875,0.1563-0.4375-2.3282,0.0469-4.6562,1.2812-1.0625-1.3906-0.9375-0.78125-1.8438-1.0938-1.375-0.1875-0.9218-0.92187-0.9219-0.90625-0.9063h-1.0938l-1.9531-1.2343-1.8906-1.9688-0.10938-1.9687,1.1562-1.1875,0.90625-0.8594,0.0625-1.0313-1.1406-0.7343-1.1719-1.0313,0.0937-4.125,1.0781-0.7656,0.25-1.1094,3.4531-0.047,0.3125-1.2344,0.98438-0.8125,1-2.1093,1.0469-1.8282-0.125-0.9375-0.9375-1.0312-1.875-2.1094-1.0781-0.7969-1.8281-0.1875-1.3906-1.1093v-0.9063l-0.75-1.0469-0.1875-1.0312-0.84375-0.9063,0.10937-6.7187,0.90625-0.3281,1.875-1.0782,0.125-1.7968-0.0625-0.8282z").attr(attr);
            eur.tr = R.path("m713.6,432.63-0.875,1.0937-2.3438,1.9688-2.7812-0.031-1.9375,3-1.9688,1.0312-0.40625,0.5,1,1.1563,1.8125,0.5312,1.5,0.9063,0,0.8125,0.96875,1.0625-0.1875,3.8437-1.4062,0.9375-0.96875,0.062-1.5938,1.7813-1.3438,1.375,1.375,1.0312,0.15625,3.0625-1,0.9375-0.25,0.9688-0.84375,1-1.9688,1.2187-0.21875,1.9063,1.375,0.9375,5.6875-0.1875,1.125-0.9688,3.5625,0.2188-0.4375,1.2812-0.875,0.5625-1.25,1.0625-1.5625,0.9375-1.6875,0.9063-1.625,1.0625-1,1.0937,0.8125,1.0938,0.15625,1.8125-1.4062,1.1875,0.34375,0.9375,1.0938-0.062,1.25-0.9063,0.59375-1,0.125-1.0937,1.2812-0.9378,1.375-1.25s1.0938-0.75,1.0938-0.8125c0-0.062-0.0312-2.0312-0.0312-2.0312l1-1.0313,0.875-0.4375,1-0.4687,1.2812-0.9688,1.2812-0.2187,0.84375-0.5938,1.0938-0.4062,1.7188-1.1875,0.875-1.7188,0.9375-1.0937,0.5-0.9688,0.65625-0.8437,0.0625-2.1875,1.0625-0.75,3.8438,0.031,1.4062,0.5,0.78125-0.5625,0.84375-0.2813,1.4062-1.6875,2.625-0.1562,1.75,0.1875,1.3125,0.8125,1.0938-1.0625,0.9375,1.0625,1.875,0.031,1.9062-0.125,1.0938-0.9375,0.96875-0.8438,0.40625-1.7187,0.75-1.4375,0.65625-0.875-2.2812,0.094h-2.5312l-1.625-1.0313-2.25-0.2812-1.0625-0.6875-3.125-1.0938-1.8438-1-1.0312-1-2-2.125-0.9375-1.0625-0.0625-0.7812-0.9375-1.0625,1.0938-1.1875-0.25-1.8125-3.6562,0.031-1.0938,1.0625-1,0.75-1.1875,0.125-1.9062-1.3125-2.0312-1.6875h-3.8438z").attr(attr);
            eur.mk = R.path("m643.66,433.61,1.8562,1.9667,1.9224,1.2153,1.0828-0.044,1.9004,1.8782,0.17677,0.906,1.0828,1.3921,0.7734,1.8341,1.3258,0.906-1.2595,1.0164-0.0221,4.6183,0.44195,2.4307-2.4307-0.088-0.99437,0.9723,0.19887,2.2981-1.0828,0.8176-1.0165-0.1105s-0.90598,0.7955-1.0828,0.906c-0.17678,0.1105-1.9004,0.3093-1.9004,0.3093l-0.99437-1.1048-2.2539-0.088-1.2153,0.022-0.59662,1.0385-0.97227-0.7734-0.97228,0.6188-1.1932,1.149-1.1048,0.906,0.11048,1.1269-0.79549,1.0165-2.8947,0.022-1.0386,0.7955-3.4913,0.044-1.6573,0.221-0.90599,0.9722-1.9887-0.088-0.19888-0.9722-0.86178-0.906-0.97228-0.1326-1.0607,0.8618-1.0386-0.7071-1.0165-1.1491-0.0221-0.9722-1.0386-1.127,0.15467-0.9723-1.1711-1.0606-0.0884-1.0386-0.59662-1.0827-0.33146-0.9502,1.1712-0.7955,0.0663-1.0607-1.1712-0.928,0.0442-1.8562,0.95017-0.3977,0.0442-1.591-1.2816-0.9723,1.149-1.3037,0.15467-1.8341,0.99437-0.221,0.88389,1.1491,0.88388-1.0828,0.24307-0.9722-0.22097-1.9667,0.46404-1.0827,0.55242-0.1768,1.0386-0.8176,1.0828-0.022,0.86179-0.044,0.46404-0.9502,0.70711,0.044,0.7071-0.1547,0.95018,0.1547h0.33145l0.26517,1.0607,1.5468-0.1547,0.22098-1.6131,0.97227-1.149,1.5689-0.2652,1.0828,0.066,1.1711,0.7513,1.0828-0.4862,1.2153-0.066,0.7734-0.022,1.5026-0.9943,1.4363-0.066,0.83969-0.9281,1.2595-0.1326,1.6131,0.1768,0.53033,0.044,0.90598,0.1547z").attr(attr);
            eur.al = R.path("m615.55,441.76-0.15625,1.8437-1.1406,1.2656,1.2656,1.0157-0.0469,1.5625-0.92188,0.4062-0.0625,1.8438,1.1719,0.9375-0.0781,1.0781-1.1562,0.7969,0.32813,0.9531,0.59375,1.0625,0.0937,1.0469,1.1875,1.0625-0.17188,0.9687,1.0781,1.1094-0.0312,1.0156,1.0156,1.1094,1.0312,0.6875,1.0625-0.8438,0.98438,0.1407,0.85937,0.9062,0.25,0.9688-0.17187,1.9687,0.98437,0.9063,0,2.2187-2.125,1.8438-1.0781,0.8125-0.96875,1.0781-0.84375,1.1406,0.0469,3.7969-0.875,0.9687-1.0312,0.3125-1.0469,0.6719-2.1094,0.2969-0.9375,1.0937-0.0937,1.625,1.0938,1.1407-0.0312,0.9687-1.6719,0.078-0.29688,2.625-1.375,0.5156-1.4531-0.031-1.3125-0.8125,0.0312-3-1.0938-1.1875-0.73438-1.2187-0.375-0.8281-0.84375-0.875-0.76562-0.9688-0.96875-0.078-1.0938-1.1094-1.0938-0.1562-1.1094-0.6875-1.8906-2.2344-1.125-1.8594,0.90625,0.031,0.82812,0.8907,1.125,0,0.46875-0.9532-1.3281-1.2031-0.17188-1.7031-0.65625-0.8594-0.89062-0.2656-0.14063-2.3125,0.9375-1.3906,0.20313-2.1563,1.7031-0.3437,0.3125-1.8907-1.2656-1.0156,0.0312-2.3125,1.125-0.7344-0.375-1.8125-1.5938-0.8593-0.0469-1.0625,1.0781-1.1875,0.98437-0.8438-0.84375-1.8906,1.6719-1.0469-0.0312-2.25,0.90625-0.8437-1.1719-1.2657-0.73437-0.625-1.6406-0.1406-0.32812-3.375,0.21875-1.5469-1.0625-1.0781-0.17188-0.8906,1.2344-1.125,1.125-2.1094,0.71875-0.8594,0.14062-0.9843,0.85938-1.0469,0.96875-1.0781,0.28125-0.9375,0.71875-0.9844,1.0156,0.6094,0.0312,2.0937,0.96875,1.2813,1.1562,0.25,0.92188-1.1875,1.0156-0.9219,0.85938-0.2031,1.0156,0.7968,0.32813,2.2188,0.89062,1.0937,0.70313,1.1875,1.1406,0.75,1.6719,0.094,0.9375,0.9688,0.25,0.8281,0.51562,1.2031,0.76563,1.375-0.0312,1.4532-0.89063,0.9218z").attr(attr);
            eur.me = R.path("m608.43,427.59-0.875,0.1875-1.0156,0.8906-0.92188,1.1875-1.125-0.2031-1-1.2656-0.0312-2.0938-1.0156-0.6406-0.71875,0.9219-0.29688,1-1.8125,2.0937-0.125,0.9844-0.73437,0.875-1.1562,2.1094-1.1719,1.1093,0.20313,0.9688,1,1.0625-0.1875,1.4219,0.32812,3.4531-2.1562,0.031-1-0.8906-0.26562-2-0.82813-1.0469-3.1094-2.9531,0.10937-0.9375-1.875-0.2813-1.2031-0.8594-1.3125-1.1718-0.76563-1.0625-1.0469-0.7813-0.15625-1.3281-0.0312-1.4375,1.2969-1.3594-0.125-1.6719-0.85937-1.125,0.0469-3.125,1.0156-0.9687,1.0781-1,1.1094-0.9063,0.0312-2.1406,0.82812-0.9687,0.85938-1.125,0.64062-0.9532,0.5-0.047,1.0156,0.8282,1.0469,1.1093,0.82813-0.1562,0.25-0.6563-1.125-1.9218-1.1562-2.1094,0.26562-0.9375,0.95313-0.1094,1.1562,1.0469,1.75,0.047,0.875,0.8281,1.3594,1.2656,1.5156,1.6407,1.5938,1.4375,1.4375,0.875,1.2344,0.9687,1.7812,1.1563,2.25,0.7031,0.96875,1.1719,2.1094,1,1.125,1.0312,0.82812,0.875-0.0156,0.9063-0.9375,0.2656-1.2188,0.8906-2.0156-0.031-0.84375,0.016-0.59375,0.8594,0.54688,1.2031,1,0.8906z").attr(attr);
            eur.rs = R.path("m591.53,360.18,2.497-2.4749,3.4913-0.2652,3.0494-3.0272,2.7621,0.1988,2.0992,0.8839,3.867-0.8176,1.2816,1.0828,1.4363,1.3921,0.59662,0.5745,2.6516,1.9446,1.4363,2.9389,1.7899,1.1048-0.11049,5.8558,3.1599,2.0992,2.0329,0.9502,2.9389,0.9722,2.1876,1.0165-0.0442,1.8341-1.3258,1.1932,2.1655,1.9887-2.7842,1.0828,0.90598,2.1434,2.9168,0.7292,0.68501,2.055,2.3423-0.9943,2.8284,0.906,0.88388,3.0493,2.2981-0.9943,1.8562-4.1764,2.0329,0.3757,2.1213,1.7236,1.7457,1.0827-1.8562,0.8839-2.8726,0.3094,0.28726,2.0771,1.2816,2.1434,2.1876,1.1049-0.83969,0.7292,0.0221,0.9722-0.13258,1.6794-1.8341,1.0607-0.97227,0.3535-0.0663,6.7396,0.81759,0.8839,0.24307,1.1049,0.7292,0.9943-0.0221,0.9281,1.3921,1.1049,1.8341,0.1326,1.149,0.9059,2.74,3.0273,0.11048,0.9723-1.0165,1.7899-1.0165,2.0992-0.97227,0.8618-0.35356,1.2153-3.4471,0.044-0.24307,1.1491-1.0607,0.7734-0.11048,4.1321,1.1932,1.0165,1.1711,0.7071-0.0884,1.0386-2.0992,2.055,0,0.3314-2.961-0.3093-1.3479,0.088-0.83969,0.9281-1.4584,0.088-1.4584,0.9943-1.9666,0.088-1.1932,0.4862-1.1048-0.7292-1.149-0.088-1.4584,0.243-0.99437,1.1491-0.26516,1.6131-1.5026,0.1546-0.30936-1.0385-1.2595-0.1547-0.7513,0.1768-0.68501-0.066-0.41984,0.9281-1.9446,0.088-1.0386,0.8618-0.59662,0.1546-0.39775,1.0165,0.17678,2.0108-0.24307,1.0165-0.88388,1.0607-0.90598-1.1933-0.95018,0.2431,0.13258-1.3037,0.86179-0.9502,0.0884-1.37-0.7955-1.348-0.77339-2.0771-0.90598-0.9723-1.6794-0.088-1.127-0.7513-1.6131-2.2981-0.33146-2.2097-1.0607-0.8618,0.15468-0.8838-0.95017-0.8176-0.57453-1.3038,0.61872-0.8396,2.7621,0.022,1.2595-0.8839,0.92808-0.3094,0.0663-0.8176-0.97227-1.0385-0.97227-0.9281-2.1434-0.9723-0.97227-1.1932-2.276-0.685-2.5191-1.7678-0.57453-0.4641-1.3037-0.7954-1.7457-1.591-1.5468-1.6131-1.37-1.2817-0.66291-0.6408,0.83969-1.0606,1.37-0.9723,1.6573-0.1989,0.13258-2.7179-1.1711-1.1049-0.22098-1.149-0.64081-0.8176-0.99437-0.9502-0.11049-0.9944,1.7899-0.1767,1.5247,0.8397,1.0165-0.8397,0.88389-0.9723-1.149-0.9944-1.9666-0.9501-0.95018-1.348-0.22097-1.3921-2.5412-0.3535-0.50824-0.9281-0.88388-1.1491,0.97227-0.8839,0.37565-1.9445s0.59662-0.7513,0.7513-0.8839,1.127-0.9502,1.127-0.9502l1.0165-2.0329-0.11048-1.9445-0.0442-1.1712-1.2153-1.37-0.95017,1.1932-0.81759,0.1105-0.28727-0.928,0.11049-1.9004-0.97227-1.4363,0.15468-0.7513,1.1711-0.066,0.64081-1.0165,0.39775-0.2651,2.0108,0.1325,0.15468-0.7513-2.1213-0.1767-0.48614-0.5304-0.97227-0.4419-0.83969-0.7292-1.127-0.8618,1.0828-1.4805-0.17678-1.2816,1.149-0.3536-1.6352-0.9944-1.3037-0.3093-0.0221-0.7292,1.0386-0.9723-0.0663-1.2374-0.86178-0.9502z").attr(attr);
            eur.ba = R.path("m584.33,429.72-0.19887-2.8063,1.2816-1.3921-0.11049-1.6352-0.88388-1.1491,0.0884-3.1157,3.2041-2.8726,0.0221-2.1434,2.3423-3.0052,0.48613-0.066,1.1049,0.8839,0.97227,1.0606,0.79549-0.1767,0.26517-0.6408-2.276-4.0438,0.28726-0.9502,0.90598-0.088,1.2374,1.0607,1.7457,0.044,0.83969-1.0607,1.3479-0.9723,1.6352-0.1988,0.15468-2.6738-1.149-1.149-0.26516-1.1491-0.70711-0.8618-0.90598-0.8838-0.11048-1.0165,1.7678-0.1768,1.5247,0.8176,1.1049-0.8397,0.81759-0.9281-1.127-0.9943-1.9446-0.9723-0.99437-1.3258-0.22097-1.3921-2.5412-0.3757-0.53033-0.9502-0.86179-1.1269,0.95018-0.8618,0.39774-1.9224,0.7734-0.9944,1.0607-0.8618,1.0386-2.0329-0.11049-3.0715-1.1932-1.3701-1.0165,1.1491-0.81759,0.088-4.4636-0.022-0.68501-0.906-0.0221-1.149-0.68501-1.0165-1.149-0.9723-2.2318,0-0.7513-0.022-0.64082-0.7071-1.0828-0.6629-1.37,0.3978-1.5689,0.3756-1.2595-1.1711-1.1049,0.5082-0.95017,1.2153-2.0771,0.1768-1.127-0.8618-1.6573-0.7071-1.9004-0.4419-1.3921-0.9502-1.7457-0.1105-1.1932,0.221-1.7457-0.6408-0.92808-0.8618-1.4363,1.0827-1.1048,0.088-1.3037-0.7292-1.4584-0.2872-1.0828,0.8839-0.86178,1.6793-0.7734,1.6352-0.55243,0.2652-0.48613-0.066-0.86179-1.0828-1.0386-1.0606-1.3479-1.1933-1.0828-0.8397-0.72921-1.0385-1.0386,0.9943-1.1711,1.1491,0.0884,2.0329-0.99436,0.9281,0,4.0217,0.99436,0.9722,2.055,0.9944,0.90598,1.9887-0.0221,1.2596,0.99437,0.8618,0.11048,1.6793,1.0386,1.0828,0.83969,1.2595-1.0165,0.8176-0.99437,1.1712,1.2374,0.9722,1.8562,0.8176,0.97227,1.8341,2.1655,1.37,0.88388,0.8839,1.1712,1.9445,1.7899,2.0772,1.0607,2.1434,1.9224,1.8119,1.127,1.2375,1.8782,0.8397,0.15468,2.8726,4.0438,4.1542,1.812,1.7899,0.30936,1.3921,2.5412,1.8341,0.30936,1.6794,1.7236,1.2816,2.055,2.0992,1.7678,1.37,1.4363,1.6352z").attr(attr);
            eur.gr = R.path("m609.43,486.73,0.7513,0.044,1.3921-0.5082,0.30935-2.6517,1.6573-0.088,0.0221-0.9722-1.127-1.1491,0.15468-1.6131,0.90598-1.1269,2.1655-0.2652,1.0607-0.6629,0.99437-0.3315,0.81759-0.9722,0-3.7786,0.86178-1.1712,0.92808-1.0385,1.1932-0.9281,1.9887-1.7457,0.0221-2.2097-0.99437-0.9281,0.22097-1.8782,1.9004,0,0.90598-0.9281,1.7015-0.221,3.4692-0.044,1.0165-0.8176,2.9389-0.022,0.7513-0.9943-0.11049-1.127,1.1049-0.906,1.149-1.0606,1.0386-0.7071,0.95017,0.7513,0.59663-0.9944,1.3921-0.066,2.0771,0.1105,1.0165,1.1048,1.8562-0.3314,1.1048-0.8839,0.99437,0.088,1.1049-0.7955-0.19888-2.3202,1.0165-0.9502,2.4086,0.088,2.6958-0.1546,0.99436-0.9944,2.8284-0.088,1.0828-0.8397,6.0325,0,0.7734-0.7955,1.2816-0.1547,1.2153-1.2153,1.7236-0.7955,3.3146-0.088,1.6573-0.3536,1.0386,0.5525,1.7678,3.0936,1.2816-0.2873,0.99437-1.0607,1.7457,0.088,1.1711,0.7734,0.88389,0.3094,2.3202,1.9666,1.7236-0.243,1.0386-0.7955,3.7123,0.066,1.3037-1.2154,3.7786,0,1.4142-0.7955,0.86179-0.9059-0.19888-1.9004-0.90598-1.1049-0.17677-1.0606-0.7513-0.8397-0.0221-1.37,1.127-0.7734,2.2097-0.088,0.41984-0.3978,1.0165,1.0607,1.7678,0.5524,1.5468,0.906,0,0.8397,0.99437,1.1048-0.22097,3.7565-1.4142,0.9502-0.95018,0.066-2.9389,3.1599,1.37,1.0165,0.15468,3.0936-1.0165,0.906-0.28726,0.9943-0.79549,0.9944-1.9666,1.2595-0.0884-1.2595-5.8557,0.066-1.8562-0.022-1.149-0.9723-1.149,0-0.99437-0.7955-1.7015,0.022-0.90598-0.1767-0.97227-0.906-1.0828,0.2872-0.81759,0.7071-1.149,0.9723-0.70711,0.7955-1.4363,1.0386-1.127-0.022-0.97227-1.0165-0.79549-0.8176-1.5689-0.2652-0.61872,0.3094-1.2595,0.8397-0.97227,0.9944-0.7513,1.9666-0.97227,0.8397-1.7236,0.3535-1.127-0.1546-1.127-0.8839-1.3921-0.088-0.66291,0.022-1.0607,0.8839-0.0884,1.1048,1.0165,1.1491,1.127,0.5966,0.7734,0.906-0.68501,1.1269,0.0884,0.7955,0.97227,0.1989,1.5026,0.044,1.1049,0.8618,2.0992,1.0606,1.3258,1.2596,0.7734,0.5745,0.97227,1.0165,0.33146,0.9722-0.48614,0.4199-0.79549,0.3314s-0.28726-0.2651-0.68501-0.5745c-0.39775-0.3093-0.72921-0.685-0.83969-0.9502-0.11049-0.2651-0.48614-0.9722-0.48614-0.9722l-0.97227-1.127-0.79549-0.6187-1.3921-0.088-0.95017-0.088-0.70711-0.7955-0.97227-0.1326-1.1932,0.6187-1.0165,1.0386,0.0221,0.4861,1.1048,0.7513,1.1712,0.7734,0.68501,0.2873,0.86178,0.8397,1.2816,1.1711,0.11049,1.4584-0.15468,0.6851-0.70711,0.4198s-0.55243-0.1768-0.64081-0.2431c-0.0884-0.066-0.7513-0.4198-0.8176-0.5303s-0.37565-0.8618-0.46404-0.9281c-0.0884-0.066-0.95017-0.8176-0.95017-0.8176l-0.70711-1.0827-0.83969-0.7955-0.97227-0.8176-0.90598-0.3978-0.86178-0.8617-1.4363,0.1104-0.83968,0.3978,0.0663,0.7955-0.0663,1.2374,1.0607,1.0607,0.88388,0.9502s0.61872,1.0606,1.1932,1.1269c0.57453,0.066,1.149,0.1547,1.3479,0.1768,0.19888,0.022,1.2816,0.8176,1.2816,0.8176l0.35355,0.4419-0.13258,0.1547-0.7955,0.044-2.1434-0.2652h-1.0828l-1.2816-0.7955-0.55243-0.3756-0.61872-0.7955-0.70711-1.0386-0.0442-0.8618,0.17678-1.0164-0.24307-0.9944-0.35356-0.066-1.6352-0.8618-0.64082-0.044-0.86178-0.1326-1.1712-0.9722-1.1048-1.0165-0.86179-0.8839-0.24307-1.0606,0.97228-0.442,1.1711,0.221-0.13258-0.8839-0.7513-0.9502-1.149-0.1767-0.66291,0.8176-1.2374,0.5524,0.0221,0.6629-1.0165,0.221-0.79549,0.5745-0.0221,1.1048,0.79549,1.127,0.11049,0.9723-0.41985,1.2595-0.61871,0.685-0.7734,1.1933,0.11048,0.6408,0.26517,1.0606,1.1711,1.9004,1.3037,1.0827,0.66291,0.906,0.83969,0.8397,0.55243,0.5082,0.53033,0.8618,0.28726,1.0386,0.11049,2.0108,0.83969,0.9723,1.4584,1.2816,0.97227,0.5966,0.59662,0.1547,0.90598,0.9723,0.99437,0.7734,1.1932,1.3479,0.17678,0.9281,0.90598,0.7513-0.28726,1.0828-0.66292,0.3756-1.3037,0.5745-1.149,0.2431h-0.72921l0.55243-0.7513s0.17678-0.5303,0.19887-0.6187c0.0221-0.088,0.0663-0.7513,0.0663-0.7513l-0.15468-0.7071-0.61872-0.7071-0.99437-0.6409-0.88389-0.464-0.92807,0.044s-0.28726,0.5745-0.57453,0.7955c-0.28726,0.221-1.2595,0.7292-1.2595,0.7292l-0.44194,1.0165s0.53033,0.464,0.68501,0.6187,0.92807,0.9281,0.92807,0.9281,0.50824,0.6187,0.66292,0.7071c0.15468,0.088,0.83969,0.4861,0.83969,0.4861l0.13258,0.3978-0.0442,1.8119-0.17677,1.7899-1.149-0.5524-0.66291,0.1104-0.86179,0.3536-1.2374,0.3756-2.1876-0.066-0.83969,0.5746s0.19888,0.4861,0.59662,0.4861c0.39775,0,1.8562-0.088,1.8562-0.088l0.50823,0.442s-0.0663,0.5303,0.24307,0.5524c0.30936,0.022,1.127,0.088,1.127,0.088l0.41985-1.0828,0.7513-0.3314,0.66291-0.1989,0.30936,0.221s0.22097,0.3535,0.26516,0.5082c0.0442,0.1547,0.33146,0.6187,0.33146,0.6187l0.66291,0.906,0.92808,0.9502,0.53033,0.7734s1.2816-0.1547,1.3921-0.1989c0.11048-0.044,1.3479-0.1768,1.3479-0.1768l0.35355,0.9281,0.30936,1.0827,0.59662,0.5083,0.72921,0.1768,1.4363,0.3756,0.7071,0.1768,0.95018,0.7734,0.59662,0.6629,1.9887,0.7513-0.46404,0.5745-0.26517,0.906,0.15468,0.8839-0.11048,0.6629-0.61872,0.5524-1.1932,0.022-1.0828-0.1989-0.99437,0.066,0.59662,0.7734,1.0165,0.2431,0.7513,0.7734,0.35355,0.8176-0.17677,0.3978-0.97227,0.066-1.0386,0.6629-0.7513,0.9722-0.95017,0.3094-1.1049,0.066-0.83969-0.066-0.97227,0.6629-1.1711,0.4861-0.88389-0.1104-0.86178,0.1104-0.61872-0.8176-0.59662-0.7955-0.72921-0.3756-0.39775-1.0386,1.4142,0.022,1.5026-0.2651s1.2595,0.1326,1.37,0.1105c0.11048-0.022,0.83969-0.2431,0.83969-0.2431l0.57452-0.4419-0.24307-0.6851s-0.30935-0.4419-0.39774-0.5303c-0.0884-0.088-0.7513-0.5966-0.7513-0.5966l-0.83969,0.3756-0.99437-0.088h-1.2374l-1.127-0.2651-0.7734-0.2873-1.0828-0.3977-0.7292-0.9723-0.57452-0.7292-0.88389,0.044-0.64081,0.8618-0.86179,0.022-0.57452-0.7071s-0.22097-0.3978-0.26517-0.5083c-0.0442-0.1104-0.30936-0.5303-0.30936-0.5303l-0.37565-0.3535-0.50823,0.044s-0.0663,0.022-0.13258,0.1767c-0.0663,0.1547-0.19888,0.3757-0.19888,0.3757s-0.17677,0.1547-0.28726,0.221c-0.11048,0.066-0.22097,0.1546-0.39775,0.2209-0.17677,0.066-1.0165,0.1989-1.0165,0.1989l-0.7734,0.022-1.0165-0.1326-1.3037-0.1768s-0.57453-0.6408-0.66292-0.6629c-0.0884-0.022-1.7899-0.1547-1.7899-0.1547l-0.7955,0.044-0.61872,0.044-0.66291,0.906-0.30936,0.4641-0.0221,0.3314-0.33146,0.044-0.44194-0.2872-0.61872-0.3315-0.88388-0.1326-0.88389,0.1547s-0.37565,0.5082-0.46404,0.5524c-0.0884,0.044-1.1048,0.088-1.1048,0.088s-0.50823-0.1768-0.66291-0.3093c-0.15468-0.1326-0.7513-0.4862-0.7513-0.4862l-0.55243-0.1325h-0.7734c-0.11048,0-0.55243,0.022-0.55243,0.022s-0.17677,0.464-0.35355,0.5524c-0.17678,0.088-0.7513,0.3093-0.7513,0.3093s-0.7292,0.044-0.95018,0.066c-0.22097,0.022-0.86178-0.044-0.86178-0.044s-0.33146-0.1105-0.35356-0.3093c-0.0221-0.1989-0.19887-0.5966-0.22097-0.906s-0.0884-0.2431-0.0442-0.5524c0.0442-0.3094,0.0221-0.3536,0.0663-0.4862s0.15468-0.2651,0.15468-0.2651l0.0442-0.7513s-0.11048-0.2431-0.37565-0.3978c-0.26516-0.1547-0.50823-0.1989-0.55242-0.3756-0.0442-0.1768-0.0221-0.3978-0.0663-0.5083-0.0442-0.1104-0.0221-1.2153-0.0221-1.2153l-0.37565-0.5745s0.0884-0.3978-0.26517-0.5083c-0.35355-0.1104-1.0607-0.3535-1.0607-0.3535l-0.26516,0.022s-0.17678-0.3978-0.17678-0.5966c0-0.1989-0.0442-0.442-0.0663-0.6409-0.0221-0.1988,0.0663-0.1546-0.0884-0.3977-0.15468-0.2431-0.17677-0.3094-0.17677-0.3094l-0.64082-0.1325-0.61872,0.022-0.28726,0.1988s0.41984-0.1105-0.15468,0.088c-0.57452,0.1989-0.81759,0.2652-0.81759,0.2652s-0.0663,0.1768-0.0884,0.2652c-0.0221,0.088-0.0884,0.088-0.0884,0.3977,0,0.3094,0.0663,0.2652,0.0663,0.6629v0.6187c0,0.1105,0.0663,0.3978,0.0663,0.3978l-0.0221,0.1988s-0.24307,0.3536-0.35356,0.4199c-0.11048,0.066-0.15468,0.066-0.26516,0.1105-0.11049,0.044,0.17677-0.1768-0.37565,0.1547-0.55243,0.3314-0.83969,0.4419-0.83969,0.4419l-0.26512,0.044s-0.0663,0.066-0.19887-0.221c-0.13258-0.2872-0.19887-0.3093-0.19887-0.464s-0.0442-0.1326-0.0442-0.3315c0-0.1988,0.0442-0.4198,0.0884-0.5966s0.0442-0.1105,0.11049-0.2873c0.0663-0.1767,0.11048-0.2651,0.19887-0.5303,0.0884-0.2652,0.13258-0.2872,0.13258-0.5303s-0.0221-0.1989-0.0221-0.464c0-0.2652-0.0442-0.2431,0-0.3315,0.0442-0.088,0.0884-0.1989,0.28727-0.3315s-0.0663,0.044,0.30936-0.2209c0.37565-0.2652,0.33145-0.221,0.41984-0.2873,0.0884-0.066,0.0442-0.022,0.17678-0.1105,0.13258-0.088,0.13258-0.088,0.22097-0.1547,0.0884-0.066,0,0.1105,0.22097-0.243,0.22097-0.3536,0.22097-0.3757,0.22097-0.3757l0.24307-0.2872,0.19887-0.1326s0.0442-0.044,0.11049-0.044c0.0663,0,1.5026-0.7292,1.5026-0.7292l0.22097-0.442-0.17678-0.3977-0.61872-0.4199-0.28726-0.088-1.2816-0.7071s0.0221-0.243-0.17678-0.5082c-0.19887-0.2652-0.61871-0.6187-0.64081-0.7071-0.0221-0.088-0.39775-0.6187-0.39775-0.6187l-1.2595-1.348-1.149-0.7292-0.68501-1.1711-1.1712-0.088-0.88388-0.8176s-0.68501-0.906-0.66291-0.9944c0.0221-0.088-0.0442-0.4861-0.0221-0.6187s-0.57452-1.4142-0.57452-1.4142l-0.83969-0.8839s-0.41985-0.7071-0.41985-0.7955c0-0.088-0.22097-0.7955-0.19887-1.0606,0.0221-0.2652-0.13258-0.7955-0.13258-0.7955z").attr(attr);
            eur.gr1 = R.path("m607.46,484.72-1.2816-0.088-0.61872-0.9281-2.2097-0.3094-0.83969,0.2652-1.0165,0.9281-0.13258,0.9722,1.0165,1.4585,0.26516,1.0164,0.88389,0.8397,1.2374,1.2816,1.2374,1.2817,1.1932,0.7513,0.22097,0.5745,1.8562,0.3536,0.35355-1.2375-1.149-0.7955-2.0329-1.37-1.0165-1.3258,0-1.1049,0.30936-1.149,0.7955-0.3978,0.97227,0.1768z").attr(attr);
            eur.gr2 = R.path("m685.6,477.65-0.17677,1.0607,0.92808,0.7071,0.17677,1.1932,1.2374,0.3536,0.92808-0.1326,0.92807,0.1326s0.57453,0.6187,0.7513,0.5745c0.17678-0.044,1.37-0.5303,1.37-0.5303l-0.92807-1.3259,0.57452-0.928,1.1932-0.8839,0.0884-1.4142-1.3258-0.088-1.0165,0.7513-1.2374,0.3093-1.0165,0.1326-0.57453-0.7955-1.0165-0.1326z").attr(attr);
            eur.gr3 = R.path("m697.18,473.5,0.0884,1.4142,1.149-0.8397,1.1932-0.088,0.79549-0.044-0.17677-0.5303-0.57453,0-0.83969,0.2209z").attr(attr);
            eur.gr4 = R.path("m691.34,466.51,0.0442,1.1048,0.70711,0.221,0.44194,0.6629,0.61872,0.3536,1.5468,0.1326,0.7955-0.088,0.35355-1.1933-0.0442-0.9723-1.2374-0.3977-1.2374,0.044z").attr(attr);
            eur.gr5 = R.path("m678.66,498.69c-0.13258,0.1989-1.127,0.906-1.127,0.906l-0.0663,1.1712,0.99437,0.8617,1.127,0.1326,0.92807,0.906,1.0607,0.044,0.15468-0.9502-0.90598-1.0827-1.0386-0.8618-0.13258-1.2816z").attr(attr);
            eur.gr6 = R.path("m654.66,499.67-0.0937,1.8438,1.4062,0.4375,0.8125-0.094,0.625,0.5312,1.3438,0.4063,0.875,0.25,0.625,0.8437,0.9375,0.625,1.2812,1.9688,2.0938,1.5312,0.9375,0.6563-0.84375,1,0.5,0.6562,2.0312,0.7813,1.375-0.375,1.6562,0.062,1.3438,0.062,0.6875,0.625,0.9375,1.0937,0.625,0.9375,0.53125,1.0625,0.40625,1.2813,1,0.875,0.625,0.9687,0.71875,1.0313,1.3125,0.125,2.0312,0.062,0.40625-0.5-0.0625-1.4063,0-1.375-0.96875-1.125-1.375-0.1562-1.6875,0.062-1.25-0.625-1.0625-1.25,0.3125-1.9688-0.1875-1.8125-0.125-1.1562-0.90625-0.8438,0.0312-0.9375-0.71875-1-1.2188-0.3437-0.90625,0.8437-1.5938,0.1563-0.59375-0.7188-1.2812-0.9062-1.6875-0.4688-1.5-0.4375-0.78125-0.5625-1.0312-1.375-0.84375-0.7812-0.875-1.4688-1.0312-0.3125-1.2812,0.125-0.71875-0.125-0.84375,0.9688z").attr(attr);
            eur.gr7 = R.path("m683.43,518.62-0.0884,1.37,0.7955,0.8839,0.26516,0.7513,1.2816,1.1491,0.83969,1.1932,1.1049,0.044,0.61871,0.4861,0.13259,0.7513,0.83969,1.0165,0.88388,0.5303,1.1932,0.1326,0.83969,0,0.88389,0.3978,0.26516,1.149,1.1048,0.3978,0.83969,0,0.97228-0.9281-0.97228-0.5745-0.97227,0.044-1.3258-0.3536-0.39775-1.1932-0.0884-1.4142-0.92808-0.221-1.591-0.044-0.79549-0.5304-1.37-0.7955-0.17678-1.6793-0.0442-1.4584-1.5026-0.4862-1.3258-0.8397z").attr(attr);
            eur.gr8 = R.path("m667.26,511.1-0.5625,0.625-0.25,0.8438,0.1875,0.9375-0.125,0.6875-0.65625,0.5-1.2188,0-1-0.125-1.0938,0,0.6875,0.7812,1.0625,0.25,0.6875,0.7188,0.34375,0.8125-0.125,0.4375-1,0.062-1.0312,0.75-0.84375,1.0312,0.25,1.1563,0.90625,0.3125s0.90625,0.125,0.96875-0.031c0.0625-0.1563,0.40625-0.9375,0.40625-0.9375l1.375,0.031,0.8125,0.2812,0.53125,1.375,0.65625,1,1.4062,0.375,0.3125,0.75,0.9375,0.625,0.40625,0.8438,1.1562,0.7187,0.84375-1.0312,0.5-1.5313-0.15625-1.2187-0.71875-0.9063-0.625-1.3125-0.8125-1.25,0.0625-1.75,0.0937-1.0937,0.9375-0.1875,0.21875-1.0313,0.34375-0.75-1.2188-0.4062-0.46875-0.6563-1.3125-0.2187-1.125,0.1562-0.5625-0.5z").attr(attr);
            eur.gr9 = R.path("m676.45,524.63-0.13258,1.0165,0.0884,1.591,0.61871,0.5745,0.75131-0.044,0.83968-1.0607-0.0442-0.928,0-0.9723-1.0165-0.5303z").attr(attr);
            eur.gr10 = R.path("m687.59,527.68-0.97227,0.8397,0.66291,0.2652z").attr(attr);
            eur.gr11 = R.path("m691.57,537.62,0.92808,0.044,0.88388-0.8397,0.88388,0.6187,1.4142,0.9723,1.37,0.221,0.70711-0.4862,0.66291-0.6629,0.26517-1.6793-0.0884-1.3259-0.83969-1.0164-1.3258,0.044-0.61872,1.149-2.5191-0.044-1.2816-0.1326-0.35355,1.1049z").attr(attr);
            eur.gr12 = R.path("m612.26,515.97,1.149,0.8839,1.0165-0.044,0.90598,0.8176,1.6352,0.1768,0.7955,0.088,0.81759,0.7513,1.127,0.1326,0.88389-0.3536-0.0221-0.7513-1.2153-1.149-0.7292-1.5026-0.99437-1.2375-0.0663-0.928-0.7734-1.348-1.149,0.906-1.1932,1.127-1.5689,0.044-0.57452,0.906z").attr(attr);
            eur.gr13 = R.path("m617.5,522.6,0,2.0992s1.1049,0.8397,1.127,0.9723,0.92807,0.9943,0.92807,0.9943l0.88389,0.906,1.2816-0.7292,1.0165-1.0385,0.72921-0.1326-1.7678-0.9723-1.5689-1.2374-0.86179-0.9281-0.53033-0.8176z").attr(attr);
            eur.gr14 = R.path("m635.7,513.56-0.26516,0.9501-0.7955,0.8839-0.26516,1.1933-0.86179,0.044-1.8341-0.1768-0.99437-0.7071-1.0386-0.1989-1.0607,1.7457-0.0884,1.5026-0.19887,0.7292-0.68501,1.0165-1.1048,0.2209-0.95018,0.7071-1.149,0.9944,0.66292,1.3037,1.7236-0.066,0.7513,0.1989,0.7513,0.8176,0.13258,2.1655,1.6573,0.4199,0.8176,0.7292,1.5026,1.0606,0.7513,0.9502,0.44194,0.7513,0.88388,0.7955,0.0442,2.74-0.99437,1.0828-0.99437,1.0386-0.15468,1.149,1.127,1.1491,0.0442,1.1932,0.83969,0.8618,1.0386,0.8397-0.66291,0.9501-0.13259,1.0165-0.0663,0.442,2.1213,0.066,1.4805-0.066,1.5026-0.088-0.81759-1.4364-0.0663-1.9224,0.64081-0.9281,1.7899,0.221,1.2595,0.022,0.17678,1.7015,0.41984,1.0606,1.2153,0.2873s0.0221,0.5966,0.17678,0.6629c0.15468,0.066,1.2153,0.221,1.2153,0.221l3.3367-0.066,1.3921,0.066,1.9666,0.022h1.1932l3.8007,0.066,0.57452-0.7955-0.46404-1.37-0.88388-1.0828-0.0442-1.7015-0.59662-1.3921-1.3479-0.9723-0.0221-0.928-0.0884-0.9944-0.64081-1.2596-1.3037-1.7677-1.0165-1.7678,0.0884-1.2374,0.50824-0.6629,0.88388,0.1105,0.46404,0.4419,1.9887,0.3756,0.13258,0.5967,0.83969,1.9003,1.2153,0.685,0.0221,0.7071,1.3479,1.1933,0.92807-0.9502,0.53033-0.6187,0.24307-1.0828,0.61872-0.7071,2.1434,0.088,1.0165-0.3093,0.28727-0.663-0.64082-0.4419-0.57452-0.6629-0.95018-0.2431-0.17677-0.6629,0.0221-0.3314,0.13258-0.221,0.0663-0.2431-0.19888-0.243-0.33145-0.1768-0.17678-0.044h-0.88388l-0.53033,0.8839-0.57453,0.1104-1.5247-0.6408,0.11049-1.37,0.11048-1.6573-0.26516-1.0164-0.57453-0.3536-2.1876-0.7071-0.86178-0.9723-2.3202-0.9501-1.1711-0.8176-0.95018-0.5304-0.88388-0.7513-1.1932-0.7071-1.127-0.3756-1.4584-0.1768-1.2374-0.7955-0.7513-0.1326-1.2374-0.7071-0.79549-0.2209-0.70711-0.1105-1.149-0.7734-0.81759-0.2652-1.127-0.1989-0.72921,0.044z").attr(attr);
            eur.hr = R.path("m569.46,419.2,0.92808,0.4199,0.81759,0.4419,0.70711,0.5303,0.39774,0.2431,0.99437,0.7513,0.24307,0.066,0.61872,0.3315s0.26516,0.4861,0.41984,0.5303c0.15468,0.044,0.53033,0.044,0.61872,0.044,0.0884,0,0.50823-0.088,0.50823-0.088l-0.26516-1.6352-2.5854-1.8782-0.30936-1.3701-5.922-5.9883-0.13258-2.8284-1.8341-0.8397-3.0936-3.0936-0.99437-2.1213-1.7899-2.0771-1.2153-1.9446-0.92808-0.8839-2.0992-1.37-0.99437-1.8119-1.8341-0.8176-1.2595-1.0386,0.99437-1.149,1.0165-0.8618-0.86179-1.2154-1.0165-1.0827-0.0884-1.6573-0.99437-0.8618,0.0221-1.2374-0.92808-1.9888-2.0329-1.0385-1.0165-0.9723v-4.0217l0.99437-0.906-0.0663-2.0992,2.2097-2.1213,0.68501,1.0386,1.127,0.9059,1.6131,1.4364,0.90598,0.9501,0.7071,0.906,0.48614,0.066,0.59662-0.2652,1.6131-3.2924,1.0828-0.906,1.4142,0.3093,1.2816,0.7293,1.149-0.1105,1.4363-1.0607,0.92808,0.8176,1.7015,0.685,1.2374-0.243,1.7457,0.1325,1.37,0.9281,1.9445,0.464,1.6131,0.685,1.149,0.8839,2.0992-0.1988,0.92808-1.1712,1.1048-0.5303,1.2595,1.149,2.9168-0.7734,1.127,0.685,0.61872,0.6851,2.9831,0.044,1.149,0.9501,0.68501,1.0386v1.127l0.7292,0.928h4.4857l-0.30936-0.8618,0.13258-1.9224-0.97227-1.4142,0.19887-0.7955,1.0828-0.044,0.70711-1.0165,0.39775-0.2872,1.9445,0.1326,0.19887-0.7293-2.1434-0.1988-0.46404-0.5304-0.99437-0.4198-0.88389-0.8176-1.0607-0.7955,1.0828-1.4584-0.19887-1.3037,1.127-0.3757-1.6573-0.9722-1.2374-0.3094v-0.7513l0.99437-0.9723-0.0221-1.1932-0.88388-0.9281-0.11049-2.3644-2.2097-0.464-1.2595-0.044-0.86179,1.8782-1.834,1.0165-4.6183,0.066-1.4142-1.127h-3.7786l-1.9224-2.0992-1.1711-0.7734-3.1157-0.2873-0.90598-0.8838-0.66291-2.939-3.0936-1.9003-6.0988-5.8557-1.4142-1.1933-1.7457,0.1105-0.7292,0.7734-0.22097,1.812-0.61872,0.2872-1.0165,0.221-1.37,0.8176-0.7955,1.0165-1.7236,0.1105h-1.0165l-0.7513,0.5966s-0.35355,0.1988-0.48613,0.243c-0.13259,0.044-1.0828,0.9281-1.0828,0.9281l-0.11049,1.9446,1.0828,1.4584,0.0221,0.5745-0.13259,1.6131,0.0442,0.7071-0.88388,0.8397-1.9446-0.066-0.90598,0.1547-1.0828,0.7071-1.0828,1.149,0.92807,1.0607-0.35355,0.9722-0.41984,0.3536-0.11049,1.3037-0.15468,1.1712-0.46404,0.8176-0.30936,0.3093-1.0607,0.022-1.0607-0.7955-1.0165-0.9059-0.95018-0.1547-0.7292-0.044-1.2374,0.5745-1.3037-0.906s-0.53033-0.5966-0.55242-0.7071c-0.0221-0.1105-1.149-1.0165-1.149-1.0165l-0.95018-0.022-0.77339,0.7292-1.4363,1.0828-1.3037,0.4419-0.86179-0.2872-0.99437-0.8397-0.99437-0.088-0.95017-0.022-0.83969,0.5745s-0.50823,0.2652-0.64082,0.2873c-0.13258,0.022-0.90598,0.1105-0.90598,0.1105l-1.7236,0.066-1.7236-0.1547-0.90598-0.8397-0.61872,0.088-0.35356,0.5303-0.13258,0.5524s-0.13258,0.7514-0.11048,0.8839c0.0221,0.1326,0.17677,0.7734,0.28726,0.8397,0.11048,0.066,0.64081,0.442,0.64081,0.442l0.39775,0.9943-0.17678,2.7401,0.0663,0.9723,0.11048,0.5966,0.17678,0.3977,0.46404,0.5745,0.7513,0.5746,0.55243,2.3202,0.0442,0.5524,0.95017,0.4419,0.11049,0.5083,0.81759,0.4198,0.86179-0.2431s0.26516-0.1767,0.22097-0.4861c-0.0442-0.3094-0.0663-0.2431-0.0884-0.6187-0.0221-0.3757-0.15468-0.5524,0.0221-0.8839,0.17677-0.3315,0.30936-0.6629,0.41984-0.7292,0.11049-0.066,0.28726-0.3094,0.48614-0.3315,0.19887-0.022-0.33146-0.1767,0.97227-0.1988,1.3037-0.022,0.83969-0.3094,0.83969-0.3094l0.33146-0.7513,0.26516-0.6408,0.53033-0.1105,0.70711,0.7513-0.13259,0.7513,0.22098,0.7513-0.0884,1.6352-0.70711,0.5524,1.0165,1.8341,0.15468,2.3423s0.7071,0.2651,0.68501,0.3756c-0.0221,0.1105,0.22097,0.9281,0.22097,0.9281s0.64081-0.6187,0.57452-0.7955c-0.0663-0.1768-0.33146-0.5966-0.35355-0.9723-0.0221-0.3756-0.0221-0.3535-0.0663-1.1048s-0.0884-0.8397-0.0884-1.2596c0-0.4198-0.0884-0.8838-0.0663-1.1048s0.0442-0.7292,0.0442-0.7292,0.28726-0.906,0.24307-1.1049c-0.0442-0.1988-0.46404-1.591-0.46404-1.6793,0-0.088,0.0442-0.7292,0.0442-0.7292s-0.61871-0.6851-0.7071-0.9502c-0.0884-0.2652-0.15468-0.5304-0.30936-0.7513-0.15468-0.221-0.48614-0.5083-0.57453-0.7292-0.0884-0.221-0.37565-1.0165-0.30936-1.1049,0.0663-0.088,0.61872-0.8839,0.70711-0.9723,0.0884-0.088,0.7513-0.928,0.83969-0.9501,0.0884-0.022,1.149-0.2431,1.149-0.2431s0.44194,0.1105,0.70711,0.1768c0.26516,0.066,0.7071,0.1547,0.77339,0.2651,0.0663,0.1105,0.48614,0.8176,0.55243,0.9502,0.0663,0.1326,0.30936,0.9723,0.30936,0.9723l-0.46404,0.5303s-0.55243,0.5304-0.64081,0.6187c-0.0884,0.088-0.39775,0.3315-0.39775,0.3315s-0.48614,0.7071-0.50823,0.7955c-0.0221,0.088-0.13259,0.4419-0.0663,0.5524,0.0663,0.1105,0.22098,0.2873,0.35356,0.3978s0.7513,0.5966,1.0165,0.7734c0.26517,0.1767,0.30936,0.1546,0.39775,0.2651,0.0884,0.1105,0.28726,0.3094,0.66291,0.4199s0.39775,0.1105,0.7734,0.2209c0.37565,0.1105,0.0663-0.022,0.50823,0.1989,0.44195,0.221,0.17678,0.1105,0.7955,0.3094s0.55243,0.1326,0.7292,0.2209c0.17678,0.088,0.35356,0.2431,0.35356,0.2431l0.24307,1.591,0.0442,3.4913-0.0884,1.2817-0.46404,0.3977s-0.59662-0.1988-0.83969-0.3535c-0.24306-0.1547-0.81759-0.6187-0.81759-0.6187l-0.59662,0.1546c0,0.1547-0.0442,0.3315,0.17678,0.6188,0.22097,0.2872,0.48613,0.5966,0.50823,0.7071,0.0221,0.1104-0.0221,0.6187,0.0663,0.7734,0.0884,0.1546-0.13258,0.2651,0.30936,0.5303s0.7734,0.4419,1.0828,0.5966c0.30936,0.1547,0.41984,0.1326,0.64081,0.3094,0.22097,0.1767,2.4528,2.4085,2.4528,2.4085l0.41984,0.6409,0.41985,1.1269-0.33146,0.9723,0.19888,0.7734,0.64081,1.834,1.0607,1.8341,1.0165,0.9281,0.83969,1.1269,2.9389,2.9831,1.1048,0.6188,0.70711,0.8617,0.92808,0.663s0.86178,0.6629,0.95017,0.6629c0.0884,0,0.88389,0.7071,0.88389,0.7955,0,0.088-0.17678,1.0827-0.11049,1.3037,0.0663,0.221,0.26517,1.1711,0.26517,1.1711s0.24306,0.442,0.37565,0.4862c0.13258,0.044,0.64081,0.1326,0.81759,0.1326h0.68501c0.19887,0,0.7071,0.1104,0.88388-0.022,0.17678-0.1326,0.33146-0.3315,0.44194-0.442,0.11049-0.1105,0.30936-0.3977,0.53033-0.3977h0.57453c0.19887,0,0.97227,0.044,0.97227,0.044l0.44194,0.1104,0.50823,0.3978s0.48614,0.2873,0.68501,0.3315c0.19888,0.044,0.61872,0.1546,0.83969,0.1988,0.22097,0.044,0.46404-0.022,0.59662,0.1547,0.13259,0.1768,0.30936,0.4861,0.50824,0.5745,0.19887,0.088,0.95017,0.3094,0.95017,0.3094l1.7899,0.8176,1.4363-0.022s0.68501,0.6187,0.81759,0.7734,0.17678,0.2651,0.37565,0.4861,0.26516,0.3094,0.57452,0.6629c0.30936,0.3536,0.17678,0.221,0.46404,0.5967,0.28726,0.3756,0.46404,0.7513,0.55243,0.8617,0.0884,0.1105,0.19887,0.2873,0.37565,0.5083,0.17678,0.2209,0.15468,0.1105,0.30936,0.3093,0.15468,0.1989,0.28726,0.3315,0.37565,0.442,0.0884,0.1105-0.19887,0.044,0.22097,0.2651,0.41985,0.221,0.28726,0.1105,0.48614,0.2431,0.19887,0.1326,0-0.1105,0.37565,0.2873,0.37565,0.3977,0.30936,0.3535,0.57452,0.5082,0.26517,0.1547,0.37565,0.221,0.7292,0.3757,0.35356,0.1546,0.41985,0.1767,0.41985,0.1767s0.0442,0.2652,0.26516,0.5304c0.22098,0.2651,0-0.022,0.39775,0.464,0.39775,0.4861,0.44194,0.5082,0.44194,0.5082l0.59663,0.8618z").attr(attr);
            eur.hr1 = R.path("m532.36,392.71s0.0884,0.9281,0.0663,1.1491c-0.0221,0.2209-0.17677,0.8838-0.0442,0.9943,0.13258,0.1105,0.86178,0.3757,0.92808,0.5304,0.0663,0.1546,0.28726,1.149,0.28726,1.149s0.0663,0.221,0.26516,0.3978c0.19888,0.1767,0.64082,0.5303,0.64082,0.5303l1.0607,1.3037s0.79549,0.1547,0.97227,0.1326c0.17678-0.022,0.61872,0.1105,0.61872-0.221,0-0.3314,0.15468-0.2209-0.17678-0.685-0.33145-0.464-0.17678-0.464-0.39775-0.5524-0.22097-0.088-0.17677,0.1768-0.50823-0.2431-0.33146-0.4198-0.33146-0.4419-0.44194-0.5745-0.11049-0.1326-0.26517-0.221-0.53033-0.5966-0.26517-0.3757-0.44194-0.5083-0.50823-0.7071-0.0663-0.1989-0.83969-1.0386-0.90598-1.1712-0.0663-0.1326-0.19888-0.4198-0.28727-0.5745-0.0884-0.1547-1.0386-0.8618-1.0386-0.8618z").attr(attr);
            eur.hr2 = R.path("m559.29,410.61,0.61872,0.5745,0.48613,0.5303-0.53033,0.7955-0.39774,0.4419,0,0.442,0.0442,0.6629,0.35355,0.3535,0.83969,0.221,1.3258,0.221,0.53033,0,0.26516,0.6187,0.0442,0.4861,0.83969,1.0165s0.39774,0.2652,0.57452,0.3536c0.17678,0.088,1.2816,0.3093,1.2816,0.3093l0.97227,0.221,0.48614,0.2652s0.53033,0.6629,0.79549,0.7071c0.26517,0.044,0.97228,0.044,0.97228,0.044s0.7513,0.3093,0.92807,0.4419c0.17678,0.1326,0.97228,0.5303,0.97228,0.5303l0.39774,0.1768,0.39775,0.3094,0.44194,0.2651,0.44194,0.3094,0.7955,0.5303,0.35355,0.2652-0.92808,0.1768h-0.7513c-0.17677,0-0.61871-0.1326-0.79549-0.088-0.17678,0.044-0.7513,0.088-0.7513,0.088l-0.48614,0.3977-0.0442,0.6629s0.53033,0.221,0.7071,0.2652c0.17678,0.044,0.53033,0,0.92808,0.088s1.1932,0.221,1.1932,0.221l-0.26516,0.3093-0.66291,0.1326-0.92808-0.044-0.53033-0.1326-0.61872-0.1325-0.66291-0.6188-0.35356-0.5303,0.35356-0.6187s0.26516-0.3978,0.22097-0.5745c-0.0442-0.1768-0.30936-0.7955-0.30936-0.7955s-0.26517-0.442-0.53033-0.4862c-0.26517-0.044-0.7513-0.3093-0.7513-0.3093l-0.7513-0.5304s-0.44194-0.5303-0.97227-0.4419c-0.53033,0.088-1.2374,0.8397-1.2374,0.8397s-0.35355,0.1768-0.83969,0.221c-0.48614,0.044-1.1932-0.1326-1.5468-0.1326-0.35355,0-1.4584,0.088-1.6794,0.1326-0.22098,0.044-0.7955,0.088-1.2374,0-0.44194-0.088-0.30936-0.1326-0.7955-0.1326-0.48613,0-0.97227-0.3536-0.97227-0.3536l-0.30936-0.5303s0.30936-0.088,0.57453-0.1326c0.26516-0.044,0.48613-0.088,0.48613-0.088s0.0884-0.088,0.53033,0c0.44194,0.088,0.48614,0.088,0.70711,0.1326,0.22097,0.044,0.26516,0.044,0.70711,0.044,0.44194,0,1.6352,0.044,1.6352,0.044l0.57452-0.221s-0.0442,0.088,0-0.3093c0.0442-0.3978,0.0884-0.3094,0.0884-0.6629,0-0.3536,0.0442-0.3978-0.0442-0.7072-0.0884-0.3093-0.26517-0.6629-0.26517-0.6629l-0.30936-0.1326s-0.26516-0.1767-0.66291-0.2651c-0.39775-0.088,0.0884-0.3094-0.66291-0.2652-0.7513,0.044-0.61872,0-1.0607,0.044-0.44194,0.044-0.30936,0.044-0.61872,0.044h-0.61872s-0.0884-0.088-0.44194-0.2651c-0.35355-0.1768-0.39775-0.3536-0.79549-0.442-0.39775-0.088-0.17678-0.088-0.66292-0.088-0.48613,0-0.0442,0.044-0.61872,0s-0.97227-0.1768-0.97227-0.1768-0.26516-0.4861-0.66291-0.6629-0.61872-0.2651-0.61872-0.2651,0.35356-0.221,0.57453-0.2652c0.22097-0.044,0.0884-0.044,0.44194-0.1326,0.35355-0.088,0.53033-0.1768,0.53033-0.1768s0.13258-0.088,0.13258-0.3093c0-0.221-0.0884-0.5746-0.0884-0.5746s0-0.2651-0.30936-0.5303c-0.30936-0.2651-0.30936-0.2651-0.30936-0.2651l-0.0442-0.2652-0.17678-0.4861,0.0884-0.5746,0.92808-0.5745,0.53033,0.6187s0.70711,0.1768,1.0165,0.1768c0.30936,0,0.48614,0.088,0.92808,0s0.83969-0.1326,0.83969-0.1326z").attr(attr);
            eur.si = R.path("m515.65,364.71,0.95018-1.0828,0.81759-0.044,0.70711-0.6629,0.7071-0.2209,0.99437,0.022s0.39775-0.3536,0.44194-0.5746c0.0442-0.2209-0.41984-0.8397-0.41984-0.8397l-0.7292-0.685s-0.66292-0.6187-0.72921-0.7071c-0.0663-0.088-0.90598-0.5303-0.90598-0.5303l-0.68501-0.685-0.48613-1.2595,0.24306-1.8341-0.39774-1.2595s-0.72921-0.5083-0.70711-0.6851c0.0221-0.1767-0.35355-0.3977-0.0221-0.685,0.33146-0.2872-0.0663-0.2651,0.39775-0.3535,0.46404-0.088,1.149-0.5303,1.149-0.5303l0.48613-0.8839-0.37565-1.3038-0.50823-0.1325-0.95017-0.044-1.0607-0.5525s-0.17678-0.6187-0.17678-0.7292c0-0.1104-0.0884-0.7955-0.0884-0.7955s0.66291-0.9501,0.83969-1.0164c0.17678-0.066,1.0165-0.1989,1.149-0.2431,0.13258-0.044,0.70711-0.3756,0.86179-0.4861,0.15467-0.1105,0.7292-0.3536,0.7292-0.3536l1.149-1.4142s0.24307-0.4861,0.46404-0.4861h1.4584l1.3037,0.2651,0.46404,0.3536s0.88388,0.4419,0.97227,0.464c0.0884,0.022,0.55243,0.2873,0.68501,0.5083,0.13258,0.2209,0.7513,0.7734,0.86179,0.928,0.11048,0.1547,0.7734,0.1326,0.90598,0.1326s0.55243-0.1768,0.90598-0.3093c0.35355-0.1326,0.92808-0.3757,1.149-0.3315,0.22097,0.044,0.50823,0.1547,0.7513,0.3536,0.24307,0.1988,0.50823,0.4198,0.68501,0.4861,0.17678,0.066,1.9224,0.044,1.9224,0.044s0.7071,0.1768,0.92807-0.066c0.22097-0.2431,0.30936-0.4198,0.50824-0.5524,0.19887-0.1326,0.19887-0.1989,0.39774-0.3315,0.19888-0.1326,0.33146-0.1989,0.61872-0.3977,0.28726-0.1989,0.50824-0.221,0.59662-0.4862,0.0884-0.2651,0.0663-0.2651,0.17678-0.4861,0.11049-0.221,0.24307-0.3757,0.35355-0.6187,0.11049-0.2431,0-0.3536,0.15468-0.4641,0.15468-0.1104,0.70711-0.2872,0.70711-0.2872s-0.0442-0.044,0.39775-0.044h0.79549c0.61872,0,0.39775,0.022,0.95018,0,0.55242-0.022,0.7292-0.022,1.0828-0.022,0.35356,0,0.0884-0.2431,0.59663,0.022s0.35355,0.088,0.61871,0.3314c0.26517,0.2431,0.53033,0.4641,0.53033,0.4641s0.59663,0.243,0.8176,0.2209c0.22097-0.022,0.0884-0.066,0.55242-0.088,0.46404-0.022,0.35356-0.044,0.72921-0.044s0.0663,0,0.57452-0.022c0.50823-0.022,0.41985,0.022,0.53033-0.022,0.11049-0.044,0.0663,0.044,0.28726-0.1104,0.22097-0.1547,0.46404-0.3978,0.46404-0.3978s0.30936-0.1989,0.35356-0.4198c0.0442-0.221-0.0884-0.5304,0.19887-0.7071,0.28726-0.1768-0.0221-0.1989,0.57452-0.2873,0.59663-0.088,0.99437-0.1105,0.99437-0.1105s0.35356-0.2651,0.7513,0.044c0.39775,0.3094,0.59663,0.5082,0.59663,0.5082s0.22097,0.3094,0.30935,0.3094c0.0884,0-0.0221,0.044,0.59663,0.066,0.61871,0.022,0.53033,0.044,1.0165,0.044,0.48614,0,0.50823,0.066,0.83969,0s0.48614,0.066,0.48614-0.1768c0-0.243-0.0221-0.2651-0.0442-0.464s-0.0442-0.5524-0.0221-0.685-0.19888-0.5524-0.17678-0.6408c0.0221-0.088,0.92808-1.5689,0.92808-1.5689s1.7678-0.442,1.8562-0.442,0.95018,0.044,0.95018,0.044l0.41984,0.088-0.11048,1.9225,1.591,1.8561,0.11048,3.0494-1.7678,0.1326-0.7292,0.7734-0.24307,1.7899-0.57452,0.3093-1.0386,0.221-1.3479,0.7955-0.83969,1.0165-2.7179,0.1547-0.7513,0.5745-0.50823,0.3093-1.0386,0.8397-0.13259,2.0109,1.1049,1.4584-0.13259,2.1655,0.0663,0.7071-0.90598,0.8176-1.9004-0.066-0.95018,0.1547-1.1048,0.685-1.0828,1.2153,0.95017,1.0386-0.33145,0.9501-0.48614,0.3536-0.26516,2.4749-0.37565,0.8176-0.33146,0.3093-1.0607,0.044-2.1434-1.7235-0.88388-0.1326-0.7734-0.044-1.2153,0.5745-1.3479-0.906-0.53033-0.7734-1.127-0.9502-0.95018,0.022-0.81759,0.663-1.3921,1.0827-1.3258,0.4199-0.86179-0.2652-0.92807-0.8397-1.9446-0.066-1.0386,0.5966-0.59662,0.2431-1.5468,0.1547-1.1048,0.022-1.2816-0.1105-0.41985-0.1105z").attr(attr);
            eur.it = R.path("m497.2,330.57s-0.5625,0.031-0.78125,0.3437c-0.21875,0.3125-0.96875,0.9375-0.96875,0.9375l-2.375-0.375-6.5938,0.1563-1.625,0.062s-1.1875,0.875-1.1875,1-0.15625,1.0937-0.15625,1.0937l-0.75,0.7188-0.65625,0.6875-1.0938,0.094-0.71875-0.625-0.90625-0.3125s-0.4375-0.125-0.59375-0.375c-0.15625-0.2498-0.53125-0.7498-0.53125-0.7498s-0.375-0.375-0.75-0.4062c-0.375-0.031-0.625-0.125-1.125-0.1563-0.5-0.031-0.68749-0.1563-0.90625-0.094-0.21874,0.062-0.84367,0.2318-0.90625,0.375-0.32888,0.7524-0.75902,1.2323-1.1875,1.9063l0.0312,1.9375,0.78125,1.1562-0.0937,0.4375-0.8125,1-1.5312-0.9687-1.5938-1.5625-1.0625-0.094-0.46875,0.4686-0.21875,1.0938,0.0937,1.2187,0.65625,0.875,0.25,0.75-0.59375,0.9688s-0.375,0.4062-0.3125,0.5312,0.46875,0.8125,0.46875,0.8125l-0.0937,1.0625-0.625,0.094-1-0.6562-0.53125-0.8125-0.53125-1.3438-0.46875-1.1875-0.90625,0.3125-0.6875,0.5313-1.7188,0.9062-1.0625-0.1562-0.71875-0.75-0.0937-1.25-0.25-1.5313-0.75-0.9375-1.0938-0.2187s-0.59375,0.5-0.65625,0.625-0.15625,0.8125-0.3125,1.1875-0.125,1.875-0.28125,2-0.8125,0.8125-0.8125,0.8125l-2.75,3.0312-0.90625,0.8125s0.0625,0.75,0.0625,1.125-0.28125,2.5625-0.28125,2.5625l-0.375,0.8125s-1.1875-0.125-1.2812-0.2812c-0.0937-0.1563-0.21875-1.5313-0.4375-1.875-0.21875-0.3438-0.625-0.7188-0.75-1.1875-0.125-0.4688-0.125-1.125-0.25-1.4375s-0.5-1.4063-0.71875-1.4688c-0.21875-0.062-2.7812-2.125-2.7812-2.125l-0.34375-1.3437v-2.3438l0.0312-1.125-0.5625-0.3437s-0.5625-0.062-0.75,0.094c-0.1875,0.1563-0.90625,0.5312-0.90625,0.5312s-0.86154,0.5026-1.25,0.8125c-0.38581,0.3078-0.9375,0.8125-1.0625,1.0313-0.125,0.2187-0.96875,0.75-0.78125,1.25s-0.25,2-0.25,2l-2.3125,2.0625-1.2812,1.7187-0.9375,0.1563-1.0938-0.4688-0.71875-0.5625-0.71875-0.75-1.0625-0.125s-0.71378-0.071-1.0312,0.062c-0.27194,0.1143-0.3956,0.4556-0.65625,0.5938-0.38843,0.2058-0.84369,0.2702-1.2812,0.3125-0.89264,0.086-1.9008,0.025-2.6875-0.125-0.78665-0.1503-2-0.6875-2-0.6875l-1.5938-0.1875-0.6875,1.1562-1.3125,0.7813,0.4375,1.5312,0.5,0.6563,0.875,1.8125,0.1875,2.5625,0.8125,0.6562,0.8125,1.1875,0.28125,0.9063-0.375,0.875s-0.8125,0.5-0.96875,0.5937c-0.15625,0.094-1.4375,0.7188-1.4375,0.7188l-1.1562,1.25-3.3125,0.125-0.6875,0.6562-0.0937,0.25,0.125,1.1563s0.34375,0.375,0.46875,0.5625,0.25,0.5312,0.3125,0.8437l0.28125,1.4063,0.5,0.3125s0.3125,0.125,0.71875,0.375,1.5312,0.625,1.5312,0.625l0.0937,3.0312-1.4688,1.5625-1.3438,1.2188-0.75,1.5937,0.5625,4,1.0312,1.1875,2.0938,1.5,1.375,0.8438,5.625,0.1562,0.4375,1.1875s0.15625,0.4688,0.125,0.5938c-0.0312,0.125-0.71875,1.125-0.71875,1.125l-1.0938,1.125-1.6562,2.125-0.15625,1.5312,1.3125,0.2188,1.8125,0.031,2.125,0.125,1.6875-0.3438,1.875-0.9375s0.8125-0.5937,0.96875-0.8437,2.0625-2.9688,2.0625-2.9688l3-2.9375,0.875-0.875,1.3438-0.5937,1.125-0.7813,2.8125,0.2813,1.4062,0.8125s1.3125-0.094,1.4062,0.1562c0.0937,0.25,1.0938,1.625,1.0938,1.625s1.25,0.1875,1.5,0.25c0.25,0.062,1.7188,0.125,1.7812,0.5313,0.0625,0.4062,1.375,2.4375,1.6562,2.6875,0.28125,0.25,3,2.6562,3,2.6562s1.5625,0.25,1.9062,0.3125c0.34375,0.062,1.6875,0.3438,2.0625,0.6875,0.375,0.3438,1.8438,1.9063,1.8438,1.9063l1.0625,1.4062s0.28125,3.2813,0.28125,3.4375c0,0.1563-0.90625,2-0.90625,2l0.0625,2.3125,0.75,1.4688,0.21875,0.6875,1.125,1.1875,0.59375,1.125,0.0312,5.4062-1.0625,1.6875,1.5,0.5313,1.875,0.5625,0.375,1.375s-0.25,1.0937-0.15625,1.2812c0.0937,0.1875,0.34375,0.5625,0.59375,0.6875s1.1562,0.094,1.5,0.3438c0.34375,0.25,0.71875,0.5312,0.78125,0.6562s1.6562,3.2188,1.6562,3.2188l1.125,2.5937-0.0625,1.125s1.2812,0.094,1.9062,0.25c0.625,0.1563,2.0625,0.6875,2.375,0.9063,0.3125,0.2187,2.4688,3.25,2.4688,3.25l1.0625,2.3437s0.65625,1.4375,1,1.6875,1.9375,1.1563,2.125,1.25c0.1875,0.094,0.96875,0.5,1.4375,0.9375s1.375,1.25,1.375,1.25l0.46875,3.4375,1.2812,0.7813,3.375,3.8437,0.4375,1.2813s1.0625,0.875,1.1875,0.9062c0.125,0.031,1.625,0.5625,1.9688,0.7813,0.34375,0.2187,1.8438,0.7187,1.8438,0.7187l1.625,2.4375,0.375,0.7188,0.9375,0.031s0.46875-0.4375,0.65625-0.4688c0.1875-0.031,1.3438-0.1562,1.3438-0.1562l1.9062,0.094s0.46875,0.4687,0.84375,0.5625c0.375,0.094,2.2812,0.1875,2.5312,0.2187,0.25,0.031,2.0312,0.1875,2.1562,0.3125s0.8125,1.0938,0.96875,1.3438,0.625,1,0.65625,1.1875c0.0312,0.1875,0.46875,1.625,0.46875,1.625l0.75,1.0937,0.5625,1.3438,0.375,1.0937,0.3125,1.5938s0.8125,0.1562,0.96875,0.1562,1.375-0.4062,1.375-0.4062,0.8125,0.062,1.0312,0.1562c0.21875,0.094,0.65625,0.3125,0.84375,0.4375s0.3125,0.1875,0.53125,0.3438c0.21875,0.1562,0.75,0.6875,0.875,0.7812,0.125,0.094,0.34375,0.4688,0.34375,0.4688l-0.21875,0.9375s-0.6875,0.3437-0.8125,0.4687-0.625,0.125-0.65625,0.3125c-0.0312,0.1875-0.40625,0.5938-0.40625,0.5938s-0.15625-0.125-0.125,0.25c0.0312,0.375,0.125,0.7187,0.125,0.7187s0.28125,0.2188,0.59375,0.125c0.3125-0.094,0.3125-0.062,0.5625-0.2812,0.25-0.2188,0.28125-0.2813,0.5625-0.5625,0.28125-0.2813,0.15625-0.3438,0.4375-0.5,0.28125-0.1563,0.4375-0.3438,0.84375-0.3438h0.78125c0.46875,0,0.375-0.1562,1.1875-0.062,0.8125,0.094,0.6875,0,1.3438,0.125,0.65625,0.125,1.7188,0.25,1.7188,0.25l0.3125,1.125,0.375,0.9375s0.4375,0.75,0.59375,0.9688c0.15625,0.2187,0.40625,0.4687,0.5625,0.8437s0.5,0.7813,0.5,1.0313,0.1875,0.2187-0.125,0.625c-0.3125,0.4062-0.84375,0.8437-0.84375,0.8437l-0.53125,0.375c-0.25,0.375-0.78125,0.75-0.8125,0.9063-0.0312,0.1562,0.0937,0.5312,0.0937,0.5312s-0.0312-0.094,0.375,0.3438c0.40625,0.4375,0.25,0.375,0.625,0.5937,0.375,0.2188,0.375,0.2188,0.84375,0.375,0.46875,0.1563,0.625,0.094,1.1562,0.2188,0.53125,0.125,0.9375,0.062,1.1562,0.3125,0.21875,0.25,0.15625,0.125,0.28125,0.4375s0,0.125,0.25,0.5937c0.25,0.4688,0.1875,0.4688,0.40625,0.875,0.21875,0.4063,0.0625,0.25,0.28125,0.5625s0.25,0.3438,0.46875,0.5313,0,0.062,0.5,0.3125c0.5,0.25,0.5625,0.3437,0.96875,0.375,0.40625,0.031,0.34375,0.094,0.78125,0.062,0.4375-0.031,1-0.062,1.0938-0.4063,0.0937-0.3437-0.0312-0.7187,0.3125-0.9062,0.34375-0.1875,0.5-0.5625,0.875-0.5625s0.65625-0.4374,0.84375,0.094c0.1876,0.5314,0.21875,0.8437,0.28125,1.0312s0.59375,1.1563,0.59375,1.1563l0.375,0.3125s0.65625,1.1875,0.71875,1.4375-0.25,1.9375-0.125,2.1562c0.125,0.2188,1.1562,1.5,1.1562,1.5l-0.25,2.2188,0.0625,1.4062s1.125,0.8125,1.2812,0.9375c0.15625,0.125,0.21875,0,0.625,0.8438,0.40625,0.8437,0.625,1.4687,0.625,1.4687l0.53125,1.125v4.9063l0.65625,1.3437,0.625,1.3125,0.5625,0.8125,0.1875,2.875-0.59375,0.5625-1.0312,0.125-0.78125,0.062s-0.6875-0.094-0.84375,0-0.8125,0.1563-0.96875,0.2813-0.46875,0-0.9375,0.3125c-0.46865,0.3128-0.53115,0.4065-0.53115,0.4065s-0.21875,0.094-0.28125,0.375c-0.0625,0.2813-0.15625,0.4688-0.15625,0.6563s-0.125,0.094,0,0.4062c0.125,0.3125,0.125,0.4063,0.3125,0.625,0.1875,0.2188,0.25,0.062,0.40625,0.5,0.15625,0.4375,0.15625,0.625,0.15625,0.625l-0.0312,0.9063s-0.15625,0.1875-0.34375,0.5-0.4375,0.4062-0.46875,0.625c-0.0312,0.2187-0.125,0.4375-0.125,0.4375l-0.625,1.3125-0.46875,0.5312-0.6875,0.125-0.5625,0.094-0.78125,0.094-0.875-0.094-0.6875-0.031-0.4375,0.062-0.6875-0.031-1.4062,0.8125-0.71875,0.25-1.7188-0.125-0.78125,0.1875-0.84375,0.8438-0.75,0.9687-1.0625-0.6562-1.0938-0.25-0.78125-0.2188-1.2812-0.9062-0.5,0.094-1.6562,0.031-0.71875,0.8125-0.625,1.2812-1.0625,0.2188-0.59375,0.5937-1.7812,0.125-3.875-0.1875-1.1562,0.062-0.96875-0.5937-2.7812-0.1563-1.1875,0.625-1.5,0.1875-1.4688-0.4062s-0.84375-0.9375-0.96875-1.1563c-0.125-0.2187-1.0312-1.1562-1.0312-1.1562l-1.3438-0.2187-0.625-0.9375-1.0312-1-1.125-0.1563-1.4375,0.2188-0.71875,0.4375-0.71875,0.75-0.6875,0.625-0.71875,0.9687-1.2812,0.031s-0.9375-0.5625-0.9375-0.6875-0.78125-1.5-0.78125-1.5l-0.625-0.9062-0.8125,0.75-0.96875,0.2812-1.1562,0.7813-0.75,0.3438-0.90625,0.9375-0.34375,1.3125v1.125l-0.65625,0.5937s-0.25,0.3438-0.21875,0.8125c0.0312,0.4688,0.125,0.8438,0.125,0.8438s0.15625,0.5937,0.28125,0.6875c0.125,0.094,0.6875,0.5625,0.6875,0.5625l0.78125,1.7812,0.84375,0.8125,0.65625,0.8125,2.8125,0.062c0.25,0.062,0.875,0,1.1562,0.125,0.28125,0.125,0.96875,0.5,0.96875,0.5s0.3125,0.094,0.78125,0.25c0.46875,0.1563,0.96875,0.375,1.125,0.4688,0.15625,0.094,0.46875,0.2812,0.59375,0.3437,0.125,0.062,4.2812,4.0938,4.2812,4.0938l1.2812,0.8437s1,0.062,1.125,0.125c0.125,0.062,0.75,0.9375,0.96875,1.125s0.84375,0.75,0.9375,0.875c0.0937,0.125,0.21875,0.4063,0.5625,0.5625,0.34375,0.1563,0.96875,0.4063,1.1562,0.5,0.1875,0.094,0.78125,0.4688,0.9375,0.5938s0.46875,0.2812,0.46875,0.2812l0.53125,0.125,4.2812-0.094,0.875,0.8125s0.4375,0.6563,0.8125,0.9375c0.375,0.2813,0.75,0.5938,0.90625,0.8125,0.15625,0.2188,0.3125,0.5625,0.40625,0.75,0.0937,0.1875,0.125,0.7813,0.34375,1.0313s0.34375,0.5937,0.46875,0.8125c0.125,0.2187,0.21875,0.5,0.3125,0.6562,0.0937,0.1563,0.28125,0.4688,0.28125,0.4688s0.15625,0.2187,0.25,0.4062c0.0937,0.1875,0.3125,0.375,0.3125,0.375s0.25,0.031,0.4375,0.1875c0.1875,0.1563,0.71875,0.5313,0.84375,0.5938,0.125,0.062,1,0.4062,1,0.4062l0.9375,0.5625c0.15625,0.094,1.25,0.375,1.4062,0.375,0.15625,0,1-1.125,1-1.125l0.9375,0.5625s0.40625,0.5,0.59375,0.5313c0.1875,0.031,0.65625-0.031,0.9375,0s1.0938,0.2187,1.25,0.1562c0.15625-0.062,0.53125-0.7812,0.5625-0.9687,0.0312-0.1875,0.0937-0.5625,0.0937-0.9063,0-0.3437,0.21875-1.2187,0.21875-1.2187s0.0625-0.2813,0.375-0.6563,0.40625-0.5312,0.53125-0.75c0.125-0.2187,0.4375-0.625,0.4375-0.625l0.40625-0.1562,1.0938-0.375,0.59375-0.625,0.1875-0.875-0.0625-0.7188-1.4688-0.875s-0.46875-0.25-0.46875-0.375-0.21875-0.6562-0.15625-0.7812,0.8125-0.7813,0.8125-0.7813l0.3125-0.5625s-0.375-0.5937-0.71875-0.8437-0.78125-0.5625-0.78125-0.5625l-1.0625-0.2813-0.28125-2.2812,1.3125-1.7813s0.8125-0.75,0.96875-0.9375,0.75-1.7812,0.75-1.9062-0.34375-1.125-0.125-1.3125,0.875-0.9063,0.96875-1.0313c0.0937-0.125,0.90625-1.9375,0.90625-1.9375l1.875-2.25s0.78125-0.4687,0.875-0.6562c0.0937-0.1875,0.28125-1.2188,0.28125-1.2188l0.875-0.875,0.34375,0.094h0.0312l0.25,0.1563,0.4375,0.25,0.0937,0.4062s0.125,0.5625,0.125,0.75v0.4688l0.0937,0.9375,0.0312,0.625,0.46875,0.4687c0.125,0.125,0.3125,0.5938,0.3125,0.5938l0.78125,0.4062,0.625,0.5625s0.65625,0.2813,0.8125,0.2813,0.84375-0.125,1.1562-0.125c0.3125,0,0.96875-0.031,1.125-0.062s0.46875-0.1875,0.46875-0.1875,0.28125-0.031,0.5625-0.3125c0.28125-0.2813,0.375-0.375,0.5-0.4688,0.125-0.094,0.375-0.2187,0.53125-0.4062s0.25-0.3125,0.34375-0.5938c0.0937-0.2812,0.0937-0.625,0.1875-0.7812,0.0937-0.1563,0.1875-0.375,0.28125-0.5,0.0937-0.125,0.1875-0.094,0.3125-0.375,0.125-0.2813,0.1875-0.4063,0.28125-0.6563,0.0937-0.25,0.0625-0.4062,0.1875-0.625,0.125-0.2187,0.125-0.2812,0.28125-0.5,0.15625-0.2187,0.25-0.3437,0.4375-0.5,0.1875-0.1562,0.25-0.25,0.46875-0.4375s0.1875-0.2812,0.46875-0.5c0.28125-0.2187,0.3125-0.3437,0.53125-0.5,0.21875-0.1562,0.3125-0.25,0.53125-0.4062l0.4375-0.3125s0.25-0.125,0.5-0.2188c0.25-0.094,0.53125-0.25,0.53125-0.25l1.6562-0.75,0.78125-0.9687s0.34375-0.875,0.34375-1.0938c0-0.2187-0.125-0.6562-0.125-0.9375v-1.2187l-0.15625-0.5625-0.625-0.625-0.0625-1.4063,0.8125-0.875,1.8438-2s0.90625-0.062,1.1562-0.1875c0.25-0.125,1.5-0.8125,1.5-0.8125h1.2812c0.3125,0,0.90625,0.031,1.3438,0.031,0.4375,0,1,0.094,1.375-0.031s0.59375-0.1562,0.8125-0.3125c0.21875-0.1562,0.46875-0.3125,0.5625-0.5625,0.0937-0.25,0.0625-0.3437,0.0937-0.7187s0.0312-0.4688-0.125-0.75c-0.15625-0.2813-0.5625-0.7813-0.5625-0.7813l-0.25-0.5v-3.75l0.4375-1.2187s0.0625-0.6875,0-0.875-0.53125-0.625-0.53125-0.625l-0.84375-0.4375-1.25-0.5313-2.0625-2.3125-0.78125-0.7187-1.0312-0.125-0.9375-0.1563-1.2188-0.4062-1-0.6875,0.59375-3.6563,0.59375-0.625,1.1562-1.5625,0.0937-0.6562-0.875-1.0625s0.1875-0.1875,0.3125-0.4375,0.4375-0.6563,0.5-0.8125c0.0625-0.1563,0.125-0.3125,0.21875-0.4688,0.0937-0.1562,0.21875-0.375,0.4375-0.6875s0.46875-0.75,0.625-0.9375,0.65625-0.625,0.65625-0.625l1.2812-1.9375,1.4062-2.0312,1.0625-0.9688h1.4062l1.0312,0.25s0.78125,0.6875,0.8125,0.8438c0.0312,0.1562,0.25,0.75,0.25,0.75l0.25,0.4687,0.28125,0.25s0.34375,0.1563,0.5625,0.2188c0.21875,0.062,0.125-0.1563,0.5625,0.1875,0.4375,0.3437,0.78125,0.625,0.78125,0.625s0.125,0.125,0.28125,0.1875c0.15625,0.062,0.875,0.1562,0.875,0.1562l3.8125,0.094s0.28125,0.7188,0.5625,0.75c0.28125,0.031,1.75,0.2188,1.75,0.2188s0.78125,0.5,0.84375,0.6562c0.0625,0.1563,0.1875,0.5,0.25,0.75s0.1251,0.4688,0.0937,0.6563c-0.0312,0.1875-0.25,0.125,0,0.4687,0.25,0.3438,0.59375,0.5938,0.59375,0.5938l0.15625,0.1875,0.5,1.5s0.46875,0.8125,0.46875,1-0.1875,0.7812-0.0625,0.9687,0.25,0.3438,0.3125,0.4688,0.21875,0.4062,0.375,0.5937,0.0937,0,0.46875,0.4063c0.375,0.4062,0.46875,0.4687,0.46875,0.4687s0.0937,0.1563,0.53125,0.25c0.4375,0.094,0.84375,0.125,1,0.1875,0.15625,0.062,0.34375,0.25,0.34375,0.25l0.1875,0.1875c0.46875,0.125,0.53125,0.1563,0.71875,0.1563s0.9375-0.062,0.9375-0.3125v-0.75c0-0.5938-0.0937-0.5313,0.0312-0.8438,0.125-0.3125,0.28125-0.5937,0.375-0.875,0.0937-0.2812,0.0937-0.3125,0.1875-0.625,0.0937-0.3125,0.125-0.3125,0.34375-0.75s0.3125-0.5625,0.40625-0.7812c0.0937-0.2188,0.15625-0.125,0.25-0.5313,0.0937-0.4062,0.1875-0.5312,0.15625-1.0625-0.0312-0.5312-0.1251-0.875-0.0937-1.2812,0.0312-0.4063,0.0625-0.7188,0-0.9375-0.0625-0.2188,0.15625-0.125-0.15625-0.5938-0.3125-0.4687-3.5625-3.4375-3.5625-3.4375l-1.0312-0.8125-1.3125-0.5625-0.5625-1.1562-0.28125-1.4375-1.125-1.2813-1.875-0.7187-1.7812-0.8438-1.5625-0.5-1.3125-0.625-1.5-1.2187-1.875-1.7813-1.8438-1.3125-1.7188-1.5625-1.75-0.4375-1.3125-0.75-1.6875-0.375-2.5312-1.3125-2.0308-0.7803-1.9062-0.8125-2.6875-1.5312-2.0625-1.4375-1.25-0.6563-0.0312-2.9062s0.90625-0.6875,1.0312-0.8438c0.125-0.1562,1.5-1.25,1.5-1.25s0.8125-0.8437,0.96875-0.9375c0.15625-0.094,1-0.9687,1-0.9687s0.28125-0.5938,0.3125-0.8438c0.0312-0.25-0.28125-1-0.28125-1l-1.7812-1.4375-1.75-0.2812-1.2188,0.062-1.2812,0.5312-0.8125,0.8438-0.6875-0.5938-1.0312-0.5625-1.2188,0.125s-0.34375,0.062-0.4375,0.1875c-0.0937,0.125-0.5,0.2813-0.75,0.4063s-0.65625,0.1562-0.65625,0.1562l-0.8438-0.25-0.875-0.5937-2.375-0.1563-2.3125-1.0312-1.75-1.1563-1.4688-1.125-0.78125-1.75-0.9375-1.0312-1.4375-0.9063s-1.5-1.0625-1.5625-1.2812c-0.0625-0.2188-1.0938-1.5625-1.0938-1.5625l-1.125-1.4063-1.5938-2.9687-1.9375-2.4063-0.875-2.9687-1-3.75-0.21875-2.5938-0.84375-2.9062-0.15625-2.5-0.96875-1.0625s-0.34375-1.8125-0.375-1.9375c-0.0312-0.125-1.5312-1.4375-1.5312-1.4375l-2.9062-1.375-2.625-2.6563-2.6562-2.9375-2.0938-1.375-3.75-3.4375-1.3125-1.8125-0.5-1.1562-0.0937-8.5,0.4375-2.6875,1.1875-0.2813,1-0.75,1.0312-0.875s0.40625-1.0625,0.21875-1.2187c-0.1876-0.1563-1.2813-1.1563-1.2813-1.1563l-1-1.2812-0.65625-2.2188-1.1562-1.6562s0.15625-0.6875,0.1875-0.875c0.0312-0.1875,0.0312-0.8438,0.15625-0.9375,0.125-0.094,1.3438-1,1.3438-1l0.46875-0.625s1.0938-0.0001,1.2188-0.031c0.125-0.031,0.875-0.062,1.3125-0.125,0.4375-0.062,1.0625-0.125,1.2812-0.2188,0.21875-0.094,0.71875-0.5312,1-0.625,0.28125-0.094,0.71875-0.2187,0.9375-0.3437s0.78125-0.5,0.78125-0.5,0.9375-0.2188,1.125-0.2813c0.1875-0.062,0.46875-0.031,0.78125-0.1875,0.3125-0.1562,1-0.4062,1.3125-0.5,0.3125-0.094,1.0312-0.1875,1.1562-0.2187,0.125-0.031,0.34375-0.125,0.34375-0.125l0.6875-0.9375s0.3125-0.625,0.4375-0.6875c0.125-0.062,0.78125-0.1563,0.78125-0.1563l0.96875,0.3125s0.4375,0.375,0.59375,0.4375c0.15625,0.062,1.0938,0.5,1.0938,0.5l1.125,0.2813s0.6875-0.5,0.75-0.625,0.34375-0.4688,0.34375-0.4688l0.375-0.4375,0.65625-0.5937-0.28125-0.9063,0.28125-1.8437-0.4375-1.25-0.6875-0.5938-0.1875-0.4687,0.125-0.2813,0.21875-0.2187,1.3438-0.6563,0.5-0.9375-0.375-1.2812-0.6875-0.1875h-0.84375l-1-0.5938-0.28125-1.5312,0.8125-1,1.125-0.2188,1.125-0.5312,0.5625-0.2813,1.125-1.375s0.34225-0.3501,0.3125-0.5625c-0.0449-0.321-0.40244-0.5333-0.6875-0.6875-0.40251-0.2177-1.3438-0.2812-1.3438-0.2812l-1.7812-0.125-1.8438,0.062-2.0312-0.75-1.5625-0.094-1.25-0.2188-1.25,0.031-1.9375-0.9062-1-0.094-1.4062-0.875-0.90625-0.3125s-0.78125-0.875-0.875-1.0938c-0.0937-0.2187-0.8125-1.2812-0.8125-1.2812l-1.3438-0.9688-0.1875-1.2187-0.75-0.8125s0.28125-1.25,0.28125-1.375,0.10399-1.2845-0.28125-1.7188c-0.27346-0.3083-1.1875-0.3437-1.1875-0.3437z").attr(attr);
            eur.it1 = R.path("m464.38,413.51-0.875,0.031s-1.0938-0.1563-1.3125-0.125c-0.21875,0.031-0.375,0.031-0.75,0.031s-0.6875-0.062-0.90625,0-0.84375,0.094-0.84375,0.094-0.28125,0.062-0.28125,0.2187c0,0.1563-0.15625,0.2188-0.15625,0.5625,0,0.3438-0.15625,0.375-0.0312,0.625,0.125,0.25,0.0312,0.3125,0.3125,0.5,0.28125,0.1875,0.21875,0.2813,0.6875,0.3125,0.46875,0.031,0.5625,0.1875,0.71875,0.031,0.15625-0.1562,0.125-0.094,0.34375-0.3437,0.21875-0.25,0.0625-0.3438,0.4375-0.4375,0.375-0.094,0.375-0.1875,0.5625-0.094,0.1875,0.094,0.6875,0.4062,0.8125,0.5312s0.125-0.2187,0.25,0.3438,0.15625,0.6562,0.15625,0.6562,0.15625,0.062,0.46875,0.094c0.3125,0.031,0.3125,0.062,0.4375-0.031,0.125-0.094,0.25-0.031,0.28125-0.3437,0.0312-0.3125-0.0312-0.2813,0.0312-0.5313,0.0625-0.25,0.0625-0.25,0.0625-0.4687v-0.5313c0-0.25,0.0625-0.8125,0.0625-0.8125l-0.0937-0.375z").attr(attr);
            eur.it2 = R.path("m442.63,443.67,0.71875,0.8438,1.3438,0.3437s0.75,0.4063,0.84375,0.625c0.0937,0.2188,0.375,0.8438,0.5,0.9688s0.3125,0.2812,0.4375,0.5312,0.21875,0.5625,0.25,0.7188c0.0312,0.1562-0.0312,0.8437,0.125,1.0312,0.15625,0.1875,0.15625,0.25,0.25,0.375,0.0937,0.125,0.28125,0.375,0.28125,0.375l-0.125,0.4688-0.4375,0.3437s-0.0937,0.062,0.0937,0.3438c0.1875,0.2812,0.25,0.375,0.375,0.5s0.0625,0.094,0.28125,0.2812c0.21875,0.1875,0.40625,0.2813,0.46875,0.4063s0.0312,0.9062,0.0312,0.9062-0.34375,0.5-0.3125,0.625c0.0312,0.125,0.125,0.9688,0.21875,1.125,0.0937,0.1563,0.15625,0.25,0.3125,0.4063,0.15625,0.1562,0.21875,0.375,0.28125,0.5s0.0312,0.3437,0.0625,0.5c0.0312,0.1562,0.15625,2.1562,0.15625,2.1562s0.59375,0.4375,0.59375,0.5625,0.0312,1.0938,0.0312,1.0938,0.0312,0.125,0,0.2812c-0.0312,0.1563,0,0.2813-0.3125,0.7188s-0.0937,0.1562-0.71875,0.7812c-0.625,0.625-0.78125,0.7188-0.78125,0.7188s-0.5,0.4062-0.59375,0.5937c-0.0937,0.1875-1.3125,1.6875-1.3125,1.6875s-0.0937,0.6563-0.0937,0.7813,0.21875,0.9062,0.4375,1.125c0.21875,0.2187,0.65625,0.375,0.65625,0.8437,0,0.4688,0.0312,0.6875,0,1.0938-0.0312,0.4062-0.15625,0.875-0.15625,1.125s0.0937,0.3437-0.15625,0.6875c-0.25,0.3437-0.96875,0.4687-1,0.75-0.0312,0.2812,0.0312,2.4375,0.0312,2.4375s-0.625,0.8125-0.625,1.0312c0,0.2188-0.625,0.3438-0.3125,0.9375,0.3125,0.5938,0.4375,0.9688,0.4375,0.9688l-0.46875,2.4375s-0.8125,0.1875-0.8125,0.375v0.7812c0,0.1563-0.0625,0.4063-0.0625,0.6563s-0.0312,0.375-0.0312,0.6875,0,0.4062-0.0312,0.625c-0.0312,0.2187-0.0625,0.25-0.0625,0.25s-1,1.5312-0.96875,1.6562c0.0312,0.125-0.28125,1.7188-0.28125,1.7188l-0.46875,0.5312s-0.21875,0.3125-0.3125,0.4375c-0.0937,0.125-0.0937,0.25-0.3125,0.25-0.21875,0-1.4375-0.016-1.4375-0.016l-1.1875-1.2656-0.75-0.9063h-1.875l-0.9375-0.5312s-0.78125,0.8125-0.875,1.0312c-0.0937,0.2188-0.59375,1.1563-0.6875,1.6875-0.0937,0.5313-0.28125,1.4688-0.28125,1.4688s-0.0937,0.3437-0.28125,0.4687c-0.1875,0.125-0.875,0.3438-1.0625,0.5313s-0.53125,0.5-0.53125,0.5l-1.7188,0.094-0.90625-0.75-1.5312,0.5625-0.59375-0.5938-0.71875-0.9375-0.25-0.5312-1.3125-0.5313-0.6875-0.031-0.6875-0.375s-0.40625-0.4375-0.40625-0.5937c0-0.1563-0.125-0.2813,0-0.5,0.125-0.2188,0.1875-0.4375,0.40625-0.5938,0.21875-0.1562,0.71875-0.4375,0.71875-0.4375s0.1875-0.094,0.21875-0.4062c0.0312-0.3125,0.0625-0.75,0.0312-0.9688-0.0312-0.2187-0.25-0.75-0.25-0.9062,0-0.1563,0-0.5625,0.125-0.8438,0.125-0.2812,0.1875-0.4687,0.375-0.7187s0.3125-0.6875,0.375-1.0938c0.0625-0.4062-0.0937-0.25,0-0.875s0.3125-1.5937,0.3125-1.5937,0.25,0.062,0.59375-0.5625c0.34375-0.625,0.4375-3.375,0.4375-3.375l0.71875-1.0938,0.9375-0.6562s0.75-0.4375,0.84375-0.6875c0.0937-0.25-0.1875-1.2188-0.1875-1.2188l-1.5,0.031-1.375-0.094-0.15625-1,0.3125-1.75s0.0312-0.375,0.25-0.5312c0.21875-0.1563,0.84375-0.5625,0.84375-0.5625s0.4375-0.1875,0.5625-0.2813c0.125-0.094,0.78125,0.5625,0.75-0.8437-0.0312-1.4063-0.0312-1.5938-0.0312-1.5938s0.125-0.6562,0.21875-0.8125c0.0937-0.1562,0.1875-0.5937,0.15625-0.75-0.0312-0.1562-0.5-0.6562-0.5625-0.8437s-0.28125-0.5-0.28125-0.5l-0.6875-1.4375-0.28125-0.6875,0.0937-0.875,0.1875-1.0625-0.125-0.5313-0.875-0.5312-1.0312-0.4688s-0.125-0.8437-0.0937-1.0312c0.0312-0.1875,0.004-1.9727,0.004-1.9727l0.21484-1.5586,0.53125-0.5s0.0312-0.625,0.0625-0.75c0.0312-0.125,0.25-1,0.25-1l0.1875-0.7187,0.6875-0.1563s0.15625,0.1875,0.1875,0.4688c0.0312,0.2812,0.21875,0.875,0.28125,1.0937,0.0625,0.2188,0.125,0.8125,0.125,0.8125l0.1875,0.375,0.3125,0.094,1,0.5313,0.75,0.625s0.625,0.094,0.84375,0.062c0.21875-0.031,1.125-0.125,1.375-0.2813,0.25-0.1562,0.875-0.4687,0.875-0.4687s0.125-0.1875,0.375-0.3125,0.84375-0.4063,1.125-0.5625c0.28125-0.1563,0.53125-0.2813,0.78125-0.4063s0.8125-0.1562,1.0312-0.3437c0.21875-0.1875,0.53125-0.5,0.65625-0.625s0.28125-0.2188,0.375-0.375c0.0937-0.1563,0.25-0.5,0.46875-0.625s0.34375-0.3125,0.34375-0.3125l1.5-0.7813,0.65625-0.5312,0.875-0.6563,0.6875-0.4687,0.625-0.375,0.71875,0.125,0.21875,0.1875,0.0625,0.031").attr(attr);
            eur.sm = R.path("m496.8,393.73-1.1712,0.5082s-0.50823,0.5524-0.44194,0.7071c0.0663,0.1547,0.33146,0.7955,0.33146,0.7955s0.50823,0.1547,0.66291,0.1547,0.86179,0.022,0.86179,0.022,0.48613-0.088,0.48613-0.1768c0-0.088,0.22097-0.3093,0.24307-0.5524s0.0663-0.5524,0.0663-0.7513,0.0663-0.4419,0.0442-0.5745-0.39775-0.5083-0.39775-0.5083z").attr(attr);
            eur.fr = R.path("m 424.62,388.45 0.17188,-1.5 0.84375,-1.0938 0.82812,-1 1.0625,-1.1094 0.73438,-1.125 -0.0312,-0.4687 -0.54688,-1.3594 -2.9688,-0.094 -2.6406,-0.062 -1.6719,-1.0625 -1.6406,-1.1719 -0.23438,-0.1562 -0.96875,-1.1406 -0.32812,-2.5469 -0.21875,-1.4375 0.76562,-1.5938 1.375,-1.2968 1.4062,-1.4844 -0.0781,-3.0469 -1.4688,-0.6094 -1.2656,-0.6875 -0.375,-1.75 -0.17187,-0.4687 -0.53125,-0.625 -0.125,-1.125 0.0781,-0.2813 0.65625,-0.6093 3.3281,-0.1719 1.2188,-1.25 1.3906,-0.6875 0.96875,-0.6094 0.39063,-0.9062 -0.28125,-0.9063 -0.75,-1.125 -0.89063,-0.7031 -0.1875,-2.5781 -0.84375,-1.7657 -0.53125,-0.6718 -0.40625,-1.5313 1.2656,-0.7812 0.71875,-1.1563 1.4688,-0.4375 0.40625,-0.7812 -1.0156,-1.4219 -0.98437,-1.0781 -0.75,-2.0938 0.67187,-1.2969 0,-2.625 -0.46875,-1.2812 -1.3281,-0.9688 -1.8594,0.125 -1.9844,0.1407 -0.96875,1.3125 -0.64063,0.9062 -0.79687,1.7344 -1.8906,1.2969 -1.375,0.5937 -0.25,0.031 -0.17187,-0.062 -0.51563,-0.5469 0.28125,-1.5156 1.3594,-0.9219 1.6094,-2.125 0.0781,-4 1.0469,-1.1093 2.7656,-0.9375 1.8906,-1.2188 0.32813,-2.5469 0.21875,-0.9375 1.7969,-0.2812 2.0156,-1.2344 1.6406,-1.75 1.8594,-1.8906 1.0156,-0.094 0.15625,-0.1094 0.0781,-0.2344 0.0781,-0.4843 -0.46875,-1 -0.54687,-0.9219 0.60937,-0.7969 0.57813,-0.7031 0.375,-0.375 0.34375,-0.25 0.25,0.016 0.625,0.1094 0.4375,0.078 0.1875,0.1093 0.20312,0.2344 0.40625,0.4219 0.32813,0.2812 0.59375,0.5 0.375,0.2032 0.54687,0.2031 0.35938,0.1719 0.25,0.1562 0.625,-0.5 0.71875,-0.6719 0.73437,-0.5937 1.9844,-0.3438 -0.29688,-0.3437 -1.1094,-1.0938 -0.0781,-0.8437 0.0625,-0.9375 0.20313,-0.6406 0.9375,-1.4844 0.875,-1.9688 -0.125,-3.2031 0.42187,-0.9531 1.375,-1.8125 1.2656,-1.625 1,-1.1406 -0.0312,-2.9844 0.92187,-1.8281 1.3906,-1.2969 0.5,-0.4531 1.0625,-0.8594 1.5,-1.1094 0.70312,-0.4531 0.42188,-0.375 0.64062,-0.3438 -0.0625,-1.25 -0.10937,-0.7343 -0.14063,-0.1719 -0.65625,-0.375 -0.92187,-0.2031 -0.35938,-0.062 -0.32812,-0.047 -0.82813,-0.25 -0.40625,-0.2657 -0.34375,-0.2031 -0.14062,-0.094 -0.34375,-0.031 -0.79688,-0.016 -1.0312,-0.078 -0.5,-0.078 -0.25,-0.1719 -0.53125,-0.7968 -0.35937,-0.5625 -0.14063,-0.3282 -0.0469,-0.4062 -0.1875,-0.2031 -0.21875,-0.1875 -0.98438,-0.1407 -1.0938,0.062 -0.9375,0.031 -1.1562,0.031 -0.67187,-0.094 -0.73438,-0.094 -0.28125,-0.062 -0.25,-0.2812 -0.17187,-0.2656 -0.23438,-0.5782 -0.0625,-0.1562 -0.20314,-0.1408 -0.34375,-0.2656 -0.875,0.1406 -0.59375,0.094 -1.0625,-0.2969 -0.51563,-0.75 -0.32812,-1.5781 -0.28125,-0.6562 -0.73438,-1 -0.4375,-2.0782 -0.9375,0.016 -0.51562,-1.0937 -1.625,-0.1719 -1.3125,0.3125 -1.4219,-0.25 -1.1719,0 -0.64063,-0.3906 -0.71875,-0.7969 0.0625,-0.9375 -0.98437,0.2344 -0.65625,0.094 -0.75,-0.016 -0.92188,0.094 -0.6875,-0.047 -0.64062,-0.078 -0.53125,-0.1719 -0.15625,-0.1406 -0.0469,-0.2188 0.1875,-0.5937 0.0937,-0.3438 0.0469,-0.7343 -0.0781,-0.6719 -0.95312,-0.375 -0.29688,-0.8281 -1.7812,-1.2657 -0.98437,-1.125 -1.2812,-0.5625 -1.125,-0.5781 -0.60938,-0.5625 -0.0781,-0.1094 0.0156,-0.2812 0.26563,-0.3281 0.64062,-0.6563 0.15625,-2.4687 0.14063,-1.375 0.17187,-0.1563 0.65625,-0.375 0.15625,-0.1094 0.0312,-0.1406 -0.15625,-0.2656 -0.32812,-0.625 -0.125,-0.094 -0.21875,-0.047 -0.5625,0.1562 -1.0625,1.0782 -0.71875,0.9687 -0.84375,0.8438 -1.9375,0.016 -1.6719,0.078 -1.1719,0.2187 -0.53125,-0.031 -0.48438,-0.094 -0.1875,-0.1094 -0.1875,-0.3125 0.0156,-0.6406 0.32812,-0.8906 0.42188,-0.4531 0.125,-0.7813 -0.8125,-0.9375 0.10937,-0.4531 0.92188,-0.7344 0.23437,-0.25 0.46875,-0.5937 -0.10937,-0.6875 -1.0781,-1.0157 -0.15625,-0.1718 -0.84375,-0.3438 -0.75,-0.4687 -2.9688,-0.125 -0.51562,-0.1407 -0.375,-0.4531 0.0937,-0.9219 -0.0937,-1.1718 -0.10938,-0.6563 -0.375,-0.5156 -0.5625,-0.2813 -0.75,-0.016 -1.3438,-0.2968 -0.79687,-0.9219 -0.0937,-4.8438 -0.26563,-0.625 -0.75,-0.3906 -0.96875,0.1406 -0.92187,0.7344 -0.70313,0.2656 -1.0156,-0.062 -0.90625,-0.1875 -0.59375,-0.9843 -0.73438,-0.9688 -0.10937,-1.0469 0.0156,-2 0,-1.4062 0.23438,-1.5469 -1.9531,-0.031 -5.7031,0.031 -2.2969,-0.078 -1.0938,0.094 -1.0781,1.0781 -1.0469,0.9063 c 0,0 -0.39062,1 -0.45312,1.0469 -0.0625,0.047 -0.64063,0.9062 -0.64063,0.9062 l -0.21875,2.4531 -0.46875,1.1563 -0.29687,1.5469 -0.10938,1.125 -0.40625,0.7343 -0.60937,1.0469 0.0625,1.9688 -0.82813,0.4218 -1.2188,0.6875 -1.0312,0.6875 -1.6562,1.1094 -0.98437,0.25 -1.2031,0.7656 -2.25,0.2344 -2.4531,-0.125 -1.5,0.6406 c 0,0 -1.0781,0.5157 -1.4531,0.5157 -0.375,0 -2.1875,-0.1875 -2.4844,-0.1875 -0.29688,0 -2.0469,0.625 -2.0469,0.625 l -1.6406,0.6406 -0.32813,0.5625 c 0,0 -0.4375,0.25 -0.48437,0.3125 -0.0469,0.062 -0.23438,0.3594 -0.26563,0.5781 -0.0312,0.2188 -0.17187,0.5625 -0.1875,0.7656 -0.0156,0.2032 -0.125,0.9532 -0.125,0.9532 l 0.42188,0.75 0.45312,0.5312 c 0,0 0.23438,0.1094 0.20313,0.2031 -0.0312,0.094 -0.0781,0.3282 -0.14063,0.3907 -0.0625,0.062 -0.46875,0.5 -0.46875,0.5 0,0 0.0312,0.094 -0.42187,0.1718 -0.45313,0.078 -0.76563,0.078 -0.96875,0.094 -0.20313,0.016 -0.51563,-0.047 -0.96875,0.094 -0.45313,0.1407 -0.35938,-0.062 -0.625,0.2188 -0.26563,0.2812 -0.0469,0.2031 -0.45313,0.3906 -0.40625,0.1875 -0.29687,0.1875 -0.5625,0.2188 -0.26562,0.031 -0.5625,-0.016 -0.75,-0.016 -0.1875,0 -1.5625,-0.1407 -1.5625,-0.1407 l -0.59375,-0.5468 -1.0312,-0.3907 -0.95312,-0.6093 -1.0469,-0.4063 -0.70312,-0.3437 c 0,0 -0.54688,-0.4844 -0.64063,-0.5782 -0.0937,-0.094 -0.82805,-0.5467 -0.82805,-0.5467 l -0.71875,-0.2812 -0.57813,-0.1563 -0.85937,-0.5625 c 0,0 -1.3906,-0.4062 -1.5156,-0.375 -0.125,0.031 -0.65625,0.1094 -0.73437,0.125 -0.0781,0.016 -0.42188,0.2031 -0.59375,0.062 -0.17188,-0.1406 -0.1875,-0.1562 -0.4375,-0.4219 -0.25,-0.2656 -0.65625,-0.6562 -0.65625,-0.6562 l -0.0312,-2.1094 0.14062,-1.9687 c 0,0 0.5,-0.3125 0.625,-0.4688 0.125,-0.1562 0.39063,-1.2031 0.39063,-1.2031 0,0 0.26562,-0.1406 -0.34375,-0.2344 -0.60938,-0.094 -0.39063,-0.1094 -0.6875,-0.1094 l -0.59375,0 -2.1094,-0.031 c 0,0 -0.625,-0.094 -0.75,-0.1718 -0.125,-0.078 -0.92187,-0.5157 -0.92187,-0.5157 l -0.42188,-0.4062 c 0,0 -0.54687,-0.1719 -0.60937,-0.2031 -0.0625,-0.031 -0.78125,-0.5313 -0.78125,-0.5313 0,0 -0.29688,-0.2031 -0.4375,-0.2969 -0.14063,-0.094 -0.51563,-0.2968 -0.51563,-0.2968 0,0 -0.14062,0.016 -0.14062,0.1406 0,0.125 -0.0312,0.1562 0,0.3906 0.0312,0.2344 0.0312,0.2969 0.0312,0.4531 0,0.1563 0.0156,0.2188 -0.0156,0.4688 -0.0312,0.25 -0.0781,0.4375 -0.0625,0.5937 0.0156,0.1563 0,0.2344 -0.0469,0.4375 -0.0469,0.2032 0.0156,0.2657 -0.17188,0.4844 -0.1875,0.2188 -0.3125,0.3125 -0.3125,0.3125 l -0.39062,0.8437 c 0,0 -0.14063,0.625 -0.14063,0.7344 0,0.1094 -0.0156,1.0781 0.0625,1.2344 0.0781,0.1562 0.46875,0.4218 0.5625,0.5156 0.0937,0.094 0.60938,0.9062 0.64063,0.9844 0.0312,0.078 0.8125,1.4062 0.8125,1.4062 l 0.28125,2.2969 -0.0156,1.25 -0.96875,0.9531 c 0,0 -0.26562,0.3438 -0.20312,0.5156 0.0625,0.1719 0.0625,0.5938 0.20312,0.6875 0.14063,0.094 0.64063,0.5782 0.64063,0.5782 l -0.5625,0.9843 -0.25,0.8594 -0.98438,1.2656 -0.0781,1.2657 0.40625,1.5312 c 0,0 0.60937,0.5625 0.60937,0.6563 0,0.094 -0.0469,0.2968 -0.10937,0.375 -0.0625,0.078 -0.25,0.1406 -0.57813,0.2343 -0.32812,0.094 -0.89062,0.078 -1.0156,0.094 -0.125,0.016 -0.46875,-0.062 -0.70313,-0.062 -0.23437,0 -0.51562,-0.078 -0.9375,-0.062 -0.42187,0.016 -0.73437,0 -0.79687,-0.016 -0.0625,-0.016 -0.32813,0 -0.45313,-0.1562 -0.125,-0.1563 -0.20312,-0.031 -0.17187,-0.2813 0.0312,-0.25 0.0156,-0.2031 0.0937,-0.375 0.0781,-0.1718 -0.0625,-1.5625 -0.0625,-1.5625 l -0.54688,-0.6718 c 0,0 -0.54687,-0.2032 -0.71875,0.016 -0.17187,0.2187 -0.375,0.4062 -0.54687,0.5625 -0.17188,0.1562 -0.0781,0.2656 -0.57813,0.3125 -0.5,0.047 -0.60937,-0.016 -1.0781,0 -0.46875,0.016 -1.125,-0.094 -1.125,-0.094 0,0 -0.42188,-0.25 -0.5625,-0.4532 -0.14063,-0.2031 -0.0937,-0.078 -0.32813,-0.5312 -0.23437,-0.4531 -0.0156,-0.7656 -0.4375,-0.7031 -0.42187,0.062 -0.67187,0.2968 -0.67187,0.2968 0,0 -0.29688,0.4219 -0.40625,0.4219 -0.10938,0 -0.10938,0.3281 -0.59375,-0.1406 -0.48438,-0.4688 -0.46875,-0.6094 -0.64063,-0.4063 -0.17187,0.2032 0.48438,0.062 -0.40625,0.4219 -0.89062,0.3594 -1.125,0.2813 -1.2188,0.5156 -0.0937,0.2344 -0.0625,0.3282 -0.3125,0.5157 -0.25,0.1875 0.375,-0.047 -0.51562,0.2812 -0.89063,0.3281 -0.95313,0.375 -0.95313,0.375 0,0 -0.46875,-0.078 -0.46875,-0.1562 0,-0.078 -0.0781,-0.1719 -0.0781,-0.375 0,-0.2032 -0.10938,-0.6563 -0.125,-0.8907 -0.0156,-0.2343 -0.54688,-1.2343 -0.54688,-1.2968 0,-0.062 -0.4375,-2.5313 -0.4375,-2.5313 l -1.125,-1.2656 c 0,0 -0.42187,-0.5625 -0.39062,-0.75 0.0312,-0.1875 -0.48438,-0.7656 -0.48438,-0.7656 l -0.45312,-0.3125 -0.59375,-0.094 c 0,0 -0.32813,-0.031 -0.40625,-0.125 -0.0781,-0.094 -0.40625,-0.3594 -0.40625,-0.3594 0,0 -0.125,0.2031 -0.29688,0.2812 -0.17187,0.078 -0.10937,0.125 -0.57812,0.1563 -0.46875,0.031 -0.875,-0.016 -1,-0.062 -0.125,-0.047 -0.64063,-0.2813 -0.73438,-0.3281 -0.0937,-0.047 -0.28125,-0.2032 -0.5,-0.2032 -0.21875,0 -0.3125,-0.062 -0.53125,0.094 -0.21875,0.1563 -0.32812,0.2188 -0.5625,0.3594 -0.23437,0.1406 -0.375,0.078 -0.51562,0.3125 -0.14063,0.2344 0,0.25 -0.375,0.5 -0.375,0.25 -0.76563,0.4063 -0.89063,0.4063 -0.125,0 -0.59375,-0.062 -0.79687,-0.2344 -0.20313,-0.1719 -0.26563,-0.5156 -0.67188,-0.5781 -0.40625,-0.062 -1.2031,-0.3438 -1.3281,-0.094 -0.125,0.25 -0.3125,0.4531 -0.3125,0.4531 l -0.78127,-0.4063 c 0,0 -0.46875,-0.375 -0.64063,-0.5 -0.17187,-0.125 -0.125,-0.2656 -0.54687,-0.3594 -0.42188,-0.094 -0.6875,-0.2187 -1.0938,-0.2187 -0.40625,0 -0.6875,-0.1875 -0.90625,-0.047 -0.21875,0.1406 -0.3125,0.2812 -0.4375,0.375 -0.125,0.094 0.32812,0.4062 -0.32813,0.1562 -0.65625,-0.25 -0.375,-0.2031 -0.90625,-0.3437 -0.53125,-0.1407 -0.0937,-0.2344 -0.8125,-0.25 -0.71875,-0.016 -1.3281,-0.016 -1.7188,0 -0.39062,0.016 0.0625,-0.062 -0.5625,0.016 -0.625,0.078 -1.375,0.1875 -1.4844,0.2187 -0.10938,0.031 -0.5,0.3125 -0.625,0.3906 -0.125,0.078 -0.67188,0.4063 -0.67188,0.4063 l -1.4688,1.1719 -0.10937,0.7812 -0.78125,1.0469 c 0,0 -0.14063,0.9844 -0.0781,1.0625 0.0625,0.078 0.35938,0.3437 0.46875,0.3594 0.10938,0.016 1.2031,0.2031 1.2031,0.2031 l 0.12497,0.1072 c 0,0 0.0312,-0.047 0.0312,0.2188 0,0.2656 0.0312,0.3593 0.0312,0.5312 l 0,0.5781 c 0,0.2344 0.0312,0.375 0.0469,0.6407 0.0156,0.2656 0,0.5937 0.0156,0.7343 0.0156,0.1407 0.0937,0.078 0.0156,0.3282 -0.0781,0.25 -0.14062,0.4843 -0.17187,0.6093 -0.0312,0.125 0.0312,0.3125 -0.21875,0.4532 -0.25,0.1406 -0.625,0.25 -0.625,0.25 0,0 -0.70313,-0.062 -0.79688,-0.062 -0.0937,0 -0.76562,-0.2969 -0.92187,-0.1875 -0.15625,0.1093 -0.25,0.062 -0.28125,0.25 -0.0312,0.1875 -0.14063,0.25 -0.0937,0.4531 0.0469,0.2031 0.0469,0.3281 0.0937,0.4062 0.0469,0.078 0.0781,0.1563 0.15625,0.1719 0.0781,0.016 1.5156,0.5938 1.5156,0.5938 0,0 0.25,0.2187 0.40625,0.3593 0.15625,0.1407 0.67188,0.5625 0.79688,0.7032 0.125,0.1406 -0.0937,0.078 0.375,0.3437 0.46875,0.2656 1.25,0.7656 1.25,0.7656 l -0.10938,0.8907 c 0,0 -0.4375,0.062 -0.46875,0.2343 -0.0312,0.1719 -0.0312,0.1719 -0.0312,0.2813 0,0.1094 0.0156,0.75 0,0.8906 -0.0156,0.1406 -0.0469,0.2031 -0.0469,0.3594 0,0.1562 0.0312,0.2031 0,0.375 -0.0312,0.1719 -0.0625,0.3125 -0.0625,0.3125 l 0.0937,0.094 c 0.3125,0.094 0.65625,0.2031 0.65625,0.2031 0,0 0.34375,0.016 0.57812,-0.047 0.23438,-0.062 0.3125,-0.062 0.40625,-0.1094 0.0937,-0.047 0.125,-0.016 0.20313,-0.094 0.0781,-0.078 0.0469,0.1094 0.21875,-0.1875 0.17187,-0.2968 0.25,-0.4687 0.25,-0.4687 0,0 -0.0937,-0.031 0.20312,-0.1406 0.29688,-0.1094 0.375,-0.2344 0.53125,-0.2188 0.15625,0.016 0.4375,0.047 0.5,0.1563 0.0625,0.1093 -0.0469,-0.2344 0.23438,0.3437 0.28125,0.5781 0.0937,0.6406 0.4375,0.6719 0.34375,0.031 0.3125,0.047 0.59375,0.062 0.28125,0.016 0.5,0.031 0.60937,0.047 0.10938,0.016 0.45313,-0.094 0.57813,0.1562 0.125,0.25 0.1875,0.2969 0.1875,0.4531 0,0.1563 -0.0469,0.4688 0,0.5625 0.0469,0.094 0.0156,0.125 0.10937,0.2344 0.0937,0.1094 0.34375,0.3281 0.53125,0.3438 0.1875,0.016 0.1875,0.031 0.51563,0.062 0.32812,0.031 0.84375,0.1406 0.84375,0.1406 0,0 -0.0469,-0.094 0.10937,0.047 0.15625,0.1406 0.14063,-0.062 0.34375,0.2969 0.20313,0.3593 0.25,0.4062 0.32813,0.5468 0.0781,0.1407 0.21875,0.3282 0.25,0.3907 0.0312,0.062 -0.0156,0.047 0.21875,0.3125 0.23437,0.2656 0.42187,0.4375 0.5,0.5312 0.0781,0.094 0,0.1094 0.23437,0.2656 0.23438,0.1563 0.65625,0.4375 0.90625,0.5 0.25,0.062 0.3125,0.094 0.48438,0.1094 0.17187,0.016 0.21875,0 0.34375,0.016 0.125,0.016 0.42187,-0.016 0.51562,0.031 0.0937,0.047 0.28125,0.1094 0.39063,0.1719 0.10937,0.062 0.17187,0.125 0.17187,0.125 l 0.14063,0.8125 c 0,0 0.0937,0.3125 0.15625,0.3594 0.0625,0.047 0.60937,0.2812 0.60937,0.2812 l 0.0937,0.125 c 0,0 0.0312,0.2031 0.0625,0.2969 0.0312,0.094 0.0469,0.1094 0.0625,0.2656 0.0156,0.1563 0.0625,0.3281 0.0781,0.4531 0.0156,0.125 0.0469,0.2344 0.0781,0.3282 0.0312,0.094 0.17188,0.2031 0.17188,0.2031 l 0.35937,0.1875 0.51563,0.125 c 0,0 0.1875,0.016 0.48437,0.031 0.29688,0.016 0.65625,0.031 0.65625,0.031 l 0.5625,0.047 0.4375,0.078 c 0,0 0.21875,0.031 0.35938,0.062 0.14062,0.031 0.625,0.1562 0.75,0.1875 0.125,0.031 0.64062,0.094 0.73437,0.2031 0.0937,0.1094 0.40625,0.3281 0.45313,0.4063 0.0469,0.078 0.15625,0.1718 0.23437,0.3281 0.0781,0.1562 0.1875,0.3125 0.23438,0.375 0.0469,0.062 1.1875,1.25 1.1875,1.25 0,0 0.26562,0.094 0.34375,0.1719 0.0781,0.078 -0.0469,-0.5469 0.23437,0.2968 0.28125,0.8438 0.28125,1.0469 0.28125,1.0469 0,0 0,0.2188 -0.0156,0.3438 -0.0156,0.125 0.0312,0.1093 -0.14063,0.375 -0.17187,0.2656 -0.85937,0.8281 -0.85937,0.8281 0,0 -0.21875,0.125 -0.29688,0.25 -0.0781,0.125 -0.17187,0.125 -0.23437,0.3906 -0.0625,0.2656 -0.15625,0.5156 -0.15625,0.5938 0,0.078 0.0312,0.2812 0.10937,0.3593 0.0781,0.078 0.4375,0.3125 0.51563,0.3282 0.0781,0.016 1.1875,0.5937 1.1875,0.5937 l 0.79687,0.8125 0.17188,0.2031 0.54687,0.3594 c 0,0 0.0781,-0.078 0.1875,0.25 0.10938,0.3281 0.25,0.7344 0.25,0.9063 0,0.1718 0.0156,0.1718 0.0156,0.375 0,0.2031 -0.0156,0.4062 -0.0156,0.5937 0,0.1875 -0.0781,0.1875 0,0.3125 0.0781,0.125 0.0781,0.2188 0.1875,0.2969 0.10938,0.078 0.40625,0.1875 0.5625,0.25 0.15625,0.062 0.10938,-0.078 0.40625,0.1562 0.29688,0.2344 0.51563,0.4219 0.51563,0.4219 0,0 -0.0156,0.125 0.0312,0.3594 0.0469,0.2344 0.0312,0.2344 0.0625,0.4062 0.0312,0.1719 -0.0156,1.125 -0.10938,1.3282 -0.0937,0.2031 -0.34375,0.3281 -0.39062,0.3906 -0.0469,0.062 -0.21875,0 -0.42188,0.2187 -0.20312,0.2188 -0.35937,0.3594 -0.35937,0.3594 0,0 -0.4375,0.062 -0.53125,0.1563 -0.0937,0.094 0.15625,-0.3438 -0.29688,0.25 -0.45312,0.5937 -0.5625,0.6875 -0.5625,0.6875 0,0 -0.1875,0.031 -0.21875,0.3281 -0.0312,0.2969 0.71875,1.4531 0.71875,1.4531 0,0 0.14063,0.25 0.34375,0.4219 0.20313,0.1719 0.46875,0.3281 0.625,0.4687 0.15625,0.1407 1.1562,2.0157 1.1562,2.0157 l 0.3125,2.8437 c 0,0 -0.17187,0.25 -0.10937,0.3438 0.0625,0.094 0.21875,0.25 0.29687,0.3437 0.0781,0.094 0.25,0.4375 0.46875,0.5781 0.21875,0.1407 0.51563,0.2813 0.51563,0.2813 l 2.5781,2.3906 c 0,0 0.3125,0.7813 0.375,0.9531 0.0625,0.1719 0.0937,0.6094 0.0937,0.6094 0,0 1.2188,0.5 1.2812,0.5156 0.0625,0.016 0.0469,-0.031 0.17188,0.094 0.125,0.125 0.53125,0.3125 0.53125,0.3125 0,0 0.17187,0.047 0.23437,0.1563 0.0625,0.1094 0.0625,0.016 0.15625,0.3594 0.0937,0.3437 0.1875,0.4062 0.20313,0.6718 0.0156,0.2657 -0.0156,0.7188 -0.0625,0.7969 -0.0469,0.078 -0.0312,0.094 -0.20313,0.25 -0.17187,0.1563 -0.17187,0.094 -0.3125,0.3281 -0.14062,0.2344 -0.25,0.1563 -0.3125,0.6094 -0.0625,0.4531 -0.125,0.75 -0.125,0.75 0,0 0.125,0.3125 0.20313,0.3594 0.0781,0.047 0.73437,0.375 0.79687,0.625 0.0625,0.25 0.15625,0.6094 0.17188,0.7812 0.0156,0.1719 0.0156,0.4844 0.0156,0.625 0,0.1407 0.0156,0.1094 -0.0312,0.3282 -0.0469,0.2187 -0.0469,0.3906 -0.14062,0.5468 -0.0937,0.1563 -0.0937,0.3125 -0.23438,0.4219 -0.14062,0.1094 -0.40625,0.25 -0.48437,0.2813 -0.0781,0.031 -0.17188,0.2343 -0.34375,0.094 -0.17188,-0.1407 -0.51563,-0.375 -0.51563,-0.375 0,0 -0.21875,-0.094 -0.32812,-0.3907 -0.10938,-0.2968 -0.0781,-0.2187 -0.23438,-0.5156 -0.15625,-0.2969 -0.26562,-0.4219 -0.3125,-0.5469 -0.0469,-0.125 -0.0937,-0.3437 -0.20312,-0.4843 -0.10938,-0.1407 -0.46875,-0.3594 -0.46875,-0.3594 l -0.53125,-0.25 -0.45313,-0.062 c 0,0 -0.17187,-0.062 -0.32812,0.016 -0.15625,0.078 -0.125,0.031 -0.35938,0.2187 -0.23437,0.1875 -0.39062,0.2032 -0.45312,0.4063 -0.0625,0.2031 -0.14063,0.3594 -0.10938,0.4375 0.0312,0.078 -0.0312,-0.016 0.15625,0.2656 0.1875,0.2813 0.29688,0.4688 0.46875,0.625 0.17188,0.1563 0.0469,0.031 0.57813,0.375 0.53125,0.3438 0.53125,0.2969 0.65625,0.4688 0.125,0.1718 0.25,0.6093 0.26562,0.6875 0.0156,0.078 -0.0312,0.2812 -0.0312,0.4062 0,0.125 0.29688,0.75 0.0937,1.0156 -0.20312,0.2657 -0.45312,0.5625 -0.45312,0.5625 0,0 -0.0781,-0.094 -0.14063,0.125 -0.0625,0.2188 -0.0469,-0.062 -0.15625,0.4063 -0.10937,0.4687 -0.0781,0.5625 -0.0781,0.5625 0,0 0.89062,0.6562 0.9375,0.7187 0.0469,0.062 0.29687,0.4063 0.59375,0.6407 0.29687,0.2343 0.75,0.5468 0.75,0.5468 l 0.0312,0.1875 c 0.14062,0.1875 0.28125,0.2969 0.45312,0.6563 0.17188,0.3594 0.35938,0.4844 0.3125,0.8125 -0.0469,0.3281 0.15625,0.3594 -0.1875,0.6406 -0.34375,0.2813 -0.39062,0.3125 -0.5625,0.375 -0.17187,0.062 -0.10937,0.031 -0.67187,0.1406 -0.5625,0.1094 -0.25,-0.125 -0.89063,0.1563 -0.64062,0.2812 -0.85937,0.2656 -0.85937,0.375 0,0.1094 0.0156,0.3437 0.0156,0.3437 0,0 0.14063,1.625 0.0312,1.7344 -0.10937,0.1094 -0.17187,0.1406 -0.4375,0.3906 -0.26562,0.25 -0.32812,0.2032 -0.35937,0.3438 -0.0312,0.1406 -0.20313,1.3125 -0.20313,1.3125 l -0.4375,1.3437 c 0,0 -0.4375,0.125 -0.48437,0.2813 -0.0469,0.1562 -0.0937,0.2969 -0.125,0.5937 -0.0312,0.2969 -0.0469,0.3438 -0.0937,0.5157 -0.0469,0.1718 -0.0156,0.2656 -0.20313,0.3906 -0.1875,0.125 -0.375,0.2031 -0.375,0.2031 l -0.46875,1.1719 c 0,0 0.10938,0.4531 -0.0469,0.6719 -0.15625,0.2187 -0.34375,0.2812 -0.51563,0.5781 -0.17187,0.2969 -0.25,0.5 -0.25,0.6562 0,0.1563 -0.59375,0.9844 -0.59375,0.9844 0,0 -0.34375,0.4375 -0.34375,0.5938 0,0.1562 -0.0156,0.016 -0.0312,0.3906 -0.0156,0.375 -0.0937,0.5312 -0.0937,0.5312 0,0 -0.0781,0.016 -0.0469,0.3125 0.0312,0.2969 0.0156,0.4063 0.0156,0.4844 0,0.078 -0.15625,0.9844 -0.21875,1.1094 -0.0625,0.125 -0.26562,0.125 -0.34375,0.6406 -0.0781,0.5156 -0.21875,0.7344 -0.29687,1.0781 -0.0781,0.3438 -0.15625,0.5469 -0.20313,0.7657 -0.0469,0.2187 -0.0781,0.2187 -0.10937,0.3281 -0.0312,0.1094 -0.45313,0.7187 -0.51563,0.8594 -0.0625,0.1406 -0.40625,0.4687 -0.35937,0.8125 0.0469,0.3437 0.15625,0.3281 0.10937,0.6718 -0.0469,0.3438 -0.14062,0.4219 -0.21875,0.8282 -0.0781,0.4062 -0.0781,0.5468 -0.28125,0.7343 -0.20312,0.1875 -0.34375,0.25 -0.375,0.3282 -0.0312,0.078 -0.125,1.5156 -0.15625,1.6093 -0.0312,0.094 -0.1875,0.4063 -0.34375,0.6407 -0.15625,0.2343 -0.1875,-0.047 -0.3125,0.4375 -0.125,0.4843 -0.1875,0.5937 -0.23437,0.8125 -0.0469,0.2187 0.10937,0.25 -0.20313,0.5156 -0.3125,0.2656 -0.64062,0.1094 -0.73437,0.4687 -0.0937,0.3594 -0.15625,0.3594 -0.20313,0.6407 -0.0469,0.2812 -0.0781,0.375 -0.0937,0.5312 -0.0156,0.1563 -0.1875,0.9375 -0.35937,1.2031 -0.17188,0.2657 -0.15625,0.1407 -0.48438,0.6719 -0.32812,0.5313 -0.42187,0.6563 -0.5625,0.9375 -0.14062,0.2813 -0.53125,0.9063 -0.53125,0.9063 l -0.0937,0.6406 c 0,0 -0.26562,0.2969 -0.45312,0.7031 -0.1875,0.4063 -0.26563,0.5625 -0.5,0.9063 -0.23438,0.3437 -0.23438,0.4062 -0.45313,0.5937 -0.21875,0.1875 -0.42187,0.3125 -0.42187,0.3125 0,0 -0.4375,1.3594 -0.48438,1.4531 -0.0469,0.094 -0.4375,0.4844 -0.51562,0.6719 -0.0781,0.1875 -0.53125,0.7813 -0.60938,0.8438 -0.0781,0.062 -0.1875,0.1562 -0.45312,0.3437 -0.26563,0.1875 -0.67188,0.3906 -0.79688,0.4688 -0.125,0.078 -0.1875,0.078 -0.40625,0.1562 -0.21875,0.078 -0.57812,0.1094 -0.57812,0.1094 l -0.0469,1.8281 1.0781,0.7031 0.375,0.25 c 0,0 0.625,0.1563 0.78125,0.1407 0.15625,-0.016 1.0312,-0.031 1.0312,-0.031 0,0 0.39062,0.2031 0.5,0.375 0.10937,0.1718 0.51562,1.0312 0.5,1.0937 -0.0156,0.062 -0.78125,0.8906 -0.78125,0.8906 l -0.57813,0.7969 c 0,0 -0.8125,0.4063 -0.76562,0.5781 0.0469,0.1719 0.0156,0.75 0.0469,0.8125 0.0312,0.062 0,0.25 0.26563,0.3125 0.26562,0.062 1.5781,0.7188 1.5781,0.7188 0,0 0.96875,0.9062 1.0625,1 0.0937,0.094 0.84375,0.375 0.95313,0.4062 0.10937,0.031 1.5469,0.1875 1.5469,0.1875 l 1.0625,0.7969 1.3594,0.094 c 0,0 0.39062,0.2656 0.5625,0.4219 0.17187,0.1562 0.4375,0.5156 0.59375,0.6719 0.15625,0.1562 0.40625,0.1406 0.53125,0.4843 0.125,0.3438 0.32812,2.1563 0.32812,2.1563 0,0 -0.0937,0.7344 -0.0469,0.8125 0.0469,0.078 0.0937,0.1406 0.15625,0.1562 0.0625,0.016 1.3438,0.3907 1.3438,0.3907 l 0.6875,-0.047 c 0.35937,-0.047 1.0625,-0.062 1.5625,-0.062 0.5,0 1.125,0.078 1.125,0.078 l 0.89062,0.2812 c 0,0 0.0781,0.1719 0.29688,0.3438 0.21875,0.1718 0.70312,0.4687 0.79687,0.5312 0.0937,0.062 0.35938,1.3125 0.35938,1.3125 0,0 -0.0312,0.4219 0.0781,0.5 0.10938,0.078 0.39063,0.2813 0.5,0.4063 0.10938,0.125 0.21875,0.3281 0.32813,0.3906 0.10937,0.062 2.4688,0.2031 2.4688,0.2031 l 0.78125,0 c 0,0 0.70312,0.3594 0.875,0.5469 0.17187,0.1875 0.5625,0.5 0.625,0.5 0.0625,0 0.60937,0.031 0.84375,0.016 0.23437,-0.016 0.71875,0.016 0.92187,-0.016 0.20313,-0.031 0.71875,-0.1406 0.84375,-0.016 0.125,0.125 0.53125,0.4531 0.53125,0.4531 0,0 0.20313,0.25 0.35938,0.2656 0.15625,0.016 0.59375,0.2032 0.79687,0.1875 0.20313,-0.016 0.40625,-0.016 0.51563,-0.031 0.10937,-0.016 0.48437,0.016 0.625,-0.016 0.14062,-0.031 0.39062,-0.062 0.45312,-0.1562 0.0625,-0.094 0.15625,-0.25 0.20313,-0.4063 0.0469,-0.1562 0.0625,-0.2656 0.0625,-0.5156 0,-0.25 -0.0937,-0.6094 -0.0937,-0.6094 l 0.23437,-1.2031 0.95313,-0.2187 c 0,0 0.57812,0.016 0.71875,0.2343 0.14062,0.2188 0.34375,0.625 0.34375,0.625 0,0 -0.0156,0.1719 0.14062,0.2188 0.15625,0.047 1.1562,0.2812 1.1562,0.2812 0,0 0.15625,-0.016 0.32813,0.2188 0.17187,0.2344 0.35937,0.3906 0.51562,0.5312 0.15625,0.1407 0.40625,0.2813 0.48438,0.3907 0.0781,0.1093 0.17187,0.1875 0.32812,0.3906 0.15625,0.2031 0.3125,0.3437 0.35938,0.4062 0.0469,0.062 0.15625,0.094 0.25,0.2657 0.0937,0.1718 0.21875,0.4687 0.28125,0.6093 0.0625,0.1407 0.39062,0.6875 0.39062,0.6875 0,0 0.48438,0.1875 0.59375,0.1875 0.10938,0 1.5938,0.094 1.6562,0.125 0.0625,0.031 0.84375,1.125 0.84375,1.125 l 1.0938,1.2813 0.21239,-0.15313 0.45949,-0.33127 1.0781,0.016 0.6875,0.4375 0.34375,0.4531 1.1562,0.7032 0.42188,0.6562 -0.0625,0.7188 -0.4375,0.6406 -0.32813,0.3125 0.20313,0.9687 0.60937,0.1719 0.625,0.1875 c 0,0 0.40625,0.2344 0.48438,0.3594 0.0781,0.125 0.48437,0.5 0.48437,0.5 l 0.54688,0.5625 -0.0781,0.7344 c 0,0 0.20313,0.5156 0.28125,0.5468 0.0781,0.031 0.10938,0.1094 0.45313,0.1094 0.34375,0 0.59375,0.047 0.75,0 0.15625,-0.047 0.92187,-0.1562 1.1094,-0.1406 0.1875,0.016 0.64063,0.1094 0.78125,0.125 0.14063,0.016 2.0469,0.078 2.0469,0.078 l 0.54687,0.3125 0.54688,0.3906 c 0,0 0.73437,0.2344 0.78125,0.3281 0.0469,0.094 0.375,0.4844 0.46875,0.5313 0.0937,0.047 0.54687,0.2812 0.54687,0.2812 l 0.82813,-0.031 0.8125,-0.1406 0.65625,-0.5938 c 0,0 0.57812,-0.2968 0.65625,-0.2968 0.0781,0 0.875,0.062 1.0156,0.047 0.14063,-0.016 1.0625,0.062 1.0625,0.062 l 1.5781,0.094 0.73437,0.2969 0.71875,0.3281 0.79688,0.1094 -0.15625,-2.8594 0.125,-2.3594 c 0,0 0.48437,-0.4844 0.51562,-0.5469 0.0312,-0.062 0.23438,-0.75 0.25,-0.8125 0.0156,-0.062 -0.71875,-0.9531 -0.71875,-0.9531 l 0.14063,-0.6719 0.78125,-0.875 0.34375,-1.5781 0.98437,-1.0469 1.0469,-0.9687 0.95312,-1 0.9375,-0.875 2.0469,-0.2656 1.3125,-0.062 1.6719,-1.0313 1.3594,-0.9844 1.1719,-1.1406 1.0156,-0.6406 1.3125,-0.7031 1.3438,-0.2032 1.1094,0.1563 0.89063,0.9844 0.96875,1.0468 0.71875,0.5782 1.4688,0.25 0.65625,0.5781 1.6406,0.2031 0.9375,0.7031 0.0625,1.125 c 0,0 0.85938,0.3438 0.92188,0.4532 0.0625,0.1093 0.10937,0.4062 0.20312,0.4687 0.0937,0.062 0.64063,0.4063 0.70313,0.4063 0.0625,0 0.20312,0.094 0.42187,-0.016 0.21875,-0.1094 0.53125,-0.2344 0.6875,-0.3907 0.15625,-0.1562 0.1875,-0.2031 0.39063,-0.3593 0.20312,-0.1563 0.34375,-0.2344 0.46875,-0.2813 0.125,-0.047 0.51562,-0.047 0.625,-0.047 0.10937,0 0.57812,0.062 0.57812,0.062 0,0 0.67188,0.1719 0.6875,0.2344 0.0156,0.062 0.0625,0.047 0.21875,0.375 0.15625,0.3281 0.23438,0.4844 0.28125,0.5781 0.0469,0.094 0,-0.047 0.10938,0.2188 0.10937,0.2656 0.14062,0.4375 0.25,0.4687 0.10937,0.031 0.0312,0.1094 0.46875,0.094 0.4375,-0.016 0.45312,0 0.6875,-0.031 0.23437,-0.031 0.34375,0.016 0.5625,-0.031 0.21875,-0.047 0.23437,-0.062 0.71875,-0.047 0.48437,0.016 0.28125,-0.047 0.76562,0.062 0.48438,0.1094 0.51563,0.031 0.64063,0.125 0.125,0.094 0.26562,0.094 0.34375,0.2656 0.0781,0.1719 0.10937,0.1094 0.14062,0.2969 0.0312,0.1875 0.0469,0.3125 0.0469,0.375 0,0.062 -0.10938,1.4375 -0.0156,1.6094 0.0937,0.1719 0.0156,0.1406 0.375,0.4531 0.35938,0.3125 0.73438,0.6719 0.85938,0.7188 0.125,0.047 0.4375,0.2187 0.65625,0.2031 0.21875,-0.016 0.40625,-0.016 0.65625,-0.016 0.25,0 0.5625,-0.016 0.71875,0.047 0.15625,0.062 0.32812,0.047 0.5,0.2656 0.17187,0.2188 1.0469,0.7813 1.0469,0.7813 0,0 0.21875,0.3906 0.32813,0.6718 0.10937,0.2813 0.15625,0.3594 0.20312,0.5157 0.0469,0.1562 0.14063,0.3593 0.1875,0.4843 0.0469,0.125 0.125,0.1875 0.23438,0.3907 0.10937,0.2031 0.10937,0.375 0.25,0.5468 0.14062,0.1719 0.32812,0.5313 0.625,0.4063 0.29687,-0.125 0.5,-0.094 0.65625,-0.3125 0.15625,-0.2188 0.17187,-0.3281 0.34375,-0.5 0.17187,-0.1719 0.0469,-0.375 0.4375,-0.2969 0.39062,0.078 0.85937,0.1719 0.95312,0.2813 0.0937,0.1093 0.15625,0.25 0.32813,0.2968 0.17187,0.047 0.3125,0.1875 0.625,0.078 0.3125,-0.1093 0.0625,-0.062 0.51562,-0.1562 0.45313,-0.094 0.32813,-0.016 0.73438,-0.1563 0.40625,-0.1406 0.375,-0.2343 0.625,-0.2187 0.25,0.016 0.42187,-0.047 0.64062,0.062 0.21875,0.1094 0.375,0.25 0.51563,0.2969 0.14062,0.047 0.0469,0.094 0.46875,0.125 0.42187,0.031 0.3125,0.1406 0.54687,0.062 0.23438,-0.078 0.14063,-0.062 0.46875,-0.2344 0.32813,-0.1719 0.28125,-0.2344 0.60938,-0.2656 0.32812,-0.031 2.8281,-0.062 2.8281,-0.062 0,0 0.125,-0.1094 0.26563,-0.2657 0.14062,-0.1562 0.28125,-0.2656 0.46875,-0.4218 0.1875,-0.1563 0.3125,-0.2344 0.35937,-0.4063 0.0469,-0.1719 0.17188,-1.3906 0.23438,-1.3906 0.0625,0 0.375,-0.1406 0.5,-0.375 0.125,-0.2344 0.125,-0.25 0.23437,-0.5938 0.10938,-0.3437 0.0781,-0.2968 0.21875,-0.6093 0.14063,-0.3125 0.0469,-0.3438 0.17188,-0.5157 0.125,-0.1718 0.0781,-0.1718 0.23437,-0.2812 0.15625,-0.1094 0.21875,-0.1563 0.21875,-0.1563 0,0 0.71875,-0.2031 0.84375,-0.062 0.125,0.1407 0.375,0.4063 0.5,0.5782 0.125,0.1718 -0.0469,0.4062 0.3125,0.2968 0.35938,-0.1093 0.625,-0.1562 0.64063,-0.2343 0.0156,-0.078 0.0156,0.078 0.15625,-0.2969 0.14062,-0.375 0.15625,-0.5 0.25,-0.6875 0.0937,-0.1875 0.0156,-0.1563 0.20312,-0.3438 0.1875,-0.1875 0.1875,-0.125 0.32813,-0.2968 0.14062,-0.1719 0.25,-0.3125 0.3125,-0.4063 0.0625,-0.094 0.0937,-0.2187 0.28125,-0.3281 0.1875,-0.1094 0.14062,-0.2656 0.39062,-0.2031 0.25,0.062 0.29688,0.016 0.51563,0.2187 0.21875,0.2031 -0.0312,0.4531 0.46875,0.4063 0.5,-0.047 0.40625,0.078 0.625,-0.062 0.21875,-0.1407 0.15625,0.047 0.32812,-0.2657 0.17188,-0.3125 0.0937,0.078 0.25,-0.5 0.15625,-0.5781 0.71875,-1.9375 0.71875,-1.9375 l 0.51577,-0.1411 c 0,0 0.0312,0.031 0.17187,0.062 0.14063,0.031 0.17188,0.047 0.29688,0.062 0.125,0.016 -0.0156,0.031 0.4375,0.062 0.45312,0.031 0.20312,0 0.5625,0.031 0.35937,0.031 0.54687,0.047 0.78125,0.047 0.23437,0 0.125,0.016 0.42187,-0.031 0.29688,-0.047 0.15625,0.047 0.46875,-0.094 0.3125,-0.1406 0.35938,-0.1562 0.45313,-0.2187 0.0937,-0.062 -0.0312,0 0.21875,-0.1563 0.25,-0.1562 0.3125,-0.1718 0.48437,-0.2968 0.17188,-0.125 0.17188,-0.094 0.21875,-0.1875 0.0469,-0.094 0.21875,-0.4532 0.21875,-0.4532 z").attr(attr);
            eur.fr1 = R.path("m316.91,251.29,0.375,0.1875s0.46875,0.25,0.5,0.4688c0.0312,0.2187,0,0.5625-0.0312,0.8125s-0.15625,0.5625-0.28125,0.6875-0.53125,0.2187-0.53125,0.2187l-0.59375-0.3125s-0.4375-0.5312-0.625-0.5312-1.125-0.094-1.125-0.094-0.1875-0.031-0.25-0.1875c-0.0625-0.1563-0.0625-0.25-0.0937-0.375s-0.15625-0.1875-0.0625-0.375c0.0937-0.1875,0.0937-0.25,0.25-0.3125,0.15625-0.062,0-0.125,0.34375-0.125s0.59375,0,0.71875,0.031,0.875-0.031,0.875-0.031z").attr(attr);
            eur.fr2 = R.path("m450.35,408.73,0.40625,0.5313,0.0312,0.3125,0.0312,0.4375s-0.125,0.5625-0.125,0.75,0,0.1562-0.0312,0.375c-0.0312,0.2187-0.15625,0.7812-0.25,0.9062-0.0937,0.125-0.34375,0.1563-0.5625,0.5625-0.21875,0.4063-0.25,0.5938-0.21875,0.75,0.0312,0.1563,0.0312,0.2188,0.0312,0.5,0,0.2813,0,0.25-0.0625,0.6875s-0.1875,0.4375-0.15625,1c0.0312,0.5625,0.0937,0.9063,0.0937,1.0625,0,0.1563-0.125,0.2813,0.0937,0.4688,0.21875,0.1875,0.15625,0.062,0.3125,0.3437,0.15625,0.2813,0.25,0.3438,0.375,0.6563s0.15625,0.625,0.21875,1.0312c0.0625,0.4063,0,0.3438,0.0625,0.9063s-0.0312,0.5312-0.0312,1c0,0.4687-0.0312,0.7187-0.0312,0.8437s-0.15625,2.125-0.15625,2.125l-0.28125,0.5938s-0.375,0.125-0.40625,0.375c-0.0312,0.25,0.15625,0.031-0.21875,0.8437-0.375,0.8125-0.6875,0.8125-0.8125,1.1563-0.125,0.3437-0.34375,0.6562-0.4375,0.7812-0.0937,0.125-0.28125,0.094-0.53125,0.4375-0.25,0.3438-1.125,0.9688-1.125,0.9688l-0.0937,1,0.125,3.875s-0.0312,0.2187-0.125,0.3437c-0.0937,0.125-0.0625,0.031-0.3125,0.4063-0.25,0.375-0.625,0.1875-0.8125,0.875s-0.21875,0.6562-0.3125,0.875c-0.0937,0.2187-0.28125,0.4375-0.4375,0.6562-0.15625,0.2188,0.0625-0.1562-0.4375,0.5625-0.5,0.7188-0.53125,0.625-0.59375,0.8438-0.0625,0.2187-0.21875,0.8437-0.21875,0.8437l-0.21875,0.3125-0.84375,0.7813-0.3125,0.094-1.125-0.4375s-0.28125-0.2188-0.375-0.3438c-0.0937-0.125-0.5-0.9062-0.5-0.9062l-1.1875-0.3438-0.75-0.6562-0.46875-0.2188-0.6875-0.6875c-0.1875-0.25-0.5625-0.5625-0.5625-0.7812,0-0.2188-0.25-0.5625,0.0312-0.9375,0.28125-0.375,0.0625-0.5,0.46875-0.6563,0.40625-0.1562,0.625-0.1875,0.625-0.1875l0.0312-0.875s-0.125-0.4687-0.34375-0.6562-0.6875-0.4375-0.6875-0.4375-0.96875-0.5625-0.78125-0.6563c0.1875-0.094,0.3125-0.2812,0.4375-0.4062s0.21875-0.4375,0.375-0.5938c0.15625-0.1562,0.25-0.1562,0.71875-0.625,0.46875-0.4687,0.53125-0.625,0.53125-0.625l-0.6875-0.625-0.625-0.1875s-0.75,0.031-0.875-0.062c-0.125-0.094-0.6875-0.375-0.75-0.5937-0.0625-0.2188,1-1.25,1-1.25s0.75-0.062,0.96875-0.1875c0.21875-0.125,0.5-0.2188,0.53125-0.4375,0.0312-0.2188,0.0312-0.7188,0.0312-0.7188s-0.5625-0.5312-0.6875-0.625c-0.125-0.094-1.1875-0.3437-1.2812-0.5-0.0937-0.1562-0.34375-0.4687-0.34375-0.4687l-0.125-0.625s0.21875-0.1875,0.34375-0.375,0.34375-0.2813,0.53125-0.5c0.1875-0.2188,0.28125-0.25,0.34375-0.375s0.1875-0.2813,0.21875-0.5313c0.0312-0.25-0.65625-1.125-0.65625-1.125s-0.65625,0.094-0.28125-0.5312c0.375-0.625,0.78125-0.8438,0.78125-0.8438s0.375-0.1875,0.65625-0.2812c0.28125-0.094,0.875-1.9375,0.875-1.9375s0.46875-0.375,0.75-0.5313c0.28125-0.1562,1.0938-0.5,1.2188-0.625s0.6875-0.3437,0.8125-0.4375c0.125-0.094,0.5-0.3437,0.75-0.4062,0.25-0.062,0.40625-0.062,0.8125-0.094,0.40625-0.031,1,0.062,1.2188-0.062,0.21875-0.125,0.4375-0.3125,0.625-0.4375s0.8125-0.5,0.8125-0.5l0.59375-0.062,0.65625,0.031,0.71875,0.2187,1.1875,0.062,0.53125-1.4062-0.3125-0.75-0.4375-0.7813s0.125-0.4062,0.21875-0.5937c0.0937-0.1875,0.28125-0.5938,0.28125-0.5938s0.0625-0.4062,0.15625-0.5937c0.0937-0.1875,0.28125-0.5313,0.28125-0.5313l0.15625-0.1562,0.25-0.1563s0.3125-0.031,0.4375-0.031,0.40625,0.031,0.40625,0.031z").attr(attr);
            eur.fr4 = R.path("m293.55,280.3-0.37565,0.7292-0.22097,0.3315s-0.44194,0.1989-0.50823,0.3535c-0.0663,0.1547-0.28726,0.3536-0.28726,0.5304,0,0.1767,0.0442,0.3314-0.0221,0.464s-0.35355,0.464-0.35355,0.464-0.0221,0.088-0.28726,0.1326c-0.26517,0.044-0.99437,0.1989-1.0386,0.2873-0.0442,0.088-0.0884,0.1547-0.13258,0.3535-0.0442,0.1989-0.24307,0.3978-0.19887,0.5967,0.0442,0.1988,0.0663,0.3314,0.0884,0.464s0.0884,0.4198,0.0884,0.4198-0.0221-0.022,0.11049,0.1768c0.13258,0.1989-0.0884,0.1768,0.30936,0.3094,0.39775,0.1326,0.7513,0.2431,0.92808,0.2872,0.17677,0.044,0.55242,0.3757,0.55242,0.3757l0.11046,0.2431,0.13258,0.088s0.0884,0.066,0.17678,0.022c0.0884-0.044,0.0442,0.1325,0.13258-0.1105,0.0884-0.2431,0.15468-0.221,0.13258-0.442-0.0221-0.2209-0.0663-0.3535-0.0442-0.5966s0.0442-0.1989-0.0221-0.5745c-0.0663-0.3757,0.0221-0.3757-0.13258-0.6408-0.15468-0.2652,0.22097-0.022-0.24307-0.3978-0.46404-0.3756-0.7734-0.6408-0.7734-0.6408s0.0221-0.3093,0.28726-0.3977c0.26517-0.088,0.11049-0.1105,0.33146-0.1326,0.22097-0.022-0.13258-0.022,0.28726-0.022,0.41985,0,0.44194,0.066,0.64082-0.044,0.19887-0.1105,0.24307,0.088,0.35355-0.221,0.11049-0.3093,0.24307-0.5082,0.26517-0.6187s0.0663-0.1768,0.0884-0.3315c0.0221-0.1546,0.0221-0.088,0.0442-0.243,0.0221-0.1547-0.0221-0.1326,0.0221-0.2873s0.0663-0.2652,0.0663-0.2652v-0.1325c0-0.1326-0.50824-0.5304-0.50824-0.5304z").attr(attr);
            eur.at = R.path("m475.66,332.54,1.3125,0.1875,0.65625,0.094,0.53125,0.25,0.46875,0.625,0.25,0.4063,0.3125,0.1875,0.5,0.125,0.5625,0.2187,0.15625,0.125,0.65625,0.5625,0.96875-0.094,1.4375-1.4375,0.21875-1.1875,1.1562-0.9375,4-0.094,4.3125-0.125,2.25,0.4063,1.125-1.0313,0.34375-0.25,0.46875,0,0.25,0,0.3125,0.125,0.34375,0.094,0.21875,0.3438,0.15625,0.3125,0.0312,0.5,0,0.5625-0.0937,0.5-0.1875,0.9687,0.75,0.8438,0.21875,1.1875,1.3438,1,1,1.5937,0.71875,0.8125,0.96875,0.3125,1.3125,0.8438,1,0.094,1.9375,0.9375,1.2188-0.062,1.3438,0.2187,1.5,0.094,2.0625,0.75,1.9375-0.062,2.1562,0.1563,0.78125,0.2187,0.5,0.3125,0.28125,0.375,0.4375,0.094,0.84375-0.031,0.34375-0.031,1.2188,0.25,0.5625,0.4375,1.0312,0.4688,0.46875,0.3437,0.9375,1.0313,0.25,0.125,0.71875,0,1.7812-0.6875,0.40625,0.094,0.46875,0.2187,0.65625,0.5,0.1875,0.125,1.875-0.031,0.5625,0.094,0.21875-0.062,0.125-0.062,0.46875-0.5311,1.0625-0.7813,0.53125-0.3125,0.15625-0.5,0.25-0.4062,0.21875-0.5,0.0625-0.2813,0.75-0.3125,1.0625-0.062,1.0625,0,0.96875-0.031,0.46875-0.125,0.5,0.25,0.84375,0.625,0.875,0.3125,1.5312-0.1875,0.96875,0.031,1-0.9062,0.0625-0.5,0.1875-0.2813,0.28125-0.2187,1.2188-0.125,0.4375-0.1563,0.53125,0.3125,0.4375,0.4375,0.28125,0.2813,2,0.125,0.84375-0.125,0.125-0.1563-0.125-0.7187,0-0.4063-0.125-0.5937,0.9375-1.625,1.8438-0.3438,1.3125,0.125,0.15625-1.875,2.9375-2.3437-0.0312-0.875-1.0938-1.0938,1.0312-1.8437,0.15625-3.2188,2.9062-0.7812-0.125-2.2813-2.2188-1.1875-0.71875-1.5312,3.1562-0.4375,1.0938,1.375,4.8125-0.5313-0.9375-1.6562-0.0312-1.9375,0.96875-1.875,1.1562-0.8438,0.71875-0.1875-3.875-2.9062-1.2812-3.125,1.1562-3.875,1.3125-3.7188-3.5625-0.3437-1.9375-2.1563-2.1875,1.1563-4.3438,0.094-1.25-0.9688-1.8125-0.8437-3.3125-1.7813-1.6875-0.8125-4.4062-0.4687-2.2188-1.4688-0.15625,4.7188-3.4375,0.375-0.125,3.0937-1.7188,0.031-1.1562-1-1.8438,1.0938-3.8125-0.1875-1.375-1.0938-1.3125-2.125-1.625,1.0625,0.0625,2.375-0.96875,0.9688-1.1875-0.25-1.5-1.4375-0.78125-0.2813-0.6875,0.5625-0.15625,3.0313-0.875,1.2187-2.0625,1.0625-1.8125,0.1563-1.125,0.8125-1.625,0.2812-1.0938,0.6875-1.375,1.0313,0.1875,1.0312,0.8125,0.9375,1.1875,1.2188,0.75,0.75,0.40625,1.0312,0.0937,1-1.125,1,0.0937,1.125,1.125,0.9063,0.6875,0.8437,0.125,1.1563-0.21875,0.9062-0.59375,0.75-0.78125,0.4063-0.8125,0-0.8125-0.5313-0.78125-1-0.46875-1.5937-0.15625-0.9063-1.375-0.094-1.7812,0-1.6875-0.8437-1.3125-0.5312-1.4375,0.4062-1.2188,1.0938-3.2812,0.125-3.3125-0.062s-0.875,0.8125-1.0312,0.8125c-0.15625,0-2,0.3437-2,0.3437l-0.6875,0.8125-1.125,0.75-2.4375,0.1875-1.4375-0.031-1.2188-0.7187-0.40625-1.1563-1-1.4375-0.625-0.5937-2.0312-0.1563-1.2188-0.031-0.40625,0.5938-0.65625,0.8125-0.65625,1.6875-1.1562,0.7812-1.3438,0.3125-1,0.4688-0.75-0.375s-0.375-0.5938-0.4375-0.7813-0.1875-0.6562-0.28125-0.9062c-0.0937-0.25-0.46875-1.5938-0.46875-1.5938l-0.5625-1.1875-1.3438-0.9062-0.71875-0.4688-0.84375,0.1563s-1.1875,0.25-1.3125,0.3125c-0.125,0.062-0.71875,0.25-0.71875,0.25l-0.28125,1-0.0312,0.9062-0.0625,0.9375-0.28125,0.8125s-0.4375,0.3438-0.59375,0.5625c-0.15625,0.2188-0.46875,0.625-0.59375,0.8125s-0.40625,1.1563-0.40625,1.1563l-0.2188,1.3436-0.34375,1.2813-0.125,0.5937,0.28125,0.375s0.0312,0.1563,0.5,0.2188c0.46875,0.062,0.34375,0.094,0.84375,0.062,0.5-0.031,1.25-0.031,1.5-0.031s0.71875,0.094,0.71875,0.094,0.5,0.375,0.53125,0.5c0.0312,0.125,1.0625,1.4375,1.0625,1.4375s0.25,0.5625,0.3125,0.6875,0.0312,0.3125,0.34375,0.5625c0.3125,0.25,0.5625,0.5937,0.84375,0.6875,0.28125,0.094,0.1875,0.1562,0.71875,0.1562s1.0312,0.031,1.375-0.125c0.34375-0.1562,0.6875-0.375,0.8125-0.5s0.125-0.1562,0.3125-0.4062,0.75-0.7188,0.875-0.8438,0.53125-0.2812,0.53125-0.2812l0.34375,0.031s0.5,0.2812,0.5625,0.4375c0.0625,0.1562,0.15625,0.4062,0.15625,0.4062s0.0937,0.4063,0.0937,0.5313-0.0312,0.5937-0.0312,0.5937l0.0937,0.5313,0.40625,0.2187z").attr(attr);
            eur.ch = R.path("m422.69,344.67,1.5689,0.221,1.4363,0.5303,1.5026,0.2652,1.2595,0.066,1.37-0.1989,0.33146-0.1325,0.26516-0.1547,0.19887-0.2652,0.33146-0.2431,0.22097-0.088,0.44194,0,0.55243,0.044,0.81759,0.1547,0.72921,0.7292,0.64081,0.5303,1.149,0.4862,0.92808-0.1547,1.3037-1.7015,2.2981-2.0992,0.26517-1.149,0.0442-0.5525-0.0663-0.4419,0.13258-0.3536,0.19888-0.2872,0.46404-0.4199,0.19887-0.2872,0.92808-0.8176,1.0828-0.7071,0.90598-0.5304,0.41984-0.1767,0.41985,0.044,0.57452,0.3535-0.0221,3.403,0.35356,1.4363,2.5412,1.9224,0.39775,0.3094,0.59662,1.5026,0.15468,1.1048,0.13258,0.442,0.28726,0.3977,0.41985,0.5966,0.17678,0.6851,0.11048,0.6187,0.0884,0.4419,0.22097,0.1768,0.55243,0.066,0.50823,0.044,0.39775-0.7734,0.26516-2.4749-0.0442-1.2374,0.86178-0.7734,1.3921-1.5468,1.5026-1.6352,0.7734-0.7955,0.15468-1.6131,0.19887-0.7955,0.17678-0.685,0.64082-0.6187,1.1048,0.2431,0.7513,0.9501,0.22097,1.4585,0.15468,1.3258,0.66292,0.685,1.0607,0.1768,1.7457-0.8839,0.66291-0.5745,0.90598-0.2652,1.0165,2.5191,0.59663,0.8617,0.92807,0.6188,0.64082-0.1326,0.0884-1.0386-0.46404-0.8176,0-0.1768,0.33145-0.3977,0.55243-0.9281-0.22097-0.7292-0.66291-0.8397-0.11049-1.2816,0.24307-1.0386,0.41985-0.5303,1.0828,0.1105,0.99437,0.9502,0.59662,0.6187,1.5468,0.9502,0.79549-0.9502,0.0884-0.5082-0.7734-1.127-0.0221-1.8783,0.88388-1.37,0.28726-0.5524,0.7513-0.4199-0.68501-0.3314-0.11048-0.5745,0.0442-0.6408-0.22097-0.7955-0.15468-0.221-0.37565-0.221-0.17677-0.044-0.22098-0.044-0.33145,0.1547-0.26517,0.1547-0.26516,0.2651-0.41985,0.3757-0.28726,0.3756-0.22097,0.2431-0.48614,0.3315-0.46403,0.2209-0.50824,0.044-0.55242,0.022-0.50824-0.066-0.48613-0.1988-0.44194-0.3536-0.39775-0.3756-0.17678-0.3094-0.0884-0.3315-0.30936-0.5303-0.77339-1.0606-0.26517-0.442-0.48614-0.3756-0.59662-0.1105-1.2374,0-0.86179,0.022-0.7292-0.1326-0.41985-0.5082,0.48614-1.9446,0.19887-1.2374,0.37565-1.1491,0.7734-1.0385,0.44194-0.3978,0.28726-0.7734,0.0884-1.7898,0.28726-1.0386-2.2318-1.9446-0.99437-0.9722-1.6573-0.4199-1.4142-0.5966-3.646-0.221-0.97227-0.9059-0.44194-0.9502-0.97227-0.9281-1.0165-0.1547-1.2816,0.2431-0.61872,0.7955-0.0884,1.3258,0,0.8618s-0.19888,0.4861-0.28727,0.5303c-0.0884,0.044-0.7513,0.2652-0.88388,0.221-0.13258-0.044-0.86179-0.7292-1.0386-0.7734-0.17678-0.044-1.1049-0.1547-1.2374-0.1547-0.13258,0-4.4194-0.044-4.4194-0.044l-1.9224-0.2209s-1.6352-0.2652-1.7457-0.221c-0.11049,0.044-1.9224,0.2872-1.9224,0.2872l-1.1048,0.9723-0.99437,0.7955s-1.0828-0.4861-1.2153-0.5303c-0.13259-0.044-0.7734-0.5083-1.0607-0.7734-0.28727-0.2652-0.7955-0.906-0.95018-0.9281-0.15468-0.022-1.2374-0.2652-1.37-0.1989-0.13258,0.066-0.64081,0.5304-0.86178,0.8176-0.22097,0.2873-1.0165,1.2817-1.0165,1.2817s0.33146,0.5745,0.48614,0.7955c0.15468,0.2209,0.55242,1.149,0.55242,1.149s-0.13258,0.7734-0.24306,0.7955c-0.11049,0.022-1.1049,0.1105-1.1049,0.1105l-3.4913,3.6239-1.9887,1.2374-1.812,0.2873-0.22097,0.8839-0.33146,2.6074-1.9003,1.2375-2.7621,0.9281-1.0386,1.1269-0.0663,3.9554-1.6131,2.1434-1.3921,0.9502-0.26516,1.4805s0.50823,0.5966,0.68501,0.6187c0.17677,0.022,1.6794-0.6187,1.6794-0.6187l1.8341-1.3037,0.7955-1.7015,1.591-2.2318,3.867-0.2873,1.3258,0.9281,0.48614,1.3258v2.6296l-0.68501,1.2816,0.7292,2.0771,0.97228,1.0607,1.0607,1.4363-0.41985,0.8397z").attr(attr);
            eur.de = R.path("m437.98,313.18,3.5469,0.4688,4.5781,0.047,1.1875,0.1719,0.9375,0.7343,0.92187-0.2031,0.28125-0.4844,0.10938-2.2343,0.60937-0.7969,1.2969-0.25,1,0.1562,0.98437,0.9375,0.46875,1,0.95313,0.875,3.625,0.1875,1.4531,0.625,1.5938,0.4219,3.2344,2.875,1.1875-0.3906,1.7031-0.3438,2.0938,1.4063,0.5625,1.2187,0.71875,2.5313,0.45313,0.6875,0.71875,0.375,1-0.4844,1.3438-0.2969,1.125-0.7656,0.67187-1.7031,1.0781-1.4375,1.2812,0.062,1.9688,0.1562,0.6875,0.6563,0.96875,1.3906,0.40625,1.1563,1.2031,0.7031,1.4531,0.016,2.375-0.1719,1.1562-0.7812,0.70312-0.7969,1.9531-0.3281,1.0469-0.8125,2.8594,0.047,2.4062-0.078,1.3281-0.047,1.2188-1.0625,1.4688-0.4219,1.4219,0.5782,1.5938,0.8125,1.8438-0.031,1.3281,0.1406,0.10938,0.875,0.5,1.625,0.79687,0.9687,0.76563,0.5625,0.8125-0.047,0.79687-0.375,0.5625-0.7344,0.21875-0.9375-0.0937-1.1562-0.6875-0.8125-1.125-0.9219-0.0937-1.1406,1.1094-0.9844-0.10938-1.0312-0.39062-1.0313-2.0156-2.0312-0.71875-0.8282-0.1875-1.0625,1.3594-1.0156,1.0781-0.7187,1.6094-0.2657,1.1719-0.8125,1.8125-0.1562,1.9844-1.0469,0.95312-1.2344,0.14063-3.0468,0.6875-0.5625,0.82812,0.2968,1.4688,1.4219,1.1719,0.25,0.96875-0.9687-0.0625-2.3594,1.6094-1.0781-0.39062-0.7657-2.2344-2.9531-2.9062-0.9687-1-1.9688-1.9844-0.9687-1.9844-4.8125-2.7969-1.0938-3.2344-3.875-1.2344-3.1562,0-3.0157,1.6875-1.4218-2.2188-3.7032-2.6406-1.9218,0.34375-2.8594,3.75-0.2813,2.2031-1.7968,3.6094-0.125,1.5312,0.8593,1.1562-1.875,1.8594-0.062,1.5-1.7031,2.4531-0.1719,0.64063-1.5625,4.4219-0.5312,2.9219-0.9688,1.0312-1.0156,2.6875,0.062,0.29687-1.0156-1.1562-0.8906,0.26563-1.2032,3.125,0.016,1.3594,1.9532,0.23438,1.6718,1.5156,0.4375,0.64063-0.9531,1.7812-0.3437-0.10938-2.7032,0.3125-1.125-0.15625-1.5156,0.14063-0.2969,0.23437-0.4843,1.0625-3.5625-4.2969-3.8594,0.90625-3.0313-2.0156-1.1875,0-1.5625,3.1094-3.2968-1.2656-5.1094-1.7656-1.8906,0.0625-2.3125,2.2812-1.8438-1.6875-2.0469-4.6406-2.9062-0.0781-2.8438,4.1094-3.8281,0.0156-7.2812-1.3438-0.9532,0.21875-2.9375-1.0781-0.9687-1.6562-0.4219-1.1562-0.7812-0.73437-1.4844,0.28125-0.7031,1.2031,0.2343,1.4844-0.016,0.79687-0.4843,0.73438-0.3594-0.79688-0.8594-1.125-1.1406-1.3438-1.375-1.1719-0.75-1.875-0.016-2.3125-0.125-1.3906-0.7344-0.6875-0.9844-1.0312-0.7812-0.92187-1,0.59375-1.0625,1.2812,0.5312,1.1406,0.9219,1.2031,0.2344,1.4688-0.7813,1.4844,0.047,0.90625-0.5312-0.25-1.6406-1.1562-0.7969-0.17187-0.8125,1.375-1.0469-0.67188-1.5156s-0.90625-0.047-1.0312-0.078c-0.125-0.031-1-0.4531-1-0.4531l-0.6875-1.2032-0.79687-0.1562s-0.42188,0.094-0.46875,0.1875c-0.0469,0.094-0.29688,0.3906-0.3125,0.4687-0.0156,0.078-0.3125,0.625-0.35938,0.75-0.0469,0.125-0.39062,0.5157-0.4375,0.6719-0.0469,0.1563-0.3125,0.9219-0.3125,0.9219s0.0625,0.9531,0.0625,1.0469c0,0.094-0.29687,0.8906-0.29687,0.8906l-0.73438,0.7969-1.1719,0.1718s-1.2812-0.8281-1.3594-0.8437c-0.0781-0.016-1.3438-0.8594-1.3438-0.8594l-1.4844-0.2344-1.625-0.031-1.0938,0.2969-0.79688,0.75-0.60937,0.8594-0.5625,0.8125-0.92188,0.3594-1.5,1.0156-1.3281,0.8906-2.3125,0.1406-2.0625,0.1563-1.4531,0.7812-0.59375,0.9688-0.65625,0.875-1.0625,1.2031-1.3438-0.078-1.4531-0.1406s-0.20313-0.7813-0.28125-0.9375c-0.0781-0.1563-0.73438-0.9219-0.73438-0.9219l-0.65625,0.016s-0.54687,0.5-0.65625,0.5938c-0.10937,0.094-0.73437,0.2968-1.0156,0.3281-0.28125,0.031-0.98438,0.047-0.98438,0.047s-0.6875-0.2813-0.76562-0.4063c-0.0781-0.125-0.32813-0.4375-0.3125-0.6093,0.0156-0.1719-0.0469-0.2657,0.0156-0.5782s0.0312-0.4843,0.0937-0.6406c0.0625-0.1562-0.28125-0.125,0.1875-0.4062,0.46875-0.2813,0.70313-0.2657,0.78125-0.2813,0.0781-0.016,0.53125,0,0.53125,0l2.0156-1.0625,0.90625-0.6562,0.59375-0.6875,0.15625-1.1094,0.10937-1.8281,0.34375-1.4532,1.4062-0.2187,0.85938-0.3906-0.1875-1-0.65625-0.6094-0.65625-0.094s-0.5625-0.016-0.75,0.062-0.625,0.062-0.73438,0.2187c-0.10937,0.1563-0.40625,0.3438-0.40625,0.4375,0,0.094-0.125,1.1563-0.125,1.1563l-0.21875,1s-0.89062,0.9531-0.98437,1.0156c-0.0937,0.062-1.8594,0.9844-1.8594,0.9844l-1.0625-0.2969-0.89062-0.75-1.1562-0.7969-1.1094-0.8125-2.0469-0.2812-0.875-0.5938s-1-1.6718-1-1.7343c0-0.062-0.26563-1.5782-0.26563-1.5782l-0.10937-2.0468-1.0156-1.1407-2.1719-1.1093-0.59375-0.8594-0.6875-0.9688-1.0938,0.078-0.96875,0.75-1.0781-0.4062-2.5781-0.9531-1.9531-1.1719-2.0469-0.2188-1.1719,0.078-0.45312,0.3594-0.10938,1.4063,0.34375,1.2187,0.92188,1.1719-0.0937,1.0781,0.73437,0.7813,1.1094,1.5468,0.17187,2-0.89062,0.5313s-1.5312-0.1406-1.5938-0.1406c-0.0625,0-1.0781-0.2032-1.2812-0.1094-0.20313,0.094-0.78125,0.375-0.84375,0.4844-0.0625,0.1093-0.28125,0.7031-0.32813,0.875-0.0469,0.1718,0.0156,0.5937,0.0156,0.5937s-0.0312,0.125,0.54687,0.3281c0.57813,0.2032,1.8594,0.8125,1.8594,0.8125l-0.23438,0.6094-0.125,1.4688,1.2812,0.9687-0.625,1.25-0.51562,0.3125-0.17188,1.2188,2.0781,1.3281,1.4688,0.7344,1.8281,0.75,0.82813,1.5,0.89062,2.125-1.1719-1.9063-0.82813-1.4062-1.8594-1-1.4688-0.1094-2.4375-0.1719-1.875-0.5156-1.4844,0.062-0.29687,0.7969-0.8125,1.2031-0.0156,2.4375-0.20312,1.2812-0.46875,0.3438s-0.53125-0.3594-0.71875-0.5313c-0.1875-0.1718-1.3281-0.7812-1.3281-0.7812l-0.96875,0.2187-0.45312,0.3282s-0.84375-0.1875-0.9375-0.2344c-0.0937-0.047-0.90625-1.0313-0.90625-1.0313s-0.10938-0.25-0.10938-0.9375-0.6875-1.2968-0.6875-1.2968l-4.7344-0.016-2.2344-0.094-1.7812-0.062s-0.875,0.25-0.95312,0.3281c-0.0781,0.078-0.67188,0.7656-0.67188,0.7656l-0.51562,1.6875-1.1875,1.0938,0.10937,1.6406-0.25,0.9375,0.26563,0.9219,0.34375,0.6406,1.0469,0.3906,0.3125,0.4219,0.125,0.7969-0.23437,1.0781-0.59375,0.6719-0.35938,0.9375-0.79687,1.9375-1,1.75-0.29688,2.2031-0.53125,0.4844s-0.10937,0.5937-0.15625,0.6719c-0.0469,0.078-0.23437,0.6093-0.3125,0.625-0.0781,0.016-0.625,0.1718-0.9375,0.1406-0.3125-0.031-0.46875-0.016-0.59375-0.1563-0.125-0.1406-0.29687-0.5156-0.4375-0.5781-0.14062-0.062-0.39062-0.2344-0.67187-0.2187-0.28125,0.016-0.23438-0.062-0.54688,0.1093-0.3125,0.1719-0.59375,0.2188-0.625,0.4844-0.0312,0.2656-0.0156,1.25-0.17187,1.3906-0.15625,0.1407-0.59375,1.0938-0.59375,1.0938s0.67187,0.5312,0.76562,0.5937c0.0937,0.062,1.25,0.4063,1.3281,0.4219,0.0781,0.016,1.1406,0.8906,1.1406,0.8906l0.625,0.8438-0.25,2.7969-0.9375,0.6406-0.78125,0.5625-1.2188,0.3594-1.7031,1.1718-0.3125,1.25,0.875,1.1563s-0.45313,0.875-0.54688,0.9375c-0.0937,0.062-1.1875,0.3125-1.1875,0.3125l-3.8125-0.047-0.51562,0.016-1.2969-0.8594-2.1562-0.078s-0.67187,0.5625-0.70312,0.6875c-0.0312,0.125-0.54688,1.3125-0.54688,1.3125l0.14063,1.7188,0.92187,1.1406,0.14063,2.0781,0.70312,1.0313,0.15625,1.8906-1.2969,0.9531-1.1094,0.7656-0.64062,1.4532-0.0312,2.8906s-0.45313,0.1406-0.5625,0.1406c-0.10938,0-0.96875-0.125-1.0625-0.047-0.0937,0.078-0.96875,0.078-1.0312,0.2813-0.0625,0.2031,0.23437,1.0781,0.23437,1.0781l0.79688,0.8594,0.64062,1.0312-0.79687,1.375-0.125,2.75,0.85937,1.2188,1.0156,1.2968-0.59375,1.1719-0.3125,0.5625s-0.0781,0.2031,0.10937,0.2969c0.1875,0.094,0.75,0.3437,0.75,0.3437l0.92188,1v1.5157s-0.64063,0.7343-0.71875,0.7968c-0.0781,0.062-0.76563,0.4844-0.76563,0.4844l-0.75,0.9531-1.4375,0.9844-0.29687,1.3125-0.67188,0.6094s-0.0312,0.875,0,0.9844c0.0312,0.1093,0.14063,0.2656,0.40625,0.6875,0.26563,0.4218,0.84375,2.2343,0.84375,2.2343l1.5156,1.3594,1.375,0.25s0.40625,0.3438,0.5,0.5625c0.0937,0.2188,0.25,0.6563,0.25,0.875,0,0.2188-0.5,1.1563-0.57813,1.2031-0.0781,0.047-1.4219,1.2813-1.4219,1.2813s-0.875,0.4531-0.90625,0.6094c-0.0312,0.1562-0.375,0.75-0.3125,0.9375s0.125,0.9218,0.17187,1.1718c0.0469,0.25,0.46875,1.1094,0.46875,1.1094l0.95313-0.031,0.45312,2.0625,0.71875,1.0156,0.28125,0.5938,0.35938,1.6094,0.51562,0.7968,1.0625,0.2813,1.4375-0.2031s0.48438,0.2812,0.59375,0.4687c0.10938,0.1875,0.20313,0.6094,0.375,0.8125,0.17188,0.2031,0.35938,0.4219,0.54688,0.4531,0.1875,0.031,1.2344,0.1719,1.4531,0.1719,0.21875,0,1.4219-0.016,1.4219-0.016l1.7656-0.1094,0.95313,0.1407s0.34375,0.25,0.42187,0.4375c0.0781,0.1875,0.0937,0.5312,0.21875,0.7343,0.125,0.2032,0.39063,0.5938,0.5,0.7344,0.10938,0.1406,0.39063,0.5781,0.48438,0.6719,0.0937,0.094,0.54687,0.1562,0.85937,0.1875,0.3125,0.031,1.1094,0.062,1.2031,0.062s0.70312-0.016,0.85937,0.094c0.15625,0.1094,0.51563,0.3906,0.71875,0.4844,0.20313,0.094,0.90625,0.2968,1.125,0.2968s1.3594,0.2657,1.3594,0.2657,0.625,0.3281,0.76562,0.5c0.14063,0.1718,0.23438,2.0625,0.23438,2.0625s-0.625,0.2343-0.73438,0.3906c-0.10937,0.1562-0.85937,0.6719-1.0469,0.7656-0.1875,0.094-2.6094,1.9844-2.6094,1.9844l-1.8281,1.7344-0.92188,1.8125,0.0156,2.9843-1.0156,1.1407-1.7969,2.3906-0.82813,1.0781s-0.40625,0.875-0.40625,0.9375c0,0.062,0.10938,3.1875,0.10938,3.1875l-0.85938,1.9375-0.9375,1.5156-0.23437,0.6407-0.0625,0.9531,0.0937,0.8281,0.53125,0.5938z").attr(attr);
            eur.lu = R.path("m427.46,271.74-0.14062-1.1562,0.32812-1.0156,0.67188-0.4375,0.32812-0.1563,1.3125-1.2031,0.51563-0.9063,0.0625-0.3906-0.23438-0.7812-0.5-0.6094-1.3438-0.2031-1.5781-1.3907-0.64063-1.8906-0.625-1.0469,0.0156-0.9687,0.6875-0.6406,0.26562-1.2188-1.2031-0.1562-1.0469,0.1875-1.2656,0.7031-1.1406,1.3281-0.5,0.7031-0.8125,1.3594-0.0625,2.4844-0.0156,1.25,0.89062,0.875,0.0156,2.2656-0.78125,0.7656-0.0781,1,0.71875,0.7657,0.64063,0.4062,1.1562,0.016s1.3281,0.1875,1.4688,0.2031c0.14062,0.016,1.25-0.2812,1.25-0.2812z").attr(attr);
            eur.nl = R.path("m426.06,239.66,0.68501,0.2651,0.88388-0.1988,0.3646-0.088,0.90598,0.1105,0.57453-0.1768-0.0221-2.8616,0.67396-1.4805,1.4032-0.9723,0.99436-0.7402-0.15468-1.9004-0.7071-1.0054-0.12154-2.1213-0.95017-1.127-0.11049-1.7014,0.55243-1.4143,0.70711-0.6076,2.1324,0.077,1.2706,0.8728,1.6794,0.022,2.6406,0.022,1.2485-0.3093,0.50823-0.9281-0.83969-1.1712,0.26516-1.2484,1.7125-1.1822,1.2264-0.3536,1.7125-1.1822,0.27621-2.7953-0.61871-0.8618-1.138-0.8728-1.3811-0.4419-0.71816-0.6077,0.48614-0.9944,0.19887-0.232,0.0773-1.3258,0.20992-0.221,0.3867-0.1657,0.29831-0.1437,0.22097,0,0.33146,0.077,0.29831,0.099,0.15468,0.099,0.12154,0.1878,0.19887,0.232,0.0663,0.1436s0.0884,0.088,0.14363,0.099c0.0552,0.011,0.23202,0.044,0.23202,0.044h0.37565l0.28726-0.022,0.26517-0.055,0.20992-0.077,0.12153-0.1105,0.0994-0.3425,0.13258-0.28721,0.12154-0.5193,0.48613-0.4861,0.30936-2.2098,1.0275-1.7567,1.149-2.8726,0.58557-0.674,0.24307-1.0938-0.12154-0.8065-0.3204-0.4198-1.0165-0.3978-0.37565-0.6298-0.20992-0.8949-1.4032-0.4751-0.66291-0.8397-0.0884-0.928-0.46404-0.8839-0.67396-0.1989-3.8338,0.1105-2.1213,0.011-1.0165-0.1989-0.60767-0.4419-0.74025-0.3094-0.88389-0.1436s-0.45299,0.2541-0.53033,0.3756c-0.0773,0.1216-0.54137,0.4862-0.54137,0.4862l-2.8947,0.1657-1.4142,0.7955-1.6241,1.1269-0.61872,0.8508-0.46404,0.9612-0.66291,1.1491,0.0994,1.3921-0.51928,0.8507-0.43089,1.1049,0.35355,0.7181,1.2485,0.1657,1.4474-0.077,0.48613,0.7072,0.20993,0.7623-1.3037,1.1711-0.20992,2.044,0.76235,0.5635,0.11048,0.2431,0.22097,0.3867,0.20992,0.1547,0.14363,0.066,0.95018,0.055,0.12153,0.077,0.0442,0.1325,0.13258,0.3757,0.0442,0.39771-0.90598,1.4695-1.4032,1.2816-1.0054,1.0607-1.0938,0.6298-1.0828,0.2762-1.9556-0.7845-0.65187-0.2762-1.3479-0.8286-0.60767-0.7292-0.70711-0.6409-0.0884-0.4971,0.0442-0.1768,0.26516-0.2099,0.51929-0.674,0.17677-0.37571-0.0221-0.5082-0.0442-0.3425,0.0442-2.6295,1.1932-0.2984,0.7071-0.1436,0.61872-0.066,0.20993-0.055,0.18782-0.2541,0.0773-0.3204-0.0773-0.3094-0.35355-0.2541-0.60767-0.5193,0.0111-1.9445v-1.7346l0.011,0.7844-1.138-0.099-1.0828,0.1436-0.47509-0.2099-0.0331-1.9556,0.65187-1.6793,0.26516-1.3369-0.23202-0.3204-0.50823-0.044s-0.3646,0.1768-0.47509,0.3093c-0.11048,0.1326-0.62976,0.6298-0.68501,0.6961-0.0552,0.066-0.47508,2.0661-0.47508,2.0661l-0.69606,1.4031-0.26517,1.4032-0.78444,0.8286s-0.35356,1.138-0.3867,1.1822c-0.0331,0.044-0.71816,1.0828-0.71816,1.0828l-0.19887,1.4142-0.7955,1.8672-0.90598,1.5358-0.37565,1.4252-0.86178,0.895-0.82864,1.1711-1.2043,1.5357-1.0828,0.8729-0.91703,0.5745-1.0496,0.8065-1.2706,0.2542s-0.45299,0.1436-0.48613,0.232c-0.0331,0.088-0.24307,0.4198-0.25412,0.4972-0.011,0.077-0.22097,1.602-0.22097,1.602l-1.1712,0.7182-0.89493,0.011-0.57452,0.8176-0.69606,0.1657-0.3646,0.453-0.0442,0.453,0.41985-0.055,0.3425,0.1657,0.34251,0.1657,0.14363,0.2099,0.25412,0.7955,0.27621,0.5856,0.39775,0.2541,0.27621,0.055,0.28726,0.022,0.29831,0.066,0.91703,0.066,0.54138,0.2762,0.43089,0.3536-0.13258,0.5193-0.33145,0.3314-0.28727,0.2321-0.39774,0.2762-0.16573,0.2651-0.11049,0.232-0.0442,0.2431-0.0221,0.3646v0.1547l0.18783,0.221,0.33145,0.1988,0.37565,0.1216,0.45299,0.2099,0.26517,0.1768,0.0552,0.1988,0.0442,0.2542,0.0442,0.2541,0.0442,0.1878-0.0552,0.1878,0.43089,0.3757,0.68501,0.2541s0.50824,0.011,0.55243,0c0.0442-0.011,0.19887-0.1436,0.26517-0.2873,0.0663-0.1436,0.55242-1.2484,0.55242-1.2484l0.44194-0.4088,0.7734,0.2099s0.30936,0.3867,0.4088,0.464c0.0994,0.077,0.82864,0.2431,0.82864,0.2431l0.55243-0.055s0.54138,0.011,0.58557,0.011c0.0442,0,0.88388,0.1878,0.88388,0.1878l0.87284,0.2652,1.0938,0.4309,1.7788,1.1048,0.41984,1.0717,0.0994,0.9281s0.0331,0.5635,0.0884,0.6298c0.0552,0.066,0.16573,0.243,0.41984,0.3535,0.25412,0.1105,1.3148,0.221,1.4584,0.232,0.14363,0.011,1.5799,0.011,1.5799,0.011s0.17678,0.3094,0.35356,0.3978c0.17677,0.088,0.3867,0.1989,0.60767,0.3535,0.22097,0.1547,0.71815,0.5525,0.83969,0.6188,0.12153,0.066,0.39774,0.232,0.39774,0.232l1.2595,1.0054,0.59662,0.4198s0.0994,0.2873,0.0884,0.3867c-0.011,0.099-0.0331,0.2873-0.12154,0.3867-0.0884,0.099-0.22097,0.3425-0.27621,0.3757-0.0552,0.033-0.24307,0.2652-0.26517,0.2983-0.0221,0.033-0.11048,0.1657-0.11048,0.221,0,0.055,0.23202,0.5414,0.23202,0.5414z").attr(attr);
            eur.nl1 = R.path("m431.57,191.43-2.1545-0.1325-1.602,0-1.6573,0.044s-0.81759,0.077-0.81759,0.1878c0,0.1105-0.17678,0.6629-0.14363,0.7955,0.0332,0.1326-0.0552,0.3535,0.0552,0.4309,0.11049,0.077,0.0994,0.1326,0.29831,0.1768,0.19888,0.044,0.14363,0.077,0.4088,0.088,0.26516,0.011,0.60767,0.033,0.7292,0.011,0.12154-0.022,0.25412,0,0.35356-0.1105,0.0994-0.1105,0.13258-0.055,0.27621-0.2652,0.14363-0.2099,0.20992-0.3204,0.32041-0.3867,0.11048-0.066,0.37565-0.1989,0.37565-0.1989s-0.0221,0.033,0.29831,0.044,0.33146,0.011,0.44194,0.022c0.11049,0.011,0.4088,0.044,0.7513,0.044,0.34251,0-0.0773,0.1326,0.60767,0.022,0.68501-0.1105,0.68501-0.088,0.81759-0.1326,0.13259-0.044,0.49719-0.3204,0.49719-0.3204z").attr(attr);
            eur.nl22 = R.path("m427.62,245.77,0.0442-1.4142,0.80654-1.4363-0.65187-0.9944-0.78444-0.8618-0.26517-1.1048-0.68501-0.2762-1.1711-0.088-0.53033,0.7402-0.7734,1.3701-0.19887,2.6848-0.0221,0.7402s-0.0552,0.2431-0.0221,0.3094c0.0331,0.066,0.14363,0.2762,0.14363,0.2762l0.48614,0.1657s0.76235,0.022,1.0496-0.022c0.28726-0.044,0.7734-0.077,0.87284-0.088,0.0994-0.011,0.71815,0,0.82864,0h0.87283z").attr(attr);
            eur.nl3 = R.path("m427.34,198.65,0.0156,1.2812-0.5,0.8125-0.4375,1.1407,0.32812,0.7187s1.1875,0.1875,1.3125,0.1719c0.125-0.016,1.3906-0.078,1.3906-0.078l0.48437,0.7031,0.23438,0.7656-1.3125,1.2032-0.21875,2s0.8125,0.5468,0.79687,0.6406c-0.0156,0.094,0.32813,0.7187,0.57813,0.75,0.25,0.031,1.0312,0.031,1.1406,0.1562,0.10938,0.125,0.25,0.9219,0.25,0.9219l-0.90625,1.4531-1.5156,1.3907-0.89063,0.9843-1.0938,0.6094s-1.0156,0.2656-1.0781,0.2813c-0.0625,0.016-1.2969-0.5157-1.2969-0.5157s-1.25-0.5156-1.3281-0.5312c-0.0781-0.016-1.3281-0.8438-1.3281-0.8438l-0.625-0.7031-0.6875-0.6562s-0.1875-0.5313-0.10937-0.6094c0.0781-0.078,0.40625-0.4844,0.57812-0.6719,0.17188-0.1875,0.375-0.4062,0.40625-0.7187,0.0312-0.3125-0.0312-0.7188-0.0312-0.7188l0.0312-2.7344s0.625-0.1093,1.0156-0.2343c0.39062-0.125,1.7031-0.2813,1.7031-0.2813s0.21875-0.25,0.23438-0.4687c0.0156-0.2188-0.0781-0.4688-0.0781-0.4688l-0.9375-0.7344,0.0156-2.7812s0.0312-0.8281,0.14062-0.9063c0.10938-0.078,0.5-0.3593,0.76563-0.4687,0.26562-0.1094,0.625-0.3438,0.8125-0.3906,0.1875-0.047,1.0781-0.375,1.0781-0.375l0.625-0.2813,0.28125,0.047z").attr(attr);
            eur.nl44 = R.path("m397.48,225.43,0.0442-1.1712,0.28726-0.5303,0.57452-0.044s0.57453-0.022,0.70711-0.088,0.83969-0.4862,0.92808-0.5746c0.0884-0.088,0.0663-0.1325,0.22097-0.243,0.15468-0.1105,0.66291-0.5966,0.83969-0.685,0.17678-0.088,0.26516-0.3094,0.66291-0.3757,0.39775-0.066,0.70711-0.3535,1.0386-0.1767,0.33145,0.1767,0.66291,0.2209,0.7292,0.464,0.0663,0.2431,0.0884,0.2873,0.19887,0.6187,0.11049,0.3315,0.33146,0.7734,0.33146,0.7734s0.30936,0.2873,0.53033,0.2873,0.66291,0.1105,0.79549,0.1105c0.13259,0,0.90598,0.088,0.90598,0.088l0.46404,0.243,0.44195,0.3757s-0.0221,0.1767-0.0442,0.2872-0.13258,0.2652-0.22097,0.3978c-0.0884,0.1326-0.44194,0.3535-0.50823,0.4419-0.0663,0.088-0.44194,0.221-0.48614,0.3978-0.0442,0.1767-0.17678,0.1988-0.17678,0.464s-0.0663,0.5745-0.0663,0.5745,0.19888,0.3094,0.55243,0.4641,0.88388,0.3535,0.88388,0.3535l0.19888,0.1768,0.19887,0.8839-0.19887,0.3977-0.33146,0.1768-0.28726,0.221-0.39775,0.044-0.46404,0.044-0.79549-0.7955-1.6794-1.1049-1.9224-0.685-1.6131-0.6187-0.88389-0.3315h-0.22097l-0.41984-0.1546-0.66292-0.1105z").attr(attr);
            eur.nl5 = R.path("m395.62,226.83s-0.0663,0.7955-0.0442,0.9281c0.0221,0.1325-0.17677,0.7734,0,0.9501,0.17678,0.1768,0.7734,0.7513,1.149,0.7955,0.37565,0.044,1.2816,0.044,1.6794,0.066,0.39775,0.022,1.1932,0.088,1.1932,0.088s0.75131,0.5966,0.8176,0.7292c0.0663,0.1326,0.59662,0.7292,0.68501,0.7955,0.0884,0.066,0.66291,0.4199,0.83969,0.442,0.17677,0.022,0.57452,0.022,0.92807-0.022,0.35356-0.044,0.41985-0.044,0.7734-0.1768,0.35355-0.1326,0.83969-0.221,1.0386-0.3315,0.19888-0.1105,0.59663-0.1767,0.75131-0.3756s0.33145-0.4199,0.33145-0.5966c0-0.1768,0.17678-0.2431-0.11048-0.5304-0.28727-0.2872-0.59662-0.5303-1.0607-0.8618-0.46404-0.3314-1.1712-0.7292-1.2595-0.7734-0.0884-0.044-1.8562-0.6629-1.8562-0.6629l-1.3258-0.5524s-1.0828-0.464-1.3037-0.464c-0.22097,0-0.99437-0.3315-1.3921-0.1989-0.39775,0.1326-1.8341,0.7513-1.8341,0.7513z").attr(attr);
            eur.be = R.path("m420.68,269.47,0.7513-0.7403,0-2.276-0.88389-0.8728,0.0773-3.7344,1.3369-2.0772,1.1159-1.3037,1.2153-0.674,1.1048-0.2099,1.1822,0.1326,1.4694-1.0165,0.7734-0.9612,0.7734-0.4861,0.71816-0.8176-0.0111-1.4805-0.91703-0.9944-0.78445-0.3756-0.12153-0.1216-0.0111-0.1547,0.12153-0.1767,0.82864-1.5689-1.1048-1.3811-0.7513-1.1159,0.0552-1.3148-0.95017-0.011-0.68501,0.044-0.67396,0.044-0.50824,0.066-0.81759-0.022-0.43089-0.1215-0.12154-0.1547-0.12153-0.2541,0.0773-0.2762,0.0442-1.0717,0.12154-1.7126,0.0663-0.5966,0.76235-1.3589,0.50823-0.6961,1.0386,0.044,0.0994-0.055-0.0331-0.1105-0.39775-0.8728,0.0111-0.1878,0.19887-0.1768,0.13258-0.1878,0.25412-0.3094,0.16573-0.2541,0-0.3315-0.0553-0.1878-0.0663-0.1436-0.51928-0.3094-0.68501-0.5524-0.58557-0.4972-0.86179-0.5524-0.61872-0.442-0.38669-0.1878-0.25412-0.2652-0.0994-0.1546-0.83969-0.022-0.92808,0-0.97227-0.1437-0.51928-0.1657-0.19887-0.2431-0.0773-0.3535-0.14363-1.2375-0.39775-1.0496-1.4584-0.9391-0.3646-0.1989-1.0386-0.4309-0.96123-0.2872-0.80654-0.1547-0.60767,0-0.54138,0.055-0.7734-0.232-0.47508-0.5082-0.72921-0.1768-0.47509,0.3756-0.56347,1.3479-0.23202,0.221-0.55243,0-0.7292-0.2983-0.39775-0.3093-0.17678,0.2209-0.51928,0.3204-0.86178,0.1437-0.15468,0.2209-0.0111,0.2983-0.30936,0.3536-0.54138,0.3315-0.56348,0.1657-0.85073,0.2983-0.8176,0.1105-0.7071,0-0.61872-0.2983-0.44194-0.3536-0.34251-0.4088-0.18782-0.2651-0.71816-0.6298-1.4805-0.099-1.4474-0.055-0.51928-0.2652-0.50824-0.4309-0.16572-0.1988,0.011-0.3647,0.0994-0.3646,0.0221-1.0054-1.2043-0.243-1.2927,0.8728-2.044,0.2652-0.80655,0.6297-1.5799,0.2541-1.2816,0.9502-1.9777,0.3757-0.69606,0.5413-0.25411,1.5579-0.0111,1.7236,0,1.7677,0.0884,0.9944,0.77339,0.9944,0.59663,0.9943,0.81759,0.1658s1.0165,0.099,1.1159,0.066,0.50823-0.1989,0.59662-0.2321c0.0884-0.033,1.0054-0.7623,1.0054-0.7623l0.93913-0.1436s0.66291,0.232,0.74025,0.3756c0.0773,0.1436,0.29831,0.5745,0.29831,0.6298,0,0.055,0.0331,1.4031,0.0331,1.4031v1.7678l0.0442,1.6794,0.80654,0.9391,1.3258,0.2873,0.78444,0.022,0.54138,0.2541s0.35356,0.4088,0.37565,0.5082c0.0221,0.099,0.0884,0.4972,0.0884,0.4972l0.12154,1.37-0.0884,0.9171,0.33145,0.4198s0.46404,0.1989,0.70711,0.1878c0.24307-0.011,2.8174,0.088,2.8174,0.088l0.76235,0.5083,0.82864,0.3204,1.2374,1.1601s0.13258,0.5192,0.0994,0.6518c-0.0331,0.1326-0.41984,0.5746-0.51928,0.7071-0.0994,0.1326-1.1159,0.9502-1.1159,0.9502s-0.12154,0.3204-0.0884,0.3978c0.0331,0.077,0.28726,0.3535,0.4088,0.5082,0.12153,0.1547,0.40879,0.4751,0.40879,0.4751s-0.13258,0.685-0.14363,0.7292c-0.0111,0.044-0.37565,0.464-0.41984,0.4972-0.0442,0.033-0.34251,0.9059-0.34251,0.9059s-0.0111,0.5525,0.0111,0.6077c0.0221,0.055,0.17678,0.4309,0.30936,0.4309s0.69606,0.1989,1.138,0.1105c0.44194-0.088,0.91703-0.1878,1.1711-0.2099,0.25412-0.022,3.5576-0.088,3.5576-0.088l0.85073-0.8397,0.7513-1.0054,0.99437-1.0496s0.74026-0.1879,0.80655-0.088c0.0663,0.099,0.30936,0.3646,0.39774,0.6076,0.0884,0.2431,0.26517,0.3757,0.14364,0.5083-0.12154,0.1325-0.70711,0.3867-0.89494,0.5745-0.18782,0.1878-0.30936,2.497-0.30936,2.497l-0.0442,1.4252s-0.53033,0.4861-0.57452,0.5524c-0.0442,0.066-0.3867,0.3536-0.33146,0.5083,0.0552,0.1546-0.12153,0.1105,0.0994,0.3535,0.22097,0.2431,0.54138,0.4862,0.58557,0.5193,0.0442,0.033,1.4253,0.7182,1.4253,0.7182l0.96122,0.4088,1.0054,1.1269,1.7678,1.2706,0.27621,0.8397,0.95018,0.3204s0.0773,0.5414,0.0884,0.6518c0.011,0.1105-0.0442,0.7956-0.0442,0.7956s-0.0773,0.1988-0.11048,0.4198c-0.0331,0.221-0.14363,0.4751-0.13259,0.5635,0.0111,0.088-0.0663,0.1878,0.20993,0.3204,0.27621,0.1326,0.65186,0.1989,0.86178,0.221,0.20992,0.022,0.76235,0.055,0.96123,0.055,0.19887,0,0.78444-0.099,1.1048-0.088,0.32041,0.011,0.83969,0,1.0386-0.022,0.19888-0.022,1.1932-0.3425,1.1932-0.3425z").attr(attr);
            eur.ad = R.path("m332.7,393.63,1.0781,0.016s0.60938,0.3437,0.6875,0.4531c0.0781,0.1094,0.25,0.4375,0.34375,0.4687,0.0937,0.031,0.375,0.2032,0.59375,0.3438s0.48438,0.25,0.625,0.4375c0.14063,0.1875,0.32813,0.4375,0.34375,0.5469,0.0156,0.1093-0.0469,0.7031-0.0469,0.7031s-0.375,0.5781-0.5,0.7344c-0.125,0.1562-0.35938,0.3125-0.45313,0.3593-0.0937,0.047-0.60937,0.094-0.71875,0.1407-0.10937,0.047-0.42187,0.078-0.5625,0.1875-0.14062,0.1093-0.40625,0.1875-0.40625,0.1875s-0.125,0.047-0.23437,0.031c-0.10938-0.016-0.57813-0.2032-0.57813-0.2032l-0.65625-0.2656-0.3125-0.1875-0.39062-0.2969-0.1875-0.3125s-0.125-0.1718-0.0781-0.3906c0.0469-0.2187,0.0312-0.25,0.0312-0.4844,0-0.2343-0.0625-0.4531-0.0469-0.6406s-0.0625-0.1562,0.125-0.4375c0.1875-0.2812,0.14062-0.2969,0.26562-0.4375s0-0.1406,0.21875-0.3125,0.28125-0.2187,0.4375-0.3437,0.42188-0.2969,0.42188-0.2969z").attr(attr);
            eur.es = R.path("m355.59,403.48-0.78445-0.099-1.4695-0.6408-2.3644-0.1436-0.29832,0.011-0.97227-0.055-0.68501,0.3093-0.61872,0.5746-0.81759,0.1436-0.82864,0.044-0.59662-0.3204-0.44194-0.5303-0.76235-0.3204-1.0607-0.674-2.055-0.099-0.78445-0.1215-1.1711,0.1547-0.90598-0.011-0.27622-0.1216-0.26516-0.4972,0.0884-0.7623-0.99437-0.9723-0.13258-0.1989-0.37566-0.243-1.2595-0.3646-0.22097-0.9613-0.55243,0.1658-0.62976,0.1436-0.28727,0.099-0.3646,0.221-0.26516,0.022-0.78445-0.2873-0.47509-0.221-0.49718-0.2983-0.23202-0.2209-0.20992-0.3757-0.0111-0.2652,0.0663-0.2872,0-0.3757-0.0884-0.3646,0.0111-0.2099,0.0773-0.1989,0.27621-0.4419,0.0994-0.221,0.3646-0.3646-1.0607-1.2043-0.87283-1.1932-1.6904-0.1216-0.57452-0.1767-0.69606-1.359-0.26517-0.2652-0.69606-0.8286-0.68501-0.5193-0.40879-0.464-1.3148-0.3536-0.14363-0.066-0.0331-0.1657-0.29831-0.5524-0.19887-0.1879-0.50823-0.1104-0.99437,0.232-0.25412,1.1932,0.0994,0.685-0.0221,0.3757-0.0994,0.1988-0.0773,0.1879-0.0994,0.1215s-0.14363,0.077-0.18783,0.088-0.55242,0.066-0.55242,0.066l-0.65187-0.022-0.26516,0.033-0.56348-0.1215-0.20992-0.088-0.27622-0.2099-0.37565-0.3315-0.16572-0.1768-0.20993-0.066-0.53033,0.088-1.8451,0.022-0.49719-0.3535-0.29831-0.2763-0.71815-0.4308h-0.8176l-1.37-0.088-1.0165-0.077-0.16573-0.077-0.12153-0.221-0.16573-0.1989-0.3867-0.2873-0.12153-0.1878,0.0221-0.3204-0.28726-1.2043-0.0773-0.1546-0.64081-0.3867-0.453-0.442-0.90598-0.3094-1.2043-0.099-1.2264,0.044-0.97227,0.089-1.2927-0.3978-0.13258-0.099-0.0773-0.1436,0.0442-0.2983,0.0442-0.4088-0.18783-1.3701-0.13258-0.8175-0.23202-0.2762-0.3646-0.221-0.48614-0.5967-0.64081-0.5082-1.3258-0.055-1.0717-0.7955-1.5578-0.1878-0.90598-0.3756-1.1159-1.0497-1.591-0.685-0.18783-0.1215-0.11048-0.2652,0.0221-0.4088-0.0111-0.3867,0.18783-0.2099,0.56348-0.3094,0.57452-0.7954,0.81759-0.9171-0.50823-1.1048-0.49719-0.3646-1.0828,0.033-0.7513-0.1437-1.4253-0.928,0.0221-1.8451-0.92808-0.089-0.96122-0.8065-1.0275,0.2873-1.5247,0.3867-2.5301,0.1988-1.0054-0.1657-1.359-0.7955-1.2595-1.0275-0.85074-0.2431-0.69606-0.7623-0.96122-0.7292-0.88388-0.3536s-0.60767-0.1767-0.62977-0.243c-0.0221-0.066-0.22097-0.3315-0.22097-0.4199,0-0.088-0.0331-0.2651-0.0884-0.4309-0.0552-0.1657-0.81759-0.8839-0.81759-0.8839s-1.6462-0.1878-1.812-0.1657c-0.16573,0.022-1.149-0.232-1.3037-0.077-0.15468,0.1547-0.44194,0.6961-0.50824,0.8287-0.0663,0.1325-0.39774,0.4309-0.53033,0.4861-0.13258,0.055-0.37565,0.055-0.50823,0s-0.61872-0.3867-0.61872-0.3867l-0.97227-0.8618s-0.54138-0.7513-0.55243-0.8176c-0.011-0.066-0.71815-0.8397-0.71815-0.8397l-1.6573-0.7513s-0.3867-0.5634-0.41985-0.6408c-0.0331-0.077,0.0884-0.3977-0.3425-0.5193-0.4309-0.1215-1.2043-0.3535-1.2043-0.3535s-0.4309-0.044-0.59662-0.044c-0.16573,0-0.58558-0.066-0.78445-0.066-0.19888,0-0.37565,0.1547-0.71816-0.099-0.3425-0.2541-0.60767-0.4309-0.60767-0.4309s-0.13258-0.1216-0.56347-0.1768c-0.4309-0.055-0.45299-0.077-0.78445-0.099s-0.44194-0.1657-0.7513,0-0.33146,0.055-0.56348,0.3204c-0.23202,0.2652-0.22097,0.232-0.48613,0.4199-0.26517,0.1878-0.83969,0.1767-0.87284,0.1325-0.0331-0.044-0.0884-0.1878-0.33145-0.3646-0.24307-0.1767-0.49719-0.4198-0.72921-0.475-0.23202-0.055,0.13259-0.2431-0.76235-0.1879-0.89493,0.055-1.0054,0.055-1.2043,0.055-0.19887,0-1.2264-0.1436-1.2264-0.1436s-0.23202-0.022-0.3204-0.055c-0.0884-0.033-0.27622-0.1657-0.4088-0.1989-0.13258-0.033-0.89493-0.3425-0.89493-0.3425s-0.41985-0.033-0.65187-0.1878c-0.23202-0.1547-0.20992-0.1768-0.56347-0.3536-0.35355-0.1767-0.53033-0.3425-0.83969-0.4198-0.30936-0.077-0.46404-0.1105-0.67396-0.1547-0.20992-0.044-0.0663,0.1768-0.44194-0.1326-0.37565-0.3093-0.30936-0.3314-0.7513-0.5193-0.44195-0.1878-0.39775-0.1325-0.67397-0.2762-0.27621-0.1436-0.3204-0.221-0.53033-0.2541-0.20992-0.033-2.2318-0.9944-2.2318-0.9944l-0.7734-0.4971-0.80654-0.4199s-0.24307-0.088-0.39775-0.2762c-0.15468-0.1878-0.28726-0.2983-0.54138-0.4861-0.25412-0.1879-0.65186-0.453-0.65186-0.453l-0.72921-0.8839s-0.7734-0.2873-0.81759-0.3094c-0.0442-0.022-0.97227-0.5303-0.97227-0.5303s-0.59662-0.2652-0.64082-0.3536c-0.0442-0.088,0.0663-0.2872-0.41984-0.3977s-1.0275-0.1989-1.0275-0.1989l-0.49718-0.055c-0.11049-0.055-0.45299-0.1989-0.48614-0.2541-0.0331-0.055-0.25411-0.232-0.25411-0.232l-0.28727-1.1159s-0.51928-0.5414-0.53033-0.5856c-0.011-0.044-0.35355-0.7403-0.35355-0.7403s-0.51928-0.2209-0.61872-0.2209c-0.0994,0-0.48613-0.077-0.62976,0.022-0.14364,0.099-0.0884,0.055-0.34251,0.2872-0.25412,0.2321-0.35355,0.2873-0.48613,0.3646-0.13259,0.077,0.16572,0.1105-0.37566,0.1547-0.54137,0.044-0.49718,0.1878-0.80654,0s-0.29831-0.221-0.53033-0.3646,0.13258-0.066-0.57452-0.2651c-0.70711-0.1989-0.49719-0.011-0.8176-0.2763-0.3204-0.2651-0.24306-0.2209-0.48613-0.4087-0.24307-0.1879-0.25412-0.3315-0.58557-0.3757-0.33146-0.044-0.65187-0.077-0.72921-0.1105-0.0773-0.033-2.4528,0.033-2.4528,0.033l-0.59663-0.088s-0.69605-0.1878-0.76235-0.2983-0.48613-0.3867-0.54137-0.4309c-0.0553-0.044-0.71816-0.2873-0.86179-0.2873s-0.22097,0.2542-0.43089-0.066c-0.20993-0.3204-1.1601-0.6408-1.1601-0.6408s0.0331-0.066-0.4088-0.1436c-0.44194-0.077-2.0219-0.5414-2.0219-0.5414s-0.56348-0.5303-0.98332-0.6077c-0.41985-0.077-1.0717-0.1988-1.1712-0.1657-0.0994,0.033-0.55242,0.099-0.55242,0.099s-1.0828-0.099-1.1049-0.1547c-0.0221-0.055-0.11048-0.3093-0.27621-0.475-0.16573-0.1658-0.3646-0.221-0.49719-0.4309-0.13258-0.21-0.58557-0.5414-0.62976-0.6409-0.0442-0.099-0.23202-0.2099-0.26517-0.3867-0.0331-0.1767-0.17677-1.5468-0.17677-1.5468s-0.0884-0.2762-0.0994-0.475c-0.011-0.1989,0.17678-0.2321-0.14363-0.453-0.32041-0.221-0.60767-0.3425-0.72921-0.3646-0.12153-0.022-0.57452-0.1768-0.88388-0.1768s-0.71816-0.077-0.71816-0.077-0.30935-0.685-0.3425-0.7955c-0.0332-0.1105,0.13258-0.1989-0.35355-0.4419-0.48614-0.2431-0.68501-0.4309-1.0496-0.4309-0.3646,0-0.7292-0.033-0.7292-0.033s-0.86179-0.4088-0.92808-0.4641c-0.0663-0.055,0.0553-0.3867-0.43089-0.3977-0.48614-0.011-0.82864-0.088-0.96122-0.088-0.13259,0-0.4309-0.011-0.57453-0.011s-0.51928-0.066-0.7734-0.055c-0.25411,0.011-0.68501-0.044-0.82864,0.044s-0.11048,0.011-0.33145,0.1989c-0.22097,0.1878-0.3646,0.2099-0.54138,0.3204s-0.0663,0.1325-0.3867,0.1767c-0.32041,0.044-0.33146-0.022-0.76235,0.055s-0.58557,0.1215-0.62977,0.1546c-0.0442,0.033-0.53033,0.3315-0.7513,0.4972s-0.19887,0.1547-0.33145,0.232c-0.13259,0.077,1.2264,0.055-0.35356,0.1658-1.5799,0.1104-1.6904,0.1104-1.6904,0.1104l-0.48614,0.3094-0.23202,0.1878-0.11049,0.1547s-1.6683,0.2983-1.7346,0.3315c-0.0663,0.033-0.15468-0.066-0.41984,0.1657-0.26517,0.232-0.34251,0.2762-0.51928,0.3977-0.17678,0.1216-0.55243,0.2321-0.55243,0.2321s-0.0221,0.066-0.15468,0.1215c-0.13258,0.055-1.2595,0.221-1.2595,0.221l-0.44195,0.077c-0.13258,0.077-0.27621,0.077-0.43089,0.2762-0.15468,0.1989-0.49718,0.3425-0.61872,0.3646-0.12153,0.022-0.3204-0.022-0.57452,0.033s-3.7123,0.2541-3.7123,0.2541l-0.65187-0.099s-0.43089-0.044-0.56347,0.011-0.44194,0.088-0.70711,0.1989c-0.26516,0.1105-0.61872,0.3535-0.61872,0.3535l-1.2153,0.5304s-0.3425,0.055-0.3867,0.1436c-0.0442,0.088-0.16572,0.2651-0.24306,0.3977-0.0773,0.1326-0.20993,0.442-0.20993,0.442l-0.0552,0.1215,0.16573,1.3037-0.48614,0.6629s-0.39774,0.077-0.40879,0.2542c-0.0111,0.1767-0.0884,0.3535,0,0.4309,0.0884,0.077,0.0884,0.1988,0.32041,0.2762,0.23201,0.077,0.60767,0.2209,0.67396,0.2541,0.0663,0.033,0.55242,0.2983,0.55242,0.2983s0.0773,2.055,0.0773,2.1103c0,0.055-0.0442,0.1767,0.0663,0.232,0.11049,0.055,0.4088,0.2431,0.49719,0.3425,0.0884,0.099,0.19887,0.232,0.25412,0.2983,0.0552,0.066,0.19887,0.1989,0.19887,0.1989l0.011,0.8728-0.48614,0.7624s-0.26516,0.1767-0.40879,0.2872-0.35356,0.1326-0.45299,0.2431c-0.0994,0.1105-0.44195,0.2099-0.46404,0.5414-0.0221,0.3314-0.14363,0.3756-0.0331,0.6739,0.11049,0.2983,0,0.3646,0.27621,0.6629,0.27622,0.2984,0.35356,0.3978,0.57453,0.6409,0.22097,0.243,0.30936,0.3756,0.30936,0.3756l0.26516,0.3094v1.0054s-0.3646,0.5635-0.33145,0.6408c0.0331,0.077,0.0773,0.2983,0.40879,0.3757,0.33146,0.077,1.7125,0.4529,1.7125,0.4529s0.0884,0.066,0.0442,0.2431c-0.0442,0.1768,0.0552,0.044-0.19887,0.3204-0.25412,0.2762-0.39775,0.4199-0.56348,0.5193-0.16573,0.099-0.23202,0.077-0.46404,0.1657-0.23202,0.088-0.7071,0.221-0.7071,0.221s-0.0663,0.5303-0.13259,0.8507c-0.0663,0.3204-0.14363,0.4641-0.24306,0.7955-0.0994,0.3315-0.18783,0.4972-0.26517,0.6961-0.0773,0.1989,0.15468,0.3093-0.18782,0.3977-0.34251,0.088-0.29831-0.011-0.55243,0.1105-0.25412,0.1216-0.7513,0.2983-0.7513,0.2983l-0.41985,0.9171-0.41984,0.917s-0.3646,0.4088-0.3646,0.4861c0,0.077-0.0442,0.3646-0.0553,0.4972-0.011,0.1326,0.011,1.3811,0.011,1.3811v0.6408h1.138l0.60767-0.7182s0.53033-0.232,0.85074-0.2541c0.32041-0.022,1.1932,0.077,1.2706,0.044,0.0773-0.033,0.19888-0.066,0.29831-0.2762,0.0994-0.2099,0.14363-0.4751,0.33146-0.5745,0.18782-0.099,0.3425-0.1768,0.54138-0.1989,0.19887-0.022,3.7013,0.066,3.7013,0.066l0.71816-0.022s0.46403,0.033,0.53033,0.1215c0.0663,0.088,0.19887,0.4199,0.24306,0.4972,0.0442,0.077,0.16573,0.232,0.30936,0.2652,0.14363,0.033,0.65187,0.1326,0.65187,0.1326l0.59662,0.1989s0.30936,0.3204,0.33145,0.3867c0.0221,0.066,0.15468,0.2541,0.15468,0.3756s-0.0221,0.674-0.0221,0.674l-1.4916,0.917-0.88388,0.4751-0.57452,0.4861s-0.28727,1.1049-0.29831,1.1601c-0.011,0.055-0.0442,1.0717,0.011,1.0938,0.0553,0.022,1.0828,0.2652,1.149,0.2762,0.0663,0.011,1.1601,0.1216,1.3479,0.033,0.18783-0.088,0.53033-0.077,0.67397-0.2983,0.14363-0.221,0.17677-0.4309,0.3204-0.5303,0.14363-0.099,0.61872-0.2873,0.61872-0.2873s1.0607,0.5524,1.0828,0.6187c0.0221,0.066,1.9887,0.3867,1.9887,0.3867l0.78444,0.453s0.25412,0.674,0.30936,0.7624c0.0553,0.088,0.33146,0.5414,0.4088,0.5745,0.0773,0.033,0.44194,0.044,0.62977,0.1657,0.18782,0.1216,0.93912,0.8287,0.93912,0.8287l0.76235,0.917s0.64082,0.2762,0.71816,0.2983c0.0773,0.022,0.83969,0,0.98332-0.022s0.7513-0.4309,0.83969-0.4861c0.0884-0.055,1.5136-0.674,1.5136-0.674l0.78444-0.906,1.3258,0.1658,0.37565,0.7844s0.80654,0.1657,0.82864,0.2099c0.0221,0.044,0.7734,0.674,0.7734,0.674l1.602,0.4198,0.83969,0.7071s1.0607,0.1547,1.149,0.1879c0.0884,0.033,0.85074,0.3204,0.85074,0.3204s0.29831,0.3093,0.4309,0.5635c0.13258,0.2541,0.22097,2.1213,0.22097,2.1213l-0.45299,1.138s-0.44195,0.1989-0.48614,0.3425c-0.0442,0.1436-0.37565,0.906-0.3425,0.9723,0.0331,0.066,0.59662,0.6739,0.76235,0.7734,0.16572,0.099,1.1601,0.3977,1.2153,0.4198,0.0553,0.022,1.3921,0.5745,1.4142,0.6187,0.0221,0.044,0.58557,0.9833,0.58557,0.9833l0.27621,1.4695s-0.3425,0.3535-0.39774,0.3867c-0.0553,0.033-0.89493,0.8949-0.89493,0.8949s-0.37566,0.2541-0.453,0.3094c-0.0773,0.055-0.81759,0.3867-0.93912,0.4309-0.12154,0.044-1.359,0.5745-1.359,0.5745l-0.88389,0.7734s-0.29831,0.4972-0.49718,0.5414c-0.19887,0.044-1.8009,0.077-1.8562,0.077-0.0552,0-2.1655,0.044-2.1655,0.044l-1.4363,1.7015-1.8562,0.5855s-1.2816,0.033-1.2927,0.099c-0.011,0.066-0.33145,0.9392-0.33145,0.9392l0.0994,2.0881,0.57452,0.6409-0.29831,1.7898-0.22097,2.2871-0.54138,0.1325-0.57452,1.9777s-0.65187,0.453-0.74026,0.5193c-0.0884,0.066-1.1822,0.9281-1.1822,0.9281l0.0663,2.3312-0.7292,0.895-2.276,0.1878s-0.46404,0.5082-0.58558,0.6187c-0.12153,0.1105-0.46404,0.674-0.46404,0.674v2.1102l0.60767,0.5746s0.56348,1.0827,0.55243,1.138c-0.011,0.055-0.0884,0.5082-0.33145,0.7955-0.24307,0.2872-0.72921,1.1932-0.72921,1.1932l-0.55243,1.0054-0.49718,0.5524-0.87284,1.138s-0.93912,0.9171-0.98332,0.9281-0.99436,0.3425-0.99436,0.3425l-0.74026-0.2762-0.96122-0.5635-1.0938-0.3425-0.99437-0.5855-1.591-0.6077-0.59662-0.4309-0.62976-0.1657s-0.18783,0.088-0.25412,0.3204c-0.0663,0.232-0.23202,0.5414-0.19887,0.7513,0.0331,0.2099,0.0331,1.6131,0.0331,1.6131l1.127,1.4473-0.0111,2.5191-0.011,2.6627,0.0663,1.7788,0.92807,2.0771,0.68501,0.3757s0.91703,0.674,0.91703,0.7402c0,0.066,0.0773,0.5525-0.0221,0.6961s-0.65187,0.7624-0.65187,0.7624l-1.0717,1.1821-0.3867,1.359-0.71815,0.4751-2.7732,0.044-0.72921,0.6298-1.1048,1.3921-0.55243,1.4474-0.62977,0.6408-0.0994,2.8615,0.0221,2.6185,0.0773,1.2043,0.53033,0.4862,0.51928,0.5855s0.65187,0.221,0.88389,0.2652c0.23202,0.044,0.79549,0.2541,0.81759,0.3425,0.0221,0.088,0.18783,0.5303,0.18783,0.5966,0,0.066,0.011,0.6077,0.011,0.6077s-0.43089,0.6961-0.56347,0.7292c-0.13258,0.033-0.51928,0.2652-0.65187,0.3646-0.13258,0.099-0.59662,0.3867-0.67396,0.3978-0.0773,0.011-1.0386-0.1879-1.0938-0.1658-0.0553,0.022-2.5191,0.011-2.5191,0.011s-0.39775,0.5304-0.47509,0.5966c-0.0773,0.066-0.79549,0.6298-0.79549,0.6298l-0.49719,0.5193-0.59662,0.3535s-0.78445,0.8066-0.82864,0.8397c-0.0442,0.033-1.7788,0.9723-1.7788,0.9723l-1.3258,1.3037-0.28726,1.5579-0.92808,1.7788,0.0221,3.9664v1.6463l1.7678,0.243,0.48614,0.6408,0.85074,0.1547,0.91703,0.2099,0.95017,0.7182,1.149,0.3646,1.3037,0.5303,0.45299,0.5966s0.19887,1.2043,0.24307,1.2817c0.0442,0.077,0.24306,0.2652,0.37565,0.4751,0.13258,0.2099,0.3425,0.5966,0.3867,0.6518,0.0442,0.055,0.3204,0.3867,0.39774,0.453,0.0773,0.066,0.56348,0.442,0.70711,0.5745,0.14363,0.1326,0.46404,0.3867,0.62977,0.5083,0.16573,0.1215,1.138,0.6297,1.138,0.6297s0.18782,0.3757,0.19887,0.6077c0.011,0.232-0.0552,1.0165,0.011,1.1712,0.0663,0.1546,0.0994,0.5082,0.0994,0.5082l0.22097,0.7181s0.25411,0.3315,0.35355,0.5083c0.0994,0.1768,0.0994,0.2099,0.14363,0.3977,0.0442,0.1879-0.011,0.8729-0.011,0.8729l-0.0773,0.7181s-0.28726,0.1105-0.3867,0.221c-0.0994,0.1105-0.20992,0.022-0.30936,0.3867-0.0994,0.3646-0.27621,0.5635-0.27621,0.7844,0,0.221-0.0111,0.4751,0,0.5304,0.011,0.055,0.37565,0.3867,0.49719,0.5303,0.12153,0.1436,0.22097,0.4088,0.37565,0.5635,0.15468,0.1546,0.44194,0.4309,0.44194,0.4309s0.56347,0.3756,0.61872,0.475c0.0552,0.099,0.17677,0.5856,0.15468,0.7403-0.0221,0.1547-0.0773,0.2541-0.19888,0.3646-0.12153,0.1105-0.51928,0.232-0.59662,0.4199-0.0773,0.1878-0.0994,0.2541-0.0994,0.2541l0.0442,1.8672s-0.12154,0.3535-0.0221,0.4309c0.0994,0.077,0.45299,0.4419,0.45299,0.5082,0,0.066,0.3867,0.8507,0.3867,0.8507s0.0773,3.0936,0.0773,3.171c0,0.077-0.0884,0.4861,0.0552,0.5855,0.14363,0.099,0.25412,0.3315,0.4088,0.3536,0.15468,0.022,0.62977,0.1215,0.68501,0.1326,0.0552,0.011,2.8174,2.1213,2.8174,2.1213s0.0884,0.5524,0.16573,0.7071c0.0773,0.1547,0.23201,0.6298,0.33145,0.7624,0.0994,0.1325,0.61872,0.7844,0.61872,0.7844s0.56348,0.4861,0.64082,0.6077c0.0773,0.1215,0.37565,0.5303,0.41984,0.5855,0.0442,0.055,0.29831,0.2542,0.3867,0.2873,0.0884,0.033,0.59662,0.1657,0.67396,0.1768,0.0773,0.011,0.3867,0.011,0.47509-0.022,0.0884-0.033,0.20992-0.055,0.28726-0.1436,0.0773-0.089,0.20992-0.2321,0.28726-0.3205,0.0773-0.088,0.0663-0.011,0.35356-0.4198s0.3204-0.5303,0.3204-0.5303,0.11049-0.2983,0.13259-0.3425c0.0221-0.044,0.12153-0.442,0.17677-0.5635,0.0553-0.1215,0.0994-0.3204,0.19888-0.3978,0.0994-0.077,0.12153-0.2762,0.43089-0.2872s0.48614,0.022,0.7292,0.033c0.24307,0.011,0.46404,0.077,0.64082,0.011s0.32041-0.099,0.48613-0.1658c0.16573-0.066,0.26517-0.044,0.4088-0.2209,0.14363-0.1768,0.22097-0.2762,0.29831-0.3646,0.0773-0.088,0.15468-0.1768,0.24307-0.2652,0.0884-0.088,1.591-1.6462,1.591-1.6462l0.4088-0.3425,1.5136-0.4641s0.0884-0.3867,0.26516-0.453c0.17678-0.066,0.41985-0.1767,0.66291-0.1988,0.24307-0.022,0.92808,0,1.0054,0,0.0773,0,0.55243,0.066,0.82864,0.066,0.27622,0,0.81759,0.077,0.92808,0.066s0.28726-0.066,0.49718,0c0.20993,0.066,0.62977,0.077,0.78445,0.232,0.15468,0.1547,0.48614,0.5414,0.54138,0.5745,0.0552,0.033,0.17678,0.1105,0.3646,0.1547,0.18783,0.044,1.0165,0.6077,1.0607,0.6297s0.0221,0.033,0.17678,0.099,0.3646,0.1879,0.60767,0.1879,0.3425,0.066,0.58557-0.022,0.32041-0.066,0.54138-0.221c0.22097-0.1547,0.25412-0.1436,0.48614-0.3425s0.23202-0.1326,0.43089-0.3425,0.19887-0.1657,0.35355-0.3646,0.32041-0.4088,0.32041-0.4088l1.6241-1.0607s0.44194-0.044,0.65186-0.099,0.50823-0.1215,0.95017-0.1326c0.44195-0.011,0.80655,0,1.3258,0,0.51928,0,0.58557,0.033,0.93913,0.033,0.35355,0,0.45299-0.022,0.74025,0.066s0.11048-0.077,0.61872,0.221c0.50823,0.2983,0.53033,0.4088,0.96122,0.5193s0.7955,0.232,0.97227,0.232c0.17678,0,1.7678,0.1326,1.7678,0.1326l0.13258,0.3867s0.62977,0.232,0.91703,0.2541c0.28726,0.022,0.82864,0.1105,1.0386,0.1326,0.20993,0.022,0.54138-0.011,0.8176,0.1105,0.27621,0.1215,0.44194,0.232,0.67396,0.3867s0.24307,0.2209,0.53033,0.3535,0.29831,0.1547,0.74025,0.2652,0.43089,0.011,0.68501,0.1989c0.25412,0.1878,0.0884,0.055,0.51928,0.4088,0.43089,0.3535,0.44194,0.3756,0.44194,0.3756s0.22097,0.674,0.39775,0.7403c0.17678,0.066,0.51928,0.2209,0.7513,0.2541,0.23202,0.033,0.4088,0.1657,0.7955,0.077,0.3867-0.088,0.62976-0.077,1.0717-0.066,0.44195,0.011,3.9001,0.033,3.9001,0.033s0.0442-0.033,0.19887,0.1215c0.15468,0.1547,0.51929,0.3536,0.67397,0.4862,0.15468,0.1325,0.22097,0.1657,0.51928,0.3204,0.29831,0.1546,0.62976,0.2651,0.7513,0.3756,0.12153,0.1105,0.29831,0.221,0.46404,0.3867s0.3425,0.2873,0.55242,0.5083c0.20993,0.2209,0.47509,0.5082,0.56348,0.5634,0.0884,0.055,0.24307,0.2652,0.55243,0.2431,0.30936-0.022,0.39774-0.1216,0.88388-0.066,0.48614,0.055,0.91703,0.1215,1.1822,0.1215s0.49719,0.044,0.68501-0.022c0.18783-0.066,0.0884,0.066,0.39775-0.1436,0.30936-0.2099,0.45299-0.232,0.65187-0.4088,0.19887-0.1768,0.17677-0.2873,0.45299-0.3977,0.27621-0.1105,0.51928-0.1437,0.68501-0.1768,0.16572-0.033,2.3754-0.033,2.3754-0.033l0.17678,0.055c0.13258,0.055,0.3425,0.044,0.56348,0.3093,0.22097,0.2652,0.26516,0.2873,0.40879,0.4862,0.14363,0.1988,0.16573,0.2099,0.26517,0.3646,0.0994,0.1547,0.27621,0.5966,0.27621,0.5966s0.0884,0.7955,0.12153,0.8728c0.0332,0.077,0.20993,0.2873,0.30936,0.3094,0.0994,0.022,0.28727,0.055,0.61872,0.077,0.33146,0.022,0.62977,0.088,0.91703,0.088s0.37565,0.1326,0.67396-0.022c0.29831-0.1547,0.30936-0.077,0.51928-0.2652,0.20993-0.1878,0.23202-0.1436,0.36461-0.3646,0.13258-0.2209-0.17678,0.1658,0.27621-0.4419s0.27621-0.4751,0.51928-0.674,0.37565-0.3094,0.50823-0.4198c0.13259-0.1105,0.16573-0.1105,0.35356-0.2873,0.18782-0.1768,0.14363-0.1326,0.40879-0.3425,0.26517-0.2099,0.32041-0.2099,0.53033-0.3867,0.20993-0.1768,0.27622-0.2873,0.46404-0.4309,0.18783-0.1436,0.3867-0.2762,0.50823-0.4309,0.12154-0.1547,0.20993-0.2209,0.20993-0.2209l0.87283-1.1822s0.13258-0.21,0.17678-0.3536,0.0663-0.3425,0.12153-0.4972c0.0553-0.1547-0.17677,0.033,0.12154-0.3646,0.29831-0.3977,0.27621-0.3646,0.41984-0.5524s0.27622-0.453,0.43089-0.5745c0.15468-0.1216,0.27622-0.21,0.46404-0.3425,0.18783-0.1326,0.36461-0.2431,0.47509-0.3204,0.11049-0.077,1.6131-0.8839,1.6683-0.895,0.0552-0.011,0.3867-0.1878,0.49719-0.3093,0.11048-0.1216,0.12153-0.2542,0.46403-0.3867,0.34251-0.1326,0.59663-0.1216,0.7955-0.1879,0.19887-0.066,0.37565-0.022,0.61872-0.232,0.24307-0.2099,0.32041-0.3094,0.50823-0.4198,0.18783-0.1105,0.0442-0.099,0.47509-0.221,0.43089-0.1215,0.7071-0.1436,0.7071-0.1436l0.68501-0.7624s0.65187,0.055,0.72921,0.033c0.0773-0.022,2.7621-0.1215,2.7621-0.1215s0.18783,0.066,0.28727,0.1547c0.0994,0.088,0.25411,0.022,0.46404,0.3535,0.20992,0.3315,0.28726,0.3867,0.47508,0.3867,0.18783,0,0.35356,0.1105,0.50824,0.011,0.15468-0.099,0.22097-0.1436,0.38669-0.2872,0.16573-0.1437,0.25412-0.221,0.4088-0.3094,0.15468-0.088,0.27621-0.1878,0.3867-0.1878s0.33146-0.044,0.54138,0.1768c0.20992,0.2209,0.32041,0.3645,0.40879,0.4198,0.0884,0.055,0.17678,0.1547,0.32041,0.1657s0.54138,0.033,0.62977,0.066c0.0884,0.033,0.29831,0.077,0.44194,0.221,0.14363,0.1436,0.55243,0.4861,0.7292,0.5082,0.17678,0.022,0.26517,0.066,0.49719,0.088s0.32041,0.066,0.59662,0.044,0.18783,0.2873,0.62977-0.055c0.44194-0.3425,0.44194-0.3093,0.50823-0.4309,0.0663-0.1215,0.16573-0.243,0.17678-0.3867,0.0111-0.1436,0.0773-0.2099-0.0663-0.453-0.14364-0.243-0.25412-0.4309-0.4309-0.5634-0.17677-0.1326-0.80654-0.442-0.82864-0.4972-0.0221-0.055-0.12153-0.3425-0.12153-0.3425s0.16573-0.7403,0.22097-0.7845c0.0552-0.044,0.22097-0.022,0.45299-0.2541,0.23202-0.232-0.27621,0.099,0.44194-0.4751,0.71816-0.5745,0.83969-0.696,0.83969-0.696l0.34251-1.1491s0.24306-0.3756,0.3204-0.4198c0.0773-0.044,0.44194-0.1437,0.55243-0.1879,0.11049-0.044,0.26517-0.077,0.45299-0.1988,0.18783-0.1216,0.39775-0.2652,0.53033-0.3646,0.13258-0.099,0.33146-0.1547,0.54138-0.3204,0.20992-0.1658,0.30936-0.1768,0.39775-0.3425,0.0884-0.1658,0.17677-0.3867,0.19887-0.6077s0.0221-0.442,0.0221-0.442l0.0773-1.3589s-0.0332-0.1105,0.15468-0.2099c0.18782-0.099,0.47508-0.055,0.7071-0.1879,0.23202-0.1326,0.29831-0.1767,0.47509-0.3314s0.22097-0.1547,0.47509-0.3757c0.25411-0.2209,0.30936-0.1989,0.48613-0.3756,0.17678-0.1768,0.30936-0.3315,0.32041-0.4751,0.0111-0.1436,0.3867-1.2595,0.3867-1.2595s0.0111-0.055,0.34251-0.1658c0.33145-0.1105,0.62976-0.044,0.82864-0.2209,0.19887-0.1768,0.22097-0.1105,0.45299-0.3315s0.35355-0.3536,0.50823-0.5303c0.15468-0.1768,0.33146-0.3978,0.4088-0.4641,0.0773-0.066,0.83969-0.4309,0.83969-0.4309h0.20992,0.60767c0.19887,0,0.22097,0.022,0.65186,0.022s0.67396,0.055,0.92808,0,0.4088-0.044,0.70711-0.088,0.51928,0.033,0.67396-0.066,0.32041-0.099,0.48613-0.2651c0.16573-0.1658,0.25412-0.1768,0.36461-0.3315,0.11048-0.1547,0.18782-0.3314,0.29831-0.464,0.11048-0.1326,0.18782-0.2762,0.3425-0.3978,0.15468-0.1215,0.0111-0.1657,0.39775-0.2872,0.3867-0.1216,0.47509-0.1326,0.78444-0.1768,0.30936-0.044,0.22098,0,0.66292-0.077s0.24307-0.066,0.67396-0.099,0.78445-0.033,0.78445-0.033l0.93912-0.2762s0.18783-0.088,0.25412-0.1989c0.0663-0.1105,0.0221-0.1436,0.14363-0.3536,0.12153-0.2099,0.13258-0.3204,0.19887-0.475,0.0663-0.1547,0.0994-0.1437,0.0773-0.3536s-0.14363-0.5082-0.27621-0.674c-0.13258-0.1657-0.26517-0.3425-0.43089-0.4861-0.16573-0.1436-0.53033-0.4309-0.53033-0.4309l-0.85074-0.9281-1.0496-0.7844-0.78445-0.9281s-0.64082-0.3646-0.66291-0.5524c-0.0221-0.1878-0.0884-0.2541-0.15468-0.5635-0.0663-0.3094-0.11049-2.7842-0.11049-2.7842l0.0111-2.7953v-4.4194l-0.0111-1.7567s0.53033-0.1989,0.64082-0.2984c0.11048-0.099,0.40879-0.2762,0.57452-0.475,0.16573-0.1989,0.26517-0.3978,0.41985-0.5746,0.15468-0.1767,0.3204-0.3867,0.37565-0.4419,0.0552-0.055,0.69606-0.8728,0.74025-0.8949,0.0442-0.022,0.26516-0.099,0.45299-0.2984,0.18782-0.1988,0.23202-0.243,0.41984-0.4861,0.18783-0.2431,0.33146-0.4419,0.4309-0.5303,0.0994-0.088,1.7015-1.7457,1.7015-1.7457s0.58558-0.6077,0.65187-0.6739c0.0663-0.066,0.95017-0.9944,0.95017-0.9944l1.6131-1.2816,0.91703-0.4862,2.0882-1.1048s0.80655-0.5525,1.0607-0.685c0.25412-0.1326,1.4363-0.9944,1.5358-1.0939,0.0994-0.099,0.56348-0.9722,0.56348-0.9722l1.8451-1.9114,0.7955-1.3038,1.149-0.9501s0.66291,0.011,0.80654,0.011,0.7292,0.088,0.86179,0.066c0.13258-0.022,0.50823,0.044,0.59662,0,0.0884-0.044,0.39775-0.1326,0.53033-0.2431s0.26516-0.2762,0.41984-0.3425c0.15468-0.066,0.47509-0.1547,0.56348-0.1768,0.0884-0.022,0.67396-0.044,0.71815-0.066,0.0442-0.022,0.51929-0.011,0.67397-0.066,0.15467-0.055,0.33145-0.022,0.44194-0.1768,0.11048-0.1546,0.25411-0.2872,0.25411-0.5524,0-0.2651-0.0442-0.4198-0.0994-0.5414-0.0553-0.1215-0.14363-0.2209-0.36461-0.4088-0.22097-0.1878-0.88388-0.5966-0.88388-0.5966s-0.3425-0.6297-0.35355-0.7292c-0.0111-0.099-0.19888-0.3867-0.0442-0.5414,0.15468-0.1546,0.28727-0.2651,0.47509-0.475,0.18783-0.21,0.27621-0.3205,0.47509-0.5083,0.19887-0.1878,0.30936-0.3204,0.54138-0.464,0.23202-0.1437,0.29831-0.1657,0.47508-0.2652,0.17678-0.099,1.3148-0.7623,1.3148-0.7623s0.3646,0.088,0.53033,0.044,0.34251-0.011,0.53033-0.1326c0.18783-0.1215,0.30936-0.1657,0.45299-0.3425s0.16573-0.2541,0.26517-0.3536c0.0994-0.099,0.23202-0.232,0.30936-0.2541,0.0773-0.022,0.16572-0.099,0.3425-0.033s0.37565,0.055,0.55243,0.2541c0.17677,0.1989,0.40879,0.3757,0.49718,0.4309,0.0884,0.055,0.44194,0.2652,0.66291,0.2431,0.22098-0.022,0.32041,0.066,0.49719-0.1215,0.17678-0.1879,0.12153-0.2321,0.39775-0.442,0.27621-0.2099,0.13258-0.3204,0.65186-0.3646,0.51928-0.044,0.60767,0.033,1.0496-0.044,0.44194-0.077,0.71816-0.044,1.1049-0.077,0.3867-0.033,0.59662-0.022,0.88388-0.033s6.3971,0.2099,6.3971,0.2099,0.0773,0.033,0.33145-0.011c0.25412-0.044,0.69606-0.011,0.97228-0.055,0.27621-0.044,0.64081,0,0.98332-0.044,0.3425-0.044,0.64081-0.033,1.0386-0.044,0.39775-0.011,0.64081,0.011,0.82864-0.011,0.18782-0.022,1.1932-1.1048,1.2706-1.1711,0.0773-0.066,0.30936-0.3646,0.44194-0.5303,0.13259-0.1658,0.25412-0.2652,0.25412-0.2652l1.0275-0.7734s0.0442-0.088,0.29832-0.1547c0.25411-0.066,0.55242-0.1105,0.61871-0.1657,0.0663-0.055,0.011-0.033,0.22097-0.1878,0.20993-0.1547,0.33146-0.3204,0.54138-0.3978,0.20993-0.077,0.41985-0.077,0.74026-0.1326,0.3204-0.055,0.41984-0.011,0.66291-0.099s0.35355-0.099,0.60767-0.1768c0.25411-0.077,0.43089-0.055,0.53033-0.1325,0.0994-0.077,0.0884-0.1105,0.3867-0.2983,0.29831-0.1879,0.12153-0.2431,0.7292-0.3094,0.60767-0.066,0.27621,0.055,0.93913-0.066,0.66291-0.1215,0.7292-0.099,0.87283-0.1215,0.14363-0.022,0.4088-0.044,0.57453-0.088,0.16572-0.044,0.30936-0.055,0.41984-0.1437,0.11049-0.088,0.16573-0.066,0.32041-0.2209,0.15468-0.1547,0.16573-0.2542,0.3646-0.3425,0.19887-0.088,0.26517-0.1437,0.60767-0.1326,0.34251,0.011,0.51928,0.044,0.64082,0.033,0.12153-0.011,1.8672,0.033,1.8672,0.033s0.14363-0.1105,0.25412-0.1768c0.11048-0.066,0.28726-0.221,0.3867-0.3094,0.0994-0.088,0.0994-0.1436,0.3425-0.2762,0.24307-0.1326,0.50823-0.1989,0.66291-0.2541,0.15468-0.055,0.32041-0.099,0.41985-0.1215,0.0994-0.022,1.0165-0.9502,1.1932-0.9613,0.17678-0.011,0.45299,0.099,0.64082-0.022,0.18782-0.1215,0.3646-0.077,0.45299-0.2762,0.0884-0.1989,0.26516-0.8286,0.26516-0.8286s0.46404-1.0386,0.51928-1.1159c0.0553-0.077,0.0553,0.022,0.17678-0.2431,0.12153-0.2652,0.29831-0.4972,0.29831-0.685s0.0442-0.2873-0.0552-0.4309-0.13259-0.033-0.35356-0.3536c-0.22097-0.3204-0.48613-0.5855-0.48613-0.5855l-0.15468-0.1989-0.0663-2.5301s-0.26517-0.1878-0.0442-0.3204,0.56348-0.3536,0.78445-0.3978c0.22097-0.044,0.68501,0.011,0.68501,0.011l1.2927-0.1325s0.0221,0.033,0.11048-0.066c0.0884-0.099,0.14364-0.1768,0.23202-0.3425,0.0884-0.1658,0.0994-0.2431,0.12154-0.3647,0.0221-0.1215,0.0331-0.1767,0.0111-0.2872-0.0221-0.1105-0.0331-0.2099-0.14363-0.3867-0.11049-0.1768-0.0994-0.1878-0.23202-0.2983-0.13259-0.1105-0.41985-0.1547-0.55243-0.3646s-0.19888-0.3204-0.29831-0.4972c-0.0994-0.1768-0.29831-1.0607-0.29831-1.0607z").attr(attr);
            eur.es1 = R.path("m316.4,463.55-2.0329,0-0.88388,0.7955-1.0607,0.4419-0.97227,0.9723-1.0607,0.9723,0.53033,0.707,1.2374,0.3536,0.53033,0.7955,0.97228,0.088,0.97227-0.9723,1.9445-0.8839,0.97227,0,0-1.4142-0.17677-0.8839z").attr(attr);
            eur.es2 = R.path("m345.38,452.7-1.5938-0.1875-1.375,0.094s-0.65625,0.4375-0.71875,0.5625-1.1562,0.3437-1.1562,0.3437l-1.625,0.094s-0.625,0.3125-0.71875,0.4375c-0.0937,0.125-0.9375,0.062-1.1562,0.375-0.21875,0.3125-1.0312,1.25-1.0312,1.25l-1.4375,0.125-1.1875,0.9063-1.0312,0.031-0.84375,0.2187s-0.0937,0.4375-0.125,0.625c-0.0312,0.1875-0.0625,0.375-0.0312,0.5938,0.0312,0.2187-0.0625,0.1875,0.0937,0.375,0.15625,0.1875,0.3125,0.2187,0.46875,0.4375,0.15625,0.2187,0.21875,0.125,0.3125,0.4687,0.0937,0.3438,0.0625,0.4063,0.125,0.6875,0.0625,0.2813-0.0937,0.25,0.0625,0.4063,0.15625,0.1562,0.15625,0.1562,0.40625,0.1875,0.25,0.031,0.0625,0.2187,0.4375-0.094,0.375-0.3125,0.15625-0.2188,0.4375-0.375,0.28125-0.1563,0.28125-0.1563,0.5-0.2813s0.15625-0.062,0.375-0.3437c0.21875-0.2813,0.0312-0.4688,0.5-0.5938,0.46875-0.125,0.75,0,0.75,0s0.125,0.1875,0.21875,0.3125c0.0937,0.125,0.0312-0.062,0.125,0.3125,0.0937,0.375,0.0625,0.6875,0.125,0.875s0.0625,0.3438,0.0625,0.5625v0.5938c0,0.375-0.0312,0.5937,0,0.7812s0.0312,0.3125,0.0312,0.3125l0.15625,0.4063,0.2188,0.4063,0.8125,0.125s0.46875-0.031,0.78125,0.031,0.96875,0.1875,0.96875,0.1875l0.125,0.3125s-0.0937-0.125,0.15625,0.375c0.25,0.5,0.21875,0.5625,0.40625,0.6563,0.1875,0.094,0.4375,0.125,0.46875,0.3125,0.0312,0.1875,0.0312,0.5,0.0625,0.625,0.0312,0.125,0.125,0.25,0.125,0.25l0.625,0.094s0.25-0.031,0.4375-0.2188c0.1875-0.1875,0.0312,0.062,0.40625-0.375,0.375-0.4375,0.3125-0.4062,0.5625-0.625,0.25-0.2187,0.0312-0.1562,0.53125-0.4687,0.5-0.3125,0.5-0.3125,0.75-0.4688,0.25-0.1562,0.46875-0.375,0.625-0.4687,0.15625-0.094,0.34375-0.25,0.46875-0.3438,0.125-0.094,0.15625-0.1562,0.40625-0.3125,0.25-0.1562,0.28125-0.2187,0.59375-0.5625,0.3125-0.3437,0.34375-0.5,0.65625-0.7812,0.3125-0.2813,0.40625-0.375,0.625-0.5938,0.21875-0.2187,0.21875-0.1562,0.53125-0.5312s0.40625-0.5938,0.5-0.7188c0.0937-0.125,0.5-0.75,0.5-0.75l0.375-0.4062s0.125-0.062,0.1875-0.2813c0.0625-0.2187,0.0625-0.8125,0.0625-0.8125l-0.15625-0.125s-0.3125-0.062-0.53125-0.062h-1.1562s0.0625,0.25-0.59375-0.25-1.0625-0.7812-1.0625-0.7812l-1.0938-0.5s-0.96875,0.1562-0.28125-0.4375c0.6875-0.5938,1.125-1.3125,1.125-1.4375s-0.0937-0.4688-0.0937-0.6563-0.28125-0.9062-0.28125-0.9062z").attr(attr);
            eur.es3 = R.path("m355.26,453.76,0.15625,0.6875,0.0937,0.3125-0.0312,0.3437-0.0312,0.25s-0.0312,0.1563,0.21875,0.1875c0.25,0.031,1,0.094,1,0.094l0.5,0.031,0.59375,0.125s0.0312-0.031,0.21875,0.1875c0.1875,0.2188,0.4375,0.4375,0.59375,0.625s0.15625,0.2188,0.34375,0.375c0.1875,0.1563,0.5625,0.5938,0.78125,0.7813s0.15625-0.031,0.4375,0.375c0.28125,0.4062,0.28125,0.375,0.46875,0.6875s0.40625,0.4687,0.5,0.5937c0.0937,0.125,0.34375,0.3438,0.46875,0.3438h0.40625c0.1875,0,0.125,0.062,0.28125-0.094,0.15625-0.1563,0.1875-0.125,0.28125-0.3438,0.0937-0.2187,0.125-0.125,0.125-0.4062,0-0.2813,0.0312-0.1875,0-0.5313-0.0312-0.3437-0.0312-0.25-0.0312-0.5937,0-0.3438,0.0312-0.4063,0.0937-0.6563s0.21875,0.1563,0.15625-0.5312-0.15625-0.8438-0.15625-0.8438l-0.21875-0.375s-0.84375-0.5937-0.9375-0.7187c-0.0937-0.125-0.53125-0.625-0.53125-0.625l-0.84375-0.5625h-0.375-0.59375s-0.4375-0.125-0.75-0.125h-0.5625l-0.84375-0.031h-0.34375-0.46875c-0.125,0-0.3125-0.062-0.4375,0s-0.375,0.25-0.375,0.25z").attr(attr);
            eur.pt = R.path("m167.54,460.71,0-5.6094,0.92187-1.75,0.26563-1.5781,1.3438-1.3125,1.7812-0.9531,0.8125-0.8594,0.625-0.3281,0.5-0.5782,0.76562-0.5937,0.48438-0.5938,2.5938,0,1,0.1719,0.71875-0.4375,0.5625-0.3125,0.23437-0.1562,0.39063-0.5625-0.0156-0.625-0.20312-0.6563-0.59375-0.25-1.0938-0.3125-0.53125-0.6094-0.51563-0.4531-0.0781-1.2656,0-1.875-0.0312-0.7188,0.10937-2.8281,0.59375-0.6094,0.57813-1.5,1.1094-1.375,0.75-0.6562,2.75-0.047,0.73438-0.4531,0.375-1.3594,1.7344-1.9063,0.0625-0.2343-0.0312-0.5157-0.40625-0.3437-0.51562-0.375-0.70313-0.3906-0.92187-2.0313-0.0625-1.9062,0.0156-2.1094,0-2.9688-1.1094-1.4531-0.0312-1.5625-0.0469-0.2656,0.29688-0.7031,0.17187-0.1563,0.67188,0.1563,0.51562,0.4062,0.85938,0.3438,0.84375,0.3281,0.95312,0.5625,1.0781,0.3125,0.82812,0.4844,0.82813,0.375,0.78125-0.25,0.23437-0.1094,0.98438-0.8438,0.64062-0.875,0.53125-0.6406,0.23438-0.25,0.92187-1.6562,0.21875-0.3438,0.25-0.3281,0.21875-0.5625,0.0156-0.1094-0.57813-1.125-0.60937-0.5937,0-2.1094,0.39062-0.5938,0.65625-0.6718,2.3125-0.2032,0.70313-0.8906-0.0469-2.3437,1.9062-1.4219,0.5625-2,0.54688-0.125,0.1875-1.9688,0.0469-0.5468,0.29688-1.5782-0.57813-0.6406-0.125-2.0781,0.32813-0.875,0.14062-0.125,1.1875-0.047,1.7969-0.5469,0.1875-0.1406,0.51562-0.6094,0.79688-0.9687,3.9688-0.1094,0.28125-0.1406,0.14062-0.2657,0.1875-0.2031,0.8125-0.7031,2.3594-1.0469,0.40625-0.3125,1.25-1.25-0.26563-1.4844-0.5625-0.9687-1.5-0.6719-1.1094-0.3281-0.78125-0.7969,0.0312-0.2187,0.25-0.6875,0.10937-0.1875,0.25-0.1719,0.17188-0.094,0.4375-1.0781-0.15625-2.0782-0.125-0.2031-0.125-0.2656-0.15625-0.1406-0.10938-0.062-0.78125-0.2969-1.1875-0.1875-0.82812-0.6875-1.5625-0.4219-0.8125-0.6875-0.8125-0.2187-0.40625-0.7969-1.2969-0.1719-0.82812,0.9219-1.5,0.6875-0.79688,0.4687-1.0156,0.031-0.71875-0.2812-0.73438-0.9063-0.92187-0.8125-0.23438-0.1406-0.42187-0.047-0.34375-0.4375-0.125-0.25-0.28125-0.6719-0.78125-0.4531-1.8594-0.3281-0.20312-0.094-1-0.5781-0.64063,0.2812-0.0781,0.1563-0.26563,0.4375-0.125,0.078-0.34375,0.125-0.1875,0.031-1.1094,0.031-0.21875-0.062-1.0156-0.25-0.15625-0.047,0-0.9063,0.3125-1.2969,0.53125-0.4843,1.0156-0.5625,1.4062-0.8282,0.0625-0.7968-0.28125-0.4375-0.26563-0.2657-0.57812-0.1718-0.65625-0.125-0.21875-0.1407-0.23438-0.4531-0.10937-0.1719-0.51563-0.125-1.0469,0.016-1.8906-0.047-1.1875-0.016-0.40625,0.031-0.54687,0.2188-0.14063,0.3281-0.17187,0.3594-0.20313,0.1406-0.35937-0.031-0.60938-0.047-0.42187,0.016-0.73438,0.2344-0.60937,0.7187-1.0781,0-0.17187,1.0625-0.6875,0.5938-0.96875,1.0937,0,1.1563,0.625,0.2187s0.375,0.6094,0.375,0.7813c0,0.1718-0.0469,0.7343-0.0469,0.7343l-1.0938,0.4844s-0.3125,0.4375-0.26562,0.5313c0.0469,0.094,0.17187,0.7187,0.17187,0.7187l0.10938,1.3125-0.10938,1.4063-0.60937,0.6875-0.21875,2.8125s0.0156,0.4375,0.10937,0.5625c0.0937,0.125,0.51563,0.5312,0.53125,0.6093,0.0156,0.078,0.0937,0.2657,0.0937,0.3594,0,0.094-0.0781,0.5469-0.10937,0.6406-0.0312,0.094-0.59375,1.0469-0.59375,1.0469l-0.90625,1.9063s-1.1684,2.2717-1.1684,1.0217c0-0.3403-0.0315-0.3951-0.0775-0.2946-0.12275,0.2686-0.16037,2.2104-0.16037,2.2104l0.0156,0.4531-0.0469,0.7656-0.72712,0.045-0.58316,0.9956-1.0369-0.054-0.64252,0.9259-0.55714,0.7279-0.14062,0.9063-1.2188,1.4531s-0.48438,0.875-0.53125,1c-0.0469,0.125-0.5,0.4844-0.5625,0.6875s-0.4375,0.6719-0.54688,0.7344c-0.10937,0.062-0.70312,0.2812-0.85937,0.4843-0.15625,0.2032-0.375,0.8594-0.42188,1.0625-0.0469,0.2032,0.1875,1.7969,0.10938,1.875-0.0781,0.078-0.46875,0.3125-0.54688,0.4375-0.0781,0.125-0.48437,0.4688-0.6875,0.6563-0.20312,0.1875-0.5625,0.3906-0.78125,0.5937-0.21875,0.2032-0.23437,1.1094-0.29687,1.2344s-0.70313,0.7188-0.75,0.7813c-0.0469,0.062-1.6562,1.7968-1.6562,1.7968s-0.5,0.375-0.5625,0.5625-0.375,0.7344-0.40625,0.7969c-0.0312,0.062-0.10938,0.1563-0.25,0.375-0.14063,0.2188-0.46875,0.5469-0.59375,0.6563-0.125,0.1093-0.45313,0.3437-0.53125,0.4218-0.0781,0.078-0.28125,0.375-0.45313,0.4844-0.17187,0.1094-0.95312,0.3594-0.95312,0.3594l-0.375,0.094-1.0156,1.125s-0.70312,0.25-0.82812,0.3437c-0.125,0.094-0.79688,0.3282-0.79688,0.3282l-1.0781,0.125-0.46875,0.5312s-0.14063,0.3281-0.125,0.5c0.0156,0.1719,0.0625,0.5469,0.0469,0.6719s-0.0625,0.4844-0.0625,0.4844l-0.0781,0.5625-0.0781,0.062c-0.0625,0.062-0.51562,0.2031-0.5625,0.2656-0.0469,0.062-0.40625,0.5312-0.45312,0.6094-0.0469,0.078-0.625,0.4843-0.625,0.4843l-0.78125,1.0157-0.21875,0.5625-0.28125,0.7656s-0.57813,2.3125-0.59375,2.2187c-0.0156-0.094-1.0156,0.4219-1.0156,0.4219l-0.10937,0.2344-0.125,0.5-0.28125,0.9219-0.5,0.5156-0.15625,0.625,0.0312,1.4531,0.0312,0.7656,0.95312,0.75s-0.0937,0.5938-0.0625,0.7344,0.0312,0.4688,0.17188,0.5781c0.14062,0.1094,0.40625,0.047,0.51562,0.3282,0.10938,0.2812,0.1875,0.6875,0.1875,0.6875s0.0625,1.2656,0.0625,1.375c0,0.1093-0.0469,0.2656,0.0156,0.3593,0.0625,0.094,0.0312,0.2344,0.20312,0.25,0.17188,0.016,0.625,0.125,0.85938,0.125,0.23437,0,0.4375,0.016,0.75,0.016s0.59375,0.016,0.82812,0.016c0.23438,0,0.64063,0.047,1.0625,0.047,0.42188,0,1.0625,0.078,1.0625,0.078s0.14063,0.094,0.17188,0.1719c0.0312,0.078,0.28125,1.625,0.28125,1.7813,0,0.1562-0.0156,0.1875-0.0312,0.7343-0.0156,0.5469-0.21875,1.125-0.20313,1.2813,0.0156,0.1562-0.0625,0.375-0.0625,0.4219,0,0.047-0.25,1.3125-0.35937,1.4375-0.10938,0.125-0.57813,0.4531-0.76563,0.6875-0.1875,0.2343-0.875,0.7031-0.89062,0.7812-0.0156,0.078-0.98438,1.5938-0.98438,1.5938s-0.34375,0.1718-0.45312,0.3437c-0.10938,0.1719-0.34375,0.3594-0.35938,0.6563-0.0156,0.2968-0.14062,0.4843,0.0156,0.6406,0.15625,0.1562,0.0625,0.1406,0.375,0.3906s0.5,0.125,0.54687,0.5469c0.0469,0.4219,0.0625,0.7031,0.0625,0.7031s-0.3125,1.1719-0.35937,1.2656c-0.0469,0.094-0.29688,0.4375-0.34375,0.5157-0.0469,0.078-0.34375,0.2968-0.35938,0.7031-0.0156,0.4062-0.0156,0.6719-0.17187,0.9062-0.15625,0.2344-0.53125,0.5782-0.53125,0.5782l-0.40625,1.2187s-0.90625,0.047-0.875,0.375c0.0312,0.3281,0.10937,0.3125,0.10937,0.6719s-0.10937,0.5937-0.15625,0.8125c-0.0469,0.2187-0.1875,0.5-0.28125,0.6562-0.0937,0.1563-0.42187,0.3907-0.45312,0.4532-0.0312,0.062-0.51563,1.1718-0.51563,1.1718s-0.32812,0.25-0.42187,0.4532c-0.0937,0.2031-0.23438,0.2812-0.35938,0.5468-0.125,0.2657-0.125,0.25-0.29687,0.4688-0.17188,0.2187-0.34375,0.3125-0.53125,0.5469-0.1875,0.2343-0.4375,0.4218-0.65625,0.6718s-0.28125,0.25-0.5,0.4219-0.32813-0.047-0.59375,0.4375c-0.26563,0.4844-0.5,1.1406-0.5625,1.1719-0.0625,0.031-0.5625,0.1875-0.59375,0.5-0.0312,0.3125-0.0937,0.4062-0.0937,0.6406s-0.0156,0.3594-0.0156,0.3594-0.14062,0.031,0.25,0.1094c0.39063,0.078,0.59375,0.125,0.90625,0.125s0.5625,0,0.73438-0.016c0.17187-0.016,0.6875,0,1.0312-0.062,0.34375-0.062,0.75-0.062,0.8125-0.062s0.5625,0.078,1.0312,0.078c0.46875,0,0.67187,0.031,1.0156,0.031,0.34375,0,0.15625-0.031,0.71875,0.031s0.875,0.016,1.0156,0.094c0.14062,0.078,0.3125,0.078,0.54687,0.2656,0.23438,0.1875,0.4375,0.3437,0.76563,0.4219,0.32812,0.078,0.6875,0.1562,0.6875,0.1562s0.60937,0.6563,0.71875,0.7813c0.10937,0.125,0.89062,0.7343,1.0625,0.8593,0.17187,0.125,0.45312,0.1875,0.89062,0.4844s1.0781,0.7031,1.1719,0.8281c0.0937,0.125,0.67187,0.7032,0.79687,0.8125,0.125,0.1094,0.45313,0.2657,0.64063,0.3438,0.1875,0.078,0.375,0.1094,0.5,0.1562,0.125,0.047,0.10937-0.062,0.375,0.1094,0.26562,0.1719,0.5625,0.2969,0.75,0.4063,0.1875,0.1093,0.3125,0.094,0.54687,0.2187,0.23438,0.125,0.95313,0.5781,1.0469,0.625,0.0937,0.047,0.28125,0.1875,0.4375,0.1719,0.15625-0.016,0.21875,0.016,0.45312-0.1406,0.23438-0.1563,0.25-0.1875,0.46875-0.3125s0.23438-0.1875,0.5625-0.2032c0.32813-0.016,0.54688,0.1094,0.89063,0.031,0.34375-0.078,0.59375-0.094,0.76562-0.1875,0.17188-0.094,0.25-0.031,0.5-0.2656,0.25-0.2344,0.35938-0.3437,0.59375-0.5156,0.23438-0.1719,0.20313-0.2813,0.57813-0.2969,0.375-0.016,0.65625-0.016,0.65625-0.016l0.67187,0.047,0.48438,0.047,0.51562-0.016z").attr(attr);
            eur.a1f = R.path("m181.98,495.54c-0.25,0-0.65625,0.2813-0.65625,0.2813l-3,3.4687-4.9688,6.6875-6.6562,7.5313s-6.0312,6.0937-6.375,6.4062c-0.34375,0.3125-0.40625,0.3125-0.75,0.625s-0.34375,0.2813-0.71875,0.5938-0.25,0.2812-0.59375,0.5625c-0.34375,0.2812-1.125,1.0625-1.75,1.5625s-0.4375,0.2812-1,0.5312-0.59375,0.1563-1.2188,0.375c-0.625,0.2188-0.78125,0.2813-1.1562,0.4375-0.375,0.1563-0.375,0.1875-0.875,0.5-0.5,0.3126-0.3125,0.1563-0.71875,0.3438s-0.65625,0.031-1.4688,0.062c-0.8125,0.031-0.6875,0.031-1.125,0.1875-0.4375,0.1562-0.21875,0.1562-0.65625,0.5312s-0.5625,0.2188-0.90625,0.3125c-0.34375,0.094-0.84375,0-1.4375,0s-0.71875,0-1.25,0.062-0.625,0-1.0938,0.062c-0.46875,0.062-0.875,0.0001-1.375,0.031-0.5,0.031-0.78125,0.0001-1.1562,0.094-0.375,0.094-0.78125,0.25-1.3438,0.4063-0.5625,0.1562-1.875,0.25-2.2812,0.3125-0.40625,0.062-1.4688,0-1.4688,0s-8.875-0.031-9.2812,0c-0.40625,0.031-0.53125,0.1562-0.8125,0.3125-0.28125,0.1562-0.3125,0.2187-0.78125,0.5-0.46875,0.2812-0.8125,0.1563-1.2812,0.25-0.46875,0.094-0.96875,0-1.9062,0.062-0.9375,0.062-0.28125,0.1562-0.40625,0.2812s-0.3125,0.4063-0.53125,0.625c-0.21875,0.2188-0.8125,0.125-1.0938,0.3125-0.28125,0.1875-1.375,0.5938-1.375,0.5938s-0.1875,0.1562-0.375,0.2812-0.4375,0.3125-0.78125,0.5938c-0.34375,0.2812-0.65625,0.4687-1.2188,0.7812-0.5625,0.3125-0.5,0.2813-1.0625,0.5938s-0.53125,0.2812-0.96875,0.5312-0.59375,0.25-1.0625,0.4688c-0.46875,0.2187-0.3125,0.2187-0.6875,0.4375-0.37495,0.2187-0.34375,0.1875-0.34375,0.1875l-0.875,0.031c-0.46875,0.031-0.53125,0.094-0.96875,0.2187-0.4375,0.125-0.3125,0.125-0.5625,0.3125-0.25005,0.1876-0.21875,0.1563-0.34375,0.2813s-0.46875,0.2813-0.625,0.3125c-0.15625,0.031-0.59375-0.062-1-0.062s-0.4375,0.1562-0.75,0.2812-0.25,0.2188-0.4375,0.375c-0.18755,0.1563-0.28125,0.3438-0.28125,0.3438s-0.5625,0.3437-0.6875,0.4062c-0.12505,0.062-0.15625,0.3125-0.15625,0.5313,0,0.2187,0.0312,0.9375,0,1.0937-0.0312,0.1563-0.2188,0.75-0.3125,0.875s-0.34375,0.625-0.34375,0.625-0.25,0.6875-0.3125,0.8125-0.5313,0.75-0.625,0.9063c-0.0937,0.1562-0.2813,0.9375-0.3125,1.0625-0.0283,0.1132-0.75682,0.8498-0.90625,1l-0.1875,0.062-0.0937,0.094v0.1562l0.1875,0.031,0.4375,0.062h8.5625,341.28l0.25-0.3125s0.4375-0.25,0.5625-0.375,0.375-0.4687,0.375-0.4687,1-0.3434,1.125-0.4375c0.125-0.094,0.3125-0.1875,0.3125-0.1875s0.59375-0.7813,0.65625-1c0.0625-0.2188,0.5-0.6875,0.65625-0.9688,0.15625-0.2812,0.53125-0.8437,0.6875-1.25,0.15625-0.4062,0.46875-0.7187,0.6875-1.1875,0.21875-0.4687,0.90625-0.8125,0.90625-0.8125l1.0312-1.0312s0.875-0.4063,1.3125-0.75c0.4375-0.3438,0.4375-0.3125,0.6875-0.5625,0.25005-0.25,0.31245-1.4688,0.28125-1.6563s-0.125-0.3437-0.59375-0.9375c-0.46875-0.5937-0.84375-0.9375-0.84375-0.9375s-0.8125-0.5625-1.9688-0.9062c-1.1562-0.3438-0.5,0.062-0.875,0.2187-0.375,0.1563-0.25,0.25-0.71875,0.75s-0.375,0.5625-0.84375,1.1875-0.34375,0.2813-0.96875,0.5938-0.28125,0.2187-0.96875,0.4062c-0.6875,0.1876-0.46875-0.031-1.3125-0.031s-0.34375,0.25-0.46875,0.4688c-0.125,0.2187-0.5,0.6562-1.125,1.0937s-0.46875,0.5-0.8125,0.9063c-0.34375,0.4062-0.28125,0.2812-1.0625,0.7187s-0.625,0.125-0.625,0.125-0.78125-0.7812-1.125-1c-0.34375-0.2187-0.46875-0.5625-0.46875-0.7187,0-0.1563,0.12505-0.5,0.15625-0.6875s0.12505-0.4063,0.21875-0.7188,0.21875-0.1562,0.34375-0.3437,0.0312-0.2813,0-0.4375c-0.0312-0.1563-0.125-0.2188-0.25-0.3125-0.125-0.094-0.125-0.062-0.25-0.1563-0.125-0.094-0.65625-0.7187-1.0312-1.25-0.375-0.5312-0.0938-0.1562-0.1875-0.2812s-0.0625-1.2188,0-1.6875c0.0625-0.4688,0.4688-0.4375,0.5625-0.75s0.53125-0.6875,0.65625-1.1875,0.0312-0.4375-0.0625-0.8438c-0.0937-0.4062-0.15625-0.25-0.3125-0.375s-0.59375-0.3125-0.75-0.375c-0.15625-0.062-0.40625-0.031-0.875-0.031s-0.5-0.2812-0.75-0.4687-0.59375-0.4063-0.59375-0.4063-0.90625,0.031-1.1562,0.062c-0.25,0.031-0.78125-0.2812-1.0625-0.5312s-0.40625-0.4063-0.53125-0.5313,0-0.2812,0-0.4062-0.0312-0.6563-0.0312-0.6563-0.6875,0.062-0.84375,0.031-0.40625,0-0.40625,0l-2.375-0.062c-2.125-0.062-0.46875,0.062-0.9375,0.1875-0.46875,0.125-0.28125,0.125-0.6875,0.3438-0.40625,0.2187-0.28125,0.1875-0.78125,0.375-0.5,0.1874-0.375,0-1.25,0.031s-0.5,0-1.375,0-0.5-0.031-1.3125-0.094c-0.8125-0.062-0.375,0-0.8125,0.031s-0.1875,0.062-0.65625,0.3125c-0.46875,0.25-0.40625,0.2812-0.6875,0.5-0.28125,0.2187-0.28125,0.2187-0.59375,0.5-0.3125,0.2812-0.34375,0.2812-0.71875,0.5937s-0.34375,0.2813-0.6875,0.5625c-0.34385,0.2815-0.34385,0.219-0.65635,0.469s-0.34375,0.25-0.71875,0.5313c-0.375,0.2812-0.40625,0.3125-0.8125,0.5s-0.625,0.094-1.0938,0.2187c-0.46875,0.125-0.3125,0.1563-0.65625,0.2813s-0.4375,0.1562-0.875,0.3437-0.625,0.25-0.78125,0.3125c-0.15625,0.062-1.0938,0-1.5,0h-0.5s-0.375,0.1563-1.25-0.031c-0.875-0.1874-0.5625-0.031-1.3438-0.094-0.78125-0.062-0.65625-0.25-1.0625-0.4687-0.40625-0.2189-0.15625-0.094-0.71875-0.7501-0.5625-0.6563-0.59375-0.3438-1.0312-0.4688-0.43755-0.125-0.15625,0.094-0.46875,0.25-0.3125,0.1563-0.3125,0.1875-0.6875,0.4688-0.375,0.2812-0.6875,0-1.2188,0-0.53125,0-0.625,0.062-1.2188,0.125-0.59375,0.062-0.34375,0.1562-0.75,0.3125-0.40625,0.1562-0.71875,0.375-1.2188,0.4687-0.49995,0.094-0.28125-0.3437-0.46875-0.75-0.1875-0.4062-0.65625-0.625-0.78125-1.2187-0.125-0.5938-0.0312-0.3125-0.3125-0.6563-0.28125-0.3437-0.0937-0.062-0.84375-0.2812-0.75-0.2188-0.84375-0.1875-1.5-0.4375s-0.28125-0.125-0.78125-0.5313c-0.5-0.4062-0.625-0.4375-0.84375-0.6562-0.21875-0.2188-0.875-0.25-1.375-0.4375-0.49995-0.1875-0.125-0.062-0.46875-0.4063-0.34375-0.3437-0.28125-0.25-0.6875-0.4687-0.40625-0.2188-0.375-0.094-0.75-0.25-0.375-0.1563-0.28125-0.25-0.625-0.5s-0.21875-0.031-0.40625,0.1562c-0.1875,0.1875-0.15625,0.3125-0.34375,0.5625-0.18755,0.25-0.15625,0.4063-0.28125,0.625-0.12505,0.2188-0.0937,0.4688-0.15625,0.6563-0.0625,0.1875-0.2188,0.4062-0.25,0.5312s-0.375,0.1875-0.75,0.5938-0.46875,0.3437-1.0625,0.5c-0.59375,0.1562-0.65625,0.062-1.5625,0s-0.90625-0.2188-1.25-0.375c-0.3437-0.1563-0.0937-0.1563-0.3125-0.625-0.21875-0.4687-0.21875-0.094-0.59375-0.375-0.375-0.2813-0.625-0.3125-1.0312-0.4375-0.40625-0.125-0.75,0-1.1562,0-0.40625,0-1-0.1563-1.5625-0.375-0.5625-0.2188-0.15625-0.094-0.3125-0.25-0.15625-0.1563-0.28125-0.4375-0.4375-0.8125s-0.25-0.6563-0.375-0.9063-0.28125-0.3125-0.5625-0.625-0.4375-0.4687-0.75-0.6875-0.375-0.1875-0.5-0.25c-0.125-0.062-0.4375-0.1562-0.90625-0.2187-0.46875-0.062-0.125,0.062-0.625,0.3125-0.5,0.25-0.5625,0.4063-0.6875,0.5-0.125,0.094-0.40625,0.5-0.53125,0.625s-0.25,0.3125-0.5625,0.6875-0.3125,0.3125-0.59375,0.5937c-0.28125,0.2813-0.40625,0.4375-0.78125,0.7188-0.375,0.2812-0.28125,0.2812-0.59375,0.4062-0.3125,0.1249-0.53125,0.062-0.78125,0.094-0.25,0.031-0.53125,0-1.0625,0s-0.6875-0.125-0.84375-0.1562c-0.15625-0.031-0.4375-0.25-0.5625-0.3125-0.125-0.062-0.5-0.4063-0.6875-0.4688-0.1875-0.062-0.28125,0-0.90625,0s-0.3125,0.031-0.3125,0.031-0.21875,0.062-2.125,0.4688c-1.9062,0.4062-0.34375,0.25-0.5,0.3125-0.15625,0.062-1.3125,0.7187-1.3125,0.7187s-0.53125,0.4063-0.6875,0.5625c-0.15625,0.1563-0.53125,0.25-1.0938,0.5313-0.5625,0.2812-0.6875,0.25-1.25,0.5s-0.34375,0.2188-0.875,0.3125c-0.53125,0.094-1.2812-0.25-2.1875-0.8438-0.9063-0.5937-0.71875-0.3125-1-0.4687-0.28125-0.1563-0.34375-0.2813-0.46875-0.5-0.12505-0.2188,0.15625-0.5313,0.0937-0.6563-0.0625-0.125-0.12505-0.4375-0.21875-0.625s-0.25-0.5-0.875-1.4062c-0.625-0.9063-1.1562-0.9063-1.4062-1.0625-0.25-0.1563-0.375-0.25-0.78125-0.5313s-0.5625-0.2188-0.9375-0.3125c-0.375-0.094-0.5625-0.1875-0.8125-0.2812-0.25-0.094-0.3125-0.1875-1.2188-0.5313-0.90625-0.3437-0.875-0.1563-1.4062-0.1875-0.53125-0.031-0.5-0.062-0.96875-0.094-0.46875-0.031-0.53125-0.094-0.8125-0.3437-0.28125-0.2501-0.46875-0.3126-0.65625-0.3438-0.1875-0.031-0.71875-0.1563-1.2812-0.1875-0.5625-0.031-0.59375-0.062-1.3438-0.094-0.75-0.031-0.6875-0.062-1.125-0.062s-1.0312-0.062-1.2188-0.094c-0.1875-0.031-0.65625-0.375-1.1562-0.625-0.5-0.25-0.5-0.3437-0.5-0.3437l-1.0312-0.5625s-1.0938-0.125-1.7812-0.125c-0.6875,0-1.5625-0.094-2.1562-0.094-0.59375,0-0.65625,0.1562-0.9375,0.2812s-0.75,0.3438-0.90625,0.4375c-0.15625,0.094-0.75,0.3125-0.75,0.3125l-0.5625,0.2188s-1.0312-0.031-1.3125-0.031c-0.28125,0-0.6875-0.031-0.6875-0.031s-1.3125-0.1563-1.5938-0.2813c-0.28125-0.125-0.28125-0.1876-0.53125-0.2812-0.25-0.094-0.34375-0.2813-0.78125-0.4375-0.4375-0.1564-0.5-0.1564-0.84375-0.1875-0.34375-0.031-0.25,0.031-0.78125,0.2812-0.53125,0.25-0.5625,0.5313-0.8125,0.6875-0.25,0.1563-0.21875-0.0001-0.71875-0.094-0.5-0.094-0.40625-0.375-0.75-0.6875s-0.65625-0.5937-0.9375-0.875c-0.28125-0.2812-0.25-0.2187-1.8125-0.5312s-0.4375,0.125-0.65625,0.2812c-0.21875,0.1563-0.46875,0.4375-1.1875,1.0313-0.71875,0.5937-0.4375,0.25-0.78125,0.5s-0.375,0.2187-0.875,0.5312-0.46875,0.3438-0.875,0.6563-0.375,0.1875-0.8125,0.375-0.65625,0-0.90625-0.062-0.6875-0.3438-1.125-0.6875c-0.4375-0.3438-0.4375-0.2813-0.84375-0.5625-0.40625-0.2813-0.375-0.2188-0.84375-0.5s-0.28125-0.062-0.96875-0.25c-0.6875-0.1875-0.5625-0.031-1.25-0.094-0.6875-0.062-0.625-0.031-1.0938-0.094-0.46875-0.062-0.65625-0.031-1.5312-0.062s-0.3125,0-0.78125,0-0.9375-0.062-3.3125-0.062c-1.0049,0-1.0379,0.022-1.0312,0.031,0.0347,0.01,0.008,0.024-0.1875,0.031-0.78125,0.031-0.46875,0.062-1.25,0.125-0.78125,0.062-0.8125-0.062-1.0938-0.062-0.2812,0-0.25-0.3438-0.25-0.3438l-0.78125-0.5312s-0.6875-0.031-1.0625-0.031-0.84375-0.125-1.125-0.125-0.1875-0.25-0.40625-0.4688c-0.21875-0.2187-0.4375-0.5-0.59375-0.625s-0.625,0.2188-1.0938,0.5313c-0.46875,0.3125-0.40625,0.375-0.46875,0.5s-0.5,0.1875-0.5,0.1875-0.5-0.1563-0.75-0.3438-0.21875-0.1875-0.625-0.5312c-0.40625-0.3438-0.1875-0.125-0.71875-0.2813-0.53125-0.1562-0.6875,0.125-1.4062,0.2813-0.71875,0.1562-0.21875,0.094-0.53125,0.25-0.3125,0.1562-0.34375,0.1562-0.71875,0.3437s-0.40625,0.1563-0.84375,0.4063-0.1875,0.062-0.71875,0.375c-0.53125,0.3125-0.4375,0.1562-0.84375,0.25-0.40625,0.094-0.625,0.094-0.625,0.094l-2.0625,0.031c-0.46875,0.031-0.84375,0-2.8125,0.094s-0.4375,0.062-0.8125,0.1875c-0.375,0.125-0.71875,0.2188-1.4062,0.5-0.6875,0.2813-0.625,0.25-1.0625,0.4688-0.4375,0.2187-0.5,0.2812-0.90625,0.4687s-0.3125,0.094-0.5625,0.1875c-0.25,0.094-0.40625,0.125-1.2188,0.4375-0.81245,0.3125-0.1875,0.1875-0.78125,0.7188-0.59375,0.5312-0.5,0.4062-0.9375,0.7812s-0.625,0.4688-1.125,0.9375c-0.5,0.4688-0.75,0.625-1,0.875-0.25005,0.25-0.25005,0.375-0.34375,0.7188-0.0937,0.3437-0.34375,0.4687-0.5625,0.625-0.21875,0.1562-0.46875,0.031-0.46875,0.031s-1.4062-0.031-1.9688,0.031c-0.5625,0.062-0.5-0.25-0.71875-0.4062-0.21875-0.1563-0.0937-0.2188-0.21875-0.5313-0.125-0.3125-0.40625-0.7812-0.78125-1.25-0.375-0.4687-0.21875-0.2187-1.25-0.9375-1.0312-0.7187-0.6875,0-1.25,0.125s-0.5625,0.25-0.96875,0.4375-0.28125,0.2188-0.8125,0.4688-0.34375,0.2812-0.78125,0.7187-0.3125,0.2813-0.5625,0.375c-0.25,0.094-0.1875,0-1.5312-0.094-1.3438-0.094-0.8125-0.062-1-0.094-0.1875-0.031-0.375-0.1563-0.84375-0.4688s-0.125-0.094-0.46875-0.25c-0.34375-0.1561-0.125-0.031-0.96875-0.094-0.84375-0.062-0.75,0-1.3438,0-0.59375,0-0.53125,0.031-0.96875,0.062s-0.4375,0.125-1.0312,0.4375-0.25,0.25-0.5625,0.6562c-0.3125,0.4063-0.5625,0.625-1.0312,1.0625-0.46875,0.4375-0.46875,0.375-0.84375,0.7813-0.375,0.4062-0.28125,0.2812-0.71875,0.6875-0.4375,0.4062-0.375,0.3437-0.875,0.6875-0.5,0.3437-0.34375,0.2187-0.90625,0.6562s-0.4375,0.2813-0.8125,0.5938-0.34375,0.1875-0.65625,0.375c-0.3125,0.1874-0.4375,0.062-0.90625,0.094-0.46875,0.031-0.75,0.031-1.2812,0.062-0.53125,0.031-0.5,0.2188-0.65625,0.2813-0.15625,0.062-0.25,0.2187-0.46875,0.375-0.21875,0.1562-0.65625,0.2812-0.8125,0.3437-0.15625,0.062-0.5,0-0.71875,0s-0.4375-0.031-0.65625-0.031h-0.65625l-0.34375,0.031-0.78125,0.375-0.53125,0.5313-0.71875,0.062h-0.0625l-4.0312-0.3125s-0.90625-0.1875-1.1875-0.25c-0.28125-0.062-0.5625-0.375-1.0312-0.9063-0.46875-0.5312-0.65625-0.5625-1.2188-0.8437-0.5625-0.2813-0.5625-0.375-1.0312-0.6563-0.46875-0.2812-0.84375-0.625-1.0312-0.7187-0.1875-0.094-1.4375,0.2187-2.0312,0.2187-0.59375,0-0.75-0.1875-1.0625-0.3125s-0.34375-0.1875-1.25-0.625-0.84375-0.3437-1.25-0.5c-0.40625-0.1562-1.125-0.875-1.5625-1.3125s-0.46875-0.5625-0.59375-1.4375,0.40625-0.3437,0.5625-0.8125c0.1563-0.4687-0.0625-0.8437-0.0937-1.5312-0.0312-0.6874,0.0312-0.5-0.0312-0.5938-0.0625-0.094-0.53125-0.6249-0.65625-0.5312-0.125,0.094-0.34375,0.2187-0.59375,0.4062s-0.25,0.125-1.25,1.0625-0.53125,0.4375-0.8125,0.6563-1.25-0.031-1.6875-0.031-1.3438-0.1251-2.0312-0.1562c-0.6875-0.031-1-0.031-1.25-0.031s-0.78125-0.1563-0.78125-0.1563l-1.2812-1.2812c-0.56255-0.25-0.34375-0.5-0.65625-0.8125s-0.8125-0.3125-1.4375-0.5-0.1875-0.031-1.5312,0.125c-1.3438,0.1562-0.53125,0.3125-1,0.5312s-0.3125,0.125-0.875,0.1875c-0.5625,0.062-0.3125-0.031-0.3125-0.031s-0.0625-0.4687-0.0937-0.7187-0.0312-0.1563-0.3125-1.125c-0.28125-0.9688-0.59375-0.062-1.0938-0.1563-0.5-0.094-0.875-0.062-1.6875-0.1562-0.81255-0.094-0.5,0.094-0.90625,0.2187-0.40625,0.125-1.5625-0.031-2.2188-0.062-0.65625-0.031-1.125-0.031-1.9688-0.125-0.84375-0.094-0.625-0.094-1.1875-0.1875-0.5625-0.094-0.5-0.2812-1.5312-0.9062s-0.90625-0.4688-1.5625-0.9375c-0.65625-0.4688-0.59375-0.4688-1.6875-1.3438s-0.375-0.3437-0.96875-1.0625c-0.59375-0.7187-0.625-1.0312-0.875-1.6562s-0.6875-0.9063-1.1875-1.4688-0.40625-0.5312-0.84375-1.0937-1.0938-2.4063-1.1562-2.6875c-0.0625-0.2813-0.25-0.4375-0.46875-0.8125s-0.0625-0.3438-0.21875-0.8125c-0.1562-0.4688-0.125-1-0.125-1.4688,0-0.4687,0.21875-1.1875,0.21875-1.5312,0-0.3438,0.00005-0.2188,0.0937-1.375,0.0937-1.1563,0.18755-0.2813,0.28125-0.4688s0.15625-0.094,0.40625-0.2812c0.25-0.1875,0.34375-0.2188,0.65625-0.5,0.31245-0.2816,0.0625-0.3441,0.0625-0.3441s-0.375-0.3125-0.59375-0.5625c-0.21875-0.2499-0.40625-0.1875-0.53125-0.2187-0.125-0.031-0.84375-0.094-1.0312-0.094-0.1875,0-1.0312,0.062-1.0312,0.062s-0.0625,0.031-0.46875,0.3125c-0.40625,0.2813-0.53125,0.2813-0.9375,0.375-0.40625,0.094-0.90625,0-1.2812,0.062-0.375,0.062-0.59375,0-0.84375,0s-0.5-0.0001-1.3438-0.031c-0.84375-0.031-0.25-0.3125-0.4375-0.5938-0.1875-0.2812-0.46875-0.2187-0.46875-0.2187s-0.9375-0.031-1.1875-0.031z").attr(attr);
            eur.dk = R.path("m521.33,150.66-0.97228-0.044-0.66291-0.4419-0.44194-0.3094-0.7955-0.221-0.97227-0.1325-0.66291,0-0.66291,0.2209-0.57453,0.2652-0.30936,0.3094s-0.35355,0.044-0.66291,0.1767c-0.30936,0.1326-1.0165,0.1326-1.0165,0.1326l-0.26517,0.3536s-0.0884,0.088-0.44194,0.3093c-0.35355,0.221-0.70711,0.2652-0.97227,0.3094-0.26517,0.044-0.83969,0.044-1.0607,0.044-0.22097,0-0.61872,0.044-0.88389,0.044-0.26516,0-1.4584-0.1326-1.4584-0.1326l-0.7955-0.3977-0.35355-0.3094s-0.30936-0.3536-0.7513-0.3536h-0.92808s-0.0884,0.088-0.0884,0.2652c0,0.1768-0.0884,0.5303-0.0884,0.5303s-0.17677,0.044,0.13258,0.2652c0.30936,0.221,0.39775,0.221,0.66292,0.3977,0.26516,0.1768,0.57452,0,0.7513,0.4862,0.17677,0.4861,0.26516,0.7071-0.0442,0.9723-0.30936,0.2651-0.35355,0-0.48613,0.3535-0.13258,0.3536-0.35356,1.0165-0.35356,1.0165s0.30936,0.088-0.13258,0.2209c-0.44194,0.1326-0.26516,0.088-0.7513,0.1768-0.48613,0.088-0.22097,0.1326-0.97227,0.1326s-1.149,0-1.3258-0.044c-0.17677-0.044-0.88388-0.3977-0.88388-0.3977s-0.44194-0.4862-0.53033-0.1326c-0.0884,0.3535-0&17678,0.4419-0.17678,0.8397,0,0.3977-0.22097,0.4419-0.0884,1.1048,0.13258,0.6629-0.13259,0.6187,0.22097,0.7955,0.35355,0.1768,0.0442-0.044,0.66291,0.3536,0.61872,0.3977,0.79549,0.7513,0.79549,0.7513s0.66292,0.1767,0.57453,0.5303c-0.0884,0.3535-0.35356,0.4861-0.35356,0.4861s-0.48613-0.1326-0.48613,0.3094c0,0.4419,0.0884,0.7071,0.26516,0.8839,0.17678,0.1768,0.26517-0.1768,0.26517,0.3093,0,0.4862,0.0442,0.5304-0.0442,1.0607s-0.13258,0.6187-0.30935,0.7955c-0.17678,0.1768-0.53033,0.3535-0.53033,0.3535s-0.0884,0.7955,0.0442,0.9723c0.13258,0.1768,0.17678,0.4861,0.44194,0.6187,0.26517,0.1326,0.44194,0,0.48614,0.221s0.0442,0.3094,0.0442,0.5303v0.442c0,0.1768-0.44194,0.2209,0,0.3977s0.26517,0.221,0.92808,0.3094c0.66291,0.088,0.44194,0.044,1.149,0.1326,0.7071,0.088,1.9887,0.088,2.1655,0.2209,0.17678,0.1326,0.17678-0.5303,0.48614,0.442,0.30936,0.9722,0.39775,1.591,0.39775,1.591v0.6187s0.48613,0.221,0.7071,0.4419c0.22097,0.221,0.35356,0.7513,0.35356,0.7513s0.26516-0.3535,0.0442,0.3094c-0.22097,0.6629-0.44194,1.0606-0.44194,1.0606s-0.30936,0.2652-0.57453,0.2652c-0.26516,0-0.35355-0.7513-0.88388,0.044-0.53033,0.7955-0.66291,0.9723-0.66291,0.9723l-0.26517,0.4861s-0.17677,0.3978-0.39774,0.044c-0.22098-0.3535-0.48614-0.6629-0.48614-0.6629s-0.53033-0.5303-0.70711-0.8839c-0.17677-0.3535-0.44194-0.7513-0.44194-0.7513l-0.83969-0.3093s-0.97227-0.3536-1.3258-0.3094c-0.35356,0.044,0.0884-0.2652-0.70711,0.088-0.7955,0.3536-1.3258,0.3536-1.3258,0.3536l-0.13258,0.1325-0.22097,0.1768s-0.17678,0.3094-0.22097,0.4862c-0.0442,0.1767-0.17678,0.3535-0.17678,0.3535s0.0884,0.044-0.0884,0.2652c-0.17678,0.2209-0.26517,0.1326-0.39775,0.4861-0.13259,0.3536-0.17678,0.5303-0.17678,0.5303s0.0442,0.3978,0.26517,0.6188c0.22097,0.2209,0.26516,0.5303,0.53033,0.6629,0.26516,0.1326,0.92807,0.3093,1.1932,0.5303,0.26516,0.221,0.22097,0.221,0.48613,0.3536,0.26517,0.1325,0.13259,0.1325,0.61872,0.3977,0.48614,0.2652,1.4142,0.7955,1.4142,0.7955s0.22097,0.3536,0.44194,0.5303c0.22097,0.1768,0.48613,0.3978,0.48613,0.3978s0.39775,0.088,0.57453,0.044,0.22097-0.088,0.39775-0.2652c0.17677-0.1768,0.13258-0.2652,0.39774-0.3536,0.26517-0.088,0.0884-0.1767,0.70711-0.1325,0.61872,0.044,0.35355-0.3536,0.83969,0.044,0.48614,0.3977,0.66291,0.6187,0.66291,0.6187l0.13258,0.3093s0.35356,0.1768,0.88389,0.1768,0.79549-0.044,0.97227,0,0.59664,0.3536,0.59664,0.3536l0.33147,0.2209,0.22097,0.044s0-0.2209,0.13258-0.4861,0.17678-0.2652,0.26517-0.6629c0.0884-0.3978,0.0884-0.7513,0.0884-0.7513s-0.13258-0.1768,0-0.3536c0.13259-0.1768,0.22098-0.3977,0.22098-0.3977s0.0442-0.1326,0.26516-0.2652c0.22097-0.1326,0.39775-0.3093,0.66291-0.4861,0.26517-0.1768,0.0884,0,0.44194-0.3094,0.35356-0.3093,0.26517-0.2652,0.48614-0.4861,0.22097-0.221,0.30936-0.2652,0.57452-0.6187,0.26517-0.3536,0.39775-0.3978,0.53033-0.6188,0.13259-0.2209,0.26517-0.4419,0.26517-0.4419s0.17678-0.2652,0.44194-0.3978c0.26517-0.1325,0.39775-0.2651,0.61872-0.3093,0.22097-0.044,0.17678-0.088,0.48614-0.088s0.66291,0.044,0.83969,0.044c0.17677,0,0.39774,0.044,0.66291,0.044h0.66291c0.22097,0,0.13258,0.044,0.30936-0.088,0.17678-0.1326,0.17678-0.044,0.22097-0.2652,0.0442-0.2209,0.0442-0.088,0.0442-0.3093,0-0.221,0.13259-0.221,0-0.442-0.13258-0.2209-0.30935-0.3977-0.30935-0.3977l-1.3258-0.442-0.83969-0.3093s-0.48613-0.1326-0.66291,0.1768c-0.17678,0.3093-0.26517,0.3977-0.26517,0.3977s0.30936,0.1326-0.39774,0.2652c-0.70711,0.1326-1.4142,0.1326-1.4142,0.1326l-0.30936-0.088s-0.26516-0.3536-0.26516-0.5304-0.17678-0.1326,0-0.4419c0.17677-0.3094,0.26516-0.3094,0.39775-0.4861,0.13258-0.1768,0.26516-0.3094,0.26516-0.3094s0.0442-0.088,0.0442-0.3536c0-0.2651-0.0442-0.4419-0.0884-0.6629s-0.13259-0.3093-0.13259-0.4861v-0.8397l0.22097-0.4419,0.35356-0.1768s0.17677-0.044,0.61872-0.044h0.88388c0.39775,0,0.0884,0.088,0.7513,0,0.66291-0.088,0.90597-0.1105,0.90597-0.1105l0.50822-0.464,0.0884-0.7071,0.0442-0.3978-0.22097-0.4419-0.7513-0.3978s-0.39775-0.1767-0.75131-0.3977c-0.35355-0.221-0.48613-0.221-0.88388-0.5303-0.39775-0.3094-0.39775-0.2652-0.48613-0.4862-0.0884-0.221,0.26516-1.6352,0.26516-1.6352s0.17678-0.2651,0.35355-0.3977c0.17678-0.1326,0.53033-0.4199,0.53033-0.4199l0.79549-0.1104,0.53033-0.1326,0.39775-0.1768,0.53033-0.088,0.39774-0.044,0.35356-0.2652s0.17677-0.1767,0.35355-0.3093,0.44194-0.3536,0.44194-0.3536l0.17678-0.2652s-0.0442-0.2651,0-0.4861,0.0442-0.2652,0.0442-0.4861v-0.5745-0.3536c0-0.1768-0.22097-0.5745-0.22097-0.5745l-0.13258-0.3978-0.30936-0.4861-0.35355-0.5303v-0.3094l0.61872-0.5303,0.35355-0.3094,0.35355-0.3093,0.39775-0.5304,0.13258-0.2209,0.22097-0.3536s0-0.088,0.0884-0.221c0.0884-0.1326,0.13258-0.4861,0.13258-0.4861l-0.0442-0.3094-0.0884-0.2209-0.22097-0.2652-0.30936-0.044h-0.0442").attr(attr);
            eur.dk1 = R.path("m545.38,168.48,1,0.062,0.4375,0.5s0.0625,0.1875,0.4375,0.375,0.5625,0.125,0.9375,0.4375,0.8125,0.9375,0.8125,0.9375,0.0625,0.1875,0.125,0.4375,0.0625,0.3125,0.1875,0.6875,0.0625,0.6875,0.125,1,0.1875,0.9375,0.1875,0.9375l-0.125,0.4375-0.625,0.3125-0.75,0.062-1-0.1875s-0.125-0.062-0.375-0.1875c-0.25-0.125-1.0625-0.6875-1.0625-0.6875l-0.5625-0.625-0.375-0.625-0.4375-0.875-0.1875-0.625s0.0625-0.062,0-0.5c-0.0625-0.4375-0.0625-0.5-0.0625-0.75v-0.625l0.1875-0.3125z").attr(attr);
            eur.dk2 = R.path("m487.54,159.68,0.0625,1.5s-0.125,0.016,0.10937,0.25c0.23438,0.2344,0.40625,0.4219,0.4375,0.5157,0.0312,0.094,0.0469,0.2656,0.0625,0.5156s-0.0156,0.3125,0.0156,0.5937c0.0312,0.2813,0.0937,0.4532,0.10937,0.5782,0.0156,0.125-0.0156,0.3125,0.0156,0.5625s0.0469,0.4062,0.0469,0.4062l0.34375,0.3281s-0.20312,0.2032-0.1875,0.3282c0.0156,0.125-0.0312,0.25,0.0156,0.3593,0.0469,0.1094,0.14062,0.3438,0.28125,0.4375,0.14062,0.094,0.48437,0.2969,0.59375,0.4844,0.10937,0.1875,0.45312,0.6094,0.54687,0.75,0.0937,0.1406,0.35938,0.3281,0.35938,0.3281s0.0781,0.047,0.46875,0.062c0.39062,0.016,0.6875,0.016,0.875,0.016s0.84375,0.016,0.84375,0.016,0.39062,0.047,0.4375,0.1719c0.0469,0.125,0,0.062,0.14062,0.2969,0.14063,0.2344,0.20313,0.4219,0.3125,0.4375,0.10938,0.016,0.8125,0.2344,0.8125,0.2344s0.0937,0.031,0.29688,0.031c0.20312,0,0.46875-0.031,0.82812-0.031,0.35938,0,0.625,0,0.90625-0.016s0.53125-0.016,0.53125-0.016l0.125,0.125c0.0937,0.062,0.35938,0.1718,0.35938,0.2343,0,0.062,0.0156,0.094,0,0.2188-0.0156,0.125,0.0156,0.047-0.0781,0.25-0.0937,0.2031-0.15625,0.2031-0.25,0.3906-0.0937,0.1875-0.0469,0.1406-0.20312,0.2656l-0.23438,0.1875c-0.0781,0.1875-0.15625,0.2344-0.17187,0.2969-0.0156,0.062-0.125,0.1094-0.14063,0.1875-0.0156,0.078,0.0469,0.1094-0.0781,0.4844s0.0625,0.3594-0.20313,0.5937c-0.26562,0.2344-0.67187-0.062-0.76562,0.375-0.0937,0.4375-0.10938,0.7032-0.0781,0.8594,0.0312,0.1563-0.0312-0.016,0.0312,0.3125,0.0625,0.3281,0.10938,0.625,0.15625,0.7344,0.0469,0.1094,0,0.1406,0.0469,0.25s0.0781,0.2031,0.0781,0.2031-0.0312-0.016,0.26563,0.125c0.29687,0.1406,0.48437,0.2813,0.60937,0.2188,0.125-0.062,0.0156,0.062,0.21875-0.1563,0.20313-0.2187,0.17188-0.2969,0.35938-0.5s0.10937-0.1875,0.3125-0.3906c0.20312-0.2031,0.32812-0.1719,0.42187-0.4688,0.0937-0.2968,0.10938-0.3125,0.1875-0.5937,0.0781-0.2813,0.10938-0.2656,0.125-0.4688,0.0156-0.2031-0.0156-0.5468,0.0469-0.7656,0.0625-0.2187-0.0937-0.1094,0.15625-0.4531,0.25-0.3438,0.23437-0.3125,0.39062-0.5s0.34375-0.4375,0.53125-0.6719,0.5-0.5312,0.54688-0.5937c0.0469-0.062,0.48437-1.2969,0.5-1.4375,0.0156-0.1407,0.0937-0.094-0.0625-0.5938-0.15625-0.5-0.125-0.4687-0.35938-0.75-0.23437-0.2812-0.9375-0.625-0.95312-0.7812-0.0156-0.1563-0.0625-0.9532,0.0937-1.3282,0.15625-0.375,0.0781-0.2968,0.35937-0.5625,0.28125-0.2656,0.3125-0.047,0.39063-0.4531,0.0781-0.4062,0.0469-0.6719-0.0156-0.8281-0.0625-0.1563-0.15625-0.1563-0.35937-0.4531-0.20313-0.2969-0.45313-0.5-0.64063-0.6407-0.1875-0.1406-0.45312-0.3281-0.45312-0.3281s-0.39063-0.3281-0.32813-0.6406,0.0469-0.5,0.1875-0.75c0.14063-0.25,0.375-0.375,0.46875-0.5938,0.0937-0.2187,0.29688,0.1094,0.125-0.4843-0.17187-0.5938-0.40625-0.9219-0.45312-0.9844-0.0469-0.062-0.23438-0.2031-0.23438-0.2031s-0.375-0.031-0.5625,0.1093c-0.1875,0.1407-0.0156,0.3282-0.53125,0.3594-0.51562,0.031-0.14062,0.4688-0.8125-0.047-0.67187-0.5156-1.1094-1.1562-1.1719-1.25-0.0625-0.094-0.40625-0.6719-0.71875-0.5312-0.3125,0.1406-0.40625,0.1093-0.48438,0.25-0.0781,0.1406-0.28125,0.4687-0.59375,0.6875-0.3125,0.2187-0.64062,0.2812-0.64062,0.2812l-1.6094-0.2344s-0.375,0.2188-0.42187,0.3125c-0.0469,0.094-0.0469,0.2032-0.21875,0.3438-0.17188,0.1406-0.20313,0.1562-0.375,0.2031-0.17188,0.047-0.35938,0-0.5,0.047-0.14063,0.047-0.45313,0.047-0.5625,0.1406-0.10938,0.094-0.26563,0.1094-0.32813,0.2032-0.0625,0.094-0.26562,0.2343-0.29687,0.2968-0.0312,0.062-0.23438,0.25-0.23438,0.25z").attr(attr);
            eur.dk3 = R.path("m497.85,149.51s0.0625,1.7187,0.0625,1.875c0,0.1562-0.0312,0.4375,0,0.75s0.15625-0.1875,0.0625,0.6562c-0.0937,0.8438-0.15625,0.9375-0.15625,1.0938,0,0.1562-0.0625,0.3125-0.0625,0.4687,0,0.1563-0.15625,0.4063-0.15625,0.4063l-0.4375,0.062h-0.375l-0.4375-0.25-0.0625-0.1563c-0.0625-0.1562-0.0625-0.1562-0.0937-0.3437s-0.0937-0.1875-0.0937-0.4063c0-0.2187-0.0312-0.2812,0.0312-0.4687,0.0625-0.1875,0.0937-0.3438,0.21875-0.4375,0.125-0.094,0.15625-0.031,0.3125-0.2188,0.15625-0.1875,0.25-0.094,0.28125-0.3125,0.0312-0.2187,0-0.1562,0.0312-0.4062s0.0937-0.1563,0.0937-0.4688v-0.6562c0-0.2188-0.0312-0.2813-0.0312-0.4375v-0.375-0.375l0.15625-0.2813,0.15625-0.094z").attr(attr);
            eur.dk4 = R.path("m507.85,124.73-0.1875-0.1562s-0.15625-0.125-0.3125-0.1563c-0.15625-0.031-0.53125-0.125-0.75-0.125h-0.40625-0.5-0.8125-0.78125l-0.46875,0.062c-0.15625,0.062-0.1875,0.031-0.28125,0.1563-0.0937,0.125-0.1875,0.1562-0.21875,0.2812-0.0312,0.125-0.0625,0.1875-0.0625,0.3125s-0.0312,0.1875-0.0312,0.375v0.3438l0.3437,0.1562s0.125,0.062,0.3125,0.031,0.1875-0.031,0.46875-0.062,0.28125-0.062,0.5625-0.031,0.65625,0.062,0.65625,0.062l0.59375,0.062h0.28125c0.1875,0,0.5625,0.031,0.5625,0.031s0.0937-0.031,0.25-0.062c0.15625-0.031,0.21875,0,0.375-0.094s0.3125-0.125,0.3125-0.125l0.1875-0.1875v-0.1562-0.2813l-0.0312-0.2812z").attr(attr);
            eur.dk5 = R.path("m473.78,131.79,1.0828,0.088s0.50824-0.022,0.59662-0.088c0.0884-0.066,0.90598-0.7955,0.90598-0.7955s0.24307-0.2652,0.33146-0.3977c0.0884-0.1326,0.26517-0.3315,0.44194-0.5083,0.17678-0.1767,0.39775-0.3535,0.48614-0.4419,0.0884-0.088,0.7292-0.6408,0.7292-0.6408s0.24307-0.1547,0.46404-0.1768c0.22097-0.022,0.81759,0.022,0.81759,0.022s0.17678,0.022,0.30936-0.066c0.13259-0.088,0.24307-0.1547,0.33146-0.2431,0.0884-0.088,0.33146-0.4419,0.33146-0.4419s0.0221-0.1105,0.15467-0.1768c0.13259-0.066,0.44195-0.088,0.70711-0.088h0.66291,0.68501,0.86179l0.59662,0.1989c0.13258,0.1989,0.53033,0.6187,0.53033,0.6187s0.41985,0.022,0.55243,0.022,1.5247,0.1326,1.7457,0.1326c0.22097,0,2.8947-0.1326,3.0715-0.1326,0.17678,0,1.7678,0.066,1.8562,0.044s1.0386-0.7513,1.0386-0.7513,0.86179-0.2873,1.0386-0.1105c0.17677,0.1768,0.7292,1.0386,0.7292,1.0386l0.28726,0.5524,0.59662,0.221h0.61872l0.7955,0.022s0.11048-0.044,0.30936-0.2652c0.19887-0.221,0.39774-0.3094,0.57452-0.5524,0.17678-0.2431,0.41984-0.4641,0.53033-0.6408,0.11049-0.1768,0.17678-0.2652,0.33146-0.442s0.35355-0.2652,0.44194-0.4419c0.0884-0.1768,0.17677-0.4199,0.19887-0.663,0.0221-0.243-0.0884-0.5745-0.0884-0.7954,0-0.221,0-0.3536,0.13259-0.4862,0.13258-0.1326,0.15468-0.1768,0.30935-0.2872,0.15468-0.1105,0.28727-0.1326,0.39775-0.3315,0.11049-0.1989,0.13258-0.3535,0.19888-0.5082s0.0442-3.1599,0.0442-3.3809c0-0.2209,0.0442-0.4198-0.0442-0.5966s-0.33146-0.3315-0.44195-0.5745c-0.11048-0.2431-0.24306-0.2873-0.24306-0.6187,0-0.3315-0.17678-0.3757,0.0663-0.7071,0.24307-0.3315,0.11048-0.2431,0.46404-0.5746,0.35355-0.3314,0.48613-0.3977,0.66291-0.6187s0.24307-0.3756,0.35355-0.464c0.11049-0.088,0.30936,0.044,0.30936-0.3094,0-0.3535-0.0442-0.4861-0.0884-0.6187s-0.13258-0.2431-0.13258-0.2431l-0.61872-0.1105s0.11049-0.2209-0.33145,0.044c-0.44195,0.2652-0.41985,0.1105-0.61872,0.3315-0.19888,0.2209-0.28726,0.1547-0.53033,0.4861-0.24307,0.3315-0.37565,0.3536-0.59662,0.685-0.22097,0.3315-0.0663,0.3757-0.50824,0.5083-0.44194,0.1325-0.86178,0.088-1.4584,0.1546-0.59663,0.066-0.64082,0.066-1.0607,0.088-0.41985,0.022-0.68501-0.022-0.83969,0.022s-0.53033-0.022-0.68501,0.1105c-0.15468,0.1326-0.66292,0.3315-0.7955,0.5304-0.13258,0.1988,0.57453-0.5967-0.28726,0.3314s-1.127,1.0386-1.1932,1.1491c-0.0663,0.1104,0.0221,0-0.46404,0.5966s-0.57453,0.6629-0.64082,0.8397c-0.0663,0.1768-0.0884-0.1105-0.26516,0.4861-0.17678,0.5966,0.15468,0.2652-0.24307,0.9502s-0.39775,0.6408-0.61872,0.8397c-0.22097,0.1988-0.39775,0.3535-0.70711,0.5303s-0.26516,0.221-0.77339,0.3315c-0.50824,0.1104-0.70711,0.1325-0.70711,0.1325l-0.26517,0.7292-0.81759,0.044-0.83969-0.2209-0.92808-0.3315s-0.77339-0.1989-0.99436-0.1768c-0.22097,0.022-0.50824,0-0.68501,0.022-0.17678,0.022-0.64082-0.1988-0.90598,0.044-0.26517,0.2431-0.70711,0.3757-0.83969,0.4862-0.13259,0.1105-0.0884,0.1547-0.57453,0.1768-0.48613,0.022-1.2153-0.1768-1.2153-0.1768l-0.95017-0.2431-1.2816,0.1768s0.0221-0.088-0.24307,0.2651c-0.26517,0.3536-0.61872,0.4641-0.70711,0.6188-0.0884,0.1546-0.35355,0.4419-0.41984,0.5524-0.0663,0.1105-0.99437,1.9887-0.99437,1.9887s-0.59662,0.221-0.68501,0.3536c-0.0884,0.1326-0.0663,0.1326-0.26517,0.3756-0.19887,0.2431-0.28726,0.1768-0.39774,0.4199-0.11049,0.243-0.11049,0.088-0.17678,0.4198-0.0663,0.3315-0.17678,0.4199-0.17678,0.5745,0,0.1547-0.0442,0.1105,0,0.3536s0.19888,0.7513,0.19888,0.7513z").attr(attr);
            eur.dk6 = R.path("m473.61,162.52-0.14363,2.0771-0.0331,0.906-0.0442,0.685s-0.68501,0.4861-0.72921,0.5082c-0.0442,0.022-0.30936,0.9723-0.30936,0.9723l0.24307,0.7844,0.0111,0.2983,0.17678,0.022,0.17677-0.099,1.0938-0.1215,2.055,0.232,1.9666,1.1712,3.6239,1.37,1.0165-0.7403,1.0717-0.066,1.0275-0.033,0.56348-0.6297,0.45299-0.221,0.56347,0.033,0.50824,0.1326s0.37565,0.2983,0.43089,0.4088c0.0552,0.1104,0.0773,0.1767,0.13258,0.2541,0.0552,0.077,0.11049,0.1878,0.18783,0.2983,0.0773,0.1105,0.28726,0.2983,0.3646,0.4088,0.0773,0.1105,0.14363,0.2651,0.30936,0.3314,0.16573,0.066,0.23202,0.099,0.3646,0.1216,0.13258,0.022,0.0994,0.066,0.30936,0.066,0.20992,0,0.13258,0.011,0.29831-0.066s0.12153-0.033,0.32041-0.1879c0.19887-0.1546,0.29831-0.232,0.39774-0.3093,0.0994-0.077,0.11049-0.066,0.26517-0.2099,0.15468-0.1437,0.23202-0.1326,0.27621-0.3094,0.0442-0.1768,0.0663-0.2099,0.0442-0.3867s0.0331-0.1547-0.0884-0.3646c-0.12154-0.2099,0.0663-0.044-0.19887-0.3204-0.26517-0.2762-0.28727-0.2541-0.55243-0.5082-0.26517-0.2542-0.3646-0.3646-0.53033-0.5083-0.16573-0.1436-0.28726-0.2541-0.39775-0.3204-0.11049-0.066-0.7513-0.6076-0.82864-0.7623-0.0773-0.1547-0.3646-0.5083-0.3646-0.5083l-0.66292-0.3314s-0.38669-0.033-0.57452,0.022c-0.18782,0.055-0.67396-0.077-0.82864,0.077-0.15468,0.1547-0.20992,0.1768-0.32041,0.3204-0.11048,0.1436-0.25411,0.2873-0.40879,0.3314-0.15468,0.044-0.36461,0.088-0.61872-0.044-0.25412-0.1325-1.0054-0.4088-1.0054-0.4529,0-0.044-0.25412-0.2984-0.25412-0.4751,0-0.1768,0.0442-0.4088,0.14363-0.5967,0.0994-0.1878,0.20993-0.4529,0.25412-0.5082,0.0442-0.055,0.87284-0.5524,0.87284-0.5524s0.48613,0.088,0.67396,0c0.18782-0.088,0.32041,0.022,0.45299-0.1878,0.13258-0.21,0.14363-0.1989,0.22097-0.5414,0.0773-0.3425,0.13258-0.3757,0.12153-0.5635-0.0111-0.1878,0.0221-0.2652-0.0773-0.464-0.0994-0.1989-0.17677-0.2652-0.26516-0.3757-0.0884-0.1105-0.50824-0.4751-0.50824-0.4751l-0.19887-1.7235s-0.20992-0.1658,0-0.3536,0.29831-0.3094,0.50823-0.3756c0.20993-0.066,0.22097-0.055,0.44195-0.1437,0.22097-0.088,0.27621-0.055,0.47508-0.1989,0.19888-0.1436,0.19888-0.1215,0.3867-0.2541,0.18783-0.1326,0.14363-0.088,0.3646-0.1988,0.22097-0.1105,0.26517-0.055,0.46404-0.221,0.19888-0.1657,0.24307-0.1326,0.27622-0.2762,0.0331-0.1437,0.0552-0.1989,0.11048-0.3646,0.0552-0.1658,0.68501-1.2596,0.68501-1.2596s0.0442-0.033,0.11049-0.3204c0.0663-0.2872,0.0663-0.6187,0.0994-0.7181,0.0332-0.099,0.0111-0.2762,0.0884-0.4199,0.0773-0.1436,0.17678-0.2651,0.23202-0.3093,0.0552-0.044-0.0221-0.099,0.24307-0.1326,0.26516-0.033,0.64081,0,0.82864-0.033s0.33146-0.022,0.47509-0.088,0.27621-0.077,0.46404-0.1768c0.18782-0.099,0.19887-0.033,0.39774-0.221,0.19888-0.1878,0.30936-0.3756,0.30936-0.3756s0.0663-0.7071,0.27622-0.8618,0.24306-0.1878,0.35355-0.2762c0.11049-0.088,0.15468-0.099,0.28726-0.2431,0.13258-0.1436,0.18783-0.221,0.27622-0.2983,0.0884-0.077,0.0442-0.055,0.25411-0.1878,0.20992-0.1326,0.28726-0.099,0.4088-0.3094,0.12153-0.2099,0.0773-0.1657,0.19887-0.4088,0.12154-0.243,0.12154-0.3204,0.27622-0.4972,0.15468-0.1767,0.23202-0.2541,0.3204-0.3646,0.0884-0.1104,0.20993-0.8397,0.23202-0.928,0.0221-0.088-0.0221-0.1437-0.0221-0.3757s-0.0663-0.5082-0.0442-0.6077c0.0221-0.099,0.17678-0.696,0.17678-0.696s-0.14363-0.3425-0.13258-0.5193c0.011-0.1768,0.0552-0.3425,0.0884-0.4198,0.0332-0.077,0.23202-0.2652,0.23202-0.2652s-0.0994-0.3204,0.011-0.4972c0.11049-0.1768,0.23202-0.3094,0.23202-0.3094s0.0884-0.099,0.19888,0.011c0.11048,0.1105,0.48613,0.3536,0.48613,0.3536s0.14363,0.2099,0.20992,0.2762c0.0663,0.066,0.33146,0.2652,0.4088,0.2652,0.0773,0,0.46404-0.066,0.46404-0.066s0.12153,0.066,0.24307,0.232c0.12153,0.1657,0.28726,0.3425,0.28726,0.3425s0.27621,0.3094,0.32041,0.022c0.0442-0.2873,0.0663-0.3094,0.0442-0.5414s-0.14363-0.3314-0.0221-0.5303c0.12154-0.1989,0.14363-0.2873,0.22097-0.3536,0.0773-0.066-0.17677-0.099,0.20993-0.1104,0.3867-0.011,0.53033-0.055,0.59662-0.011,0.0663,0.044,0.20992,0.066,0.32041,0.2209,0.11048,0.1547,0.18782,0.2099,0.24306,0.3425,0.0553,0.1326-0.0552,0.1326,0.0663,0.1547,0.12153,0.022,0.46403,0.1105,0.49718,0.033,0.0331-0.077,0.12153-0.1878,0.20992-0.4419,0.0884-0.2542,0.0111-0.3204,0.26517-0.4751,0.25411-0.1547,0.17677-0.088,0.43089-0.2873,0.25412-0.1989,0.22097-0.221,0.49718-0.4088,0.27622-0.1878,0.35356-0.1215,0.57453-0.4419s1.138-0.6961,1.127-0.8066c-0.0111-0.1105-0.19887-0.4751-0.20992-0.6629-0.011-0.1878-0.0331-2.1103-0.0331-2.2207,0-0.1105,0.11049-0.1768,0.0221-0.3978-0.0884-0.221-0.14363-0.2872-0.19887-0.3756-0.0553-0.088-0.37565-0.2983-0.37565-0.2983s-0.22098-0.3426-0.82865-0.2321-0.74025,0.1105-0.74025,0.1105l-0.67396-0.011c-0.65186-0.011-1.0717-0.066-1.2043-0.066-0.13258,0-0.59662-0.1105-0.59662-0.1105s-0.88389-0.2983-0.92808-0.3646c-0.0442-0.066-0.13258-0.4088-0.44194-0.4419-0.30936-0.033-0.65187-0.1989-0.7734-0.088-0.12153,0.1105-0.33146,0.2431-0.43089,0.2431-0.0994,0-0.28726-0.1437-0.45299-0.044-0.16573,0.099-0.20993,0.1215-0.20993,0.1215s-0.18782-0.1326-0.0994-0.2762c0.0884-0.1437-0.0221-0.1326,0.18782-0.3094,0.20993-0.1768,0.16573-0.1547,0.35356-0.2431,0.18782-0.088,0.30936-0.1104,0.40879-0.1546,0.0994-0.044,0.0884-0.033,0.34251-0.1326,0.25411-0.099,0.15468,0.1878,0.33145-0.1547,0.17678-0.3425,0.19888-0.4088,0.19888-0.4088l0.0552-1.4805s-0.14363,0.077-0.22097-0.3535c-0.0773-0.4309-0.22097-0.3978-0.0994-0.674,0.12154-0.2762,0.12154-0.4088,0.15468-0.6408,0.0331-0.232-0.0111-0.3646,0.0442-0.5414,0.0552-0.1768-0.0111-2.5633-0.0111-2.5633l0.0221-0.4198,0.011-0.7955-0.83969-0.011s-0.55242-0.1768-0.56347-0.221c-0.011-0.044-0.28726-0.4972-0.28726-0.4972l-0.69606-1.0496-0.15468-0.1215-0.28726-0.033s-0.24307,0.044-0.35356,0.088c-0.11048,0.044-0.30936,0.1326-0.30936,0.1326l-0.99437,0.7513-1.7788-0.044-1.359,0.044-1.8562,0.077-2.2539-0.1768-0.47509,1.6904-0.71815,0.7845-0.18783,0.3204s0.37565,1.1048,0.45299,1.2706c0.0773,0.1657,0.27622,0.232,0.33146,0.4419,0.0552,0.2099,0.11048,0.1878,0.12153,0.4199,0.0111,0.232-0.0331,0.7734-0.0331,0.7734s-0.0773,0.055-0.16573,0.1546c-0.0884,0.099-0.25412,0.1658-0.25412,0.1658s-0.29831-0.1216-0.26516-0.1989c0.0331-0.077-0.20992-0.3757-0.15468-0.5856,0.0552-0.2099,0.0442-0.1989,0.011-0.4861-0.0331-0.2873-0.14363-0.442-0.18783-0.5966-0.0442-0.1547-0.14363-0.2652-0.18782-0.4309-0.0442-0.1658-0.19888-0.3425-0.19888-0.3425l-0.99437-0.2984-0.59662,0.1547c-0.15468,0.1547-0.20992,0.044-0.3646,0.3536-0.15468,0.3093-0.22097,0.2541-0.30936,0.5193-0.0884,0.2651-0.27621,0.685-0.3425,0.7623-0.0663,0.077-0.62977,0.9723-0.62977,0.9723s-0.53033-0.011-0.64082,0.055c-0.11048,0.066-0.62976,0.033-0.69605,0.099-0.0663,0.066-0.27622,0.011-0.32041,0.1326-0.0442,0.1215-0.18783,0.2099-0.17678,0.3977,0.0111,0.1878-0.0552,0.1547,0.0773,0.4751,0.13258,0.3204,0.19887,0.3646,0.25412,0.5856,0.0552,0.2209,0.0884,0.3646,0.0773,0.5193-0.011,0.1546,0.0994,0.1767-0.0773,0.464-0.17678,0.2873-0.60767,0.4419-0.60767,0.4419s-0.35356-0.1546-0.45299-0.3535c-0.0994-0.1989-0.30936-0.2983-0.29831-0.4641,0.011-0.1657-0.16573-0.1104-0.0773-0.4198,0.0884-0.3094-0.0773-0.2873,0.0884-0.5745,0.16573-0.2873,0.17678-0.2431,0.18783-0.442,0.0111-0.1988,0.0332-0.1878-0.0111-0.3646-0.0442-0.1767-0.011-0.232-0.15468-0.5193-0.14363-0.2872-0.18782-0.3425-0.18782-0.3425l-0.12154-0.6187s-0.14363-0.2099-0.19887-0.2651c-0.0552-0.055-0.25412-0.1768-0.34251-0.3204-0.0884-0.1437-0.33145-0.3867-0.33145-0.3867l-0.25412-0.221-0.0884-0.3867-0.24306-0.1105-0.49719,0.022h-0.35355l-0.0994,0.3535s-0.0773,0.1437-0.0442,0.4199,0.0994,0.5414,0.13258,0.6519c0.0331,0.1104-0.0552,0.1657,0.0552,0.2209,0.11049,0.055,0.29831,0.1768,0.34251,0.21,0.0442,0.033,0.28726,0.1767,0.35355,0.2651,0.0663,0.088,0.3425,0.674,0.3425,0.674s-0.011,0.022-0.0331,0.1878c-0.0221,0.1657-0.0663,0.4198-0.0773,0.4972-0.0111,0.077-0.0221,0.1105-0.13258,0.1326-0.11049,0.022-0.26517,0.022-0.37565,0-0.11049-0.022-0.46404-0.221-0.46404-0.221l-0.24307-0.1989-0.29831-0.3425-0.18783-0.221-0.3425-0.2762s-0.12154-0.1215-0.13258-0.1878c-0.0111-0.066-0.12154-0.2431-0.14364-0.3867s-0.0773-0.3093,0-0.453c0.0773-0.1436,0.0884-0.1768,0.13259-0.3425,0.0442-0.1657,0.0442-0.1768,0.0221-0.3204s-0.0773-0.2983-0.0773-0.2983l-0.13258-0.077s-0.23202-0.099-0.51928-0.099-0.3646-0.066-0.41984-0.022c-0.0553,0.044,0.0442-0.033-0.11049,0.1436-0.15468,0.1768-0.30936-0.1768-0.33146,0.3757-0.0221,0.5524,0.32041-0.088-0.0442,0.6187-0.3646,0.7071-0.30936,0.9391-0.30936,0.9391l-0.15468,1.0938s-0.32041,0.2652-0.3425,0.3646c-0.0221,0.099-0.22097,0.3646-0.27622,0.5635-0.0552,0.1989-0.0773,0.5745-0.0773,0.5745l0.0994,1.1601s-0.0221,0.2652,0.0773,0.3978,0.0221-0.011,0.20992,0.2651c0.18783,0.2763,0.23202,0.2652,0.32041,0.4641,0.0884,0.1988,0.13258,0.1768,0.12153,0.3867-0.011,0.2099-0.0884,0.3977-0.24306,0.5635-0.15468,0.1657-0.29831,0.2099-0.35356,0.3535-0.0552,0.1436-0.0442,1.1159-0.0442,1.1159l-0.43089,1.2153s1.2374,1.591,1.138,1.6573c-0.0994,0.066,0.53034,1.4584,0.54139,1.5137,0.011,0.055,0.96117,0.4861,0.93907,0.685s-0.12148,1.4584-0.12148,1.4584l-0.64082,0.8397-1.0276,0.8728s-1.0054,0.221-1.1269,0.3978c-0.12154,0.1767-0.55243,1.4805-0.55243,1.4805l-0.55243,0.5082s-0.17678,1.0275-0.25412,1.2485c-0.0773,0.221-0.7734,0.2983-0.80654,0.4972-0.0331,0.1989-0.27621,0.685-0.0552,0.8949,0.22097,0.2099,0.43089,0.2873,0.7734,0.6519,0.3425,0.3646,0.80654,0.928,1.1932,1.0938,0.3867,0.1657,0.79549,0.2099,0.79549,0.2099s0.76235,0.2541,0.85074,0.4088c0.0884,0.1547,0.18783,0.3867,0.24307,0.4198,0.0552,0.033,0.30936,0.033,0.67396,0.2652,0.3646,0.232,0.85074,0.3094,0.95017,0.464,0.0994,0.1547,0.34251,1.8452,0.34251,1.8452l-0.0111,1.2816z").attr(attr);
            eur.dk7 = R.path("m470.02,142.68-0.61872-0.1547l-0.24307,0.1768c0,0.1767-0.0442,0.5966-0.0442,0.685v0.3314c0,0.1326,0,0.2652-0.0221,0.5304-0.0221,0.2651-0.0884,0.4198-0.11048,0.5524-0.0221,0.1326-0.0663,0.1768-0.11049,0.464-0.0442,0.2873-0.0884,0.1989-0.0442,0.5746,0.0442,0.3756,0.0442,0.464,0.0442,0.7513,0,0.2872-0.0663,0.8396-0.0221,1.0164s0.0442,0.4199,0.0663,0.5083c0.0221,0.088-0.0221,0.3093-0.0221,0.464s-0.0884,0.3535-0.0442,0.5082,0.13259,0.5083,0.13259,0.5083,0.0442,0.1546,0.0663,0.243c0.0221,0.088,0,0.4641,0,0.4641l0.28726,0.6187,0.37565-0.8618,1.0386-0.3757,1.0386-0.7954,0.24307-0.3978s-0.22098-0.2873-0.39775-0.2873c-0.17678,0-0.68501-0.1988-0.68501-0.1988s-0.24307-0.1768-0.30936-0.2652c-0.0663-0.088-0.55243-0.5303-0.55243-0.5303s-0.22097-0.221-0.24307-0.3536-0.0884-0.1989-0.0884-0.3535c0-0.1547-0.0221,0.066,0-0.3094,0.0221-0.3756-0.0221-0.4198,0.0221-0.5745s-0.0221-0.2431,0.0884-0.3757c0.11049-0.1326,0.24307-0.2651,0.24307-0.2651l0.13258-0.1326s0.0884-0.066,0.24307-0.1989c0.15468-0.1326,0.17678-0.1105,0.28726-0.221,0.11049-0.1104,0.26517-0.3093,0.26517-0.3093z").attr(attr);
            eur.dk8 = R.path("m473.6,162.54-0.125,2.0938-0.75,0.1562-1,0.031s0,0.031-0.1875,0.1875c-0.1875,0.1563-0.4375,0.1563-0.5,0.2813s-0.28125,0.125-0.34375,0.4687c-0.0625,0.3438-0.125,0.4688-0.15625,0.625-0.0312,0.1563-0.15625,0.3438-0.15625,0.3438s-0.34375,0.094-0.5,0.2813c-0.15625,0.1875-0.3125,0.1562-0.34375,0.2812-0.0312,0.125-0.1875,0.094-0.0312,0.3438,0.15625,0.25,0.0937,0.3437,0.21875,0.4062,0.125,0.062-0.0312,0.1875,0.3125,0.2188,0.34375,0.031-0.1875,0.031,0.40625,0.031s0.71875,0.031,0.84375,0.031,0.625,0.062,0.625,0.062,0.0937,0.094,0.25,0.1562c0.15625,0.062,0.375,0.1563,0.375,0.1563s0.0937,0.125-0.0625,0.1875c-0.15625,0.062-0.40625,0.125-0.5625,0.1562-0.15625,0.031-0.34375-0.031-0.65625-0.031s-0.6875-0.094-0.6875-0.094-0.4375-0.094-0.71875-0.094-0.53125,0.094-0.53125,0.094-0.34375,0.094-0.5,0.4063c-0.15625,0.3125-0.375,0.5937-0.375,0.5937s-0.25,0.062-0.375,0.3125c-0.125,0.25-0.3125,0.4375-0.3125,0.4375s0,0.2813-0.15625,0.125c-0.15625-0.1562-0.15625-0.125-0.21875-0.3125s-0.21875-0.2812-0.21875-0.5c0-0.2187-0.1875-0.1875,0-0.3437,0.1875-0.1563,0.125-0.094,0.375-0.2813,0.25-0.1875,0.21875-0.125,0.34375-0.25s0.0937,0,0.25-0.3437c0.15625-0.3438,0.1875-0.5625,0.21875-0.8125,0.0312-0.25,0-0.3438,0.0312-0.5938s0-0.25,0-0.4375,0.21875-0.6875,0.21875-0.6875-0.0625-0.062,0.28125-0.3125c0.34375-0.25,0.34375-0.2812,0.5625-0.4375,0.21875-0.1562,0.4375-0.4375,0.4375-0.4375s0.0312-0.125,0.0937-0.375,0.0625-0.4062,0.15625-0.5625c0.0937-0.1562,0.0312-0.125,0.21875-0.375,0.1875-0.25,0.21875-0.25,0.34375-0.4062,0.125-0.1563,0.125-0.25,0.3125-0.375s0.25-0.25,0.40625-0.3125c0.15625-0.062,0.0625-0.1563,0.40625-0.1875,0.34375-0.031,0.40625-0.031,0.59375-0.031h0.46875z").attr(attr);
            eur.dk33 = R.path("M518.24,166.21z").attr(attr);
            eur.se = R.path("m572.48,105.34c0.96288-0.5549,1.6998,1.7101,0.92808,0.7513l-0.2265,0.2762-0.0387-0.055-0.28727,0.1768-0.13258,0.088-0.0663,0.066-0.13258,0.044-0.15469,0.464-0.35355,0.3535-0.90598,0.221-0.19887-0.1105-0.35355-0.1546s-0.19888,0.3756-0.19888,0.4861-0.0663,0.2652-0.0442,0.4419c0.0221,0.1768,0.0442,0.4862,0.11048,0.5967,0.0663,0.1104,0.11049,0.2209,0.24307,0.3314s0.0884,0.1105,0.19888,0.1768c0.11048,0.066,0.15467,0.4419,0.46403,0.8839,0.30936,0.4419,0.41985,0.6408,0.41985,0.7292,0,0.088-0.0442,0.088-0.0221,0.2651,0.0221,0.1768-0.0663,0.442-0.0663,0.5304,0,0.088,0.11049,1.2816,0.11049,1.2816s-0.28725,0.2431-0.37565,0.3536c-0.0884,0.1104-0.50823,0.2209-0.59663,0.3535s-0.30936,0.3536-0.30936,0.3536-0.0221,0.044,0.0221,0.2651c0.0442,0.221,0,0.442,0,0.442v0.2209c0,0.1105-0.0663,0.066,0,0.4641,0.0663,0.3977-0.0221,0.3756,0.13258,0.4861s-0.0663-0.088,0.41985,0.2873c0.48613,0.3756,0.37565,0.1547,0.53033,0.4198,0.15468,0.2652,0.13258,0.5745,0.13258,0.5745s-0.33145,0.1547-0.39775,0.2431c-0.0663,0.088-0.13258,0.1105-0.24306,0.1105-0.11049,0-0.7734-0.1768-0.7734-0.1768s-0.48614-0.066-0.59662-0.066-0.0884-0.044-0.19888,0-0.46404,0.022-0.7734,0.1326c-0.30935,0.1105-1.4805,0.066-1.37,0.2873,0.11047,0.2209,0.0221,0.3314,0.17677,0.464,0.15468,0.1326,0.15468,0.2431,0.37565,0.4199,0.22097,0.1767,0.15468,0.1325,0.33146,0.243s0.15468,0.088,0.30936,0.1547c0.15468,0.066,0.48613,0.7071,0.61872,0.8839,0.13258,0.1768,0.59662,0.5745,0.59662,0.5745s-0.17678-0.221,0.11048,0.1105c0.28727,0.3315,0.50824,0.5966,0.50824,0.5966s0.33145,0.2873,0.0663,0.442c-0.26517,0.1546-1.3258,0.2209-1.3479,0.3756s-0.0221-0.022-0.0663,0.3315,0,0.1325-0.0442,0.3535-0.17677,0.2873-0.19887,0.3757c-0.0221,0.088-0.24307,0-0.11049,0.4198,0.13257,0.4199-0.0442,0.4199,0.19887,0.6408,0.24307,0.221-0.0663-0.1105,0.48614,0.3757,0.55243,0.4861,0.7513,0.7955,0.7513,1.0164,0,0.221-0.17677,0.3978-0.19887,0.5304s-0.17677,0.3314-0.26517,0.4419-0.30935,0.3094-0.35355,0.4199c-0.0442,0.1104,0.0221-0.066-0.17678,0.1988-0.19887,0.2652-0.26516,0.3094-0.50823,0.5083-0.24306,0.1988-0.24306,0.1105-0.30936,0.2651-0.0663,0.1547-0.26516,0.5967-0.26516,0.5967s-0.0663,0.088-0.11049,0.1988c-0.0442,0.1105-0.11047,0.1989-0.19887,0.3978s-0.11049-0.1547-0.11049,0.3093c0,0.4641,0.11049,2.2318,0.11049,2.5191s-0.1326,0.3977-0.0884,0.5966-0.0442,0.3978,0.0442,0.5966c0.0884,0.1989,0.24307,0.2873,0.24307,0.2873l0.22097,0.1547s0.13258,0.243,0.13258,0.3314c0,0.088-0.0221,0.1989-0.17677,0.3315-0.15468,0.1326-0.15468,0.088-0.53033,0.221-0.37565,0.1325-0.99437-0.088-1.0165,0.2209-0.0221,0.3094-0.0442,0.8176-0.0442,0.8176v0.3757c0,0.1105,0,0.1547-0.0221,0.2872-0.0221,0.1326,0.0663,2.1214,0.11048,2.2981,0.0442,0.1768,0.0884,0.3757,0.0884,0.4862s0.0221,0.1105-0.0884,0.3756c-0.11048,0.2652-0.33144,0.442-0.39774,0.5525-0.0663,0.1104-0.11048,0.1104-0.17678,0.2651s-0.39774,0.4641-0.44194,0.6187c-0.0442,0.1547-0.13258,0.4641-0.13258,0.4641l-1.1932,1.1048-0.24306,0.221-0.50824,0.9944-0.26516,1.6573s-0.70711,0.7292-0.68501,0.8396c0.0221,0.1105-0.0221,0.6409-0.0221,0.7293,0,0.088-0.13258,0.8175-0.17678,0.9722s-0.13257,0.3757-0.19887,0.5083c-0.0663,0.1325-0.30936,0.3093-0.30936,0.3093s-0.15467,0.221-0.19887,0.4199c-0.0442,0.1988-0.11049,0.2872-0.11049,0.3977s-0.33145,0.7292-0.39775,0.8397-0.28726,0.2873-0.28726,0.2873l-0.30936,0.2651s-0.41984,0.022-0.44194,0.221c-0.0221,0.1989-0.13258,0.3535-0.24307,0.5524-0.11048,0.1989-0.26516,0.4199-0.30936,0.5083-0.0442,0.088-0.48613,0.3977-0.48613,0.3977l-0.44194-0.1105-0.39775-0.4198s0-0.1326-0.15468-0.1326-0.41985-0.088-0.59662-0.1105c-0.17678-0.022-0.92808-0.3094-0.92808-0.3094l-0.30936-0.3093s-0.55243-0.3536-0.68501-0.3315c-0.13258,0.022-0.0884-0.022-0.24307,0.022-0.15468,0.044-0.19887-0.066-0.39774,0.066-0.19887,0.1326-0.22097,0.1105-0.28727,0.1989-0.0663,0.088-0.11048,0.088-0.41984,0.1768-0.30936,0.088-0.72921,0.1105-0.95018,0.1547-0.22097,0.044-0.50823,0.022-0.50823,0.022s0.0663-0.022-0.41984,0.066-0.86179,0-0.86179,0l-0.46404-0.3978-0.46404-0.2873-0.17677,0.044s-0.30936,0.1105-0.41985,0.1989c-0.11048,0.088-0.24307,0.1768-0.24307,0.1768l-0.39774,0.044s0.11048,0.022-0.24307,0c-0.35356-0.022-0.50822-0.066-0.59662-0.066s-0.61871-0.1326-0.70711-0.088c-0.0884,0.044-0.17677,0.1547-0.24307,0.2652s0,0.088-0.22097,0.3314c-0.22097,0.2431-0.11048-0.088-0.39775,0.4199-0.28726,0.5082-0.57452,0.7292-0.57452,0.7292s-0.0221,0.044-0.0884,0.1768c-0.0663,0.1325-0.15468,0.2209-0.30936,0.3093-0.15468,0.088-0.24307,0.1105-0.37565,0.1326-0.13258,0.022-0.64081,0-0.64081,0s-0.46404-0.1326-0.57453-0.1547c-0.11048-0.022-0.46404-0.2431-0.46404-0.2431s-0.53032-0.1988-0.61872-0.1546c-0.0884,0.044-0.0221,0-0.30936,0.2209-0.28726,0.221-0.41984,0.4199-0.61871,0.6187-0.19888,0.1989-0.26517,0.022-0.46404,0.3978-0.19888,0.3757,0.64081,0-0.37565,0.5745-1.0165,0.5746-1.5026,0.7071-1.5026,0.7071s0.0663,1.2596-0.0442,1.4363c-0.11048,0.1768-0.44194,0.4862-0.44194,0.4862v0.1326s-0.0442,0.066-0.0442,0.2209c0,0.1547,0.0221,0.1989,0.0221,0.3978s-0.0442,0.221-0.0442,0.3977c0,0.1768-0.0663,0.1768-0.0221,0.442,0.0442,0.2651,0.0663,0.8176,0.17678,1.0164,0.11048,0.1989,0.11048,0.2652,0.11048,0.2652s0.15468,0.7955,0.44194,1.1491c0.28727,0.3535,0.37565,0.4419,0.39775,0.685,0.0221,0.243-0.0221,0.5082,0,0.7292,0.0221,0.2209,0-0.2652,0.0221,0.4861s0.0663,0.7292,0.0221,0.8397-0.0442,0.1547-0.15468,0.2873c-0.11049,0.1325-0.19887,0.1767-0.28727,0.3535s-0.37565,0.5524-0.37565,0.5524l-0.41984,0.1547s-0.46403,0.022-0.55243,0.066-0.86178,0.066-0.86178,0.066h-0.72921c-0.13258,0-0.41984-0.088-0.41984-0.088l-0.19888-0.1326-0.37565-0.4198-0.22097-0.221h-0.44194s-0.15468-0.044-0.46404-0.044-1.9666-0.022-1.9666-0.022c-0.36813,0.033-0.99055,0-1.5247-0.022l-0.44194,0.442-0.39775,0.3314s-0.24307,0.088-0.55242,0.1105c-0.30936,0.022-0.7734-0.044-0.90599,0.022-0.13258,0.066-1.2153,0.1326-1.2153,0.1326s-0.24306-0.022-0.44194-0.022c-0.19887,0-1.4142-0.1547-1.4142-0.1547l-0.7734-0.464-0.22097-0.221-0.61872-0.1547-0.66291-0.1547s-0.44194-0.066-0.61872-0.066h-0.46404l-0.30936-0.1326s-0.17677-0.1325-0.13258-0.2872c0.0442-0.1547-0.11048-0.2431,0.13258-0.3094,0.24307-0.066,0.13259-0.1105,0.48614-0.1105s0.61872,0.044,0.79549,0c0.17678-0.044,0.28727-0.066,0.39775-0.1546,0.11049-0.088,0.17678-0.044,0.22097-0.1989,0.0442-0.1547,0.0442-0.4199,0.11049-0.6408,0.0663-0.221,0.11048-0.4641,0.13258-0.5966,0.0221-0.1326,0-0.4862,0-0.5746,0-0.088-0.26516-0.464-0.13258-0.5966s0.19887-0.2652,0.30936-0.3315c0.11048-0.066,0.13258-0.1104,0.26516-0.2209s0.26517-0.1989,0.37565-0.3757c0.11049-0.1768,0.24307-0.464,0.22097-0.685-0.0221-0.2209,0.0442-0.2872-0.13258-0.5524s-0.35355-0.5082-0.44194-0.5966c-0.0884-0.088-0.61872-0.4199-0.61872-0.5304s-0.13258-1.9003-0.13258-1.9003l-0.50823-0.3094-0.28727-0.243-0.41984-0.442s-0.0663-0.088-0.13258-0.3535c-0.0663-0.2652-0.17678-0.2652-0.19888-0.4862-0.0221-0.2209-0.15468-0.5303-0.15468-0.5303s-0.15468-0.3757-0.15468-0.5524c0-0.1768-0.0221-0.5304-0.0663-0.6187-0.0442-0.088-0.48613-0.7734-0.48613-0.7734l-0.22097-0.4862-0.0884-0.4198-0.22097-0.5083-0.15468-0.4419-0.28727-0.4198-0.39774-0.5083s-0.0663-0.1326-0.11049-0.3314c-0.0442-0.1989-0.19887-0.5746-0.19887-0.7071,0-0.1326-0.0663-0.442-0.0221-0.5746,0.0442-0.1325,0.46404-0.4861,0.46404-0.4861s-0.11049-0.088,0.11048,0c0.22098,0.088,0.22098-0.044,0.50824,0.2431,0.28726,0.2872,0.0221,0.066,0.41984,0.3977,0.39775,0.3315,0.7513,0.5083,0.86179,0.5524,0.11048,0.044,0.53033,0.1326,0.66291,0.1326s0.48614-0.022,0.66291-0.1105c0.17678-0.088,0.50824-0.2872,0.50824-0.3977s0.24306-0.022-0.0884-0.5966c-0.33146-0.5745-0.41985-0.7292-0.41985-0.7292l-0.30936-0.3978s-0.79549-0.7955-0.97227-1.0164c-0.17677-0.221-0.83969-0.9944-0.83969-0.9944s0.30936-0.5524,0.39775-0.6629c0.0884-0.1105,0.13258-0.3315,0.28726-0.3978,0.15468-0.066,0.19888-0.243,0.35356-0.1326,0.15468,0.1105,0.0221-0.088,0.37565,0.2873,0.35355,0.3757,0.46404,0.442,0.53033,0.5524,0.0663,0.1105,0.0442,0.1326,0.17677,0.2431,0.13259,0.1105,0.0663,0.1326,0.24307,0.1326,0.17678,0,0.48614,0.066,0.59662,0,0.11049-0.066,0.41985-0.221,0.41985-0.3536,0-0.1325-0.0884-0.4861,0-0.5966s0.37565-0.2872,0.50823-0.3977,0.24307-0.088,0.35355-0.3315c0.11049-0.2431,0.24307-0.4861,0.11049-0.7292s-0.39775-0.5303-0.46404-0.7071c-0.0663-0.1768-0.17678-0.5524-0.17678-0.5524l-1.812-0.8176-0.53033-0.6629s0.0442-0.022-0.0442-0.1547c-0.0884-0.1326-0.15468-0.1768-0.24307-0.4199-0.0884-0.243-0.0442-0.088-0.11048-0.3756-0.0663-0.2873-0.13259-0.4861-0.17678-0.7734-0.0442-0.2873-0.0442-0.5303-0.0884-0.8397s-0.13258-0.8397-0.13258-0.8397l-0.41985-0.3535s0.0884,0.044-0.37565-0.221c-0.46404-0.2652-1.1048-0.6629-1.1048-0.6629l-0.26517-0.2431-0.68501-0.685-0.24306-1.8783s0.0221-0.044,0.0221-0.1988c0-0.1547-0.0884-0.6188-0.0884-0.7292,0-0.1105-0.13258-0.4862-0.13258-0.6188,0-0.1325-0.15468-0.3977-0.22097-0.5303-0.0663-0.1326-0.7513-1.2153-0.7513-1.3258s-0.0221-0.1326-0.0442-0.2873c-0.0221-0.1546-0.13259-0.3314-0.13259-0.4198,0-0.088-0.0442-0.3315-0.0663-0.4861-0.0221-0.1547,0-0.3315-0.0442-0.442s-0.48614-0.685-0.48614-0.685l-0.37565-0.3978-0.41984-0.3756s-0.11049-0.1105-0.11049-0.221-0.0442-0.2209,0.0442-0.4861,0.11048-0.7513,0.13258-0.9281-0.0884-0.2873-0.0221-0.5966c0.0663-0.3094,0.0663-0.3536,0.0663-0.6408,0-0.2873-0.0663-0.4862-0.15468-0.7292-0.0884-0.2431-0.35355-0.5525-0.41984-0.7292-0.0663-0.1768-0.26517-0.4862-0.26517-0.4862s-0.26516-0.8838-0.35355-1.1269c-0.0884-0.2431-0.39775-0.7071-0.46404-0.8397-0.0663-0.1326-0.41984-0.5303-0.44194-0.7513s-0.15468-0.6629-0.15468-0.7955-0.0442-0.4199,0-0.7071c0.0442-0.2873-0.0221-0.6408,0-0.7955s-0.11049-0.3094,0.0663-0.685c0.17678-0.3757,0.0884-0.3757,0.26517-0.5745,0.17677-0.1989,0.22097-0.3094,0.35355-0.4199s0.53033-1.5247,0.53033-1.5247,0.64081-0.5082,0.7292-0.5745c0.0884-0.066,0.26517-0.5082,0.26517-0.5082l-0.19888-0.4199s-0.30935-0.3314-0.79549-0.2872c-0.48614,0.044-0.53033,0.044-0.53033,0.044l-0.95018-0.1325h-0.81759-0.17677l-0.7734-0.2431s-0.28726-0.4419-0.22097-0.5303c0.0663-0.088,0.41984-0.3757,0.41984-0.3757l0.41985,0.1105s0.15468,0.1105,0.30935,0.1547c0.15468,0.044,0.41985,0.1768,0.59663,0.221,0.17677,0.044,0.44194,0.1325,0.59662,0.1325s0.35355-0.088,0.50823-0.1988c0.15468-0.1105,0.33146-0.2652,0.48614-0.3315,0.15468-0.066,0.37565-0.1989,0.53033-0.3314,0.15468-0.1326,0.28726-0.3094,0.28726-0.3094s-0.13258-0.4198-0.13258-0.5082c0-0.088-0.11049-0.442-0.11049-0.442h-0.59662l-0.35355,0.088-0.61872,0.088-0.66291-0.1768-0.30936-0.243-0.22098-0.6187-0.57452-0.1768-0.50823-0.6629,0.0221-0.2652v-0.3093l-0.33145-0.1989-0.55243-0.066-0.59662-0.3536-0.30936-0.5966-0.0442-0.464,0.0442-0.8397s0.0221-0.3094,0.15468-0.3978c0.13258-0.088,0.33146-0.1768,0.46404-0.3093,0.13258-0.1326,0.35355-0.3536,0.37565-0.5083s0.0221-0.5524,0.0442-0.7734c0.0221-0.2209-0.22097-0.7292-0.22097-0.9059,0-0.1768-0.0442-0.5967-0.0442-0.5967l-0.15468-0.3756-0.19887-0.2873-0.26517-0.2431-0.24307-0.5303-0.0221-0.5745s0.68501-0.6408,0.7513-0.7734c0.0663-0.1326,0.0884-0.3094,0.15468-0.4198,0.0663-0.1105,0.11048-0.3315,0.11048-0.6188,0-0.2872-0.0442-0.5524-0.0442-0.6408,0-0.088-0.11049-0.5082-0.11049-0.5082s-0.35355-0.3315-0.44194-0.4641c-0.0884-0.1325-0.46404-0.6408-0.46404-0.6408l0.41985-1.0606s-0.0663-0.3315,0.0442-0.3978c0.11049-0.066,0.24307-0.2209,0.30936-0.3093,0.0663-0.088,0.19887-0.044,0.24307-0.2873,0.0442-0.2431,0.11048-0.4419,0.11048-0.4419s0.11049-0.1547,0.19888-0.221c0.0884-0.066,0.41984-0.221,0.41984-0.221h0.22097l0.66291,0.1326,0.53033,0.2652-0.0221,0.6187,0.11048,1.0385,0.0442,1.7457,0.7734,0.2652,0.33145,0.6187s0.7513-0.4419,0.83969-0.4861c0.0884-0.044,0.48614-0.221,0.68501-0.3315s0.64082-0.5303,0.7734-0.6408,0.57452-1.2595,0.61872-1.4584,0.48613-1.8562,0.48613-1.8562,0.57453-1.149,0.59662-1.2595c0.0221-0.1105-0.57452-1.0386-0.57452-1.0386l-0.66291-1.0606s-0.17678-3.9333-0.11049-4.1322c0.0663-0.1989,0.0663-1.3921,0.0663-1.3921s0.68501-0.906,0.95018-0.9502c0.26516-0.044,1.6573-0.4198,1.6573-0.4198l0.33146-1.0607s0.24306-1.3479,0.24306-1.4584,0.13259-1.0165,0.13259-1.0165,0.46404-0.3535,0.59662-0.464,0.37565-0.4419,0.37565-0.4419l2.5191-0.3978,1.4363-0.7513,1.1048-1.0606,0.70711-1.2154,0.17677-2.74,0.44195-1.3921,0.77339-1.3259,0.68501-0.9943-0.15468-2.718-0.7513-0.9722-0.26516-0.7072-0.7513-1.2816-0.50824-1.834-0.59662-0.7292s-0.0884-0.906-0.0884-1.1049-0.0221-1.127,0.0221-1.2153c0.0442-0.088,0.24307-0.6409,0.24307-0.6409s0.83969-0.1546,1.0386-0.1546c0.19888,0,1.7236,0.1105,1.9224,0.022,0.19887-0.088,1.591-0.9944,1.591-0.9944l1.0165-1.9225,0.35355-1.1932s0.59662-0.685,0.61872-0.7734c0.0221-0.088,0.24307-1.2153,0.24307-1.2153l-0.37566-1.1049-0.59662-0.8839-1.1048-1.149-0.92808-0.685-0.99437-0.2652-0.95017-0.7513-1.0165-1.0386-0.7513-0.8396-0.35355-3.0494s0.86178-0.9502,0.92808-1.0607,0.30935-1.4584,0.33145-1.5468c0.0221-0.088,0.55243-1.3479,0.55243-1.3479l0.46404-1.6352s0.64081-0.6408,0.68501-0.8397,0.0442-1.4805,0.0663-1.6131-0.0442-1.1932-0.0442-1.1932l-0.66291-0.9281-0.41984-1.2595-0.64082-0.7734-0.19887-1.4584-0.0442-1.4143,0.26517-1.0385,0.53033-0.685-0.44194-2.3644s0.0442-0.5966,0.15468-0.7071,0.50823-1.0165,0.68501-1.1712c0.17677-0.1546,0.7071-0.9943,0.7513-1.0827,0.0442-0.088-0.0221-1.0165-0.0221-1.0165l-0.86179-1.1269-0.35355-1.0386-0.90598-1.127,0.55243-1.2595s0.37565-0.5524,0.61872-0.685c0.24306-0.1326,0.88388-0.7734,1.0386-0.8618,0.15468-0.088,0.95017-1.1932,0.95017-1.1932l0.0663-2.6738s0.44195-0.6408,0.66292-0.8397c0.22097-0.1988,0.97227-0.8839,1.0607-1.0385,0.0884-0.1547,0.37565-1.0165,0.50823-1.127s1.0607-1.0164,1.0607-1.0164l0.24307-0.5525,81.494,0.4751c-0.11046,0.696-0.11046,0.7402-0.11046,0.7402l0.11048,0.5083-0.0884,0.1105s-0.26517,0.2209-0.33146,0.3535c-0.17447,0.3063-0.44561,0.5982-0.64082,0.8397-0.0221,0.1326-0.41264,0.6434-0.41264,0.6434l-0.36075,0.2405-0.33146,0.3535-0.22097,0.1989-0.55243,0.3094-0.90598,0.2872s-0.0884-0.088-0.13258,0.2652c-0.0442,0.3536-0.0442,0.4198-0.0663,0.5303s-0.24307,0.5304-0.24307,0.5304l-0.95017,0.2651-0.68501,0.2431-0.15468,0.464s-0.37565,0.088-0.53033,0.1547c-0.15468,0.066-1.7236,0-1.7236,0l-0.35355,0.1326s-0.41985,0.1326-0.46404,0.221c-0.0442,0.088-0.28726,0.1988-0.35355,0.3756-0.0663,0.1768-0.17678,0.2873-0.28726,0.4862-0.11049,0.1988-0.37566,0.5082-0.39775,0.5966-0.0221,0.088-0.17678,0.1105-0.28726,0.3535-0.11049,0.2431-0.28727,0.4641-0.33146,0.6187-0.0442,0.1547-0.22097,0.7072-0.22097,0.7072l-0.13258,0.3535s0.0221,0.044-0.26517,0.1547c-0.28726,0.1105-1.1048,0.221-1.1048,0.221v-0.066l-0.59662-0.044-1.2374-0.066s-0.11049-0.022-0.17678,0.1326c-0.0663,0.1546-0.19887,0.1988-0.24307,0.3314s-0.0884,0.2431-0.33145,0.4199c-0.24307,0.1767-0.30936,0.1326-0.50824,0.3314-0.19887,0.1989-0.22097,0.1547-0.37565,0.3315s-0.41984,0.3093-0.55242,0.5082c-0.13259,0.1989-0.50824,0.4861-0.55243,0.7292-0.0442,0.2431-0.0663,0.442-0.0663,0.5966,0,0.1547-0.0221,0.442-0.11049,0.5083-0.0884,0.066-0.46404,0.3093-0.46404,0.3093l-0.59662,0.044-0.90598-0.044-0.64081,0.022-0.48614,0.1105c-0.0884,0.1105-0.37565,0.2431-0.41984,0.3315-0.0442,0.088-0.0884,0.1547-0.22097,0.243-0.13259,0.088-0.11049,0.022-0.35356,0.2652-0.24307,0.2431-0.50823,0.4861-0.50823,0.4861s-0.33146,0.3757-0.41985,0.4199c-0.0884,0.044-0.68501,0.1326-0.68501,0.3093,0,0.1768,0.0221,0.3094,0.0221,0.4862s-0.0663,0.2872-0.0663,0.4419-0.0442,0.3757-0.0442,0.5966v0.5746c0,0.2209-0.0442,0.5303-0.0221,0.7734,0.0221,0.243,0.13258,0.3314,0.0221,0.464-0.11049,0.1326-0.50824,0.022-0.70711,0.3757-0.19887,0.3535-0.24307,0.5524-0.24307,0.5524s-0.11048,0.1547-0.19887,0.1989c-0.0884,0.044-0.88389,0.2872-0.88389,0.2872l-0.64074-0.1326-0.97227-0.066-0.57453-0.1104-0.37565-0.1547-0.22097-0.3315-1.149-1.0165-0.41984-0.4861s-0.28726-0.022-0.24307,0.088c0.0442,0.1105,0.33146,0.4198,0.44194,0.5524,0.11049,0.1326,0.7734,0.8397,0.7734,0.8397l0.15468,0.221c0.19887,0.221,0.35355,0.3314,0.41984,0.4419,0.0663,0.1105,0.26517,0.8176,0.26517,0.8176s-0.48614,0.066-0.59662,0.1768c-0.11049,0.1105-0.7734,0.221-0.7734,0.3315v0.2651c0,0.1105,0.0884,0.5304,0.15468,0.7513,0.0663,0.221,0.50823,0.7292,0.50823,0.7292s0.0442,0.3094,0.0663,0.3978c0.0221,0.088,0.22097,1.4142,0.22097,1.4142s-1.0386,0.044-1.0607,0.1326c-0.0221,0.088-0.15468,0.2872-0.17677,0.3977-0.0221,0.1105-0.28726,0.3315-0.33146,0.4199-0.0442,0.088-0.35355,0.1767-0.35355,0.1767l-1.2816,0.044-0.41985,0.3536-0.33145,0.5745-0.53033,0.088-0.55243-0.2431-0.41985-0.3535-1.0828-0.5966s-0.28727,0.3977-0.30936,0.4861c-0.0221,0.088-0.0884,0.1768-0.11049,0.4419-0.0221,0.2652-0.0663,0.1989-0.0884,0.5525-0.0221,0.3535-0.15468,0.1988-0.0442,0.685,0.11048,0.4861,0.46404,0.9502,0.50823,1.0827,0.0442,0.1326,0.39775,0.9281,0.59662,1.0165,0.19888,0.088,0.68501,0.2431,0.7734,0.2873,0.0884,0.044,0.83969,0.2872,0.83969,0.2872s0.22097-0.2209,0.13258,0.1105c-0.0884,0.3315-0.15468,0.442-0.37565,0.6408-0.22097,0.1989-0.50823,0.2652-0.66291,0.3757s-0.7513,0.1768-0.7513,0.1768-0.0884,0.2651-0.0884,0.3535v1.2374s-0.0221,0.3094,0,0.4641-0.15468-0.2652,0.0221,0.3977,0.19887,0.9723,0.19887,0.9723l-0.19887,0.3757s-0.44194,0.7292-0.55243,0.9722c-0.11048,0.2431-0.11048,0.1989-0.35355,0.3978-0.24307,0.1988-0.39775,0.1767-0.53033,0.3756s-0.35356,0.3315-0.35356,0.4862c0,0.1546-0.0442,0.2872,0.15468,0.5966,0.19888,0.3093,0.19888,0.2872,0.41985,0.6408,0.22097,0.3535,0.37565,0.5966,0.44194,0.7513,0.0663,0.1547,0.0442,0.1768,0.19887,0.3756,0.15468,0.1989,0.37565,0.4199,0.48614,0.6409,0.11049,0.2209,0.19887,0.1104,0.19887,0.5524,0,0.4419,0.0442,0.5303,0,0.685s-0.28726,0.3315-0.28726,0.3315l-0.17677,0.022s-0.37566-0.4199-0.70711-0.4199c-0.33146,0-0.7513-0.066-0.7513-0.066s-0.37565-0.022-0.53033,0.088c-0.15468,0.1105-0.66292,0.7955-0.66292,0.7955s-0.13258-0.1326-0.26516,0.1547c-0.13258,0.2872-0.24307,0.2652-0.30936,0.5303-0.0663,0.2652-0.15468,0.5303-0.15468,0.5303l-0.11048,1.2596s-0.0221,0.7734,0.11048,0.9502c0.13258,0.1767,0,0.2651,0.28726,0.685,0.28726,0.4198,0.39775,0.3535,0.44194,0.685,0.0442,0.3314,0.0884,0.3977,0.0442,0.5966s-0.0442,0.1989-0.11049,0.5745c-0.0663,0.3757,0,0.3757-0.17677,0.7955-0.17678,0.4199-0.57453,0.7734-0.64082,0.8618-0.0663,0.088,0.28726,1.9445,0.28726,1.9445s-0.22097,0.044-0.11048,0.442c0.11048,0.3977,0.13258,0.1768,0.26516,0.7071,0.13259,0.5303,0.15468,0.5524,0.15468,0.7734s0.15468-0.1105-0.15468,0.5303-0.50823,0.5745-0.39774,0.8176c0.11048,0.2431,0.83968,1.0828,0.86178,1.1933,0.0221,0.1104-0.0442,0.3977,0.0221,0.5745s0.15468,0.1768,0.44194,0.5966,0.48614,0.7071,0.48614,0.7071,0.0663,0.1768,0,0.3315c-0.0663,0.1546-0.11049,0.1767-0.30936,0.4419-0.19888,0.2652-0.39775,0.3536-0.41985,0.4861-0.0221,0.1326-0.0663,0.221-0.0884,0.4199s-0.15468,0.3756-0.11048,0.5524-0.0442,0.2431,0.22097,0.442c0.26516,0.1988,0.0663,0.1767,0.53033,0.243,0.46404,0.066,0.57452,0.022,0.92808,0.066,0.35355,0.044,0.7513,0.044,0.83969,0.044,0.0884,0,0.41984,0.022,0.79549,0.1326,0.37565,0.1105,0.6484,0.3174,0.6484,0.3174s-0.0743,0.4075,0.36761,0.4738c0.44194,0.066,1.3796,0.2043,1.5122,0.1601,0.13259-0.044,0.54595-0.3741,0.9437,0.046,0.39775,0.4199,0.50065,0.421,0.63323,0.5978,0.13259,0.1767,0.18215,0.027,0.5136,0.6682,0.33145,0.6409,0.11539,0.6694,0.20378,0.802,0.0884,0.1326-0.16005-0.1261,0.2819,0.5368,0.44194,0.6629,0.37565,0.6629,0.50823,0.7955m-14.871,36.107-0.40883-0.3314s-0.74029-0.7954-0.91706-0.8838c-0.17678-0.089-0.11049-0.089-0.30936-0.1326-0.19888-0.044-0.39775-0.044-0.72921-0.1105-0.33146-0.066-0.28726-0.221-0.28726-0.221l0.22097-0.044,0.59662-0.1326h0.46404l0.72921,0.066,0.77339-0.044c0.61872-0.044,0.38671,0.044,0.38671,0.044s0.3425-0.022,0.51928-0.066c0.17677-0.044,0.53033-0.022,0.53033-0.022l0.28726-0.088,0.46404-0.1326,0.11048-0.088,0.50823-0.6187s0.13258-0.2872,0.17678-0.3977,0.0442-0.2431,0.0442-0.2431l0.97227,0.066,0.79549-0.044,0.41985-0.1326s0.15468-0.2209,0.35355-0.6187,0.39775-0.221,0.59662-0.3315c0.19888-0.1104,0.30935-0.1988,0.37565-0.2872,0.0663-0.088,0.24307-0.3315,0.26517-0.442,0.0221-0.1104,0.0663-0.1988,0.11048-0.3756,0.0442-0.1768,0.11049-0.3978,0.11049-0.4861,0-0.088,0.19887-0.442,0.19887-0.442l0.41985-0.1989,1.0165,0.1326,1.591,0.1547-0.33145-0.7955-0.17678-0.8397-0.0442-0.5082-0.0442-3.0936-0.7292-0.9502,0.13258-2.0108s-0.57452,0.1326-0.70711,0.1326c-0.13258,0-0.41984,0-0.64081-0.022s-0.33146-0.044-0.59662-0.1547c-0.26516-0.1105-0.22097-0.088-0.33146-0.1105-0.11048-0.022-0.39775-0.1989-0.39775-0.1989s-0.26515-0.2872-0.33145-0.3756c-0.0663-0.088-0.50824-0.5746-0.50824-0.5746s-0.15468-0.066-0.44194-0.3093c-0.28725-0.2431-0.24305-0.1768-0.33145-0.221-0.0884-0.044-0.24307-0.066-0.44195-0.1105-0.19887-0.044-0.44194-0.022-0.7513-0.066s-0.39774,0-0.61872-0.022c-0.22097-0.022-0.35355,0-0.68501-0.022-0.33144-0.022-0.35354-0.1767-0.41984-0.2651-0.0663-0.088-0.15468-0.221-0.15468-0.221l-0.46404-0.4861s-0.30936-0.044-0.66291-0.066-0.28726-0.066-0.41985-0.1326c-0.13257-0.066-0.19887-0.1326-0.19887-0.1326s-0.19886-0.088-0.26516-0.1768c-0.0663-0.088-0.0663-0.022-0.22098-0.088-0.15467-0.066-0.53033-0.1326-0.53033-0.1326l-0.35355-0.088-0.53033-0.088s-0.46404-0.066-0.70711-0.1326c-0.24306-0.066-0.79549-0.088-0.79549-0.088l-0.30936,0.022-0.44194,0.1547-0.37565,0.1326s-0.30936,0.088-0.68501,0.1326c-0.37564,0.044-0.30936,0.088-0.46404,0.088s-0.24307-0.088-0.44194-0.1767c-0.19889-0.088-0.0884-0.1768-0.0884-0.1768l0.0884-0.3094,0.50823-0.5966,0.37565-0.3314,1.2816,0.1546,0.64082-0.3756,0.22097-0.6629,1.0607-0.022,0.64081,0.2209,0.7734,0.5083,0.59662,0.6187,0.44195,0.3756,0.68501,0.044,1.1932-0.5524,1.0607-0.8839,0.68501,0.5966,0.64081,0.3094,0.70711,0.3536,0.7955,0.3977,0.41984-0.4861,0.7292-0.685,1.0165,0.2872,0.37565,0.6408,0.66291,0.6188,0.86179,0.8617,0.97227,0.4199,0.97227-0.221,0.86179,0.5524,0.41984,0.3536,0.8176-0.088,0.55242-0.1768,0.83969-0.022,0.61872,0.3315,0.15468,0.685-0.39775,0.5524-0.97227-0.022-0.24307,0.1326,0.24307-0.1326,1.0165,0.022,0.64081,0.5083-0.0663,0.1325,0.44194,0.1547,0.39775,0.022,0.7734,0.022,0.86179-0.044s0.28726-0.044,0.50823-0.1767c0.22097-0.1326,0.24307-0.1105,0.24307-0.1105l0.0884-0.1547s0.0884-0.1547,0.0884-0.6629c0-0.5083-0.13258-0.2431-0.13258-0.2431s-0.26516-0.4198-0.53033-0.7292c-0.26516-0.3094-0.33146-0.2873-0.66291-0.464-0.33146-0.1768-0.26517-0.1989-0.50824-0.2652-0.24305-0.066-0.24305-0.1326-0.33145-0.2652-0.0884-0.1325,0.0663-0.3535,0.0663-0.7071,0-0.3535,0.15467-0.7734,0.19887-0.9722,0.0442-0.1989,0.17678-0.1547,0.30936-0.2431,0.13257-0.088,0.22097-0.221,0.22097-0.221l0.66292-0.1105s0.53033-0.1767,0.66291-0.3093,0.22097-0.3094,0.24307-0.4199,0.17677-0.2651,0.17677-0.3535c0-0.088,0.13258-0.3315,0.15468-0.442s0.88389-0.2209,0.88389-0.2209,0.77339-0.8618,0.97227-0.9723c0.19887-0.1105,0.7734,0.022,0.7734,0.022l0.90598-0.066c0.26516-0.066,0.37565-0.088,0.50823-0.1547,0.13258-0.066,0.48613-0.2651,0.53033-0.3756s0-0.1547-0.22097-0.3978c-0.22097-0.243-0.13258-0.1326-0.26517-0.3314-0.13258-0.1989-0.24306-0.022-0.48613-0.066s-0.64082-0.1105-0.81759-0.1768c-0.17678-0.066-0.33145-0.3094-0.41985-0.464-0.0884-0.1547-0.0442-0.4641-0.0442-0.5967,0-0.1325,0.46402-0.4198,0.55242-0.5966s0.17678-0.1326,0.33146-0.3093c0.15468-0.1768,0.17678-0.3978,0.17678-0.7734,0-0.3757,0.0221-0.4641,0.0221-0.6188,0-0.1546-0.13258-0.2872-0.28726-0.5082s-0.24307-0.3093-0.68501-0.7292c-0.44194-0.4198-0.70709-1.3037-0.79549-1.37-0.0884-0.066-0.39775-0.3315-0.64082-0.4861-0.24307-0.1547-0.22097-0.066-0.35355-0.088s-0.44194-0.044-1.0607-0.221c-0.61872-0.1768-0.35356-0.044-0.59662-0.1105-0.24307-0.066-0.33146-0.066-0.48614-0.1105-0.15468-0.044-0.15468-0.2872-0.26516-0.464-0.1105-0.1768-0.0221-0.3315-0.0442-0.5966-0.0221-0.2652,0.0884-0.3757,0.11049-0.5525,0.0221-0.1767,0.15467-0.2209,0.22097-0.3977s0.0442-0.2431,0.0221-0.5966c-0.0221-0.3536-0.0884-0.442-0.17678-0.6629-0.0884-0.221-0.26517-0.221-0.46404-0.3757s-0.81759-0.088-0.81759-0.088l-0.72921-0.1105-0.55242-0.1105s-0.55242-0.5966-0.64082-0.685c-0.0884-0.088-0.35354-0.066-0.44194-0.1105-0.0884-0.044-0.41985-0.2872-0.55243-0.4198").attr(attr);
            eur.se2 = R.path("m598.52,118.24s0.14063-0.1093,0.15625-0.25c0.0156-0.1406,0.0781-0.375,0.10938-0.4531,0.0312-0.078,0.0781-0.2812,0.14062-0.3594,0.0625-0.078,0.0937-0.1093,0.1875-0.1718,0.0937-0.062,0.20313-0.125,0.29688-0.2032,0.0937-0.078,0.21875-0.2343,0.21875-0.2343l-0.10938-0.1875-0.39062-0.1094s-0.0625-0.031-0.21875,0-0.54688,0-0.625,0.031c-0.0781,0.031-0.625,0.047-0.625,0.047s-0.3125,0.016-0.40625,0.078c-0.0937,0.062-0.3125,0.1406-0.35938,0.2031-0.0469,0.062-0.0625,0.047-0.20312,0.2656-0.14063,0.2188-0.21875,0.2813-0.28125,0.5-0.0625,0.2188-0.14063,0.3594-0.17188,0.4688-0.0312,0.1094-0.15625,0.1875-0.25,0.2656-0.0937,0.078-0.20312,0.094-0.32812,0.1094-0.125,0.016-0.9375-0.1719-0.9375-0.1719l-0.34375-0.375s-0.625-0.2656-0.79688-0.25c-0.17187,0.016-0.32812,0.016-0.4375,0.047-0.10937,0.031-0.25-0.062-0.4375,0.078-0.1875,0.1406-0.79687,0.5938-0.79687,0.5938l-0.17188,0.125c-0.14062,0.125-0.6875,0.7812-0.6875,0.7812s0.0469-0.047-0.29687,0.078c-0.34375,0.125-0.5,0.062-0.60938,0.1719-0.10937,0.1094-0.76562,0.3125-0.79687,0.3906-0.0312,0.078-0.125,0.2031-0.14063,0.2969-0.0156,0.094-0.0312,0.1562-0.0469,0.2969-0.0156,0.1406-0.10938,0.6562-0.14063,0.7187-0.0312,0.062-0.15625,0.125-0.21875,0.2031-0.0625,0.078-1.1719,1.4375-1.1719,1.4375s-0.34375,0.1563-0.34375,0.3125c0,0.1563,0.0469,0.25-0.0156,0.4063-0.0625,0.1562-0.21875,0.4062-0.32812,0.5312-0.10938,0.125-0.40625,0.3594-0.5,0.4532-0.0937,0.094-0.25,2.6562-0.25,2.6562v3.125l-0.0312,0.125c0.0312,0.125,0.0625,0.2188,0.0625,0.3125,0,0.094-0.0312,0.1563-0.0312,0.3125,0,0.1563-0.0625,0.094-0.0781,0.375-0.0156,0.2813,0.0156,2.3906,0.0156,2.3906l0.0156,1.625s0.0625,0.5157,0.0469,0.625c-0.0156,0.1094-0.0312,0.1407-0.0937,0.2032-0.0625,0.062-0.23438,0.078-0.32813,0.1875-0.0937,0.1093-0.29687,0.094-0.34375,0.2656-0.0469,0.1719-0.21875,0.2187-0.23437,0.375-0.0156,0.1562-0.0781,0.2344-0.0781,0.3594s-0.0781,0.125-0.0156,0.3125-0.0625,0.125,0.0781,0.2031c0.14063,0.078,0.20313,0.1094,0.3125,0.1406,0.10938,0.031,0.4375,0.125,0.54688,0.1406,0.10937,0.016,0.39062-0.016,0.5-0.016,0.10937,0,0.17187,0.031,0.29687,0s0.35938-0.1094,0.4375-0.1406c0.0781-0.031,0.20313-0.031,0.3125-0.1094,0.10938-0.078,0.25-0.1719,0.34375-0.2812,0.0937-0.1094,0.1875-0.1875,0.25-0.3125s0.21875-0.2813,0.23438-0.4688c0.0156-0.1875,0.0625-0.4062,0.14062-0.625,0.0781-0.2187,0.10938-0.4687,0.1875-0.6875,0.0781-0.2187,0.0469-0.5469,0.0625-0.6875s0.0469-0.2969,0.10938-0.3906c0.0625-0.094,0.0937-0.1719,0.21875-0.2813,0.125-0.1093,0.32812-0.2812,0.39062-0.3281,0.0625-0.047,0.14063-0.1406,0.26563-0.25s0.17187-0.25,0.34375-0.3594c0.17187-0.1093,0.21875-0.1406,0.39062-0.2656,0.17188-0.125,0.59375-0.75,0.75-0.8281,0.15625-0.078,0.73438-0.25,0.73438-0.25s0.34375,0.4687,0.51562-0.1094c0.17188-0.5781,0.1875-0.625,0.21875-0.7031,0.0312-0.078,0.0156-0.5156,0.0156-0.5938,0-0.078,0.29687-1.2812,0.29687-1.2812l0.42188-0.2813h0.60937s0.21875,0.016,0.28125-0.062,0.14063-0.1875,0.20313-0.3437c0.0625-0.1563,0.14062-0.2188,0.0781-0.4219-0.0625-0.2031-0.375-0.5625-0.375-0.5625s-0.51562-0.3594-0.51562-0.4219c0-0.062-0.0625-2.875-0.0625-2.9843,0-0.1094,0-0.7188,0.0469-0.9219s0.0156-0.5,0.0781-0.5938c0.0625-0.094,0.20312-0.3437,0.26562-0.3906,0.0625-0.047,0.23438-0.1562,0.32813-0.1875,0.0937-0.031,0.32812-0.047,0.5-0.094,0.17187-0.047,0.21875,0,0.35937-0.094,0.14063-0.094,0.34375-0.1875,0.34375-0.1875l0.7655-0.7656s0.0469-0.031,0.14062-0.1094c0.0937-0.078,0.21875-0.2031,0.32813-0.3125,0.10937-0.1094,0.20312-0.2813,0.3125-0.375,0.10937-0.094,0.15625-0.1406,0.34375-0.2813,0.1875-0.1406,0.29687-0.2343,0.40625-0.3281,0.10937-0.094,0.125-0.078,0.29687-0.2812,0.17188-0.2032,0.21875-0.2032,0.26563-0.3125,0.0469-0.1094,0.0312-0.2032,0.0469-0.2657,0.0156-0.062,0-0.3125,0-0.3125z").attr(attr);
            eur.se3 = R.path("m565.26,150.28s-0.0221,0.2209,0,0.3093c0.0221,0.088,0.15468,0.2873,0.15468,0.2873l0.28727,0.1547s0.0663,0.022,0.28726-0.044c0.22097-0.066,0.64081-0.2873,0.64081-0.2873s0.11049-0.1989,0.15468-0.3315c0.0442-0.1325,0.0663-0.2209,0.13259-0.4198,0.0663-0.1989,0.0442-0.4419,0.15468-0.6187s0.22097-0.442,0.30936-0.6408c0.0884-0.1989,0.17677-0.5083,0.30935-0.7734,0.13259-0.2652,0.22098-0.5304,0.30936-0.685,0.0884-0.1547,0.26517-0.5746,0.33146-0.8176,0.0663-0.2431,0.44194-1.8562,0.50823-1.9446,0.0663-0.088,0.0663-0.3756,0.24307-0.6629,0.17678-0.2873,0.24307-0.7292,0.37565-1.0165,0.13258-0.2872,0.19888-0.8617,0.26517-1.0385,0.0663-0.1768,0.33145-1.0607,0.53033-1.3037,0.19887-0.2431,0.35355-0.5746,0.50823-0.8618,0.15468-0.2873,0.24307-0.685,0.37565-0.906s0.61872-1.4142,0.61872-1.4142-0.13258-0.685-0.0663-0.9723c0.0663-0.2873,0.0221-0.7071,0.0442-0.7955,0.0221-0.088,0.66291-0.6629,0.7734-0.8397,0.11048-0.1768,0.19887-0.3756,0.28726-0.6629,0.0884-0.2873,0.11049-0.6187,0.19888-0.8618,0.0884-0.2431,0.24306-0.6187,0.33145-0.7513,0.0884-0.1326,0.0442-0.088,0.26517-0.3093,0.22097-0.221,0.35355-0.2873,0.46404-0.4862,0.11048-0.1989,0.13258-0.4419,0.33145-0.6629,0.19888-0.221,0.39775-1.6352,0.39775-1.6352s0.0442-0.3314,0-0.464-0.48614-0.5966-0.48614-0.5966l-0.53033,0.1767s-0.11048-0.044-0.24306,0.1326c-0.13259,0.1768-0.44195,0.3094-0.55243,0.5525-0.11049,0.243-0.17678,0.2872-0.24307,0.4419-0.0663,0.1547-0.19887,0.3314-0.24307,0.5303s-0.13258,0.3757-0.15468,0.5966c-0.0221,0.221-0.0221,0.2431-0.0442,0.4862-0.0221,0.243,0.0884,0.066-0.0884,0.5082-0.17678,0.442-0.19887,0.4861-0.39775,0.685-0.19887,0.1989-0.28726,0.3315-0.28726,0.3315l-0.22097,1.4584s-0.48614,0.464-0.59662,0.7513c-0.11049,0.2872-0.28726,0.6187-0.44194,0.9502-0.15468,0.3314-0.37565,0.5303-0.39775,0.6187-0.0221,0.088,0,0.022-0.11049,0.243-0.11048,0.221-0.79549,1.6573-0.88388,1.7678-0.0884,0.1105-0.24307,0.3094-0.33146,0.4199-0.0884,0.1104-0.86178,0.8396-0.86178,0.8396s-0.17678-0.066-0.24307,0.1768c-0.0663,0.2431-0.13258,0.3536-0.17678,0.5746-0.0442,0.2209-0.17677,0.5745-0.22097,0.685-0.0442,0.1104-0.0442,0.1767-0.19887,0.3756-0.15468,0.1989-0.44194,0.5082-0.46404,0.5966-0.0221,0.088-0.28726,1.3921-0.30936,1.6352s-0.17678,0.4862-0.26516,0.6187c-0.0884,0.1326-0.39775,0.4641-0.39775,0.4641l-0.17678,1.2153s-0.0663,0.044-0.0663,0.2431c0,0.1989,0,0.2651-0.0221,0.464s-0.0663,0.2652-0.0884,0.442c-0.0221,0.1767-0.11048,0.4198-0.11048,0.5745s-0.0663,0.7292-0.0663,0.7292-0.0442,0.3093,0.0221,0.4419,0.15468,0.3536,0.15468,0.3536-0.0221-0.088,0.0221,0.221c0.0442,0.3093,0.19887,0.7512,0.19887,0.7512z").attr(attr);
            eur.se44 = R.path("m581.73,90.666-0.15625,2.0625,0.6875,0.9063,0.0312,1.4687,0.0312,1.0938s0,0.7812,0.0312,0.9687,0.1875,0.9375,0.1875,0.9375l0.28125,0.6875s0.3125,0.5938,0.65625,0.7813,0.65625,0.2812,0.65625,0.2812,0.25-0.1562,0.34375-0.5c0.0937-0.3437-0.0312-0.6875,0.125-1.0625,0.15625-0.375,0-0.5,0.25-0.6875s0.3125-0.2812,0.4375-0.3437c0.125-0.062,0.34375-0.2813,0.34375-0.2813s0.1875-0.1875,0.46875-0.1875h0.5625l0.46875-0.1562,0.34375-0.2813,0.25-0.5625,0.28125-0.625,0.3125-0.3125s0.4375-0.1875,0.5625-0.25c0.125-0.062,0.375-0.125,0.4375-0.25s0.3125-0.25,0.3125-0.4062v-0.5313s0.0625-0.1562-0.125-0.4062-0.375-0.5313-0.375-0.5313l-0.4375-0.5312s0-0.031,0.0312-0.1563c0.0312-0.125,0.375-0.5625,0.375-0.5625l0.21875-0.5625-0.6875-0.5-0.96875,0.031-0.25,0.094-1.0625-0.9375-0.5625-0.7187-1.0625-0.6563-0.96875,0.25-0.1875,1-0.125,0.8125-0.5625,0.2813z").attr(attr);
            eur.fi1 = R.path("m607.77,70.572c-0.15625-0.078-0.9375-0.5625-0.9375-0.5625l-0.17187-0.2969-0.35938-0.062-1.0469-0.25s-0.0469-0.094-0.3125,0.062c-0.26563,0.1562-0.48438,0.2969-0.48438,0.2969s-0.0781,0.1093-0.17187,0.3906c-0.0937,0.2812-0.125,0.5937-0.21875,0.7812-0.0937,0.1875,0.0312,0.1407-0.25,0.4063-0.28125,0.2656-0.46875,0.375-0.5,0.5156-0.0312,0.1406-0.0781,0.875-0.0781,0.9531,0,0.078-0.0625-0.1875-0.0156,0.2344s0.0156,0.4531,0.0781,0.6875,0.0469-0.031,0.0469,0.3438c0,0.375-0.0469,0.5-0.0469,0.625s-0.1875,0.094,0.10938,0.2031c0.29687,0.1094,0.89062,0.1719,0.98437,0.4375,0.0937,0.2656,0.0156,0.4062,0.14063,0.5,0.125,0.094,0.29687,0.2031,0.59375,0.1875,0.29687-0.016,0.5-0.1406,0.84375-0.094,0.34375,0.047,0.51562,0.016,0.70312,0.016s0.375-0.031,0.57813-0.125c0.20312-0.094,0.29687-0.125,0.4375-0.2813,0.14062-0.1562,0.1875-0.3437,0.35937-0.4531,0.17188-0.1094,0.25-0.1406,0.4375-0.3281s0.10938-0.1719,0.29688-0.3594,0.20312-0.2188,0.42187-0.4063,0.23438-0.2187,0.39063-0.375c0.15625-0.1562,0.15625-0.2656,0.3125-0.3906s0.26562-0.2187,0.35937-0.3281c0.0937-0.1094,0.15625-0.1094,0.23438-0.2969,0.0781-0.1875,0.10937-0.2812,0.125-0.5156,0.0156-0.2344-0.0156-0.375-0.0469-0.5313-0.0312-0.1562-0.1875-0.3906-0.25-0.4687-0.0625-0.078-0.40625-0.3594-0.40625-0.3594s-0.25-0.1719-0.3125-0.1875c-0.0625-0.016-0.67187-0.1562-0.67187-0.1562s-0.15625-0.016-0.3125,0.016c-0.15625,0.031-0.54688,0.125-0.54688,0.125z").attr(attr);
            eur.fi2 = R.path("m639.37,0.14999s-0.0312,0.4844-0.0312,0.5469c0,0.062,0.0469,0.4218,0.0625,0.5,0.0156,0.078,0.0156,0.2968,0,0.375-0.0156,0.078-0.0312,0.1562-0.125,0.2968-0.0937,0.1407-0.34375,0.3125-0.34375,0.3125l-1.0156,0.1719-0.64063,0.125-0.5625,0.125-0.34375,0.2188-0.0469,0.8281s-0.46875-0.031-0.53125,0.1094c-0.0625,0.1406-0.29688,0.2968-0.35938,0.375-0.0625,0.078-0.28125,0.2343-0.32812,0.4062-0.0469,0.1719-0.10938,0.4375-0.0781,0.5469,0.0312,0.1094,0.0469,0.25,0.0781,0.4375s0.0469,0.4219,0.0469,0.5312c0,0.1094,0.23438,0.125-0.0469,0.2188-0.28125,0.094-0.51563,0.094-0.51563,0.094l-0.35937-0.1562s0,0.1406-0.21875-0.1406c-0.21875-0.2813-0.34375-0.4063-0.34375-0.4063l-0.29688,0.016-0.89062-0.1718s-0.0625-0.1407-0.125,0.031c-0.0625,0.1719-0.0469,0.078-0.1875,0.3594-0.14063,0.2812-0.42188,0.375-0.48438,0.4844-0.0625,0.1093-0.17187,0.2031-0.17187,0.2031l-0.14063,0.7656s0.0312,0.2969,0.0312,0.3594c0,0.062-0.0156,0.2031,0.0156,0.375s0.0781,0.3125,0.125,0.6406,0.0937,0.9531,0.0937,1.0156c0,0.062-0.0469,0.1094-0.0469,0.1094l-0.10937,0.125s-0.0312,0.062-0.14063,0.062c-0.10937,0-0.5-0.094-0.5-0.094l-0.28125-0.2657-0.375-0.125s-0.0937-0.062-0.375-0.062c-0.28125,0-0.3125-0.016-0.40625,0-0.0937,0.016-0.3125,0-0.375,0.031s-0.10937,0.016-0.23437,0.1562c-0.125,0.1407-0.29688,0.2188-0.34375,0.3125-0.0469,0.094-0.0625,0.125-0.10938,0.375-0.0469,0.25-0.0625,0.062-0.0469,0.5,0.0156,0.4375,0.0469,0.6407,0.0469,0.6407s-0.0937-0.031,0.0469,0.1093c0.14062,0.1407,0.0469,0.016,0.34375,0.2813,0.29687,0.2656,0.40625,0.3437,0.53125,0.4062,0.125,0.062,0.0781,0.016,0.14062,0.094,0.0625,0.078,0.0937,0.9375,0.0937,0.9375s-0.0937,0.2187-0.10937,0.2969c-0.0156,0.078-0.15625,0.1875-0.17188,0.2656-0.0156,0.078-0.20312,0.2187-0.20312,0.2187s0.0469,0.078-0.26563,0.125c-0.3125,0.047-0.375,0.047-0.53125,0.062-0.15625,0.016-0.0625-0.3125-0.4375,0s-0.40625,0.25-0.48437,0.4063c-0.0781,0.1562-0.21875,0.3437-0.21875,0.3437s-0.0469,0.031-0.29688,0.078c-0.25,0.047-0.375,0.125-0.54687-0.016-0.17188-0.1406-0.0781-0.2656-0.42188-0.3437-0.34375-0.078,0.0312-0.375-0.8125-0.2344-0.84375,0.1406-0.85937,0.1563-0.85937,0.1563s-0.25,0.5468-0.34375,0.6093c-0.0937,0.062-1.2188,0-1.3125-0.016s-0.73438-0.2813-0.73438-0.2813-0.17187-0.2812-0.25-0.3125c-0.0781-0.031-0.21875-0.1562-0.48437-0.1875-0.26563-0.031-0.48438-0.125-0.60938-0.125s-0.59375-0.062-0.875-0.062,0.0937,0-0.625-0.016c-0.71875-0.016-0.79687-0.016-0.79687-0.016s-0.34375,0.078-0.40625,0.1406c-0.0625,0.062-0.14063,0.1094-0.17188,0.1719-0.0312,0.062-0.0625,0.031-0.10937,0.1875-0.0469,0.1562-0.0625,0.2187-0.0937,0.3906s-0.0625,0.3906-0.0156,0.5-0.0937,0.125,0.14063,0.2813c0.23437,0.1562,0.28125,0.1562,0.4375,0.3437s0.14062,0.1875,0.26562,0.2656c0.125,0.078,0.67188,0.2969,0.89063,0.2969s0.17187,0.031,0.34375,0c0.17187-0.031,0.29687-0.094,0.46875-0.125,0.17187-0.031-0.0625-0.094,0.39062-0.031,0.45313,0.062,0.3125-0.016,0.65625,0.078s0.40625,0.031,0.59375,0.1719c0.1875,0.1406-0.0312,0.016,0.26563,0.2031,0.29687,0.1875,0.79687,0.6719,0.79687,0.6719s-0.0469,0.3281-0.15625,0.5156c-0.10937,0.1875-0.51562,0.5469-0.57812,0.6094-0.0625,0.062-0.0937-0.062-0.20313,0.1406-0.10937,0.2031-0.15625,0.2656-0.20312,0.4219-0.0469,0.1562-0.125,0.2968-0.15625,0.4375-0.0312,0.1406-0.0625,0.3281-0.0781,0.4375-0.0156,0.1093-0.0156,0.2343-0.0469,0.3125-0.0312,0.078,0.0156,0.078-0.0937,0.2031-0.10938,0.125-0.125,0.1406-0.32813,0.2656-0.20312,0.125-1.1875,0.3594-1.1875,0.3594s-0.46875,0.2656-0.46875,0.3594c0,0.094,0.0781,0.3437,0.0781,0.4375,0,0.094,0.0156,0.2031-0.0312,0.3906-0.0469,0.1875-0.10938,0.2969-0.17188,0.4219s-0.28125,0.3125-0.34375,0.375c-0.0625,0.062-0.15625,0.1406-0.1875,0.2343-0.0312,0.094-0.0625,0.3282-0.0625,0.3282l-0.1875,1.0468s-0.20312,0.2188-0.29687,0.2969c-0.0937,0.078-0.23438,0.047-0.35938,0.2656-0.125,0.2188-0.21875,0.5469-0.25,0.75-0.0312,0.2032-0.0625,0.3594-0.0469,0.4532,0.0156,0.094,0.0937,0.125,0.14062,0.2812,0.0469,0.1563,0.17188,0.3594,0.28125,0.4688,0.10938,0.1093,0.0625,0.078,0.15625,0.1406,0.0937,0.062,0.3125,0.125,0.42188,0.375,0.10937,0.25,0.0625,1.8125,0.10937,2.0156,0.0469,0.2031,0.0937,0.3281,0.23438,0.4688,0.14062,0.1406,0.14062,0.031,0.48437,0.3125,0.34375,0.2812,0.42188,0.1406,0.5,0.4687,0.0781,0.3281,0.0312,0.625,0.0312,0.7031,0,0.078-0.10937,0.094-0.0156,0.2188,0.0937,0.125,0.125,0.2031,0.29687,0.375,0.17188,0.1719,0.20313-0.1563,0.4375,0.5469,0.23438,0.7031,0.23438,0.7812,0.23438,0.7812l-0.17188,2.625-0.0156,2.5s-0.0312,0.094-0.0312,0.1563c0,0.062-0.0312,0.094,0.0156,0.1718,0.0469,0.078,0.14063,0,0.25,0.1407,0.10938,0.1406,0.46875,0.7343,0.46875,0.7343s0.0156-0.094,0.0781,0.078c0.0625,0.1718,0.17187,0.4687,0.17187,0.5625,0,0.094,0.0312,1.7343,0.0312,1.7343s0.0781-0.094,0.39063,0.1875c0.3125,0.2813,0.53125,0.4532,0.54687,0.5469,0.0156,0.094,0.34375,1.2344,0.34375,1.2344s0.0781-0.016,0.32813,0.1406c0.25,0.1563,0.375,0.047,0.39062,0.2656,0.0156,0.2188-0.0156,0.2969-0.10937,0.4532-0.0937,0.1562-0.15625,0.25-0.1875,0.3125-0.0312,0.062,0.0625,0.1093-0.17188,0.2187-0.23437,0.1094-0.5,0.1563-0.64062,0.2344-0.14063,0.078-0.48438,0.2344-0.59375,0.3437-0.10938,0.1094-0.17188,1.4063-0.20313,1.5-0.0312,0.094-0.0625,0.2344-0.0625,0.3282,0,0.094,0.0156,0.047,0.17188,0.2187,0.15625,0.1719,0.28125-0.031,0.42187,0.375,0.14063,0.4063,0.15625,0.4219,0.17188,0.6719,0.0156,0.25,0.0156,0.3437,0.0156,0.3437s0.21875,2.0313,0.20313,2.1407c-0.0156,0.1093-0.0625,0.3125-0.0625,0.4375s0.0156,0.2812-0.0156,0.3906-0.0625,0.25-0.15625,0.5937c-0.0937,0.3438-0.0469,1.1875-0.1875,1.3594-0.14062,0.1719-0.42187,0.4219-0.48437,0.5625s-0.10938,0.2344-0.25,0.375c-0.14063,0.1406-0.1875,0.1406-0.40625,0.3438-0.21875,0.2031-0.46875,0.3437-0.46875,0.4531s0.0469,0.7344,0.0469,0.7344-0.21875-0.1407,0.23438,0.2187c0.45312,0.3594,0.59375,0.3906,0.625,0.4688,0.0312,0.078-0.0937,2.2187-0.0937,2.2187s-0.14063,0.1406-0.20313,0.1719c-0.0625,0.031-0.10937-0.047-0.20312,0.1562-0.0937,0.2032-0.17188,0.4375-0.17188,0.5938,0,0.1562-0.0937,0.1875,0.1875,0.4375,0.28125,0.25,0.39063,0.3125,0.45313,0.4844,0.0625,0.1718,0.10937,0.3906,0.10937,0.5781s-0.0156,0.4062-0.0156,0.5c0,0.094,0.0625,1.1719,0.0312,1.3125-0.0312,0.1406-0.0781,0.078-0.0781,0.3125,0,0.2344-0.0312,0.3281-0.0469,0.4375-0.0156,0.1094,0.0312,0.2344,0.0312,0.2344s0.0625,0.062,0.15625,0.125c0.0937,0.062-0.0156,0.1562,0.42187,0.1875,0.4375,0.031,0.64063,0.016,0.75,0.016,0.10938,0,0.25-0.078,0.32813,0.031,0.0781,0.1093,0.15625,0.2187,0.15625,0.3593,0,0.1407-0.0156,0.7032,0,0.7813,0.0156,0.078-0.0937,0.078,0.0469,0.2656,0.14063,0.1875,0.14063,0.2969,0.3125,0.3906,0.17188,0.094,0.21875,0.2188,0.625,0.2344,0.40625,0.016,0.35938,0.047,0.65625,0.016,0.29688-0.031,0.67188-0.2187,0.67188-0.2187s0.48437-0.1719,0.59375-0.1719c0.10937,0,0.75-0.016,0.85937,0,0.10938,0.016,0.8125,0.1406,0.8125,0.1406s0.3125-0.125,0.4375,0.125,0.0937,0.2344,0.17188,0.375c0.0781,0.1407-0.10938,0.094,0.26562,0.2813,0.375,0.1875,0.25,0.078,0.45313,0.2344,0.20312,0.1562,0.34375,0.1718,0.5,0.2968s0.1875,0.1407,0.45312,0.2813c0.26563,0.1406,0.42188,0.1719,0.42188,0.1719s-0.10938,0.2343,0.10937,0.25c0.21875,0.016,0.59375,0.016,0.75,0.016h0.84375s0.32813,0.2187,0.48438,0.3906,0.10937,0.1719,0.375,0.3125c0.26562,0.1406,0.21875,0,0.32812,0.1563,0.10938,0.1562,0.25,0.9531,0.25,0.9531v0.016l0.0937,0.016s0.32813,0.6719,0.35938,0.7344c0.0312,0.062,0.57812,0.2969,0.57812,0.2969s0.32813,0.031,0.51563-0.125c0.1875-0.1563,0.17187-0.2813,0.51562-0.3906,0.34375-0.1094,0.76563-0.2032,0.875-0.2188,0.10938-0.016,0.39063-0.031,0.39063-0.031s-0.0469,0.1093-0.10938,0.1562c-0.0625,0.047-0.15625,0.016-0.375,0.125-0.21875,0.1094-0.40625,0.1094-0.5,0.1719-0.0937,0.062-0.53125,0.375-0.53125,0.375s-0.0156-0.031-0.17187,0.1562c-0.15625,0.1875-0.17188,0.1875-0.25,0.2969-0.0781,0.1094-0.45313,0.2031-0.625,0.3906-0.17188,0.1875-0.15625,0.2813-0.46875,0.4532-0.3125,0.1718-0.82813,0.2656-0.82813,0.2656s-0.125-0.375-0.48437-0.5625c-0.35938-0.1875-1.0469-0.5156-1.0781-0.4219-0.0312,0.094,0.0781,0.5938,0.0156,0.8594s0.0312,0.9687,0.0156,1.125c-0.0156,0.1562-0.0312,0.3437-0.0312,0.5312s-0.0156,0.2657,0.0312,0.4375c0.0469,0.1719,0.0781,0.1563,0.125,0.3594s0.17188,0.4844,0.26563,0.6094c0.0937,0.125,0.35937,0.2187,0.5,0.2969,0.14062,0.078,0.34375,0.1718,0.57812,0.1718,0.23438,0,1.8125,0.375,1.875,0.3594,0.0625-0.016,0.3125,0.062,0.46875-0.1094,0.15625-0.1718,0.0937-0.078,0.375-0.3593,0.28125-0.2813,0.20313-0.3125,0.42188-0.4532,0.21875-0.1406,0.57812,0.062,0.64062-0.4531,0.0625-0.5156,0.0781-0.3594,0.0781-0.625s-0.23438,0.2969-0.0312-0.4375c0.20312-0.7344,0.20312-0.7812,0.25-0.8594,0.0469-0.078,0,0.047,0.15625-0.2968s0.25-0.6719,0.29687-0.7813c0.0469-0.1094,0.0781-0.3594,0.10938-0.5312,0.0312-0.1719,0.0312-0.3438,0.0312-0.3438s-0.0625-0.047,0.0312-0.2031c0.0937-0.1563,0.125-0.4688,0.1875-0.6719s0.0937-0.4219,0.1875-0.5469c0.0937-0.125,0.29687-0.5,0.29687-0.5s0.17188,0.1875,0.1875,0.2813c0.0156,0.094,0.0781,0.1719,0.0156,0.3437-0.0625,0.1719-0.48438,0.7188-0.53125,0.9375-0.0469,0.2188-0.0937,0.3282-0.0781,0.5469,0.0156,0.2188,0.0156,0.5781-0.0156,0.7656s-0.34375-0.047,0.0469,0.5c0.39063,0.5469,1.0312,1.1094,1.0312,1.1094s-0.0781-0.062,0.4375,0.016c0.51563,0.078,0.89063-0.047,1,0.094,0.10938,0.1406,0.15625,0.1875,0.23438,0.4063,0.0781,0.2187,0.14062,0.2656,0.0312,0.5781-0.10938,0.3125-0.23438,0.4687-0.21875,0.9687,0.0156,0.5,0.0312,0.7969,0.0312,0.7969s0.1875-0.1094-0.0312,0.1563c-0.21875,0.2656-0.40625,0.4218-0.51563,0.5312-0.10937,0.1094-1.0938,0.3906-1.1562,0.4219-0.0625,0.031-0.54687,0.5469-0.5625,0.6094-0.0156,0.062-0.0156,0.4062,0.0312,0.4843,0.0469,0.078-0.0312,0.047,0.17188,0.1719,0.20312,0.125,0.35937,0.2031,0.65625,0.2969,0.29687,0.094,0.5,0.1719,0.64062,0.1875,0.14063,0.016,0.40625,0.1094,0.60938,0.047,0.20312-0.062,0.4375,0.031,0.5625-0.2031,0.125-0.2344,0.21875-0.3125,0.3125-0.5469,0.0937-0.2343,0.70312-0.9218,0.70312-0.9218s0.0156-0.1094,0.0937-0.2969-0.0156-0.2813,0.17188-0.4531c0.1875-0.1719,0.20312-0.2657,0.4375-0.3594,0.23437-0.094,0.48437-0.2188,0.60937-0.2813,0.125-0.062,0.14063-0.1093,0.3125-0.1875,0.17188-0.078,0.45313-0.1406,0.53125-0.1875,0.0781-0.047,0.17188-0.2031,0.4375-0.4062,0.26563-0.2031,0.28125-0.375,0.60938-0.3906,0.32812-0.016,0.45312-0.2032,0.65625-0.031,0.20312,0.1719,0.46875,0.2656,0.51562,0.4219,0.0469,0.1562,0.0937,0.4219,0.17188,0.4531,0.0781,0.031,0.34375,0.1563,0.46875,0.1563s0.73437,0.062,0.78125,0c0.0469-0.062,0.0781-0.1407,0.1875-0.3125,0.10937-0.1719,0.20312-0.4844,0.29687-0.5938,0.0937-0.1094,0.125-0.3906,0.375-0.3594,0.25,0.031,0.8125,0.1407,0.8125,0.1407l0.90625,0.2812,0.57813,0.047s0.23437-0.031,0.48437-0.1875c0.25-0.1563,0.34375-0.25,0.45313-0.3594,0.10937-0.1094,0.14062-0.375,0.29687-0.4687,0.15625-0.094,0.17188-0.1719,0.42188-0.1719s0.53125,0.047,0.76562,0.078c0.23438,0.031,0.34375,0.016,0.59375,0.1094,0.25,0.094,0.6875,0.2812,0.6875,0.2812s0.0469,0.1407,0.32813-0.1093c0.28125-0.25,0.34375-0.3594,0.625-0.625,0.28125-0.2657,0.34375-0.3594,0.54687-0.5625,0.20313-0.2032,0.14063-0.1563,0.26563-0.2969s0.0469-0.2188,0.25-0.3125c0.20312-0.094,0.98437-0.6563,0.98437-0.6563s0.79688-0.094,0.9375-0.094c0.14063,0,0.82813,0.062,0.9375,0.062,0.10938,0,0.1875,0.047,0.34375-0.078s0.34375-0.3125,0.46875-0.4219,0.1875-0.2656,0.39063-0.3281c0.20312-0.062,0.54687-0.062,0.65625-0.1094,0.10937-0.047,0.21875,0,0.3125-0.1875,0.0937-0.1875,0.14062-0.375,0.21875-0.5781,0.0781-0.2032,0.0312-0.375,0.0781-0.5313,0.0469-0.1562-0.0156-0.3437,0.17188-0.4062,0.1875-0.062,0.23437-0.1719,0.67187-0.125,0.4375,0.047,0.82813,0.1406,1.1406,0.1406,0.3125,0,0.40625,0.078,0.89062-0.047,0.48438-0.125,0.625-0.2031,0.73438-0.2187,0.10973-0.016,0.46911-0.6094,0.46911-0.6094s0.10937-0.2031,0.23437-0.25c0.125-0.047,0-0.2031,0.40625-0.094,0.40625,0.1094,0.20313,0.1094,0.64063,0.1719,0.4375,0.062,0.34375,0.078,1.0312,0.016,0.6875-0.062,0.6875,0,1-0.1562,0.3125-0.1563,0.6875-0.375,0.6875-0.375s-0.0312-0.1563,0-0.2344c0.0312-0.078-0.10938-0.1719,0.17187-0.2812,0.28125-0.1094,0.65625-0.1719,0.78125-0.2032,0.125-0.031,0.375,0.047,0.53125-0.062,0.15625-0.1093,0.32813-0.25,0.40625-0.375,0.0781-0.125,0.125-0.2812,0.21875-0.4531,0.0937-0.1719,0.10938-0.4531,0.17188-0.5937,0.0625-0.1407,0.125-0.4688,0.125-0.4688s-0.0937-0.2031,0.15625-0.094c0.25,0.1093,0.42187,0.125,0.53125,0.25,0.10937,0.125,0.39062,0.3281,0.39062,0.3281l0.32813,0.1562,0.75,0.2032s0.20312,0.1406,0.375-0.047c0.17187-0.1875,0.20312-0.4219,0.28125-0.5,0.0781-0.078-0.0469-0.25,0.28125-0.2969,0.32812-0.047,0.46875-0.125,0.73437-0.125h0.64063c0.21875,0,0.5,0.094,0.64062,0.062,0.14063-0.031,0.15625,0.094,0.28125-0.1562,0.125-0.25,0.10938-0.3282,0.20313-0.4375,0.0937-0.1094-0.14063-0.1094,0.21875-0.25,0.35937-0.1407,0.3125-0.2188,0.64062-0.2188,0.32813,0,1.2969,0.062,1.4219,0s0.0781-0.016,0.21875-0.1094c0.14062-0.094,0.17187,0.016,0.25-0.1718,0.0781-0.1875,0.0312-0.2188,0.10937-0.4219,0.0781-0.2031,0-0.25,0.125-0.4531,0.125-0.2032,0.0469-0.3907,0.25-0.5,0.20313-0.1094,0.20313-0.2188,0.51563-0.2344,0.3125-0.016,0.15625-0.062,0.76562-0.016,0.60938,0.047,0.5-0.016,0.85938,0.062,0.35937,0.078,0.45312,0.078,0.73437,0.25,0.28125,0.1718,0.125,0.125,0.53125,0.2968,0.40625,0.1719,1.3594,0.2813,1.3594,0.2813s0.45312,0.031,0.57812,0.031,0.45313,0.094,0.67188,0.047,0.53125-0.1406,0.53125-0.1406,0.0781-0.031,0.20312-0.1094c0.125-0.078,0.32813-0.1875,0.45313-0.2812,0.125-0.094,0.1875-0.2032,0.35937-0.2969,0.17188-0.094,0.17188-0.078,0.3125-0.2188,0.14063-0.1406,0.20313-0.1562,0.3125-0.375,0.10938-0.2187,0.125-0.2812,0.17188-0.5,0.0469-0.2187,0.0156-0.3593,0.0625-0.4843s0-0.2344,0.14062-0.4844c0.14063-0.25,0.17188-0.3906,0.21875-0.4844,0.0469-0.094,0.28125-0.6562,0.51563-0.7812,0.23437-0.125,0.625-0.3438,0.84375-0.5938s0.35937-0.4219,0.57812-0.6562c0.21875-0.2344,0.28125-0.3907,0.65625-0.6719,0.375-0.2813,0.25,0.1094,0.8125-0.7344,0.5625-0.8437,0.70313-1.0312,0.70313-1.0312l0.76562-1.1719s0.0312-0.4531,0.1875-0.6094c0.15625-0.1562,0.4375-0.375,0.65625-0.5625s0.40625-0.3594,0.57813-0.4844c0.17187-0.125,1.2188-1.5468,1.3438-1.6093,0.125-0.062,0.6875-0.1875,0.96875-0.4219s0.28125-0.4375,0.5625-0.6719,0.40625-0.4375,0.6875-0.7187c0.28125-0.2813,0.42187,0.1718,0.60937-0.7188s0.25-1.1719,0.25-1.1719,0.8125-0.7812,0.9375-0.9531,0.14063-0.5156,0.32813-0.7031,0.45312-0.4688,0.67187-0.6719,0.8125-1.1562,1.0156-1.3125c0.20312-0.1562,0.4375-0.1875,0.64062-0.5,0.20313-0.3125,0.14063-0.4687,0.48438-0.8594,0.34375-0.3906,0.53125-0.6875,0.64062-0.8437,0.10938-0.1563,1.375-2.1719,1.4688-2.2813,0.0937-0.1093,1.6562-2.2187,1.6562-2.2187l1.2656-2.2344s0.53125-0.4531,0.60937-0.6406c0.0781-0.1875,0.34375-0.6563,0.46875-0.9063s0.29688-0.9375,0.45313-1.1093c0.15625-0.1719,0.42187-0.6875,0.65625-1.0313,0.23437-0.3437,0.82812-1.0781,0.82812-1.0781l1.5312-2.7813,1.2188-1.4062s1.3594-2.1094,1.5312-2.2188c0.17188-0.1093,0.5-0.4218,0.5625-0.5312s0.23438-0.5,0.375-0.6719c0.14063-0.1719,0.39063-0.5625,0.6875-0.8906,0.29688-0.3281,0.46875-0.7188,0.60938-0.875,0.14062-0.1563,0.39062-0.5469,0.5-0.7188,0.10937-0.1718,0.82812-2.0781,0.82812-2.0781l0.35938-3.5937s0.35937-1.1719,0.42187-1.2969,0.20313-0.2031,0.28125-0.5469c0.0781-0.3437,0.125-0.8125,0.0937-1.0156-0.0312-0.2031-0.25-0.5156-0.28125-0.5938-0.0312-0.078-1.5938-1.4218-1.5938-1.4218l-1.9843-2.0931-1.1406-1.0625-1.2031-1.0156-0.60938-0.5469-1.4375-0.6875-1.4844-0.3125-2.3906-1.25-0.98437-0.9062-0.8125-0.6875-0.84375-0.6563-0.625-0.4062-0.6875-0.4219-0.65625-0.75z").attr(attr);
            eur.fi33 = R.path("m701.77,30.712-0.34375-0.1406-1.0938-0.1719s-0.17187,0.094-0.1875,0.2187c-0.0156,0.125,0.0469,0.3907-0.125,0.5625-0.17187,0.1719-0.625,0.2657-0.75,0.3282-0.125,0.062-0.82812,0.125-0.82812,0.125l-0.46875,0.016-0.39063,0.1094s0.375-0.1875-0.42187,0.3125c-0.79688,0.5-0.9375,0.5625-0.9375,0.5625s-0.0937,0.1093-0.17188,0.2187c-0.0781,0.1094-0.46875,0.4375-0.53125,0.6094s-0.10937,0.2344-0.10937,0.3906c0,0.1563,0.0625,0.9375,0.10937,1,0.0469,0.062,0.0156,0.1719,0.26563,0.3594,0.25,0.1875,0.9375,0.75,0.9375,0.75s0.60937,0.4687,0.64062,0.5312c0.0312,0.062,0.32813,0.2969,0.375,0.375,0.0469,0.078,0.59375,0.6875,0.59375,0.6875s0.0156,0.062,0.25,0.1563c0.23438,0.094,0.65625,0.2344,0.76563,0.2656,0.10937,0.031,0.32812,0.1406,0.71875,0.1406,0.39062,0,0.75-0.016,0.82812-0.062,0.0781-0.047,0.14063-0.1718,0.25-0.2031,0.10938-0.031,0.21875-0.016,0.375-0.2187,0.15625-0.2032,0.29688,0.8125,0.32813-0.4688,0.0312-1.2812-0.35938-2.1719-0.35938-2.1719s0.0625-0.125,0.0625-0.2031c0-0.078-0.0156-0.2031,0.0469-0.3594,0.0625-0.1562,0.10937-0.4062,0.20312-0.7187,0.0937-0.3125,0.0781-1.0156,0.10938-1.2188,0.0312-0.2031-0.0781-1.2031-0.0781-1.2031z").attr(attr);
            eur.no22 = R.path("m507.32,0.47809,0.125,1.9375,0.8125,1.125,0.3125,1,1.4375,0.25,1.25-0.8125,1.375-0.25,1.375-0.8125,0.625-0.375s0.25,0.4375,0.5,0.6875,1.0625,0.8125,1.0625,0.8125l1.125-0.5,1.0625-0.875,0.6875-0.8125,0.375-1,0.3125-0.5v-0.062z").attr(attr);
            eur.no = R.path("m534.07,0.16559-10.344,0.094-1.4688,0.3437-0.59375,0.5938-2.375,0.2187-0.25,0.5-0.5625,0.625-0.53125,0.375-0.59375,0.5938-0.15625,0.6875,0.0937,1.3437-0.125,0.7813-0.59375,0.2812-0.84375,0.031-0.96875-0.6875-0.96875-0.2188-1.0312-0.062-1.375-0.062-0.34375,0.062s-0.34375,0.1875-0.375,0.3438c-0.0312,0.1562-0.1875,0.6562-0.1875,0.6562l0.53125,0.7813s0.46875,0.375,0.0625,0.4062c-0.40625,0.031-0.75-0.031-1-0.031s-1-0.2188-1-0.2188l-1.0625-0.2187-0.5625-0.2188,0.1875-0.4687s0.21875-0.3125,0.34375-0.4375,0.34375-0.3438,0.40625-0.5313,0.0937-0.3125,0.0937-0.3125l0.0625-0.8437-0.28125-1.0313-0.8125-1.1562-0.0312-0.7188-0.0625-1.125-1.6875-0.094-0.25,1.1875-0.0312,0.6875-1,0.2812-0.4375-0.4062-0.3125-0.4688-1.1562-0.2187-0.96875,0.125-1.0625-0.125-1.0312-0.4063-0.53125-0.6253s-0.40625,0.031-0.65625,0.062-1.2188-0.094-1.2188-0.094-0.40625,0.094-0.4375,0.25c-0.0312,0.1562-0.21875,0.4375-0.21875,0.4375l-0.5,0.3437-1.8125-0.3125s-0.21875-0.094-0.375,0.031-0.25,0.031-0.34375,0.1562c-0.0937,0.125-0.4375,0.031-0.53125,0.375-0.0937,0.3438-0.34375,0.5625-0.34375,0.5625s0,0.094-0.15625,0.2188c-0.15625,0.125-0.46875-0.031-0.78125,0.031s-0.1875,0.062-0.53125,0.031-0.71875-0.3125-0.71875-0.3125-0.21875-0.2188-0.46875-0.2188-0.375-0.062-0.375-0.062-0.4375,0.1563-0.96875,0.625c-0.53125,0.4688-0.625,0.375-0.71875,0.6875-0.0937,0.3125-0.28125,0.4688,0.0625,0.5625,0.34375,0.094,0.1875-0.031,0.53125,0.1875,0.34375,0.2188,0.8125,0.4063,0.8125,0.4063l0.28125,0.031s0.59375,0.094,0.71875,0.031c0.125-0.062,0.65625-0.3125,0.65625-0.3125l0.46875-0.375,0.4375-0.375,0.34375-0.2813,0.40625-0.1562,0.46875-0.094,1.0312-0.031,0.90625,0.062s0.625,0.125,0.90625,0.094,0.875-0.031,1.0312-0.062c0.15625-0.031,0.78125-0.094,0.78125-0.094l0.875-0.031,0.5625,0.25,0.25,0.3438,0.25,0.375,0.6875,0.094,0.34375,0.2813,0.0937,0.25,0.25,0.4062,0.375,0.4063s0.0312,0.031,0.3125,0.062c0.28125,0.031,0.75,0.094,0.96875,0.094s0.5,0,0.625,0.094,0.3125,0.1562,0.3125,0.1562l-0.53125,0.094-0.84375-0.031-1.0312-0.062-0.46875-0.3125-0.6875-0.375-0.4375-0.25-1.0625-0.3125-0.6875-0.031-0.75,0.062-0.34375,0.5625-0.1875,0.3437-0.53125,0.1563-0.46875,0.1562s-0.1875,0.094-0.25,0.2188c-0.0625,0.125-0.34375,0.2187-0.375,0.3437-0.0312,0.125-0.6875,0.5938-0.6875,0.5938s0.40625,0.3437,0.59375,0.5312,0.3125,0.2188,0.40625,0.3438c0.0937,0.125,0.1875,0.1562,0.21875,0.2812,0.0312,0.125-0.0312,0.4375-0.0312,0.4375l-0.625,0.125-1,0.125-0.71875,0.062-0.34375,0.031-1.0312-0.25-0.53125-0.094-0.1875,0.031-0.65625,0.1562-0.5,0.125-0.1875,0.125-0.1875,0.125-0.5,0.125-0.4375,0.1875-0.28125,0.2813-0.0312,0.3125,0.28125,0.5625,0.21875,0.1875s0.0937,0.062,0.3125,0.125c0.21875,0.062,0.21875,0,0.40625,0.062s0.28125,0.062,0.46875,0.062h0.40625l0.25,0.125s0.0312,0.031,0.15625,0.1875c0.125,0.1562,0.0625,0.094,0.15625,0.2187,0.0937,0.125,0.1875,0.25,0.25,0.4375s0.0312,0.125,0.0937,0.375,0.0312,0.375,0.125,0.5938c0.0937,0.2187,0.0625,0.625,0.0625,0.625s-0.0937-0.094,0.28125,0.125c0.375,0.2187,0.25,0.094,0.5625,0.2812,0.3125,0.1875,0.4375,0.2188,0.6875,0.375,0.25,0.1563,0.3125,0.1875,0.46875,0.2813,0.15625,0.094,0.0312,0.031,0.21875,0.1875,0.1875,0.1562,0.125-0.062,0.46875,0.3437,0.34375,0.4063,0.34375,0.4688,0.34375,0.4688s0.0625-0.094,0,0.2187c-0.0625,0.3125-0.21875,0.6875-0.21875,0.6875s-0.0937,0.125-0.1875,0.25c-0.0937,0.125-0.21875,0.2188-0.34375,0.25-0.125,0.031-0.59375-0.062-0.59375-0.062l-0.0937-0.3437-0.125-0.4063-0.0312-0.2187-0.125-0.1563s-0.28125-0.4687-0.5625-0.4687-0.65625-0.062-0.65625-0.062l-0.3125-0.4063-0.25-0.375s-0.15625-0.125-0.28125-0.2812c-0.125-0.1563-0.28125-0.3125-0.28125-0.3125s-0.125-0.25-0.15625-0.375c-0.0312-0.125-0.15625-0.5938-0.15625-0.5938l0.0312-0.3125-0.0312-0.4375-0.28125-0.3437-1.3126-0.2188-0.6875,0.125-0.65625,0.062-0.84375-0.4375-0.15625-0.2812-1-0.5313-0.34375,0.1563-0.5,0.4687-0.1875,0.2188-0.5,0.1562-0.875-0.375-0.125-0.5625-0.25-0.4062-0.96875-0.75-0.875,0.031-0.8125,0.094s-0.25,0.094-0.28125,0.2812c-0.0312,0.1875-0.15625,0.5-0.15625,0.5s-0.0625,0.25-0.28125,0.2813c-0.21875,0.031-0.53125,0-0.6875,0.031s-0.40625-0.062-0.46875,0.094c-0.0625,0.1562-0.1875,0.7187-0.1875,0.7187l0.0937,0.375,0.1875,0.1875c0.15625,0.094,0.0937-0.031,0.28125,0.125,0.1875,0.1563,0.0937,0.125,0.53125,0.25,0.4375,0.125,0.40625,0.031,0.78125,0.125s0.625,0.094,0.75,0.1563c0.125,0.062-0.0937,0.1562-0.0937,0.1562l-0.9063-0.06s-0.25-0.031-0.375,0.031-0.6875,0.2187-0.6875,0.2187l-0.40625,0.25-0.25,0.625-0.15625,0.4063s0.0625,0.25,0.1875,0.2812c0.125,0.031-0.3125,0.1875,0.75,0.1875h1.0938s0.21875-0.031,0.53125-0.031,0.59375,0.031,0.875,0.031,1,0.031,1,0.031l0.5625,0.031h0.1875l0.21875,0.4375,0.40625,0.2813s0.125,0.031,0.3125,0.031,0.65625-0.062,0.875-0.094c0.21875-0.031,0.15625-0.125,0.71875-0.031s1.0312,0.094,1.2812,0.1563c0.25,0.062,0.625,0.1875,0.625,0.1875l-0.53125,0.062-0.90625-0.062h-0.8125l-0.9375,0.094-0.59375,0.25-0.34375,0.2813-0.28125,0.1562s-0.15625,0.094-0.25,0.25c-0.0937,0.1563-0.8125,0.5625-0.8125,0.5625l0.21875,0.5313s-0.0625,0.062,0.5,0.25c0.5625,0.1875,0.3125,0.1562,0.875,0.2187,0.5625,0.062,1.7188,0.1563,1.7188,0.1563l-0.28125,0.2187-0.9375-0.031-0.84375-0.1875-0.71875-0.031-0.65625-0.4062-0.84375-0.75-0.28125-0.3438-0.90625-0.25-0.40625-0.094-0.4375-0.1563-0.65625-0.5-1.6875-0.25-0.875-0.094s-0.875-0.125-0.96875,0c-0.0937,0.125-0.59375,0.6562-0.59375,0.6562l-0.875-0.4375-0.4375-0.25-1.0625-0.1562s-0.4375-0.125-0.65625,0-0.625,0.25-0.625,0.25-0.21875,0.5312-0.15625,0.8125c0.0625,0.2812,0.125,0.5,0.25,0.625l0.25,0.25c0.34375,0.125,0.28125,0.1562,0.5625,0.2187,0.28125,0.062,0.75,0.1563,0.75,0.1563l1.2812,0.7812s0.65625-0.2187,0.96875-0.125c0.3125,0.094-0.15625-0.3125,0.46875,0.094,0.625,0.4062,0.71875,0.5,0.84375,0.6562,0.125,0.1563,0.21875,0.3438,0.25,0.5625,0.0312,0.2188,0,0.3438,0.0312,0.5,0.0312,0.1563,0.1875,0.5313,0.1875,0.5313l0.8125,0.75,0.53125,0.5625s-0.0625-0.1875,0.53125,0.25,1.2188,0.8437,1.2188,0.8437l-0.0937,0.4063-1.125-0.6563s-0.71875-0.094-0.75,0.125c-0.0312,0.2188-0.125,0.3125-0.0937,0.5313,0.0312,0.2187-0.0312,0.3125,0.0312,0.5,0.0625,0.1875-0.0937-0.094,0.0312,0.6875,0.125,0.7812,0.21875,1.6562,0.21875,1.6562l-0.5625-0.4687s-0.25-0.5625-0.25-0.7813c0-0.2187-0.0625-0.5937-0.0625-0.7812s0.1875-0.9063,0.1875-0.9063,0-0.094,0.125-0.2812c0.125-0.1875,0.1875-0.1563,0.1875-0.4375,0-0.2813-0.0625-0.5938-0.125-0.7188s-0.5625-0.8125-0.5625-0.8125l-0.4375-0.4375c-0.0625-0.125-0.375-0.6562-0.375-0.6562l-0.3125-0.5-0.78125-0.4688-0.59375-0.031s-0.59375-0.125-0.78125,0-0.28125,0.125-0.34375,0.25-0.375,0.5312-0.375,0.5312l-0.59375,0.031c-0.15625,0.031-0.71875,0.062-0.71875,0.062l-0.15625,1.0312s0.15625,0.1875,0.21875,0.5313c0.0625,0.3437-0.0625,0.375,0.1875,0.625s0.40625,0.1562,0.46875,0.4687,0.0312,0.5313,0.125,0.8438c0.0937,0.3125,0.1875,0.4062,0.21875,0.75,0.0312,0.3437,0,0.7187,0,0.7187l-0.2812-0.4687v-0.375c0-0.3125,0.0625-0.375,0-0.5625s-0.1875-0.5313-0.1875-0.5313,0.0625-0.094-0.0937-0.3437c-0.15625-0.25-0.15625-0.25-0.15625-0.25s-0.1875-0.3125-0.3125-0.625-0.21875-0.3438-0.28125-0.6875c-0.0625-0.3438-0.0312-0.2813-0.0937-0.5-0.0625-0.2188-0.0312-0.25-0.125-0.4375-0.0937-0.1875-0.25-0.5-0.25-0.5l-0.125-0.1563s-0.59375-0.031-0.75,0.094-0.21875,0.031-0.34375,0.2812c-0.125,0.25,0.6875-0.031-0.21875,0.3125-0.90625,0.3438-1.0938,0.3438-1.0938,0.3438s-0.3125-0.4375-0.375-0.5938c-0.0625-0.1562-0.21875-0.25-0.25-0.5312-0.0312-0.2813-0.0312-0.4375-0.0937-0.6563-0.0625-0.2187-0.28125-0.6875-0.28125-0.6875l-0.3125-0.4062s-0.0312-0.1875-0.21875,0c-0.1875,0.1875-0.3125,0.1875-0.34375,0.3437-0.0312,0.1563,0,0.031-0.0937,0.2813-0.0937,0.25-0.0625,0.25-0.3125,0.375s-0.1875-0.125-0.34375,0.1562c-0.15625,0.2813-0.25,0.4063-0.21875,0.6563,0.0312,0.25,0.15625,0.4687,0.15625,0.4687l0.4375,0.5,0.34355,0.5938s0.0312,0.4375,0,0.5937c-0.0312,0.1563-0.125,0.5313-0.125,0.6563s0.3125,1.1562,0.3125,1.1562l0.71875,0.2813s0.40625,0.3125,0.53125,0.4687c0.125,0.1563,0.25,0.25,0.375,0.3438,0.125,0.094,0.21875,0.1562,0.53125,0.375,0.3125,0.2187,0.53125,0.3125,0.6875,0.4375s0.5625,0.375,0.5625,0.375-0.0937,0.125-0.28125,0.125c-0.1875,0-0.875-0.2188-1.0625-0.3438s-0.9375-0.6562-0.9375-0.6562l-0.5-0.5-0.46875-0.4375-0.3125-0.2813-0.375-0.5-0.65625-0.2812-0.59375,0.125s-0.34375,0.1562-0.375,0.3125c-0.0312,0.1562-0.25,0.375-0.25,0.375l-0.625-0.375s0.0625-0.25-0.21875-0.5938c-0.28125-0.3437-0.4375-0.625-0.4375-0.625l-0.46875-0.4062-0.59375-0.0932-0.28125,0.125c-0.0312,0.125-0.125,0.25-0.1875,0.375s-0.3125,0.2188-0.3125,0.2188l-0.46875,0.125-0.53125-0.375s-0.1875-0.375-0.34375-0.5313c-0.15625-0.1562-0.5-0.5312-0.5-0.5312l-0.3125-0.2813-0.28125-0.062s-0.375,0.062-0.4375,0.2188c-0.0625,0.1562-0.1875,0.375-0.3125,0.4062-0.125,0.031-0.3125,0.094-0.3125,0.094s-0.0312,0.094,0,0.2187c0.0312,0.125,0.5,0.625,0.5,0.625s0.0937,0.125,0.3125,0.2813c0.21875,0.1562,0.1875,0.094,0.34375,0.2187,0.15625,0.125,0.0937,0.094,0.3125,0.25,0.21875,0.1563,0.21875,0.5625,0.34375,0.625,0.125,0.062,0.34375,0.1563,0.5625,0.3438s0.5,0.4687,0.71875,0.5625c0.21875,0.094-0.21875,0.625-0.21875,0.625l-0.75,0.3437-0.3125,0.094,0.0312,0.75s0.1875,0.125,0.3125,0.125,0.84375,0.1562,0.84375,0.1562l0.65625,0.062s0.875,0.125,1,0.125h0.40625l0.125,0.25,0.37505,0.3125,0.8125,0.1875,0.8125,0.125,0.53125,0.1875s0.5,0.3438,0.625,0.4688l0.375,0.375c0.0625,0.125,0.25,0.3125,0.25,0.3125s0.46875,0.4062,0.625,0.4375c0.15625,0.031,0.8125,0.3125,0.9375,0.3125h0.46875c0.125,0,0.625,0.3437,0.625,0.3437l0.15625,0.1875s0.1875-0.031,0.3125-0.125,0.0625-0.031,0.46875-0.1562c0.40625-0.125,0.5625-0.2813,0.78125-0.2813s0.34375,0,0.625-0.062,0.0625-0.062,0.5-0.062,0.59375-0.031,0.84375,0,0.8125,0.1563,0.8125,0.1563,0.1875,0.031,0.25,0.1562c0.0625,0.125,0.0625,0.4063,0.0625,0.4063s-0.0625-0.062-0.34375-0.125c-0.28125-0.062-1.125-0.3438-1.125-0.3438s-0.0625-0.031-0.375,0.031-0.5625-0.094-0.8125,0.094c-0.25,0.1875-0.65625,0.4688-0.65625,0.4688l-0.53125,0.1875-1.2188-0.2813s-0.65625-0.5-1.0312-0.5c-0.375,0-0.65625-0.031-0.65625-0.031s-0.15625,0.031-0.4375,0.1562c-0.28125,0.125-0.53125,0.1563-0.65625,0.125-0.125-0.031-0.71875-0.5-0.71875-0.5s-0.46875-0.3437-0.84375-0.5625c-0.375-0.2187-0.5625-0.2812-0.5625-0.2812l-0.5-0.3125-0.5625-0.2813s0.15625,0.094-0.59375-0.3437c-0.75-0.4375-1-0.5-1-0.5l-0.625-0.2188-1.4688-0.2187-0.96875-0.2188h-0.59375l-0.78125,0.1563-0.125,0.5625-0.59375,0.3125-0.59375-0.125-0.1875-0.5938-0.0937-0.2812-0.65625-0.094h-0.53125l-0.5625,0.2188s-0.21875,0.1875-0.28125,0.3125-0.28125,0.3437-0.28125,0.3437l0.28125,0.1875s0.15625,0.031,0.3125,0.031,0.53125,0.125,0.53125,0.125l0.40625,0.062s-0.0312-0.031,0.28125,0.031c0.3125,0.062,0.40625,0.094,0.53125,0.094s0.125,0.031,0.46875,0.031-0.0625,0,0.40625,0.031,0.71875,0.125,0.71875,0.125l0.375,0.062s0.21875,0.031,0.28125,0.1562c0.0625,0.125,0.0937,0.25,0.0937,0.25l-0.28125,0.1875-0.28125,0.1563-0.34375,0.625-0.71875,0.062h-0.21875l-1,0.031-0.375,0.5625s-0.15625,0.062-0.0937,0.2188c0.0625,0.1562,0.3125,0.5937,0.3125,0.5937l0.125,0.25,0.53125,0.2188h0.5625l0.375-0.062s0.0937-0.031,0.25-0.031h0.59375l0.90625,0.1875,0.34375,0.031,0.5,0.2187,0.21875,0.25-0.375,0.7813h-0.40625l-0.375,0.3125-0.1875,0.2187-0.0937,0.25-0.46875,0.1875s-0.5625,0.094-0.6875,0.1875c-0.125,0.094-0.78125,0.1875-0.78125,0.1875l-0.875,0.062-0.75,0.1563-0.125,0.8125s-0.0312,0.031,0.25,0.031c0.28125,0,0.53125-0.125,0.53125-0.125l0.21875-0.2187s0.71865,0.125,0.90615,0.125h0.78125,0.4375l0.375,0.2812s0.0312-0.031,0.25,0c0.21875,0.031,0.28125,0,0.65625,0.031s0.4375,0.031,0.65625,0.031,0.625,0.062,0.75,0.062,0.4375-0.031,0.6875,0,0.96875,0.1563,0.96875,0.1563l0.53125,0.031,0.5625,0.094-0.5,0.062-1-0.125h-0.15625l-0.84375-0.125-0.5625-0.031h-0.75l-0.46875,0.4688-0.84375-0.094-0.8125,0.2188s-0.5,0.125-0.65625,0.1875c-0.15625,0.062-0.40625,0.094-0.40625,0.094s-0.28125-0.031-0.46875,0.062c-0.1875,0.094-0.40625,0.125-0.40625,0.125l-0.25,0.5625,0.15625,0.094,0.4375,0.125,0.4375-0.031,0.15625-0.062h0.375l0.3125,0.5625,1,0.5313,0.1875,0.125-0.9375,0.062-0.46875,0.5312-0.53125,0.1875-0.65625-0.031-0.65625-0.1563-0.53125-0.3437-0.28125-0.25-0.1875,0.1875,0.0625,0.8437s0.1875,0.094,0.34375,0.2813c0.15625,0.1875,0.5625,0.5937,0.5625,0.5937s0.59375,0.4375,0.8125,0.625,0.9375,0.6875,0.9375,0.6875,0.21875-0.094,0.46875,0.094c0.25,0.1875,0.78125,0.625,0.78125,0.625s0.0625,0.2187,0.40625,0.062c0.34375-0.1563,0.90625-0.3125,0.90625-0.3125l0.34375-0.2188s0.21875-0.25,0.40625-0.25,0.8125,0.031,0.8125,0.031l0.5625,0.2812s0.125,0.125,0.34375,0.094-0.0312-0.031,0.3125-0.094c0.34375-0.062,0.40625-0.062,0.5625-0.1562,0.15625-0.094,0.21875-0.125,0.53125-0.125s0.84375,0.031,0.84375,0.031,0.21875,0.031,0.375,0.125,0.84375,0.4688,0.84375,0.4688l1.0312,0.094s0.125,0.1563,0.3125,0.4063,0.53125,0.625,0.65625,0.6875c0.125,0.062,0.4375,0.2187,0.5625,0.125,0.125-0.094,0.125-0.062,0.28125-0.1875,0.15625-0.125,0.15625-0.1875,0.28125-0.25,0.125-0.062,0.21875-0.094,0.21875-0.094l0.21875-0.125,0.3125-0.031s0.15625-0.062,0.3125-0.1875c0.15625-0.125,0.46875-0.4063,0.46875-0.4063s0.0625-0.1562,0.1875-0.3437,0.0937-0.2813,0.25-0.4375c0.15625-0.1563,0.3125-0.3438,0.3125-0.3438l0.5625,0.625s-0.125-0.094,0.25,0.3438c0.375,0.4375,0.8125,0.8437,0.8125,0.8437s-0.0625,0.094,0.28125,0.2188c0.34375,0.125,1.0312,0.3125,1.1562,0.3125s0.0312,0,0.46875,0.031c0.4375,0.031,0.5625,0.25,0.84375,0.062,0.28125-0.1875,0.34375-0.2187,0.625-0.375,0.28125-0.1562,0.375-0.2812,0.5-0.3437,0.125-0.062,0.375,0,0.53125-0.125s0.21875-0.125,0.375-0.4063c0.15625-0.2812,0.25-0.5,0.34375-0.625,0.0937-0.125,0.0312-0.1562,0.1875-0.3125,0.15625-0.1562,0.0625-0.062,0.375-0.4062,0.3125-0.3438,0.4375-0.4688,0.5625-0.5938s0.0937-0.2187,0.34375-0.4375c0.25-0.2187,0.4375-0.4062,0.625-0.5,0.1875-0.094,0.375-0.1875,0.375-0.1875l0.65625,0.094-0.34375,0.3125s-0.21875,0.062-0.375,0.25c-0.15625,0.1875-0.1875,0.1875-0.375,0.375s-0.40625,0.1562-0.46875,0.3437-0.15625,0.3125-0.21875,0.4688c-0.0625,0.1562-0.34375,0.2812-0.46875,0.6562s-0.21875,0.25-0.15625,0.5938c0.0625,0.3437,0.0625,0.5312,0.0625,0.6562v0.3125s-0.15625,0.4375,0,0.4375,0.71875,0.031,0.9375-0.062c0.21875-0.094,0.59375-0.25,0.875-0.25s1.2812,0.2188,1.2812,0.2188l0.40625,0.4687s-0.25,0.25-0.46875,0.25-1.9062-0.4375-1.9062-0.4375-0.0937-0.062-0.21875,0.031c-0.125,0.094-0.25,0.062-0.34375,0.3125-0.0937,0.25-0.3125,0.625-0.3125,0.625l-0.53125,0.3437-0.625,0.125,0.53125-0.5312s-0.0312-0.1563,0-0.2813,0-0.5312,0-0.5312l-0.53125-0.5-0.65625,0.1875-0.15625,0.375-0.34375,0.2812-0.625,0.094-0.8125,0.5312s-0.15625,0.125-0.1875,0.4063c-0.0312,0.2812-0.15625,0.4687-0.125,0.6875,0.0312,0.2187,0.0312,0.375,0.21875,0.625,0.1875,0.25,0.34375,0.3437,0.5,0.6875,0.15625,0.3437,0.15625,0.875,0.1875,1.0625,0.0312,0.1875,0.0312,0.375,0.0312,0.375l-0.25-0.625-0.34375-0.5313-1.2188-0.3437,0.15625-0.375,0.1875-0.2813s0.0312-0.25,0.0312-0.4062c0-0.1563-0.0625-0.2813,0-0.5313s0.125-0.4375,0.125-0.5625-0.0312-0.375-0.0312-0.375l-0.5-0.4375-0.625-0.4375-0.59375-0.25-1.0938-0.2812-0.71875,0.1562c-0.0937,0.1563-0.25,0.375-0.25,0.375s-0.5,0.062-0.625,0.1875c-0.125,0.125-0.28125,0.2188-0.28125,0.2188l-0.1875,0.125-1.25-0.1875-0.7812-0.031-1-0.6562-0.125-0.3438-0.65625-0.4687-0.34375-0.094-1.4688-0.25s-0.25-0.031-0.4375,0-1.75-0.094-1.75-0.094l-0.5,0.031h-0.53125s-0.5625,0.094-0.78125,0.2813c-0.21875,0.1875-0.53125,0.4375-0.6875,0.4687-0.15625,0.031-0.53125,0.125-0.53125,0.125l-0.9375-0.062-0.875-0.4062-0.4375-0.2188s-0.625-0.1875-1.0938-0.1875h-0.46875l-0.53125,0.3125-0.25,0.2813-0.25,0.4062,0.0937,1.5625,0.0937,0.4063,0.78125,0.6562s0.25,0.3125,0.34375,0.4375c0.0937,0.125,0.78125,0.9688,0.9375,0.9375,0.15625-0.031,0.15625-0.125,0.46875-0.2812,0.3125-0.1563,0.40625-0.3125,0.71875-0.4688,0.3125-0.1562,0.75-0.2812,0.75-0.2812l0.875,0.094s0,0.1875-0.125,0.2188c-0.125,0.031-0.78125-0.125-0.90625-0.031s-0.4375,0.2188-0.5625,0.375c-0.125,0.1563-0.3125,0.375-0.3125,0.375l-0.53125,0.4375-0.59375,0.2813-0.59375-0.1563-0.53125-0.3125-0.65625-0.3125-0.375,0.094-0.1875,0.375-0.125,0.4687,0.0937,0.3125,0.62515,0.3438,0.8125,0.094,0.34375-0.125,0.5,0.062,0.4375,0.062s0.15625,0.1875,0.21875,0.3125,0.125,0.3438,0.21875,0.5313c0.0937,0.1875,0.28125,0.5625,0.34375,0.75s0.21875,0.4062,0.21875,0.4062l0.28125,0.3438,0.6875,0.1875s-0.0937-0.25,0.0625-0.4688c0.15625-0.2187,0.1875-0.4687,0.34375-0.6562s0.15625-0.3438,0.34375-0.4688,0.46875-0.3437,0.46875-0.3437l0.3125-0.1563s0.0312-0.031,0.21875,0.125c0.1875,0.1563,0.15625,0,0.34375,0.3438,0.1875,0.3437,0.3125,0.4375,0.34375,0.625,0.0312,0.1875,0.0937,0.2812,0.0937,0.4687s-0.0625,0.3438-0.0625,0.5313-0.0937,0.4687-0.0937,0.4687l-0.1875,0.2188-0.4375,0.3437-0.3125,0.5-0.0625,0.4375-0.25,0.4063-0.3125,0.5-0.125,0.4375-0.46875,0.1875-0.59375,0.1562-0.34375,0.031-0.34375-0.25-0.3125-0.4063-0.28125-0.3437-0.4375-0.6875-0.0625-0.2813-0.125-0.4375-0.21875-0.6875-0.46875-0.1875-0.25-1.1562s0.0312,0.1562,0.0625-0.1875c0.0312-0.3438-0.0625-0.625-0.0625-0.625l-0.28125-0.5313-0.59375-0.25-0.59375-0.2812-0.0625,0.2812-0.15625,0.375s-0.0312,0.25,0,0.5313c0.0312,0.2812,0.0312,0.4687,0.0312,0.4687s-0.0312,0.1875,0.0312,0.3438c0.0625,0.1562,0.28125,0.5937,0.28125,0.5937l1.0938,1.125s0,0.2188-0.0312,0.3438-0.125,0.25-0.125,0.5-0.0625,0.6562-0.0625,0.6562l0.0625,1.2813-0.75,0.5s-0.15625,0.031-0.125,0.1875c0.0312,0.1562-0.0625,0.3125,0.0625,0.5312,0.125,0.2188,0.25,0.4063,0.40625,0.5,0.15625,0.094,0.625,0.3125,0.59375,0.4688-0.0312,0.1562-0.15625,0.2812-0.375,0.4375-0.21875,0.1562-0.34375,0.2187-0.34375,0.2187s-0.375,0.062-0.15625,0.4063c0.21875,0.3437,0.5625,0.75,0.5625,0.75l0.28125,0.625,0.0625,0.2187,0.4375-0.031s0.125-0.125,0.21875-0.3125c0.0937-0.1875,0.21875-0.2813,0.34375-0.5313s0.1875-0.2812,0.3125-0.5312,0.1875-0.3438,0.3125-0.5c0.125-0.1563-0.0625-0.1563,0.4375-0.375,0.5-0.2188,0.6875-0.2813,0.78125-0.4063,0.0937-0.125,0.28125-0.3125,0.46875-0.5s0.21875-0.4687,0.46875-0.5312c0.25-0.062,0.9375-0.2188,0.9375-0.2188l0.24995,0.125s0.15625,0.125,0.0625,0.25c-0.0937,0.125-0.25,0.2188-0.46875,0.3438s-0.5625,0.1562-0.6875,0.3437-0.1875,0.1563-0.34375,0.3438-0.0625-0.3125-0.4375,0.3437c-0.375,0.6563-0.40625,0.6875-0.40625,0.6875l-0.1875,0.2188-0.65625,0.375-0.15625,0.3437s0.125,0.375-0.0625,0.4688c-0.1875,0.094-0.4375,0.2812-0.4375,0.2812l0.125,0.375,0.21875,0.062,0.34375,0.062s0.1875,0.125,0.5-0.062c0.3125-0.1875,0.65625-0.3125,0.65625-0.3125l0.15625-0.062,0.53125,0.1875,0.0312,0.5938-0.0625,0.3125-0.3125,0.4062s0,0.2188-0.0625,0.375c-0.0625,0.1563-0.15625,0.4063-0.15625,0.4063l-0.125,0.3437,0.125,0.25,0.3125,0.2188s0.3125,0.094,0.46875,0.094,0.40625,0.062,0.53125,0,0.46875-0.125,0.5-0.25c0.0312-0.125,0.0937-0.3125,0.0937-0.5s-0.0312-0.375-0.0312-0.5312c0-0.1563-0.0312-0.375,0-0.6563,0.0312-0.2812-0.0312-0.4062,0.0937-0.5312,0.125-0.125,0.125-0.2188,0.25-0.3125,0.125-0.094,0.28125-0.2188,0.28125-0.2188l0.53125-0.125,0.46875-0.094,0.5625-0.031s0.375-0.031,0.5-0.062,0.53125-0.1875,0.53125-0.1875l0.28125-0.4687,0.28125-0.1875v-0.3125s-0.15625-0.1875,0-0.5313c0.15625-0.3437,0.125-0.5312,0.28125-0.6875,0.15625-0.1562,0.34375-0.3125,0.34375-0.3125l0.40625-0.031s0.75,0.031,0.90625,0.031,0.65625-0.125,0.65625-0.125-0.0312-0.031,0.21875-0.1562c0.25-0.125,0.3125-0.1563,0.53125-0.2813s0.40625-0.3125,0.40625-0.3125l0.21875-0.2187,0.21875-0.1563,0.375-0.3437s0.5-0.2188,0.6875-0.3125c0.1875-0.094,0.46875-0.25,0.46875-0.25s0.40635-0.2188,0.46885-0.094c0.0625,0.125,0.1875,0.2813,0.21875,0.4063,0.0312,0.125,0.0625,0.1875,0.0625,0.1875l0.28125,0.031h0.5625s0.34375-0.031,0.46875-0.1562c0.125-0.125,0.1875-0.1875,0.3125-0.3125s0.28125-0.1875,0.4375-0.3125,0.15625-0.2188,0.34375-0.2813c0.1875-0.062,0.625-0.1562,0.625-0.1562l0.0937,0.1562c0.0312,0.1563,0.0625,0.4063,0.0625,0.4063l-0.0312,0.1562-0.15625,0.062-0.34375,0.031-0.34375,0.125s-0.34375,0.094-0.46875,0.2187c-0.125,0.125-0.46875,0.3125-0.46875,0.3125l-0.21875,0.1563-0.3125,0.1875-0.6875,0.1562-0.125,0.1875s-0.0312,0.062-0.0937,0.1875c-0.0625,0.125-0.34375,0.375-0.4375,0.5313-0.0937,0.1562-0.4375,0.375-0.5,0.5s-0.0625,0.1562-0.15625,0.3437c-0.0937,0.1875-0.15625,0.25-0.1875,0.4375-0.0312,0.1875-0.0625,0.1875-0.0937,0.375s-0.28125,0.5-0.28125,0.5l-0.46875,1.0625s-0.0625,0.031-0.0937,0.3438c-0.0312,0.3125-0.1875,0.6875-0.25,0.9062-0.0625,0.2188-0.1875,0.2813-0.21875,0.4063-0.0312,0.125-0.3125,0.4687-0.3125,0.4687l-0.31265,0.1875-0.0312-0.4375v-0.625l0.625-0.7812s0.125-0.25,0.1875-0.4063c0.0625-0.1562-0.0312-0.25,0.125-0.4687,0.15625-0.2188,0.1875-0.3438,0.3125-0.5313s0.21875-0.3437,0.28125-0.4687,0.1875-0.3438,0.1875-0.3438l0.1875-0.5,0.15625-0.3437s-0.0625-0.1875,0.125-0.3438c0.1875-0.1562,0.46875-0.5625,0.46875-0.5625l0.375-0.2812,0.0312-0.25-0.0625-0.2813-0.40625-0.094-0.625-0.125-0.1875,0.1562-0.46875,0.25s-0.21875,0.094-0.34375,0.1875c-0.125,0.094-0.4375,0.2188-0.4375,0.2188s-0.65625,0.4062-0.78125,0.5312-0.1875,0.2813-0.5,0.4688-0.96875,0.4375-0.96875,0.4375l-0.375,0.4687-0.6875,0.7813s-0.3125,0.3125-0.40625,0.4375c-0.0937,0.125-0.25,0.1875-0.375,0.4375s-0.53125,0.5-0.53125,0.625,0.15625,0.75,0.15625,0.75l-1.4375,1.375-0.40625,0.625-0.1875,0.5312-0.53125,0.4063s-0.375,0.125-0.5,0.1875c-0.125,0.062-0.875,0.062-0.875,0.062l-1.0938,0.1562-0.0625,0.4375-0.21875,0.75v0.875l0.34375,0.5s0.25,0.1875,0.40625,0.2188c0.15625,0.031,0.78125,0.2187,1,0.2187h0.84375s0.75,0.2188,1.2188,0.1875c0.46875-0.031,0.84375,0.062,0.96875-0.062,0.125-0.125,0.375-0.4687,0.5625-0.5937s1.4688-0.4063,1.4688-0.4063l-0.375,0.4063s-0.90625,0.1562-1,0.2812c-0.0937,0.125-0.53125,0.4063-0.53125,0.4063s-0.625,0.1562-0.8125,0.1875c-0.1875,0.031-0.96875,0.062-0.96875,0.062l-1.3438-0.125-1.125-0.031-0.28125,0.125-0.375,0.3125-0.25,0.5625-0.4375,0.4063,0.21875,0.125,0.28125,0.375,0.15625,0.7812-0.0937-0.094-0.40625-0.4688-0.3125-0.3125-0.28125-0.4062-0.3125-0.5313-0.46875-0.2812s-0.375-0.3438-0.4375-0.4688-0.25-0.5937-0.25-0.5937-0.0312-0.125,0-0.5625-0.0312-0.4375-0.0312-0.8125,0.0625-0.3438,0-0.8438-0.25-0.5312-0.125-0.9062,0.15625-0.6875,0.1875-0.875c0.0312-0.1875,0.0625-0.5938,0.0625-0.5938l-0.125-0.2187-0.34375-0.2188h-0.84375s-0.125-0.094-0.25,0.062c-0.125,0.1563-0.3125,0.2188-0.4375,0.5-0.125,0.2813-0.40625,0.4688-0.4375,0.6875-0.0312,0.2188-0.0937,0.5938-0.0625,0.7188s-0.0937,0.4062-0.0312,0.5625c0.0625,0.1562,0.21875,0.4375,0.375,0.5937,0.15625,0.1563,0.25,0.2813,0.40625,0.4375,0.15625,0.1563,0.25,0.3438,0.25,0.3438l0.125,0.375s0.0312,0.5,0.0312,0.7187c0,0.2188-0.15625,1.0938-0.15625,1.0938s-0.0312,0.125-0.21875,0.2187c-0.1875,0.094-0.5,0.031-0.6875,0.1875-0.1875,0.1563-0.375,0.3438-0.5625,0.4375-0.1875,0.094-0.78125,0.2813-0.78125,0.2813l0.25,0.6562s-0.28125,0.2188-0.375,0.3438c-0.0937,0.125-0.53125,0.062-0.53125,0.4062,0,0.3438,0.0312,0.6563,0,0.8438s-0.28125,0.5-0.28125,0.5l-0.375,0.4687s-0.0937,0.094-0.3125,0.25c-0.21875,0.1563-0.59375,0.3438-0.59375,0.3438l-0.21875,0.3125s-0.25,0.1875-0.3125,0.4375-0.125,0.094-0.125,0.625c0,0.5312-0.0937,0.7812-0.0312,1,0.0625,0.2187-0.0312,0.5625,0,0.8437,0.0312,0.2813,0,0.5625,0,0.5625l0.15625,0.1875s0.1875,0.094,0.3125,0.1875c0.125,0.094,0.21875,0.1875,0.21875,0.1875s-0.0937-0.031,0.15625,0.062c0.25,0.094,0.65625,0.094,0.65625,0.094s0.21875,0.031,0.25-0.1563c0.0312-0.1875,0.125-0.031,0.0312-0.4687-0.0937-0.4375-0.15625-0.5938-0.21875-0.8438s-0.0937-0.375-0.0937-0.5312c0-0.1563-0.15625-0.125,0.0312-0.4688,0.1875-0.3437,0.375-0.6875,0.375-0.6875s0.125-0.25,0.1875-0.4062c0.0625-0.1563,0.0312-0.3125,0.21875-0.5,0.1875-0.1875,0.0937-0.4063,0.3125-0.25,0.21875,0.1562,0.15625,0.094,0.25,0.3437,0.0937,0.25,0.0625,0.2813,0.1875,0.4375,0.125,0.1563,0.375,0.2813,0.375,0.2813s0.15615-0.1875,0.3124,0.094c0.15625,0.2813,0.25,0.5625,0.25,0.5625l0.0625,0.1875,0.5625,0.2813,0.90625,0.094,0.8125,0.062s0.40625-0.031,0.59375-0.062,0.75-0.125,0.75-0.125l0.625-0.1875,0.34375-0.2812s0.46875-0.2188,0.46875-0.4063v-0.4062s-0.0312-0.2813-0.0937-0.5625c-0.0625-0.2813-0.15625-0.6563-0.15625-0.6563l0.15625-0.4062,0.25-0.2813,0.28125,0.2188,0.6875,0.4687,0.28125,0.375,0.5,0.4688,0.25,0.2812s0.71875,0.1875,0.75-0.094c0.0312-0.2813,0.125-0.5,0.125-0.5s0.53125-0.031,0.59375-0.1875c0.0625-0.1563,0.15625-0.2813,0.40625-0.5938s0.4375-0.6875,0.4375-0.6875,0.125-0.2812,0.3125-0.3125c0.1875-0.031,0.4375-0.125,0.4375-0.125l0.1875,0.062c0.15625,0.062,0.5625,0.3125,0.5625,0.3125l0.65625,0.1563,0.6875,0.094,0.0937,0.1875-0.6875,0.094-0.71875-0.062s0.15625-0.031-0.28125,0.031-0.875,0.062-0.875,0.062l-0.21875,0.2813c-0.4375,0.2812-0.6875,0.2187-0.71875,0.375-0.0312,0.1562,0.0937,0.094-0.0625,0.4062-0.15625,0.3125-0.375,0.5-0.375,0.5s-0.15625,0.1563-0.34375,0.25c-0.1875,0.094-0.78125,0.125-0.78125,0.125s-0.0312-0.125-0.21875,0.031c-0.1875,0.1562-0.21875,0.2187-0.65625,0.3125-0.4375,0.094-1.0312,0.125-1.0312,0.125l-0.15625,0.3125,0.25,0.2812,0.15625,0.1563,0.40625,0.4375,0.1875,0.2812,0.46875,0.1875,0.375,0.3438,0.4375,0.25s0.21875,0.062,0.5625,0.062,0.65625,0.062,0.9375,0.031,0.5,0.094,0.6875-0.062c0.1875-0.1562,0.1875-0.4687,0.375-0.5625,0.1875-0.094,0.40625-0.125,0.40625-0.125l0.6875,0.7188s0.5625,0.062,0.28125,0.2187c-0.28125,0.1563-1.2812,0.1563-1.2812,0.1563s-0.40625-0.031-0.59375-0.031-0.5625-0.1875-0.9375-0.1562c-0.375,0.031-0.6875,0.031-0.6875,0.031s-0.8125,0.125-1.0938,0.4063c-0.28125,0.2812-0.71875,0.4062-0.75,0.6562-0.0312,0.25-0.0625,0.5-0.0625,0.5l-0.25,0.5313s-0.3125,0.2187-0.53125,0.3125c-0.21875,0.094-0.90625,0.2187-0.90625,0.2187s-0.0312,0.1875-0.0312,0.4375-0.0312,0.625-0.0312,0.625l0.59375,0.625s0.1875,0.2813,0.46875,0.3125c0.28125,0.031,1.2812,0.3125,1.2812,0.3125s0.40625-0.094,0.78125-0.125,1.1562,0,1.4062-0.031,1.5312-0.062,1.5312-0.062l0.46875,0.031-1.1562,0.1563-0.65625-0.125-0.5625,0.1562-0.46875,0.062-0.46875,0.1875-0.71875,0.6563-0.53125-0.2188-0.75-0.1875-0.375,0.094s-0.28125,0.062-0.28125,0.2812c0,0.2188-0.0625,0.4375,0.0937,0.625,0.15625,0.1875,0.34375,0.3125,0.5,0.5313,0.15625,0.2187,0.90625,1,0.90625,1l0.21875,0.2187-0.46875-0.25s-0.28125-0.375-0.375-0.5c-0.0937-0.125-0.6875-0.9062-0.6875-0.9062l-0.8125-0.6875-0.28125-0.2188-0.71875-0.6562-0.6875-0.4063-0.53125-0.5937-0.5-0.2813-0.18755,0.25-0.21875,0.1875-0.0937,0.375-0.25,0.2188-0.1875,0.1875s-0.0937,0.062-0.15625,0.2812c-0.0625,0.2188-0.125,0.25-0.125,0.4375s-0.0625,0.375-0.0625,0.5625,0.125,0.3125,0,0.4688c-0.125,0.1562-0.21875,0.25-0.34375,0.375s-0.40625,0.3437-0.53125,0.4687-0.1875,0.062-0.1875,0.25c0,0.1875-0.0625,0.4688-0.0625,0.4688s-0.125,0.25-0.1875,0.4062c-0.0625,0.1563-0.0312,0.25-0.0625,0.4688-0.0312,0.2187-0.125,0.1562-0.125,0.4062s-0.0312,0.1875,0.125,0.4688c0.15625,0.2812,0.21875,0.5625,0.25,0.7187,0.0312,0.1563,0.0937,0.3125,0.0937,0.3125s-0.15625,0.5313-0.125,0.6875c0.0312,0.1563-0.0625,0.4063,0.0625,0.5313s-0.0937,0.094,0.1875,0.2187c0.28125,0.125,0.46875,0.25,0.78125,0.4688,0.3125,0.2187,0.59375,0.4375,0.71875,0.625s0.0625,0.094,0.28125,0.2812c0.21875,0.1875,0.3125,0.125,0.5625,0.375l0.75,0.75c0.15625,0.125,0.125,0.031,0.375,0.25,0.25,0.2188,0.46875,0.375,0.53125,0.5938,0.0625,0.2187,0.0937,0.5,0.0937,0.6562v0.5s0.15625,0.2813,0.40625,0.4688,0.375,0.3437,0.5,0.4687,0.28125,0.2813,0.46875,0.4063,0.90625,0.75,0.90625,0.75,0.15625,0.1875,0.28125,0.2812c0.125,0.094,0.4375,0.2813,0.4375,0.2813l0.6875,0.125s-0.15625-0.094,0.40625-0.125,0.4375-0.031,1.0625-0.062,1.5312-0.031,1.5312-0.031,0.0937-0.094,0.0937,0.25c0,0.3438-0.0937,0.5313-0.34375,0.7188-0.25,0.1875-0.53125,0.3437-0.53125,0.3437l-0.25,0.1563s-0.0625,0.4062-0.0625,0.5937,0,0.3438-0.25,0.5938-0.3125,0.1562-0.375,0.375c-0.0625,0.2187-0.15625,0.3125-0.1875,0.5937-0.0312,0.2813-0.125,0.4688-0.0312,0.625,0.0937,0.1563,0.375,0.5625,0.375,0.5625s0.34375,0.3438,0.46875,0.4063c0.125,0.062,0.5625,0.25,0.5625,0.25s0.15625-0.031,0.5-0.2188c0.34375-0.1875,0.4375-0.1875,0.53125-0.4375,0.0937-0.25,0.0937-0.4375,0.21875-0.6562,0.125-0.2188,0.0625-0.1875,0.21875-0.375s0.0312-0.3438,0.28125-0.3438c0.25,0,0.25-0.125,0.34375,0,0.0937,0.125,0.5625-0.062,0.5625,0.1875,0,0.25,0.0625,0.875,0.0937,1.0938,0.0312,0.2187,0.125,0.4062,0.0937,0.8125-0.0312,0.4062-0.21875,0.5312-0.21875,0.6562s0.0312,0.1875,0.0312,0.1875,0.28125,0.094,0.5625,0.094,0.5-0.031,0.5-0.031,0.125,0.031,0.25-0.25c0.125-0.2812-0.0625-0.3437,0.3125-0.5312s0.4375-0.25,0.4375-0.25l0.28125,0.2812,0.125,0.2813c0.28125,0.2812,0.65625,0.4687,0.65625,0.4687s0.34375-0.125,0.75-0.125,0.53125-0.1562,0.625,0.031c0.0937,0.1875,0.21875,0.4688,0.21875,0.4688l0.1875,0.1875s0.5,0.3437,0.71875,0.3437h0.46875c0.21875,0,0.375,0.031,0.5625,0s0,0.031,0.28125-0.125c0.28125-0.1562,0.28125-0.1562,0.4375-0.3125,0.15625-0.1562,0.0937-0.1562,0.34375-0.3125,0.25-0.1562,0.15625-0.2187,0.375-0.2187h0.4375c0.15625,0-0.71875-0.031,0.46875,0.031s1.3125,0.062,1.3125,0.062,0.0312,0.031,0.46875,0.031c0.4375,0,0.9375,0.031,0.9375,0.031s0.3125,0.062,0.53125,0,0.25-0.094,0.5-0.125,0.3125,0.094,0.59375-0.062c0.28125-0.1563,0.375-0.031,0.53125-0.2813,0.15625-0.25,0.1875-0.25,0.34375-0.4687,0.15625-0.2188,0.21875-0.375,0.34375-0.5313,0.125-0.1562,0.375-0.4062,0.375-0.4062s0.1875-0.125,0.46875-0.1875c0.28125-0.062,0.5-0.031,0.78125-0.094,0.28125-0.062,0.34375-0.062,0.59375-0.1563,0.25-0.094,0.25-0.094,0.46875-0.2187,0.21875-0.125,0.3125-0.094,0.5-0.2813,0.1875-0.1875,0.15625-0.125,0.375-0.4687,0.21875-0.3438,0.25-0.4375,0.40625-0.5938,0.15625-0.1562,0.34375-0.375,0.34375-0.375l1.2812-0.7812s0.15625-0.3125,0.28125-0.4375,0.0937-0.2188,0.46875-0.4063c0.375-0.1875,0.5625-0.1875,0.78125-0.3125s0.3125-0.125,0.625-0.3125,0.6875-0.3437,0.8125-0.5625c0.125-0.2187,0.1875-0.4062,0.3125-0.5937s0.125-0.375,0.3125-0.4688c0.1875-0.094,0.9375-0.6562,0.9375-0.6562s0.0937-0.062,0.28125-0.2813c0.1875-0.2187,0.375-0.4687,0.46875-0.5937,0.0937-0.125,0.21875-0.125,0.34375-0.375s0.3125-0.5313,0.3125-0.5313,0.0937-0.2187,0.28125-0.2812c0.1875-0.062,0.9375-0.1563,0.9375-0.1563s0.53125-0.062,0.78125-0.062,0.71875-0.062,0.71875-0.062l0.34375-0.25c0.25-0.25,0.375-0.2812,0.46875-0.4375,0.0937-0.1562,0.125-0.125,0.25-0.375s0.15625-0.2812,0.1875-0.5c0.0312-0.2187,0-0.4375,0.0312-0.5937,0.0312-0.1563-0.0312-0.1563,0.15625-0.3438,0.1875-0.1875,0.4375-0.375,0.4375-0.375s0.28125-0.125,0.625-0.125h0.75,0.78125c0.15625,0,0.78125-0.1875,0.78125-0.4062,0-0.2188,0-0.3438-0.0625-0.5313s-0.21875-0.5937-0.375-0.7187-1.4688-0.8125-1.4688-0.8125l-0.125-0.8438s-0.0312-0.25,0.0312-0.4062c0.0625-0.1563,0.21875-0.3438,0.21875-0.3438l-0.125,0.25,0.3125,0.5313s-0.0312,0.125-0.0312,0.3125-0.0625,0.1875,0.0312,0.3437c0.0937,0.1563,0.65625,0.4375,0.65625,0.4375s0.0312-0.062,0.25,0.1563c0.21875,0.2187,0.0312-0.031,0.4375,0.4062,0.40625,0.4375,0.40625,0.4375,0.46875,0.6563,0.0625,0.2187,0.15625,0.375,0.25,0.5312,0.0937,0.1563,0.28125,0.4063,0.40625,0.4063s0.625,0.094,0.84375,0.062c0.21875-0.031,0.46875,0.062,0.65625-0.062,0.1875-0.125,0.15625-0.25,0.40625-0.5s0.125-0.4688,0.46875-0.4063c0.34375,0.062,0.84375,0.094,0.9375,0.2188,0.0937,0.125,0.125,0.5312,0.28125,0.4375,0.15625-0.094,0.0625,0.062,0.3125-0.25,0.25-0.3125,0.34375-0.3125,0.46875-0.5938,0.125-0.2812,0.0937-0.2812,0.25-0.5625,0.15625-0.2812,0.125-0.2812,0.40625-0.6875,0.28125-0.4062,0.375-0.5937,0.5-0.7187s0.125-0.1563,0.25-0.3125c0.125-0.1563,0.21875-0.3125,0.40625-0.4688,0.1875-0.1562,0.25-0.1875,0.46875-0.375s0.3125-0.1875,0.46875-0.4062c0.15625-0.2188,0.625-1.6563,0.625-1.6563l-0.125-0.5937s-0.0937-0.375-0.0937-0.5625-0.0312-0.625-0.0312-0.625-0.0312-0.3125,0.0937-0.4688c0.125-0.1562,0.28125-0.4062,0.28125-0.5312s-0.0937-0.5-0.3125-0.5h-1.125s-0.125-0.062-0.15625-0.25c-0.0312-0.1875-0.65625-0.625-0.40625-0.8125s0.34375-0.3125,0.5625-0.3438c0.21875-0.031,0.9375-0.031,0.9375-0.031s0,0.125,0.15625-0.125,0.125-0.8125,0.125-0.8125l-0.0937-0.3125s-0.59375-0.4688-0.6875-0.625c-0.0937-0.1563-0.3125-0.4063-0.375-0.5625-0.0625-0.1563-0.4375-0.6875-0.4375-0.6875l-0.1248-0.2499-0.0312-0.25,0.34375-0.125,0.34375,0.2188s-0.0312,0.1875,0.0312,0.3125c0.0625,0.125,0.0937,0.094,0.0937,0.2187v0.3125l0.0625,0.2188,0.1875,0.2187,0.37505,0.1875,0.25,0.3125,0.15625,0.4688,0.1875,0.4375,0.0312,0.375,0.1875,0.094h0.90625s0.21875,0.2188,0.21875-0.1875v-0.875c0-0.2187,0.0312-0.3437,0.0312-0.5312s0.0625-0.094,0.0312-0.5625c-0.0312-0.4688,0-0.4063-0.0625-0.5938s-0.1875-0.25-0.3125-0.5625-0.15625-0.4375-0.1875-0.5625c-0.0312-0.125-0.0937-0.3125-0.0937-0.5s-0.15625-0.3125,0-0.5625,0.34375-0.4375,0.46875-0.5625-0.0312-0.1562,0.25-0.1875c0.28125-0.031,0.84375,0,0.84375,0l0.3125,0.2188s0.15625,0.094,0.28125,0.2187c0.125,0.125,0.46875,0.4063,0.46875,0.4063s0,0.125-0.1875,0.1875c-0.1875,0.062-0.4375,0.094-0.4375,0.094s0.0625-0.2187-0.1875,0.1563-0.3125,0.4062-0.3125,0.4062l-0.46875,0.2188s-0.0312,0.1562,0,0.3437,0.0312,0.25,0.0312,0.5v0.6563,0.5937,0.75c0,0.2813-0.0625,0.5938-0.0625,0.75,0,0.1563-0.125,0.4063,0,0.5938s0.40625,0.5,0.46875,0.6562c0.0625,0.1563,0.1875,0.1875,0.21875,0.375,0.0312,0.1875-0.1875,0.8438-0.1875,0.8438s-0.40625,0.5312-0.4375,0.6875c-0.0312,0.1562-0.0312,0.031-0.0937,0.375-0.0625,0.3437-0.125,0.5937-0.125,0.8437s-0.0937,0.5313,0,0.7188,0.1875,0.2812,0.1875,0.2812l0.3125,0.3125c0.125,0.1875,0.5,0.7188,0.5,0.7188s-0.0625,0.5-0.0625,0.6562v0.4688c0,0.125,0.0312,0.2812,0.0625,0.4687,0.0312,0.1875-0.0312,0.25,0.0937,0.4063,0.125,0.1562,0.34375,0.3125,0.34375,0.3125l0.28125,0.2812c0.1875,0.2813,0.75,0.875,0.75,0.875s-0.0312,0.031,0.3125,0.031c0.34375,0,0.53125,0.125,0.84375-0.031,0.3125-0.1562,0.4375-0.1562,0.65625-0.25,0.21875-0.094,0.5625-0.125,0.5625-0.125l0.3439,0.3125,0.28125,0.375,0.21875,0.3125,0.84375,0.125,0.53125,0.25v0.8125l0.125,1.0938v1.5312l0.78125,0.25,0.34375,0.5938,1.5625-0.8438,0.75-0.625,0.4375-0.9062,0.25-0.9063,0.375-1.3437,0.625-1.4063-1.2812-2.125-0.0312-1.8125-0.0937-1.8437,0.0625-0.6875v-1.125l0.84375-0.9063,1.8125-0.4687,0.40625-1.0938,0.34375-2.5,0.59375-0.4375,0.375-0.4687,2.4688-0.375,1.4375-0.75,1.125-1.0313,0.65625-1.2187,0.21875-2.7813,0.4375-1.375,0.78125-1.2812,0.65625-1.0625-0.15625-2.7188-0.71875-0.9062-0.28125-0.75-0.75-1.3438-0.5-1.7187-0.59375-0.7813-0.125-2.25,0.3125-0.7812,1.0938-0.125,1.0938,0.094h0.71875l1.625-1,1.0312-1.875,0.34375-1.25,0.59375-0.75,0.25-1.1875-0.3125-1.0625-0.625-0.9375-1.0625-1.0937-0.9375-0.75-1.0938-0.3438-0.6875-0.5625-1.1562-1.0937-0.84375-0.9375-0.375-3.0313,0.9375-1.0625,0.34375-1.5,0.5-1.25,0.375-1.1562,0.0937-0.6563,0.71875-0.75,0.125-1.5312-0.0312-1.2813-0.71875-0.9375-0.40625-1.2187-0.6875-0.875-0.1875-1.4063v-1.4375l0.25-1.0312,0.5625-0.75-0.4375-2.25,0.0625-0.6875,0.5-0.9063,1-1.4062v-1.0313l-0.875-1.0625-0.375-1.125-0.9375-1.125,0.65625-1.25,0.46875-0.625,0.96875-0.8437,0.75-0.7188,0.375-0.5312,0.0625-2.6875,0.5-0.7188,0.875-0.8437,0.375-0.3125,0.40625-1.0625,0.65625-0.625,0.53125-0.5313z").attr(attr);
            eur.gb = R.path("m337.38,61.916,3.0312,2.75h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312l1.9062-0.062-0.0625,1.0312v0.031h-0.0312c-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.6875c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0312-0.5312,4.375-0.3125,0.40625,1.1562h0.0312c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312,4.6875l0.21875,0.9375c0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312,0.0312l1.625-0.375c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.15625-0.625h1.7812l0.0625,0.7187c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312,1.7188l-0.875,0.8125v-0.031l-0.9375,0.75c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.0937,0.6875-1.125,0.125h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.0625,0.4375c-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312,0.0312l1-0.094v1.9688h-1.5312-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.0937,0.6875-1.625,0.062h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.0625,0.8125-1.75-0.3437h-0.0312-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.001,0.01-0.001,0.021,0,0.031l-1.1875,1.25h-1.8438-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.0933,0.7812-1.5312-0.1562h-0.0312-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.0625,0.8438h-1.5938-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.40625,1.6875-1.125,0.125h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.71875,0.3438-0.0937,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031l0.90625,0.125h0.0312l1.0625,0.7187h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312,1.7188l-0.59375,0.6875h-0.9375-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.375,0.7813h-0.46875v-0.5938c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312l-4-0.25h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312l-1.3125,1c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v1.25c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.001-0.01,0.001-0.021,0-0.031l0.0625-0.094,0.84375-0.8437h0.0312l3.125-0.062v0.9062l-0.46875,0.5938-2.4375-0.1875h-0.0312c-0.0121,0.01-0.023,0.019-0.032,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v1.25c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031l3.0625,0.5625h0.0312,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031l0.96875-1.5,7.5-0.062h0.0312l2.2812,2.25c-0.001,0.01-0.001,0.021,0,0.031h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312,3.5l0.15625,0.6875c0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312l2.25-0.125,0.9375,1.1875c0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312,2.8438l2.75,1.75-0.125,2.5625-0.65625,0.3437h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.25,0.875-3.5625,2.9062c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l0.125,1.9688v0.031l-8.4375,8.7188-1.6875,0.25c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.0937,0.5625-8.125,0.125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.9375c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.023,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031l0.875,0.5625c0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.15625-0.8125,2.8438-0.375,1.1875,0.5,0.0625,1.9688c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l1.5625-0.062,0.3125,2.0625h-6.0625-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.0625,1.0313-1.5312-0.125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.011-0.001,0.021,0,0.031l-0.0625,0.4687-1.8125,0.25-0.875-0.7187-1.3125-1.1875c-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-2.1875-0.125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.011-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v1.25c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031l1.1875,1h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h1.875l1.1562,0.9062c0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l0.6875,0.062,1.2812,1.0312c0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.023,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l3.625-0.125c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.011,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.21875-0.9375h1.875l0.71875,0.8437-0.125,2c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312l2.0312-0.062,1.0625,1.125c-0.001,0.01-0.001,0.021,0,0.031l0.96875,0.8125-0.15625,0.9063c-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.023,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312,0.96875l-0.125,3.5938c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l2.375,2.3125c-0.001,0.01-0.001,0.021,0,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h1.1562v4.5h-1.5312c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v6.0625c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.84375v7.9063c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h1.0312v2.9062c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h1.7812v0.7188c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312,1.125,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.001-0.01,0.001-0.021,0-0.031h0.0312,0.65625v0.7812c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312,0.84375v1.0938c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.84375v4.7812c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.78125v1.8438c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312,1.0938v0.7812c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.71875v1.9375h-1.9062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v2.875c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.96875v2.7813c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.78125v2.5625h-0.8125v-0.6563c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312-1.5312v-1.0937c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312-0.21875v-0.8438c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0h-3.6562v-0.4687c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0h-1.2188v-0.2813c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0h-0.9375c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.4375c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.78125v0.9063c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h3.8438v0.7187c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h1.0938v1.9063c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.71875v0.5312c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h1.0938v2.0938c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.71875v0.7812c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.0104,0.001,0.0208,0.001,0.0312,0-0.001,0.01-0.001,0.021,0,0.031v0.8125c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312,0.71875v3.7188,1.7812h-0.78125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v1.0313h-1.5312c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v1.0312h-1.9062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.5938h-1.1562c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.062c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h2.1562v0.7812,0.031c-0.0104-0.001-0.0208-0.001-0.0312,0-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.8125c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.84375v1.0938c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.65625v0.5312c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.375c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.7812h0.53125c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.5938h0.71875c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-1.9687h1.8125v0.9687c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h2.9688v0.5938c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h3.7812v0.7187c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.78125v0.7188c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312,0.90625v1.0937c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.78125v0.9063c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.90625v0.9062c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.90625v6h-0.90625c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v1.5313h-0.46875-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v1.0937h-0.96875-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v2.2188h-1.2188c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.9062h-0.84375c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0107,0.012-0.0194,0.027-0.0255,0.042-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v1.4688h-1.6562-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.8437h-0.96875c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.7188h-0.84375c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.3437h-0.90625c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0123,0.01-0.0232,0.02-0.0322,0.032-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v1.0313h-3.7188c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v2.0312h-0.90625c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.7813h-0.84375c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.9062h-1.7812c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.7188h-0.96875c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.875c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.90625c0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312,1.9062v2.1562c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h7.0938v0.4375h-0.71875c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v2.7813h-1.4062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.9062h-0.78125-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.6563h-3.4688c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.7187h-1.2812c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.6875c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.0104,0.001,0.0208,0.001,0.0312,0-0.001,0.01-0.001,0.021,0,0.031v0.5313h-3.7188-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.6562h-6.0312c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.6563h-1.8125v-0.7188c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0h-0.34375v-0.8437c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312-0.90625v-0.6563c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0h-2.2188v-0.7812c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0h-3.875c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.7812h-1.5625v-1.0312c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0h-0.875c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.875,1.125h-0.1875l0.46875-2.875c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-2.2188-0.1875v-0.5938c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312-0.875-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.34375,0.8125-1.2812-0.25-0.15625-1.0312c-0.0104-0.011-0.0226-0.021-0.036-0.028l-1.0625-1.8125c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.875,0.5c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0151,0.018-0.0259,0.04-0.0312,0.062-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.005,0.023,0.0161,0.044,0.0312,0.062l0.84375,0.9687-0.0625,0.625v0.9688l-2.1562,0.1875h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v2.0312h-0.3125l0.125-2.2187c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312l-1.875-0.062-0.15625-0.75c-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0h-2.6875c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.28125,1.6875h-0.5-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-0.34375,0.9687h-0.71875v-0.7187c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.8125-0.2188-0.0625-0.875c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-1.75,0.062-0.15625-1c-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-1.4398-0.0466h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.125,0.9062c-0.0104-0.001-0.0208-0.001-0.0312,0,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.6875-0.5c-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.34375-0.062-0.21875-0.5937c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.5625-0.094-0.0625-0.6875c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031l-0.75-0.5312v-0.9063c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.011,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-3.8125,0.062-0.21875-1c-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.011,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.018-0.015-0.0396-0.026-0.0625-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-2.6875,0.125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.0937,0.8125h-1.4688l-0.1875-1.8437c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0h-0.25c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.0625,2.0312-0.46875-0.2187c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.125,1.9063-0.65625,0.062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v1.9063h-0.96875c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.125,1h-1.4688c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l0.0625,0.8125-0.125,0.3125v-0.1875c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-1.7812-0.1875-0.0625-0.7187c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0l-0.65625,0.1875-0.15625-0.9375c-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-0.5625,0.062,0.15625-1.0625c0.001-0.011,0.001-0.021,0-0.031,0.001-0.011,0.001-0.021,0-0.031-0.005-0.023-0.0161-0.044-0.0312-0.062-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-2.125-0.1875-0.15625-0.6875c-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.011,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-0.8125-0.062-0.0937-0.75c-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.011,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312l-3.7188,0.125h-0.0312l-0.96875-1c0.001-0.01,0.001-0.021,0-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0l-1.125,0.125c-0.0119,0.01-0.0224,0.019-0.0312,0.031l-1.125,0.5625h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l0.375,0.5-0.0625,0.2813-1.7812,0.2812c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312l-1.0625,0.9062-1.0625-0.125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.001,0.01-0.001,0.021,0,0.031l-1.1875,1.125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.75l-0.6875-0.094c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.71875,0.8437,0.0625-1.5c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.011,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0h-0.71875v-1.9687c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031l-1.125-1h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0h-1c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.8125,1-0.96875,0.062h-0.0312l-1-1.0313,0.8125-0.8437h0.0312l2.0312-0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0625-0.6563,4.9062-0.125c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0l0.9375-0.6875c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.0625-1.0312,1.9688-0.125c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.8438-0.031l0.875-0.9062,2.9062-0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0151-0.018,0.0259-0.04,0.0312-0.062,0.001-0.01,0.001-0.021,0-0.031v-0.5938l0.65625-0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0625-1.0312,1.9062,0.125c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.96875-1.0938,0.0312-0.031,1.1562-0.8437c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.1875-2.8438,1.7812-0.062-0.0937,0.8125c-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h3c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.28125-2.8437,5.5625,0.062-0.15625,0.75c-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l1.8125-0.062-0.0937,0.875c-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l2.0312-0.062-0.0625,0.9687c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l3.0625-0.125-0.15625,0.9375c-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l3.125-0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0151-0.018,0.0259-0.04,0.0312-0.062,0.001-0.01,0.001-0.021,0-0.031v-1.7812h0.78125c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.28125-1.8125,1.875-0.125c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0l1.0312-0.7813,1.1875-0.125c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0l0.875-0.8437h0.0312l0.84375-0.125c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.001-0.01,0.001-0.021,0-0.031l1.0625-1h0.0312c0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.0937-0.5,1.4375-0.125c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312l1.4375-1.3125c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-1.75,0.062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.40625,0.8437h-0.90625-0.625c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.40625,0.9688-1.7812,0.125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031l0.3125,0.5937-2,0.062,0.0937-0.8125c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-2,0.062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.6563l-1.7812-0.062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v1.0937h-3.75v-0.7812c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0h-0.875l0.21875-1c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031l-1-0.125v-0.5938c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0l-1,0.1563,0.25-3.1875c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-6.0938,0.1875,0.0625-1.625,3.1562-0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0151-0.018,0.0259-0.04,0.0312-0.062,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.005-0.023-0.0161-0.045-0.0312-0.062-0.009-0.012-0.0193-0.022-0.0312-0.031l-1.3125-1.0625c-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0h-1.8438v-1.8438c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-3.875-0.125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l0.0625,1.0313-3.7812-0.125,0.0937-0.875c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0l-1,0.094v-0.8125c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031h-0.0312l-1.1875-1.2188v-0.031l-0.0312-0.4375,2.1875,0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.125-2.3125c0.001-0.01,0.001-0.021,0-0.031-0.005-0.023-0.0161-0.044-0.0312-0.062-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312-0.8125l-1.1562-0.6875,0.84375-0.8125h0.0312l1.9688,0.125c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.9687l0.78125-0.094,0.40625,1.0625c0.009,0.012,0.0193,0.022,0.0312,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l2.375,0.125c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.21875-0.7813,0.78125-0.1562c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.001-0.01,0.001-0.021,0-0.031l1.0938-1.0313,1.0312,0.9375c0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031l1.6875,0.1875c0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-1.0937h3.9062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.1602-0.9109,1.0312,0.1562h0.0312,0.0312c0.0229,0,0.0445-0.016,0.0625-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0625-0.75v-1l0.75-0.1562c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0625-0.6875,0.6875-0.094c0.0229,0,0.0445-0.016,0.0625-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.1875-0.875c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.84375-1.125,1-0.7813c0.001-0.01,0.001-0.021,0-0.031l0.9375-0.9375h0.0312c0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0625-1.0625c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.9683-0.6263,0.625-1.1875c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.71875-1.0312v-0.9375c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-2,0.125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.001,0.01-0.001,0.021,0,0.031l-1.75,1.75-1.0312,0.2187-0.5-0.7187c-0.009-0.012-0.0193-0.023-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031l-1.25-0.3437v-0.6875l0.28125-0.094c0.001-0.01,0.001-0.021,0-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.28125-0.7188,2.7812-0.25c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.0937-0.6875h2.25,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.125-1.8437,1.4688-0.062h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.001-0.01,0.001-0.021,0-0.031l0.96875-0.9375h0.0312l4.7812-0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.9375l0.875,0.094,0.0625,1.0312c-0.001,0.01-0.001,0.021,0,0.031,0.005,0.023,0.0161,0.044,0.0312,0.062,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l4.1875,0.062h0.34375l1.9688,2.875c0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l1.3125-0.125c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.7812l0.9375,0.25c0.0104,0.001,0.0208,0.001,0.0312,0h0.5625l0.21875,0.875c0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0l2-0.25c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-1.1875c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-1.7812,0.062v-0.7188c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312l-1.0938-0.062,0.0625-2.5625v-0.031l0.0937-0.9062,0.875,0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.125-0.9688v-0.031l0.84375-0.875,0.875-0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.25-1.0625c-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.75-0.2187v-2.5l0.78125-0.8438,1.9688-0.25c0.0127-0.01,0.0238-0.021,0.0329-0.034,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.1875-1.8437h0.96875c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.75-1.0625c0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.875c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-2,0.062-0.78125-0.8438-0.0312-0.031-0.59375-1.7812v-0.062c-0.0104-0.001-0.0208-0.001-0.0312,0,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.018-0.015-0.0396-0.026-0.0625-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0-0.0229,0.01-0.0445,0.016-0.0625,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.062,3.4375l-1.125,0.125,0.0625-2.6875c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-0.78125-0.062,0.1875-3.8438c0.001-0.01,0.001-0.021,0-0.031-0.005-0.023-0.0161-0.044-0.0312-0.062-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031l-1.25-0.2187,0.0625-1.5c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-0.78125-0.4375v-0.625-0.6875l0.75-0.1563c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0625-1.0312,1.7806-0.8452c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l1.0312-1.8438,0.0312-0.031,1.2188-1.1562,0.875-0.125c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0l0.65625-0.4688,2.0625-0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.0625-0.4375c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-2.0625-0.062-0.875-0.8125-0.0312-0.031-0.53125-0.7187c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312l-1.1875-0.062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.9375,1.1875c-0.001,0.01-0.001,0.021,0,0.031l-0.375,0.7812-3.5625-0.062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-0.96875,0.8438-0.6875-0.8125c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0h-1.0312v-0.875-0.031l0.125-0.9063c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031l-1.125-0.2187-0.0625-0.031-0.75-0.5938v-1c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-1.1875,1.0625c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031l0.1875,0.875c0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312l0.78125,0.062-0.1875,1.625-1.0938,0.9375h-0.59375v-0.7187c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.875-0.1563,0.125-1.75c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-0.84375,0.062,0.125-1.9062c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0h-2.9375c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.21875,3.5937-0.71875-0.4375v-3.0312c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.90625-1.0313-0.0625-2.7187,1.4688-0.062,0.21875,1.8437v0.031c0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.031-0.031l-0.125-2.7812,1-0.125c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.001-0.01,0.001-0.021,0-0.031l1.0625-1.0625h0.0312c0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.625l0.4375,0.094c0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0l1.5-0.3125c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.8125-0.7188l0.75-0.4687c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.0625-0.3438,0.875-0.1562c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.6875l1.75-0.5313c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-1.6875c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.8125-0.2187v-1.6875c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.90625-1.0313,0.0625-0.5937,0.65625-0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.125-0.8125c0.001-0.01,0.001-0.021,0-0.031l0.125-1.1875,0.71875-0.8438,2.125,0.1875,0.84375,0.7813c0.018,0.015,0.0396,0.026,0.0625,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0229,0,0.0445-0.016,0.0625-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-1.0625c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-1.0625-1.125-0.8125-0.7813v-0.031l0.0625-0.9687c0.001-0.01,0.001-0.021,0-0.031l-0.25-1.875c-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.875,0.9375c-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.28125,0.9062-0.0312,0.031-0.65625,1.0938c-0.0151,0.018-0.0259,0.04-0.0312,0.062-0.001,0.01-0.001,0.021,0,0.031l-0.0625,1.7812-0.96875-0.062c-0.0104-0.001-0.0208-0.001-0.0312,0l-0.40625,0.031-0.0937-1.0625c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312-1.3125-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.875,0.9375h0.0312l-1.125,1.1875c-0.0104-0.001-0.0208-0.001-0.0312,0-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v1.0625c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031l1.1875,1-0.125,3.8125-0.84375,1-0.75-0.1875,0.0312-0.4062c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0,0.001-0.01,0.001-0.021,0-0.031l-1.0312-0.3438-0.125-1.6875,0.0625-1.875c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-0.59375-0.2187c-0.009-0.013-0.0202-0.025-0.033-0.035,0.001-0.01,0.001-0.021,0-0.031h-0.0312c0.001-0.01,0.001-0.021,0-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.25-0.062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.0312v0.031l0.0937,0.031-0.0937,0.9063-0.9375,0.7187c-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.875,1.375c-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.40625,1.875h-0.5625c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031l-1.3125,0.7188h-0.5625l-1.0312-0.7813v-0.7187-0.031l1.7812-1.8125,0.0312-0.031,1.0938-0.4062h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-1.5l0.96875-1.0937c0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.1875-1.25,0.53125-0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.011,0.001-0.021,0-0.031l0.125-1.5625,0.90625-1.0938c0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012,9.9182-4.7099-0.0312-0.031,0.001-0.01,7.9386-3.8958,7.9375-3.9062l-8.75,2.8125,1.0625-1.9062c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-1.4375,0.125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.001,0.01-0.001,0.021,0,0.031l-2.625,2.75-1.1875,0.125c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.001,0.01-0.001,0.021,0,0.031l-1.8438,1.875h-0.0312-0.78125-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.96875,1.1875-0.6875,0.062v-0.7188l0.90625-1.0312c0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.125-1.1875c-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-2.7812,0.125v-0.75-0.031l0.875-0.8438h0.0312l0.9375-1.0625,3.8125-0.062,1.375,0.8438c0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312,0.0312c0.0229,0,0.0445-0.016,0.0625-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.75-0.8125h0.9375c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.125-0.9063v-0.031l0.84375-0.9375,1.4375-0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0l1.3125-0.9062,0.96875,1.0625c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.6875-1.125c0.0151-0.018,0.0259-0.04,0.0312-0.062,0.001-0.01,0.001-0.021,0-0.031v-2.0625l1-0.75c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.0937-0.9063,0.96875,0.094c0.0104,0.001,0.0208,0.001,0.0312,0l2.125-0.125c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.0625-1.5,1.125-2.1562,2.5938-0.25h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.375-1.875c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312-1.1875-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031l-3,1.8125h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.15625,1.0937-1.5312-0.2187h-0.0312-0.0312c-0.0229,0.01-0.0445,0.016-0.0625,0.031l-1.8125,1.1563-0.90625-1.6563c0.001-0.01,0.001-0.021,0-0.031l-1.25-1.4375,3.625-0.6875h0.0312c0.0121-0.01,0.0228-0.02,0.0315-0.033h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031-0.018-0.015-0.0396-0.026-0.0625-0.031h-0.0312-0.0312l-3.625,0.062-0.125-1c-0.009-0.012-0.0194-0.023-0.0313-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312l-0.8125,0.062-1.0312-0.7813,0.0625-0.7187,1.4375-0.062v0.7812c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312,1.1875l2.125-0.125h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.0937-0.5,1.875,0.062h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.5c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031l-1.0312-0.125h-0.0312l-1-0.7188h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312-0.78125v-0.6563l0.78125-0.9062h1.8438,0.0312l1.0938,1.0625c-0.001,0.01-0.001,0.021,0,0.031h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312,1.25,0.0312c0.012-0.01,0.0228-0.019,0.0317-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031h-0.0312l-2.0625-2.125-0.15625-0.75,0.5625-0.062,1.2812,1.0937h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312,1,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0625-1.0625c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312l-1.1562-0.062v-0.8125l2.7812,0.25h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.375-1.3125c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031-0.018-0.015-0.0396-0.026-0.0625-0.031h-0.0312-0.0312l-2.0938,0.2187-0.15625-0.9687c-0.009-0.012-0.0192-0.023-0.031-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.625-0.1563v-0.4062h2.0312,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0625-1c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312l-1.25,0.062-1.5625-0.062,0.53125-0.4688c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031h-0.0312l-0.875-0.9375,1.1562-1,1.5938-0.125v0.6562c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031l1,0.25h0.0312,0.0312c0.0229-0.01,0.0445-0.016,0.0625-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0625-1.25c0.001-0.01,0.001-0.021,0-0.031-0.005-0.023-0.0161-0.045-0.0312-0.062-0.009-0.012-0.0193-0.023-0.0312-0.031l-1.1875-0.8125-1.125-0.7187v-0.9688l1.1875-0.2812c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-2.5312h1.9062,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031l0.75-0.875-0.0937,1.7187c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031l1,0.125h0.0312,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031l0.71875-1.0625,0.96875,0.75,0.0312,0.031,2.1562,2.4688c0.009,0.012,0.0193,0.022,0.0312,0.031,0.018,0.015,0.0396,0.026,0.0625,0.031h0.0312,0.0312c0.0229-0.01,0.0445-0.016,0.0625-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-1.125c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031l-1-0.75,0.25-2.625c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.008-0.012-0.0187-0.022-0.0302-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312-0.0312l-1.125,0.2812,0.0625-1.5937,1.6562,0.125h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-1.75c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.9375-0.2188v-0.8125l1-0.25v1.1875c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312l4.0312-0.3125h0.0312,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312l-2.1562-0.5938v-0.8437l1.0938-1.0313,0.84375,0.6875h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.001-0.01,0.001-0.021,0-0.031l1.0625-1.0625h0.0312c0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.625c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.9375-0.2813v-0.625l1.6562-1.8125zm20.031,107.66,0.625,0,0,0.125-0.625,0zm6.0625,2.0625,0.125,0,0,0.125c-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031z").attr(attr);
            eur.gb1 = R.path("m334.52,225.34,2.1145,1.9454,0.93038,0.7612-1.1418,0.4229-0.84579,0.5497-2.1568,0.042-1.0995-1.2264,0.42289-0.7612-0.16916-0.8458z").attr(attr);
            eur.gb2 = R.path("m311.79,161.7-2.5312,0.062h-0.0312-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.0625,0.75-0.6875,0.125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.0312,1.25c-0.001,0.01-0.001,0.021,0,0.031l0.125,0.8125c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l0.59375,0.062,0.3125,2.0937c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031h0.0312l1.1562,1c-0.001,0.01-0.001,0.021,0,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.46875-0.875,2.8438-0.2812c0.0104,0.001,0.0208,0.001,0.0312,0l0.625-0.25c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0151-0.018,0.0259-0.04,0.0312-0.062l0.15625-0.7813c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.43715-1.187c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312-0.0312-1.4688l-0.0312-1.375c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031l-1-1.4062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.023-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031z").attr(attr);
            eur.gb3 = R.path("m357.54,57.291c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.53125,1.1563-0.6875-0.094h-0.0312-0.0312c-0.0229,0.01-0.0445,0.016-0.0625,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.0312,2.8125-1.625-0.062h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031l0.0625,1.375c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031l0.71875,0.25v0.875c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l0.84375,0.9375h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312,0.0312l1.625,0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0312-1.5938,0.375-0.5312,0.46875,0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0151-0.018,0.0259-0.04,0.0312-0.062l0.0942-0.5625,0.5625-0.094h0.0312l0.46875,0.1875,0.34375,0.4062v0.9375c0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.018,0.015,0.0396,0.026,0.0625,0.031l2.9688-0.062c0.012-0.01,0.0226-0.019,0.0315-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0151-0.018,0.0259-0.04,0.0312-0.062,0.001-0.01,0.001-0.021,0-0.031l-0.15625-1c-0.005-0.023-0.0161-0.045-0.0312-0.062-0.009-0.012-0.0193-0.023-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.6875-0.094-0.125-0.7812c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031h-0.0312l-0.9377-0.4062-0.21875-0.7813c-0.005-0.023-0.0161-0.044-0.0312-0.062l-0.5625-0.4687-0.0625-1.3125c0.001-0.01,0.001-0.021,0-0.031-0.005-0.023-0.0161-0.044-0.0312-0.062h-0.0312l-1-0.75c-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312l-2-0.2813h-0.0312-0.0312-0.0312z").attr(attr);
            eur.gb5 = R.path("m323.48,59.697-1.3438,0.0312h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031v1h-1.625-0.0312-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031v0.9063l-3.5938-0.125h-0.0312-0.0312c-0.0229,0.01-0.0445,0.016-0.0625,0.031-0.0151,0.018-0.0259,0.04-0.0312,0.062-0.001,0.01-0.001,0.021,0,0.031l-0.25,1.875-1.5625-0.3125v-0.7188c-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.96945-0.8125h-0.0312c-0.009-0.012-0.0193-0.023-0.0312-0.031h-0.0312-0.0312-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.84375,0.9063c-0.001,0.01-0.001,0.021,0,0.031h-0.0312l-0.4375,0.9375h-0.65625-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.25,1.9688c-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.009,0.012,0.0193,0.023,0.0312,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312,0.0312,1v0.125l-1.7188,0.5938c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.023,0.0312,0.031l0.75,1.0312v0.031l0.125,1.0312c0.009,0.012,0.0193,0.023,0.0312,0.031,0.005,0.023,0.0161,0.044,0.0312,0.062h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312,0.375l-1.4062,0.75-0.5315-0.9375-0.0312-0.094c-0.009-0.012-0.0193-0.023-0.0312-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312-0.0312-0.0312c-0.0229,0.01-0.0445,0.016-0.0625,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.0312,0.9375c-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031l0.8746,1.1875c-0.001,0.01-0.001,0.021,0,0.031l0.9375,0.9792c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312,0.0312,0.0312,0.0312,0.0312c0.012-0.01,0.0227-0.019,0.0315-0.031l0.96875-0.9687,1.1875-0.875,0.8125,0.062h0.0312,0.0312,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031v-2.3438l0.65625-0.5312,0.0625,1.7187-0.0312,0.8438c-0.001,0.01-0.001,0.021,0,0.031,0.005,0.023,0.0161,0.044,0.0312,0.062,0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312c0.018,0.015,0.0396,0.026,0.0625,0.031l2-0.094c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0319-0.6875h0.0312,0.0312l0.875-0.094h0.0625,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.005-0.023-0.0161-0.045-0.0312-0.062-0.009-0.012-0.0193-0.023-0.0312-0.031h-0.0312l-0.0625-0.031h-0.0312l-0.75-0.25-0.0312-1.2813h0.9375l0.34375,0.125v1c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312,0.4375,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.0625-2.125,0.6875,0.094h0.0312,0.0312,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031l0.125-0.875,0.90625-0.062h0.0312c0.0229-0.01,0.0445-0.016,0.0625-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.875l1.5625,0.094h0.0312c0.0229-0.01,0.0445-0.016,0.0625-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0635-4.4063c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312-0.0312z").attr(attr);
            eur.gb6 = R.path("m308.63,71.697-4.1562,0.062h-0.0312-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.0312,4.1563-0.9375,0.7187c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.0312,2.2187-0.96875,0.7813c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031l0.125,2.0625c-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312l2.125-0.094h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0937-1.8125,0.8125-0.8125c0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0312-1.125v-0.031l0.78125-1.0625c0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0937-0.9063,0.8125-0.8125,1.0625-0.094h0.0312,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031v-0.9688l0.90625-0.875c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0151-0.018,0.0259-0.04,0.0312-0.062,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.019-0.023-0.0307-0.031l-0.875-1.2187h-0.0312c-0.009-0.012-0.0193-0.023-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031z").attr(attr);
            eur.gb7 = R.path("m309.66,92.759-1.25,0.1562c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312l-0.75,0.5-0.78125-0.031h-0.0312-0.0312c-0.0229,0.01-0.0445,0.016-0.0625,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.1875,0.9375-2.8125,0.125h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031l-1.5,0.8125c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.023,0.0312,0.031l0.125,0.6562c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031h2.5312,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.5313c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031l-0.15625-0.1562,2.9062-0.1563h0.0312,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031l0.78125-0.9688,1.125,0.094h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031v-1.3437c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312-0.0312-0.0312z").attr(attr);
            eur.gb8 = R.path("m310.1,95.572c-0.001,0.01-0.001,0.021,0,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l0.28125,3.875-0.84375,1-2.1562,0.1563h-0.0312-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.3125,0.75c-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031l1.2812,0.5937c0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312l4.25,0.094,1.875,0.875c0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312l1.125-1.0313h0.0312l1.1564-1.5592c0.001-0.011,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.8751-0.4691-0.0625-1.1563c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.005-0.023-0.0161-0.044-0.0312-0.062h-0.0312l-1.9062-1.2187h-0.0312l-0.8125-0.3125-0.0625-1.5c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0196-0.023-0.0315-0.031l-2.7188-0.031h-0.0312-0.0312z").attr(attr);
            eur.gb9 = R.path("m295.45,119.88-1.875,0.125h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-1.125,0.9375c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.0625,0.9062-0.84375,0.6875-0.59375-0.6562v-1.1875c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312l-2.0625,0.125h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-1.125,1c-0.001,0.01-0.001,0.021,0,0.031l-1.0625,1c-0.0104-0.001-0.0208-0.001-0.0312,0-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v1l-1.7188,1.8437h-0.96875-0.0312l-1.0312-1c0.001-0.01,0.001-0.021,0-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-2.0625,0.1875c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031l0.25,0.875c0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l0.78125,0.4375,0.125,1.4063-5.0312-0.062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.875,1.0625c-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l0.0625,0.8125c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l0.78125,1.1562v0.9375c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031l1.1562,0.7813,0.0312,0.031,0.6875,0.9375v1.0625c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l2.0625,1.9375c-0.001,0.01-0.001,0.021,0,0.031,0.018,0.015,0.0396,0.026,0.0625,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l1.125-0.062,0.8125,1.0625c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l3.1875-0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.001-0.01,0.001-0.021,0-0.031l0.875-0.875c0.0104,0.001,0.0208,0.001,0.0312,0,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.15625-0.75,1.0312-1.1563,0.0312-0.031,0.9375-0.7187,0.84375,0.875v0.031l0.125,4.0312c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031l1.3125,1.0625-0.375,2.4063c-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.005,0.023,0.0161,0.044,0.0312,0.062,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l3.6875,0.1875,1,0.7187-1.0938,0.8125c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h1.125c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0l0.78125-0.75,0.90625,0.9063c-0.001,0.01-0.001,0.021,0,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h0.9375c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0l1.3125-1.125c0.0119-0.01,0.0224-0.019,0.0312-0.031l0.75-1c0.001-0.01,0.001-0.021,0-0.031l0.34375-0.8438,1.5-0.125h0.0312l1.0938,1.0625c-0.001,0.01-0.001,0.021,0,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.001-0.01,0.001-0.021,0-0.031l1.875-1.8125,0.9375-0.1875c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0104,0.001,0.0208,0.001,0.0312,0l0.3125-0.875c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.4375-3.1875c-0.009-0.011-0.0188-0.021-0.0301-0.03l-0.5-0.875c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.018-0.015-0.0396-0.026-0.0625-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-1.0938-0.125-0.1875-1.5c-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.53125,0.5625-0.84375-0.8437,0.46875-0.7188h0.90625l0.0937,0.8125c0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031l0.0625,0.062,2.875,1.75c0.018,0.015,0.0396,0.026,0.0625,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.875c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.90625-0.8437-0.0312-0.031-0.875-0.9688,0.875-0.7187c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-1.125c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-0.8125,0.062-0.0937-0.9375c-0.009-0.012-0.0196-0.023-0.0317-0.032l-0.65625-1.125v-0.8125c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-0.71875-0.062-0.0625-1.5938,0.875-0.8125c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.25-2.4375c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.75-0.6875h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-1.9375-0.1875-1.1562-0.9062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0h-4.0312-0.0312l-0.90625-0.9375c0.001-0.01,0.001-0.021,0-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0z").attr(attr);
            eur.gb100 = R.path("m390.45,33.572c-0.001,0.01-0.001,0.021,0,0.031h-0.0312l-0.9375,0.9063h-0.8125-0.0312-0.0312c-0.0229,0.01-0.0445,0.016-0.0625,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.6875l-4,0.1875h-0.0312-0.0312l-0.125,0.062h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0151,0.018-0.0259,0.04-0.0312,0.062-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031l0.0312,0.6563-1.7812,0.094h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0151,0.018-0.0259,0.04-0.0312,0.062-0.001,0.01-0.001,0.021,0,0.031l-0.125,2.2812c-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.018,0.015,0.0396,0.026,0.0625,0.031h0.0312,0.0312,0.0312,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031l1.2812-1.1875h0.625l-0.0937,0.875-0.75,0.9375c-0.0151,0.018-0.0259,0.04-0.0312,0.062-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.005,0.023,0.0161,0.044,0.0312,0.062l0.78125,0.75-0.84375,0.875-0.71875-0.9688c-0.005-0.023-0.0161-0.044-0.0312-0.062h-0.0312-0.0312-0.0312l-2.3438,0.125h-0.0312-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031l0.25,1.0938c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031l1.1875,0.6875-0.25,1.0938c-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312,0.0312l0.84375-0.031v0.75c0.005,0.023,0.0158,0.044,0.0308,0.062-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.018,0.015,0.0396,0.026,0.0625,0.031l0.71875,0.1562v2.375l-0.5625,0.094h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312l-1.1564,1.1563c-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l1.0625,0.9688c0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312,0.0312,0.0312,0.0312,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031l0.96875-1.0625c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.0625-0.7812h0.78125,0.0312c0.0229-0.01,0.0445-0.016,0.0625-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031v-1.75l0.9375-0.2187c0.0229-0.01,0.0445-0.016,0.0625-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.1875-1.7188h0.625c0.0229-0.01,0.0445-0.016,0.0625-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0151-0.018,0.0259-0.04,0.0312-0.062,0.001-0.01,0.001-0.021,0-0.031l0.0625-0.75,0.8125-0.25c0.0122-0.01,0.023-0.019,0.0321-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.125-1.0625c0.0119-0.01,0.0224-0.019,0.0312-0.031l0.0625-1.6562,0.4375-0.1875c0.0229-0.01,0.0445-0.016,0.0625-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031l0.28125-2.7813,0.4375-0.9375h1.2188l-0.0937,0.7188c-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312,0.0312,0.71875,0.5,0.0312,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.125-1.75,1-0.9375,0.0937-0.062h0.0312c0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.005-0.023-0.0161-0.045-0.0312-0.062-0.009-0.012-0.0193-0.023-0.0312-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312-0.0312-2.125-0.0312-0.0312z").attr(attr);
            eur.ie = R.path("m285.57,114.76c-0.001,0.01-0.001,0.021,0,0.031l-1.2188,0.5937-0.625-0.4062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312-1.0625-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-0.90625,0.8125-1.0938-0.8125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312l-1.75,0.062h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l-1,1.9375-0.78125-0.1563c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.28125,0.9375-0.0312,0.062-0.71875,0.9375-1.8125,1.8125h-0.0312l-3.2188,0.125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v1.875c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l1,1.125c0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l1.875,0.125,0.21875,0.9375c0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h2.5938l-0.4375,1.625-1.5938,0.9375-1.6875-0.9687c-0.009-0.012-0.0193-0.023-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031l-2.0312,1.0312-1,0.125c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v0.875c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l0.84375,1-0.65625,0.4063-1.0312-0.6875c-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.8125-0.1875-2.0625-1.9375c0.001-0.01,0.001-0.021,0-0.031-0.018-0.015-0.0396-0.026-0.0625-0.031h-0.0312-0.875-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.84375,1.125-1-0.9375v-1.1562c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031l-1-0.75c-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-1.9062-0.1875h-0.0312l-0.90625-0.9375-1.0625-1c0.001-0.01,0.001-0.021,0-0.031-0.018-0.015-0.0396-0.026-0.0625-0.031-0.0104-0.001-0.0208-0.001-0.0312,0h-5.125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v1.1875l-0.71875,0.7813c-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.0625,1.0625c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l0.875,0.9375c0.009,0.012,0.0193,0.022,0.0312,0.031l1.1875,1.0625-0.125,1.5937-1.5625,0.062-0.0625-1.8437c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.023-0.0312-0.031l-0.875-0.8125c-0.018-0.015-0.0396-0.026-0.0625-0.031-0.0104-0.0009-0.0208-0.0009-0.0312,0l-3.25-0.062c-0.0104-0.0009-0.0208-0.0009-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.011-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.011-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031l1.125,1c0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.023,0.0312,0.031h0.0312,0.9375l0.84375,0.9062,0.0625,0.8125c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l0.8125,0.9375c0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l2.1562,0.1875,1.8438,1.9063-0.96875,0.9687-1.5625-0.4375-0.4707-0.8416c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0l-0.9375,0.125c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.75,1c-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.28125,1.75-3.625,0.125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.125,1.0313v0.031l-0.96875,1.0625c-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l0.0625,0.9375c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031l0.9375,0.875c0.018,0.015,0.0396,0.026,0.0625,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l1.8438,0.062,0.125,1.8437c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312,1.7812v1.7813c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031l2.125,1.9375c0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l4.9688-0.062,0.84375,0.9062-1.0312,1.0938-4.0938-0.25c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.75,0.875-1.125,0.062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0229,0.01-0.0445,0.016-0.0625,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.9375,1.125c-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031v2.1875l-1.5938,1.7812h-2.125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-0.96875,0.8438-2.8125,0.062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0151,0.018-0.0259,0.04-0.0312,0.062l-0.1875,0.75c-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.005,0.023,0.0161,0.044,0.0312,0.062,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312l2,0.062,1.0312,0.9062c0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.001-0.01,0.001-0.021,0-0.031l0.9375-0.9375,0.75,0.2188,0.0625,0.031,1.875,1.7187c0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312l2.3125-0.1875h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0l1.7812-1.6562,0.96875-0.062v1.5937c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l1.9062,0.125v0.8438l-1.0625,0.125v-0.625c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-5.9375-0.062-2.625-0.062-1.4062-0.9688c-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-0.90625,0.8438h-3.625c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031l0.84375,1.9062-0.875,0.9375-1.8125-0.1875-0.34375-0.7187c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312l-1.75-1c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031l-1.3125,0.7812h-1.5625c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.8125,1c-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031l1.1875,1.0625,1.625,1.0625c0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h1.9062,0.0312l0.84375,0.875-0.90625,0.5625-4.125,0.3125h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.875,0.9375-0.875-0.062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l0.0625,1.875c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h1.7188l0.0625,1.8438c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h7.0625l-0.125,0.062-2.5625,0.125c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0229,0-0.0445,0.016-0.0625,0.031l-0.53125,0.4687-2.4375,0.1875h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031l-1.25,0.7188-0.8125,0.062h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.1875,1.125c-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h5.3125l1.2812,0.125h0.0312l0.59375,0.625c-0.001,0.01-0.001,0.021,0,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312l0.96875-0.8438h0.59375l0.0937,1-1.7812-0.125-1.0938-0.062c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-1.0938,0.8438h-1.9375c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031l-0.125,1.9375c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l4.8438,0.062v0.9062c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031l1.25,1.0625c0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l1.9375-0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0l0.90625-0.6875,0.96875,0.625c0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0h2.9062l0.84375,1.25c0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312l1.3125-0.9687,0.65625,0.9375c0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.1875-1.2188v-0.031l0.5625-0.8125,2.8438-0.125c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0l1.3125-0.8125c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031l-1.2188-1,0.125-0.7187,1.0312,0.7187c0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031l0.6875,0.094-0.1875,1.6875c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0l2.3125,0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.01-0.0187-0.019-0.0297-0.027l-0.375-0.6562,2-0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.15625-0.6875h1.5312l-0.0625,0.7187c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312l2-0.125h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031l0.15625-0.7187,0.84375-0.1563c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.7187l4.625-0.1875-0.0625,1.0937c-0.001,0.01-0.001,0.021,0,0.031,0.005,0.023,0.0161,0.044,0.0312,0.062,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312l3.25-0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0151-0.018,0.0259-0.04,0.0312-0.062,0.001-0.01,0.001-0.021,0-0.031l-0.0625-1.6875,0.53125-0.062,0.0937,0.5938c0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0-0.001,0.01-0.001,0.021,0,0.031l0.65625,0.2187v0.6875c-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031l1.125,0.8125c0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031l1.9688,0.375h0.0312l0.875,0.8438c0.018,0.015,0.0396,0.026,0.0625,0.031l1.125,0.1875h0.0312,0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.001-0.01,0.001-0.021,0-0.031l1-1c0.0104,0.001,0.0208,0.001,0.0312,0,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-0.9375-1,1-0.8438c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.75l1.125-0.1562c0.0229,0,0.0445-0.016,0.0625-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031v-0.8438l1.5-0.9687c0.0119-0.01,0.0224-0.019,0.0312-0.031l1.25-1.375c0.001-0.01,0.001-0.021,0-0.031l0.75-1.875,0.90625-1.8125,1.125-0.9375c0.0119-0.01,0.0224-0.019,0.0312-0.031l0.9375-1,1.0625-1.1875c0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0625-5.875c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031l-1.0938-1,0.96875-0.8438,0.90625,1.125c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.0625-3.2187,1.1562,0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0229,0,0.0445-0.016,0.0625-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.25-2.1875c-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-1.0625-0.625,0.40625-1.6563,0.53125-1.0937c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.0625-2.375c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.59375-0.6875,0.125-1.0313v-0.031l1.284-1.5959c0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-3.25-0.125,0.34375-2.3437c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l-1.3438-1.0938-0.15625-3.9375c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l-1.0312-1.0625c-0.018-0.015-0.0396-0.026-0.0625-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031l-1.0312,0.75c-0.0104-0.001-0.0208-0.001-0.0312,0l-1.1562,1.3125c-0.012,0.01-0.0228,0.019-0.0318,0.03-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031l0.25,0.6875-0.8125,0.8125h-0.0312l-3.0312,0.062-0.84375-1.0937c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.018-0.015-0.0396-0.026-0.0625-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-1.0625,0.094-2.0312-1.875v-1.0625c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.71875-1c-0.009-0.012-0.0193-0.022-0.0312-0.031l-1.1562-0.8125v-1c0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.78125-1.0625-0.0312-0.625,0.75-1.0313,5.1875,0.062c0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0151-0.018,0.0259-0.04,0.0312-0.062,0.001-0.01,0.001-0.021,0-0.031l-0.15625-1.625c-0.005-0.023-0.0161-0.044-0.0312-0.062-0.009-0.012-0.0193-0.022-0.0312-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.8125-0.4687-0.15625-0.625,1.75-0.2188,1.0625,1.0625c-0.001,0.01-0.001,0.021,0,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312,1.125,0.0312,0.0312c0.0229-0.01,0.0445-0.016,0.0625-0.031l1.5625-1.6875h0.0312c0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0937-1.1562,2.1562-2.0938,1.7188-0.1562h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0104,0.001,0.0208,0.001,0.0312,0l0.0625-0.031h0.0312l0.1875-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031,0.001-0.01,0.001-0.021,0-0.031l0.9375-0.6563,1.8438,0.125c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0l0.8125-0.6875c0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l-0.0625-1.1875c0.001-0.01,0.001-0.021,0-0.031-0.005-0.023-0.0161-0.044-0.0312-0.062l-1.0625-1.1875c-0.009-0.012-0.0193-0.022-0.0312-0.031l-0.96875-0.8437-0.0312-0.031-0.78125-1.0938c-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-1.0625,0.062h-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312c-0.001,0.01-0.001,0.021,0,0.031l-0.90625,0.9375h-0.0312-0.75-0.0312l-0.90625-0.9375c0.001-0.01,0.001-0.021,0-0.031h-0.0312c-0.009-0.012-0.0193-0.022-0.0312-0.031h-0.0312-0.0312c-0.0119,0.01-0.0224,0.019-0.0312,0.031h-0.0312l-1.0625,0.9688-0.71875-1c-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0-0.0104-0.001-0.0208-0.001-0.0312,0z").attr(attr);
            eur.ie1 = R.path("m316.41,143.76c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031l-1,1.3125-1.0312,0.5312c-0.0104-0.001-0.0208-0.001-0.0312,0-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.90625,1.25-0.6875,0.7188c-0.0104-0.001-0.0208-0.001-0.0312,0-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031l-0.0312,0.125-1.375,1.0625c-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.0119,0.01-0.0224,0.019-0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031-0.001,0.01-0.001,0.021,0,0.031,0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031l1.125,0.1562,0.78095,0.8785c0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312c0.009,0.012,0.0193,0.022,0.0312,0.031h0.0312l1.2812,0.031c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031h0.0312c0.0119-0.01,0.0224-0.019,0.0312-0.031l0.875-0.9687h0.90625c0.0104,0.001,0.0208,0.001,0.0312,0,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.0104,0.001,0.0208,0.001,0.0312,0,0.001-0.011,0.001-0.021,0-0.031l2-1.9688c0.0104,0.001,0.0208,0.001,0.0312,0,0.001-0.01,0.001-0.021,0-0.031,0.0119-0.01,0.0224-0.019,0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031l0.0937-3.1875c0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031,0.001-0.01,0.001-0.021,0-0.031-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0-0.009-0.012-0.0193-0.022-0.0312-0.031-0.0104-0.001-0.0208-0.001-0.0312,0l-2.0938-0.062h-0.0312z").attr(attr);
            eur.ad = R.path("m 332.71269,393.60812 -0.95802,0.71416 -0.2787,0.52256 -0.17418,0.2787 -0.0697,0.41804 0.0697,0.40063 -0.0174,0.53998 -0.0348,0.40063 0.2787,0.40062 0.78384,0.5574 1.09737,0.41804 0.29611,-0.0697 0.40063,-0.1916 1.34123,-0.36579 0.38321,-0.26128 0.50514,-0.71417 0.0523,-0.749 -0.40063,-0.64448 -1.16705,-0.69675 -0.36579,-0.48772 -0.64448,-0.41805 z").attr(attr);



            //eur.path3083 = R.path("m344.16,228.27c0.40867,0.2476,0.86565,0.3743,1.3273,0.4788,0.55836,0.1149,1.1263,0.1712,1.6949,0.2013,0,0-0.73146,0.5238-0.73146,0.5238-0.56502-0.049-1.1282-0.1183-1.6854-0.2252-0.17793-0.042-0.42307-0.097-0.59738-0.1507-0.26881-0.083-0.52428-0.2047-0.77765-0.3255,0,0,0.76966-0.5025,0.76966-0.5025z").attr(attr);
            //eur.path3085 = R.path("m347.67,229.44c-0.0268,0.4181,0.005,0.8365,0.041,1.2531,0.0664,0.5668,0.0717,1.1395,0.15465,1.7046,0.0207,0.1409,0.0499,0.2805,0.0749,0.4207,0.10077,0.4784,0.21115,0.9637,0.41811,1.4098,0.11614,0.2504,0.1703,0.3089,0.32464,0.532,0.11037,0.1305,0.23298,0.2944,0.37677,0.3944,0.41279,0.2867,0.94496,0.3234,1.4254,0.3802,0.20945,0.014,0.41852,0.036,0.62836,0.042,1.6854,0.05,3.407-0.068,5.0817-0.247,0.47308-0.051,0.94488-0.1125,1.4173-0.1688,1.7696-0.2126,3.5243-0.5608,5.2317-1.075,0.92717-0.2792,1.1626-0.3854,2.0353-0.7178,0.27867-0.137,0.56454-0.2601,0.83603-0.4108,0.0296-0.016,0.0314-0.061,0.0563-0.084,0.51606-0.4776,0.64535-0.4792,1.0356-1.0555,0.31405-0.4638,0.39184-0.7502,0.58898-1.2627,0.24411-0.767,0.35457-1.5664,0.35487-2.3702,0.00008-0.2097,0.00005-0.42-0.0195-0.6288-0.0227-0.2421-0.0713-0.4811-0.10696-0.7216-0.23262-0.9998-0.60243-1.9738-1.1436-2.8492-0.35344-0.5717-0.47354-0.6799-0.89887-1.1904-0.55591-0.6309-1.2067-1.1723-1.9278-1.6048-0.42782-0.2566-0.6085-0.3286-1.0563-0.54-0.70506-0.32-1.4484-0.5479-2.2102-0.6851-0.51042-0.092-0.73335-0.105-1.252-0.1588-1.0243-0.088-2.0605-0.058-3.0818,0.058-0.78035,0.088-1.1916,0.1737-1.9684,0.311-1.4711,0.2813-2.9248,0.6626-4.3416,1.1494-0.90713,0.3116-1.401,0.52-2.2839,0.8714-0.49734,0.241-1.4677,0.6837-1.9349,1.0131-0.0952,0.067-0.13257,0.1931-0.21435,0.2761-0.23798,0.2415-0.50351,0.4547-0.74266,0.695-0.59092,0.5939-0.61294,0.6696-1.1008,1.3224-0.12616,0.2214-0.27061,0.4334-0.37847,0.6642-0.49721,1.0644-0.63185,2.2494-0.7122,3.4059-0.023,0.6745,0.0211,1.3486,0.21896,1.9966,0.0383,0.1253,0.0771,0.2511,0.13064,0.3706,0.0518,0.1155,0.1229,0.2213,0.18434,0.3319,0.33365,0.5016,0.81186,0.8581,1.3664,1.0861,0.15618,0.064,0.31829,0.113,0.47744,0.1694,1.4122,0.3795,2.8862,0.4106,4.3391,0.4508,1.0191,0.017,2.0462,0.035,3.0523-0.1501,0.0784-0.022,0.15672-0.044,0.23508-0.066,0,0-0.70685,0.5411-0.70685,0.5411-0.0776,0.018-0.15521,0.036-0.23281,0.054-0.98636,0.1427-1.9859,0.1015-2.9791,0.076-1.4731-0.045-2.9654-0.067-4.4008-0.4377-0.16481-0.056-0.33246-0.1048-0.49442-0.1687-0.59229-0.234-1.0625-0.5848-1.4035-1.1264-0.0634-0.1153-0.13785-0.2253-0.19017-0.3461-0.0531-0.1226-0.0878-0.2525-0.12479-0.3809-0.19507-0.6765-0.22869-1.3337-0.20481-2.035,0.0744-0.9264,0.17665-1.7971,0.45508-2.6908,0.0802-0.2572,0.15989-0.5162,0.27187-0.7613,0.10805-0.2365,0.25714-0.452,0.38571-0.6781,0.52261-0.6986,0.49446-0.7102,1.1295-1.3487,0.24123-0.2425,0.47584-0.4949,0.74625-0.7045,1.0452-0.8098,2.1761-1.4664,3.3838-1.9965,0.84155-0.3297,1.4164-0.5645,2.2784-0.8614,1.4299-0.4927,2.8952-0.8848,4.381-1.1672,0.60699-0.1072,1.3872-0.2541,2.0005-0.3262,0.27758-0.033,0.55691-0.049,0.83583-0.066,0.75971-0.048,1.5266-0.087,2.2853,0,0.53831,0.056,0.73354,0.066,1.2626,0.1618,0.76712,0.1396,1.5189,0.3662,2.2249,0.6988,0.43115,0.2085,0.64711,0.3005,1.0593,0.5513,0.72161,0.439,1.3768,0.9904,1.9184,1.6389,0.43883,0.5352,0.53026,0.6116,0.89987,1.2062,0.13698,0.2203,0.2692,0.4443,0.38437,0.6768,0.10988,0.2219,0.19847,0.4538,0.28966,0.6839,0.31104,0.7852,0.26526,0.7022,0.49032,1.5086,0.0431,0.2406,0.102,0.4788,0.12917,0.7217,0.0234,0.2097,0.0199,0.4216,0.0223,0.6325,0.002,0.2093,0.005,0.419-0.008,0.6279-0.0368,0.6022-0.16376,1.1982-0.34482,1.7722-0.18507,0.485-0.29443,0.8487-0.58478,1.2888-0.75408,1.1432-2.0501,1.7561-3.2472,2.3218-0.84737,0.3104-1.0976,0.4167-1.9973,0.6801-1.7029,0.4985-3.4494,0.8433-5.2116,1.0472-0.99405,0.1152-1.8733,0.225-2.872,0.3088-0.94094,0.079-1.7044,0.1118-2.642,0.1488-0.37201,0.015-0.74396,0.036-1.1163,0.038-0.21833,0.001-0.43622-0.019-0.65433-0.029-0.50942-0.053-1.0614-0.089-1.494-0.4016-0.13194-0.095-0.27977-0.2937-0.37908-0.4152-0.14758-0.2192-0.21975-0.3071-0.3303-0.5518-0.20415-0.4519-0.31201-0.9495-0.4094-1.4327-0.0276-0.1409-0.0597-0.281-0.0829-0.4227-0.092-0.5611-0.10648-1.1321-0.17576-1.6959-0.0446-0.4123-0.0725-0.8258-0.0849-1.2404,0,0,0.8262-0.4209,0.8262-0.4209z").attr(attr);
            //eur.path3087 = R.path("m339.28,231.02c0.0334,0.016,0.0654,0.035,0.10009,0.048,0.0445,0.016,0.43265,0.1328,0.45216,0.1386,0.34877,0.1037,0.6995,0.193,1.0531,0.2786,1.191,0.2637,2.4007,0.4341,3.6137,0.5552,0.82547,0.076,1.654,0.1104,2.4826,0.1213,0.31486,0.0009,1.1484,0-0.33416,0.0002-0.0472-0.0001,0.0944-0.0003,0.14157-0.0006,0.075-0.0005,0.15856,0,0.23396,0,0.0346-0.0003,0.0692-0.0005,0.1038-0.0007,0,0,0.90585,0.1429,0.90585,0.1429-0.035,0.0002-0.07,0.0003-0.10499,0.0005-0.60697,0-1.214,0.01-1.8209,0-0.80601-0.018-1.6116-0.06-2.414-0.1389-1.2269-0.1261-2.4487-0.3084-3.6563-0.5607-0.36278-0.087-0.72378-0.176-1.0823-0.2793-0.11085-0.032-0.36783-0.1061-0.48303-0.1481-0.0378-0.014-0.0733-0.033-0.10989-0.049,0,0,0.91875-0.1021,0.91875-0.1021z").attr(attr);
            //eur.path3089 = R.path("m347.37,232.18h-1.0651c-0.10426-0.0002-0.20852-0.0005-0.31279-0.0006-0.10447-0.0001-0.20895,0.0002-0.31342,0.0001-0.12408-0.0002-0.48554-0.052-0.37224-0.001,0.12118,0.054,0.52554-0.024,0.39795,0.013-0.16344,0.047-0.33975,0.013-0.50964,0.019-0.18906,0.01-0.37814,0.014-0.56721,0.02-1.2925,0.041-2.5856,0.056-3.8787,0.065-1.2581,0.01-2.5163,0.01-3.7745,0.01-0.25801,0.0001-0.51602,0.001-0.77403,0-0.0604,0.0001-0.24165-0.0004-0.18124,0.0003,0.75868,0.01,0.97299-0.016,0.55528,0.021-0.32925,0.034-0.65429,0.1003-0.97861,0.1653-0.27022,0.067-0.54273,0.1206-0.81665,0.1692-0.0938,0.018-0.18756,0.036-0.28114,0.054,0,0-0.91086-0.1238-0.91086-0.1238,0.0944-0.023,0.18938-0.04,0.28508-0.057,0.27566-0.054,0.55576-0.088,0.82659-0.1664,0.32503-0.068,0.65175-0.1329,0.98141-0.1739,0.71265-0.085,1.437-0.01,2.1532-0.027-0.16895,0.0003-0.33795,0-0.50685,0.001-0.13877,0,0.27761,0.0009,0.41642,0.001,0.73321,0,1.4664,0.0006,2.1996,0,1.2892-0.01,2.5786-0.017,3.8671-0.064,0.35168-0.014,0.70308-0.036,1.0549-0.043,0.77081-0.017,1.5416-0.02,2.3125-0.019,0.36955-0.0008,0.73911,0,1.1087,0,0,0-0.91584,0.1451-0.91584,0.1451z").attr(attr);
            //eur.path3091 = R.path("m336.37,227.93c0.0793-0.1687,0.14978-0.3388,0.19276-0.5205,0.0361-0.1718,0.0406-0.3476,0.0435-0.5224,0.001-0.1645,0.00029-0.329-0.00031-0.4936,0.0153-0.1823-0.0534-0.3284-0.15482-0.4737-0.13299-0.1626-0.3034-0.2876-0.4517-0.4345-0.14139-0.1333-0.24114-0.2875-0.29483-0.4736-0.0311-0.1931,0.0331-0.3009,0.19146-0.4041,0.23686-0.1404,0.50649-0.1837,0.77498-0.2198,0.33107-0.04,0.66499-0.04,0.99791-0.043,0.20024,0.01,0.4022-0.014,0.60189,0.01,0.0581,0.01,0.17364,0.029,0.23136,0.04,0.13894,0.026,0.26449,0.082,0.38509,0.1534,0,0-0.0609,0.01-0.0609,0.01-0.12054-0.071-0.24603-0.1258-0.38455-0.1513-0.23666-0.043-0.47245-0.058-0.71332-0.046-0.33286,0-0.6667,0-0.99775,0.042-0.26788,0.036-0.5369,0.078-0.77367,0.2172-0.15748,0.1004-0.22206,0.2051-0.19113,0.3963,0.0538,0.185,0.15367,0.338,0.29444,0.4705,0.14898,0.1466,0.31917,0.2723,0.45187,0.4356,0.10171,0.1465,0.17039,0.2941,0.15519,0.4774,0.0005,0.1646,0.002,0.3292,0.0002,0.4938-0.003,0.1752-0.008,0.3514-0.0437,0.5236-0.0428,0.1819-0.11316,0.3522-0.19214,0.5211h-0.0618z").attr(attr);
            //eur.path3093 = R.path("m338.79,231.89c0.64855-0.2119,1.3198-0.3495,1.9811-0.516,1.0387-0.2695,2.0781-0.5357,3.126-0.767,0.44253-0.074,0.91298-0.1979,1.3656-0.1802,0.0882,0,0.17569,0.017,0.26354,0.025,0.17388,0.045,0.37154,0.097,0.50504,0.2286,0.15382,0.1516,0.21374,0.3664,0.27652,0.5645,0.0763,0.3309,0.10962,0.6723,0.0733,1.0111-0.0239,0.2234-0.0673,0.396-0.1147,0.6152-0.14531,0.431-0.29786,0.8854-0.59328,1.2414-0.0433,0.052-0.0934,0.098-0.14007,0.1474-0.32317,0.2821-0.75032,0.35-1.1606,0.4118-0.35303,0.03-0.71223,0.079-1.0675,0.053-0.073,0-0.14488-0.021-0.21732-0.031-0.5727-0.1101-1.1048-0.367-1.6212-0.6296-0.38596-0.1895-0.76208-0.3968-1.078-0.6908-0.11462-0.1241-0.18541-0.281-0.19005-0.4518-0.001-0.047-0.007-0.097,0.0101-0.1403,0.0299-0.075,0.0853-0.1365,0.12795-0.2047,0.37533-0.4346,0.8567-0.7685,1.382-0.9989,0.43933-0.1927,0.77944-0.2751,1.2401-0.4092,1.2696-0.2994,2.5796-0.4097,3.882-0.3415,0.25984,0.014,0.51857,0.043,0.77786,0.065,0.92174,0.1276,1.8269,0.3183,2.6506,0.7699,0.0922,0.051,0.17816,0.1119,0.26724,0.1678,0.20094,0.1665,0.45412,0.3692,0.50287,0.6466,0.005,0.029,0.00072,0.058,0.001,0.087-0.0491,0.1056-0.0173,0.058-0.0955,0.1442,0,0-0.0612-0.01-0.0612-0.01,0.0778-0.084,0.0462-0.037,0.0953-0.1396-0.00028-0.029,0.004-0.057-0.00085-0.085-0.0483-0.2758-0.30026-0.4772-0.49982-0.6427-0.0887-0.056-0.17436-0.1168-0.26622-0.1672-0.81708-0.4487-1.7302-0.6434-2.6452-0.7686-0.64462-0.054-0.88847-0.089-1.5318-0.085-1.0167,0.01-2.0334,0.129-3.0229,0.3607-0.4599,0.1338-0.79999,0.216-1.2385,0.4084-0.52374,0.2297-1.0034,0.5628-1.3776,0.9961-0.0422,0.067-0.097,0.1281-0.12656,0.2018-0.0173,0.043-0.0113,0.093-0.01,0.1391,0.005,0.1696,0.0757,0.3248,0.1897,0.4477,0.31532,0.2933,0.69081,0.5,1.0758,0.6893,0.51653,0.2625,1.0488,0.5189,1.622,0.6275,0.0725,0.01,0.14468,0.023,0.21756,0.03,0.0891,0.01,0.23938,0.0006,0.32118,0,0.20979-0.01,0.41953-0.023,0.62791-0.049,0.40952-0.061,0.83646-0.1278,1.1601-0.4079,0.0467-0.049,0.0969-0.095,0.14021-0.1466,0.29609-0.3547,0.44965-0.8082,0.59443-1.2388,0.0479-0.2218,0.0901-0.3884,0.11419-0.6143,0.036-0.3381,0.003-0.6788-0.074-1.0089-0.0628-0.1974-0.12259-0.4103-0.27682-0.5606-0.13385-0.1303-0.33066-0.1812-0.50432-0.2258-0.0485-0.01-0.0963-0.022-0.14546-0.025-0.12467-0.01-0.33472,0.014-0.45651,0.028-0.30623,0.034-0.61001,0.088-0.9115,0.1509-1.0486,0.2304-2.0886,0.4964-3.1276,0.7666-0.65923,0.1665-1.3285,0.304-1.9749,0.5162,0,0-0.0612-0.01-0.0612-0.01z").attr(attr);


            //set id path
            for (var state in eur) {
                $(eur[state].node).attr('id', state);
            }

            var mainDesc = $('.brands-desc-container > .brands-desc'),
            mainHtml = mainDesc.html();

            if (navigator.appVersion.indexOf("MSIE 7") == -1 && navigator.appVersion.indexOf("MSIE 8") == -1) {
                //if(true){
                $('#interactiveMap').find('svg').removeAttr('xmlns height width').attr('viewBox', '0 0 950 548').css({
                    'width': '100%',
                    'height': '100%',
                    'position': 'absolute'
                });

                var newHtml = $('#svgMap').html();
                $('#svgMap').html(newHtml);

                mainDesc = $('.brands-desc-container > .brands-desc'),
                mainHtml = mainDesc.html();

                $('.brand-point').on('mouseenter', function () {

                    //country highlight
                    var markets = $(this).attr('data-markets').split(',');
                    var color = $(this).attr('data-marketscolor');
                    $('#interactiveMap path').each(function () {
                        var currentPath = $(this);
                        $.each(markets, function (index, data) {
                            if (currentPath.attr('id') && currentPath.attr('id').indexOf(data) != -1) {
                                currentPath.attr({
                                    'fill': color
                                });
                            }
                        })
                    });

                    //description switch
                    if ($($(this).find('a')[0]).hasClass('active')) {
                        $($(this).find('a')[0]).addClass('active1');
                    } else {
                        $($(this).find('a')[0]).addClass('active');
                    }

                    mainDesc.html($(this).find('.brands-desc').html());
                    App.activeMapResize();
                });

                $('.brand-point').on('mouseleave', function () {

                    //country highlight
                    $('#interactiveMap path').attr(attr);

                    //description switch
                    if ($($(this).find('a')[0]).hasClass('active1')) {
                        $($(this).find('a')[0]).removeClass('active1');
                    } else {
                        $($(this).find('a')[0]).removeClass('active');
                    }
                    //mainDesc.html(mainHtml);
                });

            } else {
                $('.brand-point').on('mouseenter', function () {
                    //country highlight
                    var markets = $(this).attr('data-markets').split(',');
                    var color = $(this).attr('data-marketscolor');

                    for (var state in eur) {
                        (function (st, state) {

                            $.each(markets, function (index, data) {
                                if (state.indexOf(data) != -1) {
                                    st.attr({
                                        'fill': color
                                    });
                                }
                            })

                        })(eur[state], state);
                    }


                    //description switch
                    if ($($(this).find('a')[0]).hasClass('active')) {
                        $($(this).find('a')[0]).addClass('active1');
                    } else {
                        $($(this).find('a')[0]).addClass('active');
                    }

                    mainDesc.html($(this).find('.brands-desc').html());
                });

                $('.brand-point').on('mouseleave', function () {
                    //country highlight
                    for (var state in eur) {
                        (function (st, state) {

                            st.attr(attr);

                        })(eur[state], state);
                    }

                    //description switch
                    if ($($(this).find('a')[0]).hasClass('active1')) {
                        $($(this).find('a')[0]).removeClass('active1');
                    } else {
                        $($(this).find('a')[0]).removeClass('active');
                    }
                    //mainDesc.html(mainHtml);
                });
            }
        },

        searchResultsTabs: function () {
            //$('#tabs').tabs();
        },

        resizeWindow: function () {

            var globalTimer = null;

            $(window).resize(function () {

                clearTimeout(globalTimer);
                globalTimer = setTimeout(resizeContent, 200);

            });

            function resizeContent() {
                App.categorySize();
                if ($('.pageeditor').length == 0) {
                    App.responsiveNavigation();
                }
            }
        },

        loadWindow: function () {

        	$(window).load(function () {

        		App.categorySize();
        		if ($('.pageeditor').length == 0) {
        			App.responsiveNavigation();
        		}

        	});
        },

        projectsCarouselResize: function () {
            var liResize = $('.projectsGallery').width();
            $('.projectsGallery ul li').width(liResize);
        },

        emailUpdates: function () {

            //onload message show
            messageShow();

            //onclick validation
            $('.email-updates-form input[type="submit"]').on('click', function () {
                $('.validation-stat').val('');
                var returnValue = true;

                if (!isEmail()) {
                    $('.email-updates-form input[type="text"]').addClass('invalid');
                    $('.validation-stat').val($('.validation-stat').val() + ' invalidEmail');
                    returnValue = false;
                }

                if (!isSelected()) {
                    $('.email-updates-form .whoiam').addClass('invalid');
                    $('.validation-stat').val($('.validation-stat').val() + ' invalidSelect');
                    returnValue = false;
                }

                if ($(this).hasClass('send')) {
                    messageShow();
                    return false;
                } else if (returnValue) {

                    $(this).addClass('send')
                }
                messageShow();
                return returnValue;
            });

            //input keypress validation
            $('.email-updates-form input[type="text"]').on('keyup', function () {
                if ($(this).hasClass('changed') && !isEmail()) {
                    $(this).addClass('invalid');
                } else {
                    $(this).removeClass('invalid');
                }
            });

            //input onchange validation
            $('.email-updates-form input[type="text"]').on('change', function () {

                $(this).addClass('changed')

                if (!isEmail()) {
                    $(this).addClass('invalid');
                } else {
                    $(this).removeClass('invalid');
                }

            });

            //select onchange validation
            $('.email-updates-form select').on('change', function () {
                if ($(this).val() == -1) {
                    $(this).parent().addClass('invalid');
                } else {
                    $(this).parent().removeClass('invalid');
                }
            })

            //helper functions
            function isEmail() {
                var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                return regex.test($('.email-updates-form input[type="text"]').val());
            }

            function isSelected() {
                return $('.email-updates-form select').val() != -1;
            }

            function messageShow() {
                var stat = $('.validation-stat').val();
                var messageshow = false;

                if (stat.indexOf('invalidEmail') != -1) {
                    $('.invalidEmail').show();
                    messageshow = true;
                }

                if (stat.indexOf('invalidSelect') != -1) {
                    $('.invalidSelect').show();
                    messageshow = true;
                }

                if (stat.indexOf('doubleEmail') != -1) {
                    $('.doubleEmail').show();
                    messageshow = true;
                }

                if (stat.indexOf('success') != -1) {
                    $('.success').show();
                    messageshow = true;
                }

                if (stat.indexOf('error') != -1) {
                    $('.error').show();
                    messageshow = true;
                }

                if (messageshow == true) {
                    $('.validationMessages').fadeIn(500);
                }

                $('.email-updates .close').on('click', function () {

                    $('.validationMessages').fadeOut(500, function () {
                        $(this).find('p').hide();
                    });

                });
            }
        },

        socialPlugins: function () {

            //localization
            var languages = $('body').attr('class').split(' ');
            var socialLang = {
                tw: '',
                fb: 'en_US',
                gl: 'en_GB'
            }
            var lang = '';
            $.each(languages, function () {
                if (this.length > 1) {
                    lang = "" + this;

                }
            });

            switch (lang) {
                case 'it':
                    socialLang = {
                        tw: 'it',
                        fb: 'it_IT',
                        gl: 'it'
                    };
                    break;
                case 'pl':
                    socialLang = {
                        tw: 'pl',
                        fb: 'pl_PL',
                        gl: 'pl'
                    };
                    break;
                case 'cs':
                    socialLang = {
                        tw: 'cs',
                        fb: 'cs_CZ',
                        gl: 'cs'
                    };
                    break;
                case 'sk':
                    socialLang = {
                        tw: 'sk',//twitter not support
                        fb: 'sk_SK',
                        gl: 'sk'
                    };
                    break;
                case 'ru':
                    socialLang = {
                        tw: 'ru',
                        fb: 'ru_RU',
                        gl: 'ru'
                    };
                    break;
                case 'uk':
                    socialLang = {
                        tw: 'uk',
                        fb: 'uk_UA',
                        gl: 'uk'
                    };
                    break;
                case 'ro':
                    socialLang = {
                        tw: 'ro',
                        fb: 'ro_RO',
                        gl: 'ro'
                    };
                    break;
                case 'hu':
                    socialLang = {
                        tw: 'hu',
                        fb: 'hu_HU',
                        gl: 'hu'
                    };
                    break;
                case 'bg':
                    socialLang = {
                        tw: 'bg',//twitter not support
                        fb: 'bg_BG',
                        gl: 'bg'
                    };
                    break;
                case 'fi':
                    socialLang = {
                        tw: 'fi',
                        fb: 'fi_FI',
                        gl: 'fi'
                    };
                    break;
                case 'sv':
                    socialLang = {
                        tw: 'sv',
                        fb: 'sv_SE',
                        gl: 'sv'
                    };
                    break;
                case 'no':
                    socialLang = {
                        tw: 'no',
                        fb: 'nb_NO',
                        gl: 'no'
                    };
                    break;
                case 'da':
                    socialLang = {
                        tw: 'da',
                        fb: 'da_DK',
                        gl: 'da'
                    };
                    break;
                case 'es':
                    socialLang = {
                        tw: 'es',
                        fb: 'es_ES',
                        gl: 'es'
                    };
                    break;
                case 'lt':
                    socialLang = {
                        tw: 'lt',//twitter not support
                        fb: 'lt_LT',
                        gl: 'lt'
                    };
                    break;
                case 'lv':
                    socialLang = {
                        tw: 'lv',//twitter not support
                        fb: 'la_VA',
                        gl: 'lv'
                    };
                    break;
                case 'fr':
                    socialLang = {
                        tw: 'fr',
                        fb: 'fr_FR',
                        gl: 'fr'
                    };
                    break;
                case 'de':
                    socialLang = {
                        tw: 'de',
                        fb: 'de_DE',
                        gl: 'de'
                    };
                    break;
                case 'nl':
                    socialLang = {
                        tw: 'nl',
                        fb: 'nl_NL',
                        gl: 'nl'
                    };
                    break;
            }
            function getAppId() {
                var appId = 0;
                if (window.location.href.indexOf('twyfordbathrooms') > -1) {
                    appId = 376930109113045;
                }
                else if (window.location.href.indexOf('kolo.com.pl') > -1) {
                    appId = 207142689315348;
                }

                return appId;
            }
            //facebook
            (function (d, s, id) {
                var appId = getAppId();
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id) || appId === 0) return;
                js = d.createElement(s); js.id = id;
                js.src =
                "//connect.facebook.net/" + socialLang.fb + "/all.js#xfbml=1&appId=" + appId + "";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            //<!--tweeter-->
            //if (socialLang.tw != '') {
            //    $('.twitter-share-button').attr('data-lang', socialLang.tw);
            //}
            //!function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = "https://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); } }(document, "script", "twitter-wjs");

            //<!-- google plus -->
            //window.___gcfg = { lang: socialLang.gl };
            //(function () {
            //    var po = document.createElement('script'); po.type =
            //    'text/javascript'; po.async = true;
            //    po.src = 'https://apis.google.com/js/plusone.js';;
            //    var s = document.getElementsByTagName('script')[0];
            //    s.parentNode.insertBefore(po, s);
            //})();

            //<!-- pinterest --?
            (function (d) {
                var f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
                p.type = 'text/javascript';
                p.async = true;
                p.src = '//assets.pinterest.com/js/pinit.js';
                f.parentNode.insertBefore(p, f);
            }(document));

            $('.btnPinIt').click(function () {
                var url = $(this).attr('href');
                var media = $(this).attr('data-image');
                var desc = $(this).attr('data-desc');
                window.open("//www.pinterest.com/pin/create/button/" +
				"?url=" + url +
				"&media=" + media +
				"&description=" + desc, "_blank");
                return false;
            });
        },

        responsiveNavigation: function () {
        	console.log(App.viewport());
            if ($('#HeaderId').hasClass('form-page') && $(window).width() > 768) {
            	$('.scfSubmitButtonBorder input[type=submit]').css('margin-left', '142px');
            	console.log("> 768");
            }
            else {
            	$('.scfSubmitButtonBorder input[type=submit]').css('margin-left', 0);
            	console.log("margin-left 0");
            }
            //clear aside on mobile apps - assign to resize on tablet
            if ($('.mobile-code').length > 0 && $(window).width() > 768) {
                $('aside').appendTo('.mobileApp-wrapper');
                $('.social-plugins').prependTo('.mobileApp-content');
                console.log("> 768 2");
            }
            if (App.viewport().width <= 767 || window.innerWidth <= 767) {
                App.mobileCategories(true);
                App.mobileNavigation();
                App.mobileElements();
                App.projectsCarouselResize();
                console.log("<= 768");
            }
            if ((App.viewport().width >= 768 && App.viewport().width <= 979) || (window.innerWidth >= 768 && window.innerWidth <= 979)) {
                App.mobileCategories(false);
                App.tabletNavigation();
                App.projectsCarouselResize();
                console.log(">= 768 <= 979");
            }
            if (App.viewport().width >= 980 || window.innerWidth >= 980) {
                App.mobileCategories(false);
                App.desktopNavigation();
                App.projectsCarouselResize();
                console.log(">= 980");
            }
        },
        //edit mode functions

        emptyPlaceholder: function () {
            if ($(".box-page").length == 0) {
                var span = $('<span></span>');
                span.addClass('placeholderMessage');
                span.html('No items added to this box</br>Insert items here');
                span.appendTo($('div.scEmptyPlaceholder'));
            }

            if ($('.item-list .tips-list').length > 0 && $('.item-list .tips-list li').length == 0) {
                var li = $('<li></li>');
                li.html('Here will be displayed tips list.<br/>Tips are displayed in two columns.<br/>Tips must be added by using Content Editor');
                li.css({
                    'width': '100%',
                    'min-height': '100px',
                    'border': '0',
                    'text-align': 'center',
                    'font-size': '20px'
                });
                li.appendTo($('.item-list .tips-list'));
            }
        },

        brandPointsSet: function () {
            $('.brand-point>a').each(function () {
                var horPrecision = $('.group-layer').width() / 200,
                    vertPrecision = ($('#svgMap').width() * 0.5768) / 200;

                $(this).draggable({
                    grid: [horPrecision, vertPrecision],
                    //grid: [100, 100],
                    disabled: true
                });
                $('.group-layer').droppable({
                    drop: function (event, ui) {

                        var left = ((ui.position.left * 100) / $('.group-layer').width()).toFixed(2);
                        var top = ((ui.position.top * 100) / $('.group-layer').height()).toFixed(2);

                        $(ui.draggable[0]).css({
                            left: left + '%',
                            top: top + '%'
                        });
                        $(ui.draggable[0]).parent().attr({
                            'data-top': top,
                            'data-left': left
                        });
                    },
                    out: function (event, ui) {

                    }
                });
            });

            //map edit events
            $('.edit-map-points').on('click', function (e) {
                e.preventDefault();
                $('.brand-point>a').draggable("enable");
                $(this).hide();
                //alert('I like to move it Move it!')
                $('.save-map-points').show();

                $('.brand-point>a').on('contextmenu', function (e) {
                    e.preventDefault();
                    $(this).addClass('currentPoint');
                    var top = $(this).css('top');
                    var left = $(this).css('left');

                    $('.map-submenu').css({
                        top: top,
                        left: left
                    }).show();
                });

                $('.map-submenu li').on('click', function () {
                    var event = $(this).attr('class');

                    switch (event) {

                        case "side-change":
                            if ($('span', $('.currentPoint')).hasClass('right')) {
                                $('.currentPoint').parent().attr('data-side', 'left');
                                $('span', $('.currentPoint')).removeClass('right');
                            } else {
                                $('.currentPoint').parent().attr('data-side', 'right');
                                $('span', $('.currentPoint')).addClass('right');
                            }
                            $('.map-submenu').hide();
                            $('.currentPoint').removeClass('currentPoint');
                            break;

                        case "color1-change":
                            $('.currentPoint').removeClass('color2').removeClass('color3').removeClass('active');
                            $('.currentPoint').parent().attr('data-color', 'color1');
                            $('.currentPoint').removeClass('currentPoint');
                            $('.map-submenu').hide();
                            break;

                        case "color2-change":
                            $('.currentPoint').removeClass('color3').addClass('color2').removeClass('active');
                            $('.currentPoint').parent().attr('data-color', 'color2');
                            $('.currentPoint').removeClass('currentPoint');
                            $('.map-submenu').hide();
                            break;

                        case "color3-change":
                            $('.currentPoint').removeClass('color2').addClass('color3').removeClass('active');
                            $('.currentPoint').parent().attr('data-color', 'color3');
                            $('.currentPoint').removeClass('currentPoint');
                            $('.map-submenu').hide();
                            break;
                    }
                });

                $('html').on('click', function () {
                    $('.currentPoint').removeClass('currentPoint');
                    $('.map-submenu').hide();
                });
            });
        },
        //desktop navigation

        desktopNavigation: function () {
            //clear mobile & tablet
            $('span.menuTitle').removeClass('active bindMob bindTab').hide().siblings('.search-form').removeClass('changeColor').siblings('.main-menu').css('width', '').removeClass('shortMenu').show().children('li.repositioned').appendTo('.header nav ul').removeClass('repositioned');
            $('.my-list-menu-item').insertAfter('.header nav ul li:last');
            $('.search-form').removeClass('shortSearch').children('.search-term').show();
            $('span.menuTitle').off('click', '**');
            $(".search-form input[type=submit]").prop("disabled", true);
        },
        //tablet functions

        tabletNavigation: function () {
            function firstPart() {
                //clear from mobile
                $('span.menuTitle').hide().removeClass('bindMob').siblings('.search-form').removeClass('changeColor').siblings('.main-menu').css('width', '').removeClass('active').children('li.repositioned').appendTo('.header nav ul').removeClass('repositioned');
                $('.search-form').addClass('shortSearch');
            }

            function secondPart() {
                $('.main-menu').show();
                var check1 = 0,
                    check0 = 0;
                $('.main-menu li').each(function (index) {
                    check1 += parseInt($(this).width());
                });
                $('header li').each(function (index) {
                    check0 += parseInt($(this).outerWidth());
                });
                check2 = 55;
                check3 = 710;
                $('.main-menu').hide();
                if (check1 + check2 < check3 && check0 < 710 - $('header img').width()) {
                    $('.main-menu').show().siblings('span.menuTitle').removeClass('active');
                    $('.search-form').addClass('shortSearch');
                    $('.main-menu').removeClass('shortMenu');

                } else {
                    $('.search-form').removeClass('shortSearch');
                    $('span.menuTitle').show();
                    $('.main-menu').addClass('shortMenu');
                    $('.search-form .search-term').show();
                    $('.main-menu').css({ 'display': 'none' });
                    $('header li.navItem').addClass('repositioned').appendTo('.main-menu');
                    if ($('.main-menu li.repositioned').length > 0 && !$('.main-menu li.repositioned:first').hasClass('firstRepositioned')) {
                        $('.main-menu li.repositioned:first').addClass('firstRepositioned');
                    }
                }
            }

            function thirdPart() {
                if ($('.main-menu').hasClass('shortMenu')) {
                    if (!$('span.menuTitle').hasClass('bindTab')) {
                        $('span.menuTitle').addClass('bindTab');
                        function menuOnClickTablet(e) {
                            $('span.menuTitle').toggleClass('active');
                            $('.main-menu').toggle();
                            if ($('span.menuTitle').hasClass('active')) {
                                $(".search-form input[type=submit]").prop("disabled", true);
                            } else {
                                $(".search-form input[type=submit]").prop("disabled", false);
                            }
                        }
                        $('body').on('click', function (e) {
                            if (!$('span.menuTitle').is(e.target) && $('span.menuTitle').hasClass('active')) {
                                $('span.menuTitle').removeClass('active');
                                $('.main-menu').hide();
                                $(".search-form input[type=submit]").prop("disabled", false);
                            }
                        });
                        $('span.menuTitle').unbind();
                        $('span.menuTitle').on('click', menuOnClickTablet);
                    }
                }
                if ($('.search-form').hasClass('shortSearch')) {
                    function activateSubmit() {
                        //fix for chrome on ipad
                        if ($('.searchResults-search input[type=text]').is(':focus')) {
                            $('.searchResults-search input[type=submit]').trigger('click');
                            return false;
                        };//end fix
                        $('.main-menu').addClass('longReposition');
                        $('.shortSearch').addClass('blackBg');
                        $('.shortSearch .search-term').show();
                    }
                    function deactivateSubmit() {
                        $('.shortSearch').removeClass('blackBg');
                        $('.shortSearch .search-term').hide();
                        $('.main-menu').removeClass('longReposition');
                        $('.shortSearch .submit').unbind('click');
                        $('.shortSearch .submit').one('click', function (e) {
                            e.preventDefault();
                            activateSubmit();
                            $(this).unbind('click');
                            closeSubmitEvent();
                        });
                        $(".search-form input[type=submit]").prop("disabled", false);
                    }

                    function closeSubmitEvent() {
                        $('.shortSearch .submit').on('click', function (e) {
                            if ($(this).parent().find('.search-term').val().length == 0) {
                                e.preventDefault();
                                deactivateSubmit();
                            }
                        });
                    }
                    if ($('.search-term').is(':focus')) {
                        activateSubmit();
                    } else {
                        deactivateSubmit();
                    }
                    $('.shortSearch .submit').on('click', function (e) {
                        e.preventDefault();
                        activateSubmit();
                        $(this).unbind('click');
                        closeSubmitEvent();
                    });
                    $('body').on('click', function (e) {
                        if (!$(e.target).parent().hasClass('blackBg')) {
                            deactivateSubmit();
                        }
                    });
                }
            }

            firstPart();
            secondPart();
            thirdPart();
        },
        //mobile functions

        mobileCategories: function (is) {

            var elementList = $('.index-list span.hdr span, .index-list h3, .filters h3 span, .filters h2 span');

            elementList.each(function () {
                if (!is) {

                    $(this).off('click').removeClass('clickEnable');
                    $('.filters ul').attr('style', '');

                } else if (!$(this).hasClass('clickEnable')) {

                    $(this).on('click', function () {

                        //var arrow = $(this).find('.mobile-element');
                        //var contener = $(this).parent();
                        var arrow = $(this);
                        var contener = $(this).parent();
                        if (!contener.is('div, li')) {
                            contener = contener.closest('div, li');
                        }

                        if (contener.hasClass('index-list') || contener.hasClass('filters')) {
                            var content = contener.find('ul');
                        } else {
                            var content = $(contener.find('div')[0]);
                        }

                        var contentHeight = content.height();

                        if (arrow.hasClass('open')) {
                            arrow.removeClass('open');
                            contener.removeClass('activeList');
                            content.animate({ height: 0 }, 500, function () {
                                content.hide().attr('style', '');
                            });
                        } else {
                            content.height(0).show();
                            arrow.addClass('open');
                            contener.addClass('activeList');
                            content.animate({ height: contentHeight }, 500, function () {
                                $(this).css('height', 'auto');
                            });

                        }
                    }).addClass('clickEnable');
                }
            });
        },

        mobileNavigation: function () {
            //clear from tablet
            // $('span.menuTitle').show().removeClass('bindTab active').siblings('.main-menu').removeClass('shortMenu longReposition').hide().siblings('.search-form').removeClass('shortSearch blackBg').children('.search-term').hide();
            $('.header nav ul li').appendTo('.main-menu').addClass('repositioned');
            $(".search-form input[type=submit]").prop("disabled", false);
            if ($('.main-menu li.repositioned').length > 0 && !$('.main-menu li.repositioned:first').hasClass('firstRepositioned')) {
                $('.main-menu li.repositioned:first').addClass('firstRepositioned');
            }
            $(document).ready(function () {
                if (!$('span.menuTitle').hasClass('bindMob')) {
                    $('span.menuTitle').addClass('bindMob');
                    function menuOnClickMobile() {
                        $('span.menuTitle').toggleClass('active');
                        $('.main-menu').toggle();
                        $('.search-form').toggleClass('changeColor');
                    }
                    $('body').on('click', function (e) {
                        if (!$('span.menuTitle').is(e.target) && !$('.main-menu li').is(e.target) && !$('.main-menu li a').is(e.target) && $('span.menuTitle').hasClass('active')) {
                            $('span.menuTitle').removeClass('active');
                            $('.main-menu').hide();
                            $('.search-form').removeClass('changeColor');
                        }
                    });
                    $('span.menuTitle').unbind();
                    $('span.menuTitle').on('click', menuOnClickMobile);
                }
                if ($(window).width() < 767) {
                    $('.main-menu').width($(window).width());
                }
            });

            function firstPart() {
                //clear from mobile
                $('.search-form').addClass('shortSearch');
            }

            function thirdPart() {
                if ($('.search-form').hasClass('shortSearch')) {
                    function activateSubmit() {
                        //fix for chrome on ipad
                        if ($('.searchResults-search input[type=text]').is(':focus')) {
                            $('.searchResults-search input[type=submit]').trigger('click');
                            return false;
                        };//end fix
                        $('.main-menu').addClass('longReposition');
                        $('.shortSearch').addClass('blackBg');
                        $('.shortSearch .search-term').show();
                    }
                    function deactivateSubmit() {
                        $('.shortSearch').removeClass('blackBg');
                        $('.shortSearch .search-term').hide();
                        $('.main-menu').removeClass('longReposition');
                        $('.shortSearch .submit').unbind('click');
                        $('.shortSearch .submit').one('click', function (e) {
                            e.preventDefault();
                            activateSubmit();
                            $(this).unbind('click');
                            closeSubmitEvent();
                        });
                    }

                    function closeSubmitEvent() {
                        $('.shortSearch .submit').on('click', function (e) {
                            if ($(this).parent().find('.search-term').val().length == 0) {
                                e.preventDefault();
                                deactivateSubmit();
                            }
                        });
                    }
                    if ($('.search-term').is(':focus')) {
                        activateSubmit();
                    } else {
                        deactivateSubmit();
                    }
                    $('.shortSearch .submit').on('click', function (e) {
                        e.preventDefault();
                        activateSubmit();
                        $(this).unbind('click');
                        closeSubmitEvent();
                    });
                    $('body').on('click', function (e) {
                        if (!$(e.target).parent().hasClass('blackBg')) {
                            deactivateSubmit();
                        }
                    });
                }
            }
            firstPart();
            thirdPart();
        },

        mobileElements: function () {
            if ($('.mobile-code').length > 0) {

                var mobileAppParent = $('.mobileApp-content').parent().find('.mainMedia-subcontent');
                var mobileAppParent2 = $('.mobileApp-text');
                $('aside').appendTo(mobileAppParent);
                $('.social-vertical').appendTo(mobileAppParent2);
            }
            if ($('.downloads-mainPanel.secondPanel').length > 0) {
                setTimeout(function () {
                    var buttonWidth = $('.ez-checkbox').outerWidth(true);
                    $('.downloads-mainPanel.secondPanel ul li .button').animate({ 'margin-left': buttonWidth }, 100);
                }, 200);
            }
            if ($('.mobile-code').length > 0) {
                $('aside').prependTo('.mobileApp-wrapper');
            }
        },

        searchResultClear: function () {
            $('.searchResults-icon').on('click', function (e) {
                e.preventDefault();
                $('.searchResults-search input[type="text"]').val('').focus();
                $(this).hide();
            });
            $('.searchResults-search input[type="text"]').on('keyup', function () {
                if ($(this).val().length > 0) {
                    $('.searchResults-icon').show();
                } else {
                    $('.searchResults-icon').hide();
                }
            })
        },

        brochuresButtons: function () {

            checkButtons();

            $('.brochures-list input[type="checkbox"]').on('change', function () {
                checkButtons();
            });

            $('a.interactivePdf').on('click', function (e) {
                downloadPdf(e);
            });

            function downloadPdf(e) {

                var pdfId = $(e.currentTarget).parent().parent().find("input[id*='toDownloadHiddenID']")[0].value;
                var href = $(e.currentTarget).attr('href');

                if (pdfId === null || pdfId === undefined)
                    return;

                var fileName = getFileName(href);
                var parameters = { 'id': pdfId, 'fileName': fileName[0] };

                $.ajax({
                    type: 'POST',
                    url: '/Services/DownloadFilesService/GenerateLinkZipFilesService.asmx/TrackDownloadBrochure',
                    data: JSON.stringify(parameters),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    success: function (msg) {
                    },
                    error: function (msg) {
                    }
                });
            }

            function getFileName(href) {
                var fileName = $(href.split('/')).last();

                return fileName;
            }


            function checkButtons() {
                var order = false;
                var download = false;
                $('.brochures-list input[type="checkbox"]').each(function () {
                    if ($(this).is(':checked')) {
                        if ($(this).parent().parent().find('.no-print.hide').length > 0) order = true;
                        if ($(this).parent().parent().find('a.interactivePdf').length > 0) download = true;
                    }
                });

                if (order) {
                    $('.button.orderButton').attr('disabled', false).attr('title', '');
                } else {
                    $('.button.orderButton').attr('disabled', 'disabled').attr('title', $('.titleOrder').text());
                }

                if (download) {
                    $('.button.downloadButton').attr('disabled', false).attr('title', '');
                } else {
                    $('.button.downloadButton').attr('disabled', 'disabled').attr('title', $('.titleDownload').text());
                }
            }
        },

        addFlash: function () {

            var path = $('#flashcontent').attr('data-flash');
            if (path.indexOf('showrooms') != -1 && $(window).width() > 768) {
                //var so = new SWFObject(path + "twviewer.swf", "sotester", "650", "330", "9.0.0", "#FFFFFF");
                //so.addParam("allowNetworking", "all");
                //so.addParam("allowScriptAccess", "always");
                //so.addParam("allowFullScreen", "true");
                //so.addParam("scale", "noscale");
                //so.addVariable("base", "config/");
                //so.addVariable("lwImg", "resources/logo.jpg");
                //so.addVariable("lwBgColor", "255,255,255,255");
                //so.addVariable("lwBarBgColor", "255,255,255,255");
                //so.addVariable("lwBarColor", "255,33,144,226");
                //so.addVariable("lwBarBounds", "280,200,262,16");
                //so.addVariable("lwlocation", "0");
                //so.addVariable("lwShowLoadingPercent", "true");
                //so.addVariable("lwTextColor", "255,0,0,0");
                //so.addVariable("iniFile", "config.bin");
                //so.addVariable("progressType", "0");
                //so.addVariable("swfFile", "");
                //so.addVariable("href", location.href);
                //so.write("flashcontent");


                var flashvars = {};
                flashvars.base = "config/";
                flashvars.lwImg = "resources/logo.jpg";
                flashvars.lwBgColor = "255,255,255,255";
                flashvars.lwBarBgColor = "255,255,255,255";
                flashvars.lwBarColor = "255,33,144,226";
                flashvars.lwBarBounds = "280,200,262,16";
                flashvars.lwlocation = "0";
                flashvars.lwShowLoadingPercent = "true";
                flashvars.lwTextColor = "255,0,0,0";
                flashvars.iniFile = "config.bin";
                flashvars.progressType = "0";
                flashvars.swfFile = "";
                flashvars.href = location.href;

                var params = {};
                params.allowNetworking = "all";
                params.allowScriptAccess = "always";
                params.allowFullScreen = "true";
                params.scale = "noscale";

                var attributes = {};
                //attributes.id = "myDynamicContent";
                //attributes.name = "myDynamicContent";

                swfobject.embedSWF(path, "flashcontent", "690", "330", "9.0.0", "expressInstall.swf", flashvars, params, attributes);
            }
        },

        scrollToBottom: function () {
            if (getURLParameter('Page') != null) {
                $('body').scrollTop($('body').height());
            }
            function getURLParameter(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
            }
        },

        //ie fix
        ie7Fix: function () {
            //category display fix

            $('.contener-site-index, .list-category').each(function () {

                var contenerWidth = $(this).width();
                var actualContener = $(this);
                var min = 1000;
                var imax = 0;
                var max = 0;
                var imin = 0;
                var all = 0;
                var widths = new Array;
                var index = 0;

                $('.index-list', actualContener).each(function () {
                    itemWidth = $(this).outerWidth(true);
                    widths.push($(this).outerWidth(true));
                    all += parseFloat($(this).outerWidth(true));
                });

                while (all - contenerWidth > 0 && index < 200) {// || all - contenerWidth < -10) {
                    index++;
                    all = 0;
                    $.each(widths, function (i) {
                        all += parseFloat(this) || 0;
                        if (this > max) {
                            max = this;
                            imax = i;
                        }
                        if (this < min) {
                            min = this;
                            imin = i;
                        }
                    });

                    if (all >= contenerWidth) {
                        max = max - 5;
                        widths[imax] = max;
                    }
                    if (all + 30 < contenerWidth) {
                        min = min + 5;
                        widths[imin] = min;
                    }

                    if (index > 2000) {
                        all = contenerWidth;
                    }
                }

                $('.index-list', actualContener).each(function (i) {
                    var outerSpacing = $(this).outerWidth(true) - $(this).width();
                    $(this).width(widths[i] - outerSpacing);
                });

                //fix on new categories for IE7 (product subcategories panel)
                if ($('.lt-ie8 .two-brands-tab').length > 0) {
                    var containIndexes = $('.list-category').width();
                    var count = $('.list-category .index-list').length;
                    var newWidth = (containIndexes / count) - 1;
                    var newWidthFirst = containIndexes / count;
                    $('.list-category .index-list').css({
                        'min-width': newWidth,
                        'max-width': newWidth
                    });
                    $('.list-category .index-list:first').css({
                        'min-width': newWidthFirst,
                        'max-width': newWidthFirst
                    });
                    var heightCount = $('.list-category .index-list:first-child').height();
                    $('.list-category .index-list').height(heightCount);
                }
            });
        },

        //placeholder fix
        placeholderIeFix: function () {

            $('input[placeholder]').each(function () {

                var input = $(this);

                $(input).val(input.attr('placeholder'));

                $(input).focus(function () {
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });

                $(input).blur(function () {
                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
                        input.val(input.attr('placeholder'));
                    }
                });
            });

            //blocking search event with placeholder value in search input
            $('.search-form .submit').on('click', function () {
                var input = $(this).parent().find('.search-term');
                if (input.val().toLowerCase() == input.attr('placeholder').toLowerCase()) {
                    return false;
                }
            });
        },

        dropdownFix: function () {
            $('.filters-container,.downloads-filtersUp').css({
                'position': 'relative',
                'z-index': 10
            });
        },

        fixPress: function () {
            if ($('#HeaderId h1').length == 0) {
                $('.press .sort-select').css('position', 'static');
            }
        },

        noResults: function () {
            var aNum = $('.products-filters-header').children('span').val();
            //console.log(aNum);
        },

        lockScroll: function () {
            var locked = function (e) {
                e.preventDefault();
                var api = $('.checkboxes').data('jsp');
                var delta = (e.originalEvent && e.originalEvent.detail < 0) || e.originalEvent.wheelDelta > 0 ? 1 : -1;
                if (delta > 0) {
                    api.scrollByY(-2);
                    return false;
                    api.reinitialise();
                } else {
                    api.scrollByY(2);
                    return false;
                    api.reinitialise();
                }
            }
            $('.checkboxes').on('mouseenter', function () {
                $('body').addClass('scroll-lock');
                $('.scroll-lock').on('mousewheel DOMMouseScroll MozMousePixelScroll', locked)
            });
            $('.checkboxes').on('mouseleave', function () {
                $('.scroll-lock').off();
                $('body').removeClass('scroll-lock');
            });
            $('body').on('click', function () {
                $('.scroll-lock').off();
                $('body').removeClass('scroll-lock');
            });
        },

        secondAside: function () {
            if ($('aside').length > 1) {
                $('aside:last').css('margin-top', 0);
            }
            if ($('.lt-ie8') && $('aside').length > 1) {
                $(window).scroll(function () {
                    if ($('body').height() <= ($(window).height() + $(window).scrollTop())) {
                        $('.lineDown').addClass('sticked');
                    } else {
                        $('.lineDown').removeClass('sticked');
                    }
                });
            }
        },

        placeholderSet: function () {
            $('.faq-filters input[type=text], .faq-filters .search-overlay, .faq-filters .style-input').on('click', function (e) {
                e.stopPropagation();
                $('.search-overlay').hide();
                $('.faq-filters input[type=text]').focus();
            });
            $('body').on('click', function (e) {
                $('.search-overlay').show();
            });
        }
    };

    $(document).ready(function () {
        App.start();

        $(".small-carousel li a>img").on('load', function () {
            var img = $(this);
            img.css({
                position: "relative",
                left: (img.parent().width() / 2) - (img.width() / 2),
                top: (img.parent().height() / 2) - (img.height() / 2)
            });
        });

        // Roles for order brochures
        $(".brochureCount input").attr('maxlength', '2');
        $(".brochureCount input").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A, Command+A
                (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });

        $('.orderBroschureForm .button').on('click', function () {
        	$('.orderBroschureForm span.required').each(function () {
        		if ($(this).css("visibility") == "visible") {
        			$(this).prev().hide()
        		}
        	})
        });

        $('.scfForm input').change(function () {
        	$('.orderBroschureForm span.required').each(function () {
        		if ($(this).css("visibility") == "visible") {
        			$(this).prev().hide()
        		}
        	})
        });

    	// Limiting the display of the number of characters on a button added by sitcore
        $(".main .buttonsAction a").each(function () {
        	var text = $(this).text();
        	if (text.length > 40) {
        		$(this).text(text.substr(0, text.lastIndexOf(' ', 39)) + '...');
        	}
        });

        //if ($(".html-component .buttonsAction").length) {
        	//$(".html-component .buttonsAction").each(function () {
        		//$(this).parent().addClass('border-bottom');

				// IT COULD BE ONLY THIS LINE, WORKS !!!
        		//$('.buttonsAction.buttonsAction-Separator').parent().addClass('border-bottom');
        	//})
        //}
    });

    // Lazy Load Inspiration carousel, Collection List
    $(document).ready(function () {
        $(".collections-list img.lazy, .inspirationsNew img.lazy").lazyload({
            effect: "fadeIn"
        });

        $(".main-content .big-slide .slide a").mousedown(function (e) {
            if (e.button == 2) {
                return false;
            }
            return true;
        });

        function blockSubmit() {
            if ($('.search-term').val().length > 2) {
                $("input[type=submit]").prop("disabled", false);
            }
            else {
                $("input[type=submit]").prop("disabled", true);
            }
        }

        $('.search-form input').on('input', function () {
            blockSubmit();
        });

        if ($.fn.lazyload) {
            // Setup lazyload
            var carousel = $(".small-carousel-wrapper");
            $(".small-carousel-wrapper img.lazy").lazyload({
                effect: "fadeIn",
                container: carousel
            });

            // Make sure, that images are loaded when carousel is slided.
            var loadTimer = null;
            carousel.siblings(".scroll-bar-wrap").find(".scroll-bar").on("slide", function () {
                if (loadTimer) {
                    return;
                }

                // Use timer to throttle triggering resize events.
                loadTimer = setTimeout(function () {
                    loadTimer = null;
                    // Use trigger event to make lazyloader think it is time to check which images shoudl be loaded.
                    carousel.trigger("resize");
                }, 250);
            });
        }
    });

    /*
      * Single Inspiration
      */

    var shown = false;

    $(".showSingleInspiration").on('click', function (e) {
        e.preventDefault();
        shown = true;
        idofcurrentelement = $(".showed .showSingleInspiration").index(this);
        var name = $(this).attr("data-itemname").toString();
        getnewinspiration(name);
        //console.log(idofcurrentelement)
    });

    $(".Popup .BigImageArrow.Next").on('click', function (e) {
        var temp = $(".showed .showSingleInspiration").length;
        idofcurrentelement = idofcurrentelement + 1;
        if (idofcurrentelement >= (temp)) {
            idofcurrentelement = 0;
        }
        //var name = idofcurrentelement.attr("data-itemname").toString();
        var name = $(".showed .showSingleInspiration:eq(" + idofcurrentelement + ")").attr("data-itemname").toString();
        //console.log(idofcurrentelement+"   "+temp)
        getnewinspiration(name);
    });

    $(".Popup .BigImageArrow.Prev").on('click', function (e) {
        var temp = $(".showed .showSingleInspiration").length;
        if (idofcurrentelement != 0) {
            idofcurrentelement = idofcurrentelement - 1;
        } else {
            idofcurrentelement = temp - 1;
        }
        //var name = idofcurrentelement.attr("data-itemname").toString();
        var name = $(".showed .showSingleInspiration:eq(" + idofcurrentelement + ")").attr("data-itemname").toString();
        //console.log(idofcurrentelement)
        getnewinspiration(name);
    });

    function getnewinspiration(name) {
        $.ajax({
            type: "POST",
            url: "/Services/InspirationService/InspirationService.asmx/GetInspiration",
            data: JSON.stringify({ inspirationName: name }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                OnSuccess(response, idofcurrentelement);
                $(window).resize(function () {
                    OnSuccess(response, idofcurrentelement);
                });
            },
            failure: function (response) {
                alert(response.d);
            },
            error: function (response) {
                alert(response.d);
            }
        });
    }

    function OnSuccess(response, numElement2) {
        //alert("success");
        var num = $(".showed .showSingleInspiration").length;
        $(".main-inspiration").removeClass('active');
        var numElement = 6;
        var szerokosc = $(window).width();
        if (szerokosc >= 1380) {
            numElement = 6
        } else if (szerokosc >= 980 && szerokosc <= 1379) {
            numElement = 5
        } else if (szerokosc <= 979 && szerokosc >= 768) {
            numElement = 4
        } else if (szerokosc <= 767 && szerokosc >= 480) {
            numElement = 3
        } else {
            numElement = 2
        }

        var pos = Math.floor(numElement2 / numElement) + 1;
        var numElement4 = (pos * numElement) - 1;

        //console.log(pos+"||"+temp4 + "||" + num)

        if ((numElement4 + 1) > num) {
            numElement4 = num - 1;
        }

        if (numElement2 != -1) {
            $(".main-inspiration").insertAfter($(".inspirationsNew ul li.showed").eq(numElement4)).css("display", "block").addClass('active');
            $('html,body').animate({
                scrollTop: $(".main-inspiration").offset().top - 130
            }, 10);
        }

        var view = response.d;
        $('.collections-inspiration').empty();
        $('.hot-spot').remove();
        $('#IPresentationName').empty();
        $('#IDescription').empty();

        $('#MainImageID').attr("src", view.MainImageUrl).attr("alt", view.MainImageUrl);
        $('#BigImageID').attr("src", view.MainImageUrl).attr("alt", view.MainImageUrl);
        $('#IPresentationName').html(view.IPresentationName);
        $('#IDescription').html(view.IDescription);

        $.each(view.Hotspots, function (i, hotSpot) {
            $('<span>')
            .attr("class", "hot-spot hotspot-click")
            .attr("hotspotid", hotSpot.Id)
            .attr("style", hotSpot.Style)
            .html("<span></span>")
            .insertAfter('#MainImageID');
        });

        $('.hotspot-click').on('click', function () {

            var hsID = $(this).attr("hotspotid");

            $.ajax({
                type: "POST",
                url: "/Services/InspirationService/InspirationService.asmx/GetProductControlForInspiration",
                data: JSON.stringify({ hotspotid: hsID }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (response) {
                    var width;
                    function widthCheck() {
                        if ($('html').hasClass('lt-ie9')) {
                            width = 810;
                        } else if ($(window).width() > 768) {
                            width = content.width();
                        } else if ($(window).width() <= 768) {
                            width = '100%';
                        }
                    }
                    var productId = $(this).attr('hotspotid');
                    $("#productPopupID").html(response.d);
                    var content = $("#productPopupID");
                    widthCheck();
                    var height = content.height();
                    var bg = $('<div></div>').addClass('popup-wraper');
                    bg.appendTo($('body'));
                    content.dialog({
                        width: width,
                        close: function (event, ui) {
                            $('.popup-wraper').remove();
                            $(this).dialog("destroy");
                        }
                    });
                    $(window).on('load resize', function () {
                        widthCheck();
                        content.dialog('option', 'width', width);
                    });
                    // OnSuccess(response, temp);
                },
                failure: function (response) {
                    alert(response.d);
                },
                error: function (response) {
                    alert(response.d);
                }
            });
        });

        $.each(view.Collections, function (i, Collection) {
            var li = $('<li>');
            var a = $('<a>').attr("href", Collection.GetUrl);
            var img = $('<img>').attr("src", Collection.ImageUrl).attr("alt", Collection.ImageAlt);
            var span = $('<span>').html(Collection.PresentationOrDisplay);
            a.append(img);
            a.append(span);
            $('.collections-inspiration').append(li.append(a));
        });
        if (!view.Collections.length) {
            $('.collections-list-new').hide();
        }
        else
            $('.collections-list-new').show();
        return false;
    };

    $(document).ready(function () {
        $(".Popup .Close").click(function () {
            $(".Popup").hide();
        });

        $(".FullWindow").click(function () {
            $(".Popup").show();
        });

        /* COLLECTION - LOAD MORE ELEMENTS */
        $(function () {
            $("#Collections .collection-element").slice(0, 4).show(); // select the first ten
            $("#Collections .btnMore").click(function (e) { // click event for load more
                e.preventDefault();
                $("#Collections .collection-element:hidden").slice(0, 4).show(); // select next xx hidden divs and show them

                if ($("#Collections .collection-element:hidden").length == 0) { // check if any hidden divs still exist
                    //alert("No more divs"); // alert if there are none left
                    $("#Collections .btnMore").hide();
                }
            });
        });

        //DOWNLOAD PANEL - SHOW/HIDE INFO ON MOBILE
        $(function () {
            $('.results-panel .results .mobileMoreInfo').click(function (e) {

                e.preventDefault();
                // hide all span
                var $this = $(this).parent().find('.textWrap.typeFile');
                var $this2 = $(this).parent().find('.mobileMoreInfo');
                $(".results .textWrap.typeFile").not($this).hide();
                $('.results-panel .results .mobileMoreInfo').not($this2).removeClass('active');
                // here is what I want to do

                $this.toggle();
                $this2.toggleClass('active');
            });
        });

        //PRODUCT PAGE - TRIGGER CLICK UITABS
        function scrollTo(id) {
            $('html, body').animate({
                scrollTop: $(id).offset().top
            }, 500);
        }

        var tabMap = {
            'articleLink': 'articlesTab',
            'productLink': 'productVariantsTab',
            'downloadLink': 'downloadTab',
            'technicalLink': 'technicalTab'
        };

        $.each(tabMap, function (tabLink, tab) {
            var $tabLink = $('.linksUItabs ul li.' + tabLink),
                $tab = $("#overlaps ul ." + tab + " a");
            if ($tab.length) {
                $tabLink.show();
                $tabLink.click(function () {
                    $tab.click();
                    scrollTo('#overlaps');
                    return false;
                });
            }
        });

        $("#overlaps.ui-tabs .ui-tabs-nav li a").click(function () {
            $('html, body').animate({
                scrollTop: $("#overlaps.ui-tabs").offset().top
            }, 500);
        });

        //PRODUCT PAGE - DOWNLOAD SECTION - SHOW/HIDE DETAILS
        $('.tableHead .tableShowDetails').click(function () {
            $('.tableHead .tableHideDetails.visible').click();
            var $ele = $(this).closest('.tableHead').next();
            $ele.stop(true).slideDown('slow');
            $(this).addClass('hidden').siblings('.tableHideDetails').addClass('visible');
        });
        $('.tableHead .tableHideDetails').click(function () {
            var $ele = $(this).closest('.tableHead').next();
            $ele.stop(true).slideUp('slow');
            $(this).removeClass('visible').siblings('.tableShowDetails').removeClass('hidden');
        });

        //SLICK CAROUSEL INSPIRATION
        $(".item-list .inspirations-list").slick({
            arrows: true,
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            prevArrow: "<input type='button' class='prev' value='<' />",
            nextArrow: "<input type='button' class='next' value='>' />",
            responsive: [
			  {
			      breakpoint: 600,
			      settings: {
			          slidesToShow: 2,
			          slidesToScroll: 2
			      }
			  },
			  {
			      breakpoint: 480,
			      settings: {
			          slidesToShow: 1,
			          slidesToScroll: 1
			      }
			  }
            ]
        });


        //PRODUCT PAGE - PRODUCT VARIANTS SECTION - SHOW/HIDE SPECIFICATION
        var $variantExpandButtons = $('#product_variants table td a.specyfication');
        $variantExpandButtons.click(function (e) {
            e.preventDefault();
            var $this = $(this),
                $details = $this.closest('tr').next().find('td > div');
            if (!$this.hasClass('expanded')) {
                $variantExpandButtons.filter('.expanded').click();
            }
            $this.toggleClass('expanded');
            $details.stop(true).slideToggle('slow');
        });

        //PRODUCT PAGE - PRODUCT VARIANTS SECTION - SET MIN-HEIGHT TO HORIZONTALLY ALIGN ROWS
        var $subsectionCont = $('#product_variants table td.Subsection > div');
        setTimeout(function () {
            $(window).on('resize.productVariantsSameHeights', function () {
                $subsectionCont.show();

                var $first,
                    $subsectionRows = $('#product_variants table td.Subsection');
                $subsectionRows.find('span').css('width', '');
                $subsectionRows.each(function () {
                    var $subsectionItems = $('li', this);
                    $subsectionItems.css('min-height', '').each(function (i, e) {
                        if (i % 2 != 0) {
                            return true;
                        }
                        var $this = $(e),
                            $next = $this.next();
                        if ($this.css('float') != 'left') {
                            return false;
                        }
                        $this.add($next).css('min-height', Math.max($this.outerHeight(), $next.outerHeight()) + 'px');

                        /*if (!$next.length) {
	                        var $first = $subsectionItems.eq(0);
	                        setTimeout(function () {
	                            $this.addClass('full-width');
	                            $('span:eq(0)', $this).width($first.find('span:eq(0)').width());
	                            $('span:eq(1)', $this).width($first.find('span:eq(1)').width());
	                        }, 0);
                        }*/
                    });
                });

                $subsectionCont.each(function () {
                    var $this = $(this);
                    if (!$this.closest('tr').prev().find('a.expanded').length) {
                        //setTimeout(function () {
                        $this.hide();
                        //}, 0);
                    }
                });
            }).trigger('resize.productVariantsSameHeights');
        }, 0);

    	/* STYLE INPUT FILE */
		(function ($) {

			// Browser supports HTML5 multiple file?
			var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
				isIE = /msie/i.test(navigator.userAgent);

			$.fn.customFile = function () {

				return this.each(function () {

					var $file = $(this).addClass('custom-file-upload-hidden'), // the original file input
						$wrap = $('<div class="file-upload-wrapper">'),
						$input = $('<input type="text" class="file-upload-input" />'),
						// Button that will be used in non-IE browsers
						$button = $('<button type="button" class="file-upload-button">' + $selectInputTextFromDirectory + '</button>'),
						// Hack for IE
						$label = $('<label class="file-upload-button" for="' + $file[0].id + '">' + $selectInputTextFromDirectory + '</label>');

					// Hide by shifting to the left so we
					// can still trigger events
					$file.css({
						position: 'absolute',
						left: '-9999px'
					});

					$wrap.insertAfter($file)
					  .append($file, $input, (isIE ? $label : $button));

					// Prevent focus
					$file.attr('tabIndex', -1);
					$button.attr('tabIndex', -1);

					$button.click(function () {
						$file.focus().click(); // Open dialog
					});

					$file.change(function () {

						var files = [], fileArr, filename;

						// If multiple is supported then extract
						// all filenames from the file array
						if (multipleSupport) {
							fileArr = $file[0].files;
							for (var i = 0, len = fileArr.length; i < len; i++) {
								files.push(fileArr[i].name);
							}
							filename = files.join(', ');

							// If not supported then just take the value
							// and remove the path to just show the filename
						} else {
							filename = $file.val().split('\\').pop();
						}

						$input.val(filename) // Set the value
						  .attr('title', filename) // Show filename in title tootlip
						  .focus(); // Regain focus

					});

					$input.on({
						blur: function () { $file.trigger('blur'); },
						keydown: function (e) {
							if (e.which === 13) { // Enter
								if (!isIE) { $file.trigger('click'); }
							} else if (e.which === 8 || e.which === 46) { // Backspace & Del
								// On some browsers the value is read-only
								// with this trick we remove the old input and add
								// a clean clone with all the original events attached
								$file.replaceWith($file = $file.clone(true));
								$file.trigger('change');
								$input.val('');
							} else if (e.which === 9) { // TAB
								return;
							} else { // All other keys
								return false;
							}
						}
					});
				});
			};

			// Old browser fallback
			if (!multipleSupport) {
				$(document).on('change', 'input.customfile', function () {

					var $this = $(this),
						// Create a unique ID so we
						// can attach the label to the input
						uniqId = 'customfile_' + (new Date()).getTime(),
						$wrap = $this.parent(),

						// Filter empty input
						$inputs = $wrap.siblings().find('.file-upload-input')
						  .filter(function () { return !this.value }),

						$file = $('<input type="file" id="' + uniqId + '" name="' + $this.attr('name') + '"/>');

					// 1ms timeout so it runs after all other events
					// that modify the value have triggered
					setTimeout(function () {
						// Add a new input
						if ($this.val()) {
							// Check for empty fields to prevent
							// creating new inputs when changing files
							if (!$inputs.length) {
								$wrap.after($file);
								$file.customFile();
							}
							// Remove and reorganize inputs
						} else {
							$inputs.parent().remove();
							// Move the input so it's always last on the list
							$wrap.appendTo($wrap.parent());
							$wrap.find('input').focus();
						}
					}, 1);

				});
			}
		}(jQuery));

		$('.scfFileUploadGeneralPanel input[type=file]').customFile();

		//BLOCK CHARACTER IN SEARCH INPUT
		$(function () {
			$('body').on('keydown', '#Menu_SearchTextBox', function (e) {
				var currentChars = this.value;
				var enteredChar = e.key;
				var forbiddenChars = "!@#$%^&*(){}[]<>.?/;'\",|\\-_+= ";
				var isCharForbidden = forbiddenChars.indexOf(enteredChar) !== -1;

				return !((isCharForbidden && e.target.selectionStart === 0) ||
						 (isCharForbidden && currentChars.slice(-1) === enteredChar));
			});
		});

    	//$(function () {
		//	$('body').on('keydown', '#Menu_SearchTextBox', function (e) {
		//		console.log(e.which);
		//		var tab = [32, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 59, 61, 106, 107, 109, 110, 111, 173, 188, 190, 191, 219, 220, 221, 222]
		//		if (tab.indexOf(e.which) !== -1 && e.target.selectionStart === 0) {
		//			return false;
		//		}
		//	});
		//});
    });

    //HIDE ARROWS IN JCAROUSEL IF EXIST ONE PICTURE
    var imageCount = $('.product-slide-wraper').length;
    if (imageCount === 0) {
        $('.product-content .prev, .product-content .next').hide();
    }
	0
    if ($('.googleMap.googleMapNew .filterZip').length === 0) {
        $('.googleMap.googleMapNew .filterCity').css('float', 'left');
        $('.googleMap.googleMapNew .panel .selectStyle').css({
            'margin-left': '0'
        });
    } else {
        $('.googleMap.googleMapNew .filterCity').css('');
        $('.googleMap.googleMapNew .panel .selectStyle').css('');
        $('.googleMap.googleMapNew .panel .filterCity span:nth-of-type(2)').css('');
    }

    // $(".item-list .tips-list li .desc").dotdotdot({
    // 	// Options go here
    // 	watch: "window",
    // 	truncate: "word"
    // });

    if ($(window).width() >= 768 && $(window).width() <= 979) {
    	setTimeout(function () {
    		$('#Menu_search').addClass('shortSearch');
    	}, 100);
    }
    // redirect popup for pozzi
    $(document).ready(function () {
        if (window.location.hostname.indexOf("pozzi") !== -1 && !sessionStorage.getItem('popupRedirect')) {
            $("body").append("<div class='fullscreen-container'>\
                <div class='popupRedirect' id='redirectPopup'>\
                    <p>Pozzi-Ginori è oggi Geberit. <br> Tecnica e know how, design e funzionalità tutto sotto un unico marchio.<br> <a href='https://www.geberit.it/'><img alt='Geberit IT' src='-/media/9b01d5b9c64043e88f815e88b819ef9f.ashx' /></a></p>\
                    <a href='#' class='close'>x</a>\
                </div>\
            </div>");
            $('.close').click(function(e) {
                e.preventDefault();
                $('.fullscreen-container').hide();
                sessionStorage.setItem('popupRedirect', true);
            });
        }
    });
    // Wheretobuy button
    $( "li.whereToBuyButton" ).click(function() {
        $( "div.bb-widget, div.legalText" ).toggle( "slow" );
        $( this ).toggleClass( "active" );
    });
    var tableinterval = setInterval(function () {
        if ( $("div.bb-table").length > 0 ) {
            $("li.whereToBuyButton, li.buyStationaryLink").css("display", "block");
            clearInterval(tableinterval);
        }
    },500);
})(jQuery);
