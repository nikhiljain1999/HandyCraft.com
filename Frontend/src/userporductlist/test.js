// import React from 'react'
// import Productbutype from './productbytype'
// import axios from "axios"
// function productdata() {
//     let config = {
//         headers: {
//           "Authorization": `Bearer ${localStorage.getItem('token')}`,
//         }
//       }
//       const url1 = history.location.pathname
//       const urlindex = history.location.pathname.lastIndexOf('/')
//       const newUrl = url1.slice(0, urlindex)
//       useEffect(() => {
//         if (newUrl === '/products') {
//           axios.get(`http://localhost:3001${history.location.pathname}`)
//             .then(resp => {
//               setItems(resp.data)
//               localStorage.removeItem('search')
//             })
//             .catch(error => console.log(error))
//         }
//         else {
//           axios.get(`http://localhost:3001/product/${search}`)
//             .then(resp => {
//               {
//                 setItems(resp.data)
//               }
//             })
//             .catch(error => console.log(error))
//         }
//       }, []);
//     return (
//         <div>
//             <Productbutype />
//         </div>
//     )
// }

// export default productdata
