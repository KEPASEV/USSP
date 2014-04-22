define(['jquery',
        'Views/AddElementView'], function (jquery, AddElementView) {

    var module, name, role, type, comment, addButton, typeModules;

    function start(element) {
        AddElementView.render(element);
        initModuleElements();
        bindEvents();
    }

    function initModuleElements() {
        module = jquery('#addElementModule');
        name = module.find('#nameElement');
        role = module.find('#role');
        role.__proto__.getRole = getRole;
        type = module.find('#type');
        comment = module.find('#comment');
        addButton = module.find('#addElement');
        typeModules = module.find('#typeElementModule');
    }

    function getRole() {
        var currentRole = role.find('.active').children().val()
        return currentRole;
    }

    function bindEvents() {
        typeSelect();
    }

    function typeSelect() {
        type.on('change', function () {
            var currentType = type.val();
            typeSettingStart(currentType);
        });
    }

    function typeSettingStart(type) {
        
        if (type == "number") {
            typeModules.empty();
        } else if (type == "nominal") {            
            require(['Controllers/AddNominalTypeState'],
                function (AddNominalTypeState) {
                    localStorage.currentStates = JSON.stringify({ currentState: undefined, states:[]});
                    AddNominalTypeState.start();
                }
            )
        } else if (type == "time") {
            typeModules.empty();
        }
    }

    return {
        start:start
    };
});