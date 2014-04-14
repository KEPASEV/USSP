﻿define(function () {
    
    function Element(element) {
        this.id = (element && element.id) || '';
        this.name = (element && element.name) ||'';
        this.type = (element && element.type) || '';
        this.role = (element && element.role) || '';
        this.comment = (element && element.comment) || '';
        this.fuzzy = (element && element.fuzzy) || false;
        this.domain = (element && element.domain) || '';
        this.values = (element && element.values) || [];
    }
   
    return Element;
});