import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from '../entities/produto.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { CategoriaService } from '../../categoria/services/categoria.service';


@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
        relations: {
            categoria: true
        },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: {
        categoria: true
      },
    });

    if (!produto) {
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    }

    return produto;
  }

  async findAllByNome(nome: string): Promise<Produto[]> {
    const produtos = await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true
      },
    });

    if (produtos.length === 0) {
      throw new HttpException(
        'Nenhum Produto foi encontrado com este Nome!',
        HttpStatus.NOT_FOUND,
      );
    }

    return produtos;
  }

  async findAllByMarca(marca: string): Promise<Produto[]> {
    const produtos = await this.produtoRepository.find({
      where: {
        marca: ILike(`%${marca}%`),
      },
      relations: {
        categoria: true
      },
    });

    if (produtos.length === 0) {
      throw new HttpException(
        'Nenhum produto foi encontrado para esta Marca!',
        HttpStatus.NOT_FOUND,
      );
    }

    return produtos;
  }

  async findAllByEstoque(estoque: number): Promise<Produto[]> {
    const produtos = await this.produtoRepository.find({
        where: { estoque },
        relations: {
            categoria: true
        },
    });

    return produtos;
  }

  async create(produto: Produto): Promise<Produto> {
    await this.categoriaService.findById(produto.categoria.id);
    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    if (!produto.id || produto.id <= 0) {
      throw new HttpException(
        'O ID do Produto deve ser Válido!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findById(produto.id);
    await this.categoriaService.findById(produto.categoria.id);

    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return this.produtoRepository.delete(id);
  }
}