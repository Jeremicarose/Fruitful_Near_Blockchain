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