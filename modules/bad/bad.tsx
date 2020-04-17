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
                We dont get the error :(
            </p>
            {errorBad && JSON.stringify(errorBad)}
        </>
    );
};
