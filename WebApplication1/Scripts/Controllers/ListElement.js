define(['jquery',
        'Views/ListELementView',
        'Libs/wizard', ], function (jquery, ListElementView, Wizard) {

    var module, parametersBody, variablesBody;
    var currentElements, currentElement;

    function start(currentSystemId) {
        currentSystemId = currentSystemId ? currentSystemId : JSON.parse(localStorage.currentSystem).id;
        getData( currentSystemId,
            function (currentElements) {
                ListElementView.render(currentElements);
                initModuleElements();
                actions();
            }
            );
        
    }

    function initModuleElements() {
        module = jquery('#listElementModule');
        parametersBody = module.find('#parametersTable tbody');
        variablesBody = module.find('#variablesTable tbody');
        onNext();
    }

    function getData(SystemId ,func) {        
        //currentElements = localStorage.currentElements ? JSON.parse(localStorage.currentElements) : undefined;
        var uri = 'api/Systems/'+SystemId+'/Elements';
        jquery.ajax(
            {
                type: "GET",
                url: uri,
                headers: {
                    Authorization: "Bearer " + localStorage.token
                }
            }
        )
        .done(
            function (data) {
                
                currentElements = {};
                currentElements.parameters = [];
                currentElements.variables = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].role == 1) {
                        data[i].role = "variable"
                        switch (data[i].type) {
                            case 0:
                                data[i].type = "number";
                                break;
                            case 1:
                                data[i].type = "nominal";
                                break;
                            case 2:
                                data[i].type = "time";
                                break;
                        }
                        
                        currentElements.variables.push(data[i]);
                    } else
                    if (data[i].role == 0) {
                        data[i].role = "parameter"
                        switch (data[i].type) {
                            case 0:
                                data[i].type ="number";
                                break;
                            case 1:
                                data[i].type = "nominal";
                                break;
                            case 2:
                                data[i].type = "time";
                                break;
                        }
                        
                        currentElements.parameters.push(data[i]);
                    }
                }
                
                                
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
                    
                localStorage.currentElements = JSON.stringify(currentElements);

                func(currentElements);

            }

        )      
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
        removeElementOnServer(element.id, function () {
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
        })
        
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

    function onNext() {
        module.find('.btn-next')
            .on("click", function (e) {                
                jquery('#myWizard').wizard('next', 'foo');              
            });
    }

    function wrapResponse(data) {

        return data;
    }

    function removeElementOnServer(elementId, func) {
        var SystemId = JSON.parse(localStorage.currentSystem).id;
        var uri = 'api/Systems/'+SystemId+'/Elements/'+elementId;
        jquery.ajax(
            {
                type: "DELETE",
                url: uri,
                headers: {
                    Authorization: "Bearer " + localStorage.token
                }
            }
        )
        .done(
            function (data) {
                func(data);
            }
        )
    }

    return {
        start: start,
        removeElement: removeElement
    };

});