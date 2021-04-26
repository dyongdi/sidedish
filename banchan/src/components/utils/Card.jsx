import styled from "styled-components";
import theme from "../utils/styles/theme.js";
import Price from "./Price";
import Label from "./Label";
import { CenterContainer, LabelList, StyledDescription, StyledTitle } from "./styles/common.jsx";
import { useEffect, useState } from "react";
import Modal from "./modal/Modal.jsx";
import ModalCard from "./modal/ModalCard.jsx";
import { URLS } from "../../utils/variables.js";
import IconButton from "./button/IconButton.jsx";

const mockImage = "https://recipe1.ezmember.co.kr/cache/recipe/2020/09/23/5e308abb30b00ecb9c1b9b398db5b4451.jpg";

const Card = ({ product, cardSize, margin = 0, type, onModal }) => {
  const [modalState, setModalState] = useState(false);
  const [detail, setDetail] = useState({});

  const requestProductDetailInfo = async () => {
    const data = await fetch(URLS.base + `detail/${product.detail_hash}`);
    const json = await data.json();
    setDetail({ ...json.data });
    setModalState(true);
  };

  return (
    <>
      <StyledLi cardSize={cardSize} margin={margin} onClick={requestProductDetailInfo}>
        <StyledThumbnail>
          <StyledHoverLayer cardSize={cardSize}>
            <DeliveryTypeList>
              {product.delivery_type.reduce((acc, val, idx, array) => {
                acc.push(
                  <p>
                    {val} {idx < array.length - 1 ? <Divider /> : ""}
                  </p>
                );
                return acc;
              }, [])}
            </DeliveryTypeList>
          </StyledHoverLayer>
          <StyledImg cardSize={cardSize} src={type === "베스트" ? mockImage : product.image} alt="card-image" />
        </StyledThumbnail>
        <StyledTitle>{product.title}</StyledTitle>
        <StyledDescription>{product.description}</StyledDescription>
        <Price product={product} />
        <LabelList>{product.badge && product.badge.map((e) => <Label badgeName={e} />)}</LabelList>
      </StyledLi>
      {modalState && (
        <Modal>
          <ModalBackground>
            <ModalContainer>
              <ModalCard product={{ ...product, ...detail }} />
              <IconButton type="CLOSE" fn={() => setModalState(false)} />
            </ModalContainer>
          </ModalBackground>
        </Modal>
      )}
    </>
  );
};

const ModalBackground = styled(CenterContainer)`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  z-index: 5;
`;

const ModalContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const StyledLi = styled.li`
  width: ${(props) => props.cardSize};
  margin: 0 ${(props) => props.margin}px;
`;

const StyledThumbnail = styled.div`
  position: relative;
`;

const StyledImg = styled.img`
  border-radius: ${theme.borders.radius};
  margin-bottom: 16px;
  width: ${(props) => props.cardSize};
  height: ${(props) => props.cardSize};
`;

const StyledHoverLayer = styled(CenterContainer)`
  color: ${(props) => props.theme.colors.white};
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.cardSize};
  height: ${(props) => props.cardSize};
  border-radius: ${theme.borders.radius};
  z-index: 4;
  font-size: ${(props) => props.theme.fontSizes.XL};
  font-weight: bold;

  &:hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
    opacity: 1;
  }
`;

const DeliveryTypeList = styled.div``;

const Divider = styled.div`
  border: 1px solid ${(props) => props.theme.colors.white};
  width: 90px;
  margin: 16px 0;
`;

export default Card;
