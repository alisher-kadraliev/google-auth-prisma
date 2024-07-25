"use server"
import db from '@/lib/db'

export const categories = async () => {
    const categories = db.category.findMany()
    console.log(categories);
}