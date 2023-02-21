import moment from 'moment'
import { DateTimeFormats } from './constants'

export const getDate = (
    date,
    format = DateTimeFormats.General,
    noDateFoundMessage = '-'
) => (date ? moment(date).format(format) : noDateFoundMessage)