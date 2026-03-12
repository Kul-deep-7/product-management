import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const DisplayProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [toast, setToast] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${API_URL}/products`, { withCredentials: true });
            setProducts(res.data.data);
        } catch (err) {
            setError("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/product/delete/${id}`, { withCredentials: true });
            setToast("Product deleted successfully");
            fetchProducts();
            setTimeout(() => setToast(""), 3000);
        } catch (err) {
            setToast("Failed to delete product");
            setTimeout(() => setToast(""), 3000);
        }
    };

    const handleTogglePublish = async (id) => {
        try {
            await axios.patch(`${API_URL}/product/togglepublish/${id}`, {}, { withCredentials: true });
            fetchProducts();
        } catch (err) {
            setToast("Failed to update publish status");
            setTimeout(() => setToast(""), 3000);
        }
    };

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

            setShowModal(false);
            await fetchProducts();
            setError("");
            setToast("Product added successfully");
            setTimeout(() => setToast(""), 3000);
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
                    <h1 className="text-base font-semibold text-gray-900">Products</h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-1.5">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                            </svg>
                            <input type="text" placeholder="Search Services, Products" className="text-xs outline-none text-gray-500 w-40" />
                        </div>
                        <button onClick={() => setShowModal(true)} className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-700">
                            + Add Products
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm cursor-pointer">👤</div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="flex-1 overflow-y-auto px-8 py-6">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-sm text-gray-400">Loading products...</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3">
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
                    ) : (
                        <div className="grid grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    onDelete={handleDelete}
                                    onTogglePublish={handleTogglePublish}
                                    onEdit={(product) => navigate(`/products/edit/${product._id}`, { state: { product } })}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6 relative max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-base font-semibold text-gray-900">Add Product</h2>
                            <button onClick={() => { setShowModal(false); setError(""); }} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
                        </div>
                        {/* ✅ ProductForm replaces all the form fields */}
                        <ProductForm
                            onSubmit={handleCreate}
                            buttonText="Create"
                            loading={loading}
                            error={error}
                        />
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 shadow-md">
                    <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <p className="text-xs font-medium text-gray-700">{toast}</p>
                    <button onClick={() => setToast("")} className="text-gray-400 text-xs ml-2">✕</button>
                </div>
            )}
        </div>
    );
};

export default DisplayProducts;