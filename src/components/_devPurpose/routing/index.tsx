import {
  WindowContent,
  WindowFooter,
  WindowHeader,
  WindowRoot,
} from "@/components/ui/Window";
import { Button } from "../../ui/Button";
import { DEV_ROOT } from "@/constants";

function Routing() {
  return (
    <div id="app">
      <h1 className="pb-4">This is DEV Remote Control.</h1>
      <div className="gap-4 flex flex-col">
        <WindowRoot>
          <WindowHeader>
            <span>UI Shocases - WIP</span>
          </WindowHeader>
          <WindowContent>
            <span>Explore Windows95 themed ui components</span>
          </WindowContent>
          <WindowFooter>
            <Button asChild variant={"primary"}>
              <a aria-label="go-showcases" href={`${DEV_ROOT}/showcases`}>
                Get me there
              </a>
            </Button>
          </WindowFooter>
        </WindowRoot>
        <WindowRoot>
          <WindowHeader>
            <span>RND-window Showcases</span>
          </WindowHeader>
          <WindowContent>
            <span>
              Explore RND feature base window-ish features in Windows95 theme
            </span>
          </WindowContent>
          <WindowFooter>
            <Button asChild variant={"primary"}>
              <a
                aria-label="go-rnd"
                aria-disabled="true"
                href={`${DEV_ROOT}/rnd`}
              >
                Get me there
              </a>
            </Button>
          </WindowFooter>
        </WindowRoot>
        <WindowRoot>
          <WindowHeader>
            <span>Rich text editing Showcases</span>
          </WindowHeader>
          <WindowContent>
            <span>
              Explore text editing for blogging, with a Windows95-styled window.
            </span>
          </WindowContent>
          <WindowFooter>
            <Button asChild variant={"disabled"}>
              <a aria-label="go-editing" aria-disabled="true">
                Get me there
              </a>
            </Button>
          </WindowFooter>
        </WindowRoot>
      </div>
    </div>
  );
}

export default Routing;
