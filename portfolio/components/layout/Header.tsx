import { media } from '@/styles/mediaQuery';
import { useRouter } from 'next/router';
import styled from 'styled-components';

interface Props{
    backgroundColor: string,
    color: string,
    showHeader: boolean
}

const Header = ({backgroundColor, color, showHeader}:Props) => {

    const router = useRouter();

    return(
        <Layout style={{backgroundColor:backgroundColor, color:color}} showHeader={showHeader}>
            <HeaderContent>
                <Logo onClick={()=>router.push(`/main`)}>
                    <Text1>HB</Text1>
                    <Text2><p>FRONTEND</p><p>PORTFOLIO</p></Text2>
                    <Text3><div><div id="dot" style={{backgroundColor:color}}></div></div></Text3>
                </Logo>
                <MenuBar>
                    <li>INTRO</li>
                    <li onClick={()=>router.push(`/project`)}>PROJECT</li>
                    <li onClick={()=>router.push(`/skill`)}>SKILL</li>
                    <li>LINK</li>
                    <li onClick={()=>router.push(`/contact`)}>CONTACT</li>
                </MenuBar>
            </HeaderContent>
        </Layout>
    );
};

export default Header;

const Layout = styled.div<{showHeader: boolean}>`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;

    background-color: #ffffff70;

    transition: opacity 0.3s, transform 0.3s;
    opacity: ${({ showHeader }) => (showHeader ? '1' : '0')};
    transform: ${({ showHeader }) => (showHeader ? 'translateY(0)' : 'translateY(-100px)')};

    ${media.tablet}{
        padding: 0px 20px;
        box-sizing: border-box;
    }
`;
const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    width: 100%;
`;

const Logo = styled.div`
    display: flex;
    gap: 2px;

    &:hover{
        color: #ff264a;
    }

    cursor: pointer;
`;
const Text1 = styled.div`
    display: flex;
    align-items: center;
    padding-top: 3px;
    box-sizing: border-box;

    font-size: 2.5rem;
    font-weight: 300;
`;
const Text2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    font-size: 0.875rem;
`;
const Text3 = styled.div`
    display: flex;
    align-items: center;
    
    & > div{
        
        display: flex;
        align-items: flex-end;
        height: 28px;
        
        & #dot {
            display: flex;
            width: 4px;
            height: 5px;

            border-radius: 100%;
        }
    }
`;

const MenuBar = styled.ul`
    display: flex;
    gap: 40px;

    font-size: 1.25rem;

    /** [TODO]임시 */
    & :nth-child(2), :nth-child(3), :nth-child(5){
        &:hover{
            color: #ff264a;
        }
    }

    & > li {
        list-style-type: none;


        &:hover{
            /* color: #fff; */
        }
        cursor: pointer;
    }
`;