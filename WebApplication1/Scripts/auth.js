require.config({
    paths: {
        jquery: 'Libs/jquery-2.1.0.min',
        mustache: 'Libs/mustache'
    }
});

require(['jquery',
         'mustache',
         'Libs/bootstrap.min'],
    function (jquery, mustache, bootstrap) {
        var form = jquery('form');
        var login = jquery('#login');
        var pass = jquery('#pass');        
        var signin = jquery('#signin');

        signin.on('click', function () {

            var requestBody = 'grant_type=password&username=' + login.val() + '&password=' + pass.val();

            var btn = $(this);
            btn.button('loading');


            var result = jquery.ajax({
                type: "POST",
                url: "Token",
                contentType: "application/x-www-form-urlencoded",
                data: requestBody
            });

            result.always(function () {
                btn.button('reset')
            });

            result.done(function (msg) {
                localStorage.token = result.responseJSON.access_token;
                localStorage.userName = result.responseJSON.userName;

                var requestBody = {
                    success: true,
                    errors: false
                }

                window.location.replace("/DetermSystem");
            })
            result.fail(function (jqXHR, textStatus) {
                form.find('input').val('');

                var requestBody = {
                    success: true,
                    errors: {
                        ErrorDescription: result.responseJSON.error_description
                    }
                }

                var tmpl = jquery('#resultAuthTmpl').html();
                var html = mustache.to_html(tmpl, requestBody);
                jquery('#resultAuth').html(html);
                
            });

        });

    }
);