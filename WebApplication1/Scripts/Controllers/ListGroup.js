define(['jquery',
        'Views/ListGroupView'], function (jquery, ListGroupView) {

    function start() {
        ListGroupView.render();
    }

    return {
        start:start
    }
});