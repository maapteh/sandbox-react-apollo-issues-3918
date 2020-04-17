import styled from 'styled-components';
import { useBadQuery } from '../../codegen/generated/_graphql';

const TitleBad = styled.h1`
    color: red;
    font-size: 24px;
`;

export const Bad = () => {
    console.log('[client] render bad');
    const {
        data,
        loading,
        error,
    } = useBadQuery();

    if (loading) {
        return <>Loading</>;
    }

    return (
        <>
            <TitleBad>Bad</TitleBad>

            <p>{data && data.bad}</p>

            {Boolean(!error && !loading) && <>We dont get the error, but for sure error is thrown ssr ...</>}
            {error && JSON.stringify(error)}
        </>
    );
};
