import { media } from "@/styles/mediaQuery";
import { throttle } from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
            <Content isScreenTop={isScreenTop}>
                {children}
            </Content>
        </Layout>
    )
}

export default Body;

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    width: 100vw;
    min-height: 100vh;

    ${media.tablet}{
        padding: 0px 20px;
        box-sizing: border-box;
    }
`;

const Content = styled.div<{isScreenTop:boolean}>`
    display: flex;
    position: relative;
    top: 100px;
    padding-top: ${({isScreenTop})=>(isScreenTop?'180px':'100px')};
    max-width: 1200px;
    width: 100%;
    /* height: 250vh; */
    height: 100%;

    transition: padding-top 0.5s ease;
`;