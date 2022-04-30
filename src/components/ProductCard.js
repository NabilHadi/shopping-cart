import { useState } from "react";

const numRegExp = /^\b[1-9][0-9]*\b$/;

const ProductCard = ({ productName, productPic, productAlt }) => {
  const [inputValue, setInputValue] = useState(1);

  const handleOnChange = (e) => {
    if (!numRegExp.test(e.target.value) && e.target.value !== "") return;
    setInputValue(e.target.value);
  };

  const handleIncreaseBtnClick = () => {
    setInputValue(inputValue + 1);
  };

  const handleDecreaseBtnClick = () => {
    setInputValue(inputValue - 1);
  };

  const handleAddToCardBtnClick = () => {
    setInputValue(1);
  };

  return (
    <div>
      <div>{productName}</div>
      <div>{productPic}</div>
      <div>
        <input
          type="text"
          inputMode="numeric"
          placeholder="1"
          pattern="[0-9]"
          value={inputValue}
          onChange={handleOnChange}
          aria-label="Product count"
        />
        <button
          type="button"
          aria-label="increase product count"
          onClick={handleIncreaseBtnClick}
        >
          +
        </button>
        <button
          type="button"
          aria-label="decrease product count"
          onClick={handleDecreaseBtnClick}
        >
          -
        </button>
      </div>
      <button
        type="button"
        aria-label="add to cart"
        onClick={handleAddToCardBtnClick}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
