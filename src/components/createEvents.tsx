import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
}  from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useState} from "react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "./ui/calendar"
import { Event } from "@/App"
import { v4 as uuidv4 } from 'uuid';
import { CalendarIcon } from "lucide-react"

export default function CreateEvent({addEventData}:{addEventData: (event: Event) => void}) {
  const [date, setDate] = useState<Date | undefined>(new Date());
    const [title, setTitle] = useState('');
    const [location,setLocation]=useState('')
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
             id="title"
             value={title}
             onChange={(event) => setTitle(event.target.value)}
             className="col-span-3"
         />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right">
                            Date
                        </label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] col-span-3 justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="location" className="text-right">
                            Location
                        </label>
                        <Input
                            id="location"
                            value={location}
                            onChange={(event)=>setLocation(event.target.value)}
                            className="col-span-3"
                        />
                    </div>
        </div>
        <DialogClose>
                    <Button onClick={() => addEventData({
                      id: uuidv4(),
                        title,
                        date:date?.toLocaleString("fr-CA",{timeZone:"Asia/Kolkata"}).substring(0,10) || "",
                        location
                    })} className="w-full">Create Event</Button>
                </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
