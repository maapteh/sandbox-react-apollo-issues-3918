import { NextPage } from 'next';
import { withApollo } from '../lib/apollo';
import { Error } from '../modules/error/error';

const IndexPage: NextPage = () => {
    return (
        <div>
            <p>
                Sample for 401 on endpoint
            </p>

            <Error />
        </div>
    );
};

export default withApollo(IndexPage);
