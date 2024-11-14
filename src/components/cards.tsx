import { Trash2Icon } from 'lucide-react';
import EditEvent from './editEvent';
import EventBudget, { calculateProfit } from './eventBudget';
import { Button } from './ui/button'
import { Budget, Event } from '@/App';
import { DeleteEvent } from './deleteEvent';

function Card({ event, editEvents, deleteEvent, budget, setBudget }: { event: Event, editEvents: (data: Event) => void, deleteEvent: (id: string) => void, budget: Budget[], setBudget: (val: Budget[]) => void }) {
    const today = new Date();
    const eventDate = new Date(event.date);

    function eventValidation() {
        if (eventDate < today) {
            return <Button variant='secondary'>Done</Button>
        }
        else
            return <Button>Upcoming</Button>
    }
    const profit = calculateProfit(budget.filter(b => b.type === 'income' && b.eventId === event.id), budget.filter(b => b.type === 'expense' && b.eventId === event.id));
    return (
        <div className='border rounded-lg shadow-sm p-3'>
            <div className='flex justify-between items-center' >
                <h1 className='font-bold'>{event.title}</h1>
                <div className='flex items-center'>
                    <h1 className="font-bold">Profit:</h1>
                    {(() => {
                        if (profit >= 0)
                            return (<p className="bg-lime-200 p-3">${profit}</p>)
                        else
                            return (<p className="bg-red-200 p-3">${profit}</p>)
                    })()}
                </div>
                <DeleteEvent deleteEvent={deleteEvent} id={event.id} />
                {/* <Button onClick={() => deleteEvent(event.id)}>del</Button> */}



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