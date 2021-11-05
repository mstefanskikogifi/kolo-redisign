//clipboard = {
//    lang: {
//        itemSingular: 'item',
//        itemPlural: 'items',
//        itemsEmpty: 'no items',
//        addToMyList: 'add to my list',
//        removeFromMyList: 'remove from my list'
//    },
//    cookieName: 'quickSpec',
//    clipId: null, // unique id of user clipboard
//    serviceHost: '/Services/BasketService/BasketService.asmx',
//    clipboardPopup: null,
//    clipCounter: null, // HTML node with current items count in user clipboard
//    init: function () {
//        var self = this;
//        this.checkClipState();

//        $(document).ready(function () {
//            self.bindHandlers();
//            self.bindRemove();
//            self.bindSendEmail();
//        });
//    },
//    updateList: function () {
//        var self = this;
//        self.post(self.serviceHost + '/GetProductListHtml', { basketGuid: self.clipId }, function (data) {
//            $('.basketProductRow').html(data.d);
//            self.bindHandlers();
//            self.bindRemove();
//            self.bindSendEmail();
//        });
//    },
//    bindHandlers: function () {
//        var self = this;

//        $('#addProductByIdButton').unbind('click').click(function (e) {
//            e.preventDefault();
//            var me = this;

//            self.post(self.serviceHost + '/AddByProductId', { basketGuid: self.clipId, productId: $('.productIdValue').val() }, function (data) {
//                self.updateList();
//            });
//        });

//        $('#addProductByCodeButton').click(function (e) {
//            e.preventDefault();
//            var me = this;

//            self.post(self.serviceHost + '/AddByProductCode', { basketGuid: self.clipId, productCode: $('.productCodeValue').val() }, function (data) {
//                self.updateList();
//            });
//        });
//    },
//    bindRemove: function () {
//        var self = this;
//        $('.removeProductButton').unbind('click');
//        $('.removeProductButton').on('click', function (e) {
//            e.preventDefault();
//            var me = $(this);

//            self.post(self.serviceHost + '/RemoveProduct', { basketGuid: self.clipId, productId: $(me).data('id') }, function (data) {
//                self.updateList();
//            });
//        });
//    },
//    bindSendEmail: function () {
//        var self = this;
//        $('.emailSendBtn').unbind('click');
//        $('.emailSendBtn').on('click', function (e) {
//            e.preventDefault();
//            var me = $(this);

//            self.post(self.serviceHost + '/SendListByEmail', { emailAddress: $('#emailAddress').val(), title: $('#emailTitle').val(), message: $('#emailMessage').val() }, function (data) {
                if (data.d.Success == false)
                {
                    $('#emailErrorMessage').text('Please enter a valid email address.');
                }
//            });
//        });
//    },
//    checkClipState: function () {
//        var self = this;
//        var clipId;

//        if (!(clipId = $.cookie(this.cookieName))) {
//            this.post(self.serviceHost + '/CreateBasket', null, function (data) {
//                self.clipId = data.d;
//                $.cookie(self.cookieName, data.d, { expires: 1 });
//            });
//        } else {
//            this.post(this.serviceHost + '/IsBasketExist', { basketGuid: clipId }, function (data) {
//                if (data.d == false) {
//                    //                    $.removeCookie(self.cookieName); //OLD VERSION
//                    //                    self.checkClipState();//END
//                    self.post(self.serviceHost + '/CreateBasket', null, function (data) { //NEW VERSION
//                        self.clipId = data.d;
//                        $.cookie(self.cookieName, data.d, { expires: 1 });
//                    });//END
//                } else if (data.d == true) {
//                    self.clipId = clipId;
//                } else {

//                }
//            });
//        }
//    },
//    post: function (url, data, success) {
//        var config = {
//            type: "POST",
//            url: url,
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            success: success
//        };
//        if (data) {
//            config.data = JSON.stringify(data);
//        }
//        $.ajax(config);
//    }
//};
//clipboard.init();
