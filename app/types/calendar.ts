

type CalendarEvent = {
    id: string;
    summary: string;
    description: string;
    // add the time 
    
}


type CalendarResponse = {
    items: CalendarEvent[];
}