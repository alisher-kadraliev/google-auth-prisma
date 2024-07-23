import React from 'react'

const Create = () => {
    return (
        <div
            className="flex h-full justify-center rounded-lg border-2 p-6 shadow-sm"
        >
            <div className="flex flex-col justify-center items-center gap-1 text-center">

                <form action="">
                    <input type="text" className='border' />
                    <input type="text" className='border' />
                    <button type='submit'>submit</button>
                </form>

            </div>
        </div>
    )
}

export default Create