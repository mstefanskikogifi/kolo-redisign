autoCompleteCallback = function () { };

(function ($) {
    Filtration = {
        //settings
        settings: {
            serviceUrl: "/Handlers/ProductsFilter.asmx/GetData",
            type: "POST"
        },

        filtersType: [
            {
                type: "Slider",
                container: $(".zip-filter"),
                value: null
            },
            {
                type: "List",
                container: $(".MISSINGFILTER"),
                value: null
            },
            {
                type: "Checkbox",
                container: $(".checkboxes, .color-filter>div"),
                value: null
            },
            {
                type: "orderby",
                container: $(".sortby-select"),
                value: null
            }
        ],

        data: {
            Filters: [],
            ProductItems: [],
            Categories: [],
            PagerSettings: {
                CurrentPage: 1,
                FilteredItems: 0,
                ItemsPerPage: 4,
                ToSkip: 0,
                TotalItems: 1,
                TotalPages: 0
            },
            SubcategoryName: "",
            CategoryName: "",
            ActiveFilter: "",
            FullCategoryName: "",
            ProductCategoryMessage: "",
            Sliders: [],
            SortSettings: {
                Order: -1
            }
        },

        clearBtn: false,

        //init function
        init: function (settings) {
            this.settings = settings;
        },

        start: function () {
            Filtration.sortByEvent();
            this.getFiltersState();
            this.getPageState();
            this.clearBtnEvent();
            //this.markerRender(Filtration.data);

            //Filtration.paginationEvent();
        },

        showLoader: function () {
            $(
                '<div class="popup-wraper filtration-popup"><div class="loader"></div></div>'
            ).appendTo("body");
        },

        hideLoader: function () {
            $(".popup-wraper").remove();
        },

        paginationRender: function () {
            var mobile = false;
            if (
                /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
                    navigator.userAgent.toLowerCase()
                )
            ) {
                mobile = true;
            }

            if (
                this.data.PagerSettings.ItemsPerPage <
                this.data.PagerSettings.TotalItems &&
                !mobile
            ) {
                $(".loadMoreContener").addClass("hide");
                var NewPagination = $(".itemsPgnTemp")
                    .clone()
                    .removeClass("itemsPgnTemp")
                    .removeClass("hide")
                    .addClass("itemsPgn");

                if ($(".itemsPgn").length > 0) {
                    $(".itemsPgn").removeClass("hide");
                } else {
                    NewPagination.insertBefore($(".itemsPgnTemp"));
                }

                if (window.location.pathname.indexOf("?") == -1) {
                    var url = window.location.pathname;
                    if (typeof window.history.pushState != "undefined") {
                        window.history.pushState("object or string", "Title", url);
                    }
                } else {
                    var url = window.location.pathname.substring(
                        0,
                        window.location.pathname.indexOf("?")
                    );
                }

                if (url.slice(-1) == "/") {
                    url = url.slice(0, -1);
                }
                var nxt = NewPagination.find(".nxt").clone();

                var TotalPages = Math.ceil(
                    this.data.PagerSettings.TotalItems /
                    this.data.PagerSettings.ItemsPerPage
                );
                var PgnItem = NewPagination.find(".normal").clone();

                $(".itemsPgn")
                    .find(".normal")
                    .remove();
                $(".itemsPgn")
                    .find(".current")
                    .remove();
                $(".itemsPgn")
                    .find(".prv")
                    .remove();
                if ($(".itemsPgn").find(".nxt").length == 0) {
                    nxt.attr("href", url + "?Page=" + 2);
                    nxt.appendTo($(".itemsPgn p"));
                } else {
                    $(".itemsPgn")
                        .find(".nxt")
                        .attr("href", url + "?Page=" + 2);
                }

                var isDots = false;
                for (var i = 0; i < TotalPages; i++) {
                    var NewItem = PgnItem.clone().html(i + 1);

                    if (i + 1 == 1) {
                        NewItem.removeClass("normal")
                            .addClass("current")
                            .attr("href", "#");
                        NewItem.insertBefore($(".itemsPgn").find(".nxt"));
                    } else {
                        if (TotalPages < 6 || i + 1 == 2 || i + 1 == 2) {
                            NewItem.attr("href", url + "?Page=" + (i + 1));
                            NewItem.insertBefore($(".itemsPgn").find(".nxt"));
                        } else if (!isDots) {
                            NewItem.html("...");
                            NewItem.attr("href", url + "?Page=" + (i + 1));
                            isDots = true;
                            NewItem.insertBefore($(".itemsPgn").find(".nxt"));
                        } else if (i + 1 == TotalPages) {
                            NewItem.attr("href", url + "?Page=" + (i + 1));
                            NewItem.insertBefore($(".itemsPgn").find(".nxt"));
                        }
                    }
                }
            } else if (
                this.data.PagerSettings.ItemsPerPage <
                this.data.PagerSettings.TotalItems &&
                mobile
            ) {
                $(".itemsPgn").addClass("hide");
                if (window.location.pathname.indexOf("?") == -1) {
                    var url = window.location.pathname;

                    if (typeof window.history.pushState != "undefined") {
                        window.history.pushState("object or string", "Title", url);
                    }
                } else {
                    var url = window.location.pathname.substring(
                        0,
                        window.location.pathname.indexOf("?")
                    );

                    if (typeof window.history.pushState != "undefined") {
                        window.history.pushState("object or string", "Title", url);
                    }
                }

                if ($(".loadMoreContener").length > 0) {
                    $(".loadMoreContener")
                        .removeClass("hide")
                        .find("a")
                        .attr("href", url + "?Page=2");
                } else {
                    var text = $(".lmText").attr("data-lmText");
                    $(
                        '<div class="loadMoreContener"><a href="' +
                        url +
                        '?Page=2" class="button LoadMore">' +
                        text +
                        "</a></div>"
                    ).insertBefore($(".itemsPgnTemp"));
                }
            } else {
                $(".itemsPgn").addClass("hide");
                $(".loadMoreContener").addClass("hide");
                //var url = $('.itemsPgn .normal').attr('href').substring(0, $('.itemsPgn .normal').attr('href').indexOf('?'));
                //console.log(url);
                var url = window.location.pathname;

                if (typeof window.history.pushState != "undefined") {
                    if (url.slice(-1) != "/") {
                        url = url + "/";
                    }
                    window.history.pushState("object or string", "Title", url);
                }
            }
        },

        markerRender: function (data) {
            data = data || Filtration.data;
            filtersData = data.Filters; // || Filtration.data.Filters;
            slidersData = data.Sliders; // || Filtration.data.Sliders;
            var $markerWrap = $(".filters .markers");
            if (!$markerWrap.length) {
                return;
            }
            $markerWrap.empty();

            function getFilterField(filterName, fieldId, type) {
                type = type || "checkbox";
                switch (type) {
                    case "checkbox":
                        return $(
                            '.filters .checkboxes[filtername="' +
                            filterName +
                            '"] input.filterId[value="' +
                            fieldId +
                            '"]'
                        ).closest("li");
                        break;
                    case "slider":
                        return $('.filters li[filtername="' + filterName + '"]');
                        break;
                }
            }

            if (filtersData) {
                for (i = 0; i < filtersData.length; i++) {
                    var filterData = filtersData[i],
                        filterName = filterData.Name;

                    for (j = 0; j < filterData.Items.length; j++) {
                        var item = filterData.Items[j];
                        if (!item.IsChecked) {
                            continue;
                        }

                        var id = item.Id,
                            label = getFilterField(filterName, id)
                                .find("label")
                                .text()
                                .trim();
                        $marker = $(
                            '<div class="marker-item button">' +
                            label +
                            '<a href="#" class="close">&times;</a></div>'
                        ).data("filterData", {
                            name: filterName,
                            fieldId: id,
                            type: "checkbox"
                        });
                        $markerWrap.append($marker);
                    }
                }
            }

            if (slidersData) {
                for (i = 0; i < slidersData.length; i++) {
                    var sliderData = slidersData[i],
                        filterName = sliderData.Name;

                    if (
                        sliderData.Min != sliderData.SelectedMin ||
                        sliderData.Max != sliderData.SelectedMax
                    ) {
                        //  var id = item.Id,
                        label = getFilterField(filterName, null, "slider")
                            .find("h3")
                            .contents()
                            .get(0)
                            .nodeValue.replace(":", "")
                            .trim();
                        $marker = $(
                            '<div class="marker-item button">' +
                            label +
                            '<a href="#" class="close">&times;</a></div>'
                        ).data("filterData", {
                            name: filterName,
                            type: "slider",
                            sliderMin: sliderData.Min,
                            sliderMax: sliderData.Max
                        });
                        $markerWrap.append($marker);
                    }
                }
            }

            $(".close", $markerWrap).on("click", function (e) {
                var $this = $(this).closest(".marker-item");
                e.preventDefault();
                $this.hide();
                var filterData = $this.data("filterData");
                var $filterField = getFilterField(
                    filterData.name,
                    filterData.fieldId,
                    filterData.type
                );
                if (filterData.type == "checkbox") {
                    $filterField
                        .find("label")
                        .click()
                        .closest(".checkboxes-content")
                        .find("button.apply")
                        .click();
                } else if (filterData.type == "slider") {
                    var $slider = $filterField.find(".ui-slider:first");
                    $slider.slider("values", [
                        filterData.sliderMin,
                        filterData.sliderMax
                    ]);
                    $slider.slider("option", "slide").call($slider, null, {
                        handler: $slider,
                        values: $slider.slider("values")
                    });
                    $slider.slider("option", "stop").call($slider, null, {
                        handler: $slider,
                        values: $slider.slider("values")
                    });
                }
                //Filtration.startFiltration();
            });

            //HIDE MARKERS TITLE IF ITEM NO EXIST
            if (
                $(".subcategories-page .filters .clearBtn.button").css("display") ===
                "none"
            ) {
                $(".filters .markers-wrap .markers-title").css("display", "none");
            } else {
                $(".filters .markers-wrap .markers-title").css("display", "table-cell");
            }
            //END
        },

        showProductResults: function (data) {
            this.data.ProductItems = data.ProductItems;
            //console.log(this.data)
            var prodTemp = $(".product-list .temp").clone();
            $(".product-list li").remove();

            $.each(this.data.ProductItems, function (index, data) {
                var newItem = prodTemp
                    .clone()
                    .removeClass("temp")
                    .removeClass("hide");
                newItem.find("a").attr("href", data.Url);
                newItem.find("img").attr("src", data.Img);
                newItem.find("img").attr("alt", data.Name);
                newItem.find("img").attr("width", "255");
                newItem.find("img").attr("height", "205");
                var img = newItem.find("img");

                var swiperContainer = document.createElement("div");
                swiperContainer.className = "swiper-container";

                if (data.SwiperIsOnValue) {
                    swiperContainer.style.display = "block";
                }

                var swiperWrapper = document.createElement("div");
                swiperWrapper.className = "swiper-wrapper";

                swiperContainer.append(swiperWrapper);

                var swiperSlide = document.createElement("div");

                swiperSlide.className = "swiper-slide";

                if (data.Colors) {
                    if (data.Colors.length > 0) {
                        data.Colors.forEach(function (colorVariant) {
                            var swiperSlide = document.createElement("div");
                            swiperSlide.className = "swiper-slide";

                            var imgVariantMain = document.createElement("img");
                            imgVariantMain.src = colorVariant.ImageUrl;
                            imgVariantMain.setAttribute('alt', colorVariant.ImageAlt);
                            //console.log(colorVariant.ImageAlt);
                            imgVariantMain.setAttribute('title', colorVariant.ColourText);
                            //console.log(colorVariant.ColourText);
                            //imgVariantMain.alt = colorVariant.ImageAlt;

                            swiperSlide.append(imgVariantMain);
                            swiperWrapper.append(swiperSlide);
                        });
                    }
                }

                var swiperSlides = swiperContainer.querySelectorAll(".swiper-slide");
                var swiperNext = document.createElement("div");
                var swiperPrev = document.createElement("div");
                swiperNext.className = "swiper-button-next";
                swiperPrev.className = "swiper-button-prev";

                swiperContainer.append(swiperNext);
                swiperContainer.append(swiperPrev);

                if (window.innerWidth > 1024) {
                    if (swiperSlides.length <= 4) {
                        swiperNext.style.display = "none";
                        swiperPrev.style.display = "none";
                    }
                } else {
                    if (swiperSlides.length <= 3) {
                        swiperNext.style.display = "none";
                        swiperPrev.style.display = "none";
                    }
                }

                swiperSlides.forEach(function (slide) {
                    setTimeout(function () {
                        if (slide.closest("li")) {
                            slide.closest("li").classList.add("li-swiper");
                        }
                    }, 1000);

                    slide.addEventListener("mouseover", function (event) {
                        slide.querySelector("img").style.transform = "scale(1.2)";
                    });
                    slide.addEventListener("mouseout", function (event) {
                        slide.querySelector("img").style.transform = "scale(1)";
                    });
                    slide.addEventListener("click", function (event) {
                        event.preventDefault();
                    });
                });

                img.after(swiperContainer);

                if (data.NewProductIconTag) {
                    newItem.find("img").after(data.NewProductIconTag);
                }

                newItem.find(".prodName").text(data.Name);
                newItem.find(".longDescription").html(data.Desc);
                newItem.find(".my-list-handler").attr("data-productId", data.ItemName);
                //if (data.Price.length > 0) {
                //    var priceText = newItem.find('.priceWrap').find('.price').text();
                //    newItem.find('.priceWrap').removeClass('hide').find('.price').text(priceText + data.Price);
                //}
                //if (data.Code.length > 0) {
                //    var codeText = newItem.find('.codeWrap').find('.code').text();
                //    newItem.find('.codeWrap').removeClass('hide').find('.code').text(codeText + data.Code);
                //}
                if (data.LeftValue != null && data.LeftValue.length > 0) {
                    newItem
                        .find(".priceWrap")
                        .removeClass("hide")
                        .find(".price")
                        .text(data.LeftLabel + " " + data.LeftValue);
                }

                if (
                    data.RightValue != null &&
                    data.RightValue.length > 0 &&
                    data.RightLabel != null &&
                    data.RightLabel.length > 0
                ) {
                    newItem
                        .find(".codeWrap")
                        .removeClass("hide")
                        .find(".code")
                        .text(data.RightLabel + " " + data.RightValue);
                }
                newItem.appendTo($(".product-list"));
            });
            prodTemp.appendTo($(".product-list"));

            var swp = document.querySelectorAll(".swiper-container");
            //console.log(data)
            if (this.data.ProductItems[0].SwiperIsOnValue) {
                swp.forEach(function (swiperInstance) {
                    swiperInstance.style.display = "block";
                    var swiper = new Swiper(swiperInstance, {
                        slidesPerView: 4,
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev"
                        },
                        breakpoints: {
                            1024: {
                                slidesPerView: 3
                            },
                            480: {
                                slidesPerView: 2
                            }
                        },
                        centerInsufficientSlides: true
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
                        if (swiperSlides.length <= 3) {
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
                        // slide.addEventListener( 'click', function ( event ) {
                        //     event.preventDefault();
                        //     var product = slide.closest( 'a' );
                        //     if ( product ) {
                        //         product.href = slide.dataset.url;
                        //         var productImage = product.querySelector( 'img' );
                        //         var text = product.querySelector( '.text p' );
                        //         var code = product.querySelector( '.code' );
                        //         var price = product.querySelector( '.price' );
                        //         var size = product.querySelector( '.size' );
                        //         if ( productImage ) {
                        //             productImage.src = slide.dataset.img;
                        //         }

                        //         if ( text ) {
                        //             text.textContent = slide.dataset.text;
                        //         }

                        //         if ( code ) {
                        //             code.textContent = slide.dataset.code;
                        //         }

                        //         if ( price ) {
                        //             price.textContent = slide.dataset.price;
                        //         }

                        //         if ( size ) {
                        //             size.textContent = slide.dataset.size;
                        //         }
                        //     }
                        // } );
                    });
                });
            }


        },

        showCategoryResults: function (data) {
            this.data.Categories = data.Categories;
            var CategoryTemp = $(".simple-sliderTemp").clone();
            $(".categories-contener .simple-slider").remove();

            $.each(this.data.Categories, function (index, Category) {
                var NewCategory = CategoryTemp.clone()
                    .removeClass("hide")
                    .removeClass("simple-sliderTemp")
                    .addClass("simple-slider");
                NewCategory.attr("id", "newCarousel" + index);
                NewCategory.find(".catName").html(Category.Name);

                var TempItem = NewCategory.find("li").clone();
                NewCategory.find("li").remove();

                $.each(Category.Items, function (i, Item) {
                    var NewItem = TempItem.clone();
                    NewItem.find("a").attr("href", Item.Url);
                    NewItem.find("img").attr(
                        "src",
                        Item.Img + NewItem.find("img").attr("src")
                    );
                    NewItem.find(".text p").html(Item.Name);

                    NewItem.appendTo(NewCategory.find(".simple-slider-list"));
                });

                NewCategory.insertBefore(".simple-sliderTemp");
            });
            GlobalMethod.LitteCarousel();
        },

        makeRequest: function () {
            //console.log("req");
            this.showLoader();
            var d = {};
            this.data.Categories = [];
            this.data.ProductItems = [];
            d.data = this.data;
            $.ajax({
                type: this.settings.type,
                url: this.settings.serviceUrl,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(d),
                async: true,
                success: function (data, textStatus, jqXHR) {
                    //error
                    Filtration.data = data.d;
                    Filtration.setFiltersState(data.d);
                    Filtration.setPageState(data.d);

                    if ($(".categories-page").length > 0) {
                        Filtration.showCategoryResults(data.d);
                    } else {
                        //console.log(data.d);
                        Filtration.showProductResults(data.d);
                        Filtration.paginationRender();
                        Filtration.markerRender(data.d);
                    }
                    Filtration.hideLoader();
                    $(".ui-slider").slider("enable");
                    if ($("body").hasClass("myListVisible")) {
                        clipboard.init(); //update basket data
                    }
                },
                error: function () {
                    Filtration.hideLoader();
                    $(".ui-slider").slider("enable");
                }
            });
        },

        getFiltersState: function () {
            //clear filters
            this.data.Filters = [];
            this.data.Sliders = [];
            this.clearBtn = false;
            var filterName = "";
            var currentFilter = {
                Name: "",
                FilterType: ""
            };

            $.each(this.filtersType, function (index, item) {
                $(item.container.selector).each(function (i, contener) {
                    //checkbox filter
                    if (item.type == "Checkbox") {
                        var inputs = $(contener).find(".filterItem input");
                        if ($(contener).hasClass("activeFilter")) {
                            $(contener).removeClass("activeFilter");
                            Filtration.data.ActiveFilter = $(contener).attr("filtername");
                        }

                        $.each(inputs, function (i, itm) {
                            var input = $(itm);
                            if (input.length > 0) {
                                if (currentFilter.Name.length <= 0) {
                                    currentFilter = {
                                        FilterType: "Checkbox",
                                        Id: null,
                                        IsDisabled: false,
                                        Name: $(contener).attr("filtername"),
                                        Items: []
                                    };
                                } else if (
                                    currentFilter.Name != $(contener).attr("filtername") ||
                                    currentFilter.FilterType != item.type
                                ) {
                                    Filtration.data.Filters.push(currentFilter);
                                    currentFilter = {
                                        FilterType: "Checkbox",
                                        Id: null,
                                        IsDisabled: false,
                                        Name: $(contener).attr("filtername"),
                                        Items: []
                                    };
                                }
                                currentFilter.Items.push({
                                    Id: input
                                        .parent()
                                        .parent()
                                        .find(".filterId")
                                        .val(),
                                    IsChecked: input.is(":checked"),
                                    IsDisabled: input.prop("disabled")
                                });
                                if (input.is(":checked")) {
                                    Filtration.clearBtn = true;
                                }
                            }
                        });

                        //slider filters
                    } else if (item.type == "Slider") {
                        if (currentFilter.Name.length > 0) {
                            Filtration.data.Filters.push(currentFilter);
                            currentFilter = {
                                Name: "",
                                FilterType: ""
                            };
                        }

                        if ($(contener).hasClass("activeFilter")) {
                            $(contener).removeClass("activeFilter");
                            Filtration.data.ActiveFilter = $(contener).attr("filtername");
                        }

                        var filter = {
                            Name: $(contener).attr("filterName"),
                            Max: parseInt(
                                $(contener)
                                    .find(".ui-slider")
                                    .attr("data-max")
                            ),
                            Min: parseInt(
                                $(contener)
                                    .find(".ui-slider")
                                    .attr("data-min")
                            ),
                            SelectedMax: parseInt(
                                $(contener)
                                    .find(".currentMax")
                                    .val()
                            ),
                            SelectedMin: parseInt(
                                $(contener)
                                    .find(".currentMin")
                                    .val()
                            )
                        };

                        Filtration.data.Sliders.push(filter);

                        if (
                            filter.Max != filter.SelectedMax ||
                            filter.Min != filter.SelectedMin
                        ) {
                            Filtration.clearBtn = true;
                        }

                        //select filters
                    } else if (item.type == "List") {
                        //TODO:
                    }
                });
            });

            if (currentFilter.Name.length > 0) {
                Filtration.data.Filters.push(currentFilter);
            }

            if (Filtration.clearBtn) {
                $(".clearBtn").show();
            } else {
                $(".clearBtn").hide();
            }

            //this.makeRequest();
        },

        getPageState: function () {
            this.data.SortSettings.Order = $(".sortby-select select").val();
            this.data.PagerSettings.ItemsPerPage = $(".product-list").attr(
                "data-itemperpage"
            );

            //if ($('.itemsPgn .current').length > 0) {
            //    this.data.PagerSettings.CurrentPage = $('.itemsPgn .current').text();
            //} else {
            this.data.PagerSettings.CurrentPage = 1;
            //}

            if ($(".itemsPgn").length > 0) {
                this.data.PagerSettings.IsPagination = true;
            } else {
                this.data.PagerSettings.IsPagination = false;
            }

            if ($(".product-list").length > 0) {
                this.data.SubcategoryName = $(".product-list").attr("data-categories");
                this.data.CategoryName = $(".product-list").attr("data-category");
                this.data.FullCategoryName = $(".product-list").attr(
                    "data-fullcategoryname"
                );
                this.data.ProductCategoryMessage = $(".product-list").attr(
                    "data-productcategorymessage"
                );
            }

            if (
                $(".products-filters-header span")
                    .text()
                    .replace(/ /g, "")
                    .split(":")
                    .reverse()[0] == 0
            ) {
                $(".products-filters-header span").html($(".noResult").html());
            }
        },

        setFiltersState: function (data) {
            $.each(data.Filters, function (index, item) {
                if (
                    item.FilterType == "Checkbox" &&
                    $('*[filtername="' + item.Name + '"]').length > 0
                ) {
                    var contener = $('*[filtername="' + item.Name + '"]');

                    $.each(item.Items, function (i, filter) {
                        var currentFilter = $('input[value="' + filter.Id + '"]')
                            .parent()
                            .find('input[type="checkbox"]');
                        var disabledClass = "disable-checkbox";
                        var checkedClass = "ez-checked";
                        var parent = currentFilter.parent();

                        if (
                            currentFilter
                                .parent()
                                .parent()
                                .hasClass("color-choice")
                        ) {
                            disabledClass = "disabled-color";
                            checkedClass = "active";
                            var parent = currentFilter.parent().parent();
                        }

                        if (filter.IsChecked) {
                            currentFilter.attr("checked", "checked");
                            parent.addClass(checkedClass);
                        } else {
                            currentFilter.attr("checked", false);
                            parent.removeClass(checkedClass);
                        }

                        if (filter.IsDisabled) {
                            currentFilter.attr("disabled", "disabled");
                            currentFilter
                                .parent()
                                .parent()
                                .addClass(disabledClass);
                        } else {
                            currentFilter.attr("disabled", false);
                            currentFilter
                                .parent()
                                .parent()
                                .removeClass(disabledClass);
                        }
                    });
                } else if (item.FilterType == "List") {
                    //TO DO
                }
            });

            $.each(data.Sliders, function (index, item) {
                var currentFilter = $('*[filtername="' + item.Name + '"]').find(
                    ".ui-slider"
                );
                //currentFilter.slider("values", 0, item.SelectedMin);
                //currentFilter.slider("values", 1, item.SelectedMax);
                //currentFilter.slider("option","values", [item.SelectedMin, item.SelectedMax])
                //currentFilter.trigger('change');
                currentFilter.slider({ max: item.Max, min: item.Min });
                currentFilter.attr("data-maximummin", item.MaximumMin);
                currentFilter.attr("data-minimummax", item.MinimumMax);
                currentFilter
                    .parent()
                    .find(".Min")
                    .val(item.Min);
                currentFilter
                    .parent()
                    .find(".Max")
                    .val(item.Max);
                currentFilter
                    .parent()
                    .find(".currentMin")
                    .val(item.SelectedMin);
                currentFilter
                    .parent()
                    .find(".currentMax")
                    .val(item.SelectedMax);
                currentFilter
                    .parent()
                    .find(".values")
                    .text(item.SelectedMin + "-" + item.SelectedMax);
            });
        },

        setPageState: function (data) {
            $(".sortby-select select").val(data.SortSettings.Order);
            $(".sortby-select li span").removeClass("selected");
            var newValue = $(
                '.sortby-select select option[value="' + data.SortSettings.Order + '"]'
            ).text();
            $('.sortby-select li[id="' + data.SortSettings.Order + '"]')
                .find(" span")
                .addClass("selected");
            //var newValue = $('.sortby-select').find('#' + data.SortSettings.Order + ' span').addClass('selected').text();
            $(".sortby-select .activeSelect")
                .attr("id", data.SortSettings.Order)
                .html(newValue);

            //$('.products-filters-header span').html(data.PagerSettings.TotalItems);
            if (data.PagerSettings.TotalItems === 0) {
                $(".products-filters-header span").html($(".noResult").html());
            } else {
                $(".products-filters-header span").html(data.ProductCategoryMessage);
            }
        },

        sortByEvent: function () {
            $(".sortby-select select").on("change", function (e) {
                e.preventDefault();
                Filtration.startFiltration();
            });
        },

        paginationEvent: function () {
            $(".itemsPgn a").on("click", function (e) {
                e.preventDefault();

                if ($(this).hasClass("current")) {
                    return false;
                }

                if ($(this).hasClass("prv")) {
                    Filtration.data.PagerSettings.CurrentPage -= 1;
                    $(".itemsPgn a.current")
                        .removeClass("current")
                        .prev("a")
                        .addClass("current");
                } else if ($(this).hasClass("nxt")) {
                    Filtration.data.PagerSettings.CurrentPage += 1;
                    $(".itemsPgn a.current")
                        .removeClass("current")
                        .next("a")
                        .addClass("current");
                } else {
                    Filtration.data.PagerSettings.CurrentPage = $(this).text();
                    $(".itemsPgn a.current").removeClass("current");
                    $(this).addClass("current");
                }
                Filtration.startFiltration();
            });
        },

        startFiltration: function () {
            this.getFiltersState();
            this.getPageState();
            this.makeRequest();
        },

        clearFilters: function () {
            $.each(Filtration.data.Filters, function (index, item) {
                $.each(item.Items, function (i, filter) {
                    filter.IsChecked = false;
                    filter.IsDisabled = false;
                });
            });

            $.each(Filtration.data.Sliders, function (index, slider) {
                slider.SelectedMax = slider.Max;
                slider.SelectedMin = slider.Min;

                //walk around - TODO!!!!!!
                var currentZip = $(
                    ".zip-size",
                    $('.zip-filter[filtername="' + slider.Name + '"]')
                );

                currentZip.slider("destroy");
                var min = parseInt(currentZip.attr("data-min"));
                var max = parseInt(currentZip.attr("data-max"));
                var step = parseInt(currentZip.attr("data-step"));
                var currentMax = slider.Max; //parseInt(currentZip.parent().find('#CurrentDataMax').val());
                var currentMin = slider.Min; //parseInt(currentZip.parent().find('#CurrentDataMin').val());

                if (currentMax <= 0) currentMax = max;
                var slider = currentZip;
                currentZip.slider({
                    range: true,
                    min: min,
                    max: max,
                    step: step,
                    values: [currentMin, currentMax],
                    slide: function (event, ui) {
                        var maximumMin = parseInt(slider.attr("data-maximummin"));
                        var minimumMax = parseInt(slider.attr("data-minimummax"));

                        if (
                            maximumMin > -1 &&
                            maximumMin < ui.values[0] &&
                            ui.values[0] == ui.value
                        ) {
                            $(ui.handle)
                                .parent()
                                .slider("values", 0, maximumMin);
                            slider
                                .parent()
                                .find(".values")
                                .html(maximumMin + " - " + ui.values[1]);
                            slider
                                .parent()
                                .find("#Min")
                                .val(maximumMin);
                            slider
                                .parent()
                                .find("#Max")
                                .val(ui.values[1]);
                            return false;
                        }

                        if (
                            minimumMax > -1 &&
                            minimumMax > ui.values[1] &&
                            ui.values[1] == ui.value
                        ) {
                            $(ui.handle)
                                .parent()
                                .slider("values", 1, minimumMax);
                            slider
                                .parent()
                                .find(".values")
                                .html(ui.values[0] + " - " + minimumMax);
                            slider
                                .parent()
                                .find("#Min")
                                .val(ui.values[0]);
                            slider
                                .parent()
                                .find("#Max")
                                .val(minimumMax);
                            return false;
                        }

                        slider
                            .parent()
                            .find(".values")
                            .html(ui.values[0] + " - " + ui.values[1]);
                        slider
                            .parent()
                            .find("#Min")
                            .val(ui.values[0]);
                        slider
                            .parent()
                            .find("#Max")
                            .val(ui.values[1]);
                    },
                    start: function (event, ui) {
                        var makeRequest = false;
                        $(".checkboxes-content").each(function (index, item) {
                            if ($(item).hasClass("change")) {
                                $(item)
                                    .removeClass("change")
                                    .hide();
                                makeRequest = true;
                            }
                        });
                        if (makeRequest) {
                            $(ui.handle)
                                .parent()
                                .slider("disable");
                            Filtration.startFiltration();
                            //ui.slider('disable');
                        }
                    },
                    stop: function (event, ui) {
                        if (!$(ui.handle).hasClass("ui-state-hover")) {
                            $(ui.handle)
                                .parent()
                                .find(".ui-slider-range")
                                .removeClass("rightActive")
                                .removeClass("leftActive");
                        }

                        //call ajax filter enable/disable
                        //productFilters();
                        $(ui.handle)
                            .parent()
                            .parent()
                            .addClass("activeFilter");
                        $(ui.handle)
                            .parent()
                            .slider("disable");
                        Filtration.startFiltration();
                    }
                });
                currentZip
                    .parent()
                    .find(".values")
                    .html(
                        currentZip.slider("values", 0) +
                        " - " +
                        currentZip.slider("values", 1)
                    );
                currentZip
                    .parent()
                    .find("#Min")
                    .val(currentZip.slider("values", 0));
                currentZip
                    .parent()
                    .find("#Max")
                    .val(currentZip.slider("values", 1));

                currentZip.find(".ui-state-default").on("mouseover", function () {
                    var handlers = $(this)
                        .parent()
                        .find(".ui-slider-handle");

                    if (
                        parseInt(
                            $(this)
                                .css("left")
                                .replace("px", "")
                        ) >=
                        parseInt(
                            $(handlers[0])
                                .css("left")
                                .replace("px", "")
                        ) &&
                        parseInt(
                            $(this)
                                .css("left")
                                .replace("px", "")
                        ) >=
                        parseInt(
                            $(handlers[1])
                                .css("left")
                                .replace("px", "")
                        )
                    ) {
                        $(this)
                            .parent()
                            .find(".ui-slider-range")
                            .addClass("rightActive");
                    } else {
                        $(this)
                            .parent()
                            .find(".ui-slider-range")
                            .addClass("leftActive");
                    }
                });
                currentZip.find(".ui-state-default").on("mouseleave", function () {
                    if (!$(this).hasClass("ui-state-active")) {
                        $(this)
                            .parent()
                            .find(".ui-slider-range")
                            .removeClass("rightActive")
                            .removeClass("leftActive");
                    }
                });
            });

            $(".clearBtn").hide();
            $(".button.uncheck").hide();
            $(".button.check").show();
        },

        clearBtnEvent: function () {
            $(".clearBtn").on("click", function (e) {
                e.preventDefault();
                Filtration.data.IsAnyChecked = false;
                Filtration.clearFilters();
                Filtration.setFiltersState(Filtration.data);
                Filtration.markerRender([]);
                Filtration.getPageState();
                Filtration.makeRequest();
                // Filtration.getFiltersState();
            });
        }
    };

    $(document).ready(function () {
        if (
            $(".subcategories-page").length > 0 ||
            $(".categories-page").length > 0
        ) {
            Filtration.start();
        }
    });

    function productFilters() {
        //create queryString
        var filtersList = $(".filters>ul>li");

        if (filtersList.length > 0) {
            var queryString = "";

            var objToServer = {};
            //var objToServer = '';
            var objCounter = 0;
            filtersList.each(function (index, data) {
                var filterName = $(this).attr("filterName");

                //multi-checkbox filter
                if ($(this).hasClass("select-filter")) {
                    var objTemp = {
                        Name: null,
                        Items: {},
                        MaxValue: null,
                        MinValue: null,
                        Type: "MultiSelectFilter"
                    };

                    objTemp.Name = $(this)
                        .find("h3")
                        .attr("filternamee");

                    var itemList = $(this).find('input[type="checkbox"]');
                    var itemCounter = 0;
                    //var templateItems = '';
                    itemList.each(function () {
                        objTemp.Items[itemCounter] = {
                            ItemName: null,
                            IsEditable: false,
                            IsClicked: false,
                            IsSelected: false,
                            Type: "MultiSelectFilter"
                        };

                        objTemp.Items[itemCounter].ItemName = $(this)
                            .parent()
                            .parent()
                            .find("#MultiSelectHidenName")
                            .val();

                        if ($(this).prop("checked") == true) {
                            objTemp.Items[itemCounter].IsSelected = true;
                            if (queryString != "") {
                                queryString += "&";
                            }
                            queryString +=
                                objTemp.Name +
                                "=" +
                                $(this)
                                    .parent()
                                    .parent()
                                    .find("#MultiSelectHidenName")
                                    .val();
                        }
                        //if ($(this).prop('disabled') == true) {
                        //    objTemp.Items[itemCounter].IsEditable = true;
                        //}
                        //if (!$(this).hasClass('disabled')) {
                        //    objTemp.Items[itemCounter].IsEditable = true;
                        //}

                        if (!$(this).prop("disabled")) {
                            objTemp.Items[itemCounter].IsEditable = true;
                        }

                        itemCounter++;
                    });

                    objToServer[objCounter] = objTemp;
                    objCounter++;
                }

                //zip-filter
                else if ($(this).hasClass("zip-filter")) {
                    var objTemp = {
                        Name: null,
                        //Items: {},
                        MaxValue: null,
                        MinValue: null,
                        CurrentMaxValue: null,
                        CurrentMinValue: null,
                        Type: "SliderFilter"
                    };

                    objTemp.Name = $(this)
                        .find("h3")
                        .attr("filternamee");

                    if (queryString != "") {
                        queryString += "&";
                    }
                    var currentMax = $(this)
                        .find("#Max")
                        .val();
                    var currentMin = $(this)
                        .find("#Min")
                        .val();
                    var max = $(this)
                        .find("#CurrentDataMax")
                        .val();
                    var min = $(this)
                        .find("#CurrentDataMin")
                        .val();

                    objTemp.CurrentMaxValue = currentMax;
                    objTemp.CurrentMinValue = currentMin;
                    objTemp.MaxValue = max;
                    objTemp.MinValue = min;
                    //queryString += max.attr('name')+'='+max.val()+'&'+min.attr('name')+'='+min.val();
                    queryString +=
                        objTemp.Name +
                        "_Max=" +
                        currentMax +
                        "&" +
                        objTemp.Name +
                        "_Min=" +
                        currentMin;

                    objToServer[objCounter] = objTemp;
                    objCounter++;
                }

                //color-filter
                else if ($(this).hasClass("color-filter")) {
                    var objTemp = {
                        Name: null,
                        Items: {},
                        MaxValue: null,
                        MinValue: null,
                        Type: "ColorFilter"
                    };

                    objTemp.Name = $(this)
                        .find("h3")
                        .attr("filternamee");
                    var itemList = $(this).find("a");
                    var itemCounter = 0;

                    itemList.each(function () {
                        objTemp.Items[itemCounter] = {
                            ItemName: null,
                            IsEditable: false,
                            IsClicked: false,
                            IsSelected: false
                        };

                        objTemp.Items[itemCounter].ItemName = $(this).attr("data-color");

                        if (
                            $(this)
                                .find('input[type="checkbox"]')
                                .prop("checked") == true
                        ) {
                            objTemp.Items[itemCounter].IsSelected = true;
                            if (queryString != "") {
                                queryString += "&";
                            }
                            //queryString += $(this).find('img').attr('title') + '=true';
                            queryString += objTemp.Name + "=" + $(this).attr("data-color");
                        }

                        //if (!$(this).hasClass('disabled-color')) {
                        //    objTemp.Items[itemCounter].IsEditable = true;
                        //}

                        if (
                            !$(this)
                                .find('input[type="checkbox"]')
                                .prop("disabled")
                        ) {
                            objTemp.Items[itemCounter].IsEditable = true;
                        }

                        itemCounter++;
                    });

                    objToServer[objCounter] = objTemp;
                    objCounter++;
                }
                $(".result").attr("queryString", queryString);
            });
        }

        CallServer(JSON.stringify(objToServer), null);

        var wrapper = $("<div></div>").addClass("filters-preload-wrapper");
        wrapper.appendTo($(".filters"));
        wrapper.clone().appendTo($(".filters li .checkboxes"));
    }

    //set enable/disable filters prop
    function switchFilters(data) {
        $(".filters-preload-wrapper").remove();
        data = JSON.parse(data);
        var disableButton = true;
        var clearButton = false;
        $.each(data, function (index, itemList) {
            var currentFilter = $('h3[filtername="' + itemList.Name + '"]').parent();

            if (currentFilter != undefined) {
                if (currentFilter.hasClass("select-filter")) {
                    $.each(itemList.Items, function (index, item) {
                        var currentItem = $('input[value="' + item.ItemName + '"]');
                        if (!item.IsEditable) {
                            currentItem
                                .parent()
                                .find('input[type="checkbox"]')
                                //.prop('disabled', true);
                                .addClass("disabled")
                                .prop("disabled", "disabled");
                            currentItem.parent().addClass("disable-checkbox");
                        } else {
                            currentItem
                                .parent()
                                .find('input[type="checkbox"]')
                                //.prop('disabled', false);
                                .removeClass("disabled")
                                .prop("disabled", "");
                            currentItem.parent().removeClass("disable-checkbox");
                            disableButton = false;
                        }
                        if (item.IsSelected) {
                            clearButton = true;
                        }
                    });
                }
                //color filter TO DO: all
                else if (currentFilter.hasClass("color-filter")) {
                    $.each(itemList.Items, function (index, item) {
                        var currentColor = $('a[data-color="' + item.ItemName + '"]');

                        if (item.IsEditable == false) {
                            currentColor.addClass("disabled-color");
                            currentColor
                                .find('input[type="checkbox"]')
                                .prop("disabled", true);
                        } else {
                            currentColor.removeClass("disabled-color");
                            currentColor.find('input[type="checkbox"]').prop("disabled", "");
                            disableButton = false;
                        }
                        if (item.IsSelected) {
                            clearButton = true;
                        }
                    });
                }

                //zip filter
                else if (currentFilter.hasClass("zip-filter")) {
                    currentFilter
                        .find(".ui-slider")
                        .slider("values", 0, itemList.CurrentMinValue);
                    currentFilter
                        .find(".ui-slider")
                        .slider("values", 1, itemList.CurrentMaxValue);
                    currentFilter
                        .find(".values")
                        .html(itemList.CurrentMinValue + " - " + itemList.CurrentMaxValue);
                }
            }
        });

        //
        if (disableButton && $("#result").length > 0) {
            $(".filters button.result").prop("disabled", true);
            $(".filters .filters-error-message").show();
        } else {
            $(".filters button.result").prop("disabled", false);
            $(".filters .filters-error-message").hide();
        }

        if (clearButton) {
            $(".filters button.clearBtn").show();
        } else {
            $(".filters button.clearBtn").hide();
        }
    }

    //autocomplete callback function
    var autoCompleteCallbackSeeMore = null;
    function autoCompleteInit(data) {
        var newData = JSON.parse(data);
        var autoComplete = $(".autoComplete");
        var autoCompleteList = $(".autoComplete ul");
        autoComplete.removeClass("isRequest");

        if (!autoCompleteCallbackSeeMore) {
            autoCompleteCallbackSeeMore = autoCompleteList.find("h3 a").html();
        }

        if (newData != null) {
            autoCompleteList.html("");
            $.each(newData, function () {
                var newSection = $("<li></li>");
                var newHeader = $(
                    "<h3>" +
                    this.Name +
                    '<a href="' +
                    this.RedirectUrl +
                    '">' +
                    autoCompleteCallbackSeeMore +
                    " &gt;</a></h3>"
                );
                newHeader.appendTo(newSection);
                $.each(this.Items, function () {
                    var newLink = $(
                        '<a href="' + this.Url + '">' + this.DisplayName + "</a>"
                    );
                    newLink.appendTo(newSection);
                });
                newSection.appendTo(autoCompleteList);
            });
        }

        if ($(".search-term").val().length > 2 || $(".search-term").is("focus")) {
            autoComplete.show();
            if (autoComplete.hasClass("nextRequest")) {
                autoComplete.removeClass("nextRequest");
                CallServerAutocomplete($(".search-term").val());
            }
        } else {
            autoComplete.hide();
        }
    }

    autoCompleteCallback = autoCompleteInit;
})(jQuery);
//Files Upload TEST
//$(function () {
//    $('#dropZone').filedrop({
//        url: '/Handlers/ProductsFilter.asmx/GetImg',
//        paramname: 'files',
//        maxFiles: 5,
//        dragOver: function () {
//            $('#dropZone').css('background', 'blue');
//        },
//        dragLeave: function () {
//            $('#dropZone').css('background', 'gray');
//        },
//        drop: function (e) {
//            $('#dropZone').css('background', 'gray');
//        },
//        afterAll: function () {
//            $('#dropZone').html('The file(s) have been uploaded successfully!');
//        },
//        uploadFinished: function (i, file, response, time) {
//            $('#uploadResult').append('<li>' + file.name + '</li>');
//        }
//    });

