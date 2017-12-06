/* eslint-disable */
const COLOUR = 'rgba(34, 49, 63,'

export default function (id) {
    var hash = 0, i, chr;
    if (id.length === 0) return hash;
    for (i = 0; i < id.length; i++) {
        chr   = id.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    var num = (Math.abs(hash % 128) + 128) / 256
    return COLOUR +num+ ')'
}