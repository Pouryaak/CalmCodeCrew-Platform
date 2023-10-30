import styled from '@emotion/styled'
import { COLORS } from '../../config/colors';
import loginBg from '../../assets/login_bg.jpeg';
import shape from '../../assets/ai-generator-15.png'
import { SIZE } from '../../config/styles-vars';

export const Container = styled.div`
    display: flex;
    border-radius: 10px;
    background-color: ${COLORS.LIGHT_BG};
    width: 100%;
    margin: auto;
    max-width: 1024px;
    height: 85vh;
    padding: 25px;
    gap: 20px;

    @media (max-width: ${SIZE.TABLET}) { 
        flex-direction: column;
    }
`;

export const Block = styled.div`
    width: 50%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Horizontally centers content */
    align-items: center;

    @media (max-width: ${SIZE.TABLET}) { 
        width: 100%;
        height: 100%;
    }
`;

export const LeftBlock = styled(Block)`
    background: linear-gradient(rgba(0, 60, 0, 0.7), rgba(0, 10, 0, 0.9)), url(${loginBg}) no-repeat center/cover !important;
    border-radius: 10px;
`