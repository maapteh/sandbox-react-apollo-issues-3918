import App from 'next/app';
import Link from 'next/link';
import React from 'react';
import { Normalize } from '../utils/normalize';

class MyApp extends App {
    static displayName = 'mpthSample';

    render() {
        // @ts-ignore
        const { Component, pageProps } = this.props;

        return (
            <>
                <Component {...pageProps} />

                <p>
                    example:{' '}
                    <Link href="/">
                        <a>server-side</a>
                    </Link>{' '}
                    <Link href="/client-side">
                        <a>client-side</a>
                    </Link>
                </p>

                <Normalize />
            </>
        );
    }
}

export default MyApp;
