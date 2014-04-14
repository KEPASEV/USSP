define(['jquery',
        'Views/AddSystemView',
        'Models/System'], function (jquery, AddSystemView, System) {

    var module, buttonAdd, inputName, inputGoal;

    function start() {
        AddSystemView.render();
        initModuleElements();
        bindEvents();
    }

    function initModuleElements() {
        module = jquery('#addSystemModule');
        buttonAdd = module.find('button');
        inputName = module.find('input');
        inputGoal = module.find('textarea');
    }

    function bindEvents() {
        add();
    }

    function add() {
        buttonAdd.on('click', function (e) {
            var systems = JSON.parse(localStorage.systems);
            
            var name = inputName.val();
            var goal = inputGoal.innerText;

            systems.push(new System({ name: name, goal: goal }));
            localStorage.systems = JSON.stringify(systems);
            require(['Controllers/ListSystem'], function (ListSystem) {
                ListSystem.start();
            });

            inputName.val('').focus();
            inputGoal.val('');
        });
    }

    function edit() {
    }

    function remove() {
    }

    return {
        start:start
    };
});