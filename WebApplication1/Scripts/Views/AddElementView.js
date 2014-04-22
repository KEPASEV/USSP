define(['mustache',
        'jquery',
        'Libs/bootstrap-select.min'], function (Mustache, jquery, bootstrapSelect) {

    function render(parameters) {
        var template = jquery('#addElementTemplate').html();
        var html = Mustache.to_html(template, parameters);
        jquery('#addElementModule').html(html);
        addButtonRender();
    }

    function addButtonRender() {
        var elementName = jquery('#nameElement');
        var addButton = jquery('#addElement')
            .attr('disabled', 'disabled');
        elementName.on('keyup', function (e) {
            if (elementName.val()) {
                addButton.removeAttr('disabled');
            } else {
                addButton.attr('disabled', 'disabled');                
            }
        });
    }
                
    return {
        render: render        
    };
});