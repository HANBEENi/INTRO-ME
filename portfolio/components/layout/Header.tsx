import { media } from '@/styles/mediaQuery';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { LogoSVG, MoonSVG, SunSVG } from '@/public/SVG/HeaderSVG';
import { Link } from 'react-scroll';


const Header = ({showHeader}:any) => {

    const router = useRouter();

    return(
        <Layout showHeader={showHeader}>
            <HeaderContent>
                <Logo onClick={()=>router.push(`/main`)}>
                    <LogoSVG/>
                </Logo>
                <MenuBar>
                    <DarkMode>
                        <div className='modeName'>dark</div>
                        <div className='icon'><MoonSVG/></div>
                    </DarkMode>
                    <li>
                        <Link activeClass="active" to="intro" spy={true} smooth={true} offset={-70} duration={500}>
                            INTRO
                        </Link>
                    </li>
                    <li onClick={()=>router.push(`/project`)}>
                        <Link activeClass="active" to="projects" spy={true} smooth={true} offset={-70} duration={500}>
                            PROJECT
                        </Link>
                    </li>
                    <li onClick={()=>router.push(`/skill`)}>
                        <Link activeClass="active" to="skills" spy={true} smooth={true} offset={-70} duration={500}>
                            SKILL
                        </Link>
                    </li>
                    <li>
                        <Link activeClass="active" to="links" spy={true} smooth={true} offset={-70} duration={500}>
                            LINK
                        </Link>
                    </li>
                    <li onClick={()=>router.push(`/contact`)}>
                        <Link activeClass="active" to="contact" spy={true} smooth={true} offset={-70} duration={500}>
                            CONTACT
                        </Link>
                    </li>
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

    background: linear-gradient(to right, #2e2e2e, #000000);

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
    }

    cursor: pointer;
`;

const MenuBar = styled.ul`
    display: flex;
    align-items: center;
    gap: 40px;

    font-size: 1.25rem;

    /** [TODO]임시 */
    & :nth-child(3), :nth-child(4), :nth-child(6){
        &:hover{
            color: #ff264a;
        }
    }

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
`;

const DarkMode = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    width: 110px;
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