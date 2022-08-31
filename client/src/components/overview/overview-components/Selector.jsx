import styled from 'styled-components';
import React, { useState, useContext } from "react";
import styleIndexContext from '../GalleryView.jsx';

const StyledOverviewStyleSelector = styled.div`
  grid-area: OvStyle;
`;
const StyledOverviewStylesTitle = styled.div`
`;
const StyledOverviewStylesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  max-width: 275px;
  max-height: 175px;
  overflow: scroll;
  overflow-x: hidden;
`;
const StyleCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width:50px;
  height:50px;
  overflow: hidden;
  border-radius: 50%;
  background-size: cover;
`;


export default function OverViewSelector({ styles, setStyles, styleIndex }) {

  return (
  <StyledOverviewStyleSelector>
    <StyledOverviewStylesTitle>Style {'>'} selected style</StyledOverviewStylesTitle>
    <StyledOverviewStylesSection>
      {
      styles.map((style, index) => {
        if (styleIndex === index) {
          return (
            // This translate x transformation is given to the slide div because it allows the picture to be shown that correlates with the x axis vertex
            // i.e. the first picture is at x=0, the second is x=100, the third is x=200
            // updating the x value changes what picture is shown
            <StyleCircle onClick={() => {
              setStyles(styleIndex = index);
            }}
            key={index} style={{backgroundImage: `url(${style.photos[0].thumbnail_url})`, border: '3px solid lightgray'}}>
            </StyleCircle>
          )
        } else {
          return (
            <StyleCircle onClick={() => {
              setStyles(styleIndex = index);
            }}
            key={index} style={{backgroundImage: `url(${style.photos[0].thumbnail_url})`, border: '2px solid gray'}}>
            </StyleCircle>
          )
        }
      })
    }
    </StyledOverviewStylesSection>
  </StyledOverviewStyleSelector>
  )
}