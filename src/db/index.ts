import { Kysely, Migrator, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { migrationProvider } from './migrations'
import { DatabaseSchema } from './schema'

export const createDb = (connectionString: string): Database => {
  return new Kysely<DatabaseSchema>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString
    }),
  })
})
}

export const migrateToLatest = async (db: Database) => {
  const migrator = new Migrator({ db, provider: migrationProvider })
  const { error } = await migrator.migrateToLatest()
  if (error) throw error
}

export type Database = Kysely<DatabaseSchema>
