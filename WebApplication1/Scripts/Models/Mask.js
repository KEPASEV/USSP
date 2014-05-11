define(['Other/guidGenerator'], function (guidGenerator) {

    function Mask(mask) {
        this.id = guidGenerator.getGUID();
        this.name = mask.name;
        this.comment = mask.comment;
        this.directory = mask.directory || 0;
        this.selectedVars = [];
    }

    return Mask;
});