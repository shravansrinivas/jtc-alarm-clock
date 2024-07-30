/**
 * this file consists of essential utility functions
 * that perform time processing
 */

const fetchCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString();
}

const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(Number(hours), Number(minutes), 0, 0);
    return date;
};

const getformattedTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

const getDayOfWeek = (dayOfWeek) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (days.includes(dayOfWeek)) {
        return dayOfWeek;
    }
    if (typeof dayOfWeek === 'number' || dayOfWeek.length === 1) {
        return days[dayOfWeek] || false;
    }
    else {
        const dayMap = {
            "sun": "Sunday",
            "mon": "Monday",
            "tue": "Tuesday",
            "wed": "Wednesday",
            "thu": "Thursday",
            "fri": "Friday",
            "sat": "Saturday",
        }
        return dayMap[dayOfWeek.toLowerCase()] || false;
    }

    
};

const isTimeToAlert = (alertTime) => {
    const now = new Date();
    return now.getHours() === alertTime.getHours() && now.getMinutes() === alertTime.getMinutes();
};

const isValidTime = (timeString) => {
    // Check if the timeString matches the 24-hour "HH:MM" format
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(timeString);
}



module.exports = {
    isValidTime,
    fetchCurrentTime,
    parseTime,
    getformattedTime,
    getDayOfWeek,
    isTimeToAlert
};
