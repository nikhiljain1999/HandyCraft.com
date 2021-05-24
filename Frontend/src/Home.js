import React from 'react'
import "./Home.css"
import Product from "./Product"
import wooden from './assets/wooden.jpg'
import clay from './assets/clay1.jpg'
import jute from './assets/jute.jpg'
import metal from './assets/metal.jpg'
import stone from "./assets/stone.jpg"
import leather from './assets/leather.jpg'
import shell from './assets/shell.jpeg'
import bone from './assets/bone.jpg'
import bamboo from './assets/bamboo.jpg'
import Carousel from 'react-image-carousel';
import Test from '../src/admin/test'
import Header from "./Header"
import Footer from "./footer"
function Home() {
        let images = [
            'https://cdn.pixabay.com/photo/2015/11/28/11/26/sale-1067126__340.jpg',
            'https://c1.wallpaperflare.com/preview/683/764/906/596c935a533c1.jpg',
            "https://c1.wallpaperflare.com/preview/818/716/919/marrakesh-lamps-souk-medina.jpg",
            "https://c1.wallpaperflare.com/preview/89/968/873/person-fashion-man-ring.jpg",
            'https://c0.wallpaperflare.com/preview/938/193/134/tunisia-market-man-jewelry.jpg',
            
        ];
        return (
            <>
             <Header/>
            <div className="home">
               
                <div className="home_container">
                    <div>
                        <div className="home_image">
                            <Carousel
                                images={images}
                                thumb={true}
                                loop={true}
                                autoplay={3000} />
                        </div>
                    </div>
                    
                    <div className="home_row" >
                        <Product title="Wooden Producs" image={wooden} />
                        <Product title="Clay Products" image={clay} />
                    </div>
                    
                    <div className="home_row">
                        <Product title="Jute Products" image={jute} />
                        <Product title="Metal Products" image={metal} />
                        <Product title="Stone Products" image={stone} />
                    </div>
                    <div className="home_row" >
                    <Test />
                    <Test/>
                    </div>
                    <div className="home_row">
                        <Product title="Leather Products"  image="https://nappadoricdn.di91.com/media/catalog/category/bags-main-category-new-30-june-2020_1_6.jpg" />
                    </div>
                    <div className="home_row">
                        <Product title="Shell products" image={shell} />
                        <Product title="Bone Products" image={bone} />
                    </div>
                    <div className="home_row">
                        <Product title="Bamboo & Cane" image="https://cdn.shopify.com/s/files/1/0354/9161/0668/files/BAMBOO_27139d73-9b59-43b6-9838-db6ecabebdbd_1024x1024.jpg?v=1590587832" />
                    </div>
                </div>
            </div>
            <Footer/>
            </>
        )
    }
    

export default Home