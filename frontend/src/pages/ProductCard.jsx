import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onDelete, onTogglePublish }) => {
    const navigate = useNavigate();

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">

            {/* Image */}
            <div className="bg-gray-50 h-48 relative overflow-hidden">
                {product.images?.length > 0 ? (
                    <>
                        <img src={product.images[0]} className="h-full w-full object-contain p-4" />
                        {product.images.length > 1 && (
                            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
                                {product.images.map((_, i) => (
                                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-orange-400" : "bg-gray-300"}`} />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-gray-300 text-4xl flex items-center justify-center h-full">📦</div>
                )}
            </div>

            {/* Info */}
            <div className="px-4 py-3 flex flex-col gap-1">
                <p className="text-sm font-semibold text-gray-900 mb-1">{product.productName}</p>
                <div className="flex justify-between text-xs text-gray-400">
                    <span>Product type -</span>
                    <span className="text-gray-600">{product.productType}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                    <span>Quantity Stock -</span>
                    <span className="text-gray-600">{product.quantityStock}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                    <span>MRP -</span>
                    <span className="text-gray-600">₹ {product.mrp}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                    <span>Selling Price -</span>
                    <span className="text-gray-600">₹ {product.sellingPrice}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                    <span>Brand Name -</span>
                    <span className="text-gray-600">{product.brandName}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                    <span>Total Number of Images -</span>
                    <span className="text-gray-600">{product.images?.length}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                    <span>Exchange Eligibility -</span>
                    <span className="text-gray-600 uppercase">{product.exchangeEligibility}</span>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2 mt-3">
                    <button
                        onClick={() => onTogglePublish(product._id)}
                        className="flex-1 py-1.5 rounded-md text-white text-xs font-semibold"
                        style={{ background: product.published ? "#16a34a" : "#002283" }}
                    >
                        {product.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                        onClick={() => navigate(`/products/edit/${product._id}`, { state: { product } })}
                        className="flex-1 py-1.5 rounded-md text-xs font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(product._id)}
                        className="p-1.5 rounded-md border border-gray-300 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-300"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;