import { GitLinkIconSVG, PortfolioLogoSVG, SiteLinkIconSVG } from "@/public/svgs/ProjectSVG";
import styled from "styled-components";

const ProjectCard = () => {
    return(
        <Layout>
            <Title>PORTFOLIO</Title>
            <Card>
                <Top>
                    <div className="infos">
                        <span>2024</span>
                        <span>PERSONAL</span>
                    </div>
                    <div className="links">
                        <div className="git"><GitLinkIconSVG/></div>
                        <div className="site"><SiteLinkIconSVG/></div>
                    </div>
                </Top>
                <Middle>
                    <div className="logo"><PortfolioLogoSVG/></div>
                    <div className="detailViewButton">
                        <span>상세 보기</span>
                    </div>
                </Middle>
                <Bottom>
                    <div className="shapTech">
                        <span># 반응형웹</span>
                        <span># 반응형웹</span>
                        <span># 반응형웹</span>
                        <span># 반응형웹</span>
                        <span># ...</span>
                    </div>
                    <div className="iconTech">
                        <div className="iconBox">tc</div>
                        <div className="iconBox">tc</div>
                        <div className="iconBox">tc</div>
                    </div>
                </Bottom>
                
            </Card>
            <Description>
                개발자로서의 저의 프로필을 소개하는
                <br/>개인 웹사이트입니다.
            </Description>
            
        </Layout>
    );
};

export default ProjectCard;
const padding = '20px';

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    min-width: 320px;
    width: 100%;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    background: url('/images/smoke.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

    font-family: 'InterBold';
    font-weight: 800;
    font-size: 37px;

    pointer-events: none;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 410px;
    aspect-ratio: calc(320 / 410);
    overflow: hidden;

    border-radius: 20px;
    background: url('/images/smoke.png');
    background-position: center;
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
    
    & .infos{
        display: flex;
        align-items: center;
        gap: 10px;
        white-space: nowrap;

        font-size: 0.8125rem;

        & :nth-child(2){
            padding: 5px 10px;
            border-radius: 20px;
            background: #8368C3;
        }
        pointer-events: none;
    }
    & .links{
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

    & .detailViewButton{
        display: none;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: absolute;

        background: #0000007c;

        & span{
            padding: 10px 40px;
            border-radius: 6px;
            background: #313131;
            font-size: 1.25rem;
        }
    }
    & .logo{
    }
    &:hover .detailViewButton{
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

    & .shapTech{
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

        & span{
            padding: 5px 5px;
            border-radius: 3px;
            background: #00000061;
            font-size: 0.8125rem;
            font-weight: 200;
        }
    }
    & .iconTech{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 ${padding};
        gap: 5px;
        width: 100%;

        & .iconBox{
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