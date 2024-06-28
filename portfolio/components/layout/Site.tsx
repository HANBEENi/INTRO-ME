/**
 * 페이지 기본 레이아웃 (헤더,컨텐츠,푸터)
 * 
 * [TODO]
 * - 푸터 제작
 * - 스크롤 중간에 나오는 헤더는 opacity 0.4, 마우스오버시 opacity 1
 * - 헤더 숨김 상태일 때 헤더 아이콘 노출 시킬지 고민
 * - 헤더 메뉴별 마우스 오버시 효과
 * - 마우스 꾸밈 이벤트
 * - 헤더가 스크롤이 맨 처음인 상태에서 있을 때는 컨텐츠 top:100px
 * 
 * - 스크롤을 아래로 내려갔다가 빠르게 올라올 때, 스크린탑이 될 때 바로 컨텐츠의 top값이 조정되어야하는데
 *    잠깐 멈칫 했다가 동작하는게 거슬림
 * - 스크롤 섹션 이동 시, 스크롤을 세게 당기면 화면이 충돌하듯 퉁퉁 섹션이 튕기는 무빙이 생김
 * 
 * - 스크롤 네비게이션(완료)
 */

import { media } from '@/styles/mediaQuery';
import styled, { keyframes } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash';
import Header from '@/components/layout/Header';
import { Element, Events, scroller } from 'react-scroll';
import Home from '@/components/section/01-Home';
import About from '@/components/section/02-About';
import About2 from '@/components/section/02-About2';
import Skills from '@/components/section/03-Skills';
import Projects from '@/components/section/04-Projects';
import Contact from '@/components/section/06-Contact';
import QuickAccessToggle from '@/components/section_modules/QuickAccessToggle';

const SiteLayout = () => {
    
    
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
        }, 500); // 200ms 간격으로 스크롤 이벤트 처리

        window.addEventListener('scroll',handleScroll);

        return () => {
            window.removeEventListener('scroll',handleScroll);
        }
    },[preScrollY, isShowHeader]);

    /** 스크롤 감지 섹션 이동 */
    useEffect(() => {
        const sections = Array.from(document.querySelectorAll("[data-section]"));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.getAttribute('data-section');
                    if (sectionName) {
                        scroller.scrollTo(sectionName, {
                            duration: 1000,
                            smooth: 'easeOutQuad',
                            onComplete: () => {
                            }
                        });
                    }
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.01 // 섹션의 50%가 보이면 감지
        });

        sections.forEach(section => observer.observe(section));

        return () => {
            sections.forEach(section => observer.unobserve(section));
        };
    }, []);

    return (
        <Layout isShowHeader={isShowHeader}style={{background:'linear-gradient(132deg, #2e2e2e, #000)'??'#fff'}}>
            <Header isShowHeader={isShowHeader}/>
                <Element name="home" data-section="home">
                    <Home/>
                </Element>
                <Element name="about" data-section="about">
                    <About />
                </Element>
                <Element name="about2" data-section="about2">
                    <About2 />
                </Element>
                <SkillLayout>
                    <Element name="skills" data-section="skills">
                        <Skills/>
                    </Element>
                </SkillLayout>
                <Element name="projects" data-section="projects">
                    <Projects/>
                </Element>
                <Element name="contact" data-section="contact">
                    <Contact/>
                </Element>
            <QuickToggle>
                <Toggle className="QuickAccessToggle" isScreenTop={isScreenTop}>
                    <QuickAccessToggle/>
                </Toggle>
                <div className="toggleBackground"/>
            </QuickToggle>
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

const toggleBackground = keyframes`
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
`;

const Layout = styled.div<{isShowHeader:boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    position: relative;
    width: 100%;
    min-height: calc(100vh + 100px);
    height: 100%;
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

    background: url('images/smoke09.png');
    background-size: cover;
`;


const QuickToggle = styled.div`

    & .toggleBackground{
        display: none;
    };

    &:hover .toggleBackground{
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(to right, #00000015 20%, #0000009b 80%);
        pointer-events: none;
        animation: ${toggleBackground} 0.5s forwards;
    }
`;

const Toggle = styled.div<{isScreenTop:boolean}>`
    position: fixed;
    bottom: ${({isScreenTop})=>(isScreenTop?'20px':'50px')};
    right: 2.5%;
    transition: bottom 1.5s;
    z-index: 1;
`;