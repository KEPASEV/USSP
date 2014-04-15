define(['mustache',
        'jquery',
        'Libs/bootstrap.min'], function (Mustache, jquery, bootstrap) {

    function render(parameters) {
        var template = jquery('#listSystemTemplate').html();        
        var html = Mustache.to_html(template, parameters);
        jquery('#listSystemModule').html(html);
        selectedRender();
    }

    function selectedRender() {
        var selectedClass = 'selectedItem';
        var list = jquery('#listSystemModule');
        list.find('.list-group-item')
            .click(function () {               
                list.find('.'+selectedClass).removeClass(selectedClass);
                var elem = jquery(this);
                elem.addClass(selectedClass);
                return false;
            });
    }

    function renderModal(parameters) {
            var template = jquery('#removeModalTemplate').html();
            var html = Mustache.to_html(template, parameters);
            jquery('#removeModalModule').html(html);
            jquery('#removeModal').modal();
    }

    return {
        render: render,
        renderModal: renderModal
    };

});