function maskWidget(selector, systemJSON) {
    var newMask = new Mask();

    var mask = $(selector);
    var maskMatrix = mask.find('#maskWidget');
    var selectedVarTable = mask.find('#selectedVarTable');
    var selectedVars = selectedVarTable.find('tbody');
    var currentTick = selectedVarTable.find('#currentTick');
 

    $('#maskToolBar').on('click', function (e) {
        editMode = e.target.id;
    });

    var createMatrix = function (systemJSON) {
        var system = JSON.parse(systemJSON);

        var headers = "";
        var values = "";
        var paramHeaders = "";
        var varHeaders = "";
        var paramVal = "";
        var varVal = "";

        var tickCount = 0;

        $(system.elements).each(function (i, e) {
            if (e.role === 'parameter') {
                paramHeaders += '<tr  class="maskHeader" data-name="' + e.name + '" data-i="' + i + '"><th>' + e.name + '</th></tr>';
                tickCount = 0;
                paramVal += '<tr data-name="' + e.name + '" data-i="' + i + '">';
                e.values.forEach(function (v) {
                    paramVal += '<td>' + v + '</td>';
                    tickCount++;
                })
                paramVal += '</tr>';
            } else {
                varHeaders += '<tr class="maskHeader" data-name="' + e.name + '" data-i="' + i + '"><th>' + e.name + '</th></tr>';
                varVal += '<tr class="values" data-name="' + e.name + '" data-i="' + i + '">';
                e.values.forEach(function (v) {
                    varVal += '<td>' + v + '</td>';
                })
                varVal += '</tr>';
            }
        });

        parametersTick = '<tr id="ticks">';
        parametersSeparator = '<tr id="shift">';
        for (var i = 0; i < tickCount; i++) {
            parametersTick += '<td>' + (i + 1) + '</td>';
            if (i === 0) {
                parametersSeparator += '<td>' + i + '<span class="glyphicon glyphicon-arrow-down"></span></td>';
            } else {
                parametersSeparator += '<td>' + i + '</td>';
            }
        }
        parametersTick += '</tr>';
        parametersSeparator += '</tr>';

        headers = paramHeaders + '<tr class="maskHeader"><th >Номер осчета</th></tr><tr id="shiftHeader"><th>Правило сдвига</th></tr>' + varHeaders + "</tr>";
        values = paramVal + parametersTick + parametersSeparator + varVal

        maskMatrix.css("cursor", "default");
        maskMatrix.find('tr').remove();
        maskMatrix.find('thead').append(headers);
        maskMatrix.find('tbody').append(values);
        
    }(systemJSON);

    var headers = maskMatrix.find('.maskHeader');
    var getNum = function () {
        var lastNum = selectedVars.find('tr:last-child td:first-child').text();
        var num = (lastNum == "") ? 1 : ++lastNum;
        return num;
    }
    var shifts = maskMatrix.find('#shift');
    var ticks = maskMatrix.find('#ticks');
    var selectedVarsList = [];
    var hashList = [];
    var tickOverZeroindex = 0;

    var sortFunction = function (a, b) {
        if (a.initVar < b.initVar) {
            return -1;
        } else if (a.initVar === b.initVar) {
            return a.shift - b.shift;
        } else {
            return 1;
        }
    };
    
    var fixNewDirectory = function (newT, maskMatrix) {
        
        var cells = shifts[0].cells;
        var lastFirstShiftValue = Number(cells[0].innerText);
        
        for (var i = 0; i < cells.length; i++) {
            cells[i].innerHTML = i - newT;
            if (i - newT === 0) {
                tickOverZero = i;
                cells[i].innerHTML += '<span class="glyphicon glyphicon-arrow-down"></span>';
            }
        }
        

        var delta = lastFirstShiftValue - Number(cells[0].innerText);
        if (delta !== 0) {
          
            for (var i = 0, length = selectedVarsList.length; i < length; i++) {
                var e = selectedVarsList[i];
                if (e != undefined) {
                    var hash = "v" + e.initVar + "s" + e.shift;
                    delete hashList[hash];
                    e.shift = e.shift - delta;
                    hash = "v" + e.initVar + "s" + e.shift;
                    hashList[hash] = i;
                    refreshTable();
                }
            }
        }
    }

    var addInSelectedVarList = function (cell) {

        var newSelectedVar = new SelectedVar();
        var value = cell.text();
        var hash;
        newSelectedVar.initVar = parseInt(cell.parent().data("i"));
        newSelectedVar.num = getNum();
        newSelectedVar.shift = parseInt(shifts[0].cells[cell[0].cellIndex].innerText);
         
        
        hash = "v" + newSelectedVar.initVar + "s" + newSelectedVar.shift;
        if (hashList[hash] == undefined) {
            hashList[hash] = selectedVarsList.length ;
            selectedVarsList.push(newSelectedVar);
            selectedVarsList.sort(sortFunction);
            refreshTable();
        }
        
       
    }

    var removeFromSelectedVarList = function (cell) {

        var hash;
        var initVarForHash = parseInt(cell.parent().data("i"));
        var shiftForHash = parseInt(shifts[0].cells[cell[0].cellIndex].innerText);

        hash = "v" + initVarForHash + "s" + shiftForHash;
        if (hashList[hash] != undefined) {
            var index = hashList[hash];
            delete selectedVarsList[index];
            delete hashList[hash];
           // selectedVarsList.sort(sortFunction);
            refreshTable();
        }

    }

    var refreshTable = function () {
        selectedVars
                .find('tr')
                .remove();
        for (var i = 0, length = selectedVarsList.length; i < length; i++) {
            var el = selectedVarsList[i];
            if (el != undefined) {
                el.num = i + 1;
                var initVarName = headers.filter('[data-i="' + el.initVar + '"]').data('name');
                selectedVars
                    .append('<tr>' +
                        '<td>' + el.num + '</td>' +
                        '<td>' + initVarName + '</td>' +
                        '<td>' + el.shift + '</td>' +
                        '<td>' + el.g + '</td>' +
                    +'</tr>');
            }
        }
    }

        
        var underCursorClass = "badge-info";
        var selectedClass = "badge-success";
        var directoryClass = "badge-warning";
        var mouseDown = false;
        var editMode;

        var t = 0;
       
        maskMatrix
            .find('.values > td')
            .hover(
                function (e) {
                   if (mouseDown) {
                        elem = $(this);
                        if (editMode === "pen") {
                            elem.addClass(selectedClass);
                            addInSelectedVarList(elem);
                        } else if (editMode === "eraser") {
                            elem.removeClass(selectedClass);
                            removeFromSelectedVarList(elem);
                        } else if (editMode === "directory") {
                        }
                   }                   
                },
                function (e) { }
            )
            .on('mousedown', function (e) {
                mouseDown = true;
                if (editMode != undefined) {
                    elem = $(this);
                    if (editMode === "pen") {
                        elem.addClass(selectedClass);
                        addInSelectedVarList(elem);
                    } else if (editMode === "eraser") {
                        elem.removeClass(selectedClass);
                        removeFromSelectedVarList(elem);
                    } 
                }
                return false;
            }).on('mouseup', function (e) {
                mouseDown = false;
            }).on('click', function (e) {
                if (editMode === "directory") {
                    t = $(this)[0].cellIndex;
                    fixNewDirectory(t, maskMatrix);
                }
            });
    }

    

    function removeInSelectedVarTable(cell) {
        var tbody = $('#selectedVars');

    }




    function SelectedVar() {
        this.num = null;
        this.initVar = null;
        this.shift = null;
        this.g = null;
    }
    SelectedVar.prototype = {
    }

    function Mask() {
        this.name = null;
        this.comment = null;
        this.directory = 0;
        this.selectedVars = [];
    }
    Mask.prototype = {}


