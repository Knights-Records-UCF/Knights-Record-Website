"use client";
import { useEffect, useState } from "react";

const months = [
    "January", // 0 
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December", // 11
]

const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
]

export default function Calendar() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    useEffect(() => {
        async function fetchCalendar() {
            try {

                setLoading(true);
                setError(null);

                const res = await fetch("/api/calendar");

                if (!res.ok) {
                    throw new Error("Failed to fetch calendar");
                }

                const data: CalendarResponse = await res.json();

                // console.log("Entire calendar json", data)

                // console.log("single event", data.items[0]);

                const GClength = data.items.length;

                console.log(GClength); // 5

                console.log("++++++++++++++++++++++++++++++++++++++");
                dateTesting(GClength, data, currDate);



                // 

                // dateTesting(GClength, data, currDate);
                setEvents(data.items);
            }
            catch (error) {
                console.error("Failed to fetch calendar", error);
                setError("Failed to fetch calendar");
            }
            finally {
                setLoading(false);
            }
        }

        fetchCalendar();

    }, []);

    // Just outputs the events, and whether they are in the past or future compared to the current date
    function dateTesting(length: number, data: CalendarResponse, currDate: Date) {
        for (let i = 0; i < length; i++) {
            let GCDate: Date;
            let GCDateDay: number;
            // output date and datetime
            // Date corresponds to a full day event
            // Datetime corresponds to the specific time
            if (data.items[i].start.dateTime) {

                console.log(`Datetime of event ${i} which is ${data.items[i].summary}: ${data.items[i].start.dateTime}`);


                GCDate = new Date(data.items[i].start.dateTime);
                console.log(`DateTime object: ${GCDate}`);

                GCDateDay = GCDate.getDate();
                console.log(`The day of the month of the event, ${data.items[i].summary} is ${GCDateDay}`);

            }
            else {

                console.log(`This is a full day event (${i}) "${data.items[i].summary}" and the date is ${data.items[i].start.date}`);

                GCDate = new Date(data.items[i].start.date);
                console.log(`Date object: ${GCDate}`);


                GCDateDay = GCDate.getDate();
                console.log(`The day of the month of the event, ${data.items[i].summary} is ${GCDateDay}`);
            }

            console.log(`${GCDate > currDate}`); // Outputs true if date is in future, otherwise false

        }
    }


    console.log("--------------------------------------");
    const currDate = new Date( ); // Current date and time
    const currMonth = currDate.getMonth(); // 0-11
    console.log(`The current date is: ${currDate}`)
    console.log(`The month is ${months[currMonth]}`);

    const lastOfMonth = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0);

    console.log(`The last day of the month of ${months[currDate.getMonth()]} is ${lastOfMonth}`);
    console.log(`The index of the last weekday of the month is: ${lastOfMonth.getDay()} and that weekday is ${weekDays[lastOfMonth.getDay()]}`);


    // This is the first day of april
    const firstOfMonth = new Date(currDate.getFullYear(), currDate.getMonth(), 1);

    console.log(`The first day of the month of ${months[currMonth]} is ${firstOfMonth}`);
    console.log(`The index of the first weekday of the month is ${firstOfMonth.getDay()} and that weekday is ${weekDays[firstOfMonth.getDay()]}`);

    const totalDays = lastOfMonth.getDate();
    console.log(`For the month of ${months[currDate.getMonth()]}, there are a total of ${totalDays} days`);




    // For creating the calendar 
    const calendarCells = []

    for (let i = 0; i < firstOfMonth.getDay(); i++) {
        calendarCells.push(null);
    }


    for (let i = 1; i < totalDays + 1; i++) {
        calendarCells.push(i);
    }

    console.log(`${calendarCells}`);

    


    return (
        <div className="border-2 border-[#D0D0D0]">

            {/* Make a skeleton loader at some point for cleaner animations later */}
            {loading && (<p> loading </p>)}
            {!loading && (
                // Calendar grid, DONT WORRY ABOUT MULTIPLE CHILDREN W/ THE SAME NULL KEY FOR NOW THIS DONT MATTER 
                <div className="grid grid-cols-7 mt-2">
                    {weekDays.map((day) => (
                        <h2 key={day} className="text-lg ml-2 text-[#858585]">{day}</h2>
                    ))}
                    {calendarCells.map((day) => {
                        // if (day == new Date().getDay())
                        return (
                            <div className="border-t border-[#f2f2f7] border-b w-32 h-32" key={day}>
                                <p className="ml-3 mt-2 ">{day} </p>
                                {events.map((event) => {
                                    let eventDate: Date;
                                    if (event.start.dateTime) {
                                        eventDate = new Date(event.start.dateTime);
                                    } else {
                                        eventDate = new Date(event.start.date);
                                    }

                                    let time = eventDate.toLocaleTimeString("en-US");
                                    let TOD = time.slice(-2); // Time of day (AM/PM)
                                    console.log(`The time is currently ${time}`);
                                    console.log(`${time.length} is the length of the time string`);

                                    if (time.length == 10) { // 9:30:00 PM
                                        console.log(`Time is: ${time.slice(0, 4)}`);
                                        console.log(TOD);
                                        console.log(`Formatted time is: ${time.slice(0,4)} ${TOD}`);
                                        time = time.slice(0,4);
                                    }
                                    else { // 10:30:00 PM
                                        console.log(`Time is: ${time.slice(0,5)}`);
                                        console.log(TOD);
                                        console.log(`Formatted time is: ${time.slice(0,5)} ${TOD}`)
                                        time = time.slice(0,5);
                                    }
                                    

                                    if (eventDate.getDate() === day) {
                                        return (
                                            <button 
                                                className="flex flex-row items-center mt-1 w-32 group focus:bg-[#E18181] rounded-sm h-4"
                                            >
                                                 <div className="ml-1 w-2 h-2 shrink-0 bg-[#E18181] group-focus:bg-white rounded-full "/>
                                                 <p className="text-left pl-1 text-xs line-clamp-1">{event.summary} <span className="text-[9px] text-[#858585] group-focus:text-black ml-6">{time} {TOD}</span></p>
                                            </button>
                                        );
                                    }
                                })}
                            </div>
                        );
                    })}

                </div>

            )}
        </div>
    )
}