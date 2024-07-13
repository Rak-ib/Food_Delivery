
import { RiUploadCloudLine } from "react-icons/ri";


const AddFood = () => {
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("l");
        // Handle form submission (e.g., send data to a server)
    };
    return (
        <div className="lg:max-w-[50vw] mx-auto h-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add Food Item</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Upload Image</label>
                    <div className="flex items-center">
                        <label className="flex items-center px-4 py-2 bg-orange-400 text-gray-700 rounded-lg cursor-pointer">
                            <RiUploadCloudLine className="mr-2" />
                            <span>Choose file</span>
                            <input
                                type="file"
                                name="image"
                                
                                className="hidden"
                            />
                        </label>
                        { (
                            <span className="ml-4">{}</span>
                        )}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        
                        
                        className="input input-bordered w-full"
                        placeholder="Enter food name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Category</label>
                    <select
                        name="category"
                        
                        
                        className="select select-bordered w-full"
                    >
                        <option value="">Select category</option>
                        <option value="appetizer">Appetizer</option>
                        <option value="main_course">Main Course</option>
                        <option value="dessert">Dessert</option>
                        <option value="beverage">Beverage</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                       
                        
                        className="input input-bordered w-full"
                        placeholder="Enter price"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        
                        
                        className="textarea textarea-bordered w-full"
                        placeholder="Enter description"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                    Add Food
                </button>
            </form>
        </div>
    );
};

export default AddFood;