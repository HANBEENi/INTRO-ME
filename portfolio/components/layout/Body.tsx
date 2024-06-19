import { media } from "@/styles/mediaQuery";
import styled from "styled-components";

const Body = ({children}:any) => {
    return(
        <Layout>
            <Content>
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

const Content = styled.div`
    display: flex;
    position: relative;
    top: 100px;
    max-width: 1200px;
    width: 100%;
    height: 250vh;
`;