import styled, { keyframes } from 'styled-components';
import M_Effect02 from '@/components/section_modules/mouse_effects/M_Effect02';
import { media } from '@/styles/mediaQuery';
import { useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash';
import CompactFooter from '@/components/section_modules/CompactFooter';
import { ScrollDownHintSVG } from '@/public/svgs/PageDirectionSVG';
import React from 'react';

/**
 * [ TODO ]
 * 1. GreetingText Top 값 하드가 아닌, 정확한 가운데 맞춤으로 코드 변경하기
 * 
 */

const Home = () => {

    /** 배너 이미지 */
    const images = [
        '/images/banner/banner01.jpg',
        '/images/banner/banner02.jpg',
        '/images/banner/banner03.jpg',
        '/images/banner/banner04.jpg'
    ];

    const [currentBanner, setCurrentBanner] = useState<number>(0);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
    const slidesRef = useRef<HTMLDivElement>(null);

    const nextBanner = () => {
        if (!isTransitioning) return;
        setCurrentBanner((prev) => prev + 1);
    };

    const selectBanner = (index:number) => {
        setCurrentBanner(index);
    };

    useEffect(()=>{
        const interval = setInterval(nextBanner, 5000);
        return () => clearInterval(interval);
    },[]);

    /** 화면 스크롤(Y축) 감지 */
    const [preScrollY, setPreScrollY] = useState<number>(0);
    const [isShowHeader, setIsShowHeader] = useState<boolean>(true);

    useEffect(() => {
        const handleScroll = throttle(() => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > preScrollY && isShowHeader){
                setIsShowHeader(false);
            } else if (currentScrollY < preScrollY && !isShowHeader){
                setIsShowHeader(true);
            }
            setPreScrollY(currentScrollY);
        }, 200);

        window.addEventListener('scroll',handleScroll);

        return () => {
            window.removeEventListener('scroll',handleScroll);
        }
    },[preScrollY, isShowHeader]);

    return(
        <>
        <Layout>
            <Content>
                <Title isShowHeader={isShowHeader}>
                    <div>
                        <div className='title'>PORTFOLIO</div>
                    </div>
                    <CompactFooter/>
                </Title>
                <GreetingText isShowHeader={isShowHeader}>
                    <div>안녕하세요, 웹 프론트엔드 개발자 김한빈입니다.</div>
                    <div>끊임없이 배우고, 성장하겠습니다.</div>
                </GreetingText>
                <ScrollHint>
                    <div className='directionIcon'><ScrollDownHintSVG/></div>
                    <div>scroll</div>
                </ScrollHint>
                <Banner>
                    <Slides ref={slidesRef} currentBanner={currentBanner}>
                        {images.map((image, index) => (
                            <Slide key={index} style={{ backgroundImage: `url(${image})` }} />
                        ))}
                    </Slides>
                </Banner>
                <BannerButton>
                    {images.map((_, index) => (
                            <Button key={index} onClick={() => selectBanner(index)} active={index === currentBanner} />
                    ))}
                </BannerButton>
            </Content>
        </Layout>
        {/* <M_Effect02/> */}
        </>
    );
};

export default Home;

const moveAndFadeIn = keyframes`
    0% {
        transform: translateY(-130%);
        opacity: 0;
    }
    20%{
        opacity: 1;
    }
    100% {
        transform: translateY(0);
        opacity: 0.5;
    }
`;
const moveHintText = keyframes`
    0%{
        transform: translateY(-340%);
        opacity: 0.3;
    }
    100%{
        transform: translateY(-200%);
        opacity: 1;
    }
`;

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    width: 100vw;
    min-height: calc(100vh + 1rem);
    height: 100%;

    ${media.tablet}{
        padding: 0px 20px;
        box-sizing: border-box;
    }
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    top: 0;
    width: 100%;
    min-height: 100vh;

    transition: top 0.5s ease;
`;

const Banner = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const Slides = styled.div<{ currentBanner: number }>`
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 2s ease;
    transform: ${({ currentBanner, children }) => {
        const childrenCount = React.Children.count(children);
        return `translateX(-${(currentBanner % childrenCount) * 100}%)`;
    }};
`;

const Slide = styled.div`
    min-width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`;

const Title = styled.div<{isShowHeader:boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: ${({isShowHeader})=>(isShowHeader?'10%':'15%')};
    transition: bottom 1s;
    max-width: 1200px;
    width: 100%;
    user-select: none;
    z-index: 1;

    & .title{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    
        background: url('/images/smoke14.png');
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    
        font-size: 13.125rem;
        font-family: 'InterBlack';
        line-height: 1;
    }

    & .infoBar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        color: #fff;
    }
`;

const GreetingText = styled.div<{isShowHeader:boolean}>`
    display: flex;
    position: absolute;
    top: ${({isShowHeader})=>(isShowHeader?'40%':'34%')};
    left: 50%;
    transition: top 1.5s;
    transform: translate(-50%, -50%);
    user-select: none;

    color: #fff;
    font-size: 40px;

    z-index: 1;

    & :nth-child(2){
        display: none;
    }
`;

const ScrollHint = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 50%;
    bottom: 10%;
    transform: translateX(-50%);
    z-index: 3;
    
    color: #fff;
    
    & > .directionIcon {
        position: absolute;
        opacity: 0;
        /* animation: ${moveAndFadeIn} 1.5s infinite; */
        animation-delay: 3s;
        animation-fill-mode: forwards;
    }

    & :nth-child(2){
        position: absolute;
        opacity: 0;
        top: -0%;

        font-size: 24px;
        letter-spacing: 0.0625rem;

        /* animation: ${moveHintText} 1.5s infinite; */
        animation-delay: 3s;
    }
`;

const BannerButton = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 20px;
    width: 100%;
    z-index: 2;
`;

const Button = styled.button<{ active: boolean }>`
    width: 12px;
    height: 12px;
    margin: 0 5px;
    border-radius: 50%;
    border: none;
    background-color: ${({ active }) => (active ? 'white' : 'gray')};
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:focus {
        outline: none;
    }
`;