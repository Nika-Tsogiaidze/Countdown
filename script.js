// Global Variables
var secondsCircumference = 2 * Math.PI * d3.select("#secondsCircle").attr("r");
var secondsStepLength = secondsCircumference / 60;
var minutesCircumference = 2 * Math.PI * d3.select("#minutesCircle").attr("r");
var minutesStepLength = minutesCircumference / 60;
var hoursCircumference = 2 * Math.PI * d3.select("#hoursCircle").attr("r");
var hoursStepLength = hoursCircumference / 24;
var second = 30, minute = 17, hour = 4;

// Major, Caller Functions
setStrokeDasharrays(secondsCircumference, minutesCircumference, hoursCircumference);
calculateAndSetStrokeValues(second, minute, hour);

setInterval(function (){
	updateSeconds();
}, 1000);

// Helper, Called Functions
function updateSeconds(){
	second--;
	if(second == 0) { second = 60; minutePassed(); }
	d3.select("#secondsCircle").transition().duration(1000).attr("stroke-dashoffset", Number(secondsCircumference) - Number(second * secondsStepLength));
}

function calculateAndSetStrokeValues(second, minute, hour){
	seconds = Number(secondsCircumference) - Number(second * secondsStepLength);
	minutes = Number(minutesCircumference) - Number(minute * minutesStepLength);
	hours = Number(hoursCircumference) - Number(hour * hoursStepLength);
	setStrokeDashoffsets(seconds, minutes, hours);
}

function setStrokeDashoffsets(seconds, minutes, hours){
	d3.select("#secondsCircle").attr("stroke-dashoffset", seconds);
	d3.select("#minutesCircle").transition().duration(2000).attr("stroke-dashoffset", minutes);
	d3.select("#hoursCircle").transition().duration(2000).attr("stroke-dashoffset", hours);
}

function setStrokeDasharrays(seconds, minutes, hours){
	d3.select("#secondsCircle").attr("stroke-dasharray", seconds);
	d3.select("#minutesCircle").attr("stroke-dasharray", minutes);
	d3.select("#hoursCircle").attr("stroke-dasharray", hours);
}

function minutePassed(){
	subtractMinutes();
}

function subtractMinutes(){
	if(minute > 0) { minute = minute - 1; } else { minute = 60; subtractHours(); }
	calculateAndSetStrokeValues(second, minute, hour);
}

function subtractHours(){
	if(hour > 0) { hour = hour - 1; } else { countdownFinished(); }
	calculateAndSetStrokeValues(second, minute, hour);
}

function countdownFinished(){
	alert("Countdown finished");
}