import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';

import { Article } from './interfaces/article.interface';

@Component()
export class ArticlesService {
  constructor(
    @Inject('ArticleModelToken') private readonly ArticleModel: Model<Article>
  ) {}

  async create(article: Article): Promise<Article> {
    const createdArticle = new this.ArticleModel(article);
    return await createdArticle.save();
  }

  async findAll(options?: any): Promise<Article[]> {
    return await this.ArticleModel.find(options).exec();
  }

  async findById(id: string): Promise<Article | null> {
    return await this.ArticleModel.findById(id).exec();
  }

  async findOne(options?: any, fields?: any): Promise<Article | null> {
    return await this.ArticleModel.findOne(options, fields).exec();
  }

  async update(id: number, newValue: Article): Promise<Article | null> {
    return await this.ArticleModel.findByIdAndUpdate(id, newValue).exec();
  }

  async delete(id: number): Promise<Article | null> {
    return await this.ArticleModel.findByIdAndRemove(id).exec();
  }
}