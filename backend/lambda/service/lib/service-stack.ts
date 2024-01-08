import {Duration, Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import {resolve} from 'path';
import {PythonLayerVersion} from '@aws-cdk/aws-lambda-python-alpha';
import {Runtime, Function, LayerVersion, AssetCode} from 'aws-cdk-lib/aws-lambda';
import {Effect, ServicePrincipal} from 'aws-cdk-lib/aws-iam';
import {ApiDefinition, IRestApi, RestApi, SpecRestApi} from 'aws-cdk-lib/aws-apigateway'
import {Alarm, ComparisonOperator} from 'aws-cdk-lib/aws-cloudwatch';
import {FilterPattern, MetricFilter} from 'aws-cdk-lib/aws-logs';
import {Topic} from 'aws-cdk-lib/aws-sns';
import {SnsAction} from 'aws-cdk-lib/aws-cloudwatch-actions';
import * as logs from 'aws-cdk-lib/aws-logs'
import { Table } from 'aws-cdk-lib/aws-dynamodb'
import { Config } from '../../../config/lambda/types'

interface ServiceStackProps extends StackProps { 
    config: Config
}
export class ServiceStack extends Stack {
    constructor(scope: Construct, id: string, props: ServiceStackProps) {
        super (scope, id, props);
        const lambdaConfig = props.config.lambda;
        // Pythonのモジュールを追加するLambdaLayerを定義する
        const libsLayer = new PythonLayerVersion (this, `LibsLayer-${lambdaConfig.envName}`, {
            layerVersionName: 'ServiceLayer',
            entry: resolve (__dirname, '../lambda-layer/libs'),
            compatibleRuntimes: [Runtime.PYTHON_3_9]
        })
        // 共通のビジネスロジックを定義する
        const commonUtilsLayer = new PythonLayerVersion (this, `CommonUtilsLayer-${lambdaConfig.envName}`, {
            layerVersionName: 'CommonUtilsLayer',
            entry: resolve (__dirname, '../../../common/utils/sources'),
            compatibleRuntimes: [Runtime.PYTHON_3_9]
        })
        ////////// Functionの追加 //////////
        const postNewsFunction = new lambda.Function (this, `PostNewsFunction-${lambdaConfig.envName}`, {
            code: lambda.Code.fromAsset (resolve (__dirname, '../function/postNews')),
            handler: 'index.handler',
            functionName: `PostNewsFunction-${lambdaConfig.envName}`,
            runtime: lambda.Runtime.PYTHON_3_9,
            timeout: Duration.minutes (15),
            logRetention: logs.RetentionDays.ONE_WEEK,
            layers: [
                libsLayer,
                commonUtilsLayer
            ],
            environment: {
                SYSTEM_ENV: lambdaConfig.envName,
                X_API_KEY: lambdaConfig.xApiKey,
                X_API_SECRET: lambdaConfig.xApiSecret,
                X_BEARER_TOKEN: lambdaConfig.xBearerToken,
                X_ACCESS_TOKEN: lambdaConfig.xAccessToken,
                X_ACCESS_TOKEN_SECRET: lambdaConfig.xAccessTokenSecret,
                MTT_DOMAIN: lambdaConfig.mttDomain,
                CMS_SERVICE_ID: lambdaConfig.cmsService
            }
        })  
          // 👇 Setup lambda url
        const lambdaUrl = postNewsFunction.addFunctionUrl({
            authType: lambda.FunctionUrlAuthType.NONE,
            cors: {
                allowedMethods: [lambda.HttpMethod.ALL],
                allowedOrigins: [`https://${lambdaConfig.cmsService}.microcms.io`]
            }
        });
    }
}
