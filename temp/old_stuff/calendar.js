window.onload = function scroll(){
	months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
	var currentMonth = {month:2};
	currentMonths = document.getElementById("months");
	document.getElementById("left").addEventListener("click", function(){
    	goLeft(currentMonth);});
	document.getElementById("right").addEventListener("click", function(){
    goRight(currentMonth);});
	currentMonths.innerHTML = months[currentMonth.month];
};
function goRight(currentMonth) {
	if (currentMonth.month < months.length-1) {
    	currentMonth.month+=1;
    	currentMonths.innerHTML = months[currentMonth.month];
	} 
	if (currentMonth.month==months.length-1) {
  		currentMonth.month=-1;
	}
}
function goLeft(currentMonth) {
	if (currentMonth.month <= months.length && currentMonth.month > 0) {
    	currentMonth.month-=1;
    	currentMonths.innerHTML = months[currentMonth.month];
	}
	if (currentMonth.month === 0) {
  		currentMonth.month=12;
	}	
}