import Body from "@/components/layout/Body";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import ProjectCard from "@/components/section_modules/04-Projects/ProjectCard";
import { media } from "@/styles/mediaQuery";
import { PROJECT_DATA } from "@/data/ProjectData";
import ProjectDetail from "../section_modules/04-Projects/ProjectDetail";

const Projects = () => {
  const projects = [...PROJECT_DATA, ...PROJECT_DATA, ...PROJECT_DATA];
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [isOpenDetailView, setIsOpenDetailView] = useState<boolean>(false);

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

  useEffect(() => {
    // DetailView가 열릴 때 body의 스크롤 정지
    if (isOpenDetailView) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // 컴포넌트 언마운트 시 원상복구
    };
  }, [isOpenDetailView]);

  return (
    <Layout>
      <InLayout>
        <Container ref={sectionRef} isDetailViewOpen={isOpenDetailView}>
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
            </Wrap>
          </Title>
        </Container>
      </InLayout>
      <Content
        ref={contentRef}
        projectQuantity={projects.length}
        isOpenDetailView={isOpenDetailView}
      >
        {projects.map((project: any, idx: number) => (
          <div className="project" key={idx}>
            <ProjectCard
              data={project}
              setIsOpenDetailView={setIsOpenDetailView}
            />
          </div>
        ))}
      </Content>
      {isOpenDetailView ? (
        <DetailView>
          <ProjectDetail setIsOpenDetailView={setIsOpenDetailView} />
        </DetailView>
      ) : (
        ""
      )}
    </Layout>
  );
};

export default Projects;

const slide = keyframes`
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(calc(-100% / 3));
      }
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  width: 100vw;
  height: 100vh;

  ${media.tablet} {
    padding: 0px 20px;
    box-sizing: border-box;
  }
`;

const InLayout = styled.div`
  display: flex;
  padding-top: 150px;
  transition: padding-top 1s;
  max-width: 1200px;
  width: 100%;
  overflow-y: scroll;
`;

const Container = styled.div<{ isDetailViewOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  /* DetailView가 열릴 때 pointer-events를 비활성화하여 이벤트 차단 */
  pointer-events: ${({ isDetailViewOpen }) =>
    isDetailViewOpen ? "none" : "auto"};
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

const Content = styled.div<{
  projectQuantity: number;
  isOpenDetailView: boolean;
}>`
  display: flex;
  gap: 0 50px;
  width: ${({ projectQuantity }) =>
    `calc((370px + 50px) * ${projectQuantity})`};
  padding: 20px;
  overflow-x: hidden; //자동슬라이드위함
  position: relative; //자동슬라이드 애니메이션 적용할 기준 위치

  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  /** 모바일에서 부드러운 스크롤을 위해 설정 */
  -webkit-overflow-scrolling: touch;

  animation: ${slide} 50s linear infinite;
  animation-play-state: ${({ isOpenDetailView }) =>
    isOpenDetailView ? "paused" : "unset"};

  &:hover {
    animation-play-state: paused;
  }

  & .project {
    display: flex;
    transition: transform 0.3s ease-in-out;
    z-index: 10;
    scroll-snap-align: start;

    &:hover {
      transform: translateY(-20px);
      border-radius: 30px;
    }
  }
`;

const DetailView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3000;

  width: 100vw;
  height: 100vh;

  background: #0000007b;

  pointer-events: auto; /* DetailView 안에서는 이벤트를 활성화 */
`;
