import {Stack, StackProps} from 'aws-cdk-lib'
import {Construct} from 'constructs'
import {DomainName, EndpointType, SecurityPolicy, SpecRestApi} from 'aws-cdk-lib/aws-apigateway'
import {ARecord, HostedZone, RecordTarget} from 'aws-cdk-lib/aws-route53';
import {Certificate} from 'aws-cdk-lib/aws-certificatemanager';
import { ApiGatewayDomain } from 'aws-cdk-lib/aws-route53-targets';
import { Config } from '../../config/apigateway/types';

interface ApiGatewayProps extends StackProps {
    restApi: SpecRestApi;
    env: {
        account: string;
        region: string;
    }
    config: Config
}

export class ApiGatewayCustomDomainStack extends Stack {
    constructor(scope: Construct, id: string, props: ApiGatewayProps) {
        super(scope, id, props)
        // const ctxCommon = this.node.tryGetContext('common')
        // const ctxCertificateManager = this.node.tryGetContext('certificateManager')
        const apiGatewayConfig = props.config.apiGateway

        const certificate = Certificate.fromCertificateArn(this, 'Certificate', apiGatewayConfig.apiGatewayCertificateArn)
        const hostedZone = HostedZone.fromLookup(this, 'hostedZone', {
            domainName: apiGatewayConfig.domainName,
        });

        const customDomain = new DomainName(this, `CustomDomain-${apiGatewayConfig.envName}`, {
            domainName: `api.${hostedZone.zoneName}`,
            certificate: certificate,
            securityPolicy: SecurityPolicy.TLS_1_2,
            endpointType: EndpointType.REGIONAL
        });

        new ARecord(this, `ARecord-${apiGatewayConfig.envName}`, {
            zone: hostedZone,
            recordName: `api.${hostedZone.zoneName}`,
            target: RecordTarget.fromAlias(new ApiGatewayDomain(customDomain)),
            comment: 'created by cdk'
        });

        customDomain.addBasePathMapping(props.restApi, {
            basePath: apiGatewayConfig.envName,
        });
    }
}
