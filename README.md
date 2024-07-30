## Alarm Clock CLI Utility

This is a Command-Line Interface (CLI) utility for managing alarms. It allows users to set, view, snooze, and delete alarms. The application runs in a terminal and uses a simple text-based menu system to interact with the user.

Original requirements are mentioned here - [Requirements.md](/Requirements.md)

#### Features:

    Create an Alarm: Set alarms for specific times and days of the week.
    List All Alarms: View all set alarms.
    Show Active Alarms: Display alarms that are currently ringing.
    Snooze an Alarm: Delay the alarm by a specified amount of time.
    Delete an Alarm: Remove alarms by index.
    Customizable: Provides a prompt-based interface for user interaction.

#### Setup Instructions
1. ``` git clone https://github.com/shravansrinivas/jtc-alarm-clock.git```
2. ``` cd jtc-alarm-clock ```

3. Install Dependencies:
    ```npm install``` or ```yarn install```

4. Run the Application:
Start the CLI utility by running:
    ```npm start``` or ```yarn start``` or ```node src/index.js```

#### Usage

    Start the CLI Utility: After running node index.js, you'll be greeted with a menu:
        1. Create an Alarm: Follow the prompts to set a new alarm.
        2. List All Alarms: View all alarms.
        3. Show All Active Alarms: See currently ringing alarms.
        4. Snooze an Alarm: Snooze a ringing alarm.
        5. Delete an Alarm: Remove an alarm by index.
        6. Exit: Close the utility.

#### Possible Improvements
   1. Enhanced User Interaction: Improve the user interface with clearer instructions and validation. *[Currently there are basic validations in place]*
   2. Time Zones and Localization: Support different time zones and localize the interface for various languages.
   3.  Graphical User Interface (GUI): Develop a GUI version for a more user-friendly experience.
   4.  Persistent Storage: Implement a database or file-based storage to save alarms across sessions.
   5. Notification System: sound alerts for alarms.

