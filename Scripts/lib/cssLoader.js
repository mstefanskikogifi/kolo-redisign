var cssLoader = {};

cssLoader.paths = {
    main: '/content/css/main.css',
    boxes: '/content/css/boxes.css',
    contentPages: '/content/css/contentPages.css',
    inputStyle: '/content/css/inputStyle.css',
    inspiration: '/content/css/inspirations.css',
    products: '/content/css/products.css',
    sliders: '/content/css/sliders.css',
    jqueryui_tabs: '/content/themes/base/jquery.ui.tabs.css',
    jqueryui_scroll: '/content/themes/base/jquery.ui.slider.css',
    collections: '/content/css/collections.css',
    kolo: '/content/css/brands/kolo.css'
}

cssLoader.load = function (key) {

    var url = this.paths[key];
    var links = document.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
        if (links[i].href.indexOf(url) != -1) {
            return false;
        }
    }

    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
    return true;
};

document.createElement('header');
document.createElement('nav');
document.createElement('section');
document.createElement('article');
document.createElement('aside');
document.createElement('footer');
document.createElement('hgroup');