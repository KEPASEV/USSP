require.config({
    paths: {
        jquery: 'Libs/jquery-2.1.0.min',
        mustache:'Libs/mustache'
    }
});
require(['mustache',
         'Controllers/AddSystem',
         'Controllers/InfoSystem',
         'Controllers/ListSystem'], function (mustache, AddSystem, InfoSystem, ListSystem) {

    var systems = [];
    localStorage.systems = JSON.stringify(systems);

    AddSystem.start();
    InfoSystem.start();
    ListSystem.start();
});