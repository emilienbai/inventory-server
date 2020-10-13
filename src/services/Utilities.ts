import { injectable } from 'inversify';
import { FindOptions, Model } from 'sequelize';
import { OrderItem } from 'sequelize/types/lib/model';
import { IUtilities } from '../interfaces';

@injectable()
export class Utilities implements IUtilities {
    public parseQueryParameters<T>(query: any, m: typeof Model): FindOptions {
        const options: FindOptions<T> = {};
        options.offset = this.parsePositiveIntegerOrThrow(query, 'offset');
        delete query.offset;

        options.limit = this.parsePositiveIntegerOrThrow(query, 'limit', 100);
        if (options.limit > 100) options.limit = 100;
        delete query.limit;

        const order = this.parseOrderBy(query, m);
        if (order) options.order = order;
        delete query.order_by;

        return options;
    }

    private parsePositiveIntegerOrThrow(data: any, key: string, defaultValue = 0): number {
        if (key in data) {
            const value = parseInt(data[key]);
            if (Number.isNaN(value) || value < 0) {
                throw new QueryParametersParsingError(`${key} must be a positive number.`);
            }
            return value;
        }
        return defaultValue;
    }

    private parseOrderBy(query: any, m: typeof Model): OrderItem[] | null {
        if (!('order_by' in query)) return null;

        if (Array.isArray(query.order_by)) {
            return query.order_by.map((order: string) => this._parseOrderByString(order, m));
        }
        return [this._parseOrderByString(query.order_by, m)];
    }

    private _parseOrderByString(order: string, m: typeof Model): OrderItem {
        let orderAttribute = order;
        let ascending = true;
        if (orderAttribute.startsWith('-')) {
            orderAttribute = orderAttribute.slice(1);
            ascending = false;
        } else if (orderAttribute.startsWith('+')) {
            orderAttribute = orderAttribute.slice(1);
            ascending = true;
        }
        const attributes = Object.keys(m.rawAttributes);
        if (!attributes.includes(orderAttribute)) {
            throw new QueryParametersParsingError(
                `Cannot order using ${orderAttribute}: valid attributes are: "${attributes.join(', ')}"`
            );
        }
        return [orderAttribute, ascending ? 'ASC' : 'DESC'];
    }
}

export class QueryParametersParsingError extends Error {}
