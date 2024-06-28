import styled from "styled-components";
import { EmailHoverSVG, EmailSVG, GithubHoverSVG, GithubSVG, NotionHoverSVG, NotionSVG, OpenKaKaoHoverSVG, OpenKaKaoSVG } from "@/public/svgs/FooterSVG";

/**
 * [TODO][Fix] LinkItem div를 cursor: pointer 를 적용하려고 하는데, 적용이 되지 않음.
 * 
 */

const CompactFooter = () => {
    return(
        <Layout>
            <Notice>© 2024 KIMHANBEEN PORTFOLIO. All rights reserved.</Notice>
            <Links>
                <LinkItem>
                    <div className="item"><EmailSVG/></div>
                    <div className="hoverItem">
                        <EmailHoverSVG/>
                        <div className="tooltip"><span>메일 보내기</span></div>
                    </div>
                </LinkItem>
                <LinkItem>
                    <div className="item"><OpenKaKaoSVG/></div>
                    <div className="hoverItem"><OpenKaKaoHoverSVG/><div className="tooltip"><span>오픈카카오 바로가기</span></div></div>
                    
                </LinkItem>
                <LinkItem>
                    <div className="item"><GithubSVG/></div>
                    <div className="hoverItem"><GithubHoverSVG/><div className="tooltip"><span>깃헙 바로가기</span></div></div>
                    
                </LinkItem>
                <LinkItem>
                    <div className="item"><NotionSVG/></div>
                    <div className="hoverItem"><NotionHoverSVG/><div className="tooltip"><span>노션 바로가기</span></div></div>
                    
                </LinkItem>
            </Links>
        </Layout>
    );
};

export default CompactFooter;

const Layout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const Notice = styled.div`
    color: #fff;
`;

const Links = styled.div`
    display: flex;
    gap: 20px;
`;

const LinkItem = styled.div`
    gap: 20px;
    position: relative;

    & .tooltip {
        display: none;
        position: absolute;
        top: -35px;
        left: 0;
    }
    & .item {
        display: flex;
    }
    & .hoverItem {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    &:hover .item{
        visibility: hidden;
    }
    &:hover .hoverItem {
        display: flex;
    }
    &:hover .tooltip{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 10px;
        white-space: nowrap;

        /* background-color: #1c1c1c; */
        background-color: #2ebf91;
        border-radius: 2px;

        span{
            font-size: 1rem;
            /* background: linear-gradient(to right, #2ebf91, #8368c3);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent; */
            color: #fff;
        }

    }
`;