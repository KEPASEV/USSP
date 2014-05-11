define(['Other/guidGenerator'], function (guidGenerator) {

    function SelectedVar(SelectedVar) {
        this.id = guidGenerator.getGUID();
        this.name = SelectedVar.name || "name";
        this.initVar = SelectedVar.initVar;
        this.shift = SelectedVar.shift;
        this.g = SelectedVar.g || false;
    }

    return SelectedVar;
});