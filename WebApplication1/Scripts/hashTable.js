var hashTable = (function () {
    var mainArr = [];
    var hashArr = [];
    var hashFunction = function (object) {
        return object.toString();
    };    
    var getHash = function (object) {
        var hash = hashFunction(object);
        return hash;
    };
    var isExist = function (hash) {
        return (hashArr[hash] == undefined) ? false : true;
    };
    var compressArrFrom = function (index) {
        for (var i = index, len = mainArr.length; i < len; i++) {
            mainArr[i] = mainArr[i + 1];
        }
        mainArr.pop();
    };
    
    
    return {
        setHashFunction: function (func) {
            hashFunction = func;
        },
        add: function (object) {
            var hash = getHash(object);
            if (isExist(hash)) {
                console.log("element with hash:" + hash + " have existed!");
            } else {
                hashArr[hash] = mainArr.length;
                mainArr.push(object);
            }
        },
        remove: function (object) {
            var hash = getHash(object);
            if (isExist(hash)) {
                var index = hashArr[hash];
                delete mainArr[index];
                compressArrFrom(index);
            } else {
                console.log("element with hash:" + hash + " have not existed!");
            }
        },
        getArr: function () {
            return mainArr;
        }
    }
})();

var objectTree = (function () {
    var mainArr = [];
    var hash = {};
    
    var isExist = function (hash) {
        return (hashArr[hash] == undefined) ? false : true;
    };
    var levels = 0;
    var properties = [];
    var getLeave = function (object) {
        var arr = mainArr;
        for (var i = 0; i < levels - 1; i++) {
            var key = object[properties[i]];
            if (arr[key] == undefined) {
                arr[key] = [];
            } else {                
            }
            arr = arr[key];
        }
        var key = object[properties[levels-1]];
        return { arr: arr, key: key };
    }
    var getLeaveUsedHash = function (object) {
        
        var arr = mainArr;        
        var hashArr = hash;
        for (var i = 0; i < levels; i++) {
            var key = object[properties[i]];            
            
            if (hashArr[key] == undefined) {
                hashArr[key] = { i: arr.length, child: [] };
                if (i < levels - 1) {
                    arr.push([]);
                } else if (i == levels - 1) {
                    arr.push(object);
                }
                
            } else {                
            }
            if (i < levels - 1) {
                arr = arr[arr.length - 1];
                hashArr = hashArr[key].child;       
            }            
        }
        
        return { arr: arr, key: arr.length-1 };
    }
    var useHash = false;

    return {
        config: function (piorityPropertyArr, useHashProp) {
            if(piorityPropertyArr instanceof Array){
                levels = piorityPropertyArr.length;
                properties = piorityPropertyArr;
            }
            useHash = useHashProp;
        },
        add: function (object) {
            if (useHash) {
                var leave = getLeaveUsedHash(object);                
            } else {
                var leave = getLeave(object);                
            }
            leave.arr[leave.key] = object;
        },
        remove: function (object) {
            var leave = getLeave(object);
            delete leave.arr[leave.key];            
        },
        getArr: function () {
            return mainArr;
        },
        getHash: function () {
            return hash;
        }
    }
})();
