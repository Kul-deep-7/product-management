import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductForm from "./ProductForm";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Products = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreate = async (form, imageFile) => {
        if (!form.productName || !form.productType || !form.mrp || !form.sellingPrice || !form.brandName) {
            setError("Please fill all required fields");
            return;
        }
        if (imageFile.length === 0) {
            setError("Please upload a product image");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, val]) => formData.append(key, val));
            imageFile.forEach((file) => formData.append("images", file));

            await axios.post(`${API_URL}/create`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            navigate("/products");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-white">

            {/* Sidebar */}
            <div className="w-52 bg-[#1a1a2e] flex flex-col py-6 px-4 gap-2 shrink-0">
                <div className="flex items-center gap-2 mb-8 px-2">
                    <img src="https://res.cloudinary.com/dlmbyyh5z/image/upload/v1773235724/Frame_4_1_rnmtzo.png" />
                </div>
                <div className="bg-[#2a2a3e] rounded-md px-3 py-2 mb-4">
                    <input type="text" placeholder="Search" className="bg-transparent text-white text-sm outline-none w-full placeholder-gray-400" />
                </div>
                <div onClick={() => navigate("/home")} className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 text-sm cursor-pointer hover:bg-[#2a2a3e] hover:text-white">
                    <img src="https://res.cloudinary.com/dlmbyyh5z/image/upload/v1773236210/Home_ef6faj.png" />
                    <span>Home</span>
                </div>
                <div onClick={() => navigate("/products")} className="flex items-center gap-3 px-3 py-2 rounded-md text-white text-sm cursor-pointer bg-[#2a2a3e]">
                    <img src="https://res.cloudinary.com/dlmbyyh5z/image/upload/v1773236210/Shopping-bag_bqiiip.png" />
                    <span>Products</span>
                </div>
            </div>

            {/* Main */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Top Bar */}
                <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/products")}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        <h1 className="text-base font-semibold text-gray-900">Add Product</h1>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm cursor-pointer">👤</div>
                </div>

                {/* Form */}
                <div className="flex-1 overflow-y-auto px-8 py-6 max-w-lg">
                    <ProductForm
                        onSubmit={handleCreate}
                        buttonText="Create"
                        loading={loading}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
};

export default Products;