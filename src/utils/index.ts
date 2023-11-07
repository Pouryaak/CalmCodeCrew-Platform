export function omitProperty<T extends object, K extends keyof T>(
  obj: T,
  propToOmit: K,
): Omit<T, K> {
  // Use destructuring to exclude the property
  const { [propToOmit]: _, ...rest } = obj;
  return rest;
}

export function formatDateAndTime(dateStr: string, timeStr: string): string {
  const [month, day, year] = dateStr.split('/').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date(year, month - 1, day, hours, minutes);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
  };

  const formattedDate = date.toLocaleDateString('en-US', dateOptions);

  const formattedTime = timeStr;

  return `${formattedDate} ${formattedTime}`;
}

export function capitalizeFirstLetter(word: string): string {
  if (word === '') return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}
