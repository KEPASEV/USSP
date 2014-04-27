define(['jquery',
        'Views/DataGroupView'], function (jquery, DataGroupView) {

    function start() {
        var data = getData();
        console.log(data);
        DataGroupView.render(data);

    }

    function getData() {
        var data;
        if(localStorage.elementsWithData){
            data = JSON.parse(localStorage.elementsWithData);
        }
        return data;
    }


    return {
        start: start
    }

});
