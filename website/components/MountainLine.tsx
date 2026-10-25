/** The brand's hand-drawn ridge line, used as a divider. */
export function MountainLine({ light = false }: { light?: boolean }) {
  return <div className={light ? "mtn mtn-light" : "mtn"} role="presentation" />;
}
