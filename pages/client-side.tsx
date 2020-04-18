import { NextPage } from 'next';
import { withApollo } from '../lib/apollo';
import { Good } from '../modules/good/good';
import { Bad } from '../modules/bad/bad';

const ClientSidePage: NextPage = () => {
    return (
        <div>
            <p>
                Components client-side. Refresh page, results can come from
                cache!
            </p>

            <Good />

            <p>Client-side i do get the error:</p>

            <Bad ssr={false} />
        </div>
    );
};

export default withApollo(ClientSidePage);
