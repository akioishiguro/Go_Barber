import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

@Entity('user_tokens') // Referencia a qual tabela do banco iremos utilizar
class UserToken {
  @PrimaryGeneratedColumn('uuid') // Chave Primaria
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn() // Data da Criação no Banco
  created_at: Date;

  @UpdateDateColumn() // Data de alteração
  updated_at: Date;
}

export default UserToken;
