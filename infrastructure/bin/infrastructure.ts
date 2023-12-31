#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
// import {AmplifyStack} from '../lib/amplify-stack';
// import {NotificationStack} from '../lib/notification-stack';
import {Route53Stack} from '../lib/route-53-stack';
import {NewsFrontendStack} from '../lib/news-frontend-stack'
import { CertificateStack } from '../lib/cetificate-stack';
import { IamStack } from '../lib/iam-stack';
import {SystemEnv} from '../common/const/common-stack-const'
import { config as route53ConfigDev } from '../config/route53/dev'
import { config as route53AConfigProd } from '../config/route53/prod'
import { config as newsFrontendConfigDev } from '../config/newsFrontend/dev'
import { config as newsFrontendConfiProd } from '../config/newsFrontend/prod'
import { config as certificateConfigDev } from '../config/certificate/dev'
import { config as certificateConfigProd } from '../config/certificate/prod'
import { config as iamConfigDev } from '../config/iam/dev'
import { config as iamConfigProd } from '../config/iam/prod'


const targetEnv: string = process.env.SYSTEM_ENV || SystemEnv.LOCAL

const app = new cdk.App (
    {
        context: {
          systemEnv: targetEnv,
            common: {
                domainName: process.env.MTT_DOMAIN,
            },
        }
    }
);
new Route53Stack (app, 'Route53StackDev', {
  config: route53ConfigDev,
   env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
}
});
new Route53Stack (app, 'Route53StackProd', {
  config: route53AConfigProd,
   env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
}
});
new NewsFrontendStack (app, 'NewsFrontendStackDev', {
  config: newsFrontendConfigDev,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
}
});
new NewsFrontendStack (app, 'NewsFrontendStackProd', {
  config: newsFrontendConfiProd,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
}
});
new CertificateStack (app, 'CertificateStackDev', {
  config: certificateConfigDev,
});
new CertificateStack (app, 'CertificateStackProd', {
  config: certificateConfigProd,
});
new IamStack (app, 'IamStackDev', {
  config: iamConfigDev,
});
new IamStack (app, 'IamStackProd', {
  config: iamConfigProd,
});
// new NewsFrontendStack (app, 'NewsFrontendStack',{
//   env: {
//     account: process.env.CDK_DEFAULT_ACCOUNT,
//     region: process.env.CDK_DEFAULT_REGION
//   }
// });
// new NotificationStack (app, 'NotificationStack');
// new BudgetsStack (app, 'BudgetsStack');
// new SesStack (app, 'SesStack', {
//     env: {
//         region: 'us-east-1'
//     },
// });
// new CertificateStack (app, 'CertificateStack', {
//     hostedZone: route53.hostedZone,
// });
