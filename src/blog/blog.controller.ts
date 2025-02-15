import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request  } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard) // 🔹 Solo usuarios autenticados pueden crear blogs
  async create(@Body() createBlogDto: CreateBlogDto, @Request() req) {
    return this.blogService.create(createBlogDto, req.user);
  }

  @Get('all')
  async findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) // 🔹 Solo el creador puede editar su blog
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto, @Request() req) {
    return this.blogService.update(id, updateBlogDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // 🔹 Solo el creador puede eliminar su blog
  async remove(@Param('id') id: string, @Request() req) {
    return this.blogService.remove(id, req.user);
  }
}
