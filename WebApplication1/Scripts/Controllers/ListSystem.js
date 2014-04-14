define(['Views/ListSystemView'], function (ListSystemView) {

    function start() {
        var data = JSON.parse(localStorage.systems);
        ListSystemView.render(data);
    }

    return {
        start: start
    };
});