define(['jquery',
        'mustache'], function (jquery, Mustache) {

            function render(data) {
                var tmpl = jquery('#listMaskTemplate').html();
                var html = Mustache.to_html(tmpl, data);                
                jquery('#listMaskModule').html(html);
            }
            
            return {
                render:render
            }
});