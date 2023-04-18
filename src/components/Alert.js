import React from 'react'

const Alert = (props) => {
    return (
        <div className={`alert alert-${props.class} d-flex align-items-center`} role="alert">
            {/* <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill" /></svg> */}
            <div>
                {props.message}
            </div>
        </div>
    )
}

export default Alert
