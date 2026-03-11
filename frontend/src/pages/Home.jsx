import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


const Home = () => {
    const [activeTab, setActiveTab] = useState("published");
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${API_URL}/products`, {
                    withCredentials: true,
                });
                setProducts(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter((p) =>
        activeTab === "published" ? p.published : !p.published
    );

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
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-white text-sm cursor-pointer bg-[#2a2a3e]"
                >
                    <img src="https://res.cloudinary.com/dlmbyyh5z/image/upload/v1773236210/Home_ef6faj.png" /> <span>Home</span>
                </div>
                <div
                    onClick={() => navigate("/products")}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 text-sm cursor-pointer hover:bg-[#2a2a3e] hover:text-white"
                >
                    <img src="https://res.cloudinary.com/dlmbyyh5z/image/upload/v1773236210/Shopping-bag_bqiiip.png"/> <span>Products</span>
                </div>
            </div>

            <div className="flex-1 flex flex-col">

                <div className="flex items-center justify-end px-6 py-4 border-b border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold cursor-pointer">
                        👤
                    </div>
                </div>

                <div className="flex gap-6 px-8 pt-4 border-b border-gray-100">
                    <button
                        onClick={() => setActiveTab("published")}
                        className={`pb-3 text-sm font-medium transition-colors ${
                            activeTab === "published"
                                ? "text-black border-b-2 border-black"
                                : "text-gray-400"
                        }`}
                    >
                        Published
                    </button>
                    <button
                        onClick={() => setActiveTab("unpublished")}
                        className={`pb-3 text-sm font-medium transition-colors ${
                            activeTab === "unpublished"
                                ? "text-black border-b-2 border-black"
                                : "text-gray-400"
                        }`}
                    >
                        Unpublished
                    </button>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                    {filteredProducts.length === 0 ? (
                        <>
                            <img src="https://res.cloudinary.com/dlmbyyh5z/image/upload/v1773235967/iconoir_grid-add_nah4ml.png" />
                            <p className="text-sm font-semibold text-gray-800">
                                {activeTab === "published" ? "No Published Products" : "No Unpublished Products"}
                            </p>
                            <p className="text-xs text-gray-400 text-center">
                                {activeTab === "published"
                                    ? (<>Your Published Products will appear here<br />Create your first product to publish</>)
                                    : "Your Unpublished Products will appear here"}
                            </p>
                        </>
                    ) : (
                        <div className="grid grid-cols-3 gap-6 w-full px-8 py-6">
                            {filteredProducts.map((product) => (
                                <div key={product._id} className="border border-gray-200 rounded-xl overflow-hidden">
                                    <div className="bg-gray-50 h-40 flex items-center justify-center">
                                        {product.images?.length > 0 ? (
                                            <img src={product.images[0]} className="h-full w-full object-contain p-4" />
                                        ) : (
                                            <div className="text-gray-300 text-4xl">📦</div>
                                        )}
                                    </div>
                                    <div className="px-4 py-3">
                                        <p className="text-sm font-semibold text-gray-900">{product.productName}</p>
                                        <p className="text-xs text-gray-400 mt-1">{product.productType} • ₹{product.sellingPrice}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Home;