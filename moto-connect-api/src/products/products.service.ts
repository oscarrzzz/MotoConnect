import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Listar todos los productos
  async findAll() {
    return this.prisma.product.findMany();
  }

  // Obtener un producto por ID
  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  // Crear un producto
  async create(data: {
    name: string;
    category: string;
    description?: string;
    city: string;
  }) {
    return this.prisma.product.create({ data });
  }

  // Actualizar un producto por ID
  async update(
    id: number,
    data: {
      name?: string;
      category?: string;
      description?: string;
      city?: string;
    },
  ) {
    try {
      return await this.prisma.product.update({
        where: { id },
        data,
      });
    } catch (error) {
      return null; // Si no existe, retorna null
    }
  }

  // Eliminar un producto por ID
  async remove(id: number) {
    try {
      await this.prisma.product.delete({ where: { id } });
      return true;
    } catch (error) {
      return null; // Si no existe, retorna null
    }
  }
}
