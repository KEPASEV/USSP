define(['jquery',
        'Views/AddElementView',
        'Models/Element'], function (jquery, AddElementView, Element) {

    var module, name, role, type, comment, addButton, typeModules, id;
    var currentElement, currentElements;

    function start(element) {
        if (element) {
            AddElementView.render(element);
            initModuleElements();
            bindEvents();
            currentElement = element;
            initElement(element);
        } else {
            AddElementView.render(element);
            initModuleElements();
            bindEvents();            
        }
    }

    function initModuleElements() {
        module = jquery('#addElementModule');
        name = module.find('#nameElement');
        role = module.find('#role');
        role.__proto__.getRole = getRole;
        role.__proto__.setRole = setRole;
        type = module.find('#type');
        comment = module.find('#comment');
        addButton = module.find('#addElement');
        typeModules = module.find('#typeElementModule');
        id = module.find('#id');
    }
            
    function initElement(element) {
        name.val(element.name);
        role.setRole(element.role);
        type.val(element.type);
        comment.val(element.comment);
        id.val(element.id);
    }

    function getRole() {
        var currentRole = role.find('.active').children().val()
        return currentRole;
    }

    function setRole(newRole) {
        role.find('.active').children().removeAttr('checked');
        role.find('.active').removeClass('active');        
        role.find('[value="' + newRole + '"]').attr('checked', 'checked');
        role.find('[value="' + newRole + '"]').parent().addClass('active');        
    }

    function bindEvents() {
        onButtonClick();
    }
     
    function onButtonClick() {
        addButton.on('click', function (e) {
            if (currentElement) {
                edit();
            } else {
                add();
            }
        });
    }

    function add() {
        
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
            
            
            addElement(newElement, function () {
                addNewElementInLocalStorage(newElement);
                clearInputs();
                name.focus();
                require(['Controllers/ListElement'], function (ListElement) {
                    ListElement.start();
                })
            })
            

    }

    function edit() {        
        currentElements = getCurrentElements();
        var element = getElement(currentElement.id, currentElement.role)
        
        if (role.getRole() == currentElement.role) {
            element.name = name.val();
            element.type = type.val();
            element.role = role.getRole();
            element.comment = comment.val();
            localStorage.currentElements = JSON.stringify(currentElements);
        } else {
            element.name = name.val();
            element.type = type.val();
            element.role = role.getRole();
            element.comment = comment.val();            
            removeElement(currentElement);
            addNewElementInLocalStorage(element);
        }
            currentElement = undefined;
            currentElements = undefined;

            editElement(element, function () {
                clearInputs();
                name.focus();
                require(['Controllers/ListElement'], function (ListElement) {
                    ListElement.start();
                })
                start();
            });            
    }

    function getElement(elementId, role) {
        var arr;
        if (role == 'variable') {
            arr = currentElements.variables;
        } else if (role == 'parameter') {
            arr = currentElements.parameters;
        }
        console.log(arr);
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i].id == elementId) {
                return arr[i];
            }
        }
        return undefined;
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
            
    function removeElement(element) {
        var role = element.role;
        var flag = false;
        var arr;
        if (role == 'variable') {
            arr = currentElements.variables;
        } else if (role == 'parameter') {
            arr = currentElements.parameters;
        }
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i].id == element.id) {
                flag = true;
            }
            if (flag) {
                arr[i] = arr[i + 1];
            }
        }
        arr.pop();
        localStorage.currentElements = JSON.stringify(currentElements);     
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

    function addElement(element, func) {
        var systemId = JSON.parse(localStorage.currentSystem).id;
        var uri = 'api/Systems/' + systemId + '/Elements';

        jquery.ajax(
            {
                type: 'POST',
                url: uri,
                headers: {
                    Authorization: "Bearer " + localStorage.token
                },
                url: uri,
                contentType: "application/json",
                data: JSON.stringify(wrapToSend(element))
            }
            ).done(
                function (data) {
                    func(data);
                }

            )

    }

    function editElement(element, func) {

        var systemId = JSON.parse(localStorage.currentSystem).id;
        var uri = 'api/Systems/' + systemId + '/Elements/'+ element.id;

        jquery.ajax(
            {
                type: "PUT",
                url: uri,
                headers: {
                    Authorization: "Bearer " + localStorage.token
                },
                url: uri,
                contentType: "application/json",
                data: JSON.stringify(wrapToSend(element, true))
            }
            ).done(
                function (data) {
                    func(data);
                }

            )

    }

    function wrapToSend(element, flagEdit) {
        console.log(element);
        delete element.fuzzy;
        delete element.domain;
        if (!flagEdit) {
            delete element.id;
        }        
        delete element.values;
        element.system = JSON.parse(localStorage.currentSystem).id;
        switch (element.role) {
           case 'parameter':
                element.role=0;
                break;
            case 'variable':
                element.role = 1;
                break;
        }
        switch (element.type) {
            case 'number':
                element.type = 0;
                break;
            case 'nominal':
                element.type = 1;
                break;
            case 'time':
                element.type = 2;
                break;
        }
        console.log(element);
        return element;
    }

    return {
        start:start
    };
});