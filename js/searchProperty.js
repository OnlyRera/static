//var areaList = ["Sama","Harni", "Karelibaug"];
//var projectNameList = ["Sun Sama", "Sun Antilia", "Sun Karelibaug"];
//var localityList = ["Sama savali Road", "Harni Motnath Road", "VIP Road"];
//var districtList = [];


var	selectedArea = null;
var selectedProjectName = null;
var	selectedLocality = null;
var	selectedReraNo = null;
	

var projectList = propertyDetails.projectList;

function getSearchResults() {
	creatSearchParameters();
	var propertyType = $("input[name='propertyType']:checked").val();
	var searchResultList = [];
	var projectNameResultList = [];
	var reraNoResultList = [];
	var areaResultList = [];
	var localityResultList = [];
	
	//alert(propertyType);
	//alert(projectList[0].name);
	//alert(selectedArea);
	//alert(selectedProjectName);
	//alert(selectedLocality);
	
	var filteredProjects = $.grep(projectList, function (project, index) {
		
		// Enable multiselect later on
		if(selectedProjectName != null && project.name == selectedProjectName) {
			projectNameResultList.push(project);
			return false;
		}
		
		// Enable multiselect later on
		if(selectedReraNo != null && project.reraNo == selectedReraNo) {
			reraNoResultList.push(project);
			return false;
		}
		
		if(selectedArea != null && project.area == selectedArea) {
			areaResultList.push(project);
			return false;
		}
		
		if(selectedLocality != null && project.locality == selectedLocality) {
			localityResultList.push(project);
			return false;
		}
		
		if(!$.inArray(propertyType, project.unitTypeList) 
				&& filterByBedroomArray(project) 
				//&& inPriceRange(project.price) 
				//&& isCarpetAreaInRange(project.carpetArea)
				) {
			return true;
		}
		return false;
	});
	
	
	filteredProjects.forEach(function (project) {
		//alert(project.name + project.area + project.unitTypeList);
	});
	//alert(filteredProjects.length);
	
	if(reraNoResultList.length > 0) {
		searchResultList = searchResultList.concat(reraNoResultList);
	}
	if(projectNameResultList.length > 0) {
		searchResultList = searchResultList.concat(projectNameResultList);
	}
	if(areaResultList.length > 0) {
		searchResultList = searchResultList.concat(areaResultList);
	}
	if(localityResultList.length > 0) {
		searchResultList = searchResultList.concat(localityResultList);
	}
	if(filteredProjects.length > 0) {
		searchResultList = searchResultList.concat(filteredProjects);
	}
	return searchResultList;
}

function isSelecteAreaMatches(keyword) {
	if(selectedArea == null || keyword == selectedArea) {
		return keyword;
	}
	return false;
}

function isSelecteReraNoMatches(keyword) {
	//alert(selectedReraNo);
	if(selectedReraNo == null || keyword == selectedReraNo) {
		return keyword;
	}
	return false;
}

function isSelecteProjectNameMatches(keyword) {
	if(selectedProjectName == null || keyword == selectedProjectName) {
		return keyword;
	}
	return false;
}

function isSelecteLocalityMatches(keyword) {
	if(selectedLocality == null || keyword == selectedLocality) {
		return keyword;
	}
	return false;
}

function isCarpetAreaInRange(carpetArea) {
	var minCarpetArea = $('#carpetAreaSlider').slider("values")[0];
	var maxCarpetArea = $('#carpetAreaSlider').slider("values")[1];
	return carpetArea >= minCarpetArea && carpetArea <= maxCarpetArea;
}

function inPriceRange(price) {
	var minPrice = $('#priceSlider').slider("values")[0];
	var maxPrice = $('#priceSlider').slider("values")[1];
	return price >= minPrice && price <= maxPrice;
}

function filterByBedroomArray(project) {
	var isFound = false;
	$.each($("input[name='bedroom']:checked"), function(){            
		isFound = isFound ||  isValueInArray($(this).val(), project.bedroomsList);
	});
	return isFound;
}

function isValueInArray(value, array) {	
	value = value.toLowerCase();
	var i;
	for (i = 0; i < array.length; i++) { 
		if(array[i].toLowerCase() == value) {
			return true;
		}
	}
	return false;
}

function creatSearchParameters() {
	selectedArea = null;
	selectedProjectName = null;
	selectedLocality = null;
	selectedReraNo = null;

	var searchBarText = $("#searchBar").val();
	//alert(searchBarText);
	//alert($("#searchBar").tagsinput('items'));
	var searchKeyworkds = searchBarText.split(",");
	
	searchKeyworkds.forEach(function (textElement) { 
		if(areaList.includes(textElement)) {
			selectedArea = textElement;
		}
		if(projectNameList.includes(textElement)) {
			selectedProjectName = textElement;
		}	
		if(localityList.includes(textElement)) {
			selectedLocality = textElement;
		}
		
		if(reraNoList.includes(textElement)) {
			selectedReraNo = textElement;
		}
		
	});
	
}

function isElementInList(element, list) {
	return list.includes(element);
}

function getProjectList() {
	
    projectList.sort(function(x, y) {
        return (x.premium === y.premium)? 0 : x.premium? -1 : 1;
    });
	if(projectList.length > 25) {
		return projectList.slice(0, 25);
	}
  return projectList;
}

function toTitleCase(str) {
	if(str) {
		return str.replace(
			/\w\S*/g,
			function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			}
		);
	}
	return str;
}

function hidePremiumProperties() {
	$("#premiumProperties").hide();
}
var Project = Vue.extend({
  template: '#project',
  data: function () {
    return {projects: getProjectList()};
  },
  
  methods: {
	updateProjects: function () {
		this.projects = getSearchResults();
		hidePremiumProperties();
    }
  }
});

var router = new VueRouter({
	routes: [
		{path: '/', component: Project, name: 'project'}
	]
});

new Vue({ router:router }).$mount('#app');