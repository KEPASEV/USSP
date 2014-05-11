define(['mustache', 'jquery'], function (Mustache, jquery) {

    function render(data) {
        var template = jquery('#listGroupTemplate').html();
        var html = Mustache.to_html(template, data);
        jquery('#listGroupModule').html(html);
    }

    return {
        render: render
    }

});