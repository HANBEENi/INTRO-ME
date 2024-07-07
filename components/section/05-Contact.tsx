import styled from "styled-components";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from 'gsap';

const Dark_Card3D_SizeFeat = dynamic(() => import("@/components/section_modules/models/Contact_Card3D(D)"), { ssr: false });

const Contact = () => {
    
    const [isAction, setIsAction] = useState<boolean>(false);
    const sectionRef = useRef<HTMLDivElement>(null);

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
    }, [isAction]);

    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setIsAction(true);
            }else{
                setIsAction(false);
            }
            });
        },
        {
            threshold: 0.3, // 섹션의 30%가 보일 때 트리거
        }
        );

        if (sectionRef.current) {
        observer.observe(sectionRef.current);
        }

        return () => {
        if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
        }
        };
    }, []);

    return(
            <Container ref={sectionRef}>
                {/* <Title>
                    <div>CONTACT</div>
                    <div>
                        문의사항이나 제안이 있으시다면 언제든지 연락해주세요!
                        함께 일할 기회를 기대하고 있습니다.
                    </div>
                </Title> */}
                <Title>
                    <Wrap>
                        <div className="about">CONTACT</div>
                        <div className="line"></div>
                        <div className="subTitleEn">
                            <div className="dot" style={{backgroundColor: '#2EBF91'}}/>
                            <div>CONTACT</div>
                        </div>
                    </Wrap>
                    <Wrap>
                        <div className="dotWrap"></div>
                        {/* <div className="subTitleKo" style={{color: '#2EBF91'}}>프로젝트 보기</div> */}
                    </Wrap>
                </Title>
                <Contents>
                    <div className="card3D">
                        <Dark_Card3D_SizeFeat isAction={isAction}/>
                    </div>
                    <BackText>
                        <div ref={addTextRefs} className='backText'>CONTACT</div>
                        <div ref={addTextRefs} className='backText'>INFO</div>
                    </BackText>
                </Contents>
                <HowContect>
                    <div style={{background:'linear-gradient(135deg, #a8e063, #56ab2f)', color:'#fff'}}>E-mail</div>
                    <div style={{background:'linear-gradient(135deg, #6e6e6e, #3e3e3e)', color:'#fff'}}>GitHub</div>
                    <div style={{background:'linear-gradient(135deg, #d5d5d5, #9e9e9e)', color:'#fff'}}>Notion</div>
                    <div style={{background:'linear-gradient(135deg, #ffcc00, #ff9900)', color:'#fff'}}>OpenKakao</div>
                </HowContect>
            </Container>
    );
};

export default Contact;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    /* max-width: 1200px; */
    /* height: calc(100vh + 100px); */
    height: 100vh;
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
    top: 55%;
    transform: translateY(-52%);
    width: 100%;
    height: 100%;
    white-space: nowrap;

    -webkit-text-stroke: 1px #5d5d5d;
    -webkit-text-fill-color: 'transparent';
    font-size: 290px;
    line-height: 250px;
    color: #fff;

    pointer-events: none;
    user-select: none;
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 0px;
    gap: 10px;
    max-width: 1200px;
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

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    max-width: 1200px;
    width: 100%;
    aspect-ratio: 650/363;

    border-radius: 15px;

    color: #fff;

    & .card3D {
        display: flex;
        justify-content: center;
        align-items: center;
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