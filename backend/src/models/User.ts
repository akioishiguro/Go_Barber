import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users') // Referencia a qual tabela do banco iremos utilizar
class User {
  @PrimaryGeneratedColumn('uuid') // Chave Primaria
  id: string;

  @Column() // Coluna
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn() // Data da Criação no Banco
  created_at: Date;

  @UpdateDateColumn() // Data de alteração
  updated_at: Date;
}

export default User;
