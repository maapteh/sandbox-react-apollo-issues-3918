import { NextPage } from 'next';
import { withApollo } from '../lib/apollo';
import { Good } from '../modules/good/good';
import { Bad } from '../modules/bad/bad';

const IndexPage: NextPage = () => {
    return (
        <div>
            <p>
                Components server-side. We don't have the error in our bad
                component.
            </p>

            <Good />

            <Bad />
        </div>
    );
};

export default withApollo(IndexPage);
