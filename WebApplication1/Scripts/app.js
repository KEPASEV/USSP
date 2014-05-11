require.config({
    paths: {
        jquery: 'Libs/jquery-2.1.0.min',
        mustache: 'Libs/mustache'
    }
});
require(['mustache',
         'jquery',         
         'Libs/wizard',
         'SystemsModule',
         'ElementsModule',
         'GroupsModule',
         'MaskModule'],
         function (mustache, jquery, wizard, SystemsModule, ElementsModule, GroupsModule, MaskModule) {

    jquery('#myWizard').wizard();
    var userName = mustache.to_html('<a href="#">{{.}}</a>',localStorage.userName);
    jquery('#user').html(userName);
             
    jquery('.btn-next')
    .on("click", function (e) {
        jquery('#myWizard').wizard('next', 'foo');
    });

    (function logout() {
        jquery('#logout').on('click', function () {
            jquery.ajax({
                type: "POST",
                headers: {
                    Authorization: "Bearer " + localStorage.token
                },
                url: "http://localhost:1638/api/Account/Logout"
            })
            .always(function () {
                localStorage.token = "";
                localStorage.userName = "";
                window.location.replace("/");
            });
        });
    }());

    (function mockCurrentElements() {
        localStorage.currentElements = JSON.stringify({
            parameters: [
                {
                    id: "021319s",
                    name: "p1",
                    type: "number",
                    role: 'parameter',
                    comment: "commentElement"
                },
                {
                    id: "021318",
                    name: "p2",
                    type: "number",
                    role: 'parameter',
                    comment: "commentElement"
                }
            ],
            variables: [
                {
                    id: "021314",
                    name: "v1",
                    type: "number",
                    role: 'variable',
                    comment: "commentElement"
                },
                {
                    id: "021315",
                    name: "v2",
                    type: "nominal",
                    role: 'variable',
                    comment: "commentElement"
                },
                {
                    id: "021316",
                    name: "v3",
                    type: "time",
                    role: 'variable',
                    comment: "commentElement"
                }
            ]
        });
    }());
             
    SystemsModule.start();
    ElementsModule.start();
    GroupsModule.start();
    MaskModule.start();
 
});