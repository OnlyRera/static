crateTagInputLists();
createTagsInput();

var localityList;
var areaList;
var projectNameList;
var districtList;
var reraNoList;

function crateTagInputLists() {
	
	areaList =  ["ajwa","aajwa","akota","alamgir","alkapuri","ankhol","asoj","atladara","atladra","bajwa","bakrawadi","bapunagar","bhayli","bhayali","bill","chhani","chhani jakat naka","chipad","chokshi bazar","dabhoi","dandia bazar","danteshwar","darshali","dashrath","diwalipura","dumad","ellora park","fatehgunj","fatehpura","gorwa","gotri","halol","harinagar","haripura","harni","jambubet","jambuva","jarod","jaspur","jeasnpura","jetalpur","kalali","kapurai","kapurai village","karadiya","karelibaug","karjan","kendranagar","kevdabaug","khanpur","khatamba","kishanwadi","kodarvaya","koyali","lalbaug","laxmipura","limdi","madhavpura","mahapura","makarpura","mandvi","maneja","manjalpur","manjusar","moghul wada","muj mahuda","mujar gamdi","nagarwada","nandesari","navapura","new alkapuri","new karelibaug","new sama","new sama bhadran nagar","new sama road","new vip road","nizampura","old padra road","op road","padra","padra road","panchvati","parda road","pratapgunj","pratapnagar","productivity road","puniyad","race course","ramwadi","ranoli","raopura","rasulabad","ratanpur","ravaliya mahudevegon","saiyed vasna","sama","sama-savil road","samta","sangma","sankarda","sankhyad","sayaji park society","sayajigunj","sayajipura","sevasi","Sewasi","sherkhi","shiyabaug","shukla nagar","siddharth nagar","sokhda","soma talav","somatalav","somnath nagar","subhanpura","sultanpura","sun pharma road","suryanagar","talsat","tandalja","tandlja","tarsali","umeta","undera","vadiwadi","vadodara-anklav road","vadodara-halol highway","vadsar","vasna","vasna-bhayli road","vemali","vijay nagar","vip road","vishwamitri","wadi","waghodia","waghodiya","waghodia road","waghodia-dabhoi ring road","warasiya"];

	var reraNoSet = new Set(); 
	var districtSet = new Set(); 
	//var areaSet = new Set(); 
	var projectNameSet = new Set(); 
	var localitySet = new Set(); 
	
	projectList.forEach(function (project) {
		project.address = toTitleCase(project.address);
		project.promoterName = toTitleCase(project.promoterName);
		project.name = toTitleCase(project.name);
		reraNoSet.add(project.reraNo.trim());
		//districtSet.add(project.district.trim());
		
		// Set Area
		if(!project.area) {
			areaMatched = getMatchingArea(project.address);
			if(areaMatched) {
				project.area = areaMatched;
			}
			else {
				//console.log("Area not found for:" + project.address);
			}
		}
		projectNameSet.add(project.name.trim());
		
		//	Set locality		
		var projectAddress = project.address.trim();
		var localityValue = getLocalityValue(project);
		project.locality = localityValue;
		localitySet.add(localityValue);
	});
	
	reraNoList = Array.from(reraNoSet);
	//districtList = Array.from(districtSet);
	//areaList = Array.from(areaSet);
	projectNameList = Array.from(projectNameSet);
	localityList = Array.from(localitySet);
}

function getLocalityValue(project) {
	localityValues = project.address.split(",");
	
	var i;
	for (i = 0; i < localityValues.length; i++) { 
		if(localityValues[i] && localityValues[i] != project.area) {
			return localityValues[i].trim();
		}
	}
	return "";
}

function getMatchingArea(address) {
	var i;
	for (i = 0; i < areaList.length; i++) { 
		if(address.toLowerCase().indexOf(areaList[i]) !== -1) {
			return areaList[i];
		}
	}
	return "";
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