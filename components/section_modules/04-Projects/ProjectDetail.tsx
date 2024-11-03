import {
  ExitSVG,
  FigmaSVG,
  GithubSVG,
  NotionSVG,
  SiteSVG,
} from "@/public/svgs/ProjectDetailSVG";
import {
  CSSSVG,
  HTMLSVG,
  NextJSDarkSVG,
  SassSVG,
  StyleComponentsSVG,
  TypeScriptSVG,
} from "@/public/svgs/SkillsIcon/FrontendSVG";
import styled from "styled-components";

const ProjectDetail = ({ setIsOpenDetailView }: any) => {
  return (
    <Layout>
      <Title>
        <div>프로젝트 상세 소개</div>
        <div>로고</div>
        <div className="exit" onClick={() => setIsOpenDetailView(false)}>
          <ExitSVG />
        </div>
      </Title>
      <Content>
        <Introduce>
          <span>프로젝트 제목</span>
          <span>프로젝트 소개</span>
        </Introduce>
        <InfoPanel>
          <OverView />
          <Summary>
            <LinkWrap>
              <LinkSet>
                <div className="sqare">
                  <FigmaSVG />
                </div>
                <span>UXUI 디자인 작성 바로가기</span>
              </LinkSet>
              <LinkSet>
                <div className="sqare">
                  <NotionSVG />
                </div>
                <span>문서 기록 바로가기</span>
              </LinkSet>
              <LinkSet>
                <div className="sqare">
                  <GithubSVG />
                </div>
                <span>깃헙 바로가기</span>
              </LinkSet>
              <LinkSet>
                <div className="sqare">
                  <SiteSVG />
                </div>
                <span>사이트 바로가기</span>
              </LinkSet>
            </LinkWrap>
            <Period>
              <span>개발 기간</span>
              <span>2024. 05. 24 - 2024. 06. 30</span>
            </Period>
            <Reaction></Reaction>
          </Summary>
        </InfoPanel>
        <Description>
          <DesWrap>
            <div className="index">사용 기술 스택</div>
            <div className="box" id="box1">
              <DesComponent>
                <div className="title">프론트엔드</div>
                <div className="content" id="tech">
                  <div className="techIconWrap">
                    <HTMLSVG />
                    <div className="hover">HTML</div>
                  </div>
                  <div className="techIconWrap">
                    <CSSSVG />
                  </div>
                  <div className="techIconWrap">
                    <TypeScriptSVG />
                  </div>
                  <div className="techIconWrap">
                    <NextJSDarkSVG />
                  </div>
                  <div className="techIconWrap">
                    <StyleComponentsSVG />
                  </div>
                  <div className="techIconWrap">
                    <SassSVG />
                  </div>
                  <div className="techIconWrap">
                    <SassSVG />
                  </div>
                  <div className="techIconWrap">
                    <SassSVG />
                  </div>
                </div>
              </DesComponent>
              <DesComponent>
                <div className="title">백엔드</div>
                <div className="content"></div>
              </DesComponent>
              <DesComponent>
                <div className="title">디자인 및 문서</div>
                <div className="content"></div>
              </DesComponent>
            </div>
          </DesWrap>
          <DesWrap style={{ alignItems: "center" }}>
            <div className="index">트러블 슈팅</div>
            <div className="box" id="box2">
              <DesComponent>
                <div className="title" id="trouble">
                  문제
                </div>
                <div className="content" id="trouble"></div>
              </DesComponent>
              <DesComponent>
                <div className="title" id="trouble">
                  해결
                </div>
                <div className="content" id="trouble"></div>
              </DesComponent>
            </div>
          </DesWrap>
          <DesWrap style={{ alignItems: "end" }}>
            <div className="index">회고</div>
            <div className="box" id="box3">
              <DesComponent>
                <div className="content" id="trouble"></div>
              </DesComponent>
            </div>
          </DesWrap>
        </Description>
      </Content>
    </Layout>
  );
};

