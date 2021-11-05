(function ($) {
clipboard = {
    lang: {
        itemSingular: 'item',
        itemPlural: 'items',
        itemsEmpty: 'no items',
        addToMyList: 'add to my list',
        removeFromMyList: 'remove from my list'
    },
    cookieName: 'quickSpec',
    clipId: null, // unique id of user clipboard
    serviceHost: '/Services/BasketService/BasketService.asmx',
    clipboardPopup: null,
    clipCounter: null, // HTML node with current items count in user clipboard
    init: function () {
        var self = this;
        this.checkClipState();
            self.bindHandlers();
            self.bindRemove();
            self.bindSendEmail();
            if($('.myList').length>0){
                self.popups();
            }
    },
    updateList: function () {
        var self = this;

        self.post(self.serviceHost + '/GetProductListHtml', { basketGuid: self.clipId }, function (data) {
            $('.basketProductList').html(data.d);
            self.bindHandlers();
            self.bindRemove();
            self.checkProductList();
            clipboard.sumCounter();
        });
        self.post(self.serviceHost + '/GetProductList', { basketGuid: self.clipId }, function (data) {
            var a = JSON.parse(data.d, "Id");
            $('.my-list-counter').text(a.length);
            if (a.length == 0) {
                $('.addProductButton').show();
                $('.removeProductButton').hide();
            } else {
                $('.my-list-handler.addProductButton').each(function () {
                    var self = $(this);
                    var isInBasket = false;
                    $.each(a, function (i, val) {
                        if (self.data('productid') == val.Id) {
                            self.parent().find('.removeProductButton').show();
                            self.parent().find('.addProductButton').hide();
                            isInBasket = true;
                        }
                    });
                    if (!isInBasket) {
                        self.parent().find('.addProductButton').show();
                        self.parent().find('.removeProductButton').hide();
                    }
                });
            }
            
        });
       
    },
    bindHandlers: function () {
        var self = this;

        $('#addProductByCodeButton').unbind('click').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            self.post(self.serviceHost + '/AddByProductCode', { basketGuid: self.clipId, productCode: $('.productCodeValue').val() }, function (data) {
                self.updateList();
                if (data.d==-1) {
                    $('.ProductNotExist').show();
                }
                else {
                    $('.ProductNotExist').hide();
                }
            });
        });

        //New
        $('.addProductButton').unbind('click').click(function (e) {
            e.preventDefault();
            self.post(self.serviceHost + '/AddByProductId', { basketGuid: self.clipId, productId: $(this).data('productid') }, function (data) {
                self.updateList();
            });
        });

        $('.quantity .add').unbind('click').click(function (e) {
            var target = $(this).prev('.count');
            self.post(self.serviceHost + '/IncreaseQuantity', { basketGuid: self.clipId, productId: $(this).data('productid') }, function (data) {
                self.updateList();
            });
        });

        $('.quantity .remove').unbind('click').click(function (e) {
            e.preventDefault();
            self.post(self.serviceHost + '/DecreaseQuantity', { basketGuid: self.clipId, productId: $(this).data('productid') }, function (data) {
                self.updateList();
            });
        });

        //$('#isAddRebatePicked').on('change', function () {
        //    clipboard.checkRebateButton();
        //});
        $('.rabate input[type="text"]').unbind('keyup').keyup(function () {
            clipboard.checkRebateButton();
        });
        $('.rabate input[name="rabate"]').on('change',function () {
            clipboard.checkRebateButton();
        });
        $('.rebateBtn').unbind('click').click(function (e) {
            clipboard.rebateCounter(true);
        });

    },
    bindRemove: function () {
        var self = this;
        $('.removeProductButton').unbind('click').click(function (e) {
            e.preventDefault();
            var me = $(this);

            self.post(self.serviceHost + '/RemoveProduct', { basketGuid: self.clipId, productId: $(me).data('productid') }, function (data) {
                self.updateList();

            });
        });
    },
    bindSendEmail: function () {
        var self = this;
        $('.emailSendBtn').unbind('click');
        $('.emailSendBtn').on('click', function (e) {
            $('#lblEmailAddress').text($('#emailAddress').val());
        $('.loader-contener').removeClass('hide');
        e.preventDefault();
        var me = $(this);
        var rebate = $('#' + rebateId).val();
        self.post(self.serviceHost + '/SendListByEmail', {
                emailAddress: $('#emailAddress').val(),
                title: $('#emailTitle').val(),
                message: $('#emailMessage').val(),
                contactName: $('#'+contactNameId).val(),
                contactPhone: $('#'+contactPhoneId).val(),
                rebate: rebate==undefined?'':rebate
        }, function (data) {
            $('.loader-contener').addClass('hide');
                if (data.d.Success == false)
                {
                    $('#emailErrorMessage').text(data.d.Message);
                } else {
                    $('.emailForm .successMessage').show();
                }
            });
        });
    },
    checkRebateButton: function () {
        if ( $('.rabate input[type="text"]').val().length > 0 && $('.rabate input[name="rabate"]:checked').length>0) {
            $('.rebateBtn').removeClass('hide');
        } else {
            $('.rebateBtn').addClass('hide');
            clipboard.sumCounter();
        }
    },
    checkProductList: function () {
        if ($('.basketProductRow').length>0) {
            $('.myList, .ml-secondForm, .ml-actionButtonsSection').removeClass('hide');
        } else {
            $('.myList, .ml-secondForm, .ml-actionButtonsSection').addClass('hide');
        }
    },
    checkClipState: function () {
        var self = this;
        var clipId;

        if (!(clipId = $.cookie(this.cookieName))) {
            this.post(self.serviceHost + '/CreateBasket', null, function (data) {
                self.clipId = data.d;
                $.cookie(self.cookieName, data.d, { path: '/', expires: 1 });
            });
            $('.my-list-handler').each(function () {
                $(this).addClass('add');
            });
        } else {
            this.post(this.serviceHost + '/IsBasketExist', { basketGuid: clipId }, function (data) {
                if (data.d == false) {
                    //                    $.removeCookie(self.cookieName); //OLD VERSION
                    //                    self.checkClipState();//END
                    self.post(self.serviceHost + '/CreateBasket', null, function (data) { //NEW VERSION
                        self.clipId = data.d;
                        $.cookie(self.cookieName, data.d, { path: '/', expires: 1 });
                    });//END
                    $('.my-list-handler').each(function () {
                        $(this).addClass('add');
                    });
                } else if (data.d == true) {
                    self.clipId = clipId;
                    self.updateList();
                } else {

                }
            });
        }
    },
    sumCounter: function () {
        
        $('.nettoSum').text(SumCount('.nettoPrice', '.count'));
        $('.bruttoSum').text(SumCount('.bruttoPrice', '.count'));

        function SumCount(selector, multiplier) {
            var sum = 0;
            var total = 0;
            $(selector).each(function () {
                //console.log(parseFloat($(this).text().replace(',','.')));
                total = parseFloat($(this).text().replace(',', '.')) * parseFloat($(this).parent().parent().find(multiplier).text().replace(',', '.'));
                //console.log(total);
                sum += total;
            });
            return sum.toFixed(2);
        };
    },
    rebateCounter: function (status) {
        clipboard.sumCounter();
        if (!status) {
            return false;
        } else {
            var rabate = parseFloat($('.rebateCode').val());
                if (isNaN(rabate) || rabate>100) { return false; }
                var isNetto = $('input:radio[name=rabate]:checked').val();
                priceNetto = parseFloat($('.nettoSum').text().replace(',', '.'));
                priceBrutto = parseFloat($('.bruttoSum').text().replace(',', '.'));
                if (isNaN(priceNetto) || isNaN(priceBrutto)) {
                    return false;
                }
                var rebatedpriceNetto = priceNetto;
                var rebatedpriceBrutto = priceBrutto;
                if (isNetto==1) {
                    rebatedpriceNetto = priceNetto * (100 - rabate) / 100;
                    rebatedpriceBrutto = rebatedpriceNetto * (priceBrutto / priceNetto);
                }
                else {
                    rebatedpriceBrutto = priceBrutto * (100 - rabate) / 100;
                    rebatedpriceNetto = rebatedpriceBrutto * (priceNetto / priceBrutto);

                }
                if (!isNaN(rebatedpriceNetto)) {
                    $('.nettoSum').text(Math.round(rebatedpriceNetto * 100) / 100);
                }
                if (!isNaN(rebatedpriceBrutto)) {
                    $('.bruttoSum').text(Math.round(rebatedpriceBrutto * 100) / 100);
                }

        }
        return false;
    },
    post: function (url, data, success) {
        var config = {
            type: "POST",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: success
        };
        if (data) {
            config.data = JSON.stringify(data);
        }
        $.ajax(config);
    },
    popups: function () {
        $(".sendPdfForm").dialog({
            appendTo: "form",
            autoOpen: false,
            minWidth: $('.popupWidthHandler').width(),
            dialogClass: 'myListPopup',
            resizable: true,
            modal: true,
            title: $(".sendPdfForm").attr('data-title')
        });
        $(".emailForm").dialog({
            appendTo: "form",
            autoOpen: false,
            minWidth: $('.popupWidthHandler').width(),
            dialogClass: 'myListPopup',
            resizable: true,
            modal: true,
            title: $(".emailForm").attr('data-title'),
            close: function () {
                $('.emailForm .successMessage').hide();
            }
        });

        $('.openSavePdfForm').on('click', function () {
            $(".sendPdfForm").dialog('open');
        });
        $('.sendEmailBtn').on('click', function () {
            $(".emailForm").dialog('open');
        });
        //$('.emailSendBtn').on('click', function () {
        //    $('.successMessage').show();
        //});

        $(window).resize(function () {
            $(".sendPdfForm").dialog("option", "width", $('.popupWidthHandler').width());
            $(".emailForm").dialog("option", "width", $('.popupWidthHandler').width());
            //$(".emailSendBtn").dialog("option", "width", $('.popupWidthHandler').width());
        });
    }
};
$(document).ready(function () {
    if ($('body').hasClass('myListVisible')) {
        clipboard.init();
    }
});
})(jQuery);
