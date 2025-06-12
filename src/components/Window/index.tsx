import { WindowRoot, WindowHeader } from '@/components/ui/Window';
import { Button } from '@/components/ui/Button';
import { Minimize, Maximize, Close } from '@/components/ui/NavigationIcons';
import { RndDefaultProps } from '@/components/_devPurpose/rnd';
import { useWindowTransition } from './useWindowTransition';

function Window({
  entry,
  minimize,
  maximize,
}: {
  entry: RndDefaultProps;
  minimize: () => void;
  maximize: () => void;
}) {
  const windowTransition = useWindowTransition(entry);

  return (
    <WindowRoot {...windowTransition}>
      <WindowHeader className="justify-between">
        <div className="grow min-w-0 overflow-hidden">
          {/* <p>This is showcase window with header buttons.</p> */}
          {entry.maximized ? 'max' : 'min'}
        </div>
        <nav className="flex gap-1 shrink-0">
          <Button
            onClick={minimize}
            variant={'primary'}
            className={'p-0 w-[22px] flex items-center justify-center'}
          >
            <Minimize />
          </Button>
          <Button
            onClick={maximize}
            variant={'primary'}
            className={'p-0 w-[22px] flex items-center justify-center'}
          >
            <Maximize />
          </Button>
          <Button
            //onClick={close}
            variant={'primary'}
            className={'p-0 w-[22px] flex items-center justify-center'}
          >
            <Close />
          </Button>
        </nav>
      </WindowHeader>
    </WindowRoot>
  );
}

export default Window;
