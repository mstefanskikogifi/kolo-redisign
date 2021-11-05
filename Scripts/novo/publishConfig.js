require.config({
    baseUrl: '/scripts/',
    paths: {
        jquery: 'lib/jquery-1.9.1.min',
        carousel: 'lib/jCarouselLite',
        jqueryui: 'lib/jquery-ui-1.10.3.min',
        select: 'lib/jquery.styleSelect',
        mousewheel: 'lib/jquery.mousewheel',
        jscroll: 'lib/jscrollpane',
        main: 'novo/main',
        boxComposer: 'novo/boxCreate'
    }
});
//define(['jquery'], function () {
//    require(['main']);
//    $(document).ready(function () {
//        if ($('.box_composer').length) {
//            require(['boxComposer']);
//        }
//    });
//});