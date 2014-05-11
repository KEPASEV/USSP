define(['mustache',
        'jquery',
        'Libs/bootstrap-select.min',
        'Libs/lodash.compat.min'], function (Mustache, jquery, bootstrapSelect, lodash ) {

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
            data = getUniqueValues(data);
            var type = data.currentElement.type;            
            var template = jquery('#' + type + 'RangeDeterm').html();
            var html = Mustache.to_html(template,wrapForRender (data));
            jquery('#determAbstractValModule').html(html);
            renderItemToolBox();
        }
    }

    function renderItemToolBox() {
        
        jquery('.list-group-item')
            .mouseenter(function () {
                jquery(this).find('.itemToolBox').show();
            })
            .mouseleave(function () {
                jquery(this).find('.itemToolBox').hide();
            });
    }

    function getUniqueValues(data) {
        if (data.currentElement.type == "nominal") {
            if (data.currentElement) {
                if (!data.currentElement.uniqVal) {
                    data.currentElement.uniqVal = [];
                    data.currentElement.uniqValPersist = [];
                    data.currentElement.uniqVal = lodash.uniq(data.currentElement.value);
                    data.currentElement.uniqValPersist = lodash.uniq(data.currentElement.value);
                    var index = lodash.findIndex(data.variables, function(v){
                        return v.id == data.currentElement.id;
                    });
                    data.variables[index].uniqVal = [];
                    data.variables[index].uniqValPersist = [];
                    data.variables[index].uniqVal = lodash.uniq(data.currentElement.value);
                    data.variables[index].uniqValPersist = lodash.uniq(data.currentElement.value);
                    localStorage.elementsWithData = JSON.stringify(data);
                }                
            }            
        }
        return data;
    }

    return {
        render: render,
        select: selectHandler

    }

});