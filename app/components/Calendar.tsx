"use client";
import { useEffect, useState } from "react";

const monthNames = [
    "January",
    "February",
    "March", "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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

                console.log("Entire calendar json", data)

                console.log("single event", data.items[0]);

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

    // Setup date
    /*
     * Note that this works fine rn because Feb and March both start on
     * Sunday, but we'll need way of adding blank blocks to make sure the 1st
     * of the month is accurate
     * Ex: Apr 1st is Wed so 1 should be placed in Wed col and
     * Sun, Mon, & Tue in row 1 should be blank cells 
     * 'startWeekday' will have to be utilized to achieve this im p sure
     */
    const currentDate = new Date(); // Mon Feb 16 2026 13:08:56 GMT-0500 (Eastern Standard Time)
    const currentYear = currentDate.getFullYear(); // 2026 
    const currentMonth = currentDate.getMonth(); // 0 = Jan, 1 = Feb, ... 11 = Dec // 0
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1); // Sun Feb 01 2026
    const startWeekday = firstDayOfMonth.getDay(); // 0, Sunday
    // console.log(startWeekday); 
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0); // Sat Feb 28 2026

    const monthArr = [];

    for (let i = 1; i < lastDayOfMonth.getDate() + 1; i++) {
        monthArr.push(i)
    }

    return (
        <div className="border-2 border-[#D0D0D0]">
            {/* Ugly
            <div className="flex justify-center">
                <h1 className=" text-center p-2 text-sm mt-2 bg-black text-white rounded-lg ">
                    {monthNames[currentMonth]}
                </h1>
            </div>
            */}

            {/* Make a skeleton loader at some point for cleaner animations later */}
            {loading && (<p> loading </p>)}
            {!loading && (

                // Calendar Grid
                <div className="grid grid-cols-7 mt-2">
                    {weekDays.map((day) => (
                        <h2 key={day} className="text-lg ml-2 text-[#858585]">{day}</h2>
                    ))}

                {/* Day of the month */}
                    {monthArr.map((day) => {
                        return (
                            <div className="border-t border-[#f2f2f7] border-b w-32 h-32" key={day}>
                                <p className="ml-3 mt-2 ">{day}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}