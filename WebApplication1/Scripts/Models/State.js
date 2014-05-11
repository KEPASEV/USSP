define(['Other/guidGenerator'], function (guidGenerator) {
    function State(state) {
        this.id = guidGenerator.getGUID();
        this.name = (state && state.name) || '';        
        this.comment = (state && state.comment) || '';        
    }
    return State;
});