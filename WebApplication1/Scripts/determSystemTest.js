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