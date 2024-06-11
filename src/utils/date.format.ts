export function formatDate(
    timestamp: number | Date,
    locale: string = 'en-US',
    options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }
): string {
    const date = typeof timestamp === 'number' ? new Date(timestamp) : timestamp;
    return new Intl.DateTimeFormat(locale, options).format(date);
}