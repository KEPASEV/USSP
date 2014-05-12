define(['Views/InfoSystemView',
        'Libs/wizard',
        'jquery'], function (InfoSystemView, wizard, jquery) {

    var currentSystem
    function start(system) {
        currentSystem = system;
        InfoSystemView.render(system);
        onNext();        
    }

    function onNext() {
        jquery('#infoSystemModule')
            .find('.btn-next').on("click", function (e) {
                jquery('#myWizard').wizard('next', 'foo');
                localStorage.currentSystem = JSON.stringify(currentSystem);
                require(['ElementsModule'], function (ElementsModule) {
                    ElementsModule.start();
                })
                
            });
    }

    return {
        start: start
    };
});