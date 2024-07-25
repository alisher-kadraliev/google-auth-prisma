import React from 'react'
import Create from './pageForm'
import db from '@/lib/db'

const Createpage = async () => {
    const category = await db.category.findMany()
    return (
        <div>
            <Create categoriesList={category} />
        </div>
    )
}

export default Createpage