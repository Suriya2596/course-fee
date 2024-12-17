const Fee = require("../models/FeeModel");

let feeController = {}

// Controller to create a new fee entry
feeController.createFee = async (req, res) => {
  try {
    const { type, category, course, level, amount } = req.body;

    // Validate required fields
    if (!type || !category || !course || amount === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new fee entry
    const newFee = new Fee({
      type,
      category,
      course,
      level, // Optional
      amount
    });

    // Save the fee entry to the database
    const savedFee = await newFee.save();

    return res.status(201).json({
      message: 'Fee entry created successfully',
      data: savedFee
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

feeController.listFee = async (req, res) => {
  try {
    // Fetch all fee entries from the database
    const fees = await Fee.find();

    if (fees.length === 0) {
      return res.status(404).json({ message: 'No fee entries found' });
    }

    return res.status(200).json({
      message: 'All fee entries retrieved successfully',
      data: fees
    });
  } catch (error) {
    console.error('Error fetching fees:', error);
    return res.status(500).json({
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

feeController.getExamFees = async (req, res) => {
  try {
    // Fetch all "Exam Fee" documents from the database
    const examFees = await Fee.find({ type: 'Exam Fee' });

    // Initialize the response object
    const response = { "Exam Fee": {} };

    // Process the data to group it by category, course, and level
    examFees.forEach((fee) => {
      const { category, course, level, amount } = fee;

      // Create nested objects dynamically if they don't exist
      if (!response["Exam Fee"][category]) {
        response["Exam Fee"][category] = {};
      }
      if (!response["Exam Fee"][category][course]) {
        response["Exam Fee"][category][course] = {};
      }
      if (!response["Exam Fee"][category][course][level]) {
        response["Exam Fee"][category][course][level] = {};
      }

      // Assign the amount to the final level
      response["Exam Fee"][category][course][level]["amount"] = amount;
    });

    // Send the structured response
    return res.status(200).json({data: response});
  } catch (error) {
    console.error('Error fetching Exam Fee:', error);
    return res.status(500).json({
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};
feeController.getApplicationFees = async (req, res) => {
  try {
    // Fetch all "Application Fee" documents from the database
    const applicationFees = await Fee.find({ type: 'Application Fee' });

    // Initialize the response object
    const response = { "Application Fee": {} };

    // Process the data to group it by category, course, and level
    applicationFees.forEach((fee) => {
      const { category, course, level, amount, _id } = fee;

      // Create nested objects dynamically if they don't exist
      if (!response["Application Fee"][category]) {
        response["Application Fee"][category] = {};
      }
      if (!response["Application Fee"][category]["ALL_COURSES"]) {
        response["Application Fee"][category]["ALL_COURSES"] = {};
      }
      if (!response["Application Fee"][category]["ALL_COURSES"][level]) {
        response["Application Fee"][category]["ALL_COURSES"][level] = {};
      }

      // Assign the amount to the final level
      response["Application Fee"][category]["ALL_COURSES"][level]["amount"] = amount;
    });

    // Send the structured response
    return res.status(200).json({data: response});
  } catch (error) {
    console.error('Error fetching Application Fee:', error);
    return res.status(500).json({
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

module.exports = feeController
