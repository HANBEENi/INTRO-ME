import styled from "styled-components";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from 'gsap';

const Dark_Card3D_SizeFeat = dynamic(() => import("@/components/section_modules/models/Contact_Card3D(D)"), { ssr: false });

const Contact = () => {

    /** BackText 애니메이션 효과 */
    // 각 Text 컴포넌트에 대한 참조를 저장
    const textRefs = useRef<(HTMLElement | null)[]>([]);
    textRefs.current = [];

    // Text 컴포넌트에 Ref를 추가
    const addTextRefs = (el:HTMLElement|null) => {
        if (el && !textRefs.current.includes(el)){
            textRefs.current.push(el);
        }
    }

    useEffect(() => {
        textRefs.current.forEach((text, index) => {
            gsap.fromTo(text, 
                // from(초기 상태)
                {
                    WebkitTextFillColor: 'transparent',
                    WebkitTextStrokeColor: '#525252',
                }, 
                // to(최종 상태)
                {
                    WebkitTextFillColor: '#fff',
                    delay: index * 0.5,
                    duration: 2,
                    ease: 'power2.inOut',
                    clipPath: 'inset(0 100% 0 0)',
                    onUpdate: function () {
                        const progress = this.progress();
                        const clipPathValue = `inset(0 ${100 - (progress * 100)}% 0 0)`;
                        (text!.style as any).clipPath = clipPathValue;
                        (text!.style as any).WebkitClipPath = clipPathValue;
                    },
                    onComplete: function () {
                        gsap.to(text, {
                            WebkitTextStrokeColor: '#4f4f4f', // 테두리 색상을 원래 색상으로 설정
                            WebkitTextFillColor: 'transparent',
                            clipPath: 'inset(0 0 0 0)', // 텍스트를 다시 왼쪽에서 오른쪽으로 채우기
                            duration: 2,
                            ease: 'power2.inOut',
                        });
                    }
                }
            );
        });
    }, []);

    return(
            <Container>
                <Title>
                    <div>CONTACT</div>
                    <div>
                        문의사항이나 제안이 있으시다면 언제든지 연락해주세요!
                        함께 일할 기회를 기대하고 있습니다.
                    </div>
                </Title>
                <Contents>
                    <div className="card3D">
                        <Dark_Card3D_SizeFeat/>
                    </div>
                    <BackText>
                            <div ref={addTextRefs} className='backText'>CONTACT</div>
                            <div ref={addTextRefs} className='backText'>INFO</div>
                    </BackText>
                    <HowContect>
                        <div style={{background:'linear-gradient(135deg, #a8e063, #56ab2f)', color:'#fff'}}>E-mail</div>
                        <div style={{background:'linear-gradient(135deg, #6e6e6e, #3e3e3e)', color:'#fff'}}>GitHub</div>
                        <div style={{background:'linear-gradient(135deg, #d5d5d5, #9e9e9e)', color:'#fff'}}>Notion</div>
                        <div style={{background:'linear-gradient(135deg, #ffcc00, #ff9900)', color:'#fff'}}>OpenKakao</div>
                    </HowContect>
                </Contents>
            </Container>
    );
};

export default Contact;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 50px;
    width: 100%;
    max-width: 1200px;
    min-height: 100vh;
    overflow-x: hidden;

    svg{
        display: flex;
    }
`;

const BackText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    white-space: nowrap;
    z-index: 0;

    -webkit-text-stroke: 1px #5d5d5d;
    -webkit-text-fill-color: 'transparent';
    font-size: 290px;
    line-height: 250px;

    pointer-events: none;
    user-select: none;
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

    & :nth-child(2){
        font-size: 1.25rem;
        text-align: center;
        line-height: 1.875rem;

        color: #919191;
    }
`;

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 100px;
    position: relative;
    width: 100%;
    aspect-ratio: 650/363;

    border-radius: 15px;

    color: #fff;

    & .card3D {
        display: flex;
        justify-content: center;
        margin-bottom: 100px;
        width: 100%;
        min-height: calc(100vh - 278.33px);
        height: 100%;
        z-index: 300;
    }
`;

const HowContect = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    width: 100%;
    height: 10px;

    font-size: 1.25rem;

    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 50px;

        border-radius: 8px;

        cursor: pointer;
    }
`;