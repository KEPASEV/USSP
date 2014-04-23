define(['mustache',
        'jquery',
        'Libs/bootstrap-select.min'], function (Mustache, jquery, bootstrapSelect) {

            var module;

            function render(parameters) {
                var template = jquery('#listElementTemplate').html();
                var html = Mustache.to_html(template, parameters);
                jquery('#listElementModule').html(html);

                initModuleElements();
                onItemHover();
            }

            function initModuleElements() {
                module = jquery('#listElementModule');
            }
            
            function onItemHover() {
                module.find('tbody tr')
                    .mouseenter(function () {
                        jquery(this).find(':last-child div').show();
                    })
                    .mouseleave(function () {
                        jquery(this).find(':last-child div').hide();
                    });
            }

            return {
                render: render
            };
        });