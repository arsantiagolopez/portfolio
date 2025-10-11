// Empty route for Chrome DevTools
export function loader() {
  return new Response(null, { status: 204 });
}
