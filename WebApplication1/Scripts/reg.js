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
        var confirm = jquery('#confirm');
        var regButton = jquery('#reg');
        
        regButton.on('click', function () {
            
            var newUser = {
                "UserName": login.val(),
                "Password": pass.val(),
                "ConfirmPassword": confirm.val()
            }

            var btn = $(this)
            btn.button('loading')
            
            var result = jquery.ajax({
                type: "POST",
                url: "api/Account/Register",
                contentType: "application/json",
                data: JSON.stringify(newUser)
            });

            result.always(function () {
                btn.button('reset')
            });

            result.done(function () {
                form.find('input').val('');

                var requestBody = {
                    success: true,
                    errors: false
                }

                var tmpl = jquery('#resultRegTmpl').html();
                var html = mustache.to_html(tmpl, requestBody);
                jquery('#resultReg').html(html);
            })
            
            result.fail(function (jqXHR, textStatus) {                
                var responseText = JSON.parse(result.responseText);
                var userNameErr = responseText.ModelState['model.UserName'];
                var passwordErr = responseText.ModelState['model.Password'];
                var confirmPassErr = responseText.ModelState['model.ConfirmPassword'];
                var otherErr = responseText.ModelState[""];

                var requestBody = {
                    success: false,
                    errors: {
                        UserName: userNameErr,
                        Password: passwordErr,
                        Confirm: confirmPassErr,
                        Other: otherErr
                    }
                }
                
                var tmpl = jquery('#resultRegTmpl').html();
                var html = mustache.to_html(tmpl, requestBody);
                jquery('#resultReg').html(html);
                
           });
   
        });
        
    }
);

