define(['jquery',
        'Views/AddMaskView',
        'Models/SelectedVar',
        'Models/Mask',
        'Controllers/ListMask',
        'Libs/lodash.compat.min'], function (jquery, AddMaskView, SelectedVar, Mask, ListMask, lodash) {


            var module, toolBox, maskName, maskComment, shifts;

            var underCursorClass = "badge-info";
            var selectedClass = "badge-success";
            var directoryClass = "badge-warning";
            var mouseDown = false;
            var editMode;

            var t = 0;


            function start() {
                var data = getData();
                AddMaskView.render(data);
                initElementsModule();
                toolBoxActions();
            }

            function initElementsModule() {
                module = jquery('#maskModule');
                toolBox = module.find('#maskToolBox .btn-group button');
                maskName = module.find('#maskName');
                maskComment = module.find('#maskComment');
                shifts = module.find('.shifts');
            }
            
            function toolBoxActions() {
                toolBox.on('click', function (e) {
                    editMode = getToolBoxAction(this);
                    console.log(jquery('.values > td'));
                    jquery('.values > td')
                        .hover(
                            function (e) {
                                if (mouseDown) {
                                    elem = jquery(this);
                                    if (editMode === "pen") {
                                        elem.addClass(selectedClass);
                                        addInSelectedVarList(elem);
                                    } else if (editMode === "eraser") {
                                        elem.removeClass(selectedClass);
                                        //removeFromSelectedVarList(elem);
                                    } else if (editMode === "directory") {
                                    }
                                }
                            },
                            function (e) { }
                        )
                        .on('mousedown', function (e) {
                            mouseDown = true;
                            if (editMode != undefined) {
                                elem = jquery(this);
                                if (editMode === "pen") {
                                    elem.addClass(selectedClass);
                                    addInSelectedVarList(elem);
                                } else if (editMode === "eraser") {
                                    elem.removeClass(selectedClass);
                               //     removeFromSelectedVarList(elem);
                                }
                            }
                            return false;
                        }).on('mouseup', function (e) {
                            mouseDown = false;
                        }).on('click', function (e) {
                            if (editMode === "directory") {
                                t = jquery(this)[0].cellIndex;
                                fixNewDirectory(t);
                            }
                        });
                });
            }           

            function getToolBoxAction(elem) {
                var clicked = jquery(elem)[0].id;
                return clicked;                
            }

            function addInSelectedVarList(cell) {              
                var newSelectedVar = new SelectedVar({});
                var value = cell.text();
                newSelectedVar.initVar = parseInt(cell.parent().data("var"));
                newSelectedVar.shift = parseInt(shifts[0].cells[cell[0].cellIndex].innerText);
                newSelectedVar.g = false;

                var currentSelectedVars = getSelectedVarList();
                if (lodash.findIndex(currentSelectedVars.selectedVarList, function (el) {
                    return (el.initVar == newSelectedVar.initVar && el.shift == newSelectedVar.shift);
                }) == -1) {
                    currentSelectedVars.selectedVarList.push(newSelectedVar);
                    saveSelectedVarList(currentSelectedVars);
                    refreshTable();
                }               

            }

            function fixNewDirectory(t) {
                var data = getData();
                data.dir = t;
                localStorage.elementsWithData = JSON.stringify(data);


                var cells = shifts[0].cells;
                var lastFirstShiftValue = Number(cells[0].innerText);

                for (var i = 0; i < cells.length; i++) {
                    cells[i].innerHTML = i - t;
                    if (i - t === 0) {
                        tickOverZero = i;
                        cells[i].innerHTML += '<span class="glyphicon glyphicon-arrow-down"></span>';
                    }
                }
            }

            function removeMaskElements(){
            }

            function getData() {
                var data;
                if (localStorage.elementsWithData) {
                    data = JSON.parse(localStorage.elementsWithData);
                }
                return data;
            }

            function getSelectedVarList() {
                return JSON.parse(localStorage.selectedVarList);
            }

            function saveSelectedVarList(list) {
                localStorage.selectedVarList = JSON.stringify(list);
            }

            function refreshTable() {
                ListMask.start(getSelectedVarList());
            }

            return {
                start: start
            }
});
