export function useSlug() {
  const path = window.location.pathname;
  const slug = path.split("/").pop();

  return { slug };
}
