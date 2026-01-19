import { Pool } from "pg";

export interface WhereConditions {
  [key: string]: any;
}

export interface CreateData {
  [key: string]: any;
}

export interface UpdateData {
  [key: string]: any;
}

export abstract class BaseRepository<T = any> {
  protected tableName: string;

  protected constructor(
    protected connection: Pool,
    tableName: string,
  ) {
    this.tableName = tableName;
  }

  async findAll(): Promise<T[]> {
    const result = await this.connection.query(
      `SELECT * FROM ${this.tableName}`,
    );
    return result.rows;
  }

  async findById(id: any, idColumn: string = "id"): Promise<T | null> {
    const result = await this.connection.query(
      `SELECT * FROM ${this.tableName} WHERE ${idColumn} = $1`,
      [id],
    );
    return result.rows[0] || null;
  }

  async findOne(conditions: WhereConditions): Promise<T | null> {
    const { query, values } = this._buildWhereClause(conditions);
    const result = await this.connection.query(
      `SELECT * FROM ${this.tableName} ${query} LIMIT 1`,
      values,
    );
    return result.rows[0] || null;
  }

  async findMany(conditions: WhereConditions = {}): Promise<T[]> {
    const { query, values } = this._buildWhereClause(conditions);
    const result = await this.connection.query(
      `SELECT * FROM ${this.tableName} ${query}`,
      values,
    );
    return result.rows;
  }

  async create(data: CreateData): Promise<T> {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
    const columnNames = columns.join(", ");

    const result = await this.connection.query(
      `INSERT INTO ${this.tableName} (${columnNames}) VALUES (${placeholders}) RETURNING *`,
      values,
    );
    return result.rows[0];
  }

  async update(
    id: any,
    data: UpdateData,
    idColumn: string = "id",
  ): Promise<T | null> {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const setClause = columns.map((col, i) => `${col} = $${i + 1}`).join(", ");

    const result = await this.connection.query(
      `UPDATE ${this.tableName} SET ${setClause} WHERE ${idColumn} = $${values.length + 1} RETURNING *`,
      [...values, id],
    );
    return result.rows[0] || null;
  }

  async delete(id: any, idColumn: string = "id"): Promise<T | null> {
    const result = await this.connection.query(
      `DELETE FROM ${this.tableName} WHERE ${idColumn} = $1 RETURNING *`,
      [id],
    );
    return result.rows[0] || null;
  }

  async count(conditions: WhereConditions = {}): Promise<number> {
    const { query, values } = this._buildWhereClause(conditions);
    const result = await this.connection.query(
      `SELECT COUNT(*) as count FROM ${this.tableName} ${query}`,
      values,
    );
    return parseInt(result.rows[0].count);
  }

  async exists(conditions: WhereConditions): Promise<boolean> {
    const count = await this.count(conditions);
    return count > 0;
  }

  protected _buildWhereClause(conditions: WhereConditions): {
    query: string;
    values: any[];
  } {
    if (Object.keys(conditions).length === 0) {
      return { query: "", values: [] };
    }

    const columns = Object.keys(conditions);
    const values = Object.values(conditions);
    const clauses = columns.map((col, i) => `${col} = $${i + 1}`).join(" AND ");

    return {
      query: `WHERE ${clauses}`,
      values,
    };
  }
}
