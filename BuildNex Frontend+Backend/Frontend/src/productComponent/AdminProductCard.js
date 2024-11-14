// import { Link } from "react-router-dom";
// import CategoryNavigator from "./CategoryNavigator";
// import axios from "axios";
// const deleteProductFrom = (productId) => {
//   const response = axios.delete(
//     "http://localhost:8080/api/product/delete? productId=" + productId
//   );

//   console.log(response);
// };

// const AdmminProductCard = (product) => {
//   return (
//     <div className="col">
//       <div class="card border-color rounded-card card-hover product-card custom-bg h-100">
//         <img
//           src={"http://localhost:8080/api/product/" + product.item.imageName}
//           class="card-img-top rounded mx-auto d-block m-2"
//           alt="img"
//           style={{
//             maxHeight: "270px",
//             maxWidth: "100%",
//             width: "auto",
//           }}
//         />

//         <div class="card-body text-color">
//           <h5 class="card-title d-flex justify-content-between">
//             <div>
//               <b>{product.item.title}</b>
//             </div>
//             <CategoryNavigator
//               item={{
//                 id: product.item.category.id,
//                 title: product.item.category.title,
//               }}
//             />
//           </h5>
//           <p className="card-text">
//             <b>{product.item.description}</b>
//           </p>
//         </div>
//         <div class="card-footer">
//           <div className="text-center text-color">
//             <p>
//               <span>
//                 <h4>Price : &#8377;{product.item.price}</h4>
//               </span>
//             </p>
//             <p class="text-color">
//               <b>
//                 <i>id :</i> {product.item.id}
//               </b>
//             </p>
//           </div>
//           <div className="d-flex justify-content-between">
//             <button
//               className="btn bg-color custom-bg-text btn-sm"
//               onClick={() => deleteProductFrom(product.item.id)}
//             >
//               Delete
//             </button>

//             <p class="text-color">
//               <b>
//                 <i>Stock :</i> {product.item.quantity}
//               </b>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdmminProductCard;
