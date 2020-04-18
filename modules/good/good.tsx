import styled from 'styled-components';
import { Simple } from '../../components/simple/simple';
import { useGoodQuery } from '../../codegen/generated/_graphql';

const TitleGood = styled.h1`
    color: #00ade6;
    font-size: 24px;
`;

type Props = {
    ssr?: boolean;
};

export const Good = ({ ssr = true }: Props) => {
    console.log('[client] render good');
    const { data } = useGoodQuery({
        ssr,
    });

    return (
        <Simple>
            <TitleGood>Good</TitleGood>
            <p>{data && data.good}</p>
        </Simple>
    );
};
