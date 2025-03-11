// TODO: Submit All Data to DraftSlice 

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { clearDraft, createDraft } from "../../draft/draftSlice"; //use for making preview functionality
import "./addForm.css"

export default function AddItemForm({ editData }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const userData = useSelector((state) => state.auth.userData);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            productName: editData?.productName || "",
            description: editData?.description || "",
            category: editData?.category || "",
            price: editData?.price || "",
            discount: editData?.discount || "",
        },
    });



    const onSubmit = async (data) => {
        console.log(data);
        if (editData) {
            // It Works
            const file01 = data.images[1] ? await appwriteService.uploadFile(data.images[1]) : null;
            const file02 = data.images[2] ? await appwriteService.uploadFile(data.images[2]) : null;
            const file03 = data.images[3] ? await appwriteService.uploadFile(data.images[3]) : null;
            const file04 = data.images[4] ? await appwriteService.uploadFile(data.images[4]) : null;
            const file05 = data.images[0] ? await appwriteService.uploadFile(data.images[0]) : null;

            if (file05, file01, file02, file03, file04) {
                appwriteService.deleteFile(editData.images_1)
                appwriteService.deleteFile(editData.images_2);
                appwriteService.deleteFile(editData.images_3);
                appwriteService.deleteFile(editData.images_4);
                appwriteService.deleteFile(editData.images_5);
            }

            const dbItem = await appwriteService.updateItem(editData.$id, {
                ...data,
                images: file ? file.$id : undefined
            });

            if (dbItem) {
                navigate(`/post/${dbItem.$id}`);
            }
        } else {
            // It Works
            const file01 = await appwriteService.uploadFile(data.images[1]);
            const file02 = await appwriteService.uploadFile(data.images[2]);
            const file03 = await appwriteService.uploadFile(data.images[3]);
            const file04 = await appwriteService.uploadFile(data.images[4]);
            const file05 = await appwriteService.uploadFile(data.images[0]);

            if (file05, file01, file02, file03, file04) {

                
                const fileId01 = file01.$id;
                data.images_1 = fileId01;
                
                const fileId02 = file02.$id;
                data.images_2 = fileId02;

                const fileId03 = file03.$id;
                data.images_3 = fileId03;

                const fileId04 = file04.$id;
                data.images_4 = fileId04;

                const fileId05 = file05.$id;
                data.images_5 = fileId05;

                const dbItem = await appwriteService.createItem({ ...data});

                if (dbItem) {
                    navigate(`/item/${dbItem.$id}`);
                }
            }
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="add-item-form">
            <label htmlFor="productName">Product Name:</label>
            <input
                type="text"
                id="productName"
                {...register('productName', { required: true })}
            />
            {errors.productName && <p className="error">Product Name is required</p>}

            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                {...register('description', { required: true })}
            ></textarea>
            {errors.description && <p className="error">Description is required</p>}

            <label htmlFor="category">Category:</label>
            <select id="category" {...register('category', { required: true })}>
                <option value="">Select a category</option>
                <option value="platform">Platform 100kg-2000kg</option>
                <option value="acs">ACS 1g-40kg</option>
                <option value="table-scale">Table Scale 5g-100kg</option>
                <option value="kitchen-health-scale">Kitchen/Health Scale</option>
                <option value="crane-scale">Crane Scale</option>
                <option value="handy-scale">Handy Scale</option>
                <option value="spring-dial-scale">Spring/Dial Scale</option>
                {/* Add more categories as needed */}
            </select>
            {errors.category && <p className="error">Category is required</p>}



            <label htmlFor="price">Price:</label>
            <input
                type="number"
                id="price"
                placeholder="Enter Retail Price"
                {...register('price', { required: true })}
            />
            {errors.price && <p className="error">Price is required</p>}

            <label htmlFor="discount">Discount:</label>
            <input type="text" id="discount" {...register('discount')} />

            <label htmlFor="images">Product Images:</label>
            <input
                type="file"
                id="images"
                {...register('images', { required: true })}
                accept="image/*"
                multiple
            />
            {errors.images && <p className="error">Only 05 Product Images are required</p>}



            <button type='submit'>Submit</button>
        </form>
    )
}
