define(['Other/guidGenerator'], function (guidGenerator) {

    function Group(group) {
        this.id = guidGenerator.getGUID();
        this.name = (group && group.name) || '';
        this.range = (group && group.range) || '';        
    }

    return Group;
});