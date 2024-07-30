/**
 * this file consists (model/template)
 * of the alarm clock class
 * 
 * Used in main functionality
 */


const rl = require("../utils/ReadLine.utils");
const Alarm = require("./Alarm.model");



class AlarmClock {
    // creates an object that holds an array of all alarm objects
    constructor(promptUserCallback) {
        this.alarms = [];
        this.promptUserCallback = promptUserCallback;
    }

    // methods

    // 1. method to display current time in correct time format for the location
    displayCurrentTime() {
        const now = new Date();
        console.log(`Current Time is: ${now.toLocaleTimeString()}`);
    }

    // 2. method to create an alarm
    createAlarm(alarmTime, dayOfWeek, alertTime) {
        const alarm = new Alarm(alarmTime, dayOfWeek, alertTime);
        if (this.checkDuplicateAlarm(alarmTime, dayOfWeek, alertTime)) {
            console.log(`An alarm for ${dayOfWeek} at ${alarmTime} already exists.`);
            return;
        }

        this.alarms.push(alarm);
        this.sortAlarms(); // sort after adding a new alarm
        console.log(`Alarm set for ${dayOfWeek} at ${alarmTime} to alert at ${alertTime.toLocaleTimeString()}.`);
    }

    // 3. Method to list active alarms
    listAllAlarms() {
        if (this.alarms.length === 0) {
            console.log('Sorry, there are no alarms to list currently! Please add an alarm first to view/delete it!')
        } else {
            this.alarms.forEach((alarm, index) => {
                console.log(`Alarm ${index + 1}: ${alarm.dayOfWeek} at ${alarm.alarmTime} ${alarm.alarmAlert() ? '[🔔alerting now🔔]' : `to alert at ${alarm.alertTime.toLocaleTimeString()}`}`);
            });
        }
    }

    // 4. Method to delete an active alarm 
    deleteAlarm(alarmIndex) {
        if (alarmIndex < this.alarms.length && alarmIndex >= 0) {
            this.alarms.splice(alarmIndex, 1);
            console.log(`Alarm ${alarmIndex + 1} deleted.`);
        } else {
            console.log('Invalid alarm index.');
        }

    }
    // 5. Check if an alarm with the same parameters already exists
    checkDuplicateAlarm(alarmTime, dayOfWeek, alertTime) {
        return this.alarms.some(alarm =>
            alarm.alarmTime === alarmTime &&
            alarm.dayOfWeek === dayOfWeek &&
            alarm.alertTime.getTime() === alertTime.getTime()
        );
    }

    // 6. check ringing alarms
    fetchRingingAlarms() {
        return this.alarms.filter((alarm) => (alarm.alarmAlert()));
    }

    // 7. routine to keep if an alarm is alerting
    checkAlarms() {

        const ringingAlarms = this.fetchRingingAlarms();
        for (let i = 0; i < ringingAlarms.length; i++) {
            {
                let alarm = ringingAlarms[i];

                console.log('🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔')
                console.log(`${alarm.dayOfWeek}'s alarm at ${alarm.alarmTime} is now triggered and ringing⏲️!`);
                console.log('🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔')
                console.log(`What do you want to do?
                            1. Dismiss it 
                            2. Snooze it [Default option]
                                                    `)
                rl.question('Choose your option:', (answer) => {
                    if (answer === '1') {
                        alarm.dismissAlarm();
                        this.promptUserCallback();
                    } else {
                        alarm.snooze();
                        this.promptUserCallback();
                    }
                });
            }
        }
    }


    sortAlarms() {
        const now = new Date();
        const currentDay = now.getDay();

        this.alarms.sort((a, b) => {
            const dayDifferenceA = (a.dayOfWeek - currentDay + 7) % 7;
            const dayDifferenceB = (b.dayOfWeek - currentDay + 7) % 7;

            if (dayDifferenceA === dayDifferenceB) {
                return a.alertTime.getTime() - b.alertTime.getTime();
            }
            return dayDifferenceA - dayDifferenceB;
        });
    }

}

module.exports = AlarmClock;