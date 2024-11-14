import './App.css'
import Card from './components/cards';
import CreateEvents from './components/createEvents';
import { Input } from './components/ui/input'
import { useState, useEffect } from 'react';

export interface Event {
  id: string,
  title: string,
  date: string,
  location: string
}

export interface Budget {
  id: string;
  eventId: string;
  amount: string;
  description: string;
  type: 'expense' | 'income';
}

function App() {
  const budgetRetrival = (): Budget[] | null => {
    const val = localStorage.getItem('data');

    if (typeof val === 'string')
      return JSON.parse(val).budget
    return null;
  }

  const eventRetrival = (): Event[] | null => {
    const val = localStorage.getItem('data')
    if (typeof val === 'string')
      return JSON.parse(val).events

    return null;
  }

  const [searchItem, setSearchItem] = useState('')
  const [budget, setBudget] = useState<Budget[]>(budgetRetrival() || [])
  const [events, setEvents] = useState<Event[]>(eventRetrival() || []);

  const income = budget.filter(b => b.type === 'income') 
  const expense =budget.filter(b => b.type === 'expense')
const totalProfit=()=>{
  const totalIncome= income.reduce((sum, item) => sum + parseInt(item.amount), 0);
  const totalExpense= expense.reduce((sum,item)=>sum+parseInt(item.amount),0);
  return totalIncome-totalExpense
}
 const totalProfits=totalProfit();

  const saveDataLocalStorage = () => {
    const saveData = {
      events, budget
    }

    localStorage.setItem('data', JSON.stringify(saveData))
  }

  useEffect(() => {
    saveDataLocalStorage()
  }, [events, budget])

  const [filteredEvents, setFilteredEvents] = useState(events)

  const addEvent = (data: Event) => {
    const updated = [...events, data];
    setFilteredEvents(updated);
    setEvents(updated);
  }

  const deleteEvent =(id:string)=> {
    const updated = events.filter(e => e.id !== id);
    const updatedBudget = budget.filter(bu => bu.eventId!==id)
    
    setFilteredEvents(updated);
    setEvents(updated);

    setBudget(updatedBudget);
  }

  const editEvents = (data: Event) => {
    const updated = events.map(e => {
      if (e.id === data.id) {
        const event = {
          ...e,
          title: data.title,
          date: data.date,
          location: data.location
        }
        return event;
      }
      return e;
    })

    setFilteredEvents(updated);
    setEvents(updated);
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    const filteredItems = events.filter((eventData) =>
      eventData.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredEvents(filteredItems);
  }

  return (
    <div>

      <h1 className="px-3 font-bold text-left my-4 text-2xl">Event Management</h1>
      <div className='flex justify-between items-center'>
        <Input value={searchItem} onChange={handleInputChange} className='w-1/2' type="search" placeholder="Search event here..." />
        <h1 className='font-bold'>Total Events:{events.length}</h1>
        {(() => {
            if (totalProfits >= 0)
              return (<p className="bg-lime-200 font-bold p-3">Total Profit: {totalProfits}$</p>)
            else
              return (<p className="bg-red-200 font-bold p-3">Total Profit: {totalProfits}$</p>)
          })()}

        <CreateEvents addEventData={addEvent} />
      </div>
      <div className='grid md:grid-cols-2 gap-4 m-4'>{filteredEvents.map((event) => {
        return <Card deleteEvent={deleteEvent} editEvents={editEvents} key={event.id} event={event} budget={budget} setBudget={setBudget} />
      })}</div>
    </div>



  )
}

export default App
