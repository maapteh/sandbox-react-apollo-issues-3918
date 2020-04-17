import { NextPage } from 'next';
import { withApollo } from '../lib/apollo';
import { Good } from '../modules/good/good';
import { Bad } from '../modules/bad/bad';

const IndexPage: NextPage = () => {
    return (
        <>
            <p>Both components should query data only once server-side</p>

            <Good />

            <Bad />
        </>
    );
};

export default withApollo(IndexPage);
