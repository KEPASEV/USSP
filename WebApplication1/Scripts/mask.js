    function maskWidget(selector, systemJSON) {
        var widgetContainer = createMatrix(selector, systemJSON)
        
        var underCursorClass = "badge-info";
        var selectedClass = "badge-success";
        var directoryClass = "badge-warning";
        var mouseDown = false;
        var editMode;
        var t = 0;
        var fixDirectory = 0;

        var shifts = widgetContainer.find('#shift');
        $('#maskToolBar').on('click', function (e) {
            editMode = e.target.id;
        });
        
        widgetContainer
            .find('.values > td')
            .hover(
                function (e) {
                   if (mouseDown) {
                        elem = $(this);
                        if (editMode === "pen") {
                            elem.addClass(selectedClass);
                        } else if (editMode === "eraser") {
                            elem.removeClass(selectedClass);
                        } else if (editMode === "directory") {
                            t = $(this)[0].cellIndex;
                            var elems = $('#maskValue tbody tr').each(function (i, el) {
                                elem2 = $(el.cells[t]).addClass(underCursorClass);
                            });
                        }
                   }                   
                },
                function (e) {
                    if (editMode === "directory") {
                        t = $(this)[0].cellIndex;
                        var elems = $('#maskValue tbody tr').each(function (i, el) {
                            elem2 = $(el.cells[t]).removeClass(underCursorClass);
                        });
                 }
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
            }).on('click', function (e) {
                if (editMode === "directory") {
                    t = $(this)[0].cellIndex;
                    fixNewDirectory(t, widgetContainer);
                }
            });
    }

    function fixNewDirectory(newT, widgetContainer) {
        var shifts = widgetContainer.find('#shift');
        var cells = shifts[0].cells;
        for (var i = 0; i < cells.length; i++) {
            cells[i].innerHTML = i - newT;
            if (i - newT === 0) {
                cells[i].innerHTML += '<span class="glyphicon glyphicon-arrow-down"></span>';
            }
        }
    }

    function createMatrix(selector, systemJSON){
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
        
        parametersTick = '<tr id="ticks">';
        parametersSeparator = '<tr id="shift">';
        for (var i = 0; i < tickCount; i++) {
            parametersTick += '<td>' + i + '</td>';
            if (i === 0) {
                parametersSeparator += '<td>' + i + '<span class="glyphicon glyphicon-arrow-down"></span></td>';
            } else {
                parametersSeparator += '<td>' + i + '</td>';
            }
            
        }
        parametersTick += '</tr>';
        parametersSeparator += '</tr>';

        headers = paramHeaders + '<tr class="maskHeader"><th >Номер осчета</th></tr><tr id="shiftHeader"><th>Правило сдвига</th></tr>' + valHeaders + "</tr>";
        values = paramVal + parametersTick + parametersSeparator + valueVal
        
        widgetContainer.css("cursor", "default");
        widgetContainer.find('tr').remove();
        widgetContainer.find('thead').append(headers);
        widgetContainer.find('tbody').append(values);
        return widgetContainer;
    }