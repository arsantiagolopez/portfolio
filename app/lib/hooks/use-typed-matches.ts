import { type UIMatch, useMatches } from "react-router";

export function useTypedMatches<Data = unknown, Handle = unknown>() {
  return useMatches() as UIMatch<Data, Handle>[];
}
