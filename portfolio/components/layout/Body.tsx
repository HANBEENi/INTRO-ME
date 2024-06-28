import { media } from "@/styles/mediaQuery";
import { throttle } from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";


/** [TODO]
 *  스크린top이 아니라, 각 섹션의 top으로 수정해야함
 */

const Body = ({children}:any) => {

    const [preScrollY, setPreScrollY] = useState<number>(0);
    const [isShowHeader, setIsShowHeader] = useState<boolean>(true);
    const [isScreenTop, setIsScreenTop] = useState<boolean>(true);

    /** 화면 스크롤(Y축) 감지 */
    useEffect(() => {
        const handleScroll = throttle(() => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > preScrollY && isShowHeader){
                setIsShowHeader(false);
            } else if (currentScrollY < preScrollY && !isShowHeader){
                setIsShowHeader(true);
            }
            setIsScreenTop(currentScrollY === 0);
            setPreScrollY(currentScrollY);
        }, 200); // 100ms 간격으로 스크롤 이벤트 처리

        window.addEventListener('scroll',handleScroll);

        return () => {
            window.removeEventListener('scroll',handleScroll);
        }
    },[preScrollY, isShowHeader]);
    
    return(
        <Layout>
            <Content isShowHeader={isShowHeader}>
                {children}
            </Content>
        </Layout>
    )
}

export default Body;

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100vw;
    min-height: calc(100vh + 1rem); // 헤더on,off시(스크롤) 화면이 조금 들려서 아래 부분 섹션이 보여서, 1rem 정도 높이 추가
    
    ${media.tablet}{
        padding: 0px 20px;
        box-sizing: border-box;
    }
`;

const Content = styled.div<{isShowHeader:boolean}>`
    display: flex;
    padding: ${({isShowHeader})=>(isShowHeader? '180px 0' : '100px 0')};
    transition: padding 1s;
    max-width: 1200px;
    width: 100%;
    height: 100vh;
`;