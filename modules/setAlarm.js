//import necessary variable & function from modules
import {update as getCurrentTime} from "./currentTIme.js";
export let alarmArr = [];

//Get all elements from document
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const amPm = document.querySelector("#am-pm");
const alarmList = document.querySelector('.alarmList');
const setButton = document.querySelector('#alarmButton');

//Populate set timer
window.addEventListener("DOMContentLoaded", (event) => {
  
  populateDownMenu(1, 12, hours);
 
  populateDownMenu(0, 59, minutes);

  populateDownMenu(0, 59, seconds);
  
  //This is to get previously set alarms from local storage
  fetchAlarm();
});

//populate drop down
function populateDownMenu(start, end, element) {
  for (let i = start; i <= end; i++) {
    const dropDown = document.createElement("option");
    dropDown.value = i < 10 ? "0" + i : i;
    dropDown.innerHTML = i < 10 ? "0" + i : i;
    element.appendChild(dropDown);
  }
}

//Event for creating an alarm
setButton.addEventListener('click', function() {
  //Set Alarm time
  const alarmTime = new Date();
  alarmTime.setHours(hours.value);
  alarmTime.setMinutes(minutes.value);
  alarmTime.setSeconds(seconds.value);

  const time = `${parseInt(hours.value)}:${minutes.value}:${seconds.value} ${amPm.value}`;

  alarmArr = checkAlarams();

  alarmArr.push(time);

  //update local storage
  localStorage.setItem("alarms", JSON.stringify(alarmArr));

  //Create an interval
  const createInterval = setAlarm(time);

  loadAlarms(createInterval);
});

//Create an interval for each alarm
export function setAlarm(time) {
  const alarmInterval = setInterval(() => {
    if (time === getCurrentTime()) {
      alert(`Wake up, it's ${time}`);
    }
  }, 500);
  return alarmInterval;
}

//For reset
export function fetchAlarm() {
  alarmArr = checkAlarams();
  alarmArr.forEach((time) => {
    setAlarm(time);
  });
  loadAlarms();
}

//load alarms
function loadAlarms(createInterval) {

  alarmList.innerHTML = '';

  for(let element of alarmArr) {

    //create a div to horizontally align items
    const alarmDiv = document.createElement('div');
    alarmDiv.className = 'alarmDiv';
    alarmDiv.style.display = 'flex';
    alarmDiv.style.flexDirection = 'row';
    alarmDiv.style.justifyContent = 'center';
    alarmDiv.style.gap = '10px';

    const alarmCell = createElementBtn('alarmCell');
    alarmCell.textContent = element;

    const deleteButton = createElementBtn('deleteBtn');
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', function() {
      removeAlarm(element, createInterval);
    });

    alarmDiv.appendChild(alarmCell);
    alarmDiv.appendChild(deleteButton);
  
    alarmList.prepend(alarmDiv);
  }
}

//Delete Alarm
function removeAlarm(alarm, alarmInterval) {
  
  clearInterval(alarmInterval);

  console.log(`Deleted Alarm:  ${alarm}`);

  for(let i = 0; i < alarmArr.length; i++) {
    if(alarmArr[i] === alarm) {
      alarmArr.splice(i,1);
      localStorage.setItem("alarms", JSON.stringify(alarmArr));
      loadAlarms();
      fetchAlarm();
      break;
    }
  }
}

//Create alarm and delete buttons
function createElementBtn(className) {
  const alarmCell = document.createElement('button');
  alarmCell.className = className;
  alarmCell.style.width = '200px';
  alarmCell.style.height = '40px';
  alarmCell.style.marginTop = '10px';

  return alarmCell;
}

//Save alarms to local storage for caching
function checkAlarams() {
  let alarms = [];
  const isPresent = localStorage.getItem("alarms");
  if (isPresent) alarms = JSON.parse(isPresent);

  return alarms;
}
