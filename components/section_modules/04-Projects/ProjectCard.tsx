import { GitLinkIconSVG, SiteLinkIconSVG } from "@/public/svgs/ProjectSVG";
import { url } from "inspector";
import styled from "styled-components";

interface Props {
  title: string;
  year: string;
  type: string;
  linkList: [{}];
  sumnail: string;
  logo: Element;
  tagList: [];
  techIconList: [];
  description: string;
}

const ProjectCard = ({ data, setIsOpenDetailView }: any) => {
  const handleOpenLink = (link: string) => {
    window.open(link, "_blank");
  };
  return (
    <Layout>
      <Title titleBackground={data.titleBackground}>{data.title}</Title>
      <Card style={{ background: `url(${data.sumnail})` }}>
        <Top>
          <div className="infos">
            <span>{data.year}</span>
            <span>{data.type}</span>
          </div>
          <div className="links">
            <div
              className="git"
              onClick={() => handleOpenLink(data.linkList.github)}
            >
              <GitLinkIconSVG />
            </div>
            <div
              className="site"
              onClick={() => handleOpenLink(data.linkList.site)}
            >
              <SiteLinkIconSVG />
            </div>
          </div>
        </Top>
        <Middle>
          <div className="logo">{data.logo}</div>
          <div
            className="detailViewButton"
            onClick={() => setIsOpenDetailView(true)}
          >
            <span>상세 보기</span>
          </div>
        </Middle>
        <Bottom>
          <div className="shapTech">
            {data.tagList.map((tagList: any, idx: number) => (
              <span key={idx}>{tagList}</span>
            ))}
            <span># ...</span>
          </div>
          <div className="iconTech">
            {data.techIconList.map((techList: any, idx: number) => (
              <div className="iconBox" key={idx}>
                {techList}
              </div>
            ))}
            <div className="iconBox">tc</div>
            <div className="iconBox">tc</div>
          </div>
        </Bottom>
      </Card>
      <Description>{data.description}</Description>
    </Layout>
  );
};

export default ProjectCard;
const padding = "20px";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  min-width: 320px;
  width: 100%;
`;

const Title = styled.div<{ titleBackground: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  background: url(${(props) => props.titleBackground});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  font-family: "InterBold";
  font-weight: 800;
  font-size: 37px;

  pointer-events: none;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 370px;
  min-height: 410px;
  aspect-ratio: calc(320 / 410);
  overflow: hidden;

  border-radius: 20px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 4px 20px rgba(0, 0, 0);

  color: #fff;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px ${padding};
  width: 100%;

  background: #000000ae;
  color: #fff;

  & .infos {
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;

    font-size: 0.8125rem;

    & :nth-child(2) {
      padding: 5px 10px;
      border-radius: 20px;
      background: #8368c3;
    }
    pointer-events: none;
  }
  & .links {
    display: flex;
    align-items: center;
    gap: 10px;
    & * {
      cursor: pointer;
    }
  }
`;

const Middle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;

  & .detailViewButton {
    display: none;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;

    background: #0000007c;

    & span {
      padding: 10px 40px;
      border-radius: 6px;
      background: #313131;
      font-size: 1.25rem;
    }
  }
  & .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  &:hover .detailViewButton {
    display: flex;
    z-index: 1;
  }
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px ${padding};
  position: relative;
  width: 100%;

  background: #000000ae;
  pointer-events: none;

  & .shapTech {
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 0 ${padding};
    gap: 5px;
    width: 100%;
    white-space: nowrap;
    position: absolute;
    top: -40%;
    transform: translateY(-40%);
    overflow-x: hidden;

    & span {
      padding: 5px 5px;
      border-radius: 3px;
      background: #00000061;
      font-size: 0.8125rem;
      font-weight: 200;
    }
  }
  & .iconTech {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 ${padding};
    gap: 5px;
    width: 100%;

    & .iconBox {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      padding: 5px;

      border-radius: 6px;
      border: 1px solid #fff;
    }
  }
`;

const Description = styled.div`
  font-size: 16px;
  text-align: center;
  color: #fff;
  line-height: 25px;
`;
