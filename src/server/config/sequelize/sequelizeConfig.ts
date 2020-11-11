export class SequelizeConfig {
    public readonly database: string;
    public readonly username: string;
    public readonly password: string;
    public readonly params: any;

    public constructor() {
        const environment = process.env;
        this.database = environment.DB_NAME ?? 'inventory-server';
        this.username = environment.DB_USER ?? '';
        this.password = environment.DB_PASSWORD ?? '';
        this.params = {
            host: environment.DB_HOST ?? 'localhost',
            dialect: 'postgres',
            operatorsAliases: false,
            logging: false
        };
    }
}
