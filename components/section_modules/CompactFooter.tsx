import styled from "styled-components";
import {
  EmailHoverSVG,
  EmailSVG,
  GithubHoverSVG,
  GithubSVG,
  NotionHoverSVG,
  NotionSVG,
  OpenKaKaoHoverSVG,
  OpenKaKaoSVG,
} from "@/public/svgs/FooterSVG";
import { media } from "@/styles/mediaQuery";

const CompactFooter = () => {
  const handleOpenLink = (Link: string) => {
    window.open(Link, "_blank");
  };
  const handleOpenEmailForm = () => {
    const recipient = "been.iruda@gmail.com"; // 받는 사람 이메일 주소
    const subject = "문의 사항"; // 이메일 제목
    const body = "여기에 내용을 입력하세요."; // 이메일 본문 내용

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };
  return (
    <Layout>
      <Notice>
        © 2024 KIMHANBEEN PORTFOLIO. All rights reserved. | WEB FRONTEND
        PORTFOLIO
      </Notice>
      <Links>
        <LinkItem>
          <div className="item">
            <EmailSVG />
          </div>
          <div className="hoverItem" onClick={handleOpenEmailForm}>
            <EmailHoverSVG />
            <div className="tooltip">
              <span>메일 보내기</span>
            </div>
          </div>
        </LinkItem>
        <LinkItem>
          <div className="item">
            <OpenKaKaoSVG />
          </div>
          <div
            className="hoverItem"
            onClick={() =>
              handleOpenLink("https://open.kakao.com/me/beeniruda")
            }
          >
            <OpenKaKaoHoverSVG />
            <div className="tooltip">
              <span>오픈카카오 바로가기</span>
            </div>
          </div>
        </LinkItem>
        <LinkItem>
          <div className="item">
            <GithubSVG />
          </div>
          <div
            className="hoverItem"
            onClick={() => handleOpenLink("https://github.com/HANBEENi")}
          >
            <GithubHoverSVG />
            <div className="tooltip">
              <span>깃헙 바로가기</span>
            </div>
          </div>
        </LinkItem>
        <LinkItem>
          <div className="item">
            <NotionSVG />
          </div>
          <div
            className="hoverItem"
            onClick={() =>
              handleOpenLink(
                "https://www.notion.so/51d4c45165fc46b880a046c345df9fd5?pvs=4"
              )
            }
          >
            <NotionHoverSVG />
            <div className="tooltip">
              <span>노션 바로가기</span>
            </div>
          </div>
        </LinkItem>
      </Links>
    </Layout>
  );
};

export default CompactFooter;

const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  width: 100%;
  ${(media.mobile, media.tablet)} {
    flex-direction: column;
    gap: 25px;
  }
`;

const Notice = styled.div`
  color: #fff;
  font-size: 1rem;

  ${(media.mobile, media.tablet)} {
    order: 2;
    font-size: 14px;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 20px;
`;

const LinkItem = styled.div`
  gap: 20px;
  position: relative;

  & .tooltip {
    display: none;
    position: absolute;
    top: -35px;
    left: 0;
  }
  & .item {
    display: flex;
  }
  & .hoverItem {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:hover .item {
    visibility: hidden;
  }
  &:hover .hoverItem {
    display: flex;
  }
  &:hover .tooltip {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    white-space: nowrap;

    /* background-color: #1c1c1c; */
    background-color: #2ebf91;
    border-radius: 2px;

    span {
      font-size: 1rem;
      /* background: linear-gradient(to right, #2ebf91, #8368c3);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent; */
      color: #fff;
    }
  }

  cursor: pointer;
`;
