import { Button } from './Button';
import { ArrowUpIcon } from './icons';
import { scrollToTarget } from '../lib/scroll';

export function ScrollTop({ visible }: { visible: boolean }) {
  return (
    <Button
      className={`scroll-top${visible ? ' visible' : ''}`}
      aria-label="回到顶部"
      onClick={() => scrollToTarget(0)}
    >
      <ArrowUpIcon />
    </Button>
  );
}
