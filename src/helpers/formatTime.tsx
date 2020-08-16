export default function(use24Hour: boolean, date: Date, hideAMPM?: boolean) {
    return use24Hour
        ? `${date.getHours()}`.padStart(2, '0') + ':' + `${date.getMinutes()}`.padStart(2, '0')
        : `${((date.getHours() + 11) % 12) + 1}`.padStart(2, '0') + ':' + `${date.getMinutes()}`.padStart(2, '0') + (hideAMPM ? '' : (date.getHours() > 12 ? 'PM' : 'AM'));
}