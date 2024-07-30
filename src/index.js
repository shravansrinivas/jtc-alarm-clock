const AlarmClock = require('./models/AlarmClock.model');
const { parseTime, getDayOfWeek, isValidTime, fetchCurrentTime } = require('./utils/Time.utils');
const rl = require("./utils/ReadLine.utils");

const promptUser = () => {
    rl.question(`
================================================
⌚ Current time is: ${fetchCurrentTime()}
================================================
===========CHOOSE FROM BELOW OPTIONS============
================================================
1. Create an alarm
2. List all alarms
3. Show all active alarms [Alarms that are currently ringing!]
4. Snooze an alarm
5. Delete an alarm
6. Exit
================================================
================================================
Choose an option: `, (option) => {
        switch (option) {
            case '1':
                handleCreateAlarm();
                break;
            case '2':
                handleListAlarms();
                break;
            case '3':
                handleShowActiveAlarms();
                break;
            case '4':
                handleSnoozeAlarm();
                break;
            case '5':
                handleDeleteAlarm();
                break;
            case '6':
                console.log('See ya! Have a great day :)');
                rl.close();
                break;
            default:
                console.log('Invalid option:| Please try again!');
                promptUser();
                break;
        }
    });
};
const alarmClock = new AlarmClock(promptUser);  

const fetchDayOfWeek = (alarmTime, callback) => {
    rl.question('Enter day of week: ', (dayOfWeek) => {
        dayOfWeek = getDayOfWeek(dayOfWeek);
        if (!dayOfWeek) {
            console.log(`Invalid day of week. 
                        Please enter a valid day:
                        [For e.g.,
                            - Sunday is valid in either of the 3 formats: 0, Sun, Sunday
                            - Thursday is valid in either of the 3 formats: 4, Thu, Thursday
                            `);
            fetchDayOfWeek(alarmTime, callback);
            return;
        }

        const alertTime = parseTime(alarmTime); // Converting alarm time to a Date object
        alarmClock.createAlarm(alarmTime, dayOfWeek, alertTime);

        alarmClock.checkAlarms();
        callback();
    });
};

const fetchAlarmDetails = (callback) => {
    rl.question('Enter alarm time (HH:MM): ', (alarmTime) => {
        if (!isValidTime(alarmTime)) {
            console.log('Invalid time format. Please enter time in HH:MM format.');
            fetchAlarmDetails(callback);
            return; 
        }

        fetchDayOfWeek(alarmTime, callback);
    });
};

const handleCreateAlarm = () => {
    fetchAlarmDetails(promptUser);
};

const handleListAlarms = () => {
    alarmClock.listAllAlarms();
    promptUser();
};

const handleShowActiveAlarms = () => {
    const ringingAlarms = alarmClock.fetchRingingAlarms();
    if (ringingAlarms.length) {
        ringingAlarms.forEach((alarm, index) => {
            console.log(`Alarm ${index + 1}: ${alarm.dayOfWeek} at ${alarm.alarmTime} --- alerting at ${alarm.alertTime.toLocaleTimeString()}`);
        });
    } else {
        console.log('There are no alarms ringing currently!');
    }
    promptUser();
};

const handleSnoozeAlarm = () => {
    const ringingAlarms = alarmClock.fetchRingingAlarms();
    if (ringingAlarms.length > 0) {
        console.log('These alarms are currently ringing!');
        ringingAlarms.forEach((alarm, index) => {
            console.log(`Alarm ${index + 1}: ${alarm.dayOfWeek} at ${alarm.alarmTime} --- alerting at ${alarm.alertTime.toLocaleTimeString()}`);
        });
        rl.question('Enter alarm index to snooze: ', (index) => {
            const alarmIndex = parseInt(index, 10) - 1;
            if (alarmIndex < ringingAlarms.length && alarmIndex >= 0) {
                ringingAlarms[alarmIndex].snooze();
                promptUser();
            } else {
                console.log('Invalid alarm index.');
                promptUser();
            }
        });
    } else {
        console.log('Currently there are no alarms ringing that can be snoozed! Please try later!');
        promptUser();

    }
};

const handleDeleteAlarm = () => {
    alarmClock.listAllAlarms();
    if (alarmClock.alarms.length > 0) {
        rl.question('Enter alarm index(1-based index) to delete: ', (index) => {
            const alarmIndex = parseInt(index, 10) - 1;
            rl.question('Are you sure you want to delete this alarm? [y/N]', (ans) => { 
                if (ans.toLowerCase() === 'y') {
                    alarmClock.deleteAlarm(alarmIndex);
                    promptUser();                    
                }
                else {
                    console.log('Deletion canceled!')
                    promptUser();
                }
            });
        });
    } else {
        console.log('No alarms to delete.');
        promptUser();
    }
};



const startCheckingAlarms = () => {
    const calculateDelayToNextMinute = () => {
        const now = new Date();
        const millisecondsUntilNextSecond = 60000 - now.getSeconds() + 1000;
        return millisecondsUntilNextSecond;
    };
    const delayToNextSecond = calculateDelayToNextMinute();

    // Check alarms initially
    alarmClock.checkAlarms();

    // Set a timeout to align with the next second
    setTimeout(() => {
        setInterval(() => {
            alarmClock.checkAlarms();
        }, 60000); // Check every minute
    }, delayToNextSecond);
};


const greetUser = () => {
    console.log(`================================================
================================================
Hello there👋 This is an alarm clock CLI utility!`);
}


// main function flow

greetUser();
promptUser();
startCheckingAlarms();

