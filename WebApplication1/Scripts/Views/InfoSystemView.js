define(['mustache', 'jquery'], function (Mustache, jquery) {
    function render(parameters) {
        jquery.get('../Scripts/Views/Templates/infoSystemTemplate.html',
            function (template) {
                var html = Mustache.to_html(template, parameters);
                jquery('#infoSystemModule').html(html);
            });
    }

    return {
        render:render
    };

});