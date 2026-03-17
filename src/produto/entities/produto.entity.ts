import { Transform, TransformFnParams } from 'class-transformer';
import {
    IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Length,
  Min,
} from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NumericTransformer } from '../../util/numerictransformer';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity({ name: 'tb_produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  @IsNotEmpty({ message: 'O Nome é Obrigatório' })
  @Length(3, 255, { message: 'O Nome deve ter entre 3 e 255 caracteres' })
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  @IsNotEmpty({ message: 'A Marca do Produto é Obrigatória' })
  @Length(2, 100, {
    message: 'O Nome da Marca do Produto precisa ter entre 2 e 100 caracteres',
  })
  @Column({ length: 100, nullable: false })
  @ApiProperty()
  marca: string;

  @IsNumber({ maxDecimalPlaces: 2 },
    {message: 'O Preço deve ser um número com até 2 casas decimais' })
  @IsNotEmpty({ message: 'O Preço do Produto é Obrigatório' })
  @IsPositive()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer(),
  })
  preco: number;

  @IsNotEmpty({ message: 'O Estoque é obrigatório' })
  @IsInt({ message: 'O Estoque deve ser um Número Inteiro' })
  @Min(0, { message: 'O Estoque não pode ser Negativo' })
  @Column({ type: 'int', nullable: false })
  @ApiProperty()
  estoque: number;

  @IsOptional()
  @Transform(({ value }: TransformFnParams) => (value as string | null)?.trim())
  @Length(3, 1000, {
    message: 'O Link da Foto do Produto deve ter entre 3 a 1000 caracteres',
  })
  @Column({ length: 1000, nullable: true })
  @ApiProperty()
  foto: string;

  @ApiProperty({ type: () => Categoria })
  @ManyToOne(() => Categoria, (categoria: Categoria) => categoria.produto)
  categoria: Categoria;

}