var acc = document.getElementsByClassName("project-highlight-switch");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
	this.classList.toggle("active");
	var discriptions = document.getElementsByClassName("project-highlights");
	var panel = discriptions[0];
	
	var upArrowElements = document.getElementsByClassName("project-highlights-up-arrow");
	var upArrowElement = upArrowElements[0];
	var upArrowElement1 = upArrowElements[1];
	
	var downArrowElements = document.getElementsByClassName("project-highlights-down-arrow");
	var downArrowElement = downArrowElements[0];
	var downArrowElement1 = downArrowElements[1];
		
	if (panel.style.display === "block") {
		panel.style.display = "none";
		upArrowElement.style.display = "none";
		downArrowElement.style.display = "block";
		upArrowElement1.style.display = "none";
		downArrowElement1.style.display = "block";
		
	} else {
		panel.style.display = "block";
		upArrowElement.style.display = "block";
		downArrowElement.style.display = "none";
		upArrowElement1.style.display = "block";
		downArrowElement1.style.display = "none";
	}
  });
}

/*
 $(".owl-carousel").owlCarousel({
	loop:true,
	smartSpeed:450,
	responsiveClass: true,
	autoplayHoverPause: true, // Stops autoplay
	responsiveRefreshRate : 10,
	items:1,
});
$('.owl-carousel div').on('mouseenter',function(e){
$(this).closest('.owl-carousel').trigger('play.owl.autoplay');
})

$('.owl-carousel div').on('mouseleave',function(e){
$(this).closest('.owl-carousel').trigger('stop.owl.autoplay');
})*/

$('.owl-carousel').trigger('stop.owl.autoplay');

var tabPane = $('.tab-pane');
if(tabPane != undefined && tabPane[0] != undefined) {
	tabPane[0].classList.add('active');
	tabPane[0].classList.add('show');
	var tabLink = $('#' + tabPane[0].id + '-tab');
	tabLink[0].classList.add('active');
	tabLink[0].classList.add('show');
}