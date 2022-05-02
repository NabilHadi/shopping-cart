import { useState } from "react";

const numRegExp = /^\b[0-9]*\b$|^$/;

const ProductCard = ({ product, onAddToCartClick }) => {
  const [inputValue, setInputValue] = useState(1);

  const handleOnChange = (e) => {
    if (!numRegExp.test(e.target.value)) return;
    setInputValue(e.target.value);
  };

  const handleIncreaseBtnClick = () => {
    setInputValue(Number(inputValue) + 1);
  };

  const handleDecreaseBtnClick = () => {
    if (Number(inputValue) < 1) {
      setInputValue(1);
    } else {
      setInputValue(Number(inputValue) - 1 < 1 ? 1 : Number(inputValue) - 1);
    }
  };

  const handleAddToCardBtnClick = () => {
    onAddToCartClick &&
      Number(inputValue) > 0 &&
      onAddToCartClick(product, Number(inputValue));
    setInputValue(1);
  };

  const handleOnBlur = (e) => {};

  return (
    <div id={product.id}>
      <div>{product.name}</div>
      <div>{product.pic}</div>
      <div>
        <input
          type="text"
          inputMode="numeric"
          placeholder="1"
          pattern="[0-9]"
          value={inputValue}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
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
