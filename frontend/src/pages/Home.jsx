import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [activeTab, setActiveTab] = useState("published");
    const navigate = useNavigate();

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
                    onClick={() => navigate("/products/add")}
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

                {/* Empty State */}
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                    <div className="text-4xl text-blue-700">
                        <img src="https://res.cloudinary.com/dlmbyyh5z/image/upload/v1773235967/iconoir_grid-add_nah4ml.png" />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                        {activeTab === "published" ? "No Published Products" : "No Unpublished Products"}
                    </p>
                    <p className="text-xs text-gray-400 text-center">
                        {activeTab === "published"
                            ? ( <>Your Published Products will appear here 
                            <br /> Create your first product to publish
                            </> ) : (
                             "Your Unpublished Products will appear here")}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Home;