const originDate = new Date(1609718400000);

const eventNames = ["Piggy Piggy", "JQR", "Money Money", "Bingo", "Ola Ola"];

const eventHourMarks = {'cst': [1, 5, 9, 13, 17, 21], 'est': [2, 6, 10, 14, 18, 22], 'pst' : [3, 7, 11, 15, 19, 23]};

const eventHourMarksStrings = {
   'cst' : ['1:00 am', '5:00 am', '9:00 am', '1:00 pm', '5:00 pm', '9:00 pm'],
   'est': ['2:00 am', '6:00 am', '10:00 am', '2:00 pm', '6:00 pm', '10:00 pm'],
   'pst' : ['3:00 am', '7:00 am', '11:00 am', '3:00 pm', '7:00 pm', "11:00 pm"],
};

const eventCycles = 
   {
      'cst' : [[4,0,1,2,3,4],
      [1,1,2,3,4,1],
      [2,2,3,4,1,2],
      [3,3,4,1,2,3],
      [0,4,1,2,3,0],
      [1,1,2,3,0,1],
      [2,2,3,0,1,2],
      [3,3,0,1,2,3]]
   ,
      'est' : [[4,0,1,2,3,4],
         [1,1,2,3,4,1],
         [2,2,3,4,1,2],
         [3,3,4,1,2,3],
         [0,4,1,2,3,0],
         [1,1,2,3,0,1],
         [2,2,3,0,1,2],
         [3,3,0,1,2,3]]
   ,
      'pst' : [[0,1,2,3,4,1],
         [1,2,3,4,1,2],
         [2,3,4,1,2,3],
         [3,4,1,2,3,0],
         [4,1,2,3,0,1],
         [1,2,3,0,1,2],
         [2,3,0,1,2,3],
         [3,0,1,2,3,4]]
};

const timezoneOffsets = { 'cst': -360, 'est' : -300, 'pst' : -480};

/**
 * Calculates number of days between two Date objects
 * @param {*} startDate 
 * @param {*} endDate 
 */
function daysBetween(startDate, endDate) {
   var timeDiff = endDate.getTime() - startDate.getTime(); 
   var dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); 
   console.log(timeDiff/(1000*3600*24));
   return dayDiff;
}

/**
 * returns next upcoming event 
 */
function getEvent(){
   try{
      let currentUTCDate = new Date();
      let currentHour = currentUTCDate.getHours();
      let currentMinute = currentUTCDate.getMinutes();
      let timezoneOffset = currentUTCDate.getTimezoneOffset();
      let timezone = '';
      for (const [key, value] of Object.entries(timezoneOffsets)) {
         if ((-1 * value) === timezoneOffset) {
            timezone = key;
            break;
         }
      }
      if (timezone == '') {
         currentHour = currentHour + 19 % 24;
         timezone = 'est';
      }
   
      const offset = timezoneOffsets[timezone];
      const currentDate = new Date(currentUTCDate.getTime() + offset*60*1000);
   
      /* 
      *  Get indices for current event
      *  events happen on 3, 7, 11, 15, 19, 23 hour marks
      *  event cycles repeat every 8 weekdays 
      */
      const eventCycleIndex = daysBetween(originDate, currentDate) % 8;
   
      const eventHourIndex = Math.floor(currentHour / 4); 
   
      let hourETA = -1;
      let wrapNextDay = false;
   
      for (hourMark of eventHourMarks[timezone]) {
         if (hourMark - currentHour >= 0) {
            hourETA = (hourMark - currentHour);
            break;
         }
      }
   
      //Wrap to next day
      if(hourETA < 0) {
         hourETA = ((eventHourMarks[timezone][0] + 24) - currentHour);
         wrapNextDay = true;
      }
   
      const eventCycle = (eventCycles[timezone])[eventCycleIndex + (wrapNextDay ? 1 : 0)];
      const nextEvent = eventNames[eventCycle[wrapNextDay ? 0 : eventHourIndex]];
   
      const minuteETA = 60 - currentMinute; 
      const hourConditional = (hourETA - 1 + (minuteETA == 60));
      let notification = "";
   
      if (hourETA == 0) {
         notification += `${nextEvent} is happening right now!\n\nIt's been ${currentMinute} minutes since it started!`;
      } else {
         notification += "\nThere doesn't seem to be an event going on right now.\n\n";
         notification += `${nextEvent} is happening in ${hourConditional ? `${hourConditional} hour(s) and ` : ``}${minuteETA % 60} minutes`;
      }
   
      return notification;
   } catch (error){
      return error;
   }
}

function getEventSchedule(timezone) {
   try{
      let debug = true;
      let currentUTCDate = new Date();
   
      let currentHour = currentUTCDate.getHours();
      let timezoneOffset = currentUTCDate.getTimezoneOffset();
      let hostTimezone = '';
      for (const [key, value] of Object.entries(timezoneOffsets)) {
         if ((-1 * value) === timezoneOffset) {
            hostTimezone = key;
            break;
         }
      }
   
      let wrapNextDay = false;
   
      if (hostTimezone == '') {
         currentHour = (currentHour + (24 + (timezoneOffsets[timezone] / 60))) % 24;
      } else {
         currentHour = (currentHour + (24 + (-1 * timezoneOffsets[hostTimezone] / 60) + (timezoneOffsets[timezone] / 60))) % 24;
      }
   
   
      let hourETA = -1;
   
      for (hourMark of eventHourMarks[timezone]) {
         if (hourMark - currentHour >= 0) {
            hourETA = (hourMark - currentHour);
            break;
         }
      }
   
      //Wrap to next day
      if(hourETA < 0) {
         wrapNextDay = true;
      }
   
      const offset = timezoneOffsets[timezone];
      const currentDate = new Date(currentUTCDate.getTime() + offset*60*1000);
      let eventCycleIndex = ((daysBetween(originDate, currentDate) + (wrapNextDay ? 1 : 0)) % 8);
      const eventCycle = (eventCycles[timezone])[eventCycleIndex];
      const eventCycleNames = eventCycle.map(eventIndex => eventNames[eventIndex]);
      let schedule = wrapNextDay ? `Looks like all of the events have ended for today (${timezone}).  Here is tomorrows schedule:\n\n` : `Here is the event schedule for today(${timezone}):\n\n`;
      for (let i = 0; i < 6; i ++){
         schedule += `${(eventHourMarksStrings[timezone])[i]} : ${eventCycleNames[i]}\n`;
      }
   
      if (debug) {
         schedule += `\nDEBUGMODE: \ncurrentHour: ${currentHour}\neventCycleIndex: ${eventCycleIndex}\n`;
      }
      return schedule;
   } catch (error){
      return error;
   }
}

module.exports = { getEvent, getEventSchedule };