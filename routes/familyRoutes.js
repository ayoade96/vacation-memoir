const express = require('express')
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication')

const {
    createFamily,
    getAllFamilies,
    getSingleFamily,
    updateFamily,
    deleteFamily,
    uploadFamilyImage,
} = require('../controllers/familyController')

router.route('/').post(authenticateUser,createFamily).get(getAllFamilies)

router.route('/uploadImage').post(authenticateUser,uploadFamilyImage)

router.route('/:id').get(getSingleFamily).patch(authenticateUser,updateFamily).delete(authenticateUser,deleteFamily)

module.exports = router;