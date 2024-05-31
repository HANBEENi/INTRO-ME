import HomeLayout from "@/components/layout/HomeLayout";
import styled from "styled-components";
import dynamic from "next/dynamic";

const backgroundColor = '#ececec';
const Card3D = dynamic(() => import("@/components/page_Contact/Card3d"), { ssr: false });

const Contact = () => {
    return(
        <HomeLayout backgroundColor={backgroundColor} headerBackgroundColor="#F2F2F2" color="#000">
            <Container style={{backgroundColor:backgroundColor}}>
                <Title>
                    <div>CONTACT</div>
                    <div>
                        문의사항이나 제안이 있으시다면 언제든지 연락해주세요!
                        함께 일할 기회를 기대하고 있습니다.
                    </div>
                </Title>
                <Card>
                    <Card3D/>
                </Card>
            </Container>
        </HomeLayout>
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
    overflow-x: hidden;

    svg{
        display: flex;
    }
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;

    color: #000;
    font-size: 2.5rem;

    & :nth-child(2){
        font-size: 1.25rem;
        text-align: center;
        line-height: 1.875rem;
    }
`;

const Card = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    aspect-ratio: 650/363;

    border-radius: 15px;
`;
