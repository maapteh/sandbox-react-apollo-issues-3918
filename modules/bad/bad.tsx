import styled from 'styled-components';
import { useBadQuery } from '../../codegen/generated/_graphql';

const TitleBad = styled.h1`
    color: red;
    font-size: 24px;
`;

export const Bad = () => {
    console.log('[client] render bad');
    const {
        data: dataBad,
        loading: loadingBad,
        error: errorBad,
    } = useBadQuery();

    return (
        <>
            <TitleBad>Bad</TitleBad>
            <p>{dataBad && dataBad.bad}</p>
            <p>
                But this error actually comes from client-side call. The
                question is when i throw the error from my server i dont want
                the page to recall since it will put unneeded load to my server.
            </p>
            {errorBad && JSON.stringify(errorBad)}
        </>
    );
};
