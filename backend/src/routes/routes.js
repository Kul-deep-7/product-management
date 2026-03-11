import {Router} from "express";
import { sendOTP, verifyOTP, logout } from "../controllers/auth.controller.js";
import { createProduct, getAllProducts, updateProduct, deleteProduct, togglePublish } from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router= Router()

router.route("/sendotp").post(sendOTP)
router.route("/verifyotp").post(verifyOTP)


router.route("/create").post(isLoggedIn,
    upload.fields([
        {
            name: "images",
            maxcount: 5
        }
    ]), createProduct)

router.route("/products").get(isLoggedIn, getAllProducts)
router.route("/product/update/:id").put(isLoggedIn,
    upload.fields([
        {
            name: "images",
            maxcount: 5
        }]), updateProduct)

router.route("/product/delete/:id").delete(isLoggedIn,deleteProduct)
router.route("/product/togglepublish/:id").patch(isLoggedIn,togglePublish)

router.route("/logout").post(isLoggedIn, logout)

export default router;