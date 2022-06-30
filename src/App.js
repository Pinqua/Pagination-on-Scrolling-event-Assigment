import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [items, setItems] = useState([]);
  const [limit, setLimit] = useState(50);
  const ref = useRef(true);
  const [noNewData,setNoNewData]=useState(false);

  const fetchMoreData = useCallback(() => {
    setTimeout(() => {
      axios({
        url: `https://dummyjson.com/products?limit=${limit}`,
        method: "GET",
      })
        .then((res) => {
          if (items.length === res.data?.products.length) {
            setNoNewData(true)
          }
          setItems(res.data?.products);
          setLimit((limit) => limit + 50);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1500);
  }, [limit, items]);

  useEffect(() => {
    console.log(ref.current);
    if (ref.current) {
      fetchMoreData();
      ref.current = false;
    }
  }, [fetchMoreData]);

  return (
    <div>
      <h1 style={{fontSize:"3rem",margin:"2.6rem 0",textAlign:"center"}}>Products</h1>
      <hr />
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={!noNewData}
        loader={
          <h2 style={{ textAlign: "center", margin: "4rem 0" }}>Loading...</h2>
        }
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {items?.map((item) => (
            <div key={item.id}>
              <img
                src={item.images[0]}
                style={{ objectFit: "contain", width: "400px", padding:"1rem" }}
                alt=""
              />
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;