//    //$("div#dropZone").dropzone({ url: "/Handlers/ProductsFilter.asmx/GetImg" });
//});

//function sendFileToServer(formData, status) {
//    var uploadURL = '/Handlers/ProductsFilter.asmx/GetImg'; //Upload URL
//    var extraData = {}; //Extra Data.
//    //var jqXHR =
//    $.ajax({
//        xhr: function () {
//            var xhrobj = $.ajaxSettings.xhr();
//            if (xhrobj.upload) {
//                xhrobj.upload.addEventListener('progress', function (event) {
//                    var percent = 0;
//                    var position = event.loaded || event.position;
//                    var total = event.total;
//                    if (event.lengthComputable) {
//                        percent = Math.ceil(position / total * 100);
//                    }
//                    //Set progress
//                    status.setProgress(percent);
//                }, false);
//            }
//            return xhrobj;
//        },
//        url: uploadURL,
//        type: "POST",
//        contentType: false,
//        processData: false,
//        contentType: 'application/json; charset=utf-8',
//        //dataType: 'json',
//        cache: false,
//        data: formData,
//        success: function (data) {
//            status.setProgress(100);

//            $("#status1").append("File upload Done<br>");
//        }
//    });

//    //status.setAbort(jqXHR);
//}

//var rowCount = 0;
//function createStatusbar(obj) {
//    rowCount++;
//    var row = "odd";
//    if (rowCount % 2 == 0) row = "even";
//    this.statusbar = $("<div class='statusbar " + row + "'></div>");
//    this.filename = $("<div class='filename'></div>").appendTo(this.statusbar);
//    this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
//    this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
//    this.abort = $("<div class='abort'>Abort</div>").appendTo(this.statusbar);
//    obj.after(this.statusbar);

