export class SequelizeConfig {
    public readonly url!: string;
    public readonly params: any;

    public constructor() {
        const environment = process.env;
        this.url = environment.DATABASE_URL ?? `postgresql://localhost/inventory-server`;

        this.params = {
            dialect: 'postgres',
            operatorsAliases: false,
            logging: false,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        };
    }
}
