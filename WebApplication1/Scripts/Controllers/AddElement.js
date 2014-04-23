define(['jquery',
        'Views/AddElementView',
        'Models/Element'], function (jquery, AddElementView, Element) {

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
        add();
    }
                           
    function add() {
        addButton.on('click', function (e) {            
            var nameElement = name.val();
            var typeElement = type.val();
            var roleElement = role.getRole();           
            var commentElement = comment.val();

            var newElement = new Element({
                name: nameElement,
                type: typeElement,
                role: roleElement,
                comment: commentElement
            });
            
            addNewElementInLocalStorage(newElement);

            clearInputs();
            name.focus();
            require(['Controllers/ListElement'], function (ListElement) {
                ListElement.start();
            })
        });
    }

    function getCurrentElements() {
        var currentElements;
        if (localStorage.currentElements) {
            currentElements = JSON.parse(localStorage.currentElements);
        } else {
            currentElements = {};
            currentElements.parameters = [];
            currentElements.variables = [];
        }
        return currentElements;
    }
            
    function addNewElementInLocalStorage(element) {
        var currentElements = getCurrentElements();
        if (element && element.role == 'parameter') {
            currentElements.parameters.push(element);
        } else if (element && element.role == 'variable') {
            currentElements.variables.push(element);
        }
        localStorage.currentElements = JSON.stringify(currentElements);
    }

    function clearInputs() {
        name.val('');
        type.val('number');
        comment.val('');
    }

    return {
        start:start
    };
});