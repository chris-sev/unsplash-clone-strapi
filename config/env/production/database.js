const { ConnectionString } = require("connection-string");

if (!process.env.DATABASE_URL) throw new Error("Add a DATABASE_URL");

const parsed = new ConnectionString(process.env.DATABASE_URL);

module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: parsed.hostname,
        port: parsed.port,
        database: parsed.path?.[0],
        user: parsed.user,
        password: parsed.password,
        ssl: {
          rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false), // For self-signed certificates
        },
      },
      options: {
        ssl: env.bool("DATABASE_SSL", false),
      },
    },
  },
});
