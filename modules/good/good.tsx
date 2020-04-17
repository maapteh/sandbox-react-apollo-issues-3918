import styled from 'styled-components';
import { useGoodQuery } from '../../codegen/generated/_graphql';

const TitleGood = styled.h1`
    color: green;
    font-size: 24px;
`;

export const Good = () => {
    console.log('[client] render good');
    const {
        data,
    } = useGoodQuery();

    return (
        <>
            <TitleGood>Good</TitleGood>
            <p>{data && data.good}</p>
        </>
    );
};
