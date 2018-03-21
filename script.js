var Second = {
	value : 30, 
	circumference : 2 * Math.PI * d3.select("#secondsCircle").attr("r"),
	stepLength : 2 * Math.PI * d3.select("#secondsCircle").attr("r") / 60
}

var Minute = {
	value : 17,
	circumference : 2 * Math.PI * d3.select("#minutesCircle").attr("r"),
	stepLength : 2 * Math.PI * d3.select("#minutesCircle").attr("r") / 60
}

var Hour = {
	value : 4,
	circumference : 2 * Math.PI * d3.select("#hoursCircle").attr("r"),
	stepLength : 2 * Math.PI * d3.select("#hoursCircle").attr("r") / 24
}

var Time = {
	Second : Second,
	Minute : Minute,
	Hour : Hour,
	updateSecondMinuteHour : function(second, minute, hour){
		this.Second.value = second;
		this.Minute.value = minute;
		this.Hour.value = hour;
	},
	updateSeconds : function(){
		this.Second.value--;
		if(this.Second.value == 0) { this.Second.value = 60; this.minutePassed(); }
		d3.select("#secondsCircle").transition().duration(1000).attr("stroke-dashoffset", Number(this.Second.circumference) - Number(this.Second.value * this.Second.stepLength));
	},
	minutePassed : function(){
		this.subtractMinutes();
	},
	subtractMinutes : function(){
		if(this.Minute.value > 0) { this.Minute.value = this.Minute.value - 1; } else { this.Minute.value = 60; this.subtractHours(); }
		Interface.calculateAndSetStrokeValues(this.Second.value, this.Minute.value, this.Hour.value);
	},
	subtractHours : function(){
		if(this.Hour.value > 0) { this.Hour.value = this.Hour.value - 1; } else { this.countdownFinished(); }
		Interface.calculateAndSetStrokeValues(this.Second.value, this.Minute.value, this.Hour.value);
	},
	countdownFinished : function (){
		alert("Countdown finished");
	}
}

var Interface = {
	setStrokeDasharrays : function(seconds, minutes, hours){
		d3.select("#secondsCircle").attr("stroke-dasharray", seconds);
		d3.select("#minutesCircle").attr("stroke-dasharray", minutes);
		d3.select("#hoursCircle").attr("stroke-dasharray", hours);
	},
	setStrokeDashoffsets : function(seconds, minutes, hours){
		d3.select("#secondsCircle").transition().duration(2000).attr("stroke-dashoffset", seconds);
		d3.select("#minutesCircle").transition().duration(2000).attr("stroke-dashoffset", minutes);
		d3.select("#hoursCircle").transition().duration(2000).attr("stroke-dashoffset", hours);
	},
	calculateAndSetStrokeValues : function(second, minute, hour){
		Time.updateSecondMinuteHour(second, minute, hour);
		seconds = Number(Second.circumference) - Number(Time.Second.value * Second.stepLength);
		minutes = Number(Minute.circumference) - Number(Time.Minute.value * Minute.stepLength);
		hours = Number(Hour.circumference) - Number(Time.Hour.value * Hour.stepLength);
		this.setStrokeDashoffsets(seconds, minutes, hours);
	}
}

Interface.setStrokeDasharrays(Second.circumference, Minute.circumference, Hour.circumference);
Interface.calculateAndSetStrokeValues(Time.Second.value, Time.Minute.value, Time.Hour.value);

setInterval(function (){
	Time.updateSeconds();
}, 1000);