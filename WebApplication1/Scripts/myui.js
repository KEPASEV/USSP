$(document).ready(function () {

    $('#initSystemNextButton').on('click', function () {
        //getSystem('#initialSystem');
        systemJson = getSystem('#initialSystem');
        maskWidget("#maskWidget", systemJson);
    });

    $('#myWizard').wizard();
    $('.btn-next').on('click', function () {
        $('#myWizard').wizard('next', 'foo');
    });

    $('.systemElement').on('click', function () {
        $(this).siblings().removeClass('active');
    });
    $("[data-value='var']").click();

  	$('.switch').bootstrapSwitch();
	var warningHelpers = $('.warning-helper');
	warningHelpers.hide();
	var stateNameHelper = warningHelpers.filter('[for="stateName"]');
	var varNameHelper = warningHelpers.filter('[for="varName"]');
	var panels = $('.typePanel');
	panels.hide();
	var typeSelection = $('#typeSelection');
	typeSelection.selectpicker({width:'120px'})
		.on('change', function(e){
			panels.filter('#' + e.target.value).show();
			panels.filter(':not(#' + e.target.value + ')').hide();
	});

	//NUMBER PANEL
	var numberPanel = panels.filter('#number');
	var numberRangeOfDefinition = $('#rangeOfDefenition');
	var lowRange = numberPanel.find('input[type="number"][name="lowRange"]');
	var highRange = numberPanel.find('input[type="number"][name="highRange"]');
	numberPanel.find('input[type="number"]').on('input', function(e){
			var inputNumber = numberPanel.find(e.target);
			var range = inputNumber.data("range");
			updateMathNotation(range, inputNumber.val());
		});
	numberPanel.find('input[type="number"]')
		.on('keypress', function(e){
			if((e.charCode>46 && e.charCode<58)	||
				e.charCode == 45  ){
			}else{
				return false;
			}
		})
		.hide();
	numberPanel.find('input[type="checkbox"]')
		.on('change', function(e){
				var inputNumber = numberPanel.find(e.target.offsetParent.lastElementChild);
				inputNumber.toggle();
				var checkbox = numberPanel.find(e.target);
				var range = panels.find(this).data("range");
				var value = checkbox.prop("checked")?((checkbox.data("range") == "low")?'-\u221E':'+\u221E'):inputNumber.val();
				updateMathNotation(range, value);
			});
	var ranges ={
		low:'-\u221E',
		high:'+\u221E'
	};
	var updateMathNotation = function(range, value){
		ranges[range] = value;
		var rangeOfDefenition = '[ ' + ranges.low + ' ; ' + ranges.high + ' ] ';
		numberRangeOfDefinition.text(rangeOfDefenition);
	}
	//NOMINAL PANEL
	var nominalPanel = panels.filter("#nominal");
	var statesPanel = nominalPanel.children('div').last();
	statesPanel.hide();
	var allStatesCheckBox = nominalPanel.find('input[type="checkbox"]');
	allStatesCheckBox.on('change', function(e){
		statesPanel.toggle();
	});

	var inputStateName = nominalPanel.find('#stateName');
	var stateRows = nominalPanel.find('tbody');
	var inputStateDescription = nominalPanel.find('#stateDescription');
	statesPanel.find('button').on('click', function(e){
		var stateName = inputStateName.val().trim();
		var isNotInTable = true;
		if(stateName !== ""){
			stateRows.find('.stateName').each(function(){
				return (isNotInTable = (this.innerText !== stateName));
			});
			if(isNotInTable){
				var lastNum = stateRows.find('tr:last-child td:first-child').text();
				var num = (lastNum == "")?1:++lastNum;
				var description =  inputStateDescription.val();
				stateRows.append('<tr><td>' + num +
					'</td><td class="stateName">' + stateName +
					'</td><td>' + description + '</td>' +
					'<td data-action="removeRow"><span data-action="removeRow" style="cursor:default" class="glyphicon glyphicon-remove"></span></td>' +
					'</tr>');
				inputStateDescription.val("");
					inputStateName.val("").focus();
				}else{
					stateNameHelper.text("Такое значение уже существует!");
					stateNameHelper.show();
				}
			}else{
				stateNameHelper.text("Введите значение!");
				stateNameHelper.show();
			}
		});
		inputStateName.on('input',function(){
			stateNameHelper.hide();
			})


	//TIME PANEL
	var timePanel = panels.filter('#time');
	timePanel.find('select').selectpicker({width:'100px'});
	timePanel.find('div[data-panelFor="duration"]').hide();
	timePanel.find('select:first')
		.on('change', function(e){
			var value = timePanel.find(this).val();
			var activePanel = timePanel.find('div[data-panelFor="'+value+'"]');
			activePanel.show();
			activePanel.siblings().hide();
		});

	var inputs = $('input');
	var selects = $('select');
	var addVariableButton = $('#addVar');
	var varNameInput = $('#varName');
	var varRows = $('#varRows');
	var paramRows = $('#paramRows');
	var systemElement; 
	$('.systemElement').on('click', function(e){systemElement = $(this).data("value")});
	var descriptionInput = $('#description');
	addVariableButton.on('click',function(e){
		var varName = varNameInput.val().trim();
		var isNotInTable = true;
		if( varName !== ""){
		    var rows;
		    var role;
			if(systemElement == "param"){
			    rows = paramRows;
			    role = "parameter";
			}else{
			    rows = varRows;
			    role = "variable";
			}
			rows.each(function(){
				return (isNotInTable = (this.innerText !== varName));
				});
			if(isNotInTable){
				var typeVal = typeSelection.val(); 	
				if(typeVal !== "type"){
					var typeName = typeSelection.find(':selected').text();
					var description = descriptionInput.val();
					var range = getRange(typeVal);
					var lastNum = rows.find('tr:last td:first').text();
					var num = (lastNum == "")?1:++lastNum;
					rows.append('<tr class="element" data-role="'+role+'"><td>'+num+
						'</td><td class="varName">'+varName+
						'</td><td>'+typeName+'</td>'+
						'<td>'+description+'</td>'+
						'<td>'+range+'</td>'+
						'<td data-action="removeRow"> <span data-action="removeRow" style="cursor:default" class="glyphicon glyphicon-remove"></span> </td>' +
						'</tr>');
				inputs.filter('[type="text"]').val("");
				inputs.filter('[type="number"]').val("0");
				inputs.filter(':checkbox').filter(':not(:checked)').trigger('click');
				panels.find('tbody tr').remove();
				selects.each(function(){
						var el = selects.filter(this);
						var firstVal = el.find(':first-child').val();
						el.selectpicker('val', firstVal );
						});
				selects.selectpicker('refresh');
				varNameInput.focus();
				}else{
				}
			}else{
				varNameHelper.text("Переменная с таким именем уже существует!");
				varNameHelper.show();
			}
		}else{
			varNameHelper.text("Введите название переменной!");
			varNameHelper.show();
		}
	});
	varNameInput.on('input', function(){
		varNameHelper.hide();
		});

	var tBodies = $('table tbody');
	tBodies.on('click', function(e){
		var target = tBodies.find(e.target);
		if (target.data("action") == "removeRow"){
			target.parents("tr").remove();
			tBodies.find('tr td:first-child').each(function(i, elem){
				elem.innerText = ++i;
				});
			}
	});

	var getRange = function(type){
		var range;
		if(type == "number"){
			range = numberRangeOfDefinition.text();
		}else if(type == "nominal"){
			if( allStatesCheckBox.prop("checked")){
				range = "все встречающиеся значения";
			}else{
				range = "{";
				stateRows.find('.stateName').each(function(){
					range += " " + this.innerText + ",";
					});
				range = range.substring(0, range.length-1);
				if( range.length !== 0){
					range+= " }";
				}else{
				}
			}
		}else if(type == "time"){
			var methodSelect = timePanel.find("select:first"); 
			var methodVal = methodSelect.val();
			var methodName = methodSelect.find(':selected').text();
			var selectForMethod = timePanel.find('div[data-panelFor="' + methodVal +'"] select');
			var methodRangeName = selectForMethod.find(':selected').text();
			range = "Метод: " + methodName + " |  Единица измерения: " + methodRangeName;					
		}
		return range;
	}
});


