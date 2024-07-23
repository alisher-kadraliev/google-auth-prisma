import React from 'react'

const Create = () => {
    return (
        <div
            className="flex h-full justify-center rounded-lg border-2 p-6 shadow-sm"
        >
            <div className="flex flex-col justify-center items-center gap-1 text-center">
                <h3 className="text-3xl mb-3 font-bold tracking-tight">
                    You have no posts
                </h3>
                <p className="text-sm text-muted-foreground">
                    You can add a new post by clicking the button below
                </p>
            </div>
        </div>
    )
}

export default Create