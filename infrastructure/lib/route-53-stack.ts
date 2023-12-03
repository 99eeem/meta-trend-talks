import {Duration, Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {HostedZone, MxRecord, PublicHostedZone, ZoneDelegationRecord} from 'aws-cdk-lib/aws-route53';
import {SystemEnv} from '../common/const/common-stack-const'
import {Config} from '../config/route53/types'

interface route53StackProps extends StackProps {
    config: Config;
  }
export class Route53Stack extends Stack {
    public readonly hostedZone: HostedZone;

    constructor(scope: Construct, id: string, props: route53StackProps) {
        super(scope, id, props);
        // const ctxRoute53 = this.node.tryGetContext('route53')
        const route53Config = props.config.route53;
        // ホストゾーンを追加する
        this.hostedZone = new PublicHostedZone(this, `HostedZone-${route53Config.envName}-de`, {
            zoneName: route53Config.domainName,
        });
        // SESをSNSと連携する為にMxレコードを追加する
        // new MxRecord(this, 'MyMxRecord', {
        //     values: [{
        //         hostName: 'inbound-smtp.us-east-1.amazonaws.com',
        //         priority: 10,
        //     }],
        //     zone: this.hostedZone,
        //     comment: 'created by cdk',
        //     recordName: ctxCommon.domainName,
        //     ttl: Duration.seconds(300),
        // });
        if (route53Config.envName === SystemEnv.PROD) {
            const nsListDev = route53Config.nsListDev.split(',')
            new ZoneDelegationRecord(this, 'NSUtoDev', {
                zone: this.hostedZone,
                recordName: 'dev',
                nameServers: nsListDev,
                comment: 'Created from cdk',
            });
        }
    }
}
