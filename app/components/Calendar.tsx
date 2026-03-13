"use client";
import { useEffect, useState } from "react";



type CalendarEvent = {
    id: string;
    summary: string;
    description: string;

    // add the time 
    start: {
        dateTime: string;
        date: string;
    }
    end: {
        dateTime: string;
        date: string;
    }

}


type CalendarResponse = {
    items: CalendarEvent[];
}

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
    const [showModal, setShowModal] = useState(false);


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




    const currDate = new Date(); // Current date and time
    const currMonth = currDate.getMonth(); // 0-11
    // console.log(`The current date is: ${currDate}`)
    // console.log(`The month is ${months[currMonth]}`);

    const lastOfMonth = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0);

    // console.log(`The last day of the month of ${months[currDate.getMonth()]} is ${lastOfMonth}`);
    // console.log(`The index of the last weekday of the month is: ${lastOfMonth.getDay()} and that weekday is ${weekDays[lastOfMonth.getDay()]}`);


    // This is the first day of april
    const firstOfMonth = new Date(currDate.getFullYear(), currDate.getMonth(), 1);

    // console.log(`The first day of the month of ${months[currMonth]} is ${firstOfMonth}`);
    // console.log(`The index of the first weekday of the month is ${firstOfMonth.getDay()} and that weekday is ${weekDays[firstOfMonth.getDay()]}`);

    const totalDays = lastOfMonth.getDate();
    // console.log(`For the month of ${months[currDate.getMonth()]}, there are a total of ${totalDays} days`);


    function Modal() {
        return (
            <div>
                <h1> Modal </h1>
                <p> hi </p>
            </div>
        )
    }

    // For creating the calendar 
    const calendarCells = []

    for (let i = 0; i < firstOfMonth.getDay(); i++) {
        calendarCells.push(null);
    }


    for (let i = 1; i < totalDays + 1; i++) {
        calendarCells.push(i);
    }

    console.log(`${calendarCells}`);

    // Creating an object where key is a number (day) and value is array of CalendarEvent objects
    const eventsPerDay: Record<number, CalendarEvent[]> = {};

    events.forEach((event) => {
        let eventDate : Date;
        
        // 24-hour event vs specified event length
        if (event.start.dateTime) {
            eventDate = new Date(event.start.dateTime);
        } else {
            eventDate = new Date(event.start.date);
        }

        const day = eventDate.getDate();

        // If this day doesn't exist yet in the object then initialize it with an empty array
        if (!eventsPerDay[day]) {
            eventsPerDay[day] = [];
        }

        // At that day, push the event object to the array
        eventsPerDay[day].push(event);
    })



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

                    {calendarCells.map((day, index) => {
                        if (day === null) {
                            return null;
                        }

                        const dayEvents = eventsPerDay[day] ?? []; // Returns either an event of 
                        const eventCount = dayEvents.length;
                        console.log(`On day ${day} there are a total of ${eventCount} events`)
                        
                        return (
                            <div className="border-t border-[#f2f2f7] border-b w-32 h-32" key={day}>
                                {day === new Date().getDate() ? ( // Circle current day (someone double check if this is properly aligned please!)
                                    <div className="w-7.5 h-7.5 bg-red-500 rounded-full ml-3 pl-1.25 pt-0.5 mt-1.5">
                                        <p className=" ">
                                            {day}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="ml-3 mt-2">{day}</p>
                                )}

                                {events.map((event) => {
                                    let eventDate: Date;

                                    if (event.start.dateTime) {
                                        eventDate = new Date(event.start.dateTime);
                                    } else {
                                        eventDate = new Date(event.start.date);
                                    }

                                    let time = eventDate.toLocaleTimeString("en-US");
                                    let TOD = time.slice(-2); // Time of day (AM/PM)
                                    // console.log(`The time is currently ${time}`);
                                    // console.log(`${time.length} is the length of the time string`);

                                    if (time.length == 10) { // 9:30:00 PM
                                        // console.log(`Time is: ${time.slice(0, 4)}`);
                                        // console.log(TOD);
                                        // console.log(`Formatted time is: ${time.slice(0,4)} ${TOD}`);
                                        time = time.slice(0, 4);
                                    }
                                    else { // 10:30:00 PM
                                        // console.log(`Time is: ${time.slice(0,5)}`);
                                        // console.log(TOD);
                                        // console.log(`Formatted time is: ${time.slice(0,5)} ${TOD}`)
                                        time = time.slice(0, 5);
                                    }


                                    if (eventDate.getDate() === day) {
                                        return (
                                            <button
                                                className="flex flex-row items-center mt-1 w-32 group focus:bg-[#E18181] rounded-sm h-4"
                                                // onClick={() => setShowModal(true)}
                                            >
                                                <div className="ml-1 w-2 h-2 shrink-0 bg-[#E18181] group-focus:bg-white rounded-full " />
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