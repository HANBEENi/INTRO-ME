import HomeLayout from "@/components/layout/HomeLayout";
import styled from "styled-components";
import dynamic from "next/dynamic";

const backgroundColor = '#000000';
const Dark_Card3D_SizeFeat = dynamic(() => import("@/components/page_Contact/Dark_Card3D_SizeFeat"), { ssr: false });

const Dark_Contact = () => {
    return(
        <HomeLayout backgroundColor={backgroundColor} headerBackgroundColor="#1a1a1a" color="#fff">
            <Container style={{backgroundColor:backgroundColor}}>
                <BackText>
                    <div>CONTACT</div>
                    <div>INFO</div>
                </BackText>
                <Title>
                    <div>CONTACT</div>
                    <div>
                        문의사항이나 제안이 있으시다면 언제든지 연락해주세요!
                        함께 일할 기회를 기대하고 있습니다.
                    </div>
                </Title>
                <Contents>
                    <Dark_Card3D_SizeFeat/>
                </Contents>
            </Container>
        </HomeLayout>
    );
};

export default Dark_Contact;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-bottom: 50px;
    width: 100%;
    max-width: 1200px;
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
    top: 150px;
    z-index: 0;

    -webkit-text-stroke: 1px #5d5d5d;
    font-size: 290px;
    line-height: 250px;
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    z-index: 100;

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
    width: 100%;
    aspect-ratio: 650/363;

    border-radius: 15px;

    color: #fff;
`;
