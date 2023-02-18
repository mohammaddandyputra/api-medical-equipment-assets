import { Column, HasMany, Model, Scopes, Table } from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

@Scopes(() => ({
  withoutTimestamp: {
    attributes: {
      exclude: ['created_at', 'updated_at', 'deleted_at'],
    },
  },
}))
@Table({
  tableName: 'roles',
  underscored: true,
  paranoid: true,
})
export class Role extends Model {
  @Column
  name: string;

  @HasMany(() => User, 'role_id')
  users: User[];
}
