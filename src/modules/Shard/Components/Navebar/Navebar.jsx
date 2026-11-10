import React from 'react'

export default function Navebar({ LoginData }) {
    return (
        <div>
            Navebar
            <h1>{LoginData?.userName}</h1>
        </div>
    )
}
