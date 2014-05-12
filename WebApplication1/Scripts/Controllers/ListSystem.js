define(['jquery',
        'Libs/lodash.compat.min',
        'Views/ListSystemView'],
       function (jquery, lodash, ListSystemView) {

    var module, list;

    function start() {
        getSystems(
            function (data) {
                localStorage.systems = JSON.stringify(data)
                ListSystemView.render(data);
                initModuleElements();
                bindEvents();
            }
        );      

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
                getSystem(systemId, function (data) {
                    console.log(data);
                })
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
        getSystem(systemId, function (data) {
            console.log();
        })
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
                removeSystem(systemId,
                    function (data) {
                        console.log(data);
                    }
                    );
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
       
    function getSystems(func) {
        var uri = 'api/system';
        jquery.ajax({
                type: "GET",
                headers: {
                    Authorization: "Bearer " + localStorage.token
                },
                url: uri
            })
            .done(
            function (data) {
                func(data);                
            })
    }

    function removeSystem(id, func) {
        var uri = 'api/system/'+id;
        jquery.ajax({
            type: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.token
            },
            url: uri
        })
        .done(
        function (data) {
            func(data);
        })

    }

    function getSystem(id, func) {
        var uri = 'api/system/' + id;
        jquery.ajax({
            type: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.token
            },
            url: uri
        })
        .done(
        function (data) {
            func(data);
        });
    }

    return {
        start: start
    };
});