var determInitSystem = (function () {
    
    var initSystem = new InitSystem();
    var elementsHashList = hashTable;

    function InitSystem(system) {
        this.name = system && system.name;
        this.goal = system && system.goal;
        this.elements = [];
    }

    InitSystem.prototype = {
    }

    function SystemElement(element) {
        this.name = element && element.name;
        this.type = element && element.type;
        this.role = element && element.role;
        this.comment = element && element.comment;
        this.fuzzy = element && element.fuzzy;
        this.domain = element && element.domain;
        this.values = element && element.values;
    }

    SystemElement.prototype = {
    }

    function getHash(object) {
        if (object instanceof SystemElement) {
            return object.name;
        }
    }

    function isExist(hashArr, hash) {
        return (hashArr[hash] != undefined) ? true : false;
    }

    function removeFrom(arr, index) {
        for (var i = index; i < arr.length; i++) {
            arr[i] = arr[i + 1];
        }        
        arr.pop();            
    }

    return {
        setName: function (name) {
            initSystem.name = name;
        },
        setGoal: function (goal) {
            initSystem.goal = goal;
        },
        addElement: function (element) {
            var newSystemElement = new SystemElement(element);
            if (newSystemElement) {
                var hash = getHash(newSystemElement);
                if (!isExist(elementsHashList, hash)) {
                    elementsHashList[hash] = initSystem.elements.length;
                    initSystem.elements.push(newSystemElement);
                } else {
                }
            }
        },
        removeElement: function (element) {
            if (element) {
                var hash = getHash(element);
                if (isExist(elementsHashList, hash)) {
                    var index = elementsHashList[hash];
                    removeFrom(initSystem.elements, index);
                    delete elementsHashList[hash];
                } else {
                }
            }
        },
        getSystem: function (){
            return initSystem;
        }
    }
}());








