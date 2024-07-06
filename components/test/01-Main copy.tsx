import styled, { keyframes } from 'styled-components';
import M_Effect02 from '@/components/section_modules/mouse_effects/M_Effect02';
import { media } from '@/styles/mediaQuery';
import { useEffect, useState } from 'react';
import { throttle } from 'lodash';
import CompactFooter from '@/components/section_modules/CompactFooter';
import { ScrollDownHintSVG } from '@/public/svgs/PageDirectionSVG';

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
            <Content isScreenTop={isShowHeader}>
                <Title isScreenTop={isShowHeader}>
                    <div>
                        <div className='title'>PORTFOLIO</div>
                    </div>
                    <CompactFooter/>
                </Title>
                <GreetingText isScreenTop={isShowHeader}>
                    <div>안녕하세요, 웹 프론트엔드 개발자 김한빈입니다.</div>
                    <div>끊임없이 배우고, 성장하겠습니다.</div>
                </GreetingText>
                <div className='directionIcon'><ScrollDownHintSVG/></div>
                <Banner></Banner>
            </Content>
        </Layout>
        {/* <M_Effect02/> */}
        </>
    );
};

export default Main;

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
`;

const Content = styled.div<{isScreenTop:boolean}>`
    display: flex;
    justify-content: center;
    position: absolute;
    /* top: ${({isScreenTop})=>(isScreenTop?'100px':'0px')}; */
    top: 0;
    /* width: 95%; */
    width: 100%;
    /* min-height: calc(100vh - 100px); */
    min-height: 100vh;

    transition: top 0.5s ease;

    & > .directionIcon {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0%);
    }
`;

const Banner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    
    background: url('/images/banner/banner01.jpg');
    background-repeat: no-repeat;
    background-size: cover;
`;

const Title = styled.div<{isScreenTop:boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: ${({isScreenTop})=>(isScreenTop?'5%':'10%')};
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

const GreetingText = styled.div<{isScreenTop:boolean}>`
    display: flex;
    position: absolute;
    top: ${({isScreenTop})=>(isScreenTop?'40%':'35%')};
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