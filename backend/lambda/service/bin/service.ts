#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {ServiceStack } from '../lib/service-stack';
import { config as lambdaConfigDev } from '../../../config/lambda/dev'
import { config as lambdaConfigProd } from '../../../config/lambda/prod'


const app = new cdk.App (
    {
        context: {
            common: {
                domainName: process.env.MTT_DOMAIN,
            },
        }
    }
);

// new ServiceStack (app, 'LambdaStackDev', {
//   config: lambdaConfigDev,
// });
new ServiceStack (app, 'LambdaStackProd', {
  config: lambdaConfigProd,
});