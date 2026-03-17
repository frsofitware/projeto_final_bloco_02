import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  @IsNotEmpty({ message: 'A Categoria é Obrigatória' })
  @Length(3, 100, { message: 'A Categoria deve ter entre 3 e 100 caracteres.' })
  @Column({ length: 100, nullable: false })
  descricao: string;
}
