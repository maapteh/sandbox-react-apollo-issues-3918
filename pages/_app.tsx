import App from 'next/app';
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
                <Normalize />
            </>
        );
    }
}

export default MyApp;
