import React, { useEffect, useState } from "react";
import DashboardSidebar from "../dashboardSidebar/DashboardSidebar";
import "./shopCreateProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AiOutlineEdit, AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "../../../schema/ProductSchema";


const ShopCreateProduct = () => {
  const [images, setImages] = useState([]);
  const [tagInput, setTagInput] = useState("")
  const [featureInput, setFeatureInput] = useState("")
  const [categories, setCategories] = useState(["Jewellry", "leptop"]) 
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, register, watch, setValue, formState: {errors} } = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      images: [],
    }
  });


  const navigate = useNavigate();


  const handleImageChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files];
    setImages(newImages);

    setValue("images", newImages, { shouldValidate: true }); 
  };

  const deleteImage = (indexToDelete) => {
    const updatedImages = images.filter((_, index) => index !== indexToDelete);
    setImages(updatedImages);
    setValue("images", updatedImages, { shouldValidate: true });
  };


  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
    setValue("discount.discountEndDate", endDate)
  };

  const tags = watch("tags") || [];
  const features = watch("features") || [];

  const handleAddTag = () => {
  if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setValue("tags", [...tags, tagInput.trim()])
      setTagInput("")
  }
  }
  const handleAddFeature = () => {
  if (featureInput.trim() !== "" && !features.includes(featureInput.trim())) {
      setValue("features", [...features, featureInput.trim()])
      setFeatureInput("")
  }
  }
  
  const handleEnterKeyTag = (e) => {
  if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
  }
  }
  const handleEnterKeyFeature = (e) => {
  if (e.key === "Enter") {
      e.preventDefault()
      handleAddFeature()
  }
  }
  
  const removeTag = (tagToRemove) => {
  const filtered = tags.filter((t) => t !== tagToRemove)
  setValue("tags", filtered)
  }
  const removeFeature = (featureToRemove) => {
  const filtered = features.filter((t) => t !== featureToRemove)
  setValue("features", filtered)
  }


  const onSubmit = async(data) => {
    setIsLoading(true);
    
    const formData = new FormData()
    formData.append("sku", data.sku);
    if (data.barcode) formData.append("barcode", data.barcode);
    formData.append("slug", data.slug);
    if (data.taxcode) formData.append("taxcode", data.taxcode);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("productCollection", data.productCollection);
    formData.append("categories", data.categories);
    formData.append("sellingPrice", data.sellingPrice.toString());
    formData.append("stock", data.stock.toString());
    formData.append("status", data.status);
  
    // Optional fields
    if (data.originalPrice !== undefined) formData.append("originalPrice", data.originalPrice.toString());
    if (data.size) formData.append("size", data.size);
    if (data.color) formData.append("color", data.color);
    if (data.warranty !== undefined) formData.append("warranty", data.warranty.toString());
    if (data.warrantyType) formData.append("warrantyType", data.warrantyType);
    if (data.material) formData.append("material", data.material);
    if (data.origin) formData.append("origin", data.origin);
  
    // Arrays (features, tags)
    if (Array.isArray(data.tags)) {
      data.tags.forEach((tag) => formData.append("tags[]", tag));
    }
  
    if (Array.isArray(data.features)) {
      data.features.forEach((feature) => formData.append("features[]", feature));
    }
  
    if (Array.isArray(data.images)) {
      data.images.forEach((image) => {
        formData.append("images", image); // name must match backend field
      });
    }
  
    if (data.discount) {
      formData.append("discount", JSON.stringify(data.discount));
    }
  
    if (data.dimension) {
      formData.append("dimension", JSON.stringify(data.dimension));
    }   
  
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    await axios
      .post(`/api/v2/create-product/`, formData, config)
      .then((res) => {
        if (res.data.success) {          
          toast.success("Product Created!");
          setIsLoading(false);
          navigate("/shop-dashboard/products");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error?.response?.data?.error?.message);
      });
  };

  return (
    <div className="dashboard__container">
      <div className="container">
        <div className="dashboard__row">
          <div className="col__2 dashboard__sidebar">
            <DashboardSidebar active={4} />
          </div>
          <div className="col__2 dashboard_create_product">      
            <form onSubmit={handleSubmit(onSubmit)} className="form__create__product">
              <div className="form_grid_1">
                <div className="form__grid__1__content__1">
                  <h2>Identifications</h2>
                  <div className="content">
                    <div className='input__box'>
                      <label htmlFor="barcode">Bar Code <span className="optional">Optional</span></label>
                      <input type="text" {...register("barcode")}/>
                    </div>
                    <div className="box__row">
                      <div className='input__box'>
                        <label htmlFor="sku">Stock Keeping Units</label>
                        <input type="text" {...register("sku")}/>
                        {errors?.sku && <span className="errors">{errors?.sku?.message}</span>}
                      </div>
                      <div className='input__box'>
                        <label htmlFor="taxcode">Tax Code <span className="optional">Optional</span></label>
                        <input type="text" {...register("taxcode")}/>
                      </div>
                    </div>
                    <div className='input__box'>
                      <label htmlFor="slug">Slug <span className="optional">like:- cotton-men-shirt</span></label>
                      <input type="text" {...register("slug")}/>
                      {errors?.slug && <span className="errors">{errors?.slug?.message}</span>}
                    </div>
                  </div>
                </div>
                <div className="form__grid__1__content__1">
                  <h2>Sizes & Warranty</h2>
                  <div className="content">
                      <div className='input__box'>
                        <label htmlFor="size">Size <span className="optional">Optional</span></label>
                        <input type="text" id="size" {...register("size")}/>
                      </div>
                      <div className='input__box'>
                        <label htmlFor="warranty">warranty <span className="optional">Optional</span></label>
                        <input type="text" id="warranty" {...register("warranty")}/>
                      </div>
                      <div className='input__box'>
                        <label htmlFor="warrantyType">Warranty Type <span className="optional">Optional</span></label>
                        <select type="text" id="warrantyType" {...register("warrantyType")}>
                          <option value="month">Month</option>
                          <option value="year">Year</option>
                        </select>
                      </div>
                  </div>
                </div>
                <div className="form__grid__1__content__1">
                  <h2>Inventory</h2>
                  <div className="content">
                      <div className='input__box'>
                        <label htmlFor="stk">Stock</label>
                        <input type="number" id="stk" {...register("stock")}/>
                        {errors?.stock && <span className="errors">{errors?.stock?.message}</span>}
                      </div>
                      <div className='input__box'>
                        <label htmlFor="status">Status <span className="optional">Optional</span></label>
                        <select type="text" id="status" {...register("status")} defaultValue={"active"}>
                          <option value="draft">Draft</option>
                          <option value="active">Active</option>
                          <option value="outOfStock">Out Of Stock</option>
                          <option value="archived">Archived</option>
                          <option value="discontinued">Discontinued</option>
                        </select>
                      </div>
                  </div>
                </div>
                <div className="form__grid__1__content__1">
                  <h2>Dimension</h2>
                  <div className="content">
                  <div className="box__row">
                    <div className='input__box'>
                      <label htmlFor="w">Width <span className="optional">Optional</span></label>
                      <input type="number" id="w" {...register("dimension.width")}/>
                    </div>
                    <div className='input__box'>
                      <label htmlFor="h">Height <span className="optional">Optional</span></label>
                      <input type="number" id="h" {...register("dimension.height")}/>
                    </div>
                  </div>
                  <div className="box__row">
                  <div className='input__box'>
                      <label htmlFor="dpt">Depth <span className="optional">Optional</span></label>
                      <input type="number" id="dpt" {...register("dimension.depth")}/>
                    </div>
                    <div className='input__box'>
                      <label htmlFor="dt">Dimension Unit </label>
                        <select type="text" id="dt" {...register("dimension.dimensionUnit")} defaultValue={"cm"}>
                          <option value="cm">CM</option>
                          <option value="in">IN</option>
                        </select>
                    </div>
                  </div>
                  
                  <div className="box__row">
                    <div className='input__box'>
                      <label htmlFor="weight">Weight</label>
                      <input type="number" id="weight"  {...register("dimension.weightValue")}/>
                      {errors?.dimension?.weightValue && <span className="errors">{errors?.dimension?.weightValue?.message}</span>}
                    </div>
                    <div className='input__box'>
                      <label htmlFor="wu">Weight in Unit</label>
                      <select type="text" id="wu" {...register("dimension.weightUnit")} defaultValue={"g"}>
                        <option value="g">Gram</option>
                        <option value="kg">Kilogram</option>
                        <option value="oz">oz</option>
                        <option value="lb">lb</option>
                      </select>
                      {errors?.dimension?.weightUnit && <span className="errors">{errors?.dimension?.weightUnit?.message}</span>}
                    </div>
                  </div>
                  <div className='input__box'>
                    <label htmlFor="sp">Shipping Class <span className="optional">Optional</span></label>
                      <select type="text" id="sp" {...register("dimension.shippingClass")} defaultValue={"light"}>
                        <option value="light">Light</option>
                        <option value="fragile">Fragile</option>
                        <option value="standard">Standard</option>
                        <option value="fragileHeavy">Fragile Heavy</option>
                      </select>
                  </div>
                  </div>
                </div> 
              </div>

              <div className="form_grid_2">
                <div className="form__grid__2__content__1">
                  <h2>Basic Details</h2>
                  <div className="content">
                  <div className='input__box'>
                    <label htmlFor="barcode">Product Title</label>
                    <input 
                    type="text" 
                    {...register("title")}
                    />
                    {errors?.title && <span className="errors">{errors?.title?.message}</span>}
                  </div>
                  <div className="box__row">
                    <div className='input__box'>
                      <label htmlFor="brand">Brand <span className="optional">Optional</span></label>
                      <input type="text" id="brand"{...register("brand")}/>
                    </div>
                    <div className='input__box'>
                      <label htmlFor="colors">Product Color <span className="optional">Optional</span></label>
                      <input type="text" {...register("color")} placeholder="Correct color name"/>
                    </div>
                  </div>
                  <div className="box__row">
                    <div className='input__box'>
                      <label htmlFor="material">Material <span className="optional">Optional</span></label>
                      <input type="text" id="material"  {...register("material")}/>
                    </div>
                    <div className='input__box'>
                      <label htmlFor="origin">Origin <span className="optional">Optional</span></label>
                      <input type="text" id="origin"  {...register("origin")}/>
                    </div>
                  </div>
                  <div className="box__row">
                    <div className='input__box'>
                      <label htmlFor="sku">Collection</label>
                      <select type="text" id="collection" {...register("productCollection")}>
                        <option value="coll-1">coll 1</option>
                      </select>
                      {errors?.collection && <span className="errors">{errors?.collection?.message}</span>}
                    </div>
                    <div className='input__box'>
                      <label htmlFor="ct">Categories <span className="optional">Optional</span></label>
                      <select type="text" id="ct" {...register("categories")} >
                        {
                          categories?.map((item,i)=>(
                            <option key={i} value={item}>{item}</option>
                          ))
                        }
                      </select>
                      {errors?.categories && <span className="errors">{errors?.categories?.message}</span>}
                    </div>
                  </div>
                  <div className="box__row">
                    <div className='input__box'>
                      <label htmlFor="tag">Tags <span className="optional">Optional</span></label>
                      <div className="input_add_btn">
                        <input 
                          type="text" 
                          id="tag" 
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleEnterKeyTag}
                        />
                        <p className="add_button" onClick={()=>handleAddTag()}>Add</p>
                      </div>
                      <div className="array_main">
                      {
                        tags?.map((item,i)=>(
                          <div key={i} className="array_bg">
                            <p className="item">{item}</p>
                            <p className="remove" onClick={()=>removeTag(item)}>X</p>
                          </div>
                        ))
                      }
                      </div>
                    </div>
                    <div className='input__box input_add_btn'>
                      <label htmlFor="fe">Features <span className="optional">Optional</span></label>
                      <div className="input_add_btn">
                        <input 
                          type="text" 
                          id="fe" 
                          value={featureInput}
                          onChange={(e)=>setFeatureInput(e.target.value)}
                          onKeyDown={handleEnterKeyFeature}
                        />
                        <p className="add_button" onClick={()=>handleAddFeature()}>Add</p>
                      </div>
                      <div className="array_main">
                      {
                        features?.map((item,i)=>(
                          <div key={i} className="array_bg">
                            <p className="item">{item}</p>
                            <p className="remove" onClick={()=>removeFeature(item)}>X</p>
                          </div>
                        ))
                      }
                      </div>
                    </div>
                  </div>
                  <div className='input__box'>
                    <label htmlFor="d">Descriptions</label>
                    <textarea type="text" id="d" {...register("description")}/>
                    {errors?.description && <span className="errors">{errors?.description?.message}</span>}
                  </div>
                  </div>
                </div>   
                <div className="form__grid__2__content__1">
                  <h2>Pricing & Discount</h2>
                  <div className="content">
                  <div className="box__row">
                    <div className='input__box'>
                      <label htmlFor="sp">Selling Price</label>
                      <input type="number" id="sp" {...register("sellingPrice")}/>
                      {errors?.sellingPrice && <span className="errors">{errors?.sellingPrice?.message}</span>}
                    </div>
                    <div className='input__box'>
                      <label htmlFor="op">Original Price <span className="optional">Optional</span></label>
                      <input type="number" id="op" {...register("originalPrice")}/>
                    </div>
                  </div>
                  <div className='input__box'>
                    <label htmlFor="dt">Discount Title <span className="optional">Discount will be deducted from the selling price</span></label>
                    <input type="text" id="dt" {...register("discount.discountTitle")}/>
                  </div>
                  <div className="box__row">
                    <div className='input__box'>
                      <label htmlFor="da">Discount Amount <span className="optional">Optional</span></label>
                      <input type="number" id="da"  {...register("discount.discountAmount")}/>
                    </div>
                    <div className='input__box'>
                      <label htmlFor="dt">Discount Type <span className="optional">Optional</span></label>
                        <select type="text" id="dt" {...register("discount.discountType")} defaultValue={"percentage"}>
                          <option value="percentage">Percentage</option>
                          <option value="fixed">Fixed</option>
                        </select>
                    </div>
                    <div className="input__box">
                      <label htmlFor="end-date">Discount End Date <span className="optional">Optional</span></label>
                      <input
                        type="date"
                        name="date"
                        id="end-date"
                        value={endDate ? endDate.toISOString().slice(0, 10) : ""}
                        onChange={handleEndDateChange}
                      />
                    </div>
                  </div>
                  
                  </div>
                </div> 
                <div className="form__grid__2__content__1">
                  <div className="INP_IMG">
                    <div className="img__box">
                      {images &&
                        images?.map((item, i) => (
                          <div className="img" key={i}>
                            <img src={URL.createObjectURL(item)} alt="" />
                            <p className="delete" onClick={() => deleteImage(i)}>X</p>
                          </div>
                        ))}
                    </div>
                    {errors?.images?.message && <span className="errors">{errors.images.message}</span>}
                    <div className="input__box img__select__box">
                      <input
                        type="file"
                        id="upload"
                        multiple
                        onChange={handleImageChange}
                      />
                      <input type="hidden" {...register("images")} />
                      <label className="label" htmlFor="upload">
                        <AiOutlinePlusCircle size={30} color="#555" />
                        Choose Images
                      </label>
                    </div>
                  </div>
                </div>  
                <div className="form__grid__2__content__1 btn__box">
                <button type="submit" className="btn-main" style={isLoading ? {opacity: "50%"} : {opacity: "100%"}} disabled={isLoading ? true : false}>
                  Submit
                </button>
                </div>
              </div>
              
            </form>
     
          </div>
        </div>
      </div>
    </div>
  );
};


export default ShopCreateProduct;
