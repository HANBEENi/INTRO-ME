import Body from "@/components/layout/Body";
import { BorderSVG } from "@/public/svgs/AboutSVG";
import { media } from "@/styles/mediaQuery";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const About2 = () => {

    /** 섹션 시작 감지 (비디오 재생 제어) */
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoElement?.play();
                } else {
                    videoElement?.pause();
                }
            });
        },
        { threshold: 0.1 }
        );

        if (videoElement) {
            observer.observe(videoElement);
        }
        return () => {
            if (videoElement) {
                observer.unobserve(videoElement);
            }
        };
    },[]);
    
    return (
        <BackLayout>
            <video ref={videoRef} autoPlay muted playsInline>
                <source src="/videos/smokeBackground.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <Body>
                <Layout>
                    <Title>
                        <Wrap>
                            <div className="about">ABOUT</div>
                            <div className="line"></div>
                            <div className="subTitleEn">
                                <div className="dot" style={{backgroundColor: '#8368C3'}}/>
                                <div>EDUCATION</div>
                            </div>
                        </Wrap>
                        <Wrap>
                            <div className="dotWrap">
                                <div className="dot" style={{backgroundColor: '#8368C3'}}></div>
                                <div className="dot" style={{backgroundColor: '#2EBF91'}}></div>
                                <div className="dot" style={{backgroundColor: '#000'}}></div>
                            </div>
                            <div className="subTitleKo" style={{color: '#8368C3'}}>학력 및 교육 활동</div>
                        </Wrap>
                    </Title>
                    <Content>
                        <EduInfo>
                            {/* 1행 - 교육 */}
                                <div className="chart">
                                    <BorderSVG/>
                                    <div className="text">교육</div>
                                </div>
                                <div className="content">
                                    <div className="date">
                                        <span>2017. 03</span>-<span>2022. 02</span>
                                        <span>2021. 09</span>-<span>2021. 10</span>
                                        <span>2023. 03</span>-<span>2023. 08</span>
                                    </div>
                                </div>
                                <div className="content">
                                    <div>한국교통대학교 소프트웨어학과 전공, 인공지능빅데이터 부전공 졸업</div>
                                    <div>한국교통대학교 빅데이터 디자인 자격취득 교육과정 교육 수료</div>
                                    <div>엘리스 부트캠프 AI 7기 교육 수료</div>
                                </div>
                            {/* 2행 - 수상 */}
                                <div className="chart">
                                    <BorderSVG/>
                                    <div className="text">수상</div>
                                </div>
                                <div className="content">
                                    <div className="date">
                                        <span>2023. 08</span>
                                        <span></span>
                                        <span></span>
                                        <span>2023. 08</span>
                                    </div>
                                </div>
                                <div className="content">
                                    <div>엘리스 팀 프로젝트 리더십상 수상</div>
                                    <div>엘리스 인공지능 웹 서비스 프로젝트 대상 수상</div>
                                </div>
                            {/* 3행 - 자격증 */}
                                <div className="chart">
                                    <BorderSVG/>
                                    <div className="text">자격증</div>
                                </div>
                                <div className="content">
                                    <div className="date">
                                        <span>2021. 11</span>
                                        <span></span>
                                        <span></span>
                                        <span>2024. 04</span>-
                                        <span>진행중</span>
                                        <span>2024. 03</span>-
                                        <span>진행중</span>
                                    </div>
                                </div>
                                <div className="content">
                                    <div>빅데이터디자인실무 1급 취득</div>
                                    <div>정보처리기사 실기 준비 중 (2024.07.28.(일) 시험 예정)</div>
                                    <div>웹디자인기능사 실기 준비 중 (2024.07.16.(화) 접수 예정)</div>
                                </div>
                            {/* </EduInfo> */}
                        </EduInfo>
                    </Content>
                </Layout>
            </Body>
        </BackLayout>
    );
};

export default About2;

const BackLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;

    video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        object-fit: cover;
    }
`;

const Layout = styled.div`
    display: flex;
    flex-direction: column;
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

        ${media.mobile, media.tablet}{
            font-size: 2.375rem;
        }
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
        ${media.mobile, media.tablet}{
            font-size: 26px;
        }
    }
    & .subTitleKo{
        font-size: 1.4375rem;
        font-family: 'Inter';
        font-weight: 400;
        ${media.mobile, media.tablet}{
            font-size: 1.125rem;
        }
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
        ${media.mobile, media.tablet}{
            width: 10px;
        }
    }
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const EduInfo = styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-auto-rows: auto;
    align-items: center;
    gap: 25px 50px;

    font-family: 'Inter';
    color: #fff;
    line-height: 25px;

    & .chart{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 100%;
        height: 100%;

        border-radius: 10px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    & .chart svg {
        width: 130px;
        height: 100%;
        border-radius: inherit;
        overflow: visible;
    }
    & .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        
        font-size: 20px;
    }

    & .content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;

        font-size: 18px;
        line-height: 30px;
    }
    & .date{
        display: grid;
        grid-template-columns: repeat(3, auto);
        grid-auto-rows: auto;
        align-items: center;
        gap: 0 2px;

        font-family: 'Inter';
        font-weight: 200;
        color: #acacac;

        & .span{
            display: flex;
            padding-top: 2px;
        }
    }
`;