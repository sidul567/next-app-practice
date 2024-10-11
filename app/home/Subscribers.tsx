import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {};

const Subscribers = (props: Props) => {
  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>This is a card title.</CardTitle>
        <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit esse ratione eius autem in maiores laborum modi eligendi adipisci.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Time: {new Date().toTimeString()}</p>
      </CardFooter>
    </Card>
  );
};

export default Subscribers;
