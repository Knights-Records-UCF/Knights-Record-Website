


export async function GET() {
    const apiKey = process.env.GOOGLE_API_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    const url = 
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}` +
        `&singleEvents=true` +
        `&orderBy=startTime` +
        `&maxResults=10` +
        `&timeMin=${new Date().toISOString()}`;
    
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