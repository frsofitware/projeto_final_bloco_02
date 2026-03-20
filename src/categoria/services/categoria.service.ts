import { Categoria } from './../entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ILike, Repository, DeleteResult } from 'typeorm';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find({
        relations: {
        produto: true,
      }});
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({

        where: { id },
        relations: {
        produto: true,
      },
    });

    if (!categoria) {
      throw new HttpException(
        'Categoria não encontrada!',
        HttpStatus.NOT_FOUND,
      );
    }

    return categoria;
  }

  async findAllByDescricao(descricao: string): Promise<Categoria[]> {
    const categorias = await this.categoriaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      }, relations: {
        produto: true,
      },
    });

    if (categorias.length === 0) {
      throw new HttpException(
        'Nenhuma Categoria foi encontrada com esta Descrição!',
        HttpStatus.NOT_FOUND,
      );
    }

    return categorias;
  }

  async create(categoria: Categoria): Promise<Categoria> {
    return this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    if (!categoria.id || categoria.id <= 0) {
      throw new HttpException(
        'O ID da Categoria deve ser Válido!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findById(categoria.id);

    return this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return this.categoriaRepository.delete(id);
  }
  
}