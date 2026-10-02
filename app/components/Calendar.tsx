"use client";

import { useEffect, useRef, useState } from "react";


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

type CalendarView = "month" | "week";

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

// loading skeleton
function CalendarSkeleton({ isWeekView }: { isWeekView: boolean }) {
    if (isWeekView) {
        return (
            <div
                role="status"
                aria-label="Loading calendar"
                className="border-2 border-[#D0D0D0] dark:border-[#323236] animate-pulse motion-reduce:animate-none"
            >
                <div aria-hidden="true" className="divide-y divide-[#f2f2f7] dark:divide-[#323236]">
                    {weekDays.map((day, index) => (
                        <div key={day} className="min-h-20 px-3 py-3 flex gap-3">
                            <div className="w-10 shrink-0">
                                <div className="h-3 w-6 mt-0.5 bg-[#e5e5e5] dark:bg-[#323236] rounded" />
                                <div className="h-3.5 w-4 mt-2 bg-[#e5e5e5] dark:bg-[#323236] rounded" />
                            </div>

                            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                                {Array.from({ length: index % 3 === 0 ? 2 : 1 }).map((_, eventIndex) => (
                                    <div key={eventIndex} className="flex items-start min-h-7 px-2 py-1">
                                        <div className="w-2 h-2 mt-1 shrink-0 bg-[#e5e5e5] dark:bg-[#323236] rounded-full" />
                                        <div className="flex items-start justify-between gap-2 w-full min-w-0 pl-2">
                                            <div className={`${eventIndex === 0 ? "w-3/5" : "w-2/5"} h-3 mt-0.5 bg-[#e5e5e5] dark:bg-[#323236] rounded`} />
                                            <div className="h-2.5 w-10 mt-0.5 shrink-0 bg-[#e5e5e5] dark:bg-[#323236] rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="border-2 border-[#D0D0D0] dark:border-[#323236] transition-all duration-300 ease-in-out animate-pulse">

            <div className="grid grid-cols-7 mt-2 md:ml-4">
                {weekDays.map((day) => (
                    <div
                        key={day}
                        className="h-5 flex items-center justify-center md:justify-start md:ml-2"
                    >
                        <div className="h-2.5 md:h-3 w-4 md:w-10 bg-[#e5e5e5] dark:bg-[#323236] rounded transition-all duration-300 ease-in-out" />
                    </div>
                ))}



                {Array.from({ length: 35 }).map((_, index) => (
                    <div
                        key={index}
                        className="border-t border-[#f2f2f7] dark:border-[#323236] border-b w-full md:w-32 h-20 md:h-24 relative min-w-0 transition-all duration-300 ease-in-out"
                    >

                        <div className="h-3 w-3 md:h-3.5 md:w-4 bg-[#e5e5e5] dark:bg-[#323236] rounded mx-auto md:ml-3 mt-2 transition-all duration-300 ease-in-out" />



                        {index % 4 === 0 && (
                            <div className="flex items-center mt-2 px-1">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 shrink-0 bg-[#e5e5e5] dark:bg-[#323236] rounded-full transition-all duration-300 ease-in-out" />

                                <div className="h-2 md:h-2.5 w-7 md:w-16 ml-1 bg-[#e5e5e5] dark:bg-[#323236] rounded transition-all duration-300 ease-in-out" />
                            </div>
                        )}



                        {index % 7 === 0 && (
                            <div className="flex items-center mt-1.5 px-1">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 shrink-0 bg-[#e5e5e5] dark:bg-[#323236] rounded-full transition-all duration-300 ease-in-out" />

                                <div className="h-2 md:h-2.5 w-5 md:w-12 ml-1 bg-[#e5e5e5] dark:bg-[#323236] rounded transition-all duration-300 ease-in-out" />
                            </div>
                        )}

                    </div>
                ))}
            </div>

        </div>
    )
}


export default function Calendar() {

    const [loading, setLoading] = useState(true);
    const calendarRef = useRef<HTMLDivElement>(null);
    const [calendarVisible, setCalendarVisible] = useState(false);

    useEffect(() => {
        if (loading) {
            setCalendarVisible(false);
            return;
        }

        const calendar = calendarRef.current;
        if (!calendar) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setCalendarVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        observer.observe(calendar);
        return () => observer.disconnect();
    }, [loading]);
    const [error, setError] = useState<string | null>(null);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

    // Month currently being displayed
    const [displayDate, setDisplayDate] = useState(new Date());

    const [view, setView] = useState<CalendarView>("month");
    const [isMobile, setIsMobile] = useState(false);



    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");

        function handleScreenChange() {
            const mobile = mediaQuery.matches;

            setIsMobile(mobile);

            setView("month");
        }

        handleScreenChange();

        mediaQuery.addEventListener("change", handleScreenChange);

        return () => {
            mediaQuery.removeEventListener("change", handleScreenChange);
        };
    }, []);



    function getWeekStart(date: Date) {
        const start = new Date(date);

        start.setHours(0, 0, 0, 0);
        start.setDate(start.getDate() - start.getDay());

        return start;
    }



    const weekStart = getWeekStart(displayDate);

    const weekDates = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(weekStart);

        date.setDate(weekStart.getDate() + index);

        return date;
    });



    useEffect(() => {
        async function fetchCalendar() {
            try {
                setLoading(true);
                setError(null);

                const datesToFetch =
                    view === "week" && isMobile
                        ? weekDates
                        : [displayDate];

                const uniqueMonths = Array.from(
                    new Map(
                        datesToFetch.map((date) => {
                            const month = date.getMonth();
                            const year = date.getFullYear();

                            return [
                                `${year}-${month}`,
                                { month, year }
                            ];
                        })
                    ).values()
                );

                const responses = await Promise.all(
                    uniqueMonths.map(async ({ month, year }) => {
                        const res = await fetch(
                            `/api/calendar?month=${month}&year=${year}`
                        );

                        if (!res.ok) {
                            throw new Error("Failed to fetch calendar");
                        }

                        const data: CalendarResponse = await res.json();

                        return data.items;
                    })
                );

                const allEvents = responses.flat();

                const uniqueEvents = Array.from(
                    new Map(
                        allEvents.map((event) => [event.id, event])
                    ).values()
                );

                console.log("Entire calendar json", uniqueEvents)
                console.log("single event", uniqueEvents[0]);

                setEvents(uniqueEvents);
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

    }, [displayDate, view, isMobile]);



    const currDate = new Date(); // Current date and time

    const lastOfMonth = new Date(
        displayDate.getFullYear(),
        displayDate.getMonth() + 1,
        0
    );

    const firstOfMonth = new Date(
        displayDate.getFullYear(),
        displayDate.getMonth(),
        1
    );

    const totalDays = lastOfMonth.getDate();


    // Go to previous month
    function previousMonth() {
        setDisplayDate(
            new Date(
                displayDate.getFullYear(),
                displayDate.getMonth() - 1,
                1
            )
        );

        setSelectedDay(null);
        setSelectedEvent(null);
    }


    // Go to next month
    function nextMonth() {
        setDisplayDate(
            new Date(
                displayDate.getFullYear(),
                displayDate.getMonth() + 1,
                1
            )
        );

        setSelectedDay(null);
        setSelectedEvent(null);
    }


    function previousWeek() {
        const previous = new Date(displayDate);

        previous.setDate(previous.getDate() - 7);

        setDisplayDate(previous);
        setSelectedDay(null);
        setSelectedEvent(null);
    }


    function nextWeek() {
        const next = new Date(displayDate);

        next.setDate(next.getDate() + 7);

        setDisplayDate(next);
        setSelectedDay(null);
        setSelectedEvent(null);
    }


    function previousPeriod() {
        if (isMobile && view === "week") {
            previousWeek();
        } else {
            previousMonth();
        }
    }


    function nextPeriod() {
        if (isMobile && view === "week") {
            nextWeek();
        } else {
            nextMonth();
        }
    }


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


    function getEventDate(calEvent: CalendarEvent) {
        if (calEvent.start.dateTime) {
            return new Date(calEvent.start.dateTime);
        }

        const [year, month, day] = calEvent.start.date
            .split("-")
            .map(Number);

        return new Date(year, month - 1, day);
    }

    function sameDate(first: Date, second: Date) {
        return (
            first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth() &&
            first.getDate() === second.getDate()
        );
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
            eventDate = getEventDate(event);
        }

        // Only include events from the current month and year
        if (
            eventDate.getMonth() !== displayDate.getMonth() ||
            eventDate.getFullYear() !== displayDate.getFullYear()
        ) {
            return;
        }

        const day = eventDate.getDate();

        // If this day doesn't exist yet in the object then initialize it with an empty array
        if (!eventsPerDay[day]) {
            eventsPerDay[day] = [];
        }

        // At that day, push the event object to the array
        eventsPerDay[day].push(event);
    });



    // Check if the displayed month is the current month
    const isCurrentMonth =
        displayDate.getMonth() === currDate.getMonth() &&
        displayDate.getFullYear() === currDate.getFullYear();



    return (
    <>
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
                <h1 className="font-[525] text-xl sm:text-2xl text-left text-[#656565] dark:text-[#fbfbfb] transition-all duration-300 ease-in-out whitespace-nowrap">
                    {months[displayDate.getMonth()]}{" "}
                    <span className="text-lg sm:text-xl font-normal text-[#656565]/50 dark:text-[#8e8e8f] transition-all duration-300 ease-in-out">
                        {displayDate.getFullYear()}
                    </span>
                </h1>

                <button
                    onClick={previousPeriod}
                    className="text-lg cursor-pointer dark:text-white transition-all duration-300 ease-in-out"
                    aria-label={
                        isMobile && view === "week"
                            ? "Previous week"
                            : "Previous month"
                    }
                >
                    &lt;
                </button>

                <button
                    onClick={nextPeriod}
                    className="text-lg cursor-pointer dark:text-white transition-all duration-300 ease-in-out"
                    aria-label={
                        isMobile && view === "week"
                            ? "Next week"
                            : "Next month"
                    }
                >
                    &gt;
                </button>
            </div>

            <div className="flex md:hidden shrink-0 bg-[#f2f2f7] dark:bg-[#2c2c2e] rounded-lg p-1 mb-1 w-fit transition-all duration-300 ease-in-out">
                <button
                    onClick={() => {
                        setView("week");
                        setSelectedDay(null);
                        setSelectedEvent(null);
                    }}
                    className={`px-3 py-1.5 text-xs rounded-md transition-all duration-200 ${
                        view === "week"
                            ? "bg-white dark:bg-[#48484a] text-black dark:text-white shadow-sm transition-all duration-300 ease-in-out"
                            : "text-[#858585]"
                    }`}
                >
                    Week
                </button>

                <button
                    onClick={() => {
                        setView("month");
                        setSelectedDay(null);
                        setSelectedEvent(null);
                    }}
                    className={`px-3 py-1.5 text-xs rounded-md transition-all duration-200 ${
                        view === "month"
                            ? "bg-white dark:bg-[#48484a] text-black dark:text-white shadow-sm transition-all duration-300 ease-in-out"
                            : "text-[#858585]"
                    }`}
                >
                    Month
                </button>
            </div>
        </div>

        <div className="border border-[#D9D9D9] dark:border-[#363636] mb-4 transition-all duration-300 ease-in-out" />

        

            {/* Mount the cells after loading so their cascade starts after the skeleton. */}
            {loading && (<CalendarSkeleton isWeekView={isMobile && view === "week"} />)}

            {!loading && (
                <div
                    ref={calendarRef}
                    data-calendar-visible={calendarVisible}
                    className="border-2 border-[#D0D0D0] dark:border-[#323236] transition-colors duration-300 ease-in-out"
                >
                    {isMobile && view === "week" && (
                        
                        <div className="w-full">

                            <div className="divide-y divide-[#f2f2f7] dark:divide-[#323236]">
                                {weekDates.map((date, index) => {
                                    const dayEvents = events.filter(
                                        (event) =>
                                            sameDate(
                                                getEventDate(event),
                                                date
                                            )
                                    );

                                    return (
                                        <div
                                            key={`week-${date.toISOString()}`}
                                            className="calendar-cell-enter min-h-20 px-3 py-3 flex gap-3 transition-colors duration-300 ease-in-out"
                                            style={{ animationDelay: `${150 + index * 140}ms` }}
                                        >
                                            <div className="w-10 shrink-0">
                                                <p className="text-xs text-[#858585] transition-all duration-300 ease-in-out">
                                                    {weekDays[index]}
                                                </p>

                                                <p className="text-sm dark:text-[#fbfbfb] transition-all duration-300 ease-in-out">
                                                    {date.getDate()}
                                                </p>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                {dayEvents.length === 0 ? (
                                                    <p className="text-xs text-[#b0b0b0] dark:text-[#555555] mt-1 transition-all duration-300 ease-in-out">
                                                        No events
                                                    </p>
                                                ) : (
                                                    <div className="flex flex-col gap-1.5">
                                                        {dayEvents.map((event) => {
                                                            let time = getTime(event);
                                                            const isSelected =
                                                                selectedEvent === event.id;

                                                            return (
                                                                <button
                                                                    key={event.id}
                                                                    onClick={() => {
                                                                        setSelectedEvent(
                                                                            isSelected
                                                                                ? null
                                                                                : event.id
                                                                        );
                                                                    }}
                                                                    className="flex items-start w-full group focus:bg-red-400 rounded-md min-h-7 px-2 py-1 text-left transition-all duration-300"
                                                                >
                                                                    <div className="w-2 h-2 mt-1 shrink-0 bg-red-400 group-focus:bg-white rounded-full" />

                                                                    <div className="flex items-start justify-between gap-2 w-full min-w-0 pl-2">

                                                                        {/* Event summary */}
                                                                        <p
                                                                            className={`text-xs dark:text-[#fbfbfb] transition-all duration-300 ease-in-out ${
                                                                                isSelected
                                                                                    ? "whitespace-normal break-words"
                                                                                    : "truncate"
                                                                            }`}
                                                                        >
                                                                            {event.summary}
                                                                        </p>

                                                                        {/* Time */}
                                                                        <span className="text-[10px] mt-0.5 whitespace-nowrap shrink-0 text-[#858585] dark:text-[#fbfbfb] group-focus:text-black transition-all duration-300 ease-in-out">
                                                                            {time}
                                                                        </span>

                                                                    </div>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {(!isMobile || view === "month") && (
                        // Calendar grid
                        <div className="grid grid-cols-7 mt-2 md:ml-4">
                                {weekDays.map((day) => (
                                    <h2 key={day} className="text-xs md:text-lg text-center md:text-left md:ml-2 text-[#858585]">
                                        <span className="md:hidden">
                                            {day.charAt(0)}
                                        </span>

                                        <span className="hidden md:inline">
                                            {day}
                                        </span>
                                    </h2>
                                ))}



                                {calendarCells.map((day, index) => {
                                    // Fill blank cells so the 1st of every month isnt Sunday
                                    if (day === null) {
                                        return (
                                            <div
                                                key={`blank-${index}`}
                                                className="calendar-cell-enter border-t border-[#f2f2f7] dark:border-[#323236] border-b w-full md:w-32 h-20 md:h-24 transition-colors duration-300 ease-in-out"
                                                style={{ animationDelay: `${150 + index * 75}ms` }}
                                            />
                                        );
                                    }



                                    const dayEvents = eventsPerDay[day] ?? []; // Returns either an event of array objects or empty array
                                    const eventCount = dayEvents.length;

                                    // console.log(`On day ${day} there are a total of ${eventCount} events`)

                                    const visibleEvents = eventCount
                                        <= 3 ? dayEvents
                                        : dayEvents.slice(0, 2); // Show only 2 events if there are more than 3, otherwise show all events

                                    // console.log(`There are ${visibleEvents.length} visible events`)

                                    const remainingEvents = eventCount - visibleEvents.length; // The remaining events that aren't shown

                                    const totalCalendarRows =
                                        Math.ceil(calendarCells.length / 7);

                                    const currentRow =
                                        Math.floor(index / 7);

                                    const isBottomRow =
                                        currentRow === totalCalendarRows - 1;

                                    const currentColumn = index % 7;

                                    const isLeftColumn =
                                        currentColumn === 0;

                                    const isRightColumn =
                                        currentColumn === 6;



                                    return (
                                        <div
                                            className="calendar-cell-enter border-t border-[#f2f2f7] dark:border-[#323236] border-b w-full md:w-32 h-20 md:h-24 relative min-w-0 transition-colors duration-300 ease-in-out"
                                            style={{ animationDelay: `${150 + index * 75}ms` }}
                                            key={day}
                                        >

                                            {/* Circle current day */}
                                            {isCurrentMonth && day === currDate.getDate() ? (
                                                <div className="w-6 h-6 md:w-7.5 md:h-7.5 bg-red-500 text-white dark:text-[#1f1f1f] rounded-full mx-auto md:ml-3 mt-1.5 flex items-center justify-center transition-all duration-300 ease-in-out">
                                                    <p className="text-xs md:text-base">
                                                        {day}
                                                    </p>
                                                </div>
                                            ) : (
                                                <p className="text-xs md:text-base text-center md:text-left md:ml-3 mt-2 dark:text-[#fbfbfb] transition-all duration-300 ease-in-out">
                                                    {day}
                                                </p>
                                            )}



                                            {/* Show Events */}
                                            {visibleEvents.map((event) => {
                                                let time = getTime(event);
                                                const isSelected =
                                                    selectedEvent === event.id;

                                                return (
                                                    <div
                                                        key={event.id}
                                                        className="relative"
                                                    >
                                                        <button
                                                            onClick={() => {
                                                                setSelectedEvent(
                                                                    isSelected
                                                                        ? null
                                                                        : event.id
                                                                );

                                                                setSelectedDay(null);
                                                            }}
                                                            className="flex items-center mt-0.5 w-full md:w-32 min-w-0 group focus:bg-red-400 rounded-sm h-4 px-1"
                                                        >
                                                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 shrink-0 bg-red-400 group-focus:bg-white rounded-full" />



                                                            <div className="flex items-center justify-between w-full min-w-0 pl-1 transition-all duration-300 ease-in-out">

                                                                {/* Event summary */}
                                                                <p className="text-[9px] md:text-xs truncate dark:text-[#fbfbfb] md:max-w-17.5 transition-all duration-300 ease-in-out ">
                                                                    {event.summary}
                                                                </p>

                                                                {/* Time */}
                                                                <span className="hidden md:inline text-[9px] dark:text-[#fbfbfb] group-focus:text-black transition-all duration-300 ease-in-out">
                                                                    {time}
                                                                </span>

                                                            </div>
                                                        </button>

                                                        {isSelected && (
                                                            <>
                                                                <div
                                                                    className="fixed inset-0 z-40"
                                                                    onClick={() => setSelectedEvent(null)}
                                                                />

                                                                <div
                                                                    className={`absolute z-50 w-48 sm:w-56 bg-white dark:bg-[#1f1f1f] border border-[#D9D9D9] dark:border-[#323236] rounded-xl p-3 shadow-xl transition-all duration-300 ease-in-out ${
                                                                        isBottomRow
                                                                            ? "bottom-6"
                                                                            : "top-6"
                                                                    } ${
                                                                        isLeftColumn
                                                                            ? "left-0"
                                                                            : isRightColumn
                                                                                ? "right-0"
                                                                                : "left-1/2 -translate-x-1/2"
                                                                    }`}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    <div className="flex items-start gap-2">
                                                                        <div className="w-2 h-2 mt-1.5 shrink-0 bg-red-400 rounded-full" />

                                                                        <div className="min-w-0 flex-1">

                                                                            {/* Event summary */}
                                                                            <p className="text-xs sm:text-sm text-left whitespace-normal break-words text-[#333333] dark:text-[#fbfbfb] transition-all duration-300 ease-in-out">
                                                                                {event.summary}
                                                                            </p>

                                                                            {/* Time */}
                                                                            <p className="text-[10px] sm:text-xs text-[#858585] dark:text-[#8e8e8f] mt-1">
                                                                                {time}
                                                                            </p>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                );
                                            })}



                                            {selectedDay === day && (
                                                <Modal
                                                    day={selectedDay}
                                                    modalEvents={dayEvents}
                                                    onClose={() => setSelectedDay(null)}
                                                />
                                            )}



                                            {remainingEvents > 0 && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedDay(day);
                                                        setSelectedEvent(null);
                                                    }}
                                                    className="text-left pl-1 text-[9px] md:text-xs text-[#858585] cursor-pointer"
                                                >
                                                    {remainingEvents} more...
                                                </button>
                                            )}

                                        </div>
                                    );
                                })}

                        </div>
                    )}
                </div>
            )}

        
    </>
    )
}