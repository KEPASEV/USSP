    function maskWidget(selector, systemJSON) {

        var widgetContainer = $(selector);
      
        var system = JSON.parse(systemJSON);
        
        var maskWidget = $('#maskWidget').on('scroll', function (e) {
   
            if (this.scrollLeft> 200) {
                $('.maskHeader').addClass("fixed");
            } else {
                $('.maskHeader').removeClass("fixed");
            }
            
        })

        var parametersTick = '<tr id="pTick"><th class="maskHeader">Номер отсчета</th>';
        var parametersSeparator = '<tr><th class="maskHeader"></th>';
        var variablesHead = "";
        var parametersHead = "";

        var tickCount = 0;
        $(system.elements).each(function (i, e) {
            if (e.role === 'parameter') {
                parametersHead += '<tr><th class="maskHeader">' + e.name + '</th>';
                tickCount = 0;
                e.values.forEach(function (v) {
                    parametersHead += '<td>' + v + '</td>';
                    tickCount++;
                })
                parametersHead += '</tr>';
            } else {
                variablesHead += '<tr class = "var"><th class="maskHeader">' + e.name + '</th>';
                e.values.forEach(function (v) {
                    variablesHead += '<td>'+v+'</td>';
                })
                variablesHead += '</tr>';
            }
        });
        
        for (var i = 0; i < tickCount; i++) {
            parametersTick += '<td>' + i + '</td>';
            parametersSeparator += '<td></td>';
        }
        parametersTick += '</tr>';
        parametersSeparator += '</tr>';

        var underCursorClass = "badge-info";
        var viewMode = true;
        var maskTable = $('#maskTable').css("cursor","default");
        maskTable.find('tr').remove();
        maskTable.find('tbody').append(parametersHead);
        maskTable.find('tbody').append(parametersTick);
        maskTable.find('tbody').append(parametersSeparator);
        maskTable.find('tbody').append(variablesHead).find('.var > td').hover(function (e) {
            elem = $(this);
            if (elem.hasClass("badge-success") && !viewMode) {
                elem.removeClass("badge-success");
            } else {
                elem.addClass(underCursorClass);
            }  
            
        },
        function (e) {
            if (viewMode) {
                $(this).removeClass(underCursorClass);
            }
        }).on('mousedown', function (e) {
            elem = $(this);
            viewMode = false;
            elem.removeClass(underCursorClass);
            underCursorClass = "badge-success";
            if (elem.hasClass("badge-success")) {
                elem.removeClass("badge-success");
            } else {
                elem.addClass(underCursorClass);
            }
            return false;
        }).on('mouseup', function (e) {
            viewMode = true;
            underCursorClass = "badge-info";
        });

    }
