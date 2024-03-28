//Common function to show current time
export function update() {
  const currentDate = new Date();

  const currentTime = currentDate.toLocaleTimeString();

  const timeDiv = document.getElementsByClassName('currentTime')[0];

  timeDiv.textContent = currentTime;

  return currentTime;
}

//call the function every 1 sec
setInterval(update, 1000);