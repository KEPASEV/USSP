define(['mustache',
        'jquery'], function (Mustache, jquery) {
    
    function render(parameters) {
        var template = jquery('#addSystemTemplate').html();
        var html = Mustache.to_html(template, parameters);
        jquery('#addSystemModule').html(html);
        buttonRender(parameters);
    };

    function buttonRender(parameters) {
        var button = jquery('#addSystemModule').find('button');
        var inputName = jquery('#addSystemModule').find('input');
        var helper = jquery('#addSystemModule').find('.bg-danger');
            helper.text("Введите название системы");

        if (!parameters) {
            button.attr("disabled", "disabled");
            inputName.on('keyup',function (e) {                
                if (inputName.val()) {
                    button.removeAttr("disabled");
                    helper.hide();
                } else {
                    button.attr("disabled", "disabled");
                    helper.show();
                }
           });
            button.text("Создать систему");
        } else {            
            inputName.on('keyup', function (e) {
                if (inputName.val()) {
                    button.removeAttr("disabled");
                    helper.hide();
                } else {
                    button.attr("disabled", "disabled");
                    helper.show();
                }
            });            
            button.text("Сохранить изменения");
        }
    }

    return {
        render: render
    };
});