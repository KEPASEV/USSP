define(['Controllers/DataGroup',
        'Controllers/AddGroup',
        'Controllers/ListGroup'], function (DataGroup, AddGroup, ListGroup) {

            function start() {

                createArrWithDataAndPushInLocalStorage();
                DataGroup.start();
                
            }

            function createArrWithDataAndPushInLocalStorage(){
                if (!localStorage.elementsData) {
                    if (localStorage.currentElements) {                        
                        var elements = JSON.parse(localStorage.currentElements);
                        var parameters = elements.parameters;
                        var variables = elements.variables;

                       var fullArr = parameters.concat(variables);
                       var result = {
                           parameters: [],
                           variables: []
                       }
                       for (var i = 0, len = fullArr.length; i < len; i++) {
                            fullArr[i].value = [];
                            for (var j = 0, lenJ = 30; j < lenJ; j++) {
                                fullArr[i].value.push(Math.floor(Math.random() * 100));
                                fullArr[i].value.push(Math.random(0, 100000));
                            }
                            
                            result[fullArr[i].role+'s'].push(fullArr[i]);                            
                        }                       

                        localStorage.elementsWithData = JSON.stringify(result);
                    }                    
                }
            }

            return {
                start: start
            };
        });