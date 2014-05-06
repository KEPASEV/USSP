define(['mustache', 'jquery'], function (Mustach, jquery) {

    function render(data) {
        var template = jquery('#maskTemplate').html();
        var html = Mustach.to_html(template, wrapDataToRender(data));
        jquery('#maskModule').html(html);
        onHoverTr();
    }

    function wrapDataToRender(data) {
        if (!data.dir) {
            data.dir = 0;
        }        
        data.ticks = [];
        data.directories = [];
        for (var i = 0, len = data.parameters[0].value.length; i < len; i++) {
            data.ticks[i] = i + 1;
            data.directories[i] = i;
        }
        data.directories[data.dir] += '<span class="glyphicon glyphicon-arrow-down"></span>';
        return data;
    }

    function onHoverTr() {
        var thead = jquery('#dataTableForMask thead .hoverLight');
        var tbody = jquery('#dataTableForMask tbody .hoverLight');
    }

    return {
        render: render
    }

});