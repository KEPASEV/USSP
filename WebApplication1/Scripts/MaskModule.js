define(['Controllers/AddMask'], function (AddMask) {

            function start() {
                localStorage.selectedVarList = JSON.stringify({ selectedVarList: [] });
                AddMask.start();                
            }

            return {
                start: start
            };
        });