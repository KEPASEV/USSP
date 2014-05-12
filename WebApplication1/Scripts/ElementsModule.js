define(['Controllers/AddElement',
        'Controllers/ListElement'], function (AddElement, ListElement) {

            function start() {

                var currentSystemId = localStorage.currentSystem?JSON.parse(localStorage.currentSystem).id:undefined;
                    AddElement.start();
                    ListElement.start(currentSystemId);
                }

    return {
        start:start
    };
});