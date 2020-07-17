import styled from 'styled-components';
import { Simple } from '../../components/simple/simple';
import { useAuthenticationErrorQuery } from '../../codegen/generated/_graphql';

const TitleError = styled.h1`
    color: #ff7900;
    font-size: 24px;
`;

type Props = {
    ssr?: boolean;
};

export const Error = ({ ssr = true }: Props) => {
    console.log('[client] render bad');
    const { data, loading, error } = useAuthenticationErrorQuery({ssr: false});

    if (loading) {
        return <>Loading</>;
    }

    return (
        <Simple>
            <TitleError>401 on part of the result</TitleError>
            <p>ssr: false shows error, ssr: true the error is gone :(</p>
            
            <p>{data && data.authenticationError}</p>

            <p>{data && data.good}</p>

            <p>
                {Boolean(!error && !loading) && (
                    <>
                        We dont get the error, but for sure error is thrown ssr
                        ...
                    </>
                )}
                {error && JSON.stringify(error)}
            </p>
        </Simple>
    );
};
