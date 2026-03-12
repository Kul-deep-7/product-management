import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import  Product  from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const createProduct = asyncHandler(async (req, res) => {
    const {
        productName,
        productType,
        quantityStock,
        mrp,
        sellingPrice,
        brandName,
        exchangeEligibility,
    } = req.body;


    if (!productName || !productType || !mrp || !sellingPrice || !brandName) {
        throw new ApiError(400, "All required fields must be provided");
    }

    const images = req.files?.images;

    if(!images){
        throw new ApiError(400, "Image is required")
    }

    //console.log("Total images received:", images.length);
    //console.log("Local path:" , images);

    const uploadedImages= await Promise.all(
    images.map(async (file) => {
        const cloudImage = await uploadOnCloudinary(file.path); // ✅ still .path
        if (!cloudImage) throw new ApiError(500, "Could not upload image");
        return cloudImage.url;
    })
);

    const product = await Product.create({
        productName,
        productType,
        quantityStock,
        mrp,
        sellingPrice,
        images: uploadedImages,
        brandName,
        exchangeEligibility,
        owner: req.user._id
    })

    return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"))
});


const getAllProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({owner : req.user._id})

    if(!products){
        throw new ApiError(404, "No producrs")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, products, "Products fetched successfully")
    )
})


const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        productName,
        productType,
        quantityStock,
        mrp,
        sellingPrice,
        brandName,
        exchangeEligibility,
    } = req.body;

    const product = await Product.findById(id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    if (productName) product.productName = productName;
    if (productType) product.productType = productType;
    if (quantityStock !== undefined) product.quantityStock = quantityStock;
    if (mrp) product.mrp = mrp;
    if (sellingPrice) product.sellingPrice = sellingPrice;
    if (brandName) product.brandName = brandName;
    if (exchangeEligibility) product.exchangeEligibility = exchangeEligibility;

    const imageFiles = req.files?.images;
    if (imageFiles && imageFiles.length > 0) {
        const uploadedImages = await Promise.all(
            imageFiles.map(async (file) => {
                const cloudImage = await uploadOnCloudinary(file.path);
                if (!cloudImage) throw new ApiError(500, "Could not upload image");
                return cloudImage.url;
            })
        );
        product.images = uploadedImages;
    }
    await product.save();

    return res
        .status(200)
        .json(new ApiResponse(200, product, "Product updated successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Product deleted successfully"));
});

const togglePublish = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    product.published = !product.published;
    await product.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                product,
                `Product ${product.published ? "published" : "unpublished"} successfully`
            )
        );
});

export { createProduct, 
        getAllProducts,
        updateProduct,
        deleteProduct,
        togglePublish
    }