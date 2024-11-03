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
 * - 스크롤 네비게이션
 *    메뉴바로 원하는 섹션 스크롤로 이동하는 것은 되는데, 이것과 스크롤시 다음 혹은 이전 섹션으로 애니메이션 이동되는 것이 같이 동작하지 않음
 *
 * - 푸터에 다다르면 메뉴바가 on/off 반복되어 깜빡깜빡거리는 문제 발생
 */

import styled, { keyframes } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { throttle } from "lodash";
import Header from "@/components/layout/Header";
import Home from "@/components/section/01-Home";
import About from "@/components/section/02-About";
import Skills from "@/components/section/03-Skills";
import Projects from "@/components/section/04-Projects";
import Contact from "@/components/section/05-Contact";
import Footer from "@/components/section/06-Footer";
import QuickAccessToggle from "@/components/section_modules/QuickAccessToggle";

const SiteLayout = () => {
  const [preScrollY, setPreScrollY] = useState<number>(0);
  const [isShowHeader, setIsShowHeader] = useState<boolean>(true);
  const [isScreenTop, setIsScreenTop] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>("home"); // 현재 활성화된 섹션 name
  const [sections, setSections] = useState([
    "home",
    "about",
    "skills",
    "projects",
    "contact",
    "footer",
  ]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  /** 화면 스크롤(Y축) 감지 */
  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > preScrollY && isShowHeader) {
        setIsShowHeader(false);
      } else if (currentScrollY < preScrollY && !isShowHeader) {
        setIsShowHeader(true);
      }
      setIsScreenTop(currentScrollY === 0);
      setPreScrollY(currentScrollY);

      // 무한 스크롤 로직
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMoreSections();
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [preScrollY, isShowHeader]);

  const loadMoreSections = () => {
    // 여기에서 필요한 경우 섹션을 추가합니다.
    setSections((prevSections) => [
      ...prevSections,
      `section${prevSections.length + 1}`,
    ]);
  };

  return (
    <Layout
      isShowHeader={isShowHeader}
      style={{ background: "linear-gradient(132deg, #000, #2e2e2e)" ?? "#fff" }}
    >
      {/* <Layout isShowHeader={isShowHeader} style={{background:'linear-gradient(132deg, #d9d9d9, #f5f5f5)'??'#fff'}}> */}
      <Header isShowHeader={isShowHeader} activeSection={activeSection} />
      <Content>
        {sections.map((section) => (
          <Section key={section} id={section}>
            <div>
              {section === "home" && <Home />}
              {section === "about" && <About />}
              {section === "skills" && <Skills />}
              {section === "projects" && <Projects />}
              {section === "contact" && <Contact />}
              {section === "footer" && <Footer />}
            </div>
          </Section>
        ))}
      </Content>
      <QuickToggle>
        <Toggle className="QuickAccessToggle" isScreenTop={isScreenTop}>
          <QuickAccessToggle />
        </Toggle>
        <div className="toggleBackground" />
      </QuickToggle>
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

const Layout = styled.div<{ isShowHeader: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  position: relative;
  width: 100%;
  min-height: calc(100vh + 100px);
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  scroll-snap-type: y mandatory; // 수직 스크롤 스냅 설정
  overflow-y: scroll;
  scroll-behavior: smooth;
  overscroll-behavior-y: contain; // 스크롤 넘침 동작 제어
`;

const Section = styled.div`
  scroll-snap-align: start; // 스크롤 스냅 포인트 설정
  scroll-snap-stop: always;
  width: 100%;
  height: 100vh;
`;

const QuickToggle = styled.div`
  & .toggleBackground {
    display: none;
  }

  &:hover .toggleBackground {
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

const Toggle = styled.div<{ isScreenTop: boolean }>`
  position: fixed;
  bottom: ${({ isScreenTop }) => (isScreenTop ? "20px" : "50px")};
  right: 2.5%;
  transition: bottom 1.5s;
  z-index: 1;
`;

const BackLayout = styled.div`
  /* background:linear-gradient(132deg, #2e2e2e, #000); */
  background: url("/images/smoke.png");
  /* background-repeat: no-repeat; */
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
