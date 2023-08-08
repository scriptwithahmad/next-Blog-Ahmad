import User from "../../../models/User"
import dbConnect from "@/config/dbConnect"

export default async function Handler(req, res) {
    if(req.method === 'POST') {
        dbConnect()

        const { name, email, password } = req.body;

        const user = await User.create({ name, email, password })

        console.log(user)
        res.status(201).json({ user })
    }
}