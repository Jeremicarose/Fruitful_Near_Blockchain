import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddProduct from "./AddProduct";
import Product from "./Product";
import Loader from "../util/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../util/Notifications";
import {
  getProducts as getProductList,
  buyProduct,
  createProduct,
} from "../utils/marketplace";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      setProducts(await getProductList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const addProduct = async (data) => {
    try {
      setLoading(true);
      createProduct(data).then((resp) => {
        getProducts();
      });
      toast(<NotificationSuccess text="Product added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a product." />);
    } finally {
      setLoading(false);
    }
  };

  const buy = async (id, price) => {
    try {
      await buyProduct({
        id,
        price,
      }).then((resp) => getProducts());
      toast(<NotificationSuccess text="Product bought successfully" />);
    } catch (error) {
      toast(<NotificationError text="Failed to purchase product." />);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getProducts();
  }, []);