import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"

const Add = ({url}) => {
    
    const [image, setImage] = useState(null);
    const [formKey, setFormKey] = useState(0); // helps reset <input type="file">
    const [data, setData] = useState({
        name: "",
        price: "",
        category: "Podis"
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", Number(data.price));
        formData.append("category", data.category); // ✅ fixed spelling
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                alert("Food added successfully!");

                // ✅ Reset all fields
                setData({ name: "", price: "", category: "Podis" });
                setImage(null);
                setFormKey(prev => prev + 1); // force reset <input type="file">
            } else {
                alert("Error: " + response.data.message);
            }
        } catch (error) {
            console.error("Add failed:", error);
            alert("Server error while adding food");
        }
    };

    return (
        <div className='add'>
            <form key={formKey} className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="preview" />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        name="image"
                        hidden
                        required
                    />
                </div>

                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name='name'
                        placeholder='Type here'
                        required
                    />
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select
                            name="category"
                            value={data.category}
                            onChange={onChangeHandler}
                        >
                            <option value="Podis">Podis</option>
                            <option value="Mixes">Mixes</option>
                            <option value="Pickles">Pickles</option>
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name='price'
                            placeholder='Enter price'
                            required
                        />
                    </div>
                </div>

                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
};

export default Add;
