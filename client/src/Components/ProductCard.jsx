import { useDispatch, useSelector } from "react-redux";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../store/features/cart/cartSlice";
// import { useAppContext } from "../Context/AppContext";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currency = useSelector((state) => state.ui.currency);
  const cartItems = useSelector((state) => state.cart.cartItems);
  // const { currency, addToCart, removeFromCart, cartItems, navigate } =
  //   useAppContext();

  const rating = product.rating || 4;

  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`,
          );
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full"
      >
        <div className="group cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-105 transition max-w-26 md:max-w-36"
            src={product.image?.[0]}
            alt={product.name}
          />
        </div>
        <div className="text-gray-500/60 text-sm">
          <p>{product.category}</p>
          <p className="text-gray-700 font-medium text-lg truncate w-full">
            {product.name}
          </p>
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="md:w-3.5 w-3"
                  src={i < rating ? assets.star_icon : assets.star_dull_icon}
                />
              ))}
            <p>{rating}</p>
          </div>
          <div className="flex items-end justify-between mt-3">
            <p className="md:text-xl text-base font-medium text-primary">
              {product.offerPrice}
              {currency}
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
                {product.price}
                {currency}
              </span>
            </p>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-primary"
            >
              {!cartItems?.[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 
                  md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addToCart(product._id));
                  }}
                >
                  <img src={assets.cart_icon} alt="cart_icon" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeFromCart(product._id));
                    }}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(addToCart(product._id));
                    }}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
