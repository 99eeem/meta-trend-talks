import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import { CfnRole, FederatedPrincipal, OpenIdConnectProvider, ManagedPolicy, PolicyStatement, Role, ServicePrincipal, CompositePrincipal } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { Config } from '../config/iam/types';
import { imaConfig } from '../config/iam/dev';

interface IamStackProps extends StackProps {
    config: Config
}
export class IamStack extends cdk.Stack {
    constructor (scope: Construct, id: string, props: IamStackProps) {
        super(scope, id, props);
        const iamConfig = props.config.iam;
        const githubProvider = new OpenIdConnectProvider(this, `GithubProvider-${iamConfig.envName}`, {
            url: 'https://token.actions.githubusercontent.com',
            clientIds: ['sts.amazonaws.com']
        });

        const metaTrendTalksDeployRole = new Role(this, `MetaTrendTalksDeployRole-${iamConfig.envName}`, {
            assumedBy: new FederatedPrincipal(
                githubProvider.openIdConnectProviderArn,
                {
                    StringLike: {
                        'token.actions.githubusercontent.com:sub': `repo:${iamConfig.githubOrgName}/${iamConfig.githubRepoName}*`
                    }
                },
                'sts:AssumeRoleWithWebIdentity'
            ),
            roleName: `MetaTrendTalksDeployRole-${iamConfig.envName}`,
            maxSessionDuration: Duration.seconds(3600)
        });

        metaTrendTalksDeployRole.addToPolicy(new PolicyStatement({
            resources: [`arn:aws:cloudfront::${this.account}:distribution/${iamConfig.distributionId}`],
            actions: [
                'cloudfront:CreateInvalidation'
            ]
        }));
        metaTrendTalksDeployRole.addToPolicy(new PolicyStatement({
            resources: [
                `arn:aws:s3:::${iamConfig.s3BucketName}`,
                `arn:aws:s3:::${imaConfig.s3BucketName}/*`
            ],
            actions: [
                's3:GetObject',
                's3:ListAllMyBuckets',
                's3:ListBucket',
                's3:PutObject',
                "s3:DeleteObject",
            ]
        }));
    }
}
