import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { client } from "../contentful/contentful";
import About from "../views/About/About";
import Contact from "../views/Contact/Contact";
import Home from "../views/Home/Home";
import Products from "../views/Products/Products";
import SingleProduct from "../views/SingleProduct/SingleProduct";
import MainTemplate from "../templates/MainTemplate";
import ShopContext from "../context/context";
import "./Root.css";

const Root = () => {
  // local storage
  const getCartFromLocalStorage = () => {
    let localStorageCart;

    if (localStorage.getItem("cart")) {
      localStorageCart = JSON.parse(localStorage.getItem("cart"));
    } else {
      localStorageCart = [];
    }

    return localStorageCart;
  };

  const getCartCounterFromLocalStorage = () => {
    let localStorageCartCounter;

    if (localStorage.getItem("cartCounter")) {
      localStorageCartCounter = JSON.parse(localStorage.getItem("cartCounter"));
    } else {
      localStorageCartCounter = 0;
    }
    return localStorageCartCounter;
  };

  // starting states
  const [products, setProducts] = useState([]);
  const [welcomeSlogan, setWelcomeSlogan] = useState("");
  const [indexTimeout, setIndexTimeout] = useState(0);
  //cart states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(getCartFromLocalStorage());
  const [cartCounter, setCartCounter] = useState(
    getCartCounterFromLocalStorage()
  );
  const [total, setTotal] = useState(0);
  // filter states
  const [price, setPrice] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [search, setSearch] = useState("");
  const [ligue, setLigue] = useState("all");
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [filtersVisibility, setFiltersVisibility] = useState(false);

  //local storage functions

  const setCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("localStorage22", localStorage);
  };

  const setCartCounterToLocalStorage = () => {
    localStorage.setItem("cartCounter", JSON.stringify(cartCounter));
  };

  useEffect(() => {
    setCartToLocalStorage();
    setCartCounterToLocalStorage();
  }, [cart, cartCounter]);

  // Welcome Slogan Interval

  const WelcomeSloganInterval = () => {
    let beginSlogan = "";
    let endSlogan = [
      "welcome to our store",
      "thank you for visiting us",
      "enjoy your football t-shirts",
    ];
    let indexWord = 0;
    let indexLetter = 0;

    let changeWord = () => {
      indexWord++;
      indexLetter = 0;
      indexStart++;
      beginSlogan = "";
      if (indexWord === endSlogan.length - 1) {
        clearInterval(indexChange);
      }
      setInterval(addLetter, 100);
    };

    let indexChange = setInterval(changeWord, 3000);

    const addLetter = () => {
      beginSlogan += endSlogan[indexWord][indexLetter];
      indexLetter++;
      setWelcomeSlogan(beginSlogan);
      if (indexLetter === endSlogan[indexWord].length) {
        clearInterval(indexStart);
      }
    };

    let indexStart = setInterval(addLetter, 100);
  };

  useEffect(() => {
    setIndexTimeout(
      setTimeout(() => {
        WelcomeSloganInterval();
      }, 1)
    );
  }, []);

  const clearHomeInterval = () => {
    clearTimeout(indexTimeout + 1);
    setWelcomeSlogan("welcome to our store");
  };

  // get data from cms

  useEffect(() => {
    client
      .getEntries({
        content_type: "product",
      })
      .then((response) => {
        let cmsList = response.items
          .map((item) => item.fields)
          .sort((a, b) => b.productPrice - a.productPrice);
        setProducts([...cmsList]);
        setFilteredProducts([...cmsList]);
      })
      .catch((error) => error);
  }, []);

  // cart functions

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const addProductToCart = (chosenProduct) => {
    const filteredProduct = products.filter(
      (product) => product.productName === chosenProduct
    );
    setCart([...new Set([...cart, ...filteredProduct])]);
  };

  const removeProductFromCart = (chosenProduct) => {
    const filteredProduct = cart.filter(
      (product) => product.productName !== chosenProduct
    );
    cart.forEach((product) => {
      if (product.productName === chosenProduct) {
        setCartCounter(cartCounter - product.productQuantity);
        product.productQuantity = 1;
      }
    });

    setCart([...new Set([...filteredProduct])]);
  };

  const increaseCartCounter = () => {
    setCartCounter(cartCounter + 1);
  };

  const decreaseCartCounter = () => {
    if (cartCounter > 0) {
      setCartCounter(cartCounter - 1);
    }
  };

  const increaseProductQuantity = (chosenProduct) => {
    cart.forEach((product) => {
      if (product.productName === chosenProduct) {
        product.productQuantity += 1;
      }
    });
    increaseCartCounter();
  };

  const decreaseProductQuantity = (chosenProduct) => {
    cart.forEach((product) => {
      if (
        product.productName === chosenProduct &&
        product.productQuantity > 0
      ) {
        product.productQuantity -= 1;
      }
    });
    decreaseCartCounter();
  };

  const clearCartAndCartCounter = () => {
    setCart([]);
    setCartCounter(0);
  };

  const calculateTotal = () => {
    let tempTotal = 0;
    cart.forEach((product) => {
      const { productQuantity, productPrice } = product;
      tempTotal = tempTotal + productQuantity * productPrice;
    });

    setTotal(tempTotal);
  };

  useEffect(() => {
    calculateTotal();
  }, [cart, cartCounter]);

  const checkCart = (chosenProduct) => {
    if (cart.length !== 0) {
      const checkedProducts = cart.map((product) => {
        if (product.productName === chosenProduct) {
          product.productQuantity += 1;
        }
        return product;
      });
      setCart([...new Set([...checkedProducts])]);
    }
  };

  // filter functions

  const seeFilters = () => {
    setFiltersVisibility(!filtersVisibility);
  };

  useEffect(() => {}, [filtersVisibility]);

  const setFilterInputSearch = (e) => {
    setSearch(e.target.value);
  };

  const setLigueSelect = (e) => {
    setLigue(e.target.value);
  };

  const getPriceForFilters = () => {
    console.log("products", products);
    let maxPrice = Math.max(...products.map((product) => product.productPrice));
    setPrice(maxPrice);
    setMax(maxPrice);
  };

  useEffect(() => {
    getPriceForFilters();
  }, []);

  useEffect(() => {
    getPriceForFilters();
  }, [products]);

  const setFilterInputPrice = (e) => {
    setPrice(e.target.value);
  };

  const setCheckbox = (e) => {
    setFreeDelivery(e.target.checked);
  };

  const sortProducts = () => {
    let tempProducts = [...products];

    //by price
    let tempPrice = parseInt(price);
    tempProducts = tempProducts.filter(
      (product) => product.productPrice <= tempPrice
    );

    //by search input

    if (search.length !== 0) {
      tempProducts = tempProducts.filter((product) => {
        let tempSearch = search.toLowerCase();
        let tempProductName = product.productName
          .toLowerCase()
          .slice(0, search.length);
        if (tempSearch === tempProductName) {
          return product;
        }
      });
    }

    // by ligue

    if (ligue !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.productCategory === ligue;
      });
    } else {
      setFilteredProducts([...products]);
    }

    // by free delivery option
    if (freeDelivery) {
      tempProducts = tempProducts.filter((product) => {
        return product.productFreeDelivery === true;
      });
    }

    setFilteredProducts([...tempProducts]);
  };

  useEffect(() => {
    sortProducts();
  }, [search, price, ligue, freeDelivery]);

  return (
    <BrowserRouter>
      <ShopContext.Provider
        value={{
          products,
          welcomeSlogan,
          clearHomeInterval,
          isCartOpen,
          handleCartOpen,
          handleCartClose,
          cart,
          addProductToCart,
          removeProductFromCart,
          setFilterInputPrice,
          price,
          min,
          max,
          filteredProducts,
          search,
          setFilterInputSearch,
          cartCounter,
          increaseCartCounter,
          decreaseCartCounter,
          ligue,
          setLigueSelect,
          checkCart,
          calculateTotal,
          total,
          increaseProductQuantity,
          decreaseProductQuantity,
          setCheckbox,
          freeDelivery,
          clearCartAndCartCounter,
          seeFilters,
          filtersVisibility,
        }}
      >
        <MainTemplate>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:product" component={SingleProduct} />
          </Switch>
        </MainTemplate>
      </ShopContext.Provider>
    </BrowserRouter>
  );
};

export default Root;
