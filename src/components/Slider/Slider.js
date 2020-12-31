import React from 'react'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import homeImg1 from '../../assets/images/home_background.jpg'
import homeImg2 from '../../assets/images/home2_background.jpg'
import styled from 'styled-components'

const ImgSlider = styled(AwesomeSlider)`
width: 80vw;
margin: auto;
`

const SmallImgSlider = styled.img`
height: 700px;
width: 100%;
`

const Slider = () => {
    return (
        <ImgSlider>
            <div><SmallImgSlider src={homeImg1} alt="home1" /></div>
            <div><img src={homeImg2} alt="home2" /></div>
        </ImgSlider>
    )
}

export default Slider
