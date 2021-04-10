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

function Home() {
        let images = [
            'https://cdn.pixabay.com/photo/2015/11/28/11/26/sale-1067126__340.jpg',
            'https://cdn.pixabay.com/photo/2018/01/12/13/01/discount-3078216__340.jpg',
            'https://cdn.pixabay.com/photo/2015/04/04/18/43/sale-706820__340.jpg',
            'https://blog.hubspot.com/hubfs/limited-time-offer.jpg',
            'https://gos3.ibcdn.com/top-1583304995.jpg',
            'https://thumbs.dreamstime.com/z/sale-discount-banner-poster-retailer-offer-background-high-quality-editable-vector-super-sale-discount-banner-poster-vector-111174088.jpg'
        ];
        return (
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
                        <Product title="Leather Products" image={leather} />
                    </div>
                    <div className="home_row">
                        <Product title="Shell products" image={shell} />
                        <Product title="Bone Products" image={bone} />
                    </div>
                    <div className="home_row">
                        <Product title="Bamboo & Cane" image={bamboo} />
                    </div>
                </div>
            </div>
        )
    }
    

export default Home