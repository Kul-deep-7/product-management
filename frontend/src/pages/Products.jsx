import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Products = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        productName: "",
        productType: "",
        quantityStock: "",
        mrp: "",
        sellingPrice: "",
        brandName: "",
        exchangeEligibility: "",
    });
    const [imageFile, setImageFile] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setImageFile((prev) => [...prev, ...files]);
        setImagePreview((prev) => [...prev, ...newPreviews]);
    };

    const handleRemoveImage = (index) => {
        setImageFile((prev) => prev.filter((_, i) => i !== index));
        setImagePreview((prev) => prev.filter((_, i) => i !== index));
    };

    const handleCreate = async () => {
        if (!form.productName || !form.productType || !form.mrp || !form.sellingPrice || !form.brandName) {
            setError("Please fill all required fields");
            return;
        }
        if (!imageFile) {
            setError("Please upload a product image");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("productName", form.productName);
            formData.append("productType", form.productType);
            formData.append("quantityStock", form.quantityStock);
            formData.append("mrp", form.mrp);
            formData.append("sellingPrice", form.sellingPrice);
            formData.append("brandName", form.brandName);
            formData.append("exchangeEligibility", form.exchangeEligibility);
            
            imageFile.forEach((file) => {
                formData.append("images", file);
            });

            const res = await axios.post(`${API_URL}/create`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("mongo Db Doc", res.data);
            setShowModal(false);
            
            setForm({
                productName: "",
                productType: "",
                quantityStock: "",
                mrp: "",
                sellingPrice: "",
                brandName: "",
                exchangeEligibility: "",
            });
            setImageFile(null);
            setImagePreview(null);

        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setError("");
        setForm({
            productName: "",
            productType: "",
            quantityStock: "",
            mrp: "",
            sellingPrice: "",
            brandName: "",
            exchangeEligibility: "",
        });
        setImageFile(null);
        setImagePreview(null);
    };

    return (
        <div className="flex h-screen w-full bg-white">

            <div className="w-52 bg-[#1a1a2e] flex flex-col py-6 px-4 gap-2">
                <div className="flex items-center gap-2 mb-8 px-2">
                    <img src="https://res.cloudinary.com/dlmbyyh5z/image/upload/v1773235724/Frame_4_1_rnmtzo.png" />
                </div>

                <div className="bg-[#2a2a3e] rounded-md px-3 py-2 mb-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent text-white text-sm outline-none w-full placeholder-gray-400"
                    />
                </div>

                <div
                    onClick={() => navigate("/home")}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 text-sm cursor-pointer hover:bg-[#2a2a3e] hover:text-white"
                >
                    <img src="https://res.cloudinary.com/dlmbyyh5z/image/upload/v1773236210/Home_ef6faj.png" />
                    <span>Home</span>
                </div>
                <div
                    onClick={() => navigate("/products")}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-white text-sm cursor-pointer bg-[#2a2a3e]"
                >
                    <img src="https://res.cloudinary.com/dlmbyyh5z/image/upload/v1773236210/Shopping-bag_bqiiip.png" />
                    <span>Products</span>
                </div>
            </div>

            <div className="flex-1 flex flex-col">

                <div className="flex items-center justify-end px-6 py-4 border-b border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm cursor-pointer">
                        👤
                    </div>
                </div>

                {/* this is my main content*/}
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                    <img src="https://res.cloudinary.com/dlmbyyh5z/image/upload/v1773235967/iconoir_grid-add_nah4ml.png" />
                    <p className="text-sm font-semibold text-gray-800">Feels a little empty over here...</p>
                    <p className="text-xs text-gray-400 text-center">
                        You can create products without connecting store<br />
                        you can add products to store anytime
                    </p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-2 px-6 py-2 rounded-md text-white text-sm font-semibold"
                        style={{ background: "#002283" }}
                    >
                        Add your Products
                    </button>
                </div>
            </div>

            {/* this is my form/modal part if true this will be shown */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6 relative max-h-[90vh] overflow-y-auto">

                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-base font-semibold text-gray-900">Add Product</h2>
                            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
                        </div>

                        <div className="flex flex-col gap-4">

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Product Name</label>
                                <input
                                    name="productName"
                                    value={form.productName}
                                    onChange={handleChange}
                                    placeholder="Enter your product Name"
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

      <div>


        {/* HAndled Images here*/}

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
                                    onClick={handleCreate}
                                    disabled={loading}
                                    className="px-6 py-2 rounded-md text-white text-sm font-semibold disabled:opacity-70"
                                    style={{ background: "#002283" }}
                                >
                                    {loading ? "Creating..." : "Create"}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;