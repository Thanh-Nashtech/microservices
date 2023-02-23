import moment from 'moment';
export function formatDate(date: Date | string) {
    const dateFormat = moment(date);
    return dateFormat.format('DD-MM-yyyy')
}