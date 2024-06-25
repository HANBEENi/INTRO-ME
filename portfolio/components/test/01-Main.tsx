import styled, { css, keyframes } from 'styled-components';
import M_Effect02 from '@/components/section_modules/mouse_effects/M_Effect02';
import { media } from '@/styles/mediaQuery';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Main = () => {

    // 각 Text 컴포넌트에 대한 참조를 저장
    const textRefs = useRef<(HTMLElement | null)[]>([]);
    textRefs.current = [];

    // Text 컴포넌트에 Ref를 추가
    const addTextRefs = (el:HTMLElement|null) => {
        if (el && !textRefs.current.includes(el)){
            textRefs.current.push(el);
        }
    }

    useEffect(()=>{
        const handleMouseEnter = (e:MouseEvent) => {
            gsap.to(e.currentTarget, {
                backgroundSize: '100%',
                color: "rgb(182, 182, 182, 0.2)",
                duration: 0.5,
                ease: 'none'
            });
        };
        const handleMouseLeave = (e:MouseEvent) => {
            gsap.to(e.currentTarget, {
                backgroundSize: '0%',
                color: "rgb(182, 182, 182, 0.2)",
                duration: 0.5,
                ease: 'none'
            });
        };
        textRefs.current.forEach((text) => {
            // 마우스 오버 이벤트
            if(text){
                text.addEventListener('mouseenter', () => {
                gsap.to(text, {
                    backgroundSize: '100%', // 배경을 100%로 채움
                    color: "#fff", // 텍스트 색상 변경 (옵션)
                    duration: 0.5, // 애니메이션 지속 시간
                    ease: 'none',
                });
            });
            }
            // 마우스 아웃 이벤트
            if(text){
                text.addEventListener('mouseleave', () => {
                gsap.to(text, {
                    backgroundSize: '0%', // 배경을 다시 0%로
                    color: '#fff', // 텍스트 색상을 원래대로 (옵션)
                    duration: 2, // 애니메이션 지속 시간
                    ease: 'none',
                });
            });
            }
        });
        // 이벤트 리스너 정리 함수 반환
        return () => {
            textRefs.current.forEach((text) => {
                if (text) {  // null 체크
                    text.removeEventListener('mouseenter', handleMouseEnter);
                    text.removeEventListener('mouseleave', handleMouseLeave);
                }
            });
    };
    },[]);

    return(
        <>
        <Layout>
            <Content>
                <MainText>
                    <TextMask id="firstText">
                        <Text delay={0} type="1">
                            <span ref={addTextRefs} >One</span>
                            <span ref={addTextRefs}>line</span>
                            <span ref={addTextRefs}>at</span>
                            <span ref={addTextRefs}>a</span>
                            <span ref={addTextRefs}>time,</span>
                        </Text>
                        <Text delay={1} type="2">
                            <span ref={addTextRefs}>crafting</span>
                            <span ref={addTextRefs}>success</span>
                        </Text>
                    </TextMask>
                    <TextMask id="lastText">
                        <Text delay={2} type="3">
                            <span ref={addTextRefs}>한 줄 한 줄</span> 
                            <FocusText>
                                <span id="blurText" ref={addTextRefs}>성공을</span>
                                <Mask>
                                    <div ref={addTextRefs}>성공을</div>
                                </Mask>
                            </FocusText>
                            <span ref={addTextRefs}>만들어가다</span>
                        </Text>
                    </TextMask>
                </MainText>
                <Title>PORTFOLIO</Title>
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
const linearColor = '#c0c0c0';

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
const revealText1 = keyframes`
  from { opacity: 0; transform: translate(-20%, 90%) matrix(1, 0, 0, 1, 0, 0); }
  to   { opacity: 1; transform: translate(0%, 0%) matrix(1, 0, 0, 1, 0, 0); }
`;
const revealText2 = keyframes`
  from { opacity: 0; transform: translate(20%, -80%) matrix(1, 0, 0, 1, 0, 0); }
  to   { opacity: 1; transform: translate(0%, 0%) matrix(1, 0, 0, 1, 0, 0); }
`;
const revealText3 = keyframes`
  from { opacity: 0; transform: translate(0%, 10%) matrix(1, 0, 0, 1, 0, 0); }
  to   { opacity: 1; transform: translate(0%, 0%) matrix(1, 0, 0, 1, 0, 0); }
`;

const maskMove = keyframes`
  to {
    transform: translateX(70px);
  }
`;

const scrollUp = keyframes`
    to {
        transform: translate(-50%, -150%); // 화면 위로 스크롤 시 이동
    }
`;

const textMove = keyframes`
  to {
    transform: translateX(-70px);
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

const Content = styled.div`
    display: flex;
    position: relative;
    top: 80px;
    max-width: 1200px;
    width: 100%;
    min-height: calc(100vh - 100px);
`;

const MainText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    z-index: 100;

    // 스크롤에 따라 올라가는 애니메이션
    &.scroll-up {
        animation: ${scrollUp} 3s forwards; // 애니메이션 이름과 지속시간, 종료 상태 지정
    }
    
    font-size: 2.1875rem;

    & #firstText{
        font-family: 'ONEMobileTitle', sans-serif;
        text-shadow: 0px 8px 8px rgba(69, 69, 69, 0.2);
    }
    & #lastText{
        font-family: 'GmarketSansTTFLight', sans-serif;
    }
`;

const TextMask = styled.div`
    display: flex;
    gap: 15px;
`;

const Text = styled.span<{delay:number; type:string}>`
    display: inline-block;
    opacity: 0;
    transform: translate(0%, 100%);
    
    animation: ${props => {
        switch (props.type){
            case '1':
                return css`${revealText1} ${duration}ms cubic-bezier(0.7, 0, 0.3, 1) forwards ${props.delay * delay}ms;`;
            case '2':
                return css`${revealText2} ${duration}ms cubic-bezier(0.7, 0, 0.3, 1) forwards ${props.delay * delay}ms;`;
            case '3':
                return css`${revealText3} ${duration}ms cubic-bezier(0.7, 0, 0.3, 1) forwards ${props.delay * delay}ms;`;
            default:
                return css``;
        }
    }};

    /* color: rgb(182, 182, 182, 0.2); */
    color: #fff;
    background: linear-gradient(to right, #a8a8a8, #a8a8a8) no-repeat;
    transition: background-size cubic-bezier(.1,.5,.5,1) 0.5s;
    -webkit-background-clip: text;
    background-clip: text;

    & > span{
        padding-right: 8px;
    }
`;

const FocusText = styled.span`
    position: relative;
    text-transform: uppercase;
    margin: 0 30px;
    & #blurText{
        filter: blur(3px);
        opacity: 0.05;
    }
`;

const Mask = styled.div`
    position: absolute;
    top: -8px;
    left: 0;
    width: 110%;
    white-space: nowrap;
    text-transform: uppercase;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    background: 
         linear-gradient(${linearColor}, ${linearColor}) no-repeat,
         linear-gradient(to right, ${linearColor}, ${linearColor}) no-repeat,
         linear-gradient(to right, ${linearColor}, ${linearColor}) bottom left no-repeat,
         linear-gradient(to right, ${linearColor}, ${linearColor}) bottom left no-repeat,
         linear-gradient(${linearColor}, ${linearColor}) bottom right no-repeat,
         linear-gradient(${linearColor}, ${linearColor}) bottom right no-repeat,
         linear-gradient(${linearColor}, ${linearColor}) top right no-repeat,
         linear-gradient(${linearColor}, ${linearColor}) top right no-repeat;
    background-size: 10px 2px, 2px 10px, 2px 10px, 10px 2px, 2px 10px, 10px 2px, 10px 2px, 2px 10px, 10px 2px;
    color: '#fff';
    padding: 5px;
    box-sizing: border-box;
    animation: ${maskMove} 1.5s ease 2 alternate;

    & > div{
        transform: translateX(0);
        animation: ${textMove} 1.5s ease 2 alternate;
    }
`;

const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;

    background: url('/images/smoke14.png');
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

    /* color: #fff; */
    font-size: 13.125rem;
    font-weight: 900;
`;