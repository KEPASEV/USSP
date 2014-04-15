define(['jquery',
        'Views/ListSystemView'], function (jquery, ListSystemView) {

    var module, list;

    function start() {
        var data = JSON.parse(localStorage.systems);
        ListSystemView.render(data);        
        initModuleElements();
        bindEvents();
    }

    function initModuleElements() {
        module = jquery('#listSystemModule');
        list = module.find('.list-group');
    }

    function bindEvents() {
        onItemHover();
        onItemClick();
        actions();
    }

    function onItemHover() {
        list.find('.list-group-item')
            .mouseenter(function () {
                jquery(this).find('.btn-group').show();
            })
            .mouseleave(function () {
                jquery(this).find('.btn-group').hide();
            });
    }

    function onItemClick() {
        list.find('.list-group-item')
            .click(function () {              
                var elem = jquery(this);                     
                var systemId = elem.find('input').val();
                var systems = JSON.parse(localStorage.systems);
                var system;
                var index;
                for (var i = 0, len = systems.length; i < len; i++) {
                    if (systems[i].id == systemId) {
                        system = systems[i];
                        index = i;
                    }
                }
                require(['Controllers/InfoSystem'], function (InfoSystem) {
                    InfoSystem.start(system);
                });
                location.href = "#infoSystemModule";
                return false;
            });            
    }

    function actions() {
        var el = list.find('.list-group-item button').click(
            function () {
                var action = getAction(this);
                if (action == "edit") {
                    editAction(this);
                } else if (action == "remove") {
                    removeAction(this);
                }
            }
        );        
    }

    function getAction(elem) {
        var target = jquery(elem);
        if (target.children().hasClass("glyphicon-pencil")) {
            return "edit";
        } else if (target.children().hasClass("glyphicon-remove")) {
            return "remove";
        }
    }
   
    function editAction(elem) {
        var target = jquery(elem);
        var systemId = target.parent().siblings().filter('input').val();
        var systems = JSON.parse(localStorage.systems);
        var system;
        for (var i = 0, len = systems.length; i < len; i++) {
            if (systems[i].id == systemId) {
                system = systems[i];
            }
        }
        require(['Controllers/AddSystem'], function (AddSystem) {
            AddSystem.start(system);
        });
    }

    function removeAction(elem) {
        var target = jquery(elem);
        var systemId = target.parent().siblings().filter('input').val();
        var systems = JSON.parse(localStorage.systems);
        var system;
        var index;
        for (var i = 0, len = systems.length; i < len; i++) {
            if (systems[i].id == systemId) {
                system = systems[i];
                index = i;
            }
        }
        
        ListSystemView.renderModal(system);
        var modal = jquery('#removeModal');
        modal.find('.btn-default')
            .click(function () {
                
                var newSystems = removeFromArr(index, systems);
                localStorage.systems = JSON.stringify(newSystems);
                modal.modal('hide');
                start();
                require(['Controllers/InfoSystem', 'Controllers/AddSystem'], function (InfoSystem, AddSystem) {                    
                    InfoSystem.start();
                    AddSystem.clear(systemId);
                });
            });        
    }

    function removeFromArr(index, Arr) {
        for (var i = index, len = Arr.length; i < len; i++) {
            Arr[index] = Arr[index + 1];
        }
        Arr.pop();
        return Arr
    }
            
    return {
        start: start
    };
});