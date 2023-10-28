import React, { useState } from "react";
import DashboardSidebar from "../../dashboardSidebar/DashboardSidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import "./shopCreateEvent.scss";
import axios from "axios";

const ShopCreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [sellingPrice, setSellingPrice] = useState();
  const [stock, setStock] = useState();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate.toISOString().slice(0,10);
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";

  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });

    newForm.append("name", name);
    newForm.append("brand", brand);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("sellingPrice", sellingPrice);
    newForm.append("stock", stock);
    newForm.append("description", description);
    newForm.append("shopId", seller?._id);
    newForm.append("start_date", startDate?.toISOString());
    newForm.append("end_date", endDate?.toISOString());

    // dispatch(createEvent(newForm));

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    await axios
      .post(`/event-create`, newForm, config)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          navigate("/shop-dashboard-events");
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error?.message);
      });
  };

  const categoriesData = [
    { title: "Mobile" },
    { title: "Shoose" },
    { title: "Asseccrios" },
    { title: "Dress" },
  ];

  return (
    <div className="dashboard__container">
      <div className="container">
        <div className="dashboard__row">
          <div className="col__2 dashboard__sidebar">
            <DashboardSidebar active={6} />
          </div>
          <div className="col__2 dashboard_create_product">
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
              <div className="input__box">
                <label htmlFor="name">Event Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Enter Event Name"
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

              <div className="input__box">
                <label htmlFor="tags">Tags</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={tags}
                  placeholder="Enter Event product Tags"
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
                  placeholder="Enter Event product Price"
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
                  placeholder="Enter Event Product Stock"
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="input__box">
                <label htmlFor="start-date">Start Date</label>
                <input
                  type="date"
                  name="price"
                  id="start-date"
                  value={startDate ? startDate.toISOString().slice(0, 10) : ""}
                  onChange={handleStartDateChange}
                  min={today}
                  placeholder="Enter your event product stock..."
                />
              </div>

              <div className="input__box">
                <label htmlFor="start-date">Event End Date</label>
                <input
                  type="date"
                  name="price"
                  id="end-date"
                  value={endDate ? endDate.toISOString().slice(0, 10) : ""}
                  onChange={handleEndDateChange}
                  min={minEndDate}
                  placeholder="Enter your event product stock..."
                />
              </div>

              <div className="input__box image__shoes">
                <label>Uploads Images</label>
                <div className="img__box">
                  {images &&
                    images.map((i) => (
                      <img src={URL.createObjectURL(i)} key={i} alt="" />
                    ))}
                </div>
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

              <div className="input__box">
                <label htmlFor="description">Description</label>
                <textarea
                  rows={8}
                  cols={30}
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  placeholder="Enter Event Product Descriptions"
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

export default ShopCreateEvent;
