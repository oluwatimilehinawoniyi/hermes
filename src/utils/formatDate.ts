export default function formatDateTime(dateString: string | number | Date) {
  const date = new Date(dateString);
  return date.toISOString().replace('T', ' ').split('.')[0];
}