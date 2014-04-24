define(['jquery', 'Views/ListELementView'], function (jquery, ListElementView) {

    var module, parametersBody, variablesBody;
    var currentElements, currentElement;

    function start() {
        currentElements = getData();
        ListElementView.render(currentElements);
        initModuleElements();
        actions();
    }

    function initModuleElements() {
        module = jquery('#listElementModule');
        parametersBody = module.find('#parametersTable tbody');
        variablesBody = module.find('#variablesTable tbody');
    }

    function getData() {        
        currentElements = localStorage.currentElements ? JSON.parse(localStorage.currentElements) : undefined;
        if (currentElements) {
            currentElements.parametersCount = 1;
            currentElements.variablesCount = 1;
            currentElements.parametersNum = function () {
                return currentElements.parametersCount++;
            };
            currentElements.variablesNum = function () {
                return currentElements.variablesCount++;
            };
            currentElements.wrapForType = function () {
                var currentType = this.type;
                if (currentType == 'number') {
                    return 'числовой';
                } else if (currentType == 'nominal') {
                    return 'номинальный';
                } else if (currentType == 'time') {
                    return 'временной';
                }
            }
        }
        return currentElements;
    }

    function actions() {
        var elementId, elementRole, element;
        module.find('tbody button').click(
            function (e) {
                var action = getAction(this);
                if (action == "edit") {
                    elementId = jquery(this).parent().parent().siblings().first().text();
                    elementRole = jquery(this).parent().parent().parent().parent().data('elementrole');

                    element = getElement(elementId, elementRole);
                    editElement(element);
                } else if (action == "remove") {
                    elementId = jquery(this).parent().parent().siblings().first().text();
                    elementRole = jquery(this).parent().parent().parent().parent().data('elementrole');

                    element = getElement(elementId, elementRole);                  
                    removeElement(element);
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
        start();
    }

    function editElement(element) {
        require(['Controllers/AddElement'], function (AddElement) {
            AddElement.start(element);
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

    return {
        start: start,
        removeElement: removeElement
    };

});