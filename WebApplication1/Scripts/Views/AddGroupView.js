define(['mustache',
        'jquery',
        'Libs/bootstrap-select.min'], function (Mustache, jquery, bootstrapSelect ) {

    function render(data) {
        var template = jquery('#addGroupTemplate').html();
        var html = Mustache.to_html(template, wrapForRender(data));
        jquery('#addGroupModule').html(html);        
        onSelectVar();
        determAbstractValModule(data);
        renderSelect();
    
    }

    function selectHandler(data) {
        determAbstractValModule(data);
        renderSelect();
    }

    function renderSelect() {
        jquery('#addGroupModule select').selectpicker();
    }

    function onSelectVar() {
        var module = jquery('#addGroupModule');
        var select = module.find('.panel-heading select');
        lightRow(select.val());
        select.on('change', function () {
            hideLightRow();
            lightRow(select.val());
        });
    }

    function lightRow(id) {
        var dataTable = jquery('#dataTable');
        var thead = dataTable.find('thead');
        var tbody = dataTable.find('tbody');
        var head = thead.find('[data-var="'+id+'"]');
        var body = tbody.find('[data-var="'+id+'"]');
        head.addClass('hoverLight');
        body.addClass('hoverLight');
    }

    function hideLightRow() {
        jquery('#dataTable .hoverLight')
            .removeClass('hoverLight');        
    }

    function wrapForRender(data) {
        if (data && data.currentElement) {
            if (data.currentElement.groups) {
                for (var i = 0, len = data.currentElement.groups.length; i < len; i++) {
                    data.currentElement.groups[i].num = i + 1;
                }
            }
        }
        return data;
    }
    
    function determAbstractValModule(data) {
        if (data &&
            data.currentElement &&
            data.currentElement.type) {
            var type = data.currentElement.type;            
            var template = jquery('#' + type + 'RangeDeterm').html();
            var html = Mustache.to_html(template, data);
            jquery('#determAbstractValModule').html(html);
        }
    }

    return {
        render: render,
        select:selectHandler

    }

});