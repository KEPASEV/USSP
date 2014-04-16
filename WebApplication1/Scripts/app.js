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
         'ElementsModule'], function (mustache, jquery, wizard, SystemsModule, ElementsModule) {

    jquery('#myWizard').wizard();
    SystemsModule.start();
    ElementsModule.start();
 
});