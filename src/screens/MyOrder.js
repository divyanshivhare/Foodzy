import React, { useEffect, useState, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  // Memoize fetchMyOrder
  const fetchMyOrder = useCallback(async () => {
    try {
      const response = await fetch('https://foodzy-backend-1.onrender.com/api/myOrderData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail'),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log('Fetched Order Data:', data); // Check the data structure
        setOrderData(data.orderData || []);
      } else {
        const errorMessage = await response.text();
        console.error('Failed to fetch order data:', errorMessage);
        alert(`Failed to fetch order data: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
      alert(`Error fetching order data: ${error.message}`);
    }
  }, []); // Dependencies can be added here if needed

  useEffect(() => {
    fetchMyOrder();
  }, [fetchMyOrder]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
        {orderData.length > 0 ? (
  orderData.map((data, dataIndex) => (
    data.order_data ? (
      data.order_data.slice(0).reverse().map((item, itemIndex) => (
        
        item.map((arrayData, arrayIndex) => {

          return (
            <div key={`${dataIndex}-${itemIndex}-${arrayIndex}`}>
              {arrayData.Order_date ? (
                <div className="m-auto mt-5">
                  <span>{arrayData.Order_date}</span>
                  <hr />
                </div>
              ) : (
                <div className="col-12 col-md-6 col-lg-3">
                  <div
                    className="card mt-3"
                    style={{ width: '16rem', maxHeight: '360px' }}
                  >
                    {/* <img
                      src={arrayData.img || 'path/to/default-image.jpg'} // Check if img is correctly fetched
                      className="card-img-top"
                      alt="..."
                      style={{ height: '120px', objectFit: 'fill' }}
                    /> */}
                    <div className="card-body">
                      <h5 className="card-title">{arrayData.name}</h5>
                      <div
                        className="container w-100 p-0"
                        style={{ height: '38px' }}
                      >
                        <span className="m-1">{arrayData.qty}</span>
                        <span className="m-1">{arrayData.size}</span>
                        <span className="m-1">{arrayData.Order_date}</span>
                        <div className="d-inline ms-2 h-100 w-20 fs-5">
                          ₹{arrayData.price}/-
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      ))
    ) : null
  ))
) : (
  <p>No orders found.</p>
)}

        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyOrder;
