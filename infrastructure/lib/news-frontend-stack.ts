import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, BlockPublicAccess } from 'aws-cdk-lib/aws-s3';
import {
    CloudFrontWebDistribution,
    LambdaEdgeEventType,
    OriginAccessIdentity,
    PriceClass,
    experimental,
    LambdaFunctionAssociation,
    ViewerCertificate,
    SecurityPolicyProtocol,
    SSLMethod
} from 'aws-cdk-lib/aws-cloudfront';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { SystemEnv } from "../common/const/common-stack-const"
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { Config } from '../config/newsFrontend/types';


interface newsFrontendStackProps extends StackProps {
    config: Config
}
export class NewsFrontendStack extends Stack {
    constructor (scope: Construct, id: string, props: newsFrontendStackProps) {
        super(scope, id, props);
        // コンテキストの取得
        const newsFrontendConfig = props.config.newsFrontend;


        //  既存リソースをインポート
        const certificate = Certificate.fromCertificateArn(this, 'Certificate', newsFrontendConfig.newsUsEast1Certificate);
        const hostedZone = HostedZone.fromLookup(this, 'hostedZone', {
            domainName: newsFrontendConfig.domainName
        });

        // CloudFrontで配信するコンテンツ保管バケット
        const frontendBucket = new Bucket(this, `FrontendBucket-${newsFrontendConfig.envName}`, {
            websiteErrorDocument: 'index.html',
            websiteIndexDocument: 'index.html',
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL
        });
        const frontendIdentity = new OriginAccessIdentity(this, `FrontendIdentity-${newsFrontendConfig.envName}`);
        const frontendBucketPolicyStatement = new PolicyStatement({
            actions: ['s3:GetObject'],
            effect: Effect.ALLOW,
            principals: [
                frontendIdentity.grantPrincipal
            ],
            resources: [`${frontendBucket.bucketArn}/*`]
        });
        frontendBucket.addToResourcePolicy(frontendBucketPolicyStatement);

        // 拡張子(html)の追加用Lambda@edgeの構築
        const originRequestFunction = new experimental.EdgeFunction(this, `OriginRequestFunction-${newsFrontendConfig.envName}`,
            {
                code: Code.fromAsset(
                    path.join(__dirname, '../common/function/originRequest')
                ),
                handler: 'index.handler',
                runtime: Runtime.NODEJS_16_X
            }
        );
        let lambdaFunctionAssociations: LambdaFunctionAssociation[] = [
            {
                eventType: LambdaEdgeEventType.ORIGIN_REQUEST,
                lambdaFunction: originRequestFunction
            }
        ];

            // Basic認証用Lambda@edgeの構築
            const basicAuthenticationFunction = new experimental.EdgeFunction(this, `BasicAuthenticationFunction-${newsFrontendConfig.envName}`,
                {
                    code: Code.fromAsset(
                        path.join(__dirname, '../common/function/basicAuthentication')
                    ),
                    handler: 'index.handler',
                    runtime: Runtime.NODEJS_16_X
                }
            );
                   // XRobotsTag追加用Lambda@edgeの構築
                   const addXRobotsTagFunction = new experimental.EdgeFunction(this, `AddXRobotsTagFunction-${newsFrontendConfig.envName}`,
                   {
                       code: Code.fromAsset(
                           path.join(__dirname, '../common/function/addXRobotsTag')
                       ),
                       handler: 'index.handler',
                       runtime: Runtime.NODEJS_16_X
                   }
               );
        if(newsFrontendConfig.envName === SystemEnv.DEV) {
            lambdaFunctionAssociations.push({
                eventType: LambdaEdgeEventType.VIEWER_REQUEST,
                lambdaFunction: basicAuthenticationFunction
            });
            lambdaFunctionAssociations.push({
                eventType: LambdaEdgeEventType.ORIGIN_RESPONSE,
                lambdaFunction: addXRobotsTagFunction
            });
        }
        
        // Distributionの構築
        const distribution = new CloudFrontWebDistribution(this, `FrontendDistribution-${newsFrontendConfig.envName}`, {
            errorConfigurations: [
                {
                    errorCachingMinTtl: 300,
                    errorCode: 403,
                    responseCode: 200,
                    responsePagePath: '/404.html'
                },
                {
                    errorCachingMinTtl: 300,
                    errorCode: 404,
                    responseCode: 200,
                    responsePagePath: '/404.html'
                }
            ],
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: frontendBucket,
                        originAccessIdentity: frontendIdentity
                    },
                    behaviors: [
                        {
                            isDefaultBehavior: true,
                            lambdaFunctionAssociations
                        }
                    ]
                }
            ],
            priceClass: PriceClass.PRICE_CLASS_200,
            viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {
                aliases: [hostedZone.zoneName],
                securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2021,
                sslMethod: SSLMethod.SNI
            })
        });

        new ARecord(this, `ARecord${newsFrontendConfig.envName}`, {
            zone: hostedZone,
            recordName: hostedZone.zoneName,
            target: RecordTarget.fromAlias(
                new CloudFrontTarget(distribution)
            )
        });
    }
}
