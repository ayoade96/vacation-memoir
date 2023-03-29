const path = require('path')
const Vacation = require('../models/Vacation')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2
const fs = require('fs')


const createVacation = async (req, res) => {
    req.body.user = req.user.userId;
   const vacation = await Vacation.create(req.body);
   res.status(StatusCodes.CREATED).json({ vacation });
}


const getAllVacations = async (req, res) => {
    const vacations = await Vacation.find({})
    res.status(StatusCodes.OK).json({ vacations, count:vacations.length });
}

const getSingleVacation = async (req, res) => {
    const { id: vacationId } = req.params;

    const vacation = await Vacation.findOne({_id: vacationId})
    if(!vacation){
    throw new CustomError.NotFoundError(`no vacation with id : ${vacationId}`);
    }
    res.status(StatusCodes.OK).json({ vacation });
 
}

const  updateVacation = async (req, res) => {
    const { id: vacationId } = req.params;

    const vacation = await Vacation.findOneAndUpdate({_id: vacationId},req.body,{
        new: true,
        runValidators: true,
    });
    if(!vacation){
    throw new CustomError.NotFoundError(`no vacation with id : ${vacationId}`);
    }
    res.status(StatusCodes.OK).json({ vacation });
}
const deleteVacation = async (req, res) => {
    const { id: vacationId } = req.params;

    const vacation = await Vacation.findOne({ _id: vacationId });
    if (!vacation) {
    throw new CustomError.NotFoundError(`no vacation with id : ${vacationId}`);
    }

    await vacation.deleteOne();
    
res.status(StatusCodes.OK).json({ msg: 'Success! vacation removed.' });
}

const uploadVacationImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          use_filename: true,
          folder: 'file-upload',
        }
      );
      fs.unlinkSync(req.files.image.tempFilePath);
      return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
}



module.exports = {
    createVacation,
    getAllVacations,
    getSingleVacation,
    updateVacation,
    deleteVacation,
    uploadVacationImage,
}