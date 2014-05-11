define(['mustache',
        'jquery'], function (Mustache, jquery) {
        
    function render(states) {        
        var template = jquery('#nominalTypeElementTemplate').html();
        var html = Mustache.to_html(template, states);
        jquery('#typeElementModule').html(html);
        renderAddButton(states);
    }

    function renderAddButton(states) {
        var module = jquery('#nominalTypeModule');
        module = jquery('#nominalTypeModule');
        inputName = module.find('#nameState');        
        button = module.find('#addState');
        if (states && states.currentState && states.currentState != {}) {
            button.removeAttr("disabled");
        } else {
            button.attr("disabled", "disabled");
        }        
        inputName.on('keyup', function (e) {
            if (inputName.val()) {
                button.removeAttr("disabled");              
            } else {
                button.attr("disabled", "disabled");                
            }
        });
    }
            
    return {
        render: render
    };

});