/**
 * this file consists (model/template)
 * of a single alarm class
 * 
 * This template can be leveraged to handle an array
 * of all alarms in AlarmClock Class
 */ 

const { SNOOZE_LIMIT_COUNT, SNOOZE_INTERVAL } = require("../config");
const { getDayOfWeek, parseTime } = require("../utils/Time.utils");


class Alarm {

    // constructor class receives 3 params as stated in the requirement
    /**
     * 1. alarmTime (Alarm Time) This is the time of day when the alarm is set.
     * 2. dayOfWeek (Day of the Week) This indicates the specific day on which the alarm should alert. 
     * It could be any day from Sunday to Saturday.
     * 3. alertTime (Alert Time) This is the actual time when the alarm will alert you. 
     * It is usually set to the same as the alarm time 
     * but can be used for additional calculations in the implementation such as snoozes.
     */
    constructor(alarmTime, dayOfWeek, alertTime) {
        this.alarmTime = alarmTime;
        this.dayOfWeek = dayOfWeek;
        this.alertTime = alertTime || alarmTime; // default to alarmTime if it isn't specified

        this.snoozeCount = 0; // to validate snoozes
    }

    // methods
    
    // 1. to check whether the alert should turn ON now; returns boolean
    alarmAlert = () => {
        const now = new Date();
        if (now.getHours() === this.alertTime.getHours()
            && now.getMinutes() === this.alertTime.getMinutes()
            && this.dayOfWeek === getDayOfWeek(now.getDay())) {
            return true;
        }
        return false;
    }



    // 2. to snooze! 
    snooze() {
        // validate if it isn't snoozed more than 3 (SNOOZE_LIMIT_COUNT from config/index.js) times
        if (!this.alarmAlert()) {
            console.log("This alarm isn't currently ringing!");
            return;
        }
        if (this.snoozeCount < SNOOZE_LIMIT_COUNT) {
            this.alertTime.setMinutes(this.alertTime.getMinutes() + SNOOZE_INTERVAL);
            this.snoozeCount++;
            console.log(`Alarm snoozed for ${SNOOZE_INTERVAL} minutes.`);
        } else {
            console.log('Maximum snooze limit reached.');
        }
    }

    // 3. reset snooze when dismissed
    resetSnooze() {
        this.snoozeCount = 0;
    }

    // 4. Dismiss alarm
    dismissAlarm() {
        this.alertTime = parseTime(this.alarmTime); 
        this.resetSnooze();
        console.log('Alarm dismissed.'); 
    }
}

module.exports = Alarm;