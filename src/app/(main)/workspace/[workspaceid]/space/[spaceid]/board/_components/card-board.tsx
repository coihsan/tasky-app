"use server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import React from "react";
interface BoardProps {
  children: React.ReactNode;
}
interface TaskProps {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}
type CardProps = "Backlogs" | "In-Progress" | "Review" | "Done";
const AddTask = () => {
  return (
    <div>
      <h1>Task</h1>
    </div>
  );
};
const ColumnBoard = ({ children }: BoardProps, CardProps: CardProps) => {
  return (
    <section className="flex flex-1 rounded-lg border border-white/10 bg">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <span>|</span>
          <span>{CardProps}</span>
        </div>
        <span className="">02</span>
      </div>
      <div>{children}</div>
    </section>
  );
};
const SubTask = ({ ...props }) => {
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <AddTask />
    </div>
  );
};
const CardBoards = ({ children }: BoardProps) => {
  return (
    <ColumnBoard>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
      </Card>
    </ColumnBoard>
  );
};
export default CardBoards;
