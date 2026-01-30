import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Certificate, DnsValidatedCertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { IHostedZone, PublicHostedZone, HostedZone } from 'aws-cdk-lib/aws-route53';
import { Config } from '../config/certificate/types';

interface CertificateStackProps extends StackProps {
    config: Config
}
export class CertificateStack extends Stack {
    constructor (scope: Construct, id: string, props: CertificateStackProps) {
        super(scope, id, props);
        const certificateConfig = props.config.certificate;
        const hostedZone = HostedZone.fromHostedZoneAttributes(this, `importHostedZone-${certificateConfig.envName}`, {
            hostedZoneId: certificateConfig.hostedZoneId,
            zoneName: certificateConfig.hostedZoneName
        })
        new DnsValidatedCertificate(this, `CertificateUsEast-1-${certificateConfig.envName}`, {
            domainName: `${hostedZone.zoneName}`,
            subjectAlternativeNames: [`*.${hostedZone.zoneName}`],
            hostedZone: hostedZone,
            region: 'us-east-1',
        });
           new DnsValidatedCertificate(this, `CertificateApnorthEast-1-${certificateConfig.envName}`, {
            domainName: `${hostedZone.zoneName}`,
            subjectAlternativeNames: [`*.${hostedZone.zoneName}`],
            hostedZone: hostedZone,
            region: 'ap-northeast-1',
        });
    }
}
