export async function GET(request: Request) {
    const apiKey = process.env.GOOGLE_API_KEY;

    const calendarIds = [
        process.env.GOOGLE_KR_EVENTS_CALENDAR_ID,
        process.env.GOOGLE_ARTIST_EVENTS_CALENDAR_ID,
        process.env.GOOGLE_LIVE_EVENTS_CALENDAR_ID,
    ];

    const { searchParams } = new URL(request.url);

    const now = new Date();

    const month = Number(searchParams.get("month") ?? now.getMonth());
    const year = Number(searchParams.get("year") ?? now.getFullYear());

    // Get the beginning and end of the requested month
    const timeMin = new Date(year, month, 1).toISOString();
    const timeMax = new Date(year, month + 1, 1).toISOString();

    const requests = calendarIds.map((calendarId) => {
        const url =
            `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId!)}/events?key=${apiKey}` +
            `&singleEvents=true` +
            `&orderBy=startTime` +
            `&maxResults=60` +
            `&timeMin=${timeMin}` +
            `&timeMax=${timeMax}`;

        return fetch(url);
    });

    const responses = await Promise.all(requests);

    if (responses.some((res) => !res.ok)) {
        return Response.json(
            { error: "Failed to fetch calendars" },
            { status: 500 }
        );
    }

    const calendars = await Promise.all(
        responses.map((res) => res.json())
    );

    const events = calendars
        .flatMap((calendar) => calendar.items ?? [])
        .sort((a, b) => {
            const aStart = a.start.dateTime ?? a.start.date;
            const bStart = b.start.dateTime ?? b.start.date;

            return new Date(aStart).getTime() - new Date(bStart).getTime();
        });

    console.log(
        events.map((event) => ({
            summary: event.summary,
            start: event.start,
        }))
    );

    return Response.json({ items: events });
}