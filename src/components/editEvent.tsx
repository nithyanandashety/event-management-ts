import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useState} from "react"
import { Event } from "@/App"

export default function EditEvent({editEventData, editEvents}:{editEventData: Event, editEvents: (value:Event) => void}) {
    const [date, setDate] = useState<Date | undefined>(new Date(editEventData.date) || undefined);
    const [title, setTitle] = useState(editEventData.title || '');
    const [location,setLocation]=useState(editEventData.location || '')

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Event</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Event</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="title" className="text-right">
                            Title
                        </label>
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
                    <Button onClick={() => editEvents({
                        id:editEventData.id,
                        title,
                        date:date?.toLocaleString("fr-CA",{timeZone:"Asia/Kolkata"}).substring(0,10)|| "",
                        location
                    })} className="w-full">Edit Event</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

