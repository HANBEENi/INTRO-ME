import Body from "@/components/layout/Body";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProjectCard from "@/components/section_modules/ProjectCard";
import { media } from "@/styles/mediaQuery";
import { PROJECT_DATA } from "@/data/ProjectData";

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (contentRef.current) {
        // 이벤트가 수직 스크롤일 경우, 이를 수평 스크롤로 전환
        if (event.deltaY !== 0) {
          contentRef.current.scrollLeft += event.deltaY;
          event.preventDefault(); // 기본 수직 스크롤 방지
        }
      }
    };

    const contentEl = contentRef.current;
    contentEl?.addEventListener("wheel", handleScroll);

    return () => {
      contentEl?.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <Body>
      <Container ref={sectionRef}>
        <Title>
          <Wrap>
            <div className="about">PROJECTS</div>
            <div className="line"></div>
            <div className="subTitleEn">
              <div className="dot" style={{ backgroundColor: "#2EBF91" }} />
              <div>PROJECTS</div>
            </div>
          </Wrap>
          <Wrap>
            <div className="dotWrap"></div>
            {/* <div className="subTitleKo" style={{color: '#2EBF91'}}>프로젝트 보기</div> */}
          </Wrap>
        </Title>
        <Content ref={contentRef}>
          {PROJECT_DATA.map((project: any, idx: number) => (
            <div className="project" key={idx}>
              <ProjectCard data={project} />
            </div>
          ))}
        </Content>
      </Container>
    </Body>
  );
};

export default Projects;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  font-size: 2.1875rem;
  font-weight: 700;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-family: "InterBold";

  & .about {
    background: url("/images/smoke_4.png");
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: cover;

    font-size: 3rem;
    font-weight: 900;

    ${(media.mobile, media.tablet)} {
      font-size: 2.375rem;
    }
  }
  & .line {
    width: 60%;
    position: relative;
  }
  & .line::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      to right,
      #acacac5e 50%,
      rgba(255, 255, 255, 0) 0%
    );
    background-size: 10px 10px;
  }
  & .subTitleEn {
    display: flex;
    align-items: center;
    gap: 15px;
    color: #fff;
    font-size: 2.25rem;
    ${(media.mobile, media.tablet)} {
      font-size: 26px;
    }
  }
  & .subTitleKo {
    font-size: 1.4375rem;
    font-family: "Inter";
    font-weight: 400;
    ${(media.mobile, media.tablet)} {
      font-size: 1.125rem;
    }
  }
  & .dotWrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  & .dot {
    width: 15px;
    aspect-ratio: 1/1;
    border-radius: 100%;
    ${(media.mobile, media.tablet)} {
      width: 10px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 70px 50px;
  width: 100%;
  height: 100%;
  padding: 20px;

  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  /** 모바일에서 부드러운 스크롤을 위해 설정 */
  -webkit-overflow-scrolling: touch;

  & .project {
    flex: 0 0 auto;
    transition: transform 0.3s ease-in-out;
    padding: 20px;
    z-index: 10;
    scroll-snap-align: start;
    &:hover {
      transform: translateY(-20px);
      border-radius: 30px;
    }
  }
`;
