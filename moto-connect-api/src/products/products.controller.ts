import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    body: {
      name: string;
      category: string;
      description?: string;
      city: string;
    },
    @Req() req,
  ) {
    if (req.user.role !== 'admin')
      throw new NotFoundException('No tienes permisos para crear productos');

    return this.productsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any, @Req() req) {
    if (req.user.role !== 'admin')
      throw new NotFoundException(
        'No tienes permisos para actualizar productos',
      );

    const updated = await this.productsService.update(+id, body);
    if (!updated) throw new NotFoundException('Producto no encontrado');
    return updated;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    if (req.user.role !== 'admin')
      throw new NotFoundException('No tienes permisos para eliminar productos');

    const deleted = await this.productsService.remove(+id);
    if (!deleted) throw new NotFoundException('Producto no encontrado');
    return { message: 'Producto eliminado correctamente' };
  }
}
