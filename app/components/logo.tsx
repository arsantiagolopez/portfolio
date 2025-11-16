import { Link } from "react-router";

export function Logo() {
  return (
    <Link
      to="/"
      className="text-xl font-medium tracking-tighter"
      viewTransition
    >
      ALEXANDER SANTIAGO
    </Link>
  );
}
