define(['mustache',
        'jquery'], function (Mustache, jquery) {
    
            function render(parameters) {
                var template = jquery('#timeTypeElementTemplate').html();                
                var html = Mustache.to_html(template, parameters);
                jquery('#typeElementModule').html(html);
            }

            return {
                render:render
            };

});