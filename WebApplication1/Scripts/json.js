function getSystem(selector) {
    var elements = [];
    var values = [];
    var systemTable = $(selector);
    systemTable.find('.element')
        .each(function (i, e) {
            var element = new Element();
            element.name = e.cells[1].innerHTML;
            element.type = e.cells[2].innerHTML;
            element.comment = e.cells[3].innerHTML;
            element.domain = e.cells[4].innerHTML;
            element.role = $(e).data("role");
            for (var i = 0; i < 40; i++) {
                values.push(Math.floor(Math.random()*100));
                values.push(Math.random(0,100000));
            }
            element.values = values;
            
            elements.push(element);
        });
    var system = new NewSystem("Чайки", "Узнать пограничное поведение чаек", elements);
    var jsonSystem = JSON.stringify(system);
    return jsonSystem;
}

function NewSystem(name, goal, elements) {
    this.name = name;
    this.goal = goal;
    this.elements = elements;
}

NewSystem.prototype = {
}

function Element() {
    this.name = null;
    this.type = null;
    this.role = null;
    this.comment = null;
    this.fuzzy = null;
    this.domain = null;
    this.values = null;

}

Element.prototype = {
}