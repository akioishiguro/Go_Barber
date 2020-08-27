import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

@Entity('users') // Referencia a qual tabela do banco iremos utilizar
class User {
  @PrimaryGeneratedColumn('uuid') // Chave Primaria
  id: string;

  @Column() // Coluna
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn() // Data da Criação no Banco
  created_at: Date;

  @UpdateDateColumn() // Data de alteração
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null;
  }
}

export default User;
