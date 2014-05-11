define(['mustache', 'jquery'], function (Mustache, jquery) {
    
    function render(parameters) {
        var template = jquery('#infoSystemTemplate').html();
        var html = Mustache.to_html(template, parameters);
        jquery('#infoSystemModule').html(html);
        buttonRender(parameters);
    }

    function buttonRender(parameters) {
        if (parameters) {
            console.log(parameters);
            jquery('#infoSystemModule')
            .find('.btn-next').removeAttr("disabled");
        } else {
            jquery('#infoSystemModule')
            .find('.btn-next').attr("disabled", "disabled");
        }
    }

    return {
        render:render
    };

});