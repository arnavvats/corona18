import * as webpack from 'webpack';
import { Path } from '@angular-devkit/core';
const PurifyCSSPlugin = require('purifycss-webpack');
const path = require('path');
const glob = require('glob');

import { NormalizedBrowserBuilderSchema } from '@angular-devkit/build-angular';

export interface WebpackOptions<T = NormalizedBrowserBuilderSchema> {
    root: Path;
    projectRoot: Path;
    options: T;
}

const command = process.argv[2].toLowerCase();

export default function (config: webpack.Configuration, options: WebpackOptions) {
    if (command === 'test') {
            console.log('Test configuration is running');
    }
    console.log('To modify webpack build, you can use ngw.config.ts');
    config.plugins.push(
      new PurifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, '**/*.html'))
      })
    );
    return config;
}
