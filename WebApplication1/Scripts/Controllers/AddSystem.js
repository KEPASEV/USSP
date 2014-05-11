define(['jquery',
        'Views/AddSystemView',
        'Models/System',
        'Other/guidGenerator'], function (jquery, AddSystemView, System, guidGenerator) {

    var module, buttonAdd, inputName, inputGoal;
    var currentSystemId;

    function start(system) {
        if (system) {
            AddSystemView.render(system);
            initModuleElements();
            edit(system.id);
        } else {
            AddSystemView.render();
            initModuleElements();
            add();
        }        
    }

    function initModuleElements() {
        module = jquery('#addSystemModule');
        buttonAdd = module.find('button');
        inputName = module.find('input');
        inputGoal = module.find('textarea');
    }

    function add() {
        buttonAdd.on('click', function (e) {
            var systems = JSON.parse(localStorage.systems);
            
            var name = inputName.val();
            var goal = inputGoal.val();
            var id = guidGenerator.getGUID();
            //console.log(id);
            var newSystem = new System({ id: id, name: name, goal: goal });
            systems.push(newSystem);
            localStorage.systems = JSON.stringify(systems);
            addSystem(newSystem, function (data) {
                console.log(data);
            });
            require(['Controllers/ListSystem'], function (ListSystem) {
                ListSystem.start();
            });

            inputName.val('').focus();
            inputGoal.val('');
        });
    }
            
    function edit(systemId) {
        currentSystemId = systemId;
        buttonAdd.on('click', function (e) {
            var systems = JSON.parse(localStorage.systems);

            


            var name = inputName.val();
            var goal = inputGoal.val();
            var index;
            for (var i = 0, len = systems.length; i < len; i++) {
                if (systems[i].id == systemId) {
                    systems[i].name = name;
                    systems[i].goal = goal;
                    index = i;
                    editSystem(systemId, systems[i], function (data) {
                        console.log(data);
                    });
                    break;
                }
            }
            
            require(['Controllers/InfoSystem'], function (InfoSystem) {
                InfoSystem.start(systems[index]);
            });
            
            localStorage.systems = JSON.stringify(systems);

            require(['Controllers/ListSystem'], function (ListSystem) {
                ListSystem.start();                         
            });

            inputName.val('').focus();
            inputGoal.val('');
            currentSystemId = undefined;
            start();
        });
    }
            
    function clearIfWasRemove(systemId) {
        if (currentSystemId == systemId) {
            inputName.val('').focus();
            inputGoal.val('');
            currentSystem = undefined;
            start();
        }        
    }

    function addSystem(system, func) {
        var uri = 'api/system/';
        jquery.ajax({
            type: "POST",
            url: uri,
            contentType: "application/json",
            data: JSON.stringify(system)
        })
        .done(
        function (data) {
            func(data);
        });
    }

    function editSystem(id, system, func) {
        var uri = 'api/system/'+id;
        jquery.ajax({
            type: "PUT",
            url: uri,
            contentType: "application/json",
            data: JSON.stringify(system)
        })
        .done(
        function (data) {
            func(data);
        });
    }

    return {
        start: start,
        clear: clearIfWasRemove
    };
});