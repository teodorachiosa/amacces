export function slugify(url:string): string {
    return url.toString().toLowerCase()
    .replace(/([ăâ])/g, 'a')
    .replace('î', 'i')
    .replace('ș', 's')
    .replace('ț', 't')
    .replace('https://', '')
    .replace('http://', '')
    .replace(/\.+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}