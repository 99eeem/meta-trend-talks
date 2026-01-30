import {Duration, Stack, StackProps} from 'aws-cdk-lib'
import {Construct} from 'constructs'
import {ApiDefinition, EndpointType, SpecRestApi} from 'aws-cdk-lib/aws-apigateway'
// import {PythonLayerVersion} from '@aws-cdk/aws-lambda-python-alpha';
import {resolve} from 'path';
import {AssetCode, LayerVersion, Runtime} from 'aws-cdk-lib/aws-lambda';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {ServicePrincipal} from 'aws-cdk-lib/aws-iam';
import { SystemEnv } from '../../common/cdk/common-stack-const';
import { Config } from '../../config/apigateway/types';

interface ApiGatewayProps extends StackProps {
    config: Config
}

export class ApiGatewayStack extends Stack {
    public restApi: SpecRestApi;
    constructor(scope: Construct, id: string, props: ApiGatewayProps) {
        super(scope, id, props)
        const apigatewayConfig = props.config.apiGateway
        // const ctxCognito = this.node.tryGetContext('cognito')
        // const ctxCommon = this.node.tryGetContext('common')
        // Pythonのモジュールを追加するLambdaLayerを定義する
        // const libsLayer = new PythonLayerVersion(this, 'LibsLayer', {
        //     entry: resolve(__dirname, '../lambda-layer/libs'),
        //     compatibleRuntimes: [Runtime.PYTHON_3_9]
        // })
        
        // // Api GatewayのCustomAuthorizerに指定するLambdaを作成する
        // const customAuthorizer = new lambda.Function(this, 'CustomAuthorizerFunction', {
        //     handler: 'index.lambda_handler',
        //     runtime: Runtime.PYTHON_3_9,
        //     functionName: 'CustomAuthorizerFunction',
        //     code: lambda.Code.fromAsset(resolve(__dirname, '../function/customAuthorizer')),
        //     timeout: Duration.seconds(30),
        //     layers: [
        //         libsLayer
        //     ],
        //     environment: {
        //         REGION: this.region,
        //         USER_POOLS_ID: ctxCognito.userPoolId,
        //         USER_POOLS_WEB_CLIENT_ID: ctxCognito.userPoolsWebClientId,
        //     }
        // })

        // リソースベースポリシーを作成する
        // customAuthorizer.addPermission('CustomAuthorizerFunctionPermission',
        //     {
        //         principal: new ServicePrincipal('apigateway.amazonaws.com'),
        //         action: 'lambda:InvokeFunction',
        //     },
        // )
        // Api Gatewayを作成する
        this.restApi = new SpecRestApi(this, `mttApiGateway-${apigatewayConfig.envName}`, {
            restApiName: `mtt-${apigatewayConfig.envName}`,
            apiDefinition: ApiDefinition.fromAsset('./openapi.yml'),
            endpointTypes: [EndpointType.REGIONAL],
            deployOptions: {
                stageName: apigatewayConfig.envName,
            },
        })
    }
}
