(function ($) {

    var Page = {

        numberBox: 0,

        boxSetting: {
            top: 100,
            left: 100,
            width: 1,
            height: 1,
            bottom: -1,
            right: -1
        },

        colors: ['#000000', '#008080', '#0000FF'],

        init: function () {
            //Page.reset();
            $('#AddBoxBtn').hide();
            Page.checkBoxs();
            //Page.mobilePosition();
            //Page.createBox();
            //Page.createEditBox();
        },
        checkBoxs: function () {
            Page.cropParametersWidthB1 = {
                W1 : 275,
                W2 : 560,
                W3 : 845,
                W4 : 1130
            }
            Page.cropParametersWidthB2 = {
                W2 : 560,
                W3 : 845,
                W4 : 1130
            }
            Page.cropParametersWidthB3 = {
                W2 : 560,
                W3 : 845,
                W4 : 1130
            }
            Page.cropParametersWidthB5 = {
                W1 : 275,
                W2 : 560,
                W3 : 845,
                W4 : 1130
            }
            Page.cropParametersWidthB6 = {
                W2 : 275,
                W3 : 560,
                W4 : 560
            }

            Page.cropParametersHeightB1 = {
                H1: 215,
                H2: 440,
                H3: 665,
                H4: 890
            }
            Page.cropParametersHeightB2 = {
                H2: 440,
                H3: 665,
                H4: 890
            }
            Page.cropParametersHeightB3 = {
                H2: 440,
                H3: 665,
                H4: 890
            }
            Page.cropParametersHeightB5 = {
                H2: 215,
                H3: 440,
                H4: 440
            }
            Page.cropParametersHeightB6 = {
                H1: 215,
                H2: 440,
                H3: 665,
                H4: 890
            }
            var typesList = [
                        {
                            type: 'hyperBox',
                            visible: true,
                            index: 1
                        },
                        {
                            type: 'bigHyperBox',
                            visible: true,
                            index: 2
                        },
                        {
                            type: 'bigCarousel',
                            visible: true,
                            index: 3
                        },
                        {
                            type: 'smallCarousel',
                            visible: true,
                            index: 4
                        },
                        {
                            type: 'verticalCarouselText',
                            visible: true,
                            index: 5
                        },
                        {
                            type: 'horizontalCarouselText',
                            visible: true,
                            index: 6
                        },
                        {
                            type: 'email-updates',
                            visible: true,
                            index: 7
                        },
                        {
                            type: 'html-box',
                            visible: true,
                            index: 8
                        },
                        {
                            type: 'leaveMessage',
                            visible: true,
                            index: 9
                        },
                        {
                            type: 'GoogleMap',
                            visible: true,
                            index: 10
                        },
                        {
                            type: 'email-updates-opt',
                            visible: true,
                            index: 11
                        }
            ];

            $('.box-page>ul li').on('click', function () {

                $(this).toggleClass('active');
                var str = $(this).attr('class');
                var poz = str.substring(str.indexOf('p_'), str.indexOf('p_') + 5);

                if ($(this).hasClass('active')) {

                    if (poz.charAt(2) < Page.boxSetting.top) {
                        Page.boxSetting.top = poz.charAt(2);
                    }
                    if (poz.charAt(4) < Page.boxSetting.left) {
                        Page.boxSetting.left = poz.charAt(4);
                    }
                    if (poz.charAt(2) > Page.boxSetting.bottom) {
                        Page.boxSetting.bottom = poz.charAt(2);
                    }
                    if (poz.charAt(4) > Page.boxSetting.right) {
                        Page.boxSetting.right = poz.charAt(4);
                    }
                } else {
                    $('#AddBoxBtn').hide();
                    $('.boxType').val(0).hide();
                    $('.boxType-select').hide();
                    $('.boxType-select .activeSelect').attr('id', $('.boxType').val()).text($('.boxType option[value="0"]').text());
                    Page.boxSetting = {
                        top: 100,
                        left: 100,
                        width: 1,
                        height: 1,
                        bottom: -1,
                        right: -1
                    }
                    $('.box-page ul li.active').each(function () {

                        var str = $(this).attr('class');
                        var poz = str.substring(str.indexOf('p_'), str.indexOf('p_') + 5);
                        if (poz.charAt(2) < Page.boxSetting.top) {
                           Page.boxSetting.top = poz.charAt(2);
                        }
                        if (poz.charAt(4) < Page.boxSetting.left) {
                           Page.boxSetting.left = poz.charAt(4);
                        }
                        if (poz.charAt(2) > Page.boxSetting.bottom) {
                           Page.boxSetting.bottom = poz.charAt(2);
                        }
                        if (poz.charAt(4) > Page.boxSetting.right) {
                           Page.boxSetting.right = poz.charAt(4);
                        }
                    });

                }
                var boxComplite = true;
                var boxExist = false;
                $('#AddBoxBtn').hide();
                $('.boxType').val(0).hide();
                $('.boxType-select').hide();
                $('.boxType-select .activeSelect').attr('id', $('.boxType').val()).text($('.boxType option[value="0"]').text());
                
                for (var i = Page.boxSetting.top; i <= Page.boxSetting.bottom; i++)
                    for (var j = Page.boxSetting.left; j <= Page.boxSetting.right; j++) {
                        $('.box-page .p_' + i + 'x' + j).each(function () {
                            if (!$(this).hasClass('active')) {
                                boxComplite = false;
                            } else {
                                boxExist = true;
                            }
                            //$(this).find('.createBox').hide();
                        });
                    }
                if (boxComplite && boxExist) {
                    //$('.box-page .p_' + Page.boxSetting.top + 'x' + Page.boxSetting.left).find('.createBox').show();
                    var top = (Page.boxSetting.top - 1) * ($('.p_1x1.template').height()+10) + 20;
                    var left = (Page.boxSetting.left - 1) * ($('.p_1x1.template').width()+10) + 10;
                    var itemHeight = Page.boxSetting.bottom - Page.boxSetting.top + 1;
                    var itemWidth = Page.boxSetting.right - Page.boxSetting.left + 1;
                    
                    $.each(typesList, function (index, data) {
                        typesList[index].visible = true;
                    })
                    if (itemWidth < 2) {
                        typesList[1].visible = false;
                        typesList[2].visible = false;
                        typesList[5].visible = false;
                    } 
                    if (itemHeight < 2) {
                        typesList[1].visible = false;
                        typesList[2].visible = false;
                        typesList[4].visible = false;
                    }
                    if (itemWidth != 3 || itemHeight != 2) {
                        typesList[8].visible = false;
                    }
                    if (!((itemWidth == 1 && itemHeight==1) || (itemWidth==2 && itemHeight==1) || (itemHeight==2 && itemWidth==1))) {
                        typesList[6].visible = false;
                    }

                    $.each(typesList, function () {
                        if (this.visible) {
                            $('.boxType option[value=' + this.index + ']').show();
                            $('.boxType-select ul').find('#' + this.index).show();
                        } else {
                            $('.boxType option[value=' + this.index + ']').hide();
                            $('.boxType-select ul').find('#' + this.index).hide();
                        }
                    })

                    $('.boxType-select').css({
                        'top': top,
                        'left': left
                    })
                   .show();

                    $('#BoxParameters').val('p_' + Page.boxSetting.top + 'x' + Page.boxSetting.left + ','
                        + 'h_' + (Page.boxSetting.bottom - Page.boxSetting.top + 1) + ','
                        + 'w_' + (Page.boxSetting.right - Page.boxSetting.left + 1)+',ch_0'+',cw_0');

                    
                    $('#AddBoxBtn').css({
                        'top': top+40,
                        'left': left
                        });

                    
                    
          
                }
            });

            $('.boxType-select select').on('change', function () {

                if ($(this).val() != 0) {
                    $('#BoxType').val($(this).val());
                    $('#AddBoxBtn').show();
                    $('#BoxType').val(typesList[$(this).val() - 1].type);
                } else {
                    $('#AddBoxBtn').hide();
                }
                var boxType = parseInt($(this).val());
                var boxHeight = Page.boxSetting.bottom - Page.boxSetting.top + 1;
                var boxWidth = Page.boxSetting.right - Page.boxSetting.left + 1;
                var boxParametersWidth = {};
                var boxParametersHeight = {};
                var cropParameters = true;
                var cropWidth = 0;
                var cropHeight = 0;

                switch (boxType) {
                    case 1:
                        boxParametersWidth = Page.cropParametersWidthB1;
                        boxParametersHeight = Page.cropParametersHeightB1;
                        break;
                    case  2:
                        boxParametersWidth = Page.cropParametersWidthB2;
                        boxParametersHeight = Page.cropParametersHeightB2;
                        break;
                    case 3:
                        boxParametersWidth = Page.cropParametersWidthB3;
                        boxParametersHeight = Page.cropParametersHeightB3;
                        break;
                    case  4:
                        CropParameters = false;
                        break;
                    case  5:
                        boxParametersWidth = Page.cropParametersWidthB5;
                        boxParametersHeight = Page.cropParametersHeightB5;
                        break;
                    case 6:
                        boxParametersWidth = Page.cropParametersWidthB6;
                        boxParametersHeight = Page.cropParametersHeightB6;
                        break;
                }

                if (cropParameters == true) {

                    switch (boxHeight) {
                        case 1:
                            cropHeight = boxParametersHeight.H1;
                            break;
                        case 2:
                            cropHeight = boxParametersHeight.H2;
                            break;
                        case 3:
                            cropHeight = boxParametersHeight.H3;
                            break;
                        case 4:
                            cropHeight = boxParametersHeight.H4;
                            break;
                    }

                    switch (boxWidth) {
                        case 1:
                            cropWidth = boxParametersWidth.W1;
                            break;
                        case 2:
                            cropWidth = boxParametersWidth.W2;
                            break;
                        case 3:
                            cropWidth = boxParametersWidth.W3;
                            break;
                        case 4:
                            cropWidth = boxParametersWidth.W4;
                            break;
                    }

                    var boxParameters = $('#BoxParameters').val().split(',');

                    $.each(boxParameters, function (index, data) {

                        if (data.indexOf('ch') != -1) {
                            boxParameters[index] = 'ch_' + cropHeight;

                        }
                        if (data.indexOf('cw') != -1) {
                            boxParameters[index] = 'cw_' + cropWidth;

                        }
                    });
                    $('#BoxParameters').val(boxParameters.join(','));

                }

            });
        },
        mobilePosition: function () {
            $('.mobile').on('click', function (e) {
                e.preventDefault;
                $('.mobile-composer').show();
                Page.createMobileBox();
            });
            var drag = $('.drag');
            var drop = $('.drop');
            var grid = $('<ul>');
            grid.droppable({ accept: ".special" });
            grid.appendTo(drop);
            for (var i = 0; i < 12; i++) {
                $('<li>').appendTo(grid);
            }
        },
        createMobileBox: function () {
            $('.box-page>div').each(function () {
                var newBox = $('<div>');
                var classes = $(this).attr('class').split(' ');
                $.each(classes, function (i, val) {
                    if (val.length < 6) val = 'm' + val;
                    if(i==0) newBox.text(val);
                    newBox.addClass(val);
                });
                newBox.draggable({ containment: ".drop" });
                newBox.appendTo($('.drag'));
            });
        },
        createBox: function () {
            $('.createBox').on('click', function (e) {
                if (e.stopPropagation) {
                    e.stopPropagation();   // W3C model
                } else {
                    e.cancelBubble = true; // IE model
                }
                var $newBox = $('.templateStart').clone();
                var newPoz = 'p_' + Page.boxSetting.top + 'x' + Page.boxSetting.left;
                var newSize = 'h_' + (Page.boxSetting.bottom - Page.boxSetting.top + 1) + ' w_' + (Page.boxSetting.right - Page.boxSetting.left + 1);
                $('.box-page ul li.active').removeClass('active').addClass('hidden').find('.createBox').hide();
                for (var i = Page.boxSetting.top; i <= Page.boxSetting.bottom; i++)
                    for (var j = Page.boxSetting.left; j <= Page.boxSetting.right; j++) {
                        $('.box-page .p_' + i + 'x' + j).each(function () {
                            if ($(this).hasClass('template')) {

                                $('.p_' + i + 'x' + j).removeClass('active').addClass('hidden').find('.createBox').hide();
                            } else {

                                var str = $(this).attr('class');
                                var top = parseInt(str.substring(str.indexOf('p_'), str.indexOf('p_') + 5).charAt(2));
                                var left = parseInt(str.substring(str.indexOf('p_'), str.indexOf('p_') + 5).charAt(4));
                                var bottom = parseInt(str.substring(str.indexOf('h_'), str.indexOf('h_') + 3).charAt(2));
                                var right = parseInt(str.substring(str.indexOf('w_'), str.indexOf('w_') + 3).charAt(2));

                                for (var k = top; k <= top + bottom - 1; k++)
                                    for (var l = left; l <= right + left - 1; l++) {
                                        $('.h_1.w_1.p_' + k + 'x' + l).removeClass('hidden');

                                    }
                                $(this).remove();
                                $('.p_' + i + 'x' + j).addClass('hidden');
                            }
                        })
                    }
                $newBox.removeClass('templateStart').addClass(newSize).addClass(newPoz).css('background', Page.colors[2]).appendTo('.box-page ul');
                Page.boxSetting = {
                    top: 100,
                    left: 100,
                    width: 1,
                    height: 1,
                    bottom: -1,
                    right: -1
                }
                $newBox.find('.createBox').hide();
                $newBox.find('.removeBox').show();
                $newBox.find('.editBox').show();
                Page.removeBox();
                Page.editBox();
            });
        },
        removeBox: function () {
            $('.removeBox').on('click', function () {
                var $removedBox = $(this).parent();
                var str = $removedBox.attr('class');
                var top = parseInt(str.substring(str.indexOf('p_'), str.indexOf('p_') + 5).charAt(2));
                var left = parseInt(str.substring(str.indexOf('p_'), str.indexOf('p_') + 5).charAt(4));
                var bottom = parseInt(str.substring(str.indexOf('h_'), str.indexOf('h_') + 3).charAt(2));
                var right = parseInt(str.substring(str.indexOf('w_'), str.indexOf('w_') + 3).charAt(2));

                $removedBox.remove();
                for (var i = top; i <= top + bottom - 1; i++)
                    for (var j = left; j <= right + left - 1; j++) {
                        //                    var $newBox=$('.template').clone()

                        $('.h_1.w_1.p_' + i + 'x' + j).removeClass('hidden');
                    }
            })
        },
        editBox: function () {
            $('.editBox').on('click', function () {

                if ($(this).parent().hasClass('created')) {
                    var cnt = $(this).parent().attr('class');
                    //                alert(cnt.indexOf('hyperBox'));
                    if (cnt.indexOf('hyperBox') != -1) {
                        $('.hyperBox').show();
                        $('.boxType select').val('hyperBox');
                        $('.hyperBox').find('.title').val($(this).parent().find('h2').text());
                        $('.hyperBox').find('.description').val($(this).parent().find('p').text());
                        $('.hyperBox').find('.image').val($(this).parent().find('img').attr('src'));
                        $('.hyperBox').find('.link').val($(this).parent().find('a').attr('href'));
                    }
                }

                $(this).parent().addClass('edit-now');

                $('.popup').fadeIn(500);
                $('.close').on('click', function () {
                    $('.popup').fadeOut(500);
                    $('.popup input').each(function () {
                        $(this).val('');
                    });
                    $('.edit-now').removeClass('.edit-now');
                    $('.editProperties div').hide();
                    $('.hyperBox').show();
                    $('.boxType select').val('hyperBox');
                });

                $('.boxType select').on('change', function () {
                    $('.editProperties div').hide();
                    $('.actual-data').removeClass('actual-data');
                    $('.' + $(this).val()).show().addClass('actual-data');
                })

                $('.addItem').on('click', function () {
                    var newItem = $(this).parent().find('.template').clone();
                    newItem.removeClass('template').appendTo($(this).parent().find('ul'));

                    $('.removeItem').on('click', function () {

                        if ($(this).parent().parent().children().length > 3) {
                            $(this).parent().remove();
                        }
                    });
                });
            });
        },
        createEditBox: function () {
            $('.createEditBox').on('click', function () {

                var cnt = $('.boxType select').val();
                var box = $('.edit-now');
                box.find('a').remove();
                box.removeClass('edit-now').addClass('created').addClass(cnt);

                switch (cnt) {
                    case (cnt = 'hyperBox'):
                        var content = $('.hyperBox.template a').clone();
                        var title = $('.actual-data').find('.title').val();
                        var description = $('.actual-data').find('.description').val();
                        var image = $('.actual-data').find('.image').val();
                        var link = $('.actual-data').find('.link').val();

                        content.find('.text').find('h2').text(title);
                        content.find('.text').find('p').text(description);
                        content.find('img').attr('src', image);
                        content.attr('href', link);
                        content.appendTo(box);

                        break;
                    case (cnt = 'bigHyperBox'):
                        var content = $('.bigHyperBox.template a').clone();
                        var title = $('.actual-data').find('.title').val();
                        var description = $('.actual-data').find('.description').val();
                        var image = $('.actual-data').find('.image').val();
                        var link = $('.actual-data').find('.link').val();

                        content.find('.text').find('h2').text(title);
                        content.find('.text').find('p').text(description);
                        content.find('img').attr('src', image);
                        content.attr('href', link);
                        content.appendTo(box);

                        break;
                    case (cnt == ''):
                        break;
                    default:
 
                        break;
                }
                $('.popup').fadeOut(500);
                $('.popup input').each(function () {
                    $(this).val('');
                });
                $('.edit-now').removeClass('.edit-now');
                $('.editProperties div').hide();
                $('.hyperBox').show();
                $('.boxType select').val('hyperBox');
            })
        }
    };

    $(function () {
        Page.init();
    });

})(jQuery);

