// Global Variables
var secondsCircumference = 2 * Math.PI * d3.select("#secondsCircle").attr("r");
var secondsStepLength = secondsCircumference / 60;
var minutesCircumference = 2 * Math.PI * d3.select("#minutesCircle").attr("r");
var minutesStepLength = minutesCircumference / 60;
var hoursCircumference = 2 * Math.PI * d3.select("#hoursCircle").attr("r");
var hoursStepLength = hoursCircumference / 24;
var Second = 30, Minute = 17, Hour = 4;

// Major, Caller Functions
setStrokeDasharrays(secondsCircumference, minutesCircumference, hoursCircumference);
calculateAndSetStrokeValues(Second, Minute, Hour);

setInterval(function (){
	updateSeconds();
}, 1000);

// Helper, Called Functions
function updateSeconds(){
	Second--;
	if(Second == 0) { Second = 60; minutePassed(); }
	d3.select("#secondsCircle").transition().duration(1000).attr("stroke-dashoffset", Number(secondsCircumference) - Number(Second * secondsStepLength));
}

function calculateAndSetStrokeValues(second, minute, hour){
	updateGlobalSecondMinuteHour(second, minute, hour);
	seconds = Number(secondsCircumference) - Number(Second * secondsStepLength);
	minutes = Number(minutesCircumference) - Number(Minute * minutesStepLength);
	hours = Number(hoursCircumference) - Number(Hour * hoursStepLength);
	setStrokeDashoffsets(seconds, minutes, hours);
}

function updateGlobalSecondMinuteHour(second, minute, hour){
	Second = second;
	Minute = minute;
	Hour = hour;
}

function setStrokeDashoffsets(seconds, minutes, hours){
	d3.select("#secondsCircle").transition().duration(2000).attr("stroke-dashoffset", seconds);
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
	if(Minute > 0) { Minute = Minute - 1; } else { Minute = 60; subtractHours(); }
	calculateAndSetStrokeValues(Second, Minute, Hour);
}

function subtractHours(){
	if(Hour > 0) { Hour = Hour - 1; } else { countdownFinished(); }
	calculateAndSetStrokeValues(Second, Minute, Hour);
}

function countdownFinished(){
	alert("Countdown finished");
}