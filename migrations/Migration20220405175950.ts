import { Migration } from '@mikro-orm/migrations';

export class Migration20220405175950 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "engineer" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null);',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table "engineer"');
  }
}
