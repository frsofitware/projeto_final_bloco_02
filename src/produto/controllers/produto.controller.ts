import { ProdutoService } from './../services/produto.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Produto } from '../entities/produto.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Produto')
@UseGuards(JwtAuthGuard)
@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findAllByNome(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findAllByNome(nome);
  }

  @Get('/marca/:marca')
  @HttpCode(HttpStatus.OK)
  findAllByMarca(@Param('marca') marca: string): Promise<Produto[]> {
    return this.produtoService.findAllByMarca(marca);
  }

  @Get('/estoque/:estoque')
  @HttpCode(HttpStatus.OK)
  findAllByEstoque(
    @Param('estoque', ParseIntPipe) estoque: number,
  ): Promise<Produto[]> {
    return this.produtoService.findAllByEstoque(estoque);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.delete(id);
  }
}