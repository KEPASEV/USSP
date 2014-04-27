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
                         id: "021314",
                         name: "nameElement",
                         type: "number",
                         role: 'parameter',
                         comment: "commentElement"
                     },
                     {
                         id: "021315",
                         name: "nameElement",
                         type: "number",
                         role: 'parameter',
                         comment: "commentElement"
                     }
                 ],
                 variables: [
                     {
                         id: "021317",
                         name: "nameElement",
                         type: "number",
                         role: 'variable',
                         comment: "commentElement"
                     },
                     {
                         id: "021318",
                         name: "nameElement",
                         type: "number",
                         role: 'variable',
                         comment: "commentElement"
                     }
                 ]
             });
    SystemsModule.start();
    ElementsModule.start();
    GroupsModule.start();
 
});