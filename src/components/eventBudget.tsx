import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Budget } from "@/App";
import { v4 as uuidv4 } from 'uuid';

export default function EventBudget({ budget, setBudget, eventId }: { budget: Budget[], setBudget: (val: Budget[]) => void, eventId: string }) {
  const [newDescription, setNewDescription] = useState<string>("");
  const [newAmount, setNewAmount] = useState<string>("");

  const income = budget.filter(bud => {
    if (bud.eventId === eventId && bud.type === 'income') return bud;
  });

  const expense = budget.filter(exp => {
    if (exp.eventId === eventId && exp.type === 'expense') return exp;
  })

  const handleAddIncome = () => {
    if (newDescription !== "" && (parseInt(newAmount) !== 0 || !isNaN(parseInt(newAmount)))) {

      const newBudget: Budget = {
        type: 'income',
        description: newDescription,
        amount: newAmount,
        id: uuidv4(),
        eventId: eventId
      }
      setBudget([...budget, newBudget]);
      setNewDescription("");
      setNewAmount("");
    }
  };

  const handleAddExpense = () => {
    if (newDescription !== "" && (parseInt(newAmount) !== 0 || !isNaN(parseInt(newAmount)))) {

      const newExpense: Budget = {
        type: 'expense',
        description: newDescription,
        amount: newAmount,
        id: uuidv4(),
        eventId: eventId

      }
      setBudget([...budget, newExpense]);
      setNewDescription("");
      setNewAmount("");

    }
  };

  const deleteBudget = (id: string) => {
    const updatedBudget=budget.filter(e=>e.id!==id)
    setBudget(updatedBudget)

  };

  const calculateProfit = () => {
    const totalIncome = income.reduce((sum, item) => sum + parseInt(item.amount), 0);
    const totalExpense = expense.reduce((sum, item) => sum + parseInt(item.amount), 0);
    return totalIncome - totalExpense;
  };

  const profit = calculateProfit()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Budget</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tech conference-2024 Budget</DialogTitle>
        </DialogHeader>

        <Table>
          <TableHeader>
            <h1 className="w-[100px] font-bold">Income</h1>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {income.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.description}</TableCell>
                <TableCell>${item.amount}</TableCell>
                <TableCell>
                  <Button variant='destructive' onClick={() => deleteBudget(item.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <h1 className="w-[100px] font-bold">Expense</h1>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expense.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.description}</TableCell>
                <TableCell>${item.amount}</TableCell>
                <TableCell>
                  <Button variant='destructive' onClick={() => deleteBudget(item.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div>
          <h1 className="font-bold">Profit</h1>
          {(() => {
            if (profit >= 0)
              return (<p className="bg-lime-200 p-3">${profit}</p>)
            else
              return (<p className="bg-red-200 p-3">${profit}</p>)
          })()}

        </div>
        <h1 className="font-bold">Add New Item</h1>
        <div className="flex gap-3">
          <Input
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />

          <Input
            type='number'
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />

        </div>

        <div className="flex gap-3">
          <Button className="w-full" onClick={handleAddIncome}>Add Income</Button>
          <Button className="w-full" onClick={handleAddExpense}>Add Expense</Button>
        </div>

        <DialogClose className="flex gap-3">
          <Button className="w-full">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