//    this.setFileNameSize = function (name, size) {
//        var sizeStr = "";
//        var sizeKB = size / 1024;
//        if (parseInt(sizeKB) > 1024) {
//            var sizeMB = sizeKB / 1024;
//            sizeStr = sizeMB.toFixed(2) + " MB";
//        }
//        else {
//            sizeStr = sizeKB.toFixed(2) + " KB";
//        }

//        this.filename.html(name);
//        this.size.html(sizeStr);
//    }
//    this.setProgress = function (progress) {
//        var progressBarWidth = progress * this.progressBar.width() / 100;
//        this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
//        if (parseInt(progress) >= 100) {
//            this.abort.hide();
//        }
//    }
//    this.setAbort = function (jqxhr) {
//        var sb = this.statusbar;
//        this.abort.click(function () {
//            jqxhr.abort();
//            sb.hide();
//        });
//    }
//}
//function handleFileUpload(files, obj) {
//    for (var i = 0; i < files.length; i++) {
//        var fd = new FormData();
//        fd.append('file', files[i]);
//        console.log(files[i]);
//        console.log(fd);
//        var status = new createStatusbar(obj); //Using this we can set progress.
//        status.setFileNameSize(files[i].name, files[i].size);
//        sendFileToServer(fd, status);

//    }
//}
//$(document).ready(function () {
//    var obj = $("#dragandrophandler");
//    obj.on('dragenter', function (e) {
//        e.stopPropagation();
//        e.preventDefault();
//        $(this).css('border', '2px solid #0B85A1');
//    });
//    obj.on('dragover', function (e) {
//        e.stopPropagation();
//        e.preventDefault();
//    });
//    obj.on('drop', function (e) {

//        $(this).css('border', '2px dotted #0B85A1');
//        e.preventDefault();
//        var files = e.originalEvent.dataTransfer.files;

//        //We need to send dropped files to Server
//        console.log(e.originalEvent.dataTransfer.files[0])
//        //$('#fileUpload').val(e.originalEvent.dataTransfer.files[0]);
//        handleFileUpload(files, obj);
//    });
//    $(document).on('dragenter', function (e) {
//        e.stopPropagation();
//        e.preventDefault();
//    });
//    $(document).on('dragover', function (e) {
//        e.stopPropagation();
//        e.preventDefault();
//        obj.css('border', '2px dotted #0B85A1');
//    });
//    $(document).on('drop', function (e) {
//        e.stopPropagation();
//        e.preventDefault();
//    });
//});
