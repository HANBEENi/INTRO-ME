/**
 * 페이지 기본 레이아웃 (헤더,컨텐츠,푸터)
 * 
 * [TODO]
 * 1. 푸터 제작
 * 2. 스크롤 중간에 나오는 헤더는 opacity 0.4, 마우스오버시 opacity 1
 * 3. 헤더 숨김 상태일 때 헤더 아이콘 노출 시킬지 고민
 * 4. 헤더 메뉴별 마우스 오버시 효과
 * 5. 마우스 꾸밈 이벤트
 * 6. 헤더가 스크롤이 맨 처음인 상태에서 있을 때는 컨텐츠 top:100px
 * 
 * 7. 스크롤을 아래로 내려갔다가 빠르게 올라올 때, 스크린탑이 될 때 바로 컨텐츠의 top값이 조정되어야하는데
 *    잠깐 멈칫 했다가 동작하는게 거슬림
 */

import { media } from '@/styles/mediaQuery';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { throttle } from 'lodash';
import Header from '@/components/layout/Header';

interface HomeLayout {
    children: any,
    backgroundColor: string,
    headerBackgroundColor: string,
    color: string,
}

const HomeLayout = ({children, backgroundColor, headerBackgroundColor, color}:HomeLayout) => {
    
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

    return (
        <Layout style={{backgroundColor:backgroundColor??'#fff'}}>
            <Header 
                backgroundColor={headerBackgroundColor} 
                color={color}
                showHeader={isShowHeader}
            />
            <Content isScreenTop={isScreenTop} style={{backgroundColor:backgroundColor??'#fff'}}>{children}</Content>
        </Layout>
    );
};
export default HomeLayout;

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    position: absolute;
    width: 100%;
    min-height: calc(100vh + 100px);
    height: 100%;
`;

const Content = styled.div<{isScreenTop:boolean}>`
    display: flex;
    justify-content: center;
    position: relative;
    top: ${({isScreenTop})=>(isScreenTop?'180px':'100px')};
    padding-bottom: 200px;
    min-width: 100vw;
    width: 100%;

    transition: top 0.5s ease;

    ${media.tablet}{
        padding: 0px 20px;
    }
`;