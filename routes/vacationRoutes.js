const express = require('express')
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication')

const {
    createVacation,
    getAllVacations,
    getSingleVacation,
    updateVacation,
    deleteVacation,
    uploadVacationImage,
} = require('../controllers/vacationController')

router.route('/').post(authenticateUser,createVacation).get(getAllVacations)

router.route('/uploadImage').post(authenticateUser,uploadVacationImage)

router.route('/:id').get(getSingleVacation).patch(authenticateUser,updateVacation).delete(authenticateUser,deleteVacation)

module.exports = router;