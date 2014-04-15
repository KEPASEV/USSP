require.config({
    paths: {
        jquery: 'Libs/jquery-2.1.0.min',
        mustache:'Libs/mustache'
    }
});
require(['mustache',
         'jquery',         
         'Libs/wizard',
         'SystemsModule'], function (mustache, jquery, wizard, SystemsModule) {

    jquery('#myWizard').wizard();

    SystemsModule.start();
 
});