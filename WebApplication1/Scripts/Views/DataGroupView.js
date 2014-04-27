define(['mustache', 'jquery'], function (Mustach, jquery) {

    function render(data) {
        
        var template = jquery('#dataGroupTemplate').html();
        var html = Mustach.to_html(template, wrapDataToRender(data));        
        jquery('#dataGroupModule').html(html);
    }

    function wrapDataToRender(data) {
        data.ticks = [];        
        for (var i = 0, len = data.parameters[0].value.length; i < len; i++) {
            data.ticks[i] = i + 1;
        }
        return data;
    }

    return {
        render: render
    }

});