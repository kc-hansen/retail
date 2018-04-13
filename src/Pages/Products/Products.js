import React, { Component } from 'react';
import axios from 'axios';
import './products.css'
import Cart from '../../components/Cart/Cart'

class Products extends Component {
    constructor() {
        super()

        this.state = {
            data: [{}, {}, {}, {}, {}, {}, {}, {}]
        }
    }
    componentDidMount() {
        this.getAllproducts()  

    }

    getAllproducts() {
        axios.get('/api/products').then(response => {
            console.log(response.data)
            this.setState({ data: response.data })
        })

    }
    addToCart(productsID) {
        console.log(productsID)
        axios.post('/api/addToCart', { productsID })
    }



    render() {

        return (
            <div>
                <div className='longboardpage1'>

                    Products Component
                <Cart />
                    <div className='product1'>
                        <img className='productimg' src={this.state.data[3].img} alt='arbor' />
                        <p className='productname'>{this.state.data[3].product_name}</p>
                        <p className='productprice'>${this.state.data[3].product_price}</p>

                        <button className='twobutton' onClick={e => { this.addToCart(this.state.data[3].productsid) }}>+ Add To Cart</button>


                    </div>
                </div>
            </div>
        )
    }
}
export default Products;