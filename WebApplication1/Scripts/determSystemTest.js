test("determSystem", function (){
    
    var initSystem = determInitSystem;

    initSystem.setName("<система>");
    initSystem.setGoal("<цель>");
    equal(initSystem.getSystem().name, "<система>", 'set name');
    equal(initSystem.getSystem().goal, "<цель>", 'set goal');

    for (var i = 0; i < 2; i++) {
        initSystem.addElement({name:"<name>"});
        console.log(initSystem);
    }
    
    equal(initSystem.getSystem().elements[0].name, "<name>", 'add 2 elements');
    for (var i = 0; i < initSystem.getSystem().elements.length; i++) {
        initSystem.removeElement(initSystem.getSystem().elements[i]);
    }

});

test('remove from array', function () {
    var arr = [1, 4, 3, 5, 26, 3];
    removeFrom(arr, 0);
    equal(arr[0], 4, 'remove first');
    equal(arr.length, 5, 'new length');

});

test('hash for object', function () {
    var newElement = new SystemElement({ name: "<name>" });
    var hash = getHash(newElement);
    equal(hash, "<name>", 'hash for element');

    var hashArr = [];
    hashArr[hash] = 0;

    ok(isExist, 'exist element');
});