require.config({    
    baseUrl: '/scripts/',
    paths: {
        main: 'novo/main',
        jquery: 'lib/jquery-1.9.1',
        carousel: 'lib/jCarouselLite',
        jqueryui: 'lib/jquery-ui-1.10.3',
        select: 'lib/jquery.styleSelect',
        mousewheel: 'lib/jquery.mousewheel',
        jscroll: 'lib/jscrollpane',
        boxComposer: 'novo/boxCreate',
        ytvideo: 'novo/ytvideo',
        modernizr: 'lib/modernizr-2.6.2',
        swfobject: 'lib/swfobject',
        googleMap: 'novo/googleMap',
        videoLoad: '//www.youtube.com/iframe_api',
        ezmark: 'lib/jquery.ezmark',
        cookie: 'lib/jquery.cookie',
        boxesPosition: 'novo/boxesPosition',
        wselect: 'lib/jquery.stylish-select.min',
        touch: 'lib/jquery.touchSwipe',
        svgMap: 'lib/raphael-min',
        productFilters: 'novo/productFilters'
    },
    shim: {
        'carousel': {
            deps: ['touch']
        }
    },
    waitSeconds: 15
});
//define(['cookie'], function () {
    require(['main']);
    require(['modernizr']);
    jQuery(function ($) {
        $(document).ready(function () {
            if ($('.box_composer').length) {
                require(['boxComposer']);
            }
        });
    });
//});