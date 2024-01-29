import React,{useState,useEffect,useContext} from 'react'
import Card from '../../components/Card/Card';
import SidebarBoot from '../../components/SidebarBoot/SidebarBoot';
import AuthContext from '../../utils/authContext';
import BrandContext from '../../utils/brandContext';
import Button from "@mui/material/Button";

export default function Under5() {
  const [products,setProducts]=useState([])
  const [error,setError]=useState()
  const {price}=useContext(AuthContext)
  const {setPrice}=useContext(AuthContext)
  const [currentPage, setCurrentPage] = useState(1);//for showing limited products in each page
  const pageSize = 50
  const {brand}=useContext(BrandContext)

  useEffect(() => {
    fetch(`http://localhost:3001/edges?node.name_like=${brand}&_sort=node.sku&_page=${currentPage}&_limit=${pageSize}`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setProducts(data)})
    .catch((err) => setError(err.message))
  }, [currentPage]);
  const totalPages = Math.ceil(products.length / pageSize);
 // Handler for navigating to the next page
 const goToNextPage = () => {
  setCurrentPage(prevPage => prevPage + 1);
};
const goToPreviousPage = () => {
  setCurrentPage(prevPage => prevPage - 1);
};

  let under5Products=products.filter((e)=>(e.node.price<price && e.node.image!=="null"))
  let items=under5Products?.map((e,index)=><Card id={e.node.id}
  name={e.node.name}
  price={e.node.price}
  image={e.node.image}
  rate={e.node.rate}
  key={index}
  />)
  let src;
  let logosrc;
  switch (brand) {
    case "Mr. Pen":
      src = "https://m.media-amazon.com/images/I/91lpe8WA5BL._AC_SL1500_.jpg";
      logosrc="https://imgurl.ir/uploads/l959943_download-removebg-preview.png"
      break;
    case "Bates":
      src = "https://m.media-amazon.com/images/I/81RCrjPwRBL._AC_SL1500_.jpg";
      logosrc="https://imgurl.ir/uploads/n63057_Bates-removebg-preview.png"
      break;
    case "UNCO":
      src = "https://m.media-amazon.com/images/I/810Dl6DoTYL._AC_SL1500_.jpg";
      logosrc="https://imgurl.ir/uploads/j418496_UNCO-removebg-preview.png"
      break;
    case "Slick":
      src = "https://m.media-amazon.com/images/I/81R4XKuYVhL._AC_SL1500_.jpg";
      logosrc="https://imgurl.ir/uploads/k43718_Slick_Solution_Final.png"
      break;
    default:
      break;
  }
  return (
    
    <div className='container-fluid'>
      {console.log(brand)}
      <div className="row topProduct">
          <img
            className="topProductImage"
            src={src}
            style={{ height: "500px" }}
          />
          <div className="triangle"></div>
          <img className="logoImage"
            src={logosrc}
            style={{ height: "100px", width: "100px" }}
          />
          <h4 className="imgtxt">Affordable Products</h4>
          <p className="imgtxt2">Please tell your friends about our website</p>
        </div>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-3'>
        <SidebarBoot/>
        </div>
        <div className='col-lg-9'>
            <div className='row '>
                <div className=' d-flex flex-column'>
                <p className='ms-auto  w-25 me-5 h-25 mt-3'>Under price</p>
            <select className='ms-auto  w-25 me-5 mt-2' value={price} onChange={(e)=>setPrice(e.target.value)}>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
        </select>
                </div>

          
            </div>

        <div className='container-fluid d-flex flex-row justify-content-center flex-wrap mt-3'>
      {items}
    </div>
    <div>
    <Button
                  color="secondary"
                  variant="contained"
                  disabled={currentPage === 1}
                  onClick={goToPreviousPage}
                >
                  {" "}
                  Previous
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  disabled={currentPage === totalPages}
                  onClick={goToNextPage}
                >
                  {" "}
                  Next
                </Button>
    </div>
        </div>
      </div>
    </div>

      </div>
  )
}