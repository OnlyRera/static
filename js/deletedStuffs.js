
//var localityList = createLocalityList();
//var areaList = createAreaList();
//var projectNameList = createProjectNameList();
//var districtList = crateDistrictList();
//var reraNoList = crateReraNoList();


function crateDistrictList() {
	var districtSet = new Set(); 
	projectList.forEach(function (project) {
		districtSet.add(project.district.trim());
	});
	return Array.from(districtSet);
}

function createAreaList() {
	var areaSet = new Set(); 
	projectList.forEach(function (project) {
		if(project.area) {
			areaSet.add(project.area.trim());
		}
	});
	return Array.from(areaSet);
}

function createProjectNameList() {
	var projectNameSet = new Set(); 
	projectList.forEach(function (project) {
		projectNameSet.add(project.name.trim());
	});
	return Array.from(projectNameSet);
}
function createLocalityList() {
	var localitySet = new Set(); 
	projectList.forEach(function (project) {
		var projectAddress = project.address.trim();
		var localityValues = projectAddress.split(",");;
		project.locality = localityValues[localityValues.length - 1];
		localitySet.add(localityValues[localityValues.length - 1].trim());
	});
	return Array.from(localitySet);
}
