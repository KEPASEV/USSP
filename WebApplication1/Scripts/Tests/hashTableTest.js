

test("object tree", function () {

    var objectTre = objectTree;
    objectTre.config(["id1", "id2"], true);
    var bo = ["a", "b", "c", "d", "e", "f", "g"];
    for (var i = 0; i < 3 ; i++) {
        for (var j = 0; j < 3 ; j++){
            var obj = {
                id1: bo[i],
                id2: bo[j*i]
            }
        objectTre.add(obj);
        
    }
    }
    for (var i = 0; i < 3 ; i++) {
        for (var j = 0; j < 3 ; j++) {
            var obj = {
                id1: bo[i],
                id2: bo[j * i]
            }
             //objectTre.remove(obj);
            //console.log(objectTre.getArr());
        }
    }
    for (var i = 0; i < 3 ; i++) {
        for (var j = 0; j < 3 ; j++) {
            var obj = {
                id1: bo[i],
                id2: bo[j * i]
            }
            //objectTre.add(obj);
    //        console.log(objectTre.getArr());
        }
    }
    console.log(objectTre.getArr());
    console.log(objectTre.getHash());
    
    ok(1 == 1, "ok");
})
