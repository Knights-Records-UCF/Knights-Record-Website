


export async function GET() {
    const apiKey = process.env.GOOGLE_API_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    const url = 
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}` +
        `&singleEvents=true` +
        `&orderBy=startTime` +
        `&maxResults=30` +
        `&timeMin=${new Date().toISOString()}`; // To show the full list of events for the month try: {` $months[new Date().getMonth()] 1, ${new Date().getFullYear()} 00:00:00`}
    
    const res = await fetch(url);

    if (!res.ok) {
        return Response.json(
            {error: "Failed to fetch"},
            { status: res.status }
        )
    }

    // Data of type CalendarResponse
    const data: CalendarResponse = await res.json();

    return Response.json(data);
}