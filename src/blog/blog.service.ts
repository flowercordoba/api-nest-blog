import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {

  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>, 
  ) {}

  async create(createBlogDto: CreateBlogDto, user: Auth): Promise<Blog> {
    const blog = this.blogRepository.create({
      ...createBlogDto,
      creator: user, // 🔹 Guardar el usuario autenticado como creador
    });

    return await this.blogRepository.save(blog);
  }

  async findAll(): Promise<Blog[]> {
    return await this.blogRepository.find({ relations: ['creator'] });
  }


  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { id }, relations: ['creator'] });
    if (!blog) throw new NotFoundException(`Blog con ID ${id} no encontrado`);
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto, user: Auth): Promise<Blog> {
    const blog = await this.findOne(id);

    // 🔹 Validar que solo el creador pueda editar
    if (blog.creator.id !== user.id) {
      throw new NotFoundException('No tienes permiso para editar este blog');
    }

    Object.assign(blog, updateBlogDto);
    return await this.blogRepository.save(blog);
  }
  async remove(id: string, user: Auth): Promise<void> {
    const blog = await this.findOne(id);

    // 🔹 Validar que solo el creador pueda eliminar
    if (blog.creator.id !== user.id) {
      throw new NotFoundException('No tienes permiso para eliminar este blog');
    }

    await this.blogRepository.remove(blog);
  }
}
