"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProblemDesc({ submit, problem, soundBase64 }) {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="fixed top-3 right-3 md:top-10 md:right-10 text-xs"
        >
          Problem ?
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" size="content">
        <div className="h-[50vh] overflow-y-scroll">
          <div className="md:w-1/2 flex flex-col justify-between items-start px-4 md:px-8 lg:px-20 py-3 md:py-5 lg:p-10 space-y-3 md:space-y-5">
            <div className="w-full rounded-md">
              <h1 className="text-xl md:text-3xl xl:text-4xl font-bold pb-3 md:pb-5">
                {problem.title}
              </h1>
              <p className="break-words text-xs sm:text-sm text-green-300">
                Tip : {problem.tip}
              </p>
            </div>

            <div>
              <div className="flex flex-col items-start justify-start space-y-2 md:space-y-3">
                <h1 className="text-sm sm:text-base mb-2">Your Sound</h1>

                {soundBase64 ? 
                (
                  <audio
                    controls
                    src={soundBase64}
                    className="max-w-full max-h-full object-contain m-auto"
                  >
                    <source type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                ) : 
                (
                  <Skeleton className="h-4 w-[250px]" />
                )}

                <div>
                  <h1 className="text-sm sm:text-base mb-2">Your Problem</h1>
                  <audio
                    controls
                    src={problem.sound}
                    className="max-w-full max-h-full object-contain m-auto"
                  >
                    <source type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      className="mt-3 md:mt-5 lg:mt-7 w-28 md:w-36 self-start"
                      onClick={submit}
                    >
                      Submit
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
