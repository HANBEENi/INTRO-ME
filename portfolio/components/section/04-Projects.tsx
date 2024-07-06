import Body from "@/components/layout/Body"
import { useEffect, useRef } from "react";
import styled from "styled-components";
import ProjectCard from "@/components/section_modules/ProjectCard";

const Projects = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    return(
        <Body>
            <Container ref={sectionRef}>
                <Title>
                    <Wrap>
                        <div className="about">PROJECTS</div>
                        <div className="line"></div>
                        <div className="subTitleEn">
                            <div className="dot" style={{backgroundColor: '#2EBF91'}}/>
                            <div>PROJECTS</div>
                        </div>
                    </Wrap>
                    <Wrap>
                        <div className="dotWrap">
                        </div>
                        {/* <div className="subTitleKo" style={{color: '#2EBF91'}}>프로젝트 보기</div> */}
                    </Wrap>
                </Title>
                <Content>
                    <div className="project"><ProjectCard/></div>
                    <div className="project"><ProjectCard/></div>
                    <div className="project"><ProjectCard/></div>
                    <div className="project"><ProjectCard/></div>
                    <div className="project"><ProjectCard/></div>
                    <div className="project"><ProjectCard/></div>
                    <div className="project"><ProjectCard/></div>
                </Content>
            </Container>
        </Body>
    )
};

export default Projects;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
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

    font-family: 'InterBold';

    & .about{
        background: url('/images/smoke_4.png');
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        background-size: cover;

        font-size: 3rem;
        font-weight: 900;
    }
    & .line{
        width: 60%;
        position: relative;
    }
    & .line::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, #acacac5e 50%, rgba(255, 255, 255, 0) 0%);
        background-size: 10px 10px;
    }
    & .subTitleEn{
        display: flex;
        align-items: center;
        gap: 15px;
        color: #fff;
        font-size: 2.25rem;
    }
    & .subTitleKo{
        font-size: 1.4375rem;
        font-family: 'Inter';
        font-weight: 400;
    }
    & .dotWrap{
        display: flex;
        align-items: center;
        gap: 10px;
    }
    & .dot{
        width: 15px;
        aspect-ratio: 1/1;
        border-radius: 100%;
    }
`;

const Content = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 30px 0;
    gap: 70px 50px;
    width: 100%;

    &::-webkit-scrollbar {
        height: 10px;
        width: 100%;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    /* 이 부분을 추가하여 스크롤바가 보이도록 강제 설정합니다 */
    -webkit-overflow-scrolling: touch; /* 모바일에서 부드러운 스크롤을 위해 추가 */
    &::-webkit-scrollbar {
        display: unset;
    }


    & .project{
        flex: 0 0 auto;
        transition: transform 0.3s ease-in-out;
        padding: 20px;
        z-index: 10;
        &:hover{
            transform: translateY(-20px);
            border: 1px solid #fff;
            border-radius: 30px;
        }
    }
`;