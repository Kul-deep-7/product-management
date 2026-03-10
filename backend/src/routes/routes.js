import {Router} from "express";
import { sendOTP, verifyOTP } from "../controllers/auth.controller.js";
import { createProduct, getAllProducts, updateProduct, deleteProduct, togglePublish } from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router= Router()

router.route("/sendotp").post(sendOTP)
router.route("/verifyotp").post(verifyOTP)


router.route("/create").post(
    upload.fields([
        {
            name: "images",
            maxcount: 5
        }
    ]), createProduct)

router.route("/products").get(getAllProducts)
router.route("/product/update/:id").put(
    upload.fields([
        {
            name: "images",
            maxcount: 5
        }]), updateProduct)

router.route("/product/delete/:id").delete(deleteProduct)
router.route("/product/togglepublish/:id").patch(togglePublish)



export default router;