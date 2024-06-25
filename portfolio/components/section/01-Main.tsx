import styled, { keyframes } from 'styled-components';
import M_Effect02 from '@/components/section_modules/mouse_effects/M_Effect02';
import { media } from '@/styles/mediaQuery';
import { useEffect, useState } from 'react';
import { throttle } from 'lodash';
import MainText from '@/components/section_modules/text_effects/MainText';

const Main = () => {

    const [preScrollY, setPreScrollY] = useState<number>(0);
    const [isShowHeader, setIsShowHeader] = useState<boolean>(true);
    const [isScreenTop, setIsScreenTop] = useState<boolean>(true);

    /** 화면 스크롤(Y축) 감지 */
    useEffect(() => {
        const handleScroll = throttle(() => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > preScrollY && isShowHeader){
                setIsShowHeader(false);
            } else if (currentScrollY < preScrollY && !isShowHeader){
                setIsShowHeader(true);
            }
            setIsScreenTop(currentScrollY === 0);
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
            <Content isScreenTop={isScreenTop}>
                <Title>
                    PORTFOLIO
                </Title>
                <div className='banner'>
                    <MainText/>
                </div>
            </Content>
        </Layout>
        <M_Effect02/>
        </>
    );
};

export default Main;

// 변수
const angle = -45;
const duration = 1000; // milliseconds
const delay = 600; // milliseconds

// 애니메이션 키 프레임
const revealBG = keyframes`
    from { 
        transform: skewX(${angle}deg) translateX(-100%) scaleX(0);
        opacity: 0 ;
    }
    to   { 
        transform: skewX(${angle}deg) translateX(-100%) scaleX(1);
        opacity: 0.3;
    }
`;


const Layout = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    height: 100%;

    ${media.tablet}{
        padding: 0px 20px;
        box-sizing: border-box;
    }

    &::before {
        content: '';
        position: absolute;
        width: 400vw;
        height: 200vh;
        top: 0;
        left: 25%;
        transform: skewX(${angle}deg) translateX(-100%) scaleX(0);
        
        background: radial-gradient(182.64% 80.03% at 22.72% 65.36%, #000 0%, #2e2e2e 100%);
        
        animation: ${revealBG} ${(duration + delay)}ms cubic-bezier(0.19, 1, 0.22, 1) forwards;
    }
`;

const Content = styled.div<{isScreenTop:boolean}>`
    display: flex;
    justify-content: center;
    position: absolute;
    top: ${({isScreenTop})=>(isScreenTop?'100px':'50px')};
    width: 95%;
    min-height: calc(100vh - 100px);

    transition: top 0.5s ease;
    
    & .banner {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        
        background: url('/images/banner/banner01.jpg');
        background-repeat: no-repeat;
        background-size: cover;
    }

`;

const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    max-width: 1200px;
    width: 100%;
    height: 200px;

    background: url('/images/smoke14.png');
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

    font-size: 14.375rem;
    font-weight: 900;
`;