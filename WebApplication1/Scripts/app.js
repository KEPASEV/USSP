require.config({
    paths: {
        jquery: 'Libs/jquery-2.1.0.min',
        mustache:'Libs/mustache'
    }
});
require(['mustache',
         'jquery',         
         'Libs/wizard',
         'SystemsModule',
         'ElementsModule',
         'GroupsModule'],
         function (mustache, jquery, wizard, SystemsModule, ElementsModule, GroupsModule) {

             jquery('#myWizard').wizard();
             localStorage.currentElements = JSON.stringify({
                 parameters: [
                     {
                         id: "021319s",
                         name: "p1",
                         type: "number",
                         role: 'parameter',
                         comment: "commentElement"
                     },
                     {
                         id: "021318",
                         name: "p2",
                         type: "number",
                         role: 'parameter',
                         comment: "commentElement"
                     }
                 ],
                 variables: [                     
                     {
                         id: "021314",
                         name: "v1",
                         type: "number",
                         role: 'variable',
                         comment: "commentElement"
                     },
                     {
                         id: "021315",
                         name: "v2",
                         type: "nominal",
                         role: 'variable',
                         comment: "commentElement"
                     },
                     {
                         id: "021316",
                         name: "v3",
                         type: "time",
                         role: 'variable',
                         comment: "commentElement"
                     }
                 ]
             });
    SystemsModule.start();
    ElementsModule.start();
    GroupsModule.start();
 
});