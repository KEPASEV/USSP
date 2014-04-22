define(function () {
    
    function System(system) {
            this.id = (system && system.id)
            this.name = (system && system.name)|| 'Исходная система';
            this.goal = (system && system.goal)|| '';
            this.elements = [];
    }
    
    return System;
});





