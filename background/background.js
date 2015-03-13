// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
  Displays a notification with the current time. Requires "notifications"
  permission in the manifest file (or calling
  "Notification.requestPermission" beforehand).
*/
function getRobot(){
	if(localStorage.Robot == "Androider" || localStorage.Robot == null){
		localStorage.Robot = "Aider";
		localStorage.RobotImage = "/../images/Robot.png";
	}else if(localStorage.Robot == "Aider"){
		localStorage.Robot = "Zun";
		localStorage.RobotImage = "/../images/Robot1.png";
	}else {
		localStorage.Robot = "Androider";
		localStorage.RobotImage = "/../images/Robot2.png";
	}

	return localStorage.RobotImage;
}

function getSpeak(){
	var nNumber = Math.floor((Math.random() * 4) + 1);
	var sMessage = "";

	switch(nNumber) {
	    case 1:
	        sMessage = "Time to brake! What's up?";
	        break;
	    case 2:
	        sMessage = "Your break time! You should get some fresh water!";
	        break;
	    case 3:
	        sMessage = "Hey! Are you working on the same project?";
	        break;
	    case 4:
	        sMessage = "I think is time to get some coffee! Let's go?";
	        break;
	    default:
	        sMessage = "I don't know what's happen! Don't worry! Take a break!";
	}

	localStorage.RobotMessage = sMessage;
	return localStorage.RobotMessage;
}


function show() {
  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  var vTime = hour + time[2] + ' ' + period;

  localStorage.LastTimeWarned = vTime;

  new Notification(vTime, {
    icon: getRobot(),
    body: localStorage.Robot +": " + getSpeak()
  });
}


// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.frequency = 1;        // The display frequency, in minutes.
  localStorage.isInitialized = true; // The option initialization.
}


	// Test for notification support.
if (window.Notification) {
  // While activated, show notifications at the display frequency.
  if (JSON.parse(localStorage.isActivated)) { 
  	show(); 
  }

  var interval = 0; // The display interval, in minutes.

  setInterval(function() {
	interval++;

	if (JSON.parse(localStorage.isActivated) &&
		localStorage.frequency <= interval) {
	  show();
	  interval = 0;
	}
  }, 60000);
}

