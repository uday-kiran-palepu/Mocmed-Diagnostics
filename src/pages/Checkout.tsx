import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cart is Empty</h2>
          <a href="/packages" className="inline-block bg-[#0A7DCF] text-white px-6 py-3 rounded-lg">Browse Packages</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Checkout</h1>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-lg font-bold text-[#0A7DCF]">₹{item.price}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between mb-6 text-lg font-bold">
              <span>Total:</span>
              <span className="text-[#0A7DCF]">₹{cartTotal}</span>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700">Payment will be collected at home service. You will receive a confirmation email.</p>
            </div>

            <button onClick={() => { clearCart(); alert('Order placed!'); }} className="w-full bg-[#0EB39C] text-white px-6 py-3 rounded-lg font-semibold">
              Complete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
