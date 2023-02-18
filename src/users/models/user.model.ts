import * as bcrypt from 'bcrypt';
import {
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Model,
  Scopes,
  Table,
  Unique,
  Validate,
} from 'sequelize-typescript';
import { UserStatus } from 'src/common/enums';
import { Role } from 'src/roles/models/roles.model';

@Scopes(() => ({
  withoutTimestamp: {
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt'],
    },
  },
  withoutPassword: {
    attributes: {
      exclude: ['password'],
    },
  },
  withRole: {
    attributes: {
      exclude: ['role_id'],
    },
    include: {
      model: Role,
      as: 'role',
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
    },
  },
}))
@Table({
  tableName: 'users',
  underscored: true,
  paranoid: true,
})
export class User extends Model {
  @Column
  fullname: string;

  @Unique
  @Validate({
    isEmail: true,
  })
  @Column
  email: string;

  @Column
  get password() {
    return this.getDataValue('password');
  }

  set password(value: string) {
    this.setDataValue('password', bcrypt.hashSync(value, 10));
  }

  @Default(UserStatus.NEW)
  @Column
  status: string;

  @ForeignKey(() => Role)
  @Default(2)
  @Column
  role_id: number;

  @BelongsTo(() => Role, 'role_id')
  role?: Partial<Role>;

  comparePasswordSync(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
