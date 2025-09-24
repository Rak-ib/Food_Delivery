// import axios from "axios";
// import { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";

// const FoodList = () => {
//     const [food, setFood] = useState([]);

//     const getFoods = async () => {
//         const result = await axios.get("https://server-food-delivery-new.vercel.app/food/food_list");
//         console.log(result)
//         setFood(result.data.message);
//     }
    
//     const removeFoodItem=async(foodId)=>{
//         const result=await axios.delete(`https://server-food-delivery-new.vercel.app/food/remove/${foodId}`)
//         // console.log(result.data);
//         await getFoods();
//         if(result.data.success){
//             toast.success(result.data.message)
//         }else{
//             toast.error(result.data.message);
//         }
        
//     }

//     useEffect(() => {
//         getFoods();
//     }, []);

//     if(!food) {
//         return <span className="loading loading-spinner loading-lg"></span>;
//     }
//     return (
//         <div className=" h-full p-6 bg-white rounded-lg shadow-lg"><ToastContainer></ToastContainer>
//                 <table className="" >
//                     {/* head */}
//                     <thead >
//                         <tr className="lg:w-[75vw] mx-auto flex flex-row justify-between ">
//                             <th>Image</th>
//                             <th>Title</th>
//                             <th>Category</th>
//                             <th>Price</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {/* row 1 */}
//                         {food.map((foodItem, index) => {
                            
//                                 return <tr key={index} className="hover:bg-orange-200  rounded-xl my-6 items-center flex flex-row justify-between">
//                                     <td className="max-w-11"><img src={foodItem.image} className="rounded-xl w-36" alt="" /></td>
//                                     <td>{foodItem.name}</td>
//                                     <td>{foodItem.category}</td>
//                                     <td>{foodItem.price} </td>
//                                     <td><button onClick={() => (removeFoodItem(foodItem._id))}
//                                      className="btn btn-active btn-ghost">X</button></td>
//                                 </tr> 
//                         })}
//                     </tbody>
//                 </table>
//         </div>
//     );
// };

// export default FoodList;



import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const FoodList = () => {
    const [food, setFood] = useState([]);
    const [filteredFood, setFilteredFood] = useState([]);
    const [editingFood, setEditingFood] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    const getFoods = async () => {
        try {
            const result = await axios.get("https://server-food-delivery-new.vercel.app/food/food_list",{ withCredentials: true });
            setFood(result.data.message);
            setFilteredFood(result.data.message);
        } catch (error) {
            toast.error("Failed to fetch food items");
        }
    };

    const removeFoodItem = async (foodId) => {
        try {
            const result = await axios.delete(`https://server-food-delivery-new.vercel.app/food/remove/${foodId}`,{ withCredentials: true });
            await getFoods();
            toast.success(result.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete item");
        }
    };

    const updateFoodItem = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.put(
                `https://server-food-delivery-new.vercel.app/food/update/${editingFood._id}`,
                editingFood
            );
            toast.success(result.data.message);
            setEditingFood(null);
            await getFoods();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update item");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingFood({
            ...editingFood,
            [name]: name === "price" ? parseFloat(value) : value
        });
    };

    const handleFilter = () => {
        let filtered = [...food];
        
        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Apply category filter
        if (categoryFilter !== "all") {
            filtered = filtered.filter(item => item.category === categoryFilter);
        }
        
        setFilteredFood(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    };

    useEffect(() => {
        getFoods();
    }, []);

    useEffect(() => {
        handleFilter();
    }, [searchTerm, categoryFilter, food]);

    // Get current items for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredFood.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredFood.length / itemsPerPage);

    // Get unique categories for filter dropdown
    const categories = ["all", ...new Set(food.map(item => item.category))];

    if (!food.length) {
        return <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <ToastContainer />
            
            {/* Filter Section */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search food items..."
                        className="input input-bordered w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex-1">
                    <select
                        className="select select-bordered w-full"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Food List Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((foodItem) => (
                            <tr key={foodItem._id} className="hover">
                                <td>
                                    <img 
                                        src={foodItem.image} 
                                        className="w-16 h-16 object-cover rounded" 
                                        alt={foodItem.name} 
                                    />
                                </td>
                                <td>{foodItem.name}</td>
                                <td>{foodItem.category}</td>
                                <td>${foodItem.price.toFixed(2)}</td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => setEditingFood({...foodItem})}
                                        className="btn btn-sm btn-primary"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => removeFoodItem(foodItem._id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <div className="join">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="join-item btn"
                    >
                        «
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="join-item btn"
                    >
                        »
                    </button>
                </div>
            </div>

            {/* Edit Modal */}
            {editingFood && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit {editingFood.name}</h3>
                        <form onSubmit={updateFoodItem}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Food Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editingFood.name}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={editingFood.category}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={editingFood.price}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    value={editingFood.image}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={editingFood.description || ''}
                                    onChange={handleInputChange}
                                    className="textarea textarea-bordered"
                                    rows="3"
                                />
                            </div>
                            <div className="modal-action">
                                <button
                                    type="button"
                                    onClick={() => setEditingFood(null)}
                                    className="btn"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodList;