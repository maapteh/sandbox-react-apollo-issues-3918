import styled from 'styled-components';
import { Simple } from '../../components/simple/simple';
import { useBadQuery } from '../../codegen/generated/_graphql';

const TitleBad = styled.h1`
    color: #ff7900;
    font-size: 24px;
`;

type Props = {
    ssr?: boolean;
};

export const Bad = ({ ssr = true }: Props) => {
    console.log('[client] render bad');
    const { data, loading, error } = useBadQuery({
        ssr,
    });

    if (loading) {
        return <>Loading</>;
    }

    return (
        <Simple>
            <TitleBad>Bad</TitleBad>

            <p>{data && data.bad}</p>

            <p>
                {Boolean(!error && !loading) && (
                    <>We dont get the error, but for sure error is thrown ssr ...</>
                )}
                {error && JSON.stringify(error)}
            </p>
        </Simple>
    );
};
