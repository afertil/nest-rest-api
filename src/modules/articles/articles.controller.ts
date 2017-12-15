import { Controller, Get, Post, Delete, Body, UseGuards, Param, Request, HttpException, HttpStatus, Put } from '@nestjs/common';

import { ArticlesService } from './articles.service';
import { Article } from './interfaces/article.interface';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('articles')
@UseGuards(RolesGuard)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async index(): Promise<Article[]> {
    return await this.articlesService.findAll();
  }
  
  @Get(':id')
  async show(@Request() req): Promise<Article> {
    const id = req.params.id;
    if (!id) throw new HttpException('ID parameter is missing', HttpStatus.BAD_REQUEST);

    const article = await this.articlesService.findById(id);
    if (!article) throw new HttpException(`The article with the id: ${id} does not exists`, HttpStatus.BAD_REQUEST);

    return article
  }

  @Post()
  async create(@Body() body) {
    if (!body || (body && Object.keys(body).length === 0)) throw new HttpException('Missing informations', HttpStatus.BAD_REQUEST);

    await this.articlesService.create(body);
  }

  @Put(':id')
  async update(@Request() req) {
    const id = req.params.id;
    if (!id) throw new HttpException('ID parameter is missing', HttpStatus.BAD_REQUEST);

    await this.articlesService.update(id, req.body);
  }

  @Delete(':id')
  public async delete(@Request() req) {
      const id = req.params.id;
      if (!id) throw new HttpException('ID parameter is missing', HttpStatus.BAD_REQUEST);

      await this.articlesService.delete(id);
  }
}
