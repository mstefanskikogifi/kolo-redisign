GlobalMethod = typeof (GlobalMethod) == 'object' ? GlobalMethod : {};
GlobalMethod.boxesPosition = function () { };
GlobalMethod.mobileComponentsSize = function () { };
GlobalMethod.mobileSizeReset = function () { };
(function ($) {
    function boxesPosition(col) {

        //default page properties
        var boxPage = {
            col: col,
            row: 0,
            col0Row: 0,
            col1Row: 0,
            col2Row: 0,
            lastPoz: 0,
            nonPozItems: []
        };

        //read all boxes properties
        var items = jQuery('.box-page>div');
        var boxes = [];

        //var allHaveSameWidth = 0;
        //var allHaveSameHeight = 0;

        items.each(function () {

            var string = $(this).attr('class');

            if (string.indexOf('p_') != -1 || string.indexOf('h_') != -1 || string.indexOf('w_') != -1) {
                var box = {};

                box.element = $(this);
                box.classString = string;
                box.width = parseInt(string.charAt(string.indexOf('w_') + 2), 10);
                box.height = parseInt(string.charAt(string.indexOf('h_') + 2), 10);
                box.vertical = parseInt(string.charAt(string.indexOf('p_') + 2), 10);
                box.horizontal = parseInt(string.charAt(string.indexOf('p_') + 4), 10);
                box.area = box.width * box.height;
                boxes.push(box);

                //if (allHaveSameWidth !== false && allHaveSameWidth !== box.width) {
                //    allHaveSameWidth = false;
                //} else {
                //    allHaveSameWidth = box.width;
                //}

                //if (allHaveSameHeight !== false && allHaveSameHeight !== box.height) {
                //    allHaveSameHeight = false;
                //} else {
                //    allHaveSameHeight = box.height;
                //}
            }

        });


        //array sort
        boxes = sortBoxes(boxes);

        //compose start
        if (boxes.length > 0) {
            compose3();

            //correct bigCarousel height for mobile
            $.each(boxes, function (index, item) {
                var isBigHeight = item.height == 3 || item.height == 4;
                if (((item.width == 4) || (item.width == 3 && isBigHeight)) && item.classString.indexOf('bigCarousel') != -1) {
                    item.height = item.height - 1;
                    item.area = item.width * item.height;
                }
            });

            //array sort
            //sortBoxes(boxes);

            compose2();
        }

        //array sort
        function sortBoxes(boxes) {
            //sort array by area
            boxes.sort(function (obj1, obj2) {
                return obj2.area - obj1.area;
            });

            var newBoxes = []; //new box order
            var currentBoxes = []; //boxes with the same area
            $.each(boxes, function (index, item) {

                //get boxes with the same are
                if (currentBoxes.length == 0 || currentBoxes[0].area == item.area) {
                    currentBoxes.push(item);
                } else {
                    if (currentBoxes.length > 0) {
                        //sort boxes with the same are by theirs position
                        currentBoxes.sort(function (obj1, obj2) {
                            return ((obj1.vertical * 10) + obj1.horizontal) - ((obj2.vertical * 10) + obj2.horizontal);
                        });
                    }
                    //concat sorted boxes to $newBoxes array
                    newBoxes = newBoxes.concat(currentBoxes);
                    currentBoxes = [];
                    currentBoxes.push(item);
                }

                if (boxes[index + 1] == undefined) {
                    //sort boxes with the same are by theirs position
                    currentBoxes.sort(function (obj1, obj2) {
                        return ((obj1.vertical * 10) + obj1.horizontal) - ((obj2.vertical * 10) + obj2.horizontal);
                    });
                    //concat sorted boxes to $newBoxes array
                    newBoxes = newBoxes.concat(currentBoxes);
                    currentBoxes = [];
                }
            });
            boxes = newBoxes.concat(currentBoxes);
            return boxes;
        }

        //compose functions

        //3 cols composer (for tablet)
        function compose3() {
            boxPage = {
                col: 3,
                col0Row: 1,
                col1Row: 1,
                col2Row: 1,
                col0FillRow: [],
                col1FillRow: [],
                col2FillRow: []
            };

            $.each(boxes, function (index, item) {

                //wszystkie kolumny są równe
                if (boxPage.col0Row == boxPage.col1Row && boxPage.col1Row == boxPage.col2Row) {

                    this.element.addClass('tp_' + boxPage.col0Row + 'x1');

                    if (this.width >= boxPage.col) {
                        boxPage.col0Row += this.height;
                        boxPage.col1Row += this.height;
                        boxPage.col2Row += this.height;
                    } else if (this.width >= 2) {
                        boxPage.col0Row += this.height;
                        boxPage.col1Row += this.height;
                    } else {
                        boxPage.col0Row += this.height;
                    }
                    //kolumny 1 i 2 są równe
                } else if (boxPage.col0Row == boxPage.col1Row && this.width <= 2) {

                    if (this.width == 1 && boxPage.col2Row < boxPage.col0Row) {

                        this.element.addClass('tp_' + boxPage.col2Row + 'x3');
                        boxPage.col2Row += this.height;

                    } else if (this.width <= 2 || boxPage.col0Row >= boxPage.col2Row) {

                        this.element.addClass('tp_' + boxPage.col0Row + 'x1');
                        boxPage.col0Row += this.height;

                        if (this.width == 2) {
                            boxPage.col1Row += this.height;
                        }

                    } else {//error
                        console.log('element większy niż 2---ERROR');
                    }
                    //kolumny 2 i 3 są równe
                } else if (boxPage.col1Row == boxPage.col2Row && this.width <= 2) {

                    if (this.width == 1 && boxPage.col0Row < boxPage.col1Row) {

                        this.element.addClass('tp_' + boxPage.col0Row + 'x1');
                        boxPage.col0Row += this.height;

                    } else if (this.width <= 2 || boxPage.col1Row >= boxPage.col0Row) {

                        this.element.addClass('tp_' + boxPage.col1Row + 'x2');
                        boxPage.col1Row += this.height;

                        if (this.width == 2) {
                            boxPage.col2Row += this.height;
                        }

                    } else {//error
                        console.log('element większy niż 2---ERROR');
                    }
                    //brak równych kolumn
                } else {

                    if (this.width <= 1) {

                        if (boxPage.col0Row <= boxPage.col1Row && boxPage.col0Row <= boxPage.col2Row) {

                            this.element.addClass('tp_' + boxPage.col0Row + 'x1');
                            boxPage.col0Row += this.height;

                        } else if (boxPage.col1Row <= boxPage.col0Row && boxPage.col1Row <= boxPage.col2Row) {

                            this.element.addClass('tp_' + boxPage.col1Row + 'x2');
                            boxPage.col1Row += this.height;

                        } else if (boxPage.col2Row <= boxPage.col0Row && boxPage.col2Row <= boxPage.col1Row) {

                            this.element.addClass('tp_' + boxPage.col2Row + 'x3');
                            boxPage.col2Row += this.height;

                        }

                    } else if (this.width <= 2) {

                        if (boxPage.col0Row >= boxPage.col1Row) {

                            this.element.addClass('tp_' + boxPage.col0Row + 'x1');

                            for (i = 0; i < this.height; i++) {
                                boxPage.col1FillRow.push(boxPage.col0Row + i);
                            }

                            boxPage.col0Row += this.height;

                        } else if (boxPage.col1Row >= boxPage.col2Row) {

                            this.element.addClass('tp_' + boxPage.col1Row + 'x2');

                            for (i = 0; i < this.height; i++) {
                                boxPage.col2FillRow.push(boxPage.col1Row + i);
                            }

                            boxPage.col1Row += this.height;

                        } else {//error
                            console.log('element większy niż 1---ERROR');
                        }

                    } else {

                        if (boxPage.col0Row >= boxPage.col1Row && boxPage.col0Row >= boxPage.col2Row) {

                            this.element.addClass('tp_' + boxPage.col0Row + 'x1');

                            for (i = 0; i < this.height; i++) {
                                boxPage.col1FillRow.push(boxPage.col0Row + i);
                                boxPage.col2FillRow.push(boxPage.col0Row + i);
                            }

                            boxPage.col0Row += this.height;

                        } else if (boxPage.col1Row >= boxPage.col0Row && boxPage.col1Row >= boxPage.col2Row) {

                            this.element.addClass('tp_' + boxPage.col1Row + 'x1');

                            for (i = 0; i < this.height; i++) {
                                boxPage.col0FillRow.push(boxPage.col1Row + i);
                                boxPage.col2FillRow.push(boxPage.col1Row + i);
                            }

                            boxPage.col1Row += this.height;

                        } else if (boxPage.col2Row >= boxPage.col0Row && boxPage.col2Row >= boxPage.col1Row) {

                            this.element.addClass('tp_' + boxPage.col2Row + 'x1');

                            for (i = 0; i < this.height; i++) {
                                boxPage.col0FillRow.push(boxPage.col2Row + i);
                                boxPage.col1FillRow.push(boxPage.col2Row + i);
                            }

                            boxPage.col2Row += this.height;

                        } else {//error
                            console.log('element >=3------ERROR');
                        }

                    }
                }

                //przesunięcie handlera kolumn jeśli jest na zajętych komórkach
                var spr = true;
                while (spr) {

                    spr = false;

                    $.each(boxPage.col0FillRow, function (index, value) {
                        if (value == boxPage.col0Row) {
                            boxPage.col0Row += 1;
                            spr = true;
                        }
                    });

                    $.each(boxPage.col1FillRow, function (index, value) {
                        if (value == boxPage.col1Row) {
                            boxPage.col1Row += 1;
                            spr = true;
                        }
                    });

                    $.each(boxPage.col2FillRow, function (index, value) {
                        if (value == boxPage.col2Row) {
                            boxPage.col2Row += 1;
                            spr = true;
                        }
                    });
                }
            });

            //set row number for box container
            var maxRow = boxPage.col0Row;

            if (boxPage.col1Row > maxRow) {
                maxRow = boxPage.col1Row;
            }
            if (boxPage.col2Row > maxRow) {
                maxRow = boxPage.col2Row;
            }

            $('.box-page').addClass('trows' + (maxRow - 1));
        }

        //2 cols composer (for mobile)
        function compose2() {
            boxPage = {
                col: 2,
                col0Row: 1,
                col1Row: 1,
                col2Row: 1,
                col0FillRow: [],
                col1FillRow: [],
                col2FillRow: []
            };

            $.each(boxes, function (index, item) {
                //wszystkie kolumny są rowne
                if (boxPage.col0Row == boxPage.col1Row) {

                    this.element.addClass('mp_' + boxPage.col0Row + 'x1');

                    if (this.width >= boxPage.col) {
                        boxPage.col0Row += this.height;
                        boxPage.col1Row += this.height;
                    } else {
                        boxPage.col0Row += this.height;
                    }
                    //brak rownych kolumn
                } else {

                    if (this.width <= 1) {

                        if (boxPage.col0Row <= boxPage.col1Row) {

                            this.element.addClass('mp_' + boxPage.col0Row + 'x1');
                            boxPage.col0Row += this.height;

                        } else if (boxPage.col1Row <= boxPage.col0Row) {

                            this.element.addClass('mp_' + boxPage.col1Row + 'x2');
                            boxPage.col1Row += this.height;

                        }

                    } else {

                        if (boxPage.col0Row >= boxPage.col1Row) {

                            this.element.addClass('mp_' + boxPage.col0Row + 'x1');

                            for (i = 0; i < this.height; i++) {
                                boxPage.col1FillRow.push(boxPage.col0Row + i);
                            }

                            boxPage.col0Row += this.height;

                        } else if (boxPage.col1Row >= boxPage.col0Row) {

                            this.element.addClass('mp_' + boxPage.col1Row + 'x1');

                            for (i = 0; i < this.height; i++) {
                                boxPage.col0FillRow.push(boxPage.col1Row + i);

                            }

                            boxPage.col1Row += this.height;

                        } else {//error
                            console.log('element >=3------ERROR');
                        }

                    }
                }

                //przesunięcie handlera kolumn jeśli jest na zajętych komórkach
                var spr = true;

                while (spr) {

                    spr = false;

                    $.each(boxPage.col0FillRow, function (index, value) {
                        if (value == boxPage.col0Row) {
                            boxPage.col0Row += 1;
                            spr = true;
                        }
                    });

                    $.each(boxPage.col1FillRow, function (index, value) {
                        if (value == boxPage.col1Row) {
                            boxPage.col1Row += 1;
                            spr = true;
                        }
                    });

                }

            });

            //set row number for box container

            var maxRow = boxPage.col0Row;
            if (boxPage.col1Row > maxRow) {
                maxRow = boxPage.col1Row;
            }
            if (boxPage.col2Row > maxRow) {
                maxRow = boxPage.col2Row;
            }

            $('.box-page').addClass('mrows' + (maxRow - 1));
        }


    }
    GlobalMethod.boxesPosition = boxesPosition;
    //mobile boxes size and position
    function mobileComponentsSize() {

        var prop = 0.781;// boxes and elements with class h_x
        var prop1 = 1.1739;//products list
        //var prop2 = 1.0217;//collections list
        var prop2 = 0.8065;//collections list
        if ($('.w_1').length > 0) {

            var currentWidth = $('.temp-box').width();
            var currentHeight = $('.temp-box').height();
            var newHeight = Math.round(currentWidth * prop);

            //calculate boxes height
            $('.h_1, .h_2, .h_3, .h_4').each(function () {
                var string = $(this).attr('class');
                var elementHeight = parseInt(string.charAt(string.indexOf('h_') + 2), 10);

                $(this).height((elementHeight * newHeight) + (10 * (elementHeight - 1)));

                var slideWidth = null;
                var slideHeight = null;

                if ($(this).hasClass('bigCarousel')) {
                    var isBigHeight = $(this).hasClass('h_3') || $(this).hasClass('h_4');
                    if ($(this).hasClass('w_4') || ($(this).hasClass('w_3') && isBigHeight)) {
                        $(this).height(((elementHeight - 1) * newHeight) + (10 * (elementHeight - 2)));//correct box height
                    }
                    slideWidth = $(this).width();
                    slideHeight = $(this).height();
                    $(this).find('.slide').width(slideWidth).height(slideHeight);

                } else if ($(this).hasClass('horizontalCarouselText') || $(this).hasClass('smallCarousel') || $(this).hasClass('verticalCarouselText')) {
                    slideWidth = $(this).width();
                    slideHeight = $(this).height();

                    $(this).find('li').width(slideWidth).height(slideHeight);
                } else if ($(this).hasClass('hyperBox') && $(this).hasClass('mp_1x1')) {
                    var imgH = $(this).find('img').height();

                    $(this).height(((elementHeight - 1) * newHeight) + (10 * (elementHeight - 2)));//correct box height
                }
            });

            //calculate boxes position
            $('.mp_1x1, .mp_1x2, .mp_2x1, .mp_2x2, .mp_3x1, .mp_3x2, .mp_4x1, .mp_4x2, .mp_5x1, .mp_5x2, .mp_6x1, .mp_6x2, .mp_7x1, .mp_7x2, .mp_8x1, .mp_8x2, .mp_9x1, .mp_9x2').each(function () {
                var string = $(this).attr('class');
                var elementVertPos = parseInt(string.charAt(string.indexOf('mp_') + 3), 10);
                var top = (((elementVertPos - 1) * newHeight) + (10 * (elementVertPos)));

                //console.log('element', $(this));
                //console.log('class vertical position', elementVertPos);
                //console.log('top', top);

                if ($(this).parent().find('.bigCarousel').length > 0 && !$(this).hasClass('bigCarousel')) {
                    //var fixCarousel = ((2 * newHeight) + 10) - $('.bigCarousel').height();
                    var BCstring = $('.bigCarousel').attr('class');
                    var Hclass = parseInt(BCstring.charAt(BCstring.indexOf('h_') + 2), 10);
                    var BC = ((Hclass - 1) * newHeight) + (10 * (Hclass - 2));
                    var fixCarousel = BC - $('.bigCarousel').height();
                    $(this).css('top', top - fixCarousel + 'px');
                    console.log("current:", this, " top: ", top, " fixCarousel :",fixCarousel, 'BCbox:', BC, ' bc:', $('.bigCarousel').height());
                }
                else if ($(this).parent().find('.hyperBox.mp_1x1').length > 0) {
                    var string = $('.hyperBox.mp_1x1').attr('class');
                    var Hclass = parseInt(string.charAt(string.indexOf('h_') + 2), 10);
                    var firstElemHeight = (Hclass * newHeight) + (10 * (Hclass - 1));
                    var fixCarouselW3 = firstElemHeight - $('.hyperBox.mp_1x1').height();
                    if ($(this).hasClass("mp_1x1")) {
                        $(this).css('top', '10px');
                    } else {
                        $(this).css('top', top - fixCarouselW3 + 'px');
                    }
                    //console.log('top:', top);
                    //console.log("fixCarouselW3:", fixCarouselW3);
                    //console.log('(elementHeight * newHeight) + 10', (Hclass * newHeight) + 10);
                    //console.log('.hyperBox.mp_1x1 height', $('.hyperBox.mp_1x1').height())
                }
                else {
                    $(this).css('top', top + 'px');
                }
            });

            //calculate boxPage height
            $('.mrows1, .mrows2, .mrows3, .mrows4, .mrows5, .mrows6, .mrows7, .mrows8, .mrows9').each(function () {
                var string = $(this).attr('class');
                var pageHeight = parseInt(string.charAt(string.indexOf('mrows') + 5), 10);
                $(this).height(((pageHeight - 1) * newHeight) + (10 * (pageHeight + 1)) + $('.mp_1x1').height())
                if($(this).find('.bigCarousel').length > 0){
                    var BCstring = $('.bigCarousel').attr('class');
                    var Hclass = parseInt(BCstring.charAt(BCstring.indexOf('h_') + 2), 10);
                    var BC = ((Hclass - 1) * newHeight) + (10 * (Hclass - 2));
                    var fixCarousel = BC - $('.bigCarousel').height();
                    $(this).height(((pageHeight - 1) * newHeight) + (10 * (pageHeight + 1)) + $('.mp_1x1').height() - fixCarousel);
                }
                //$(this).height(((pageHeight * newHeight) - newHeight) + (10 * (pageHeight)));

                //console.log("newHeight", newHeight);
                //console.log("pageHeight", pageHeight);
                //console.log("(pageHeight * newHeight)", (pageHeight * newHeight));
                //console.log("10 * (pageHeight + 1)", 10 * (pageHeight + 1));
            });
        }

        //calculate product item's height
        if ($('.item-list .product-list li, .item-list .collections-list li').length > 0) {

            $('.designer-popup-lists').show();
            var productWidth = $('.product-list li').width();
            var collectionWidth = $('.collections-list li').width();
            var productHeight = Math.round(productWidth * prop1);
            var collectionHeight = Math.round(collectionWidth * prop2);

            $('.product-list li').each(function () {
                $(this).height(productHeight);
            });
            $('.collections-list li').each(function () {
                $(this).height(collectionHeight);
            });
            $('.designer-popup-lists').hide();
        }
        //calculate products carousel sizes
        //if ($('.simple-slider').length > 0) {
        //    var listWidth = $('.simple-slider').width();
        //    var elementWidth = Math.floor((listWidth * 0.49)-2);
        //    var elementMargin = Math.floor(listWidth * 0.01);

        //    $('.simple-slider ul>li, .simple-slider ul>li>a').width(elementWidth).height(elementWidth * prop1);
        //    $('.simple-slider ul>li').css({
        //        'margin-left': elementMargin + 'px',
        //        'margin-right': elementMargin + 'px'
        //    });
        //    $('.simple-slider ul').css('margin-left', (-elementMargin) + 'px');
        //    $('.simple-slider').css('height', ((elementWidth * prop1)+80)+'px');
        //}
    }
    GlobalMethod.mobileComponentsSize = mobileComponentsSize;

    function mobileSizeReset() {

        //calculate boxes height
        $('.h_1, .h_2, .h_3, .h_4').each(function () {

            $(this).css('height', '');

            if ($(this).hasClass('bigCarousel') || $(this).hasClass('horizontalCarouselText')) {

                $(this).find('.slide').each(function () {
                    $(this).css('width', '').css('height', '');
                });

            }
            if ($(this).hasClass('horizontalCarouselText') || $(this).hasClass('smallCarousel') || $(this).hasClass('verticalCarouselText')) {

                $(this).find('li').each(function () {
                    $(this).css('width', '').css('height', '');
                });

            }
        });

        //calculate boxes position
        $('.mp_1x1, .mp_1x2, .mp_2x1, .mp_2x2, .mp_3x1, .mp_3x2, .mp_4x1, .mp_4x2, .mp_5x1, .mp_5x2, .mp_6x1, .mp_6x2, .mp_7x1, .mp_7x2, .mp_8x1, .mp_8x2, .mp_9x1, .mp_9x2').each(function () {

            $(this).css('top', '');

        });

        //calculate boxPage height
        $('.mrows1, .mrows2, .mrows3, .mrows4, .mrows5, .mrows6, .mrows7, .mrows8, .mrows9').each(function () {

            $(this).css('height', '');

        });


        //product list items clear
        $('.product-list li, .collections-list li').each(function () {
            $(this).css('height', '');
        });

        //simple carousel clear
        $('.simple-slider ul>li, .simple-slider ul>li>a').each(function () {
            $(this).css({
                width: '',
                height: '',
                marginLeft: '',
                marginRight: ''
            });
        });//.width(elementWidth).height(elementWidth * prop1);
        $('.simple-slider>ul').css('margin-left', '-' + $('.simple-slider>ul>li').css('margin-left'));
        $('.simple-slider').css('height', '');
    }
    GlobalMethod.mobileSizeReset = mobileSizeReset;

    ////for Pozzi
    //startMedia = 320;
    //endMedia = 500;
    //steps = 20;
    //startSizes = [10,12,8.5,14,15,14,12,20,23,20];
    //endSizes =   [12,14,14,16,19,22,22,25,35,45];
    //rules = [
    //    '.cookies-content,.brands-desc p,.brands-desc a,.button-map_content a,.search-form .search-term,.top-site-index span a,.content-footer ul li,.content-footer h3,.text-slide .text p,.small-slide .text p,.simple-slider .simple-slider-list li .text p.product-description,.simple-slider .simple-slider-list li .text span.price,.item-list ul li .text p,.item-list.list-style ul li .text span.code,.main-product h2,.main-product ul li span,.description p,.description ul li,.technical ul li span,.technical ul li span.technical-content,.ui-tabs .ui-tabs-panel,.ui-tabs .ui-tabs-nav li a,.showroom-gallery a.button, .google-search-result ul li p,.main-inspiration .text .collections-list h4,.main-inspiration .text .collections-list ul li,.press ul li .desc span.date, .styled-input-light .style-input',
    //    '.hyperBox .text p,.item-list.list-style ul li .text ul li, .item-list.list-style ul li .text span.price,.item-list ul.collections-list li .text p,.single-designer .designer-description, .small-filters h3,.main-inspiration .text p,.google-search-result h4,.projects-filters h3,.projectsDesc .project-desc ul > li span,.scfValidator,.scfValidationSummary',
    //    '.email-updates p',
    //    '.text-slide .text h2,.small-slide .text h2,.simple-slider h2,.item-list.list-style ul li .text p,.designer-description h3,.order-list h2,.showroom-gallery h2,.job-offers h2,.job-offers h3,.google-search-result h2,.faq-partials h3,.errorPage-wrapper h2',
    //    'h1.products-filters-header,.price p,.main-inspiration .text h3,.press ul li .desc h2,.item-list .tips-list li .desc h2,.searchResults-search input[type=text]',
    //    '.hyperBox .text h2, .html-box h2, .email-updates h2,.projectsDesc h3',
    //    '.email-updates h2',
    //    '.short-header h1,#HeaderId h1,.main-product .product-name h1,.errorPage-wrapper h1,.searchResults-search span',
    //    '.brands-desc h2,.bigHyperBox .text h2',
    //    '.big-slide .frame h2'];

    //for Kolo
    //startMedia = 320;
    //endMedia = 500;
    //steps = 20;
    //startSizes = [10,12,10,13,11,8.5,8,10,12,11,12,13,15,20];
    //endSizes =   [10,12,10,13,12,14,14,14,15,14,22,16,15,20];
    //rules = [
    //    '.breadcrumb, .item-list ul li .text span.code, .simple-slider .simple-slider-list li .text span.code, .searchResults-element .searchResults-elementSmaller',
    //    '.index-list a',
    //    '.cookies-content, .brands-desc p, .brands-desc a, .button-map_content a, .search-form .search-term, .top-site-index > a, .top-site-index span a, .content-footer ul li, .content-footer h3, .text-slide .text p, .small-slide .text p, .filters ul li h3, .item-header .sortby-select h3, .item-header > span, .simple-slider .simple-slider-list li .text p.product-description, .simple-slider .simple-slider-list li .text span.price, .item-list ul li .text p, .item-list.list-style ul li .text span.code, .main-product h2,.main-product ul li span,.description p, .description ul li, .technical ul li span, .technical ul li span.technical-content, .ui-tabs .ui-tabs-panel, .ui-tabs .ui-tabs-nav li a, .selectDark .passiveSelect, .selectDark .activeSelect, .selectDark li, .selectLight .passiveSelect, .selectLight .activeSelect, .selectLight li, .checkboxes ul li label, .checkbox-list .default-value, .button, .scfSubmitButtonBorder input, .showroom-gallery a.button, .google-search-result ul li p, .collections-categories, .collection-filters h3, .small-filters a, .item-list .brochures-list li .text span, .item-list .brochures-list li .text a, .main-inspiration .text .collections-list h4, .main-inspiration .text .collections-list ul li, .item-list .brochures-list li .text .no-print .no-print-label, .press ul li .desc span.date, .styled-input-light .style-input, .copyrights p',
    //    '.brand-point a span',
    //    'body, .item-list.list-style ul li .text ul li, .item-list.list-style ul li .text span.price, .item-list ul.collections-list li .text p, .single-designer .designer-description, .small-filters h3, .main-inspiration .text p, .projects-filters h3, .projectsColumn, .projectsDesc .project-desc ul > li span, .scfValidator, .scfValidationSummary',
    //    '.email-updates p',
    //    '.hyperBox .text p',
    //    '.text-slide .text h2, .small-slide .text h2, .simple-slider h2, .item-list.list-style ul li .text p, .designer-description h3, .order-list h2, .showroom-gallery h2, .job-offers h2, .job-offers h3, .google-search-result h2, .faq-partials h3, .errorPage-wrapper h2 ',
    //    'h1.products-filters-header, .price p, .main-inspiration .text h3, .press ul li .desc h2, .item-list .tips-list li .desc h2, .searchResults-search input[type=text]',
    //    '.hyperBox .text h2, .html-box h2, .email-updates h2, .projectsDesc h3',
    //    '.email-updates h2',
    //    '.short-header h1, #HeaderId h1, .main-product .product-name h1, .errorPage-wrapper h1, .searchResults-search span',
    //    '.brands-desc h2, .bigHyperBox .text h2',
    //    '.big-slide .frame h2 '];

    ////for Twyford
    startMedia = 320;
    endMedia = 500;
    steps = 20;
    startSizes = [8, 12, 10, 13, 10, 8.5, 12, 19, 12, 12, 14, 12, 18, 24, 28];
    endSizes = [10, 12, 12, 13, 14, 14, 16, 19, 20, 20, 22, 22, 25, 35, 45];
    rules = [
        '.breadcrumb, .item-list ul li .text span.code, .simple-slider .simple-slider-list li .text span.code, .searchResults-element .searchResults-elementSmaller',
        '.index-list a',
        '.cookies-content, .brands-desc p, .brands-desc a, .button-map_content a, .search-form .search-term, .top-site-index > a, .top-site-index span a, .content-footer ul li, .content-footer h3, .copyrights p, .text-slide .text p, .small-slide .text p, .filters ul li h3, .item-header .sortby-select h3, .item-header > span, .simple-slider .simple-slider-list li .text p.product-description, .simple-slider .simple-slider-list li .text span.price, .item-list ul li .text p, .item-list.list-style ul li .text span.code, .main-product h2, .main-product ul li span,.description p, .description ul li, .technical ul li span, .technical ul li span.technical-content, .ui-tabs .ui-tabs-panel, .ui-tabs .ui-tabs-nav li a, .selectDark .passiveSelect, .selectDark .activeSelect, .selectDark li, .selectLight .passiveSelect, .selectLight .activeSelect, .selectLight li, .checkboxes ul li label, .checkbox-list .default-value, .button, .scfSubmitButtonBorder input, .showroom-gallery a.button, .google-search-result ul li p, .collections-categories, .collection-filters h3, .small-filters a, .item-list .brochures-list li .text span, .item-list .brochures-list li .text a, .main-inspiration .text .collections-list h4, .main-inspiration .text .collections-list ul li, .item-list .brochures-list li .text .no-print .no-print-label, .press ul li .desc span.date, .styled-input-light .style-input, .item-list ul.product-list li .text span.price',
        '.brand-point a span',
        '.basketProductRow a .text .productCode, body, .item-list.list-style ul li .text ul li, .item-list.list-style ul li .text span.price, .item-list ul li .text span.price, .item-list ul.collections-list li .text p, .single-designer .designer-description, .small-filters h3, .main-inspiration .text p, .projects-filters h3, .projectsColumn, .projectsDesc .project-desc ul > li span, .scfValidator, .scfValidationSummary',
        '.email-updates p',
        '.text-slide .text h2, .small-slide .text h2, .simple-slider h2, .item-list.list-style ul li .text p, .designer-description h3, .order-list h2, .showroom-gallery h2, .job-offers h2, .job-offers h3, .google-search-result h2, .faq-partials h3, .errorPage-wrapper h2',
        'h1.products-filters-header, .price p, .main-inspiration .text h3, .press ul li .desc h2, .item-list .tips-list li .desc h2, .searchResults-search input[type=text]',
        '.basketProductRow .productDetails>span, .ml-firstForm .nettoSum, .ml-firstForm .bruttoSum, .ml-firstForm .totalTittle',
        '.basketProductRow a .text .productName',
        '.hyperBox .text h2, .html-box h2, .projectsDesc h3',
        '.email-updates h2',
        '.short-header h1, #HeaderId h1, .main-product .product-name h1, .errorPage-wrapper h1, .searchResults-search span',
        '.brands-desc h2, .bigHyperBox .text h2',
        '.big-slide .frame h2'];

    //for Ifo
    //startMedia = 320;
    //endMedia = 500;
    //steps = 20;
    //startSizes = [10,12,10,13,12,8.5,14,15,14,12,20,23,20];
    //endSizes =   [10,12,12,13,14,14,16,19,22,22,25,35,45];
    //rules = [
    //    '.breadcrumb, .item-list ul li .text span.code, .simple-slider .simple-slider-list li .text span.code, .searchResults-element .searchResults-elementSmaller',
    //    '.index-list a',
    //    '.cookies-content, .brands-desc p, .brands-desc a, .button-map_content a, .search-form .search-term, .top-site-index > a, .top-site-index span a, .content-footer ul li, .content-footer h3, .text-slide .text p, .small-slide .text p, .filters ul li h3,  .item-header .sortby-select h3, .item-header > span, .simple-slider .simple-slider-list li .text p.product-description, .simple-slider .simple-slider-list li .text span.price, .item-list ul li .text p, .item-list.list-style ul li .text span.code, .main-product h2, .main-product ul li span,.description p, .description ul li, .technical ul li span, .technical ul li span.technical-content, .independent ul li span, .ui-tabs .ui-tabs-panel, .ui-tabs .ui-tabs-nav li a, .selectDark .passiveSelect,  .selectDark .activeSelect, .selectDark li, .selectLight .passiveSelect, .selectLight .activeSelect, .selectLight li, .checkboxes ul li label, .checkbox-list .default-value, .button, .scfSubmitButtonBorder input, .showroom-gallery a.button, .google-search-result ul li p, .collections-categories, .collection-filters h3, .small-filters a, .item-list .brochures-list li .text span, .item-list .brochures-list li .text a, .main-inspiration .text .collections-list h4, .main-inspiration .text .collections-list ul li, .item-list .brochures-list li .text .no-print .no-print-label, .press ul li .desc span.date,  .styled-input-light .style-input',
    //    '.brand-point a span',
    //    'body, .item-list.list-style ul li .text ul li, .item-list.list-style ul li .text span.price, .item-list ul.collections-list li .text p, .single-designer .designer-description, .small-filters h3, .main-inspiration .text p, .projects-filters h3, .projectsColumn, .projectsDesc .project-desc ul > li span, .scfValidator,  .scfValidationSummary',
    //    '.email-updates p',
    //    '.text-slide .text h2, .small-slide .text h2, .simple-slider h2, .item-list.list-style ul li .text p, .designer-description h3, .order-list h2, .showroom-gallery h2, .job-offers h2, .job-offers h3, .google-search-result h2, .faq-partials h3, .errorPage-wrapper h2',
    //    'h1.products-filters-header, .price p, .main-inspiration .text h3, .press ul li .desc h2, .item-list .tips-list li .desc h2, .searchResults-search input[type=text]',
    //    '.hyperBox .text h2, .html-box h2, .email-updates h2, .projectsDesc h3',
    //    '.email-updates h2',
    //    '.short-header h1, #HeaderId h1, .main-product .product-name h1, .errorPage-wrapper h1, .searchResults-search span',
    //    '.brands-desc h2, .bigHyperBox .text h2 ',
    //    '.big-slide .frame h2'];

    //for Ido  
    //startMedia = 320;
    //endMedia = 500;
    //steps = 20;
    //startSizes = [10,12,10,13,11,8.5,10,12,11,13,15,20,21];
    //endSizes =   [10,12,12,13,14,14,14,15,14,16,35,40,21];
    //rules = [
    //    '.breadcrumb, .item-list ul li .text span.code, .simple-slider .simple-slider-list li .text span.code, .searchResults-element .searchResults-elementSmaller',
    //    '.index-list a',
    //    '.cookies-content, .brands-desc p, .brands-desc a, .button-map_content a, .search-form .search-term, .top-site-index > a, .top-site-index span a, .content-footer ul li, .content-footer h3, .text-slide .text p, .small-slide .text p, .filters ul li h3, .item-header .sortby-select h3, .item-header > span, .simple-slider .simple-slider-list li .text p.product-description, .simple-slider .simple-slider-list li .text span.price, .item-list ul li .text p, .item-list.list-style ul li .text span.code, .main-product h2, .description p, .description ul li, .technical ul li span, .technical ul li span.technical-content, .ui-tabs .ui-tabs-panel, .ui-tabs .ui-tabs-nav li a, .selectDark .passiveSelect, .selectDark .activeSelect, .selectDark li, .selectLight .passiveSelect, .selectLight .activeSelect, .selectLight li, .checkboxes ul li label, .checkbox-list .default-value, .button, .scfSubmitButtonBorder input, .showroom-gallery a.button, .google-search-result ul li p, .collections-categories, .collection-filters h3, .small-filters a, .item-list .brochures-list li .text span, .item-list .brochures-list li .text a, .main-inspiration .text .collections-list h4, .main-inspiration .text .collections-list ul li, .item-list .brochures-list li .text .no-print .no-print-label, .press ul li .desc span.date, .styled-input-light .style-input, .copyrights p',
    //    '.brand-point a span',
    //    'body, .item-list.list-style ul li .text ul li, .item-list.list-style ul li .text span.price, .item-list ul.collections-list li .text p, .single-designer .designer-description, .small-filters h3, .main-inspiration .text p, .projects-filters h3, .projectsColumn, .projectsDesc .project-desc ul > li span, .scfValidator, .scfValidationSummary, .scfForm label, .scfCaptchaLabel',
    //    '.email-updates p',
    //    '.text-slide .text h2, .small-slide .text h2, .simple-slider h2, .item-list.list-style ul li .text p, .designer-description h3, .order-list h2, .showroom-gallery h2, .job-offers h2, .job-offers h3, .google-search-result h2, .faq-partials h3, .errorPage-wrapper h2',
    //    'h1.products-filters-header, .price p, .main-inspiration .text h3, .press ul li .desc h2, .item-list .tips-list li .desc h2, .searchResults-search input[type=text]',
    //    '.html-box h2, .hyperBox .text h2, .email-updates h2, .projectsDesc h3',
    //    '.short-header h1, #HeaderId h1, .main-product .product-name h1, .errorPage-wrapper h1, .searchResults-search span',
    //    '.brands-desc h2, .bigHyperBox .text h2',
    //    '.big-slide .frame h2',
    //    '.top-site-index span a span'];

    //for Keramag
    //startMedia = 320;
    //endMedia = 500;
    //steps = 20;
    //startSizes = [10,12,10,13,11,8.5,10,12,11,13,15,20];
    //endSizes =   [10,12,12,13,14,14,14,15,22,16,20,30];
    //rules = [
    //    '.breadcrumb, .item-list ul li .text span.code, .simple-slider .simple-slider-list li .text span.code, .searchResults-element .searchResults-elementSmaller',
    //    '.index-list a',
    //    '.cookies-content, .brands-desc p, .brands-desc a, .button-map_content a, .search-form .search-term, .top-site-index > a, .top-site-index span a, .content-footer ul li, .content-footer h3, .text-slide .text p, .small-slide .text p, .filters ul li h3, .item-header .sortby-select h3, .item-header > span, .simple-slider .simple-slider-list li .text p.product-description, .simple-slider .simple-slider-list li .text span.price, .simple-slider .simple-slider-list li .text p, .item-list ul li .text p, .item-list.list-style ul li .text span.code, .main-product h2, .description p, .description ul li, .technical ul li span, .technical ul li span.technical-content, .ui-tabs .ui-tabs-panel, .ui-tabs .ui-tabs-nav li a, .selectDark .passiveSelect, .selectDark .activeSelect, .selectDark li, .selectLight .passiveSelect, .selectLight .activeSelect, .selectLight li, .checkboxes ul li label, .checkbox-list .default-value, .button, .scfSubmitButtonBorder input, .showroom-gallery a.button, .google-search-result ul li p, .collections-categories, .collection-filters h3, .small-filters a, .item-list .brochures-list li .text span, .item-list .brochures-list li .text a, .main-inspiration .text .collections-list h4, .main-inspiration .text .collections-list ul li, .item-list .brochures-list li .text .no-print .no-print-label, .press ul li .desc span.date, .styled-input-light .style-input, .copyrights p',
    //    '.brand-point a span',
    //    'body, .item-list.list-style ul li .text ul li, .item-list.list-style ul li .text span.price, .item-list ul.collections-list li .text p, .single-designer .designer-description, .small-filters h3, .main-inspiration .text p, .projects-filters h3, .projectsColumn, .projectsDesc .project-desc ul > li span, .scfValidator, .scfValidationSummary, .scfForm label, .scfCaptchaLabel',
    //    '.email-updates p',
    //    '.text-slide .text h2, .small-slide .text h2, .simple-slider h2, .item-list.list-style ul li .text p, .designer-description h3, .order-list h2, .showroom-gallery h2, .job-offers h2, .job-offers h3, .google-search-result h2, .faq-partials h3, .errorPage-wrapper h2',
    //    'h1.products-filters-header, .price p, .main-inspiration .text h3, .press ul li .desc h2, .item-list .tips-list li .desc h2, .searchResults-search input[type=text] ',
    //    '.html-box h2, .hyperBox .text h2, .email-updates h2, .projectsDesc h3',
    //    '.short-header h1, #HeaderId h1, .main-product .product-name h1, .errorPage-wrapper h1, .searchResults-search span',
    //    '.brands-desc h2, .bigHyperBox .text h2',
    //    '.big-slide .frame h2'];

    //for Sphinx
    //startMedia = 320;
    //endMedia = 500;
    //steps = 20;
    //startSizes = [10,12,10,13,12,8.5,14,15,14,12,20,23,20];
    //endSizes =   [10,12,12,13,14,14,16,19,22,22,25,35,45];
    //rules = [
    //    '.breadcrumb, .item-list ul li .text span.code, .simple-slider .simple-slider-list li .text span.code, .searchResults-element .searchResults-elementSmaller',
    //    '.index-list a',
    //    '.cookies-content, .brands-desc p, .brands-desc a, .button-map_content a, .search-form .search-term, .top-site-index > a, .top-site-index span a, .content-footer ul li, .content-footer h3, .text-slide .text p, .small-slide .text p, .filters ul li h3,  .item-header .sortby-select h3, .item-header > span, .simple-slider .simple-slider-list li .text p.product-description, .simple-slider .simple-slider-list li .text span.price, .item-list ul li .text p, .item-list.list-style ul li .text span.code, .main-product h2, .main-product ul li span,.description p, .description ul li, .technical ul li span, .technical ul li span.technical-content, .independent ul li span, .ui-tabs .ui-tabs-panel, .ui-tabs .ui-tabs-nav li a, .selectDark .passiveSelect,  .selectDark .activeSelect, .selectDark li, .selectLight .passiveSelect, .selectLight .activeSelect, .selectLight li, .checkboxes ul li label, .checkbox-list .default-value, .button, .scfSubmitButtonBorder input, .showroom-gallery a.button, .google-search-result ul li p, .collections-categories, .collection-filters h3, .small-filters a, .item-list .brochures-list li .text span, .item-list .brochures-list li .text a, .main-inspiration .text .collections-list h4, .main-inspiration .text .collections-list ul li, .item-list .brochures-list li .text .no-print .no-print-label, .press ul li .desc span.date,  .styled-input-light .style-input',
    //    '.brand-point a span',
    //    'body, .item-list.list-style ul li .text ul li, .item-list.list-style ul li .text span.price, .item-list ul.collections-list li .text p, .single-designer .designer-description, .small-filters h3, .main-inspiration .text p, .projects-filters h3, .projectsColumn, .projectsDesc .project-desc ul > li span, .scfValidator,  .scfValidationSummary',
    //    '.email-updates p',
    //    '.text-slide .text h2, .small-slide .text h2, .simple-slider h2, .item-list.list-style ul li .text p, .designer-description h3, .order-list h2, .showroom-gallery h2, .job-offers h2, .job-offers h3, .google-search-result h2, .faq-partials h3, .errorPage-wrapper h2',
    //    'h1.products-filters-header, .price p, .main-inspiration .text h3, .press ul li .desc h2, .item-list .tips-list li .desc h2, .searchResults-search input[type=text]',
    //    '.hyperBox .text h2, .html-box h2, .email-updates h2, .projectsDesc h3',
    //    '.email-updates h2',
    //    '.short-header h1, #HeaderId h1, .main-product .product-name h1, .errorPage-wrapper h1, .searchResults-search span',
    //    '.brands-desc h2, .bigHyperBox .text h2 ',
    //    '.big-slide .frame h2'];

    //for Allia
    //startMedia = 320;
    //endMedia = 500;
    //steps = 20;
    //startSizes = [10,12,10,13,12,8.5,14,15,14,12,20,23,20];
    //endSizes =   [10,12,12,13,14,14,16,19,22,22,25,35,45];
    //rules = [
    //    '.breadcrumb, .item-list ul li .text span.code, .simple-slider .simple-slider-list li .text span.code, .searchResults-element .searchResults-elementSmaller',
    //    '.index-list a',
    //    '.cookies-content, .brands-desc p, .brands-desc a, .button-map_content a, .search-form .search-term, .top-site-index > a, .top-site-index span a, .content-footer ul li, .content-footer h3, .text-slide .text p, .small-slide .text p, .filters ul li h3,  .item-header .sortby-select h3, .item-header > span, .simple-slider .simple-slider-list li .text p.product-description, .simple-slider .simple-slider-list li .text span.price, .item-list ul li .text p, .item-list.list-style ul li .text span.code, .main-product h2, .main-product ul li span,.description p, .description ul li, .technical ul li span, .technical ul li span.technical-content, .independent ul li span, .ui-tabs .ui-tabs-panel, .ui-tabs .ui-tabs-nav li a, .selectDark .passiveSelect,  .selectDark .activeSelect, .selectDark li, .selectLight .passiveSelect, .selectLight .activeSelect, .selectLight li, .checkboxes ul li label, .checkbox-list .default-value, .button, .scfSubmitButtonBorder input, .showroom-gallery a.button, .google-search-result ul li p, .collections-categories, .collection-filters h3, .small-filters a, .item-list .brochures-list li .text span, .item-list .brochures-list li .text a, .main-inspiration .text .collections-list h4, .main-inspiration .text .collections-list ul li, .item-list .brochures-list li .text .no-print .no-print-label, .press ul li .desc span.date,  .styled-input-light .style-input',
    //    '.brand-point a span',
    //    'body, .item-list.list-style ul li .text ul li, .item-list.list-style ul li .text span.price, .item-list ul.collections-list li .text p, .single-designer .designer-description, .small-filters h3, .main-inspiration .text p, .projects-filters h3, .projectsColumn, .projectsDesc .project-desc ul > li span, .scfValidator,  .scfValidationSummary',
    //    '.email-updates p',
    //    '.text-slide .text h2, .small-slide .text h2, .simple-slider h2, .item-list.list-style ul li .text p, .designer-description h3, .order-list h2, .showroom-gallery h2, .job-offers h2, .job-offers h3, .google-search-result h2, .faq-partials h3, .errorPage-wrapper h2',
    //    'h1.products-filters-header, .price p, .main-inspiration .text h3, .press ul li .desc h2, .item-list .tips-list li .desc h2, .searchResults-search input[type=text]',
    //    '.hyperBox .text h2, .html-box h2, .email-updates h2, .projectsDesc h3',
    //    '.email-updates h2',
    //    '.short-header h1, #HeaderId h1, .main-product .product-name h1, .errorPage-wrapper h1, .searchResults-search span',
    //    '.brands-desc h2, .bigHyperBox .text h2 ',
    //    '.big-slide .frame h2'];

    //for Selles
    //startMedia = 320;
    //endMedia = 500;
    //steps = 20;
    //startSizes = [10,12,10,13,12,8.5,14,15,14,12,20,23,20];
    //endSizes =   [10,12,12,13,14,14,16,19,22,22,25,35,45];
    //rules = [
    //    '.breadcrumb, .item-list ul li .text span.code, .simple-slider .simple-slider-list li .text span.code, .searchResults-element .searchResults-elementSmaller',
    //    '.index-list a',
    //    '.cookies-content, .brands-desc p, .brands-desc a, .button-map_content a, .search-form .search-term, .top-site-index > a, .top-site-index span a, .content-footer ul li, .content-footer h3, .text-slide .text p, .small-slide .text p, .filters ul li h3,  .item-header .sortby-select h3, .item-header > span, .simple-slider .simple-slider-list li .text p.product-description, .simple-slider .simple-slider-list li .text span.price, .item-list ul li .text p, .item-list.list-style ul li .text span.code, .main-product h2, .main-product ul li span,.description p, .description ul li, .technical ul li span, .technical ul li span.technical-content, .independent ul li span, .ui-tabs .ui-tabs-panel, .ui-tabs .ui-tabs-nav li a, .selectDark .passiveSelect,  .selectDark .activeSelect, .selectDark li, .selectLight .passiveSelect, .selectLight .activeSelect, .selectLight li, .checkboxes ul li label, .checkbox-list .default-value, .button, .scfSubmitButtonBorder input, .showroom-gallery a.button, .google-search-result ul li p, .collections-categories, .collection-filters h3, .small-filters a, .item-list .brochures-list li .text span, .item-list .brochures-list li .text a, .main-inspiration .text .collections-list h4, .main-inspiration .text .collections-list ul li, .item-list .brochures-list li .text .no-print .no-print-label, .press ul li .desc span.date,  .styled-input-light .style-input',
    //    '.brand-point a span',
    //    'body, .item-list.list-style ul li .text ul li, .item-list.list-style ul li .text span.price, .item-list ul.collections-list li .text p, .single-designer .designer-description, .small-filters h3, .main-inspiration .text p, .projects-filters h3, .projectsColumn, .projectsDesc .project-desc ul > li span, .scfValidator,  .scfValidationSummary',
    //    '.email-updates p',
    //    '.text-slide .text h2, .small-slide .text h2, .simple-slider h2, .item-list.list-style ul li .text p, .designer-description h3, .order-list h2, .showroom-gallery h2, .job-offers h2, .job-offers h3, .google-search-result h2, .faq-partials h3, .errorPage-wrapper h2',
    //    'h1.products-filters-header, .price p, .main-inspiration .text h3, .press ul li .desc h2, .item-list .tips-list li .desc h2, .searchResults-search input[type=text]',
    //    '.hyperBox .text h2, .html-box h2, .email-updates h2, .projectsDesc h3',
    //    '.email-updates h2',
    //    '.short-header h1, #HeaderId h1, .main-product .product-name h1, .errorPage-wrapper h1, .searchResults-search span',
    //    '.brands-desc h2, .bigHyperBox .text h2 ',
    //    '.big-slide .frame h2'];


    function round(number, x) {
        x = (!x ? 2 : x);
        return Math.round(number * Math.pow(10, x)) / Math.pow(10, x);
    }

    function fontResize(startMedia, endMedia, steps, startSizes, endSizes, rules) {
        var no = (endMedia - startMedia) / steps;
        var allRules = '';
        for (var i = no; i >= 0; i--) {
            var mediaRules = '@media (max-width: ' + (startMedia + steps * i) + 'px) {';
            var currentRules = '';
            $.each(rules, function (index, data) {
                var sizeCounter = (endSizes[index] - startSizes[index]) / no;
                currentRules += rules[index] + '{font-size:' + round((startSizes[index] + (sizeCounter * i)), 1) + 'px}';
            });

            allRules += (mediaRules + currentRules + '}');
        }
        //console.log(allRules);
    }
    //fontResize(startMedia, endMedia, steps, startSizes, endSizes, rules);
})(jQuery);
