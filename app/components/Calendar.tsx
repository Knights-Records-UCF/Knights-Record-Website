"use client";
import { useEffect, useState } from "react";

interface ModalProps {
    day: number;
    modalEvents: CalendarEvent[];
    onClose: () => void;
}

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
    "January",
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
    "December"
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
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

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
    const lastOfMonth = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0);
    const firstOfMonth = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
    const totalDays = lastOfMonth.getDate();

    function getTime(calEvent: CalendarEvent) {

        let eventDate: Date;

        if (calEvent.start.dateTime) {
            eventDate = new Date(calEvent.start.dateTime);
        } else {
            eventDate = new Date(calEvent.start.date);
        }

        let time = eventDate.toLocaleTimeString("en-US");
        let TOD = time.slice(-2);

        if (time.length == 10) {
            time = time.slice(0, 4);
        } else {
            time = time.slice(0, 5);
        }

        return `${time} ${TOD}`
    }

    function Modal({ modalEvents, onClose }: ModalProps) {
        return (
            <>
                <div
                    className="fixed inset-0 z-40"
                    onClick={onClose}
                />
                <div
                    className="h-[99.8px] w-[150.571px] bg-white rounded-xl border border-gray-100 absolute -inset-x-3 -inset-y-1 z-50 p-2 drop-shadow-2xl shadow-2xl inset-shadow-2xl overflow-y-auto no-scrollbar"
                    onClick={(e) => e.stopPropagation()}
                >
                    {modalEvents.map((CalendarEvent) => {
                        let time: string = getTime(CalendarEvent);

                        return (

                            <button
                                key={CalendarEvent.id}
                                className="flex flex-row items-center mt-1 w-32 group focus:bg-red-400 rounded-sm h-4 px-1"
                            >
                                <div className=" w-2 h-2 shrink-0 bg-red-400 group-focus:bg-white rounded-full" />
                                <div className="flex items-center justify-between w-full pl-1">
                                    <p className=" text-xs truncate max-w-17.5">
                                        {CalendarEvent.summary}
                                    </p>
                                    <span className="text-[9px] text-[#858585] group-focus:text-black">
                                        {time}
                                    </span>
                                </div>
                            </button>
                        )
                    })}

                </div>
            </>
        )
    }


    // Creating the calendar 
    const calendarCells = []

    for (let i = 0; i < firstOfMonth.getDay(); i++) {
        calendarCells.push(null);
    }


    for (let j = 1; j < totalDays + 1; j++) {
        calendarCells.push(j);
    }

    // Creating an object where key is a number (day) and value is array of CalendarEvent objects
    const eventsPerDay: Record<number, CalendarEvent[]> = {};

    events.forEach((event) => {
        let eventDate: Date;

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
                <div className="grid grid-cols-7 mt-2 ml-4">
                    {weekDays.map((day) => (
                        <h2 key={day} className="text-lg ml-2 text-[#858585]">{day}</h2>
                    ))}

                    {calendarCells.map((day, index) => {
                        // Fill blank cells so the 1st of every month isnt Sunday
                        if (day === null) {
                            return null;
                        }

                        const dayEvents = eventsPerDay[day] ?? []; // Returns either an event of array objects or empty array
                        const eventCount = dayEvents.length;
                        // console.log(`On day ${day} there are a total of ${eventCount} events`)

                        const visibleEvents = eventCount
                            <= 3 ? dayEvents
                            : dayEvents.slice(0, 2); // Show only 2 events if there are more than 3, otherwise show all events

                        // console.log(`There are ${visibleEvents.length} visible events`)
                        const remainingEvents = eventCount - visibleEvents.length; // The remaining events that aren't shown

                        return (
                            <div className="border-t border-[#f2f2f7] border-b w-32 h-24 relative" key={day}>
                                {/* Circle current day (someone double check if this is properly aligned please!)*/}
                                {day === currDate.getDate() ? (
                                    <div className="w-7.5 h-7.5 bg-red-500 text-white rounded-full ml-3 pl-1.25 pt-0.5 mt-1.5">
                                        <p className=" ">
                                            {day}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="ml-3 mt-2">{day}</p>
                                )}

                                {/* Show Events */}
                                {visibleEvents.map((event) => {
                                    let time = getTime(event);
                                    return (
                                        <button
                                            key={event.id}
                                            className="flex items-center mt-1 w-32 group focus:bg-red-400 rounded-sm h-4 px-1"
                                        >
                                            <div className="w-2 h-2 shrink-0 bg-red-400 group-focus:bg-white rounded-full" />

                                            <div className="flex items-center justify-between w-full pl-1">

                                                {/* Event summary */}
                                                <p className="text-xs truncate max-w-17.5 ">
                                                    {event.summary}
                                                </p>

                                                {/* Time */}
                                                <span className="text-[9px] text-[#858585] group-focus:text-black">
                                                    {time}
                                                </span>

                                            </div>
                                        </button>
                                    );
                                })}

                                {selectedDay === day && (
                                    <Modal day={selectedDay} modalEvents={dayEvents} onClose={() => setSelectedDay(null)} />
                                )}

                                {remainingEvents > 0 && (
                                    <button
                                        onClick={() => {
                                            setSelectedDay(day);
                                        }}
                                        className="text-left pl-1 text-xs text-[#858585] cursor-pointer">
                                        {remainingEvents} more...
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}