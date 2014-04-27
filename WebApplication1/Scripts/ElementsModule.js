define(['Controllers/AddElement',
        'Controllers/ListElement'], function (AddElement, ListElement) {

    function start() {
        AddElement.start();
        ListElement.start();
    }

    return {
        start:start
    };
});