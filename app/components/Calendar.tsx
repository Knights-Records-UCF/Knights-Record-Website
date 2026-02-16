"use client";

import { useEffect, useState } from "react"


export default function Calendar() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCalendar() {
            try {

                setLoading(true);
                setError(null);

                const res = await fetch("/api/calendar");

                if (!res.ok) {
                    throw new Error("Failed to fetch calendar");
                }

                const data = await res.json();

                console.log(data);
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


    

    return (
        <div>


        </div>
    )
}