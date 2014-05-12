define(['Controllers/AddSystem',
        'Controllers/InfoSystem',
        'Controllers/ListSystem',
        'Other/guidGenerator'], function (AddSystem, InfoSystem, ListSystem, guidGenerator) {

            function start() {
                ListSystem.start();
                AddSystem.start();
                InfoSystem.start();

            }

         return {
             start:start
         };        
});