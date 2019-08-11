/**
 * Разделитель тысяч в ценах
 * @param {Number|String} value
 * @returns {String}
 */
export default function(value) {
    return value
        .toString()
        .replace(/\..+$/, '')
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
