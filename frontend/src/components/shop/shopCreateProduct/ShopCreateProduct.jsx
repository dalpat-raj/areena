import React, { useEffect, useState } from "react";
import DashboardSidebar from "../dashboardSidebar/DashboardSidebar";
import "./shopCreateProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../../Server";
import { getAllColor } from "../../../actions/ColorAction";

const ShopCreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { colors } = useSelector((state) => state.colors);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [color, setColor] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [sellingPrice, setSellingPrice] = useState();
  const [stock, setStock] = useState();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const [subCategory, setSubCategory] = useState("");

  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const [mobileTablet, setMobileTablet] = useState({
    display: "",
    ram: "",
    storage: "",
    camera: "",
    manufacturer: "",
    weight: "",
    warranty: "",
    guarantee: "",
    dimensions: "",
    modelno: "",
    origin: "",
  });

  if (mobileTablet) {
    console.log(mobileTablet.length);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("brand", brand);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("color", color);
    newForm.append("originalPrice", originalPrice);
    newForm.append("sellingPrice", sellingPrice);
    newForm.append("stock", stock);
    newForm.append("description", description);
    newForm.append("shopId", seller?._id);
    newForm.append("details", JSON.stringify(mobileTablet));

    await axios
      .post(`${server}/create-product`, newForm, config)
      .then((res) => {
        if (res.data.success) {
          toast.success("Product Created!");
          navigate("/shop-dashboard/products");
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error?.message);
      });
  };

  const categoriesData = [
    { title: "Baby" },
    { title: "Beauty" },
    { title: "Book" },
    { title: "Bag & luggage" },
    { title: "Clothing & Accessories" },
    { title: "Computer & Accessories" },
    { title: "Electronic" },
    { title: "Furniture" },
    { title: "Helth & Personal Care" },
    { title: "Home & Kitchen" },
    { title: "Jewellery" },
    { title: "Mobile & Accessories" },
    { title: "Office Products" },
    { title: "Shoes" },
    { title: "Watches" },
  ];

  useEffect(() => {
    dispatch(getAllColor());
  }, [dispatch]);
  return (
    <div className="dashboard__container">
      <div className="container">
        <div className="dashboard__row">
          <div className="col__2 dashboard__sidebar">
            <DashboardSidebar active={4} />
          </div>
          <div className="col__2 dashboard_create_product">
            <h2>Create Product</h2>
            <form onSubmit={handleSubmit}>
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

              {category === "Baby" && <></>}
              {category === "Beauty" && <></>}
              {category === "Book" && <></>}
              {category === "Bag & luggage" && <></>}
              {category === "Clothing & Accessories" && <></>}
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
                    <MobileTablet
                      subCategory={subCategory}
                      mobileTablet={mobileTablet}
                      setMobileTablet={setMobileTablet}
                    />
                  ) : null}
                </>
              )}

              {category === "Office Products" && <></>}
              {category === "Shoes" && <></>}
              {category === "Watches" && <></>}

              <div className="input__box">
                <label htmlFor="color">Color</label>
                <select
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="Choose color">Choose color</option>
                  {colors &&
                    colors.map((item, i) => (
                      <option value={item.name} key={i}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="input__box">
                <label htmlFor="tags">Tags</label>
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
                <label htmlFor="display">Item model number</label>
                <input
                  type="text"
                  id="Item model number"
                  name="Item model number"
                  value={mobileTablet?.modelno}
                  placeholder="Enter Product Guarantee"
                  onChange={(e) =>
                    setMobileTablet({
                      ...mobileTablet,
                      modelno: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input__box">
                <label htmlFor="display">Guarantee</label>
                <input
                  type="text"
                  id="guarantee"
                  name="guarantee"
                  value={mobileTablet?.guarantee}
                  placeholder="Enter Product Guarantee"
                  onChange={(e) =>
                    setMobileTablet({
                      ...mobileTablet,
                      guarantee: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input__box">
                <label htmlFor="display">Warranty</label>
                <input
                  type="text"
                  id="warranty"
                  name="warranty"
                  value={mobileTablet?.warranty}
                  placeholder="Enter warranty"
                  onChange={(e) =>
                    setMobileTablet({
                      ...mobileTablet,
                      warranty: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input__box">
                <label htmlFor="display">Weight</label>
                <input
                  type="text"
                  id="Weight"
                  name="Weight"
                  value={mobileTablet?.weight}
                  placeholder="Enter Product Weight"
                  onChange={(e) =>
                    setMobileTablet({ ...mobileTablet, weight: e.target.value })
                  }
                />
              </div>
              <div className="input__box">
                <label htmlFor="display">Manufacturer</label>
                <input
                  type="text"
                  id="Weight"
                  name="Weight"
                  value={mobileTablet?.manufacturer}
                  placeholder="Enter Product Manufacturer"
                  onChange={(e) =>
                    setMobileTablet({
                      ...mobileTablet,
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
                  value={mobileTablet?.dimensions}
                  placeholder="Enter Product Dimensions"
                  onChange={(e) =>
                    setMobileTablet({
                      ...mobileTablet,
                      dimensions: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input__box">
                <label htmlFor="display">Country of Origin</label>
                <input
                  type="text"
                  id="Weight"
                  name="Weight"
                  value={mobileTablet?.origin}
                  placeholder="Enter Country of Origin"
                  onChange={(e) =>
                    setMobileTablet({ ...mobileTablet, origin: e.target.value })
                  }
                />
              </div>

              <div className="input__box">
                <label>Uploads Images</label>
                <div className="box_ab">
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
                {images &&
                  images.map((i) => (
                      <img src={URL.createObjectURL(i)} key={i} alt="" />
                      ))}
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
                <button type="submit" className="btn-main">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileTablet = ({ subCategory, mobileTablet, setMobileTablet }) => {
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
              value={mobileTablet?.display}
              placeholder="Enter Product Descriptions"
              onChange={(e) =>
                setMobileTablet({ ...mobileTablet, display: e.target.value })
              }
            />
          </div>
          <div className="input__box">
            <label htmlFor="display">Camera</label>
            <input
              type="text"
              id="camera"
              name="camera"
              value={mobileTablet?.camera}
              placeholder="Enter Product camera"
              onChange={(e) =>
                setMobileTablet({ ...mobileTablet, camera: e.target.value })
              }
            />
          </div>
          <div className="input__box">
            <label htmlFor="display">Ram</label>
            <input
              type="text"
              id="display"
              name="display"
              value={mobileTablet?.ram}
              placeholder="Enter ram"
              onChange={(e) =>
                setMobileTablet({ ...mobileTablet, ram: e.target.value })
              }
            />
          </div>
          <div className="input__box">
            <label htmlFor="display">Storage</label>
            <input
              type="text"
              id="storage"
              name="storage"
              value={mobileTablet?.storage}
              placeholder="Enter Product storage"
              onChange={(e) =>
                setMobileTablet({ ...mobileTablet, storage: e.target.value })
              }
            />
          </div>
        </>
      ) : null}
      {subCategory === "HeadPhone" ? (
        <div className="input__box">
          <label htmlFor="display">access</label>
          <input
            type="text"
            id="display"
            name="display"
            value={mobileTablet?.display}
            placeholder="Enter Product Descriptions"
            onChange={(e) =>
              setMobileTablet({ ...mobileTablet, display: e.target.value })
            }
          />
        </div>
      ) : null}
    </>
  );
};

export default ShopCreateProduct;
