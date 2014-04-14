define(['Views/InfoSystemView'], function (InfoSystemView) {

    function start() {
        InfoSystemView.render({ name: "system", goal: "myGoal" });
    }

    return {
        start: start
    };
});