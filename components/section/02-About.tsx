import Body from "@/components/layout/Body";
import { BorderSVG } from "@/public/svgs/AboutSVG";
import { media } from "@/styles/mediaQuery";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import CompactFooter from "../section_modules/CompactFooter";

const About = () => {
  /** 섹션 시작 감지 (비디오 재생 제어) */
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement?.play();
          } else {
            videoElement?.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (videoElement) {
      observer.observe(videoElement);
    }
    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  return (
    <BackLayout>
      {/* <video ref={videoRef} autoPlay muted playsInline>
                <source src="/videos/smokeBackground.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video> */}
      <Body>
        <Layout>
          <Title>
            <Wrap>
              <div className="about">ABOUT</div>
              <div className="line"></div>
              <div className="subTitleEn">
                <div className="dot" style={{ backgroundColor: "#2EBF91" }} />
                <div>INTRODUCE</div>
              </div>
            </Wrap>
            <Wrap>
              <div className="dotWrap">
                <div
                  className="dot"
                  style={{ backgroundColor: "#8368C3" }}
                ></div>
                <div
                  className="dot"
                  style={{ backgroundColor: "#2EBF91" }}
                ></div>
                <div className="dot" style={{ backgroundColor: "#000" }}></div>
              </div>
              <div className="subTitleKo" style={{ color: "#2EBF91" }}>
                열정과 목표
              </div>
            </Wrap>
          </Title>
          <Content>
            <EduInfo>
              <div className="emphasis">
                안녕하세요, 신입 웹 개발자로 취업을 준비하고 있는 김한빈 입니다.
              </div>
              <div>
                저는 작은 코드 한 줄 한 줄이 모여 큰 변화를 만든다는 믿음으로
                개발에 임하고 있습니다.
                <br />
                각 코드 라인이 시스템의 안정성과 성능에 미치는 영향을 깊이
                이해하고 있으며, 효율적이고 깔끔한 코드를 작성하는 것이
                중요하다고 생각합니다.
                <br />
                웹 개발은 사용자에게 최상의 경험을 제공하는 작업입니다. 저는
                문제 해결 능력과 창의력을 결합해
                <br />
                사용자 친화적이고 직관적인 웹 애플리케이션을 만드는 것을 목표로
                합니다.
                <br />
                이를 위해 코드의 품질을 지속적으로 향상시키고, 사용자 피드백을
                반영하며, 최신 기술을 학습하고 있습니다.
              </div>
              <div className="emphasis">
                끊임없이 배우고 성장하는 자세로, 사용자에게 가치 있는 경험을
                제공하며 개발자로서의 열정과 목표를 실현해 나가겠습니다.
              </div>
            </EduInfo>
          </Content>
        </Layout>
      </Body>
    </BackLayout>
  );
};

export default About;

const BackLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    object-fit: cover;
  }

  /* background: url('/images/smoke.png');
    background-repeat: no-repeat;
    background-size: cover; */
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  font-size: 2.1875rem;
  font-weight: 700;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-family: "InterBold";

  & .about {
    background: url("/images/smoke_4.png");
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: cover;

    font-size: 3rem;
    font-weight: 900;

    ${(media.mobile, media.tablet)} {
      font-size: 2.375rem;
    }
  }
  & .line {
    width: 60%;
    position: relative;
  }
  & .line::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      to right,
      #acacac5e 50%,
      rgba(255, 255, 255, 0) 0%
    );
    background-size: 10px 10px;
  }
  & .subTitleEn {
    display: flex;
    align-items: center;
    gap: 15px;
    color: #fff;
    font-size: 2.25rem;
    ${(media.mobile, media.tablet)} {
      font-size: 26px;
    }
  }
  & .subTitleKo {
    font-size: 1.4375rem;
    font-family: "Inter";
    font-weight: 400;
    ${(media.mobile, media.tablet)} {
      font-size: 1.125rem;
    }
  }
  & .dotWrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  & .dot {
    width: 15px;
    aspect-ratio: 1/1;
    border-radius: 100%;
    ${(media.mobile, media.tablet)} {
      width: 10px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
`;

const EduInfo = styled.div`
  display: flex;
  flex-direction: column;

  font-family: "Inter";
  color: #fff;
  line-height: 40px;
  font-size: 1.25rem;

  & .emphasis {
    font-weight: 600;
    letter-spacing: 1px;
  }

  ${(media.mobile, media.tablet)} {
    font-size: 0.875rem;
  }
`;
