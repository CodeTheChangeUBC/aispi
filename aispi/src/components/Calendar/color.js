/* eslint-disable */
const COLOURS = [
    '#D91E18',
    '#DB0A5B',
    '#663399',
    '#446CB3',
    '#8E44AD',
    '#013243',
    '#34495E',
    '#1E824C'
]

export default function (id) {
    var hash = 0, i, chr;
    if (id.length === 0) return hash;
    for (i = 0; i < id.length; i++) {
        chr   = id.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return COLOURS[Math.abs(hash % COLOURS.length)]
}