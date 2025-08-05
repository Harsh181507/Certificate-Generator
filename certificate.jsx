import React from 'react'
import './certificate.css'
import certificateTemplate from './certificate.png'
const Certificate = () => {
    return(
        <div>
        <div className='container'>
            <h1>Certificate Generator</h1> 
            <img src={certificateTemplate} height={400}/>
        </div>
        </div>
    )
}

export default Certificate