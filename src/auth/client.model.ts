import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Client extends Model<Client> {
  @Column({ allowNull: false, unique: true })
  username: string;

  @Column({ allowNull: false })
  password: string;
}
