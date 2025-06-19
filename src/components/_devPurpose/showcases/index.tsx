import {
  WindowRoot,
  WindowContent,
  WindowFooter,
  WindowHeader,
} from "@/components/ui/Window";
import { Button } from "../../ui/Button";
import { LoremIpsum } from "lorem-ipsum";
import { useState } from "react";
import { Close, Maximize, Minimize } from "../../ui/NavigationIcons";

function Showcases() {
  const [string, setString] = useState(
    "It's a shame that I can find header Icons: minimize, maximize and close... Yet."
  );

  function getRandomLorem() {
    const lorem = new LoremIpsum({
      wordsPerSentence: {
        max: 16,
        min: 4,
      },
    });

    setString(lorem.generateParagraphs(Math.floor(Math.random() * 9) + 1));
  }

  return (
    <div id="app" className="gap-8 flex flex-col p-4 overflow-y-scroll">
      <h1 className="pb-4">This is Showcase tester.</h1>
      <Button
        onMouseDown={() => {
          history.back();
        }}
        aria-label="go-back"
        className="w-32"
      >
        GoBack
      </Button>

      <div className="gap-4 flex flex-col">
        <h2>1. Base Window</h2>
        <WindowRoot>
          <WindowHeader>
            <span>This is showcase window.</span>
          </WindowHeader>
          <WindowContent>
            <span>{string}</span>
          </WindowContent>
          <WindowFooter>
            <Button
              onClick={getRandomLorem}
              aria-label="get-random-strings"
              variant={"primary"}
            >
              Get random Strings
            </Button>
          </WindowFooter>
        </WindowRoot>
      </div>
      <div className="py-10 flex flex-col gap-4">
        <h2>3. Interactable window</h2>
        <WindowRoot>
          <WindowHeader className="justify-between w-full h-full flex">
            <span>This is showcase window with header buttons.</span>
            <nav className="flex flex-shrink-0 gap-1 h-full cancel items-center pr-1">
              <Button
                variant={"primary"}
                className={"p-0 w-[22px] flex items-center justify-center"}
              >
                <Minimize />
              </Button>
              <Button
                variant={"primary"}
                className={"p-0 w-[22px] flex items-center justify-center"}
              >
                <Maximize />
              </Button>
              <Button
                variant={"primary"}
                className={"p-0 w-[22px] flex items-center justify-center"}
              >
                <Close />
              </Button>
            </nav>
          </WindowHeader>
          <WindowContent>
            <span>Window with navigators</span>
          </WindowContent>
          <WindowFooter>
            <Button
              variant={"primary"}
              onMouseDown={getRandomLorem}
              aria-label="get-random-strings"
            >
              <span>Get random Strings</span>
            </Button>
          </WindowFooter>
        </WindowRoot>
      </div>
      <div>
        <div className="gap-4 flex flex-col px-8 bg-primary-background py-10">
          <h2>2. Buttons</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <Button asChild variant={"primary"}>
              <span>Primary</span>
            </Button>
            <Button variant={"secondary"}>
              <span>Secondary</span>
            </Button>
            <Button variant={"tertiary"}>
              <span>Tetiary</span>
            </Button>
            <Button variant={"info"}>
              <span>Info</span>
            </Button>
            <Button variant={"success"}>
              <span>Success</span>
            </Button>
            <Button variant={"warning"}>
              <span>Warning</span>
            </Button>
            <Button variant={"danger"}>
              <span>Danger</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Showcases;
