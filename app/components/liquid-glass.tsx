import { Vaso, type VasoProps } from "vaso";

export function LiquidGlass({
  depth = 1.2,
  blur = 5,
  dispersion = 0.8,
  ...props
}: VasoProps) {
  return <Vaso depth={depth} blur={blur} dispersion={dispersion} {...props} />;
}
