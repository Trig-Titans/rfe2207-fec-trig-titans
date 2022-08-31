/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Carousel from 'react-multi-carousel';
import axios from 'axios';
import API_KEY from '../../../../config.js'
import Card from './card.jsx'
import styled from 'styled-components';
import "react-multi-carousel/lib/styles.css";
import StarBtn from './relatedBtn.jsx'
import Outfit from './outfitList.jsx'

const List = styled.div`
  margin-left: 23%;
  width:53%;
`

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3.25,
    slidesToSlide: .75
  }
};



//for new commit aug 30

const RelatedProducts = (props) => {
  const [accumulatedProductData, setAccumulatedProductData] = React.useState([]);
  const product_id = "37314"

  React.useEffect(() => {

    //FIND LIST OF RELATED PRODUCT IDS
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${product_id}/related`, { headers: { Authorization: API_KEY } })
      .then((response) => {
        let arrayOfRelatedProductIDs = response.data;

        //FIND All RELATED PRODUCTS INFO
        Promise.all(arrayOfRelatedProductIDs.map(id => {
          return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${id}`, { headers: { Authorization: API_KEY } })
            .then(response => {
              let productInfoObj = response.data

              return productInfoObj
            })
        }))
          .then(response => {
            let productsInfoArray = response;

            //ONCE WE HAVE ALL RELATED PRODUCTS FIND THE STYLES FOR EACH PRODUCT
            Promise.all(productsInfoArray.map(product => {
              return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${product.id}/styles`, {
                headers: { Authorization: API_KEY }
              })
                .then(response => {
                  let productStylesObj = response.data;

                  return productStylesObj;
                })
            }))
              .then(response => {
                let productsStylesArray = response;

                Promise.all(productsStylesArray.map(product => {
                  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews?product_id=${product.product_id}`, {
                    headers: { Authorization: API_KEY }
                  })
                    .then(response => {
                      let productReviewsObj = response.data

                      return productReviewsObj
                    })
                }))
                  .then(response => {
                    let productReviewsArray = response

                    productsInfoArray.map((product, index) => {
                      product.styles = productsStylesArray[index];
                      product.reviews = productReviewsArray[index];
                    })

                    setAccumulatedProductData(productsInfoArray);
                  })

              })
          })
      })
  }, []);

  // salePrice={style.sale_price}

  return (
    <List>
      <br/>
      <br/>
      <Carousel responsive={responsive}>
        {accumulatedProductData.map((product, index) => {

            let style = product.styles.results.find(result => result['default?'] === true) !== undefined ?
              product.styles.results.find(result => result['default?'] === true)
              : product.styles.results[0]

          return (
            <Card picUrls={style.photos.map(photo => photo.url)}  category={product.category} name={product.name} price={'$' +style.original_price} salePrice={ style.sale_price ? '$' + style.sale_price : index % 2 === 0 ? '$7327.00' : null} key={index} button={<StarBtn/>} />
          )
        })}
      </Carousel>
      <br/>
        <br/>
        <Outfit/>

    </List>
  );
}

export default RelatedProducts;