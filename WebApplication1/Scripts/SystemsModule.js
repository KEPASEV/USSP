define(['Controllers/AddSystem',
        'Controllers/InfoSystem',
        'Controllers/ListSystem',
        'Other/guidGenerator'], function (AddSystem, InfoSystem, ListSystem, guidGenerator) {

            function start() {
            //    var systems = [{ id: guidGenerator.getGUID(), name: "name", goal: "goal" },
              //             { id: guidGenerator.getGUID(), name: "name", goal: "goal" }];
              //  localStorage.systems = JSON.stringify(systems);

                ListSystem.start();
                AddSystem.start();
                InfoSystem.start();
            }

         return {
             start:start
         };        
});