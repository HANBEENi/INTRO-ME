import HomeLayout from "@/components/layout/HomeLayout";
import styled, { keyframes } from 'styled-components';
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CSSSVG, EmotionLightSVG, HTMLSVG, JSSVG, NextJSDarkSVG, ReactLightSVG, SassSVG, StyleComponentsSVG, TypeScriptSVG } from "@/public/SVG/Skills/FrontendSVG";

const D3Chart = dynamic(()=>import('@/components/page_Skill/D3Chart'),{ssr:false});

/** DATA: 원형 차트에 들어갈 SKILLS 분류별 데이터 */
const chartData_FrontEnd = [
    { category: "CSS", value: 80, color: "#35d0e1" },
    { category: "HTML", value: 35, color: "#077dfb" },
    { category: "TypeScript", value: 90, color: "#3d69da" },
    { category: "React", value: 60, color: "#5753b2" },
    { category: "Ajax", value: 40, color: "#ffffff" },
    { category: "JavaScript", value: 30, color: "#ef5895" },
]
const chartData_BackEnd = [
    {category: "Java", value: 80, color: "#28942f"},
    {category: "PYTHON", value: 80, color: "#0d8ae9"},
    {category: "CSS", value: 80, color: "#353ee1"},
    {category: "CSS", value: 80, color: "#9fe6ee"},
]
const chartData_Comunity = [
    {category: "NOTION", value: 80, color: "#06555e"},
    {category: "FIGMA", value: 80, color: "#355de1"},
    {category: "BLENDER", value: 80, color: "#f39a42"},
    {category: "POTOSHOP", value: 80, color: "#8cee22"},
    {category: "POTOSHOP", value: 80, color: "#e35fe8"},
]

const backgroundColor = "#000";

const Skill02 = () => {

    return (
        <HomeLayout backgroundColor={backgroundColor} headerBackgroundColor="#1a1a1a" color="#fff">
            <Container style={{backgroundColor:backgroundColor}}>
                <Title>
                    <div className="title">TECH SKILLS</div>
                    <div className="subTitle">
                        프로그래밍 언어부터 프레임워크, 도구까지 <br/>
                        경험한 기술과 역량을 수치로 표현하였습니다.
                    </div>
                </Title>
                <Content>
                    <PartSet>
                        <Part className="one" id="frontPart">
                            <div className="part">FRONTEND SKILL</div>
                            <div className="skills"><D3Chart data={chartData_FrontEnd} chartId={"chartData_FrontEnd"}/></div>
                        </Part>
                        <SkillsIcon className="two" id="frontSkills">
                            <div className="item"><HTMLSVG/><div className="name">HTML5</div></div>
                            <div className="item"><CSSSVG/><div className="name">CSS</div></div>
                            <div className="item"><JSSVG/><div className="name">JavaScript</div></div>
                            <div className="item"><NextJSDarkSVG/><div className="name"></div></div>
                            <div className="item"><ReactLightSVG/><div className="name"></div></div>
                            <div className="item"><StyleComponentsSVG/><div className="name"></div></div>
                            <div className="item"><SassSVG/><div className="name"></div></div>
                            <div className="item"><TypeScriptSVG/><div className="name"></div></div>
                            <div className="item"><EmotionLightSVG/><div className="name"></div></div>
                        </SkillsIcon>
                    </PartSet>
                    <PartSet>
                        <Part className="one" id="backPart">
                            <div className="part">BACKEND SKILL</div>
                            <div className="skills"><D3Chart data={chartData_BackEnd} chartId={"chartData_BackEnd"}/></div>
                        </Part>
                        <SkillsIcon className="two" id="backSkills">
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                        </SkillsIcon>
                    </PartSet>
                    <PartSet>
                        <Part className="one" id="designPart">
                            {/* <div className="part">Design & Documentation SKILL</div> */}
                            <div className="part">DESIGN&DOC SKILL</div>
                            <div className="skills"><D3Chart data={chartData_Comunity} chartId={"chartData_Comunity"}/></div>
                        </Part>
                        <SkillsIcon className="two" id="designSkills">
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                        </SkillsIcon>
                    </PartSet>
                </Content>
            </Container>
        </HomeLayout>
    )
}

export default Skill02;

const spin3D = keyframes`
    0% {
        transform: rotateY(0deg);
        border: 1px solid #5c5c5c83;
        opacity: 0;
    }
    50%{
        opacity: 0.3;
    }
    100% {
        transform: rotateY(190deg);
        opacity: 0;
        border: 1px solid #ffffff5e;
    }
`;
const border = keyframes`
    0%{
        border: 1px solid #6f6f6f54;
    }
    100%{
        border: 1px solid #6f6f6f;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 50px;
    width: 100%;
    max-width: 1200px;
    overflow-x: hidden;

    svg{
        display: flex;
    }
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;

    color: #fff;
    font-size: 2.5rem;

    & .subTitle{
        font-size: 1.25rem;
        text-align: center;
        line-height: 1.5625rem;

        color: #919191;
    }
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: min-content;
    grid-auto-flow: row;
    width: 100%;
    gap: 25px;

    color: #fff;
    font-size: 1.5625rem;
`;

const PartSet = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
    grid-auto-flow: row;
    gap: 20px;

    &:hover > .one {
        box-shadow: 0 5px 20px rgba(75, 75, 75, 0.3);
        animation: ${border} 0.2s forwards;
        animation-delay: 0.3s;
    }

`;

const Part = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    gap: 30px;
    padding: 30px 20px;
    width: 100%;

    border-radius: 40px;

    transition: background 0.3s ease, box-shadow 0.3s ease;
    perspective: 1000px; // 3D 효과를 위한 원근법 설정
    
    &:hover
    {
        box-shadow: 0 5px 20px rgba(75, 75, 75, 0.3);
        animation: ${border} 0.2s linear forwards;
        animation-delay: 0.3s;
    }
    
    /* 배경 이미지와 투명도 설정을 위한 가상 요소 */
    &:hover::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('/images/glass2.png');
        background-size: cover;  //배경 이미지가 요소 크기에 맞게 조정되도록 설정
        animation: ${spin3D} 0.5s linear forwards; //3D 회전 애니메이션 설정
        transform-style: preserve-3d; //자식 요소가 3D 공간에 유지되도록 설정
        z-index: 0; //가상 요소가 자식 요소 아래에 위치하도록 설정
        pointer-events: none;
        border-radius: 40px;
        clip-path: inset(0 0 0 0);
        
    }
    /* 컨텐츠가 가상 요소 위에 표시되도록 설정 */
    & * {
        position: relative;
        z-index: 200;
    }

    & .part{
        white-space: nowrap;
        font-size: 1.5625rem;
    }

    & .skills{
        /* border: 1px solid #fff; */
        padding: 20px;
        width: 90%;
    }

    cursor: pointer;
`;

const SkillsIcon = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr); //[TODO: 너비에 따라 3, 4 조정]
    grid-auto-rows: min-content;
    grid-auto-flow: row;
    gap: 20px;
    padding: 20px 0;
    width: 100%;

    & > .item{
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        aspect-ratio: 1/1;
        overflow: hidden;
        width: 100%;

        border: 1px solid #fff;
        border-radius: 20%;

        svg{
            width: 80%;
            height: 80%;
        }

        & > .name{
            display: none;
            justify-content: center;
            align-items: center;
            position: absolute;
            white-space: nowrap;
            width: 100%;
            height: 100%;

            background-color: #000000ac;

            font-size: 1.375rem;
        }
        
        &:hover{
            & > .name{
                display: flex;
            }
            
        }
        cursor: pointer;

    }
`;
