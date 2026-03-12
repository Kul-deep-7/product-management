import { useState } from "react";

const ProductForm = ({ initialData = null, onSubmit, buttonText = "Create", loading, error }) => {

    const [form, setForm] = useState({
        productName: initialData?.productName || "",
        productType: initialData?.productType || "",
        quantityStock: initialData?.quantityStock || "",
        mrp: initialData?.mrp || "",
        sellingPrice: initialData?.sellingPrice || "",
        brandName: initialData?.brandName || "",
        exchangeEligibility: initialData?.exchangeEligibility || "",
    });

    const [imageFile, setImageFile] = useState([]);
    const [imagePreview, setImagePreview] = useState(
        initialData?.images || [] 
    );

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setImageFile((prev) => [...prev, ...files].slice(0, 5));
        setImagePreview((prev) => [...prev, ...newPreviews].slice(0, 5));
        e.target.value = "";
    };

    const handleRemoveImage = (index) => {
        setImageFile((prev) => prev.filter((_, i) => i !== index));
        setImagePreview((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        onSubmit(form, imageFile); 
    };

    return (
        <div className="flex flex-col gap-4">

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Product Name</label>
                <input
                    name="productName"
                    value={form.productName}
                    onChange={handleChange}
                    placeholder="Enter your product name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Product Type</label>
                <select
                    name="productType"
                    value={form.productType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-500"
                >
                    <option value="">Select product type</option>
                    <option value="Foods">Foods</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Beauty-Products">Beauty Products</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Quantity Stock</label>
                <input
                    name="quantityStock"
                    value={form.quantityStock}
                    onChange={handleChange}
                    placeholder="Total numbers of Stock available"
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">MRP</label>
                <input
                    name="mrp"
                    value={form.mrp}
                    onChange={handleChange}
                    placeholder="Price"
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Selling Price</label>
                <input
                    name="sellingPrice"
                    value={form.sellingPrice}
                    onChange={handleChange}
                    placeholder="Selling Price"
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Brand Name</label>
                <input
                    name="brandName"
                    value={form.brandName}
                    onChange={handleChange}
                    placeholder="Brand Name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
            </div>

            {/* Images */}
            <div>
                <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-gray-700">Upload Product Images</label>
                    {imagePreview.length > 0 && (
                        <span
                            onClick={() => document.getElementById("imageInput").click()}
                            className="text-xs text-blue-600 font-medium cursor-pointer"
                        >
                            Add More Photos
                        </span>
                    )}
                </div>
                <div className="flex gap-2 flex-wrap">
                    {imagePreview.map((src, index) => (
                        <div key={index} className="relative">
                            <img src={src} className="w-16 h-16 object-cover rounded-md border border-gray-200" />
                            <button
                                onClick={() => handleRemoveImage(index)}
                                className="absolute -top-1 -right-1 bg-white rounded-full text-gray-500 text-xs w-4 h-4 flex items-center justify-center border border-gray-300"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    {imagePreview.length === 0 && (
                        <div
                            onClick={() => document.getElementById("imageInput").click()}
                            className="border border-dashed border-gray-300 rounded-md px-3 py-4 text-center cursor-pointer hover:border-blue-400 w-full"
                        >
                            <p className="text-xs text-gray-400">Click to browse</p>
                            <p className="text-xs text-blue-600 font-medium">Browse</p>
                        </div>
                    )}
                </div>
                <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Exchange or return eligibility</label>
                <select
                    name="exchangeEligibility"
                    value={form.exchangeEligibility}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-500"
                >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <div className="flex justify-end mt-2">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-2 rounded-md text-white text-sm font-semibold disabled:opacity-70"
                    style={{ background: "#002283" }}
                >
                    {loading ? "Please wait..." : buttonText}
                </button>
            </div>
        </div>
    );
};

export default ProductForm;