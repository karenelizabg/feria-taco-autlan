import { cx } from '../../lib/cx';

// Aviso breve que aparece abajo y desaparece solo (lo controla SiteLayout).
export default function Toast({ message, visible }) {
  return (
    <div className={cx('toast', visible && 'is-on')} role="status" aria-live="polite">
      {message}
    </div>
  );
}
