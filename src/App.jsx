import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  const fetchProducts = async () => {
    try{
      setLoading(true)
      const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count == 0 ? 0 : count*20}`);
      const result = await response.json();
      console.log(result)      

      if(result && result.products.length){
        setProducts((prevData)=> [...prevData, ...result.products] );
        setLoading(false)
      }


      console.log(result)
    }catch(e){
      setLoading(false)
    }
  }

  const handleOnClick = (e) => {
    setCount ( count + 1); 
    e.preventDefault;
  }

  useEffect(()=> {
    fetchProducts();
  },[count]);

  useEffect(()=> {
    if(products && products.length == 100) setDisableButton(true);
  },[products]);

  if(loading) {
    return <h3>Loading data ! please wait.</h3>
  }

  return (
    <div className='wrapper'>
      <div className='product_container'>
        {
          products && products.length ? products.map((item)=> 
          <div className="product" key={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
          ) 
          : null
        }
      </div>
      <div className='button_container'>
        <button className={disableButton ? "disable" : ""} disabled= {disableButton} onClick={handleOnClick}>Load more products</button>
        {
          disableButton ? <h3>No more data</h3> : null
        }
      </div>
    </div>
  )
}

export default App
