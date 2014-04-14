define(['mustache',
        'jquery'], function (Mustache, jquery) {
    
    function render(parameters) {
        var template = jquery('#addSystemTemplate').html();
        
        var html = Mustache.to_html(template, parameters);
        jquery('#addSystemModule').html(html);        
    };

    return {
        render: render
    };
});