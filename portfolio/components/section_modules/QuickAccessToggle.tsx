import { ContactHoverSVG, ContactSVG, FeedbackHoverSVG, FeedbackSVG, ResumeHoverSVG, ResumeSVG, ToggleIconSVG } from "@/public/svgs/QuickAccessSVG";
import styled, { keyframes } from "styled-components";

const QuickAccessToggle = () => {
    return(
        <Layout>
            <ToggleList className="toggleList">
                <QuickItem>
                    <div className="item"><ResumeSVG/></div>
                    <div className="hoverItem">
                        <ResumeHoverSVG/>
                    </div>
                    <div className="tooltip">이력서 PDF 다운로드</div>
                </QuickItem>
                <QuickItem>
                    <div className="item"><ContactSVG/></div>
                    <div className="hoverItem">
                        <ContactHoverSVG/>
                    </div>
                    <div className="tooltip">연락 문의</div>
                </QuickItem>
                <QuickItem>
                    <div className="item"><FeedbackSVG/></div>
                    <div className="hoverItem">
                        <FeedbackHoverSVG/>
                    </div>
                    <div className="tooltip">피드백 남기기</div>
                </QuickItem>
            </ToggleList>
            <ToggleButton className="toggleButton"><ToggleIconSVG/></ToggleButton>
        </Layout>
    );
};

export default QuickAccessToggle;

const width = '94px';

const toggleList = keyframes`
    0%{
        height: 0;
        overflow: hidden;
        pointer-events: none;
    }
    50%{
        overflow: hidden;
        pointer-events: none;
    }
    100%{
        height: 295px;
    }
`;

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;

    &:hover .toggleList{
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        align-items: center;
        justify-content: center;
        gap: 35px;
        padding: 50px 0;
        width: ${width};
        height: 295px;

        border-radius: 30px;
        background: linear-gradient(to right, #163C2D, #2A1F3D);

        animation: ${toggleList} 0.3s ease forwards;

    }
    &:hover .toggleButton{
        background: linear-gradient(to right, #2EBF91, #875EC5);
    }
`;

const ToggleButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${width};
    aspect-ratio: 1/1;

    border-radius: 30px;
    background: linear-gradient(to right, #163C2D, #2A1F3D);

    cursor: pointer;
`;

const ToggleList = styled.div`
    display: none;
`;

const QuickItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: ${width};

    & .tooltip{
        display: flex;
        position: absolute;
        white-space: nowrap;
        right: 130%;
        top: 50%;
        transform: translate(0, -50%);

        font-size: 1.25rem;
        background: linear-gradient(to right, #2ebf91, #b368c3);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    & .hoverItem{
        display: none;
    }

    &:hover .hoverItem{
        display: flex;
    }
    &:hover .item{
        display: none;
    }
    &:hover .tooltip{
        font-weight: bold;
        font-size: 22px;
    }

    cursor: pointer;
`;