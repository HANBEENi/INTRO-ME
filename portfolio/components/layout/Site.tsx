/**
 * 페이지 기본 레이아웃 (헤더,컨텐츠,푸터)
 * 
 * [TODO]
 * 1. 푸터 제작
 * 2. 스크롤 중간에 나오는 헤더는 opacity 0.4, 마우스오버시 opacity 1
 * 3. 헤더 숨김 상태일 때 헤더 아이콘 노출 시킬지 고민
 * 4. 헤더 메뉴별 마우스 오버시 효과
 * 5. 마우스 꾸밈 이벤트
 * 6. 헤더가 스크롤이 맨 처음인 상태에서 있을 때는 컨텐츠 top:100px
 * 
 * 7. 스크롤을 아래로 내려갔다가 빠르게 올라올 때, 스크린탑이 될 때 바로 컨텐츠의 top값이 조정되어야하는데
 *    잠깐 멈칫 했다가 동작하는게 거슬림
 * 8. 스크롤 네비게이션
 */

import { media } from '@/styles/mediaQuery';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { throttle } from 'lodash';
import Header from '@/components/layout/Header';
import { Element } from 'react-scroll';
import Main from '@/components/section/01-Main';
import Intro from '@/components/section/02-Intro';
import Projects from '@/components/section/03-Projects';
import Skills from '@/components/section/04-Skills';
import Links from '@/components/section/05-Links';
import Contact from '@/components/section/06-Contact';

interface HomeLayout {
    children: any,
    backgroundColor: string,
    headerBackgroundColor: string,
    color: string,
}

const SiteLayout = () => {
    
    /** 화면 스크롤(Y축) 감지 */
    const [preScrollY, setPreScrollY] = useState<number>(0);
    const [isShowHeader, setIsShowHeader] = useState<boolean>(true);
    const [isScreenTop, setIsScreenTop] = useState<boolean>(true);

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
        }, 200); // 100ms 간격으로 스크롤 이벤트 처리

        window.addEventListener('scroll',handleScroll);

        return () => {
            window.removeEventListener('scroll',handleScroll);
        }
    },[preScrollY, isShowHeader]);

    return (
        <Layout style={{background:'linear-gradient(132deg, #2e2e2e, #000)'??'#fff'}}>
            <Header showHeader={isShowHeader} />
            {/* <Content isScreenTop={isScreenTop}> */}
            <Element name="main">
                <Main/>
            </Element>
            <BackLayout>
                <video autoPlay muted playsInline>
                    <source src="/videos/smokeBackground.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <Element name="intro">
                    <Intro />
                </Element>
            </BackLayout>
            <Element name="project">
                <Projects/>
            </Element>
            <SkillLayout>
            <Element name="skills">
                <Skills/>
            </Element>
            </SkillLayout>
            <Element name="links">
                <Links/>
            </Element>
            <Element name="contact">
                <Contact/>
            </Element>
            {/* </Content> */}
            <Footer style={{backgroundColor:'#000'}}>
                <div>
                    © 2024 KIMHANBEEN PORTFOLIO. All rights reserved.<br/>
                    이 웹사이트는 상업적 목적 없이 개인 포트폴리오를 위해 제작되었습니다.<br/>
                    본 사이트의 모든 내용은 개인적 용도로만 제공됩니다.<br/>
                    Developed by KIMHANBEEN | Contact: email@example.com<br/>
                    홈 | 프로젝트 | 블로그 | 연락처<br/>
                    Last updated: June 1, 2024
                </div>
            </Footer>
        </Layout>
    );
};
export default SiteLayout;

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 100%;
    min-height: calc(100vh + 100px);
    height: 100%;
`;

const BackLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;

    video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        object-fit: cover;
    }
`;

const Footer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 100%;
    height: 100%;

    color: #fff;
`;

const SkillLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
    width: 100%;
    min-height: 100vh;
    height: 100%;

    background: url('images/smoke14.png');
    background-size: cover;
`;