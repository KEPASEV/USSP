    function maskWidget(selector, systemJSON) {

        var widgetContainer = $(selector);
      
        var system = JSON.parse(systemJSON);
        
        var headers = "";
        var values = "";
        var paramHeaders ="";
        var valHeaders = "";
        var paramVal = "";
        var valueVal = "";

        

        var tickCount = 0;
        $(system.elements).each(function (i, e) {
            if (e.role === 'parameter') {
                paramHeaders += '<tr  class="maskHeader"><th>' + e.name + '</th></tr>';
                tickCount = 0;
                paramVal += "<tr>";
                e.values.forEach(function (v) {
                    paramVal += '<td>' + v + '</td>';
                    tickCount++;
                })
                paramVal+= '</tr>';
            } else {
                valHeaders += '<tr class="maskHeader"><th >' + e.name + '</th></tr>';
                valueVal += '<tr class="values">';
                e.values.forEach(function (v) {
                    valueVal += '<td>'+v+'</td>';
                })
                valueVal += '</tr>';
            }
        });
        
        parametersTick = '<tr>';
        parametersSeparator = '</tr>';
        for (var i = 0; i < tickCount; i++) {
            parametersTick += '<td>' + i + '</td>';
            parametersSeparator += '<td></td>';
        }
        parametersTick += '</tr>';
        parametersSeparator += '</tr>';


        headers = paramHeaders + '<tr class="maskHeader"><th >Номер осчета</th></tr><tr><th></th></tr>' + valHeaders + "</tr>";
        values = paramVal + parametersTick + parametersSeparator + valueVal

        var underCursorClass = "badge-info";
        var selectedClass = "badge-success";
        var mouseDown = false;
        var editMode;
        widgetContainer.css("cursor", "default");
        widgetContainer.find('tr').remove();
        widgetContainer.find('thead').append(headers);
        $('#maskToolBar').on('click', function (e) {
            editMode = e.target.id;
        });
        
        widgetContainer.find('tbody')
            .append(values).
            find('.values > td').
            hover(function (e) {
                if (editMode != undefined && mouseDown) {
                    elem = $(this);
                    if (editMode === "pen") {
                        elem.addClass(selectedClass);
                    } else if (editMode === "eraser") {
                        elem.removeClass(selectedClass);
                    }
                }
                $(this).addClass(underCursorClass);
            },
             function (e) {
                $(this).removeClass(underCursorClass);
             })
            .on('mousedown', function (e) {
                mouseDown = true;
                if (editMode != undefined) {
                    elem = $(this);
                    if (editMode === "pen") {
                        elem.addClass(selectedClass);
                    } else if (editMode === "eraser") {
                        elem.removeClass(selectedClass);
                    }
                }
                return false;
            }).on('mouseup', function (e) {
                mouseDown = false;
            });

    }
