define(['mustache', 'jquery'], function (Mustache, jquery) {

    function render(parameters) {
        var template = jquery('#listSystemTemplate').html();
        console.log(parameters);
        var html = Mustache.to_html(template, parameters);
        jquery('#listSystemModule').html(html);      
    }

    return {
        render: render
    };

});