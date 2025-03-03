/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KhaltiCheckout from 'khalti-checkout-web'; // Khalti SDK
import ProductItem from '../components/ProductItem';

const PlaceOrder = () => {
  const { currency, backendUrl, token, setCartItems, cartItems, products, navigate, delivery_fee, userId } = useContext(ShopContext);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState({ type: '', details: '', contact: '' });
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load addresses from localStorage on component mount
  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
    setAddresses(savedAddresses);
  }, []);

  // Save addresses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const shade in cartItems[itemId]) {
        if (cartItems[itemId][shade] > 0) {
          tempData.push({
            _id: itemId,
            shade: shade,
            quantity: cartItems[itemId][shade],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  // Calculate total amount
  const totalAmount = cartData.reduce((acc, item) => {
    const product = products.find((p) => p._id === item._id);
    return acc + (product?.price * item.quantity || 0);
  }, 0);

  // Discount logic
  const discount = totalAmount > 100 ? totalAmount * 0.1 : 0;
  const grandTotal = totalAmount - discount + delivery_fee;

  // Handle adding new address
  const handleAddAddress = () => {
    if (newAddress.type && newAddress.details && newAddress.contact) {
      const newId = addresses.length > 0 ? addresses[addresses.length - 1].id + 1 : 1;
      const updatedAddresses = [...addresses, { id: newId, ...newAddress }];
      setAddresses(updatedAddresses);
      setNewAddress({ type: '', details: '', contact: '' });
      setShowModal(false);
      toast.success('Address added successfully!');
    } else {
      toast.error('Please fill all fields.');
    }
  };

  // Initialize Khalti Checkout
  const khalti = new KhaltiCheckout({
    publicKey: import.meta.env.KHALTI_PUBLIC_KEY || "0749237d70d84002bd3bfd8ab90cbebb", 
    productIdentity:"67b3fc6be965ab5e0912d83c",
    productName: "Dior Forever Glow Foundation - 24 HR",
    productUrl: 'http://localhost:5173/product/67b3fc6be965ab5e0912d83c',
    eventHandler: {
      onSuccess(payload) {
        // Handle success event
        console.log('Payment successful:', payload);
      },
      onError(error) {
        // Handle error event
        console.error('Payment error:', error);
      },
      onClose() {
        // Handle close event
        console.log('Widget closed');
      }
    }
  });

  // Handle Khalti Payment
  const handleKhaltiPayment = async () => {
    const payload = {
      amount: grandTotal * 100, // Amount in paisa
    };

    khalti.show(payload, async (response) => {
      if (response.idx) {
        // Payment successful, send the token to the backend
        try {
          const address = addresses.find((addr) => addr.id === selectedAddress);
          const orderData = {
            userId,
            items: cartData,
            amount: grandTotal,
            address: address.details,
            paymentMethod: 'Khalti',
            token: response.token,
          };

          const response = await fetch(`${backendUrl}/api/order/khalti`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token || localStorage.getItem('token')}`,
            },
            body: JSON.stringify(orderData),
          });

          if (!response.ok) {
            throw new Error('Failed to place order');
          }

          const result = await response.json();
          toast.success('Order placed successfully!');
          setCartItems({});
          navigate('/orders');
        } catch (error) {
          console.error('Error placing Khalti order:', error);
          toast.error('Failed to place order. Please try again.');
        }
      } else {
        toast.error('Payment failed.');
      }
    });
  };

  // Handle placing order COD
  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select an address.');
      return;
    }
    if (selectedPayment === null) {
      toast.error('Please select a payment method.');
      return;
    }
    if (!cartData.length) {
      toast.error('Your cart is empty. Please add items before placing an order.');
      return;
    }

    setIsLoading(true);

    try {
      if (selectedPayment === 1) {
        // Khalti payment
        await handleKhaltiPayment();
      } else if (selectedPayment === 0) {
        // COD payment
        const address = addresses.find((addr) => addr.id === selectedAddress);
        const orderData = {
          userId,
          items: cartData,
          amount: grandTotal,
          address: address.details,
          paymentMethod: 'COD',
        };

        const response = await fetch(`${backendUrl}/api/order/place`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token || localStorage.getItem('token')}`,
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          throw new Error('Failed to place order');
        }

        const result = await response.json();
        toast.success('Order placed successfully!');
        setCartItems({});
        navigate('/orders');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-6 pt-5 sm:pt-14 min-h-[80vh] border-t px-6'>
      {/* Left Side - Billing Details */}
      <div className='flex flex-col gap-6 w-full sm:max-w-[480px]'>
        <h2 className='text-2xl font-semibold'>Billing Details</h2>
        
        <div className='border rounded-lg p-4'>
          <h4 className='text-lg font-semibold mb-2'>Select Address</h4>
          {addresses.map((address) => (
            <div key={address.id} className={`p-3 border rounded-md cursor-pointer flex items-center gap-2 ${selectedAddress === address.id ? 'border-red-500' : 'border-gray-300'}`} onClick={() => setSelectedAddress(address.id)}>
              <input type='radio' name='address' checked={selectedAddress === address.id} readOnly />
              <div>
                <span className='font-semibold'>{address.type}</span>
                <p className='text-sm text-gray-600'>{address.details}</p>
                <p className='text-sm text-gray-600'>Contact: {address.contact}</p>
              </div>
            </div>
          ))}
          <button className='text-blue-500 mt-2' onClick={() => setShowModal(true)}>+ Add Address</button>
        </div>
        
        {/* Payment Options */}
        <h2 className='text-2xl font-semibold'>Select Payment Option</h2>
        <div className='flex gap-8'>
          {[assets.cod, assets.khalti].map((payment, index) => (
            <button key={index} className={`w-100 h-16 rounded-full border-2 flex items-center justify-center ${selectedPayment === index ? 'border-red-500' : 'border-gray-300'}`} onClick={() => setSelectedPayment(index)}>
              <img src={payment} alt='Payment Method' className='w-10 h-10' />
            </button>
          ))}
        </div>
      </div>
      
      {/* Right Side - Order Summary */}
      <div className='mt-8 w-full sm:max-w-[400px]'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-bold mb-4'>Order Summary</h3>
          <div className='mb-4'>
            <h4 className='text-lg font-semibold mb-2'>Product Details</h4>
          </div>
          <div className='flex justify-between text-gray-700 mb-2'>
            <span>Total</span>
            <span>{currency}{totalAmount.toFixed(2)}</span>
          </div>
          <div className='flex justify-between text-gray-700 mb-2'>
            <span>Discount</span>
            <span>- {currency}{discount.toFixed(2)}</span>
          </div>
          <div className='flex justify-between text-gray-700 mb-2'>
            <span>Delivery Charge</span>
            <span>{currency}{delivery_fee}</span>
          </div>
          <div className='flex justify-between font-semibold text-lg mb-4'>
            <span>Grand Total</span>
            <span>{currency}{grandTotal.toFixed(2)}</span>
          </div>
          <p className='text-sm text-gray-600 text-right mb-4'>(Inclusive of all Taxes)</p>
          <button onClick={handlePlaceOrder} disabled={isLoading} className='w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg text-center font-semibold'>
            {isLoading ? 'Placing Order...' : 'PLACE ORDER'}
          </button>
        </div>
      </div>
      
      {/* Modal for Adding Address */}
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'>
          <div className='bg-white p-5 rounded-lg shadow-lg w-96'>
            <h2 className='text-lg font-bold mb-3'>Add New Address</h2>
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full mb-2' type='text' placeholder='Type (Home/Work)' value={newAddress.type} onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })} />
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full mb-2' type='text' placeholder='Address Details' value={newAddress.details} onChange={(e) => setNewAddress({ ...newAddress, details: e.target.value })} />
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full mb-2' type='text' placeholder='Contact Number' value={newAddress.contact} onChange={(e) => setNewAddress({ ...newAddress, contact: e.target.value })} />
            <div className='flex justify-end gap-2 mt-4'>
              <button className='bg-gray-300 px-4 py-2 rounded' onClick={() => setShowModal(false)}>Cancel</button>
              <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={handleAddAddress}>Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PlaceOrder;