import {
  Window,
  WindowContent,
  WindowFooter,
  WindowHeader,
} from '@/components/ui/Window';
import { Button } from '../../ui/Button';
import { Minimize, Maximize, Close } from '@/components/ui/NavigationIcons';

function RndTester() {
  return (
    <div id="app">
      <h1 className="pb-4">This is Rnd testing window.</h1>
      <Window>
        <WindowHeader className="justify-between h-[32px]">
          <span>This is showcase window with header buttons.</span>
          <nav className="flex gap-1">
            <Button
              variant={'primary'}
              className={'p-0 w-[22px] flex items-center justify-center'}
            >
              <Minimize />
            </Button>
            <Button
              variant={'primary'}
              className={'p-0 w-[22px] flex items-center justify-center'}
            >
              <Maximize />
            </Button>
            <Button
              variant={'primary'}
              className={'p-0 w-[22px] flex items-center justify-center'}
            >
              <Close />
            </Button>
          </nav>
        </WindowHeader>
        <WindowContent>
          <span>Window with navigators</span>
        </WindowContent>
        <WindowFooter>
          <Button asChild variant={'primary'}>
            <button onClick={() => null} aria-label="get-random-strings">
              Random button{' '}
            </button>
          </Button>
        </WindowFooter>
      </Window>
    </div>
  );
}

export default RndTester;
