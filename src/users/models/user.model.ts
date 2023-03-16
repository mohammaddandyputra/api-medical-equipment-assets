import * as bcrypt from 'bcrypt';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
  Validate,
} from 'sequelize-typescript';
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
      model: Role.scope(['withoutTimestamp']),
      as: 'role',
    },
  },
}))
@Table({
  tableName: 'users',
  underscored: true,
  paranoid: true,
})
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column
  name: string;

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

  @Column
  position: string;

  @ForeignKey(() => Role)
  @Default('a5dce09f-d834-4de7-859e-304cc6afa37d')
  @Column
  role_id: number;

  @BelongsTo(() => Role, 'role_id')
  role?: Partial<Role>;

  comparePasswordSync(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
