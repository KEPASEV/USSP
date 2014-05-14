define(['jquery',
        'Views/ListMaskView'], function (jquery, ListMaskView) {

            function start(data) {
                ListMaskView.render(data);
            }

            return {
                start:start
            }


        });