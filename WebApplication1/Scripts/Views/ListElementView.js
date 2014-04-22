define(['mustache',
        'jquery',
        'Libs/bootstrap-select.min'], function (Mustache, jquery, bootstrapSelect) {

            function render(parameters) {
                var template = jquery('#listElementTemplate').html();
                var html = Mustache.to_html(template, parameters);
                jquery('#listElementModule').html(html);
            }

            return {
                render: render
            };
        });