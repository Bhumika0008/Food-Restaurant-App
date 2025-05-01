const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
    createFoodController,
    getAllFoodsController,
    getSingleFoodController,
    getFoodByRestaurantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController,
} = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");
// const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// CREATE FOOD
router.post("/create", authMiddleware, createFoodController);

// GET ALL FOOD
router.get("/getAll", getAllFoodsController);

// GET ALL FOOD BY ID
router.get("/get/:id", getSingleFoodController);

// GET FOOD BY RESTAURANT
router.get("/getByRestaurant/:id", getFoodByRestaurantController);

// UPDATE FOOD ITEM
router.put("/update/:id", authMiddleware, updateFoodController);

// DELETE FOOD BY ID
router.delete("/delete/:id", authMiddleware, deleteFoodController);

// PLACE ORDER
router.post("/placeorder", authMiddleware, placeOrderController);

// CHANGE ORDER STATUS
router.post("/orderStatus/:id", authMiddleware, adminMiddleware, orderStatusController);

module.exports = router;
