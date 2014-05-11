define(['jquery',
        'Views/AddNominalTypeStateView',
        'Models/State'], function (jquery, AddNominalTypeStateView, State) {

            var module, button, name, comment, table, id;
            
            function start(states) {                
                AddNominalTypeStateView.render(states);
                initModuleElements();
                bindEvents();
            }

            function initModuleElements() {                
                module = jquery('#nominalTypeModule');
                name = module.find('#nameState');
                comment = module.find('#commentState');
                button = module.find('#addState');
                table = module.find('table');
                id = module.find('#guidState');
            }

            function bindEvents() {
                buttonAction();
                onItemHover();
                actions();
            }

            function buttonAction() {
                button.click(function () {
                    var currentStates = JSON.parse(localStorage.currentStates);
                    var stateName = name.val();
                    var stateComment = comment.val();                    
                    if ((!currentStates.currentState) && (currentStates.currentState != {})) {                        
                        currentStates.states.push(new State({ name: stateName, comment: stateComment }));
                        for (var i = 0, len = currentStates.states.length; i < len; i++) {
                            currentStates.states[i].index = i + 1;
                        }                        
                    } else {
                        for (var i = 0, len = currentStates.states.length; i < len; i++) {
                            if (currentStates.states[i].id == id.val()) {
                                currentStates.states[i].name = stateName;
                                currentStates.states[i].comment = stateComment;
                                id.val("");
                            }
                        }
                    }
                    currentStates.currentState = undefined;
                    localStorage.currentStates = JSON.stringify(currentStates);
                    start(currentStates);
                });
            }

            function onItemHover() {
                table.find('tbody tr')
                    .mouseenter(function () {
                        jquery(this).find(':last-child').show();
                    })
                    .mouseleave(function () {
                        jquery(this).find(':last-child').hide();
                    });
            }

            function actions() {
                var el = table.find('tbody button').click(
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
                var stateId = target.parent().siblings().first().text();                
                var currentStates = JSON.parse(localStorage.currentStates);
                
                for (var i = 0, len = currentStates.states.length; i < len; i++) {
                    if (currentStates.states[i].id == stateId) {
                        currentStates.currentState = currentStates.states[i];
                    }
                }
                localStorage.currentStates = JSON.stringify(currentStates);
            
                start(currentStates);
            }

            function removeAction(elem) {
                var target = jquery(elem);
                var stateId = target.parent().siblings().first().text();
                var currentStates = JSON.parse(localStorage.currentStates);
                var state;
                var index;
                for (var i = 0, len = currentStates.states.length; i < len; i++) {
                    if (currentStates.states[i].id == stateId) {
                        state = currentStates.states[i]
                        index = i;
                        if (id && state.id == id.val()) {
                            
                            currentStates.currentState = undefined;
                        }
                    }
                }


                var newStates = removeFromArr(index, currentStates.states);
                for (var i = 0, len = newStates.length; i < len; i++) {
                    newStates[i].index = i + 1;
                }
                currentStates.states = newStates;                
                localStorage.currentStates= JSON.stringify(currentStates);
                start(currentStates);
            }

            function removeFromArr(index, Arr) {
                for (var i = index, len = Arr.length; i < len; i++) {
                    Arr[index] = Arr[index + 1];
                }
                Arr.pop();
                return Arr
            }

            return {
                start:start
            };

});