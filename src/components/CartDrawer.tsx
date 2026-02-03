import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { cartItems, removeFromCart, clearCart, cartTotal, isCartOpen, closeCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-[#0A7DCF]" />
            <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">
                Add health packages to get started
              </p>
              <Link
                to="/packages"
                onClick={closeCart}
                className="inline-block mt-4 bg-[#0A7DCF] hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Browse Packages
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-[#0A7DCF] transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 flex-1">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:bg-red-100 rounded transition-colors text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.tests && item.tests.length > 0 && (
                    <p className="text-sm text-gray-600 mb-2">
                      {item.tests.length} tests included
                    </p>
                  )}

                  <p className="text-lg font-bold text-[#0A7DCF]">₹{item.price}</p>
                </div>
              ))}
            </div>

            <div className="border-t p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-[#0A7DCF]">₹{cartTotal}</span>
              </div>

              <Link
                to="/checkout"
                onClick={closeCart}
                className="block w-full bg-[#0EB39C] hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Proceed to Checkout
              </Link>

              <button
                onClick={() => {
                  clearCart();
                  closeCart();
                }}
                className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Clear Cart
              </button>

              <button
                onClick={closeCart}
                className="w-full text-[#0A7DCF] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
