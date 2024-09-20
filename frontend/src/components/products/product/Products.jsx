import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { gridOutline, listOutline } from "ionicons/icons";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import "./products.scss";
import FilterSidebar from "../filterSidebar/FilterSidebar";
import ProductCard from "../../home/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layout/loader/Loader";
import { getProduct } from "../../../actions/productAction";
import Pagination from "react-js-pagination";
import axios from "axios";
// import { useParams, useSearchParams } from "react-router-dom";

const Products = () => {
  const { products, productsCount, isLoading } =
    useSelector((state) => state.products);
  
  const [sortBy, setSortBy] = useState("");
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState([0, 80000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(80000);
  const [page, setPage] = useState(1);

  const [filterBar, setFilterBar] = useState(false)

  const limit = 100;
  const dispatch = useDispatch();

  const handleClear=()=>{
    setMinPrice(0);
    setMaxPrice(80000);
    setSortBy("");
    setCategory("")
    setBrand("")
    setSize("")
    setColor("")
    setFilterBar(false)
  }

  useEffect(() => {
    setData(products);
  }, [products]);

  useEffect(() => {
    setMinPrice(price[0]);
    setMaxPrice(price[1]);
  }, [price]);

  useEffect(() => {
    axios
      .get(`/api/v2/products?fields=category`)
      .then((res) => {
        const result = new Set(res.data.product.map((item) => item.category));
        setCategoryData(Array.from(result));
      })
      .catch((error) => {
        alert(error?.response?.data?.error?.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/v2/products?fields=brand`)
      .then((res) => {
        const result = new Set(res.data.product.map((item) => item.brand));
        setBrandData(Array.from(result));
      })
      .catch((error) => {
        alert(error?.response?.data?.error?.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/v2/products?fields=size`)
      .then((res) => {
        let arrd = []
        res.data.product.map((item,i) =>arrd.push(...item.size));
        arrd = new Set(arrd)
        setSizeData(Array.from(arrd))
      })
      .catch((error) => {
        alert(error?.response?.data?.error?.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/v2/products?fields=color`)
      .then((res) => {
        const result = new Set(res.data.product.map((item) => item.color));
        setColorData(Array.from(result));
      })
      .catch((error) => {
        alert(error?.response?.data?.error?.message);
      });
  }, []);

  useEffect(() => {
    dispatch(
      getProduct(
        limit,
        page,
        minPrice,
        maxPrice,
        sortBy,
        category,
        brand,
        size,
        color
      )
    );
  }, [
    limit,
    page,
    category,
    sortBy,
    minPrice,
    maxPrice,
    dispatch,
    brand,
    size,
    color,
  ]);

  return (
    <div className="product__container">
      <img width={"100%"} src="/arrival.webp" alt="arrival" />
      <div className="container">
        <div className="product__row">
          <div className={filterBar ? "filter__sidebar active" : "filter__sidebar"}>
            <FilterSidebar
              categoryData={categoryData}
              setCategory={setCategory}
              colorData={colorData}
              brandData={brandData}
              setColor={setColor}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setPrice={setPrice}
              setBrand={setBrand}
              sizeData={sizeData}
              setSize={setSize}
              setFilterBar={setFilterBar}
              handleClear={handleClear}
            />
          </div>

          <div className="product__bar">
            {/* top filter  */}
            <div className="top__filter">
              <div className="filter__open__icon" onClick={()=>setFilterBar(true)}>
                <HiAdjustmentsHorizontal />
                <span>Filter</span>
              </div>
              <div className="total__items">
                <span>{productsCount && productsCount} items</span>
              </div>
              <div className="top__right__filter">
                <div className="grid__icon">
                  <IonIcon icon={gridOutline} />
                </div>
                <div className="list__icon">
                  <IonIcon icon={listOutline} />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Sort</option>
                  <option value="sellingPrice">Price -- Low to High</option>
                  <option value="-sellingPrice">Price -- High to Low</option>
                  <option value="name">A to Z</option>
                  <option value="-name">Z to A</option>
                </select>
              </div>
            </div>

            {/* product show  */}
            {isLoading ? (
              <Loader />
            ) : (
              <div className="product__containers">
                {
                  data?.length === 0 ? (
                    <div className="no__products">
                      <p>No Products Available !</p>
                    </div>
                  ) : (
                    <div className="products__row">
                  {data &&
                    data?.map((item, i) => (
                      <ProductCard products={item} key={i} />
                    ))}
                </div>
                  ) 
                }
              </div>
            )}

            {
              productsCount && productsCount > 100 && (
                <div className="pagination">
                <Pagination
                  activePage={page}
                  itemsCountPerPage={limit}
                  totalItemsCount={productsCount}
                  onChange={setPage}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
              )
            }
          </div>

        </div>
      </div>
    </div>
  );
};

export default Products;
