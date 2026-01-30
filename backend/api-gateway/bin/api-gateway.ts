#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {ApiGatewayStack} from '../lib/api-gateway-stack';
import {SystemEnv} from '../../common/cdk/common-stack-const'
import { ApiGatewayCustomDomainStack } from '../lib/api-gateway-custom-domain-stack';
// import { config as apiGatewayConfigDev } from '../../config/apigateway/dev'
import { config as apiGatewayConfigProd } from  '../../config/apigateway/prod'

const targetEnv: string = process.env.SYSTEM_ENV || SystemEnv.LOCAL
const app = new cdk.App({
    context: {
        // cognito: {
        //     userPoolId: process.env.USER_POOLS_ID,
        //     userPoolsWebClientId: process.env.USER_POOLS_WEB_CLIENT_ID,
        // },
        // certificateManager: {
        //     apiGatewayCertificateArn: process.env.AP_NORTHEAST1_CERTIFICATE_ARN
        // },
        // common: {
        //     domainName: process.env.CKK_DOMAIN,
        //     env: process.env.SYSTEM_ENV
        // }
    }
});
// const apiGateway = new ApiGatewayStack(app, `ApiGatewayStack-${targetEnv}`, targetEnv, {
//     env: {
//         account: process.env.CDK_DEFAULT_ACCOUNT,
//         region: process.env.CDK_DEFAULT_REGION
//     }
// });



// const apiGatewayDev = new ApiGatewayStack(app, 'ApiGatewayStackDev', {
//     env: {
//         account: process.env.CDK_DEFAULT_ACCOUNT!,
//         region: process.env.CDK_DEFAULT_REGION!
//     },
//     config: apiGatewayConfigDev,
// });
const apiGatewayProd = new ApiGatewayStack(app, 'ApiGatewayStackProd', {
        env: {
        account: process.env.CDK_DEFAULT_ACCOUNT!,
        region: process.env.CDK_DEFAULT_REGION!
    },
  config: apiGatewayConfigProd,
});

// new ApiGatewayCustomDomainStack(app, `ApiGatewayCustomDomainStackDev`, {
//     restApi: apiGatewayDev.restApi,
//     env: {
//         account: process.env.CDK_DEFAULT_ACCOUNT!,
//         region: process.env.CDK_DEFAULT_REGION!
//     },
//     config: apiGatewayConfigDev,
// });

// new ApiGatewayCustomDomainStack(app, `ApiGatewayCustomDomainStackProd`, {
//     restApi: apiGatewayProd.restApi,
//     env: {
//         account: process.env.CDK_DEFAULT_ACCOUNT!,
//         region: process.env.CDK_DEFAULT_REGION!
//     },
//     config: apiGatewayConfigProd,
// });
