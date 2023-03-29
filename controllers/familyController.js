const path = require('path')
const Family = require('../models/Family')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const createFamily = async (req, res) => {
    req.body.user = req.user.userId;
   const family = await Family.create(req.body);
   res.status(StatusCodes.CREATED).json({ family });
}


const getAllFamilies = async (req, res) => {
    const families = await Family.find({})
    res.status(StatusCodes.OK).json({ families, count:families.length });
}

const getSingleFamily = async (req, res) => {
    const { id: familyId } = req.params;

    const family = await Family.findOne({_id: familyId})
    if(!family){
    throw new CustomError.NotFoundError(`no family with id : ${familyId}`);
    }
    res.status(StatusCodes.OK).json({ family });
 
}

const  updateFamily = async (req, res) => {
    const { id: familyId } = req.params;

    const family = await Family.findOneAndUpdate({_id: familyId},req.body,{
        new: true,
        runValidators: true,
    });
    if(!family){
    throw new CustomError.NotFoundError(`no family with id : ${familyId}`);
    }
    res.status(StatusCodes.OK).json({ family });
}
const deleteFamily = async (req, res) => {
    const { id: familyId } = req.params;

    const family = await Family.findOne({ _id: familyId });
    if (!family) {
    throw new CustomError.NotFoundError(`no family with id : ${familyId}`);
    }

    await family.deleteOne();
    
res.status(StatusCodes.OK).json({ msg: 'Success! family removed.' });
}

const uploadFamilyImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          use_filename: true,
          folder: 'file-upload',
        }
      );
      fs.unlinkSync(req.files.image.tempFilePath);
      return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
    };



module.exports = {
    createFamily,
    getAllFamilies,
    getSingleFamily,
    updateFamily,
    deleteFamily,
    uploadFamilyImage,
}