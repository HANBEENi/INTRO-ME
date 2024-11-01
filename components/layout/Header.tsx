import { media } from '@/styles/mediaQuery';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { BugerSVG, LogoSVG, MoonSVG, SunSVG } from '@/public/svgs/HeaderSVG';
import { Link } from 'react-scroll';


const Header = ({isShowHeader}:any) => {

    const router = useRouter();
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if(element){
            element.scrollIntoView({behavior: 'smooth'});
        }
    };

    return(
        <Layout isShowHeader={isShowHeader}>
            <HeaderContent>
                <Logo onClick={()=>scrollToSection('home')}>
                    <LogoSVG/>
                </Logo>
                <MenuBar>
                    <DarkMode>
                        <div className='modeName'>dark</div>
                        <div className='icon'><MoonSVG/></div>
                    </DarkMode>
                    <MenuSet>
                        <li onClick={()=>scrollToSection('home')}>HOME</li>
                        <li onClick={()=>scrollToSection('about')}>ABOUT</li>
                        <li onClick={()=>scrollToSection('skills')}>SKILLS</li>
                        <li onClick={()=>scrollToSection('projects')}>PROJECTS</li>
                        <li onClick={()=>scrollToSection('contact')}>CONTACT</li>
                    </MenuSet>
                    <div className='menuSet'>
                        
                    </div>
                    <BurgerIcon><BugerSVG/></BurgerIcon>
                </MenuBar>
            </HeaderContent>
        </Layout>
    );
};

export default Header;

const Layout = styled.div<{isShowHeader: boolean}>`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;

    /* background: linear-gradient(to right, #2e2e2ee2, #000000c0); */
    /* background: linear-gradient(to right, #2e2e2e4f, #00000082); */

    transition: opacity 0.3s, transform 0.3s;
    opacity: ${({ isShowHeader }) => (isShowHeader ? '1' : '0')};
    transform: ${({ isShowHeader }) => (isShowHeader ? 'translateY(0)' : 'translateY(-100px)')};

    ${media.tablet}{
        padding: 0px 20px;
        box-sizing: border-box;
    }
`;
const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2.5%;
    width: 100%;
`;

const Logo = styled.div`
    display: flex;
    gap: 2px;

    &:hover{
    }

    cursor: pointer;
`;

const MenuBar = styled.div`
    display: flex;
    gap: 40px;

    ${media.mobile, media.tablet}{
        gap: 20px;
    }
`;

const MenuSet = styled.ul`
    display: flex;
    align-items: center;
    gap: 40px;

    font-size: 1.25rem;
    & > li {
        list-style-type: none;
        background: linear-gradient(to right, #2ebf91, #8368c3);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        
        &:hover{
            
        }
        cursor: pointer;
    }
    
    /** [TODO]임시 */
    & :nth-child(3), :nth-child(4), :nth-child(6){
        &:hover{
            color: #ff264a;
        }
    }

    ${media.mobile, media.tablet}{
        display: none;
    }
`;

const BurgerIcon = styled.div`
    display: none;
    &:hover{
        cursor: pointer;
    }

    ${media.mobile, media.tablet}{
        display: flex;
        justify-content: end;
        width: 100%;
    }
`;

const DarkMode = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    min-width: 110px;
    height: 40px;

    background-color: #292929;
    border-radius: 30px;
    box-shadow: 5px 0 10px rgba(0, 0, 0, 0.25);

    color: #fff;
    font-size: 0.875rem;

    & .modeName {
        display: flex;
        justify-content: center;
        width: 100%;

        font-size: 0.875rem;
    }

    & .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3px 2px 2px;
        height: 90%;
        aspect-ratio: 1/1;

        background-color: #fff;
        border-radius: 30px;
    }

    cursor: pointer;
`;