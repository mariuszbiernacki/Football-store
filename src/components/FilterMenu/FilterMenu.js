import React, { useContext } from "react";
import ShopContext from "../../context/context";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./FilterMenu.scss";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const FilterMenu = () => {
  const classes = useStyles();

  const value = useContext(ShopContext);
  const {
    setFilterInputPrice,
    price,
    min,
    max,
    setFilterInputSearch,
    search,
    ligue,
    setLigueSelect,
    setCheckbox,
    freeDelivery,
    filtersVisibility,
  } = value;

  return (
    <>
      {filtersVisibility === true ? (
        <div className="filter-menu">
          <div className="filter-menu__price">
            <label className="filter-menu__price__label" htmlFor="priceInput">
              <p>
                product price: <span>{price}$</span>
              </p>
            </label>
            <input
              className="filter-menu__price__input"
              type="range"
              name="priceInput"
              id="priceInput"
              min={min}
              max={max}
              value={price}
              onChange={setFilterInputPrice}
            />
          </div>
          <div className="filter-menu__search">
            <label className="filter-menu__search__label" htmlFor="searchInput">
              search products
            </label>
            <input
              className="filter-menu__search__input"
              type="text"
              name="searchInput"
              id="searchInput"
              value={search}
              onChange={setFilterInputSearch}
            />
          </div>
          <div className="filter-menu__select">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Ligue</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ligue}
                onChange={setLigueSelect}
              >
                <MenuItem value={"all"}>all</MenuItem>
                <MenuItem value={"La Liga"}>La Liga</MenuItem>
                <MenuItem value={"Bundesliga"}>Bundesliga</MenuItem>
                <MenuItem value={"Premier League"}>Premier League</MenuItem>
                <MenuItem value={"Serie A"}>Serie A</MenuItem>
                <MenuItem value={"Ligue 1"}>Ligue 1</MenuItem>
                <MenuItem value={"Primeira Liga"}> Primeira Liga</MenuItem>
                <MenuItem value={"Premiership"}> Premiership</MenuItem>
                <MenuItem value={"Eredivisie"}> Eredivisie</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="filter-menu__checkbox">
            <label htmlFor="deliveryOption">free delivery option </label>
            <input
              onChange={setCheckbox}
              type="checkbox"
              name="deliveryOption"
              id="deliveryOption"
              checked={freeDelivery && true}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default FilterMenu;