export default ProjectDetail;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 1164px;
  min-height: 300px;
  overflow: auto;

  border-radius: 30px;

  background: #171717;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0 24px;
  margin-bottom: 5px;

  background: #fff;

  & .exit {
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 24px;
  overflow-y: auto;

  height: 100%;
  max-height: 800px;

  color: #fff;
  font-size: 1rem;

  &::-webkit-scrollbar {
    display: block;
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #171717;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(
      0deg,
      #875ec5 0%,
      #42c48e 100%
    ); /* 스크롤바 손잡이 배경 */
    border-radius: 4px; /* 스크롤바 모서리 둥글게 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(
      90deg,
      #2ebf91,
      #5c4cb5
    ); /* 호버 시 색상 변경 */
  }
`;

const Introduce = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 17px 0;
  gap: 15px;

  border-radius: 20px;
  background: #2a2a2a;

  & :nth-child(1) {
    font-weight: bold;
    font-size: 1.125rem;
  }
`;

const InfoPanel = styled.div`
  display: flex;
  width: 100%;
  padding: 17px 20px;
  gap: 20px;

  border-radius: 20px;
  background: #fff;
`;

const OverView = styled.div`
  display: flex;
  flex: 2;
  height: 384px;

  border-radius: 20px;
  background: url("/images/projectList/overview/HB-PORTFOLIO.png");
  background-size: cover;
  background-position: center;
`;

const Summary = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const LinkWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 17px 20px;
  gap: 10px;

  border-radius: 20px;
  background: #171717;
`;

const LinkSet = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 0;

  & .sqare {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;

    border-radius: 7px;
    background: linear-gradient(90deg, #42c48e 0%, #875ec5 100%);
  }
  & span {
    white-space: nowrap;

    background: linear-gradient(90deg, #42c48e 0%, #875ec5 100%);
    -webkit-background-clip: text;
    background-clip: text;

    color: transparent;

    &:hover {
      font-size: 1.125rem;
    }
  }

  cursor: pointer;
`;

const Period = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 17px 20px;
  gap: 24px;
  white-space: nowrap;

  width: 100%;
  height: 60px;

  border-radius: 15px;
  background: #777777;

  color: #000;

  user-select: none;
  pointer-events: none;
`;

const Reaction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 120px;

  border-radius: 20px;
  background: #777777;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 17px 20px;
  gap: 30px;

  width: 100%;
  height: 800px;

  background: #2a2a2a;
  border-radius: 20px;
`;

const DesWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & .index {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;

    width: 200px;

    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    background: linear-gradient(90deg, #42c48e 0%, #875ec5 100%);
  }

  & .box {
    display: grid;
    /* grid-template-columns: repeat(3, 1fr); */
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    position: relative;
    padding: 20px 0;
    gap: 20px;

    width: 100%;
    min-height: 113px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #42c48e 0%, #875ec5 100%);
    }
  }

  #box1.box {
    background: linear-gradient(
      180deg,
      rgba(66, 196, 142, 0.3) 0%,
      rgba(115, 115, 115, 0) 100%
    );
  }
  #box2.box {
    background: linear-gradient(
      180deg,
      rgba(135, 94, 197, 0.3) 0%,
      rgba(115, 115, 115, 0) 100%
    );
  }
  #box3.box {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(115, 115, 115, 0) 100%
    );
  }
`;

const DesComponent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  border-radius: 10px;

  #trouble.title {
    background: #875ec5;
  }
  & .title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px 20px;

    height: 30px;

    background: #42c48e;

    color: #000;
    font-weight: bold;
  }

  #tech.content {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
  }
  #trouble.content {
    display: grid;
    grid-template-columns: 1;
  }
  & .content {
    display: flex;
    gap: 15px;
    padding: 10px 15px;

    width: 100%;
    min-height: 60px;
    height: 100%;
    background: #171717;

    & .techIconWrap {
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      padding: 6px;

      width: 40px;
      height: 40px;

      border-radius: 6px;
      border: 1px solid #fff;

      svg {
        pointer-events: none;
      }

      &:hover .hover {
        display: flex;
      }

      & .hover {
        display: none;
        position: absolute;
        padding: 2px 5px;
        transform: translate(50%, 80%);
        z-index: 300;

        border-radius: 5px;
        border: 1px solid #fff;
        background: #171717;
      }
    }

    cursor: pointer;
  }
`;
