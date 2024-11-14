import { Trash2Icon } from 'lucide-react';
import EditEvent from './editEvent';
import EventBudget from './eventBudget';
import { Button } from './ui/button'
import { Budget, Event } from '@/App';
import { DeleteEvent } from './deleteEvent';

function Card({ event, editEvents, deleteEvent, budget, setBudget }: { event: Event, editEvents: (data: Event) => void, deleteEvent:(id: string) => void, budget: Budget[], setBudget: (val: Budget[]) => void }) {
    const today = new Date();
    const eventDate = new Date(event.date);

    function eventValidation() {
        if (eventDate < today) {
            return <Button variant='secondary'>Done</Button>
        }
        else
            return <Button>Upcoming</Button>
    }

    return (
        <div className='border rounded-lg shadow-sm p-3'>
            <div className='flex justify-between' >
                <h1 className='font-bold'>{event.title}</h1>
                <DeleteEvent deleteEvent={deleteEvent} id={event.id}/>

            </div>
            <h1>Date: {event.date}</h1>
            <h1>Location: {event.location}</h1>
            <div className='flex gap-5'>
                {eventValidation()}
                <EditEvent editEvents={editEvents} editEventData={event} />
                <EventBudget budget={budget} setBudget={setBudget} eventId={event.id} />
            </div>
        </div>
    )
}

export default Card