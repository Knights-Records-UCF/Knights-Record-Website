

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