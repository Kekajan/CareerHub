import express from "express"
import { signup, signIn, changePassword, forgotPassword, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js"

const router = express.Router()

router.post('/register', signup)
router.post('/login', signIn)
router.put('/change-password/:userId', changePassword)
router.put('/forgot-password', forgotPassword)
router.get('/getUsers', getAllUsers)
router.get('/getUser/:id', getUserById)
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)

export default router;