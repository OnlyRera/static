crateTagInputLists();
createTagsInput();

var localityList;
var areaList;
var projectNameList;
var districtList;
var reraNoList;

function crateTagInputLists() {
	var reraNoSet = new Set(); 
	var districtSet = new Set(); 
	var areaSet = new Set(); 
	var projectNameSet = new Set(); 
	var localitySet = new Set(); 
	
	projectList.forEach(function (project) {
		project.address = toTitleCase(project.address);
		project.promoterName = toTitleCase(project.promoterName);
		project.name = toTitleCase(project.name);
		reraNoSet.add(project.reraNo.trim());
		//districtSet.add(project.district.trim());
		if(project.area) {
			areaSet.add(project.area.trim());
		}
		projectNameSet.add(project.name.trim());
		
		//	Para locality		
		var projectAddress = project.address.trim();
		var localityValues = projectAddress.split(",");;
		project.locality = localityValues[localityValues.length - 1];
		localitySet.add(localityValues[localityValues.length - 1].trim());
	});
	
	reraNoList = Array.from(reraNoSet);
	//districtList = Array.from(districtSet);
	areaList = Array.from(areaSet);
	projectNameList = Array.from(projectNameSet);
	localityList = Array.from(localitySet);
}

function createTagsInput() {
	// value witthout key value pair  working
	valuesCity = areaList
	valuesCity = valuesCity.concat(projectNameList);
	valuesCity = valuesCity.concat(localityList);
	valuesCity = valuesCity.concat(reraNoList);

	var citynames = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.whitespace,
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  local: valuesCity
	});

	citynames.initialize();

	$('#searchBar').tagsinput({
		typeaheadjs: {
			name: 'citynames',
			source: citynames.ttAdapter()
		}
	});
}
		
//$('#searchBar').tagsinput('add', "Sama");

/* value wit key value pair not working
		valuesCity = [ 
			{"type": "area", "text":"Sama"}, 
			{"type": "area", "text":"Waghodiya"}, 
			{"type": "area", "text":"Harni"}, 
			{"type": "projectName", "text":"Sun Antilia"}, 
			{"type": "locality", "text":"Bh Cygnus World School Harni Motnath Road"}, 
			{"type": "reraNo", "text":"PR/GJ/VADODARA/VADODARA/Others/RAA04671/110119"}
		];
		
		var citynames = new Bloodhound({
		  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text'),
		  queryTokenizer: Bloodhound.tokenizers.whitespace,
		  local: valuesCity
		});
		
		citynames.initialize();
		
		$('#searchBar').tagsinput({
			itemValue: 'text',
			itemText: 'text',
			typeaheadjs: {
				name: 'citynames',
				displayKey: 'text',
				source: citynames.ttAdapter()
			}
		});
*/