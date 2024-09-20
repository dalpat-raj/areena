import React, { useEffect, useState } from "react";
import DashboardSidebar from "../dashboardSidebar/DashboardSidebar";
import "./shopCreateProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AiOutlineEdit, AiOutlinePlusCircle } from "react-icons/ai";
import Loader from "../../layout/loader/Loader"
import { getAllColor } from "../../../actions/ColorAction";
import { createProduct, getAllProductsShop } from "../../../actions/productAction";
import axios from "axios";

const ShopCreateProduct = ({edit, setEdit, editProduct}) => {
  const { seller } = useSelector((state) => state.seller);
  const { colors } = useSelector((state) => state.colors);
  const {isLoading}  = useSelector((state)=>state.products)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(edit ? editProduct.name : "");
  const [brand, setBrand] = useState(edit ? editProduct.brand : "");
  const [size, setSize] = useState(edit ? editProduct.size : []);
  const [category, setCategory] = useState(edit ? editProduct.category : "");
  const [subCategory, setSubCategory] = useState(edit ? editProduct.subCategory : "");
  const [tags, setTags] = useState(edit ? editProduct.tags : "");
  const [color, setColor] = useState({
    name: edit ? editProduct.color.name : "",
    hex: edit ? editProduct.color.hex : "",
  });
  const [originalPrice, setOriginalPrice] = useState(edit ? editProduct.originalPrice : 0);
  const [sellingPrice, setSellingPrice] = useState(edit ? editProduct.sellingPrice : 0);
  const [stock, setStock] = useState(edit ? editProduct.stock : 10);
  const [description, setDescription] = useState(edit ? editProduct.description : "");
  const [active, setActive] = useState(false);
  const [images, setImages] = useState([]);
 
  
  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const [otherDetails, setOtherDetails] = useState({
    display: edit ? editProduct?.details?.display : "",
    ram: edit ? editProduct?.details?.ram : "",
    storage: edit ? editProduct?.details?.storage : "",
    camera: edit ? editProduct?.details?.camera : "",
    manufacturer: edit ? editProduct?.details?.manufacturer : "",
    weight: edit ? editProduct?.details?.weight : "",
    warranty: edit ? editProduct?.details?.warranty : "",
    guarantee: edit ? editProduct?.details?.guarantee : "",
    dimensions: edit ? editProduct?.details?.dimensions : "",
    modelno: edit ? editProduct?.details?.modelno : "",
    origin: edit ? editProduct?.details?.origin : "",
    salesPackage: edit ? editProduct?.details?.salesPackage : "",
    headPhoneType: edit ? editProduct?.details?.headPhoneType : "",
    connectivity: edit ? editProduct?.details?.connectivity : "",
    fabric: edit ? editProduct?.details?.fabric : "",
    sleeve: edit ? editProduct?.details?.sleeve : "",
    pattern: edit ? editProduct?.details?.pattern : "",
    fit: edit ? editProduct?.details?.fit : "",
    pocketType: edit ? editProduct?.details?.pocketType : "",
    occasion: edit ? editProduct?.details?.occasion : "",
    material: edit ? editProduct?.details?.material : "",
    numberOfPockets: edit ? editProduct?.details?.numberOfPockets : "",
    withRainCover: edit ? editProduct?.details?.withRainCover : "",
    withTrolleySupport: edit ? editProduct?.details?.withTrolleySupport : "",
    laptopSleeve: edit ? editProduct?.details?.laptopSleeve : "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("brand", brand);
    newForm.append("size", JSON.stringify(size));
    newForm.append("category", category);
    newForm.append("subCategory", subCategory);
    newForm.append("tags", tags);
    newForm.append("color", JSON.stringify(color));
    newForm.append("originalPrice", originalPrice);
    newForm.append("sellingPrice", sellingPrice);
    newForm.append("stock", stock);
    newForm.append("description", description);
    newForm.append("shopId", seller?._id);
    newForm.append("details", JSON.stringify(otherDetails));
    dispatch(createProduct(newForm))

    alert("Product Created !");
    navigate("/shop-dashboard/products");  
  };

  const EditProductSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("brand", brand);
    newForm.append("size", JSON.stringify(size));
    newForm.append("category", category);
    newForm.append("subCategory", subCategory);
    newForm.append("tags", tags);
    newForm.append("color", JSON.stringify(color));
    newForm.append("originalPrice", originalPrice);
    newForm.append("sellingPrice", sellingPrice);
    newForm.append("stock", stock);
    newForm.append("description", description);
    newForm.append("shopId", seller?._id);
    newForm.append("details", JSON.stringify(otherDetails));

    await axios.put(`/api/v2/edit-shop-product/${editProduct?._id}`, newForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }).then((res)=>{
      dispatch(getAllProductsShop(seller?._id));
      alert('Product Edited')
      setEdit(false)
    }).catch((err)=>{
      console.log(err);
      
    })
  }

  const categoriesData = [
    { title: "Baby & Child" },
    { title: "Beauty" },
    { title: "Book" },
    { title: "Bag & Luggage" },
    { title: "Clothing & Accessories" },
    { title: "Computer & Accessories" },
    { title: "Electronic" },
    { title: "Furniture" },
    { title: "Groceries" },
    { title: "Helth & Personal Care" },
    { title: "Home & Kitchen" },
    { title: "Jewellery" },
    { title: "Mobile & Accessories" },
    { title: "Office Product" },
    { title: "Shoes & Sandler" },
    { title: "Watches" },
  ];

  const sizeData = [
    {size: "S"},
    {size: "L"},
    {size: "M"},
    {size: "XL"},
    {size: "XXL"},
    {size: "6"},
    {size: "7"},
    {size: "8"},
    {size: "9"},
    {size: "10"},
    {size: "11"},
    {size: "12"},
    {size: "13"},
    {size: "14"},
    {size: "15"},
    {size: "16"},
    {size: "17"},
    {size: "18"},
    {size: "19"},
    {size: "20"},
    {size: "21"},
    {size: "22"},
    {size: "23"},
    {size: "24"},
    {size: "25"},
    {size: "26"},
    {size: "27"},
    {size: "28"},
    {size: "30"},
    {size: "32"},
    {size: "34"},
    {size: "36"},
    {size: "38"},
    {size: "40"},
    {size: "42"},
    {size: "44"},
    {size: "46"},
    {size: "48"},
    {size: "50"},
  ];

  const colorHandler = (e) => {
    let raj = JSON.parse(e.target.value);
    setColor({
      ...color,
      name: raj.name,
      hex: raj.hex,
    });
  };

  useEffect(() => {
    dispatch(getAllColor());
  }, [dispatch]);


  return (
    <div className="dashboard__container">
      <div className="container">
        <div className={!edit && "dashboard__row"} >
          {
            !edit && (
              <div className="col__2 dashboard__sidebar">
                <DashboardSidebar active={4} />
              </div>
            )
          }

          <div className="col__2 dashboard_create_product" >
          {
            isLoading ? (
              <Loader />
            ) : (
              <>
            <div className="heading">
              <AiOutlineEdit size={25} />
              <h2>Create Product</h2>
            </div>
            <form onSubmit={edit ? EditProductSubmit : handleSubmit}>
              <div className="input__box">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Enter Product Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input__box">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={brand}
                  placeholder="Enter Product Name"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              <div className="input__box">
                <label htmlFor="color">Color</label>
                <select
                  id="color"
                  value={color?.name}
                  onChange={(e) => colorHandler(e)}
                >
                  <option value="Choose color">{color?.name}</option>
                  {colors &&
                    colors.map((item, i) => (
                      <option
                        value={JSON.stringify(item)}
                        key={i}
                      >
                        {item?.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="input__box">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Choose a category">Choose a category</option>
                  {categoriesData &&
                    categoriesData.map((item, i) => (
                      <option value={item.title} key={i}>
                        {item.title}
                      </option>
                    ))}
                </select>
              </div>

              {category === "Baby & Child" && <></>}
              {category === "Beauty" && <></>}
              {category === "Book" && <></>}
              {category === "Bag & Luggage" && (
                <>
                  <BagDetails
                    otherDetails={otherDetails}
                    setOtherDetails={setOtherDetails}
                  />
                </>
              )}
              {category === "Clothing & Accessories" && (
                <>
                  <div className="input__box">
                    <label htmlFor="category">Choose Type</label>
                    <select
                      id="category"
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                    >
                      <option value="Choose a Type">Choose type</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Child">Child</option>
                    </select>
                  </div>
                  {subCategory === "Men" ||
                  subCategory === "Women" ||
                  subCategory === "Child" ? (
                    <ClothingDetails
                      subCategory={subCategory}
                      otherDetails={otherDetails}
                      setOtherDetails={setOtherDetails}
                      size={size}
                      setSize={setSize}
                      sizeData={sizeData}
                      active={active}
                      setActive={setActive}
                    />
                  ) : null}
                </>
              )}
              {category === "Computer & Accessories" && <></>}
              {category === "Electronic" && <></>}
              {category === "Furniture" && <></>}
              {category === "Helth & Personal Care" && <></>}
              {category === "Home & Kitchen" && <></>}
              {category === "Jewellery" && <></>}
              {category === "Mobile & Accessories" && (
                <>
                  <div className="input__box">
                    <label htmlFor="category">Choose Type</label>
                    <select
                      id="category"
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                    >
                      <option value="Choose a Type">Choose type</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Tablet">Tablet</option>
                      <option value="HeadPhone">HeadPhone</option>
                    </select>
                  </div>
                  {subCategory === "Mobile" ||
                  subCategory === "Tablet" ||
                  subCategory === "HeadPhone" ? (
                    <MobileDetails
                      subCategory={subCategory}
                      otherDetails={otherDetails}
                      setOtherDetails={setOtherDetails}
                    />
                  ) : null}
                </>
              )}
              {category === "Office Product" && <></>}
              {category === "Shoes & Sandler" && (
                <>
                  <ShoesDetails
                    size={size}
                    setSize={setSize}
                    sizeData={sizeData}
                    active={active}
                    setActive={setActive}
                  />
                </>
              )}
              {category === "Watches" && <></>}

              <div className="input__box">
                <label htmlFor="tags">
                  Tags <span className="optional">(optional)</span>
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={tags}
                  placeholder="Enter Product Tags"
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              <div className="input__box">
                <label htmlFor="oprice">Original Price</label>
                <input
                  type="number"
                  id="oprice"
                  name="originalPrice"
                  value={originalPrice}
                  placeholder="Enter Product Price"
                  onChange={(e) => setOriginalPrice(e.target.value)}
                />
              </div>

              <div className="input__box">
                <label htmlFor="dprice">Selling Price</label>
                <input
                  type="number"
                  id="dprice"
                  name="sellingPrice"
                  value={sellingPrice}
                  placeholder="Enter Your Selling Price"
                  onChange={(e) => setSellingPrice(e.target.value)}
                />
              </div>

              <div className="input__box">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={stock}
                  placeholder="Enter Product Stock"
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="input__box">
                <label htmlFor="display">
                  Item model number <span className="optional">(optional)</span>
                </label>
                <input
                  type="text"
                  id="Item model number"
                  name="Item model number"
                  value={otherDetails?.modelno}
                  placeholder="Enter Product Guarantee"
                  onChange={(e) =>
                    setOtherDetails({
                      ...otherDetails,
                      modelno: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input__box">
                <label htmlFor="display">
                  Guarantee <span className="optional">(optional)</span>
                </label>
                <input
                  type="text"
                  id="guarantee"
                  name="guarantee"
                  value={otherDetails?.guarantee}
                  placeholder="Enter Product Guarantee"
                  onChange={(e) =>
                    setOtherDetails({
                      ...otherDetails,
                      guarantee: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input__box">
                <label htmlFor="display">
                  Warranty <span className="optional">(optional)</span>
                </label>
                <input
                  type="text"
                  id="warranty"
                  name="warranty"
                  value={otherDetails?.warranty}
                  placeholder="Enter warranty"
                  onChange={(e) =>
                    setOtherDetails({
                      ...otherDetails,
                      warranty: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input__box">
                <label htmlFor="display">
                  Weight <span className="optional">(optional)</span>
                </label>
                <input
                  type="text"
                  id="Weight"
                  name="Weight"
                  value={otherDetails?.weight}
                  placeholder="Enter Product Weight"
                  onChange={(e) =>
                    setOtherDetails({ ...otherDetails, weight: e.target.value })
                  }
                />
              </div>
              <div className="input__box">
                <label htmlFor="display">Manufacturer </label>
                <input
                  type="text"
                  id="Weight"
                  name="Weight"
                  value={otherDetails?.manufacturer}
                  placeholder="Enter Product Manufacturer"
                  onChange={(e) =>
                    setOtherDetails({
                      ...otherDetails,
                      manufacturer: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input__box">
                <label htmlFor="display">Product Dimensions</label>
                <input
                  type="text"
                  id="Weight"
                  name="Weight"
                  value={otherDetails?.dimensions}
                  placeholder="Enter Product Dimensions"
                  onChange={(e) =>
                    setOtherDetails({
                      ...otherDetails,
                      dimensions: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input__box">
                <label htmlFor="display">
                  Country of Origin <span className="optional">(optional)</span>
                </label>
                <input
                  type="text"
                  id="Weight"
                  name="Weight"
                  value={otherDetails?.origin}
                  placeholder="Enter Country of Origin"
                  onChange={(e) =>
                    setOtherDetails({ ...otherDetails, origin: e.target.value })
                  }
                />
              </div>
              <div className="input__box">
                <label htmlFor="display">
                  Sales Package <span className="optional">(optional)</span>
                </label>
                <input
                  type="text"
                  id="Weight"
                  name="Weight"
                  value={otherDetails?.salesPackage}
                  placeholder="Enter Sales Package Box Item's"
                  onChange={(e) =>
                    setOtherDetails({
                      ...otherDetails,
                      salesPackage: e.target.value,
                    })
                  }
                />
              </div>

              <div className="INP_IMG">
                <div className="input__box">
                  <label>Uploads Images</label>
                  <input
                    type="file"
                    id="upload"
                    multiple={true}
                    onChange={handleImageChange}
                  />
                  <label className="label" htmlFor="upload">
                    <AiOutlinePlusCircle size={30} color="#555" />
                    Choose Images
                  </label>
                </div>
                <div className="img__box">
                  {
                    images?.map((i) => 
                      <img src={URL.createObjectURL(i)} key={i} alt="" />
                  )}
                </div>
              </div>

              <div className="input__box description_full">
                <label htmlFor="description">Description</label>
                <textarea
                  rows={8}
                  cols={30}
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  placeholder="Enter Product Descriptions"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="btn__box">
                {
                  edit ? (
                    <button type="submit" className="btn-main">
                      Edit Product
                    </button>
                  ) : (
                    <button type="submit" className="btn-main">
                      Submit
                    </button>
                  )
                }
              </div>
            </form>
            </>
            )
          }
          </div>
        </div>
      </div>
    </div>
  );
};

const BagDetails = ({ otherDetails, setOtherDetails }) => {
  return (
    <>
      <div className="input__box">
        <label htmlFor="display">
          Material <span className="optional">(optional)</span>
        </label>
        <input
          type="text"
          id="display"
          name="display"
          value={otherDetails?.material}
          placeholder="bag material"
          onChange={(e) =>
            setOtherDetails({ ...otherDetails, material: e.target.value })
          }
        />
      </div>
      <div className="input__box">
        <label htmlFor="display">
          Number Of Pockets <span className="optional">(optional)</span>
        </label>
        <input
          type="text"
          id="display"
          name="display"
          value={otherDetails?.numberOfPockets}
          placeholder="enter number of pocket"
          onChange={(e) =>
            setOtherDetails({
              ...otherDetails,
              numberOfPockets: e.target.value,
            })
          }
        />
      </div>
      <div className="input__box">
        <label htmlFor="display">
          With Rain Cover <span className="optional">(optional)</span>
        </label>
        <input
          type="text"
          id="display"
          name="display"
          value={otherDetails?.withRainCover}
          placeholder="with rain cover"
          onChange={(e) =>
            setOtherDetails({ ...otherDetails, withRainCover: e.target.value })
          }
        />
      </div>
      <div className="input__box">
        <label htmlFor="display">
          With Trolley Support <span className="optional">(optional)</span>
        </label>
        <input
          type="text"
          id="display"
          name="display"
          value={otherDetails?.withTrolleySupport}
          placeholder="with rain cover"
          onChange={(e) =>
            setOtherDetails({
              ...otherDetails,
              withTrolleySupport: e.target.value,
            })
          }
        />
      </div>
      <div className="input__box">
        <label htmlFor="display">
          Laptop Sleeve <span className="optional">(optional)</span>
        </label>
        <input
          type="text"
          id="display"
          name="display"
          value={otherDetails?.laptopSleeve}
          placeholder="laptop sleeve"
          onChange={(e) =>
            setOtherDetails({ ...otherDetails, laptopSleeve: e.target.value })
          }
        />
      </div>
    </>
  );
};

const MobileDetails = ({ subCategory, otherDetails, setOtherDetails }) => {
  return (
    <>
      {subCategory === "Mobile" || subCategory === "Tablet" ? (
        <>
          <div className="input__box">
            <label htmlFor="display">Display</label>
            <input
              type="text"
              id="display"
              name="display"
              value={otherDetails?.display}
              placeholder="Enter Product Descriptions"
              onChange={(e) =>
                setOtherDetails({ ...otherDetails, display: e.target.value })
              }
            />
          </div>
          <div className="input__box">
            <label htmlFor="display">Camera</label>
            <input
              type="text"
              id="camera"
              name="camera"
              value={otherDetails?.camera}
              placeholder="Enter Product camera"
              onChange={(e) =>
                setOtherDetails({ ...otherDetails, camera: e.target.value })
              }
            />
          </div>
          <div className="input__box">
            <label htmlFor="display">Ram</label>
            <input
              type="text"
              id="display"
              name="display"
              value={otherDetails?.ram}
              placeholder="Enter ram"
              onChange={(e) =>
                setOtherDetails({ ...otherDetails, ram: e.target.value })
              }
            />
          </div>
          <div className="input__box">
            <label htmlFor="display">Storage</label>
            <input
              type="text"
              id="storage"
              name="storage"
              value={otherDetails?.storage}
              placeholder="Enter Product storage"
              onChange={(e) =>
                setOtherDetails({ ...otherDetails, storage: e.target.value })
              }
            />
          </div>
        </>
      ) : null}
      {subCategory === "HeadPhone" ? (
        <>
          <div className="input__box">
            <label htmlFor="display">HeadPhone Type</label>
            <input
              type="text"
              id="display"
              name="display"
              value={otherDetails?.headPhoneType}
              placeholder="Enter type"
              onChange={(e) =>
                setOtherDetails({
                  ...otherDetails,
                  headPhoneType: e.target.value,
                })
              }
            />
          </div>
          <div className="input__box">
            <label htmlFor="display">
              Connectivity <span className="optional">(optional)</span>
            </label>
            <input
              type="text"
              id="display"
              name="display"
              value={otherDetails?.connectivity}
              placeholder="connectivity"
              onChange={(e) =>
                setOtherDetails({
                  ...otherDetails,
                  connectivity: e.target.value,
                })
              }
            />
          </div>
        </>
      ) : null}
    </>
  );
};

const ClothingDetails = ({
  subCategory,
  otherDetails,
  setOtherDetails,
  size,
  setSize,
  sizeData,
  active,
  setActive,
}) => {
console.log(size);
  return (
    <>
      <div className="input__box">
        <label htmlFor="display">Size</label>
        <div className="select__size" onClick={() => setActive(!active)}>
          {size?.length !== 0 ? (
            size?.map((item, i) => <span key={i}>{item}</span>)
          ) : (
            <span className="no__select">
              Select size
            </span>
          )}
        </div>
        {active && (
          <div className="size__row">
            {sizeData &&
              sizeData?.map((item, i) => (
                <span
                  onClick={(e) => setSize((prev)=>[...prev, item.size])}
                  value={item?.size}
                  key={i}
                >
                  {item.size}
                </span>
              ))}
          </div>
        )}
      </div>
      {subCategory === "Men" || subCategory === "Women" ? (
        <>
          <div className="input__box" onClick={()=>setActive(false)}>
            <label htmlFor="display">
              Fabric <span className="optional">(optional)</span>
            </label>
            <input
              type="text"
              id="display"
              name="display"
              value={otherDetails?.fabric}
              placeholder="shit fabric"
              onChange={(e) =>
                setOtherDetails({ ...otherDetails, fabric: e.target.value })
              }
            />
          </div>
          <div className="input__box" onClick={()=>setActive(false)}>
            <label htmlFor="display">
              Sleeve <span className="optional">(optional)</span>
            </label>
            <input
              type="text"
              id="display"
              name="display"
              value={otherDetails?.sleeve}
              placeholder="sleeve"
              onChange={(e) =>
                setOtherDetails({ ...otherDetails, sleeve: e.target.value })
              }
            />
          </div>
          <div className="input__box">
            <label htmlFor="display">
              Pattern <span className="optional">(optional)</span>
            </label>
            <input
              type="text"
              id="display"
              name="display"
              value={otherDetails?.pattern}
              placeholder="sleeve"
              onChange={(e) =>
                setOtherDetails({ ...otherDetails, pattern: e.target.value })
              }
            />
          </div>
          <div className="input__box">
            <label htmlFor="display">
              Fit <span className="optional">(optional)</span>
            </label>
            <input
              type="text"
              id="display"
              name="display"
              value={otherDetails?.fit}
              placeholder="sleeve"
              onChange={(e) =>
                setOtherDetails({ ...otherDetails, fit: e.target.value })
              }
            />
          </div>
          <div className="input__box">
            <label htmlFor="display">
              Pocket Type <span className="optional">(optional)</span>
            </label>
            <input
              type="text"
              id="display"
              name="display"
              value={otherDetails?.pocketType}
              placeholder="Pocket Type"
              onChange={(e) =>
                setOtherDetails({ ...otherDetails, pocketType: e.target.value })
              }
            />
          </div>
          <div className="input__box">
            <label htmlFor="display">
              Occasion <span className="optional">(optional)</span>
            </label>
            <input
              type="text"
              id="display"
              name="display"
              value={otherDetails?.occasion}
              placeholder="enter occasion"
              onChange={(e) =>
                setOtherDetails({ ...otherDetails, occasion: e.target.value })
              }
            />
          </div>
        </>
      ) : null}
    </>
  );
};

const ShoesDetails = ({ size, setSize, sizeData, active, setActive}) => {
  return (
    <>
     <div className="input__box">
        <label htmlFor="display">Size</label>
        <div className="select__size" onClick={() => setActive(!active)}>
          {size?.length !== 0 ? (
            size?.map((item, i) => <span key={i}>{item}</span>)
          ) : (
            <span className="no__select">
              Select size
            </span>
          )}
        </div>
        {active && (
          <div className="size__row">
            {sizeData &&
              sizeData?.map((item, i) => (
                <span
                  onClick={(e) => setSize((prev)=>[...prev, item.size])}
                  value={item?.size}
                  key={i}
                >
                  {item.size}
                </span>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ShopCreateProduct;
