const express = require('express')
const router = express.Router()
const recipesRouter = require('../routes/recipes')
const userRouter = require('../routes/users')

router.use('/recipes',recipesRouter)
router.use('/users', userRouter)

module.exports = router
