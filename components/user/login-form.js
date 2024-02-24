"use client";

import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";

export default function LoginForm({ error }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Start now
          <ArrowRight className="h-4 w-4 mx-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="break-words">
        <DialogHeader className="w-full">
          <DialogTitle>Login with </DialogTitle>
          <DialogDescription>what you want to use to login ?</DialogDescription>
        </DialogHeader>
        {error && (
            <p class="text-sm break-words min-w-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded p-3 ">
             {error}
            </p>
          )}
        <div className="flex flex-col p-3 space-y-5">
          <Button
            variant="outline"
            onClick={() => {
              signIn("google");
            }}
          >
            Google
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              signIn("github");
            }}
          >
            Github
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              signIn("discord");
            }}
          >
            Discord
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
