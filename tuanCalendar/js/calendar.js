window.onload = function main(){
	months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
	var currentMonth = {month:3};
	currentMonths = document.getElementById("months");
	document.getElementById("left").addEventListener("click", function(){
    goLeft(currentMonth,currentYear);});
	document.getElementById("right").addEventListener("click", function(){
    goRight(currentMonth,currentYear);});
	currentMonths.innerHTML = months[currentMonth.month];
	var currentYear = {year:2017};
	currentYears = document.getElementById("year");
	currentYears.innerHTML = currentYear.year;
	document.getElementById("arrowDown").addEventListener("click", function(){dropDown();});
};
/*activate right arrow and increase year*/
function goRight(currentMonth,currentYear) {
	if (currentMonth.month < months.length-1) {
    	currentMonth.month+=1;
    	currentMonths.innerHTML = months[currentMonth.month];
	} 
	if (currentMonth.month==months.length-1) {
  		currentMonth.month=-1;
	}
	if(currentMonth.month===0){
		currentYear.year+=1;
		currentYears.innerHTML=currentYear.year;
	}
}
/*activate let arrow and decease year*/
function goLeft(currentMonth,currentYear) {
	if (currentMonth.month <= months.length && currentMonth.month > 0) {
    	currentMonth.month-=1;
    	currentMonths.innerHTML = months[currentMonth.month];
	}
	if (currentMonth.month === 0) {
  		currentMonth.month=12;
	}
	if(currentMonth.month===11){
		currentYear.year-=1;
		currentYears.innerHTML=currentYear.year;
	}	
}
/*drop down menu*/
/*toggle class to show drop down menu*/
function dropDown(){
	document.getElementById("drop-down").classList.toggle("show");
}
/*hide drop down menu when click where else*/
window.onclick=function(event){
	if(!event.target.matches('.arrow-down')){
		var dropDownLists = document.getElementsByClassName("drop-down");
		var i;
		for (i=0;i<dropDownLists.length;i++){
			var openDropDown=dropDownLists[i];
			if(openDropDown.classList.contains("show")){
				openDropDown.classList.remove("show");
			}
		}
	}
};
