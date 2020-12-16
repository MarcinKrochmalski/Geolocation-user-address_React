import React from "react"

export const Info: React.FC<{ info: string, handleInfo: Function }> = ({ info, handleInfo }) => {

    return (
        <>
            { info && <div className="info" onClick={() => handleInfo('')} >{info}</div>}
        </>
    )

}