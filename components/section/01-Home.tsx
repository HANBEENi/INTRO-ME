import styled, { keyframes } from 'styled-components';
import { media } from '@/styles/mediaQuery';
import { useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash';
import CompactFooter from '@/components/section_modules/CompactFooter';
import { ScrollDownHintSVG } from '@/public/svgs/PageDirectionSVG';
import React from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';

const M_Effect02 = dynamic(()=> import('@/components/section_modules/mouse_effects/M_Effect02'));

/**
 * [ TODO ]
 * 1. GreetingText Top 값 하드가 아닌, 정확한 가운데 맞춤으로 코드 변경하기
 * 
 */

const Home = () => {
    const [isAction, setIsAction] = useState<boolean>(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    /** 배너 이미지 */
    const images = [
        '/images/banner/banner01.jpg',
        '/images/banner/banner02.jpg',
        '/images/banner/banner03.jpg',
        '/images/banner/banner04.jpg'
    ];
    const text = 'PORTFOLIO';

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

    /** BackText 애니메이션 효과 */
    // 각 Text 컴포넌트에 대한 참조를 저장
    const textRefs = useRef<(HTMLElement | null)[]>([]);
    textRefs.current = [];

    // Text 컴포넌트에 Ref를 추가
    const addTextRefs = (el:HTMLElement|null) => {
        if (el && !textRefs.current.includes(el)){
            textRefs.current.push(el);
        }
    }

    useEffect(() => {
        textRefs.current.forEach((text, index) => {
            gsap.fromTo(text, 
                // from(초기 상태)
                {
                    // WebkitTextFillColor: 'transparent',
                    WebkitTextStrokeColor: '#fff',
                    // WebkitTextStroke: '1px #fff',
                }, 
                // to(최종 상태)
                {
                    WebkitTextFillColor: '#fff',
                    delay: index * 0.7,
                    duration: 3,
                    ease: 'power2.inOut',
                    clipPath: 'inset(0 100% 0 0)',
                    onUpdate: function () {
                        const progress = this.progress();
                        const clipPathValue = `inset(0 ${100 - (progress * 100)}% 0 0)`;
                        (text!.style as any).clipPath = clipPathValue;
                        (text!.style as any).WebkitClipPath = clipPathValue;
                    },
                    onComplete: function () {
                        gsap.to(text, {
                            WebkitTextStrokeColor: '#fff', // 테두리 색상을 원래 색상으로 설정
                            WebkitTextFillColor: '#fff',
                            clipPath: 'inset(0 0 0 0)', // 텍스트를 다시 왼쪽에서 오른쪽으로 채우기
                            duration: 2,
                            ease: 'power2.inOut',
                        });
                    }
                }
            );
        });
    }, [isAction]);

    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setIsAction(true);
            }else{
                setIsAction(false);
            }
            });
        },
        {
            threshold: 0.3, // 섹션의 30%가 보일 때 트리거
        }
        );

        if (sectionRef.current) {
        observer.observe(sectionRef.current);
        }

        return () => {
        if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
        }
        };
    }, []);

    return(
        <Layout ref={sectionRef}>
            <Content>
                <Title isShowHeader={isShowHeader}>
                    <div className="title">
                        {text.split('').map((text, index)=>(
                            <TitleText key={index} delay={index * 0.2} style={{backgroundPosition:`${(index*13)}%`}}>
                                {text}
                            </TitleText>
                        ))}
                    </div>
                    <CompactFooter/>
                </Title>
                <GreetingText isShowHeader={isShowHeader}>
                    <div ref={addTextRefs}>안녕하세요,&nbsp;웹 프론트엔드&nbsp;개발자&nbsp;김한빈입니다.</div>
                    <div className="base">안녕하세요,&nbsp;웹 프론트엔드&nbsp;개발자&nbsp;김한빈입니다.</div>
                    {/* <div ref={addTextRefs}>웹 프론트엔드&nbsp;개발자&nbsp;김한빈입니다.</div> */}
                    {/* <div>끊임없이&nbsp;배우고,&nbsp;성장하겠습니다.</div> */}
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
            {/* <M_Effect02/> */}
        </Layout>
    );
};

export default Home;

/** --- 키프레임 --- */
// 스크롤 힌트 아이콘
const moveHintIcon = keyframes`
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
// 스크롤 힌트 텍스트
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
// 타이핑 효과
const typing = keyframes`
    0%{
        width: 0;
    }
    100%{
        width: 110%;
    }
`;
const title = keyframes`
    0%, 100%{
        transform: translateY(0) rotate(0deg);
    }
    50% {
        transform: translateY(-20px) rotate(-5deg);
    }
`;
const greetingText = keyframes`
    0%{
        -webkit-text-fill-color: transparent;
    }
    100%{
        -webkit-text-fill-color: #fff;
        clip-path: inset(0 100% 0 0);
    }
`;

/** --- 스타일 --- */
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
    }

    & .infoBar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        color: #fff;
    }
`;
const TitleText = styled.div<{delay: number}>`
    font-size: 13.125rem;
    font-family: 'InterBlack';
    line-height: 1;

    animation: ${title} 2s ease-in-out infinite;
    animation-delay: ${({ delay }) => delay}s;

    background: url('/images/smoke14.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 20%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const GreetingText = styled.div<{isShowHeader:boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    position: absolute;
    top: ${({isShowHeader})=>(isShowHeader?'40%':'34%')};
    left: 50%;
    transition: top 1.5s;
    transform: translate(-50%, -50%);
    user-select: none;
    white-space: nowrap;
    z-index: 1;

    font-family: 'InterBlack';
    font-weight: 700;
    font-size: 40px;
    -webkit-text-stroke: 1px #fff;
    -webkit-text-fill-color: transparent;
    color: #fff;
    
    & :nth-child(1){
        display: flex;
        /* animation: ${greetingText} 1s ease-in-out; */
        white-space: nowrap;
        overflow: hidden;
    }
    & .base{
        position: absolute;
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
        /* animation: ${moveHintIcon} 1.5s infinite; */
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