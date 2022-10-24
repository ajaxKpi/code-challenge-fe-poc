export function dateFormatter(rawDate:string): string{
    const date = new Date(rawDate);
    return new Intl.DateTimeFormat('de-DE', {year: 'numeric', month: 'numeric', day: 'numeric'}).format(date)
}
