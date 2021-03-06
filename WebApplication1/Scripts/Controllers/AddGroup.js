﻿define(['jquery',
        'Views/AddGroupView',
        'Models/Group',
        'Libs/lodash.compat.min'], function (jquery, AddGroupView, Group, lodash) {

    var module, addAbstractVal, abstractValName, tbody;
    var currentElementId;
    var currentElement;    

    function start() {
        var data = getData();
        AddGroupView.render(data);
        initNoduleElements();
        actions();        
    }

    function initNoduleElements() {
        module = jquery('#addGroupModule');
        addAbstractVal = module.find('#addGroup');
        abstractValName = module.find('#nameGroup');
        tbody = module.find('.panel-body table tbody');
        currentElementId = module.find('.panel-heading select');
    }

    function actions() {
        onSelectCurrentElement();
        add();
        onToolBoxClick();
        onNext();
    }
        
    function onSelectCurrentElement() {
        var id;
        currentElementId.on('change', function () {
            var data = getData();
            for (var i = 0, len = data.variables.length; i < len; i++) {
                if (data.variables[i].id === currentElementId.val()) {
                    id=currentElementId.val();
                    data.currentElement = data.variables[i];
                    localStorage.elementsWithData = JSON.stringify(data);
                    break;
                }
            }            
            refreshList();
        });        
    }

    function add() {
        addAbstractVal.on('click', function () {
            var nameAbstract = abstractValName.val();            
            if (abstractValName.val()) {
                var data = getData();
                for (var i = 0, len = data.variables.length; i < len; i++) {
                    if (data.variables[i].id === currentElementId.val()) {
                        currentElement = data.variables[i];
                    }
                }
                var newGroup = new Group({
                    name: nameAbstract
                });
                if (!(currentElement && currentElement.groups)) {
                    currentElement.groups = [];
                }
                if (currentElement.type == 'nominal') {
                    if (!newGroup.forEditStates) {
                        newGroup.forEditStates = {
                            states: []
                        }
                    }
                }
               
                currentElement.groups.push(newGroup);
                data.currentElement = currentElement;
                localStorage.elementsWithData = JSON.stringify(data);
                refreshList();
            } else {

            }
        });
    }

    function refreshList() {
        var data = getData();
        AddGroupView.select(data);
        onToolBoxClick();
        addStates();
    }

    function onToolBoxClick() {
        var buttons = module.find('.groupToolBox button ');
        var action;
        var groupId;
        var group;
        buttons.on('click', function () {
            var data = getData();
            for (var i = 0, len = data.variables.length; i < len; i++) {
                if (data.variables[i].id === currentElementId.val()) {
                    currentElement = data.variables[i];
                }
            }
            if (currentElement.type == "number" || currentElement.type == "time") {
                action = getAction(this);
                groupId = jquery(this)
                    .siblings()
                    .filter('input')
                    .val();
                group = getGroupBy(groupId);

                if (action === "save") {

                    var low = jquery(this).parent().siblings().find('.low').val();
                    var lowSign = jquery(this).parent().siblings().find('.lowSign').val();
                    var high = jquery(this).parent().siblings().find('.high').val();
                    var highSign = jquery(this).parent().siblings().find('.highSign').val();
                    if (group.forEdit) {
                        group.name = jquery('[name="' + group.id + '"]').val();
                        group.forEdit = {};
                        delete group.forEdit;
                    }

                    group.range = {
                        low: low,
                        lowSign: lowSign,
                        high: high,
                        highSign: highSign
                    }
                    saveGroup(group);
                    refreshList();

                } else if (action === "edit") {
                    group.forEdit = {};
                    group.forEdit.low = group.range.low;
                    group.forEdit.lowSign = group.range.lowSign;
                    group.forEdit.high = group.range.high;
                    group.forEdit.highSign = group.range.highSign;
                    group.forEdit.name = group.name;

                    delete group.range;
                    saveGroup(group);
                    refreshList();
                    jquery('#' + group.id).find('.low').val(group.forEdit.low);
                    jquery('#' + group.id).find('.lowSign').selectpicker('val', group.forEdit.lowSign);
                    jquery('#' + group.id).find('.high').val(group.forEdit.high);
                    jquery('#' + group.id).find('.highSign').selectpicker('val', group.forEdit.highSign);

                } else if (action === "remove") {
                    removeById(group.id);
                    refreshList();
                }
            } else if (currentElement.type == "nominal") {
                
                action = getAction(this);
                groupId = jquery(this)
                    .siblings()
                    .filter('input')
                    .val();
                group = getGroupBy(groupId);

                
                if (action === "save") {
                    if (group.forEditStates) {
                        group.range = group.forEditStates;
                        group.name = jquery('[name="' + group.id + '"]').val();
                        group.forEditStates = {};
                        delete group.forEditStates;                        
                    }

                    saveGroup(group);
                    refreshList();

                } else if (action === "edit") {
                    group.forEditStates = {};
                    group.forEditStates = group.range;
                    delete group.range;

                    saveGroup(group);
                    refreshList();
                    
                } else if (action === "remove") {
                    removeById(group.id);
                    refreshList();
                }
            }
        });       

    }

    function getAction(elem) {
        var target = jquery(elem);
        if (target.children().hasClass("glyphicon-pencil")) {
            return "edit";
        } else if (target.children().hasClass("glyphicon-remove")) {
            return "remove";
        } else if (target.children().hasClass("glyphicon-floppy-disk")) {
            return "save"
        }
    }

    function getGroupsBy(id) {
        var data = getData();
        var currentElement;
        for (var i = 0, len = data.variables.length; i < len; i++) {
            if (data.variables[i].id === currentElementId.val()) {
                currentElement = data.variables[i];
                return currentElement.groups;
            }
        }       
        return undefined;
    }

    function getGroupBy(groupId) {
        var groups = getGroupsBy(currentElementId.val());
        if(groups){
            for (var i = 0, len = groups.length; i < len; i++) {
                if (groups[i].id === groupId) {
                    return groups[i];
                }
            }
            return undefined;
        }
    }

    function setInput(id) {
        var groupRow = jquery('#' + id);
        var stateName = groupRow.find('#nameState');
        var states = groupRow.find('select');
        stateName.val(states.val());

        states.on('change', function (e) {
          stateName.val(states.val());
        });
    }

    function addStates() {
        var data = getData();
        for (var i = 0, len = data.variables.length; i < len; i++) {
            if (data.variables[i].id === currentElementId.val()) {
                currentElement = data.variables[i];                
            }
        }
        var addState = jquery('.addState');
        jquery('.itemToolBox button').on('click', function () {
            var id = jquery(this)
                .parent().parent().parent()
                .parent().parent().parent()[0].id;
                
            var group = getGroupBy(id);
            var elem = jquery(this)
                .parent().parent().find('p').text();
            
            data = getData();
            console.log(data.currentElement.uniqValPersist);
            console.log(elem);
            if (lodash.indexOf(data.currentElement.uniqValPersist, elem) != -1) {
                data.currentElement.uniqVal.unshift(elem);            
                localStorage.elementsWithData = JSON.stringify(data);
            }
            lodash.pull(group.forEditStates.states, elem);

            saveGroup(group);
            refreshList();
        });
        for (var i = 0, len = addState.length; i < len; i++) {
            setInput(jquery(addState[i]).data('id'));
        }

        addState.on('click', function (e) {            
            var id = jquery(this).data('id');
            var groupRow = jquery('#' + id);
            var addState = groupRow.find('#addState');
            var stateName = groupRow.find('#nameState');
            var states = groupRow.find('select');
            var statesList = groupRow.find('.list-group');
            if (stateName.val() != "") {            
                var group = getGroupBy(id);               
                if (lodash.indexOf(group.forEditStates.states, stateName.val()) == -1) {
                    data = getData();
                    lodash.remove (data.currentElement.uniqVal, function(el) {
                        return el == stateName.val();
                    });

                    var index = lodash.findIndex(data.variables, function (v) {
                        return v.id == data.currentElement.id;
                    });
                    data.variables[index].uniqVal = data.currentElement.uniqVal;                    

                    group.forEditStates.states.push(stateName.val());
                    stateName.val('');                    
                    localStorage.elementsWithData = JSON.stringify(data);
                    saveGroup(group);                    
                    refreshList();
                }
            }
            
        });             
    }    

    function removeById(groupId) {
        var data = getData();
        var varId = currentElementId.val();
        var flag = false;
        if (data &&
           data.variables &&
           varId) {
            for (var i = 0, len = data.variables.length; i < len; i++) {
                if (data.variables[i].id === varId) {
                    if (data.variables[i].groups) {
                        for (var j = 0, lenJ = data.variables[i].groups.length; j < lenJ; j++) {
                            if (data.variables[i].groups[j].id === groupId) {
                                flag = true;
                            }
                            if (flag) {
                                data.variables[i].groups[j] = data.variables[i].groups[j + 1];
                            }                            
                        }
                        flag = false;
                        data.variables[i].groups.pop();
                        break;
                    }
                }
            }
            for (var k = 0, len = data.currentElement.groups.length; k < len; k++) {
                if (data.currentElement.groups[k].id === groupId) {
                    flag = true;
                }
                if (flag) {
                    data.currentElement.groups[k] = data.currentElement.groups[k+1];
                }
            }
            flag = false;
            data.currentElement.groups.pop();
            localStorage.elementsWithData = JSON.stringify(data);
        }

    }

    function saveGroup(group) {
        var data = getData();
        var varId = currentElementId.val();
        if(data &&
           data.variables &&
           varId){
            for(var i=0, len=data.variables.length; i<len;i++){
                if (data.variables[i].id === varId) {
                    if (data.variables[i].groups) {
                        for (var j = 0, lenJ = data.variables[i].groups.length; j < lenJ; j++) {
                            if (data.variables[i].groups[j].id === group.id) {
                                data.variables[i].groups[j].name = group.name;
                                data.variables[i].groups[j].range = group.range;
                                data.variables[i].groups[j].forEdit = group.forEdit;
                                data.variables[i].groups[j].forEditStates = group.forEditStates;
                
                                for (var k = 0, len = data.currentElement.groups.length; k < len; k++) {
                                    if (data.currentElement.groups[k].id === group.id) {
                                        data.currentElement.groups[k].name = group.name;
                                        data.currentElement.groups[k].range = group.range;
                                        data.currentElement.groups[k].forEdit = group.forEdit;
                                        data.currentElement.groups[k].forEditStates = group.forEditStates;
                                        localStorage.elementsWithData = JSON.stringify(data);
                                        return true;
                                    }
                                }                   
                            }
                        }                        
                    }
                }
            }
        }
        
    }
    
    function getData() {
        var data;
        if (localStorage.elementsWithData) {
            data = JSON.parse(localStorage.elementsWithData);
        }
        return data;
    }

    function onNext() {
        module.find('.btn-next')
            .on("click", function (e) {
                jquery('#myWizard').wizard('next', 'foo');
            });
    }

    return {
        start: start
    }
    });
