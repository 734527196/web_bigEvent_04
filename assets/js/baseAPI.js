var dataURL = 'http://ajax.frontend.itheima.net';

$.ajaxPrefilter(function(options) {
    options.url = dataURL + options.url
})