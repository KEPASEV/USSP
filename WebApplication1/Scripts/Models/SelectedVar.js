define(['Other/guidGenerator'], function (guidGenerator) {

    function SelectedVar(SelectedVar) {
        this.id = guidGenerator.getGUID();
        this.num = SelectedVar.name;
        this.initVar = SelectedVar.initVar;
        this.shift = SelectedVar.shift;
        this.g = SelectedVar.g;
    }

    return SelectedVar;
});