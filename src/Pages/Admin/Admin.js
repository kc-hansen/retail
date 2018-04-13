import React, { Component } from 'react';
import axios from 'axios'
import Products from './../Products/Products';


class Admin extends Component {
    constructor() {
        super()
        this.state = {
            bin: [],
            item: '',
            amount: 0,
            productID:1
        }
        this.getBins = this.getBins.bind(this);
    }


    componentDidMount() {
        this.getBins()

    }

    getBins() {
        axios.get(`/api/bin/${this.props.match.params.id}`)
            .then(resp => {
                this.setState({
                    products: resp.data
                })
            })
    }
    deleteBin() {
        axios.delete(`/api/bin/${this.props.match.params.id}`)
            .then(resp => {
                console.log('deleted')
            })
    }

    addBins() {
        axios.post(`/api/bin/${this.props.match.params.id}`, {
            item: this.state.item, amount: this.state.amount * 1
        }).then(resp => {
            console.log('added item')
        })
    }

    updateBin() {
        axios.put(`/api/bin/${this.props.match.params.id}`, {
            item: this.state.item, amount: this.state.amount * 1
        }).then(resp => {
            console.log('item updated')
        })
    }

    handleChange(e) {
        this.setState({ item: e.target.value })
    }

    handleChange2(e) {
        this.setState({ amount: e.target.value })
    }


    render() {
        return (
            <div>
                <div className="Admin">

                    Super Secret Admin Component
                <div class="image-box" ></div>
                </div>
                <div className="Bin">
                    <div>
                        <div>add stuff, delete stuff, edit stuff</div>
                        <div>
                            Insert Product Name
                            <input onChange={(e) => this.handleChange(e)} />
                            <br/>
                            Insert Product Price
                            <input onChange={(e) => this.handleChange2(e)} />
                            <br/>
                            Insert Main Product Picture
                            <input onChange={(e) => this.handleChange3(e)} />
                            <br/>
                            Insert Product Picture 2
                            <input onChange={(e) => this.handleChange4(e)} />
                            <br/>
                            Insert Product Picture 3
                            <input onChange={(e) => this.handleChange5(e)} />
                            <br/>
                            Insert Product Picture 4
                            <input onChange={(e) => this.handleChange6(e)} />
                            <br/>
                            Insert Product Description
                            <input onChange={(e) => this.handleChange7(e)} />
                            <br/>
                            Insert Product ID
                            <input onChange={(e) => this.handleChange8(e)} />
                            <button onClick={() => this.addBins()}> Submit</button>
                            <button onClick={() => this.updateBin()}> Update</button>
                            <button onClick={() => this.deleteBin()}> Delete Bin</button>
                        </div>
                    </div>
                </div>
                <div>
                    <Products/>
                </div>
            </div>

        )
    }
}

export default Admin;



