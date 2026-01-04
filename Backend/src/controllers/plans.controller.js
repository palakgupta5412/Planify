import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import Plan from "../models/plan.model.js";
import mongoose from "mongoose";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const createPlan = asyncHandler( async (req, res) => {
    try{
        const {name , description, category , createdAt , completedAt , isDone} = req.body;
        const imageURLs = [] ;

        if (req.files?.length) {
          const uploadPromises = req.files.map(file =>
            uploadToCloudinary(file.path)
          );
      
          const results = await Promise.all(uploadPromises);
      
          for (const r of results) {
            if (!r) throw new ApiError(500, "Image upload failed");
            imageURLs.push(r.url);
          }
        }

        const newPlan = {
            user : req.user._id,
            name,
            description,
            category,
            images : imageURLs,
            createdAt,
            isDone  
        };

        if(completedAt) newPlan.completedAt = completedAt;
        const plan = await Plan.create(newPlan);

        res.status(201).json(new ApiResponse(201, plan));
    }
    catch (err) {
      console.error("CREATE PLAN ERROR:", err);
      throw err;
    }
});

const getAllPlans = asyncHandler( async (req, res) => {
    const plans = await Plan.find({user: req.user._id});
    res.status(200).json(new ApiResponse(200, {plans}));
});

const deleteAllPlans = asyncHandler( async (req, res) => {
    await Plan.deleteMany({ user: req.user._id });
    res.status(200).json(new ApiResponse(200, null, 'All plans deleted successfully'));
});

const deletePlanById = asyncHandler( async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid plan ID');
    }
    const deletedPlan = await Plan.findOneAndDelete({ _id: id, user: req.user._id });
    if (!deletedPlan) {
        throw new ApiError(404, 'Plan not found');
    }
    res.status(200).json(new ApiResponse(200, deletedPlan, 'Plan deleted successfully'));
});

const getPlanById = asyncHandler( async (req,res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid plan ID');
    }
    const plan = await Plan.findOne({ _id: id, user: req.user._id });
    if (!plan) {
        throw new ApiError(404, 'Plan not found');
    }
    res.status(200).json(new ApiResponse(200, plan));
})

const editPlanById = asyncHandler( async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid plan ID');
    }
    const updatedPlan = await Plan.findOneAndUpdate({ _id: id, user: req.user._id }, req.body, { new: true });
    if (!updatedPlan) {
        throw new ApiError(404, 'Plan not found');
    }
    res.status(200).json(new ApiResponse(200, updatedPlan, 'Plan updated successfully'));
});

const markAsDone = asyncHandler( async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid plan ID');
    }
    const updatedPlan = await Plan.findOneAndUpdate({ _id: id, user: req.user._id }, { isDone: true }, { new: true });
    if (!updatedPlan) {
        throw new ApiError(404, 'Plan not found');
    }
    res.status(200).json(new ApiResponse(200, updatedPlan, 'Plan marked as done successfully'));
});


export { createPlan, getAllPlans , deleteAllPlans, deletePlanById , editPlanById , markAsDone , getPlanById}; ;