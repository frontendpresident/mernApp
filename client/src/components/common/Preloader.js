import React from 'react'
import preloader from '../../img/preloader.png'

function Preloader() {
    return (
        <div className="text-center">
            <img src={preloader} className="rounded ml-2" alt="..." />
        </div>
    )
}

export default Preloader;


