
import axios from "axios";
import { useState } from "react";
import { RiUploadCloudLine } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';

const AddFood = () => {
    const [Image, SetImage] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const price = e.target.price.value;
        const category = e.target.category.value;
        const description = e.target.description.value;
        const foodImageData = new FormData();
        foodImageData.append('file', Image);
        foodImageData.append('upload_preset', 'kcig1ito');
        foodImageData.append('cloud_name', 'dcao1wljw');
        const foodImageResult = await axios.post('https://api.cloudinary.com/v1_1/dcao1wljw/image/upload',  foodImageData);
        // const public_id = foodImageResult.data.public_id;
        const image=foodImageResult.data.secure_url;
        const newFood={name,price,category,description,image}
        console.log(newFood);
        try {
            const result= await axios.post('http://localhost:5000/food/add/',newFood)
        console.log(result.data);
        if(result.data.success){
        toast.success(result.data.message);
        }else{
            toast.error(result.data.message)
        }
        // console.log("image1",image);
        //     if (foodImageResult && foodImageResult.data && foodImageResult.data.public_id) {
        //         try {
        //             await axios.post('https://api.cloudinary.com/v1_1/dcao1wljw/image/destroy', {
        //                 public_id: foodImageResult.data.public_id
        //             });
        //         } catch (deleteError) {
        //             console.error("Failed to delete image from Cloudinary", deleteError);
        //         }
        //     }
        } catch (error) {
            toast.error("Some thing went wrong")
            console.log("image",image);
            // if (foodImageResult && foodImageResult.data && foodImageResult.data.public_id) {
            //     try {
            //         await axios.post('https://api.cloudinary.com/v1_1/dcao1wljw/image/destroy', {
            //             public_id: foodImageResult.data.public_id
            //         });
            //     } catch (deleteError) {
            //         console.error("Failed to delete image from Cloudinary", deleteError);
            //     }
            // }
        }

    };
    return (
        <div className="lg:max-w-[85vw] mx-auto h-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add Food Item</h2>
            <ToastContainer></ToastContainer>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block  text-gray-700 mb-2">Upload Image</label>
                    <div className="flex items-center">
                        <label className="flex items-center px-4 py-2 hover:border-gray-600  text-gray-700 rounded-lg cursor-pointer">
                            <RiUploadCloudLine className={Image ? "hidden" : "mr-2"} />
                            <img src={Image ? URL.createObjectURL(Image) : ''} className={Image ? "mr-2 w-20 rounded-lg" : "hidden"} alt="" />
                            <span className={Image ? "hidden" : ""}>Choose file</span>
                            <input
                                type="file"
                                name="image"
                                onChange={(e) => { SetImage(e.target.files[0]) }}
                                className="hidden"
                                required
                            />
                        </label>
                        {(
                            <span className="ml-4">{ }</span>
                        )}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        name="name"

                        required
                        className="input input-bordered w-full"
                        placeholder="Enter food name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Category</label>
                    <select
                        name="category"
                        required

                        className="select select-bordered w-full"
                    >
                        <option value="">Select category</option>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Price</label>
                    <input
                        type="number"
                        name="price"

                        required
                        className="input input-bordered w-full"
                        placeholder="Enter price"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"

                        required

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