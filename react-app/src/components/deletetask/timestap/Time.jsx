import React from 'react'
import { TimeStamp } from './timestampcss';

export default function Timestamp({todo}) {

    const parseDate = (unixTime) => {
        const t = new Date(unixTime);
        return `${t.getFullYear()}-${(t.getMonth() + 1).toString().padStart(2, '0')}-${t.getDate().toString().padStart(2, '0')} ${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')}`
    }

    return (
        <TimeStamp>{parseDate(todo.date)}</TimeStamp>
    )
}