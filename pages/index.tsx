import { NextPage } from 'next';
import { withApollo } from '../lib/apollo';
import { Good } from '../modules/good/good';
import { Bad } from '../modules/bad/bad';

const IndexPage: NextPage = () => {
    return (
        <>
            <Good />

            <Bad />
        </>
    );
};

export default withApollo(IndexPage);
