import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItem;

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let existingItem = data.find(item => item.id === foodItem._id && item.size === size);

    if (existingItem) {
        await dispatch({ type: "UPDATE", id: foodItem._id, size: size, price: finalPrice, qty: qty });
    } else {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
    }
};


  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  return (
    <div>
      <div className="card mt-3" style={{"width": "20rem", "maxHeight": "360px"}}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height: "180px", objectFit: "fill"}}/>
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          {/* <p className="card-text">{props.foodItem.description}</p> */}
          <div className='container w-100'>
            <select className='m-2 h-100 bg-info rounded' onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i)=>{
                return (
                  <option key={i+1} value={i+1}> {i+1} </option>
                )
              })}
            </select>

            <select className='m-2 h-100 bg-info rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
            <div className='d-inline h-100 fs-5'>
             ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button className={'btn btn-info justify-center ms-2'} onClick={handleAddToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Card
