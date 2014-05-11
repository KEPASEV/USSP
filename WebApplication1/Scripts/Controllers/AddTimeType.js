define(['jquery',
        'Views/AddTimeTypeViews'], function (jquery, AddTimeTypeViews) {
    
    function start(parameters) {
        AddTimeTypeViews.render(parameters);
    }

    return {
        start:start
    };
});