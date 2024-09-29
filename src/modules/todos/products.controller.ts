import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

let products: Product[] = [
  {
    id: '1',
    title: 'The Legend of Zelda: Breath of the Wild',
    description: 'Um jogo de aventura em mundo aberto ambientado no reino de Hyrule.',
    price: 59.99,
  },
  {
    id: '2',
    title: 'Super Mario Odyssey',
    description: 'Um jogo de plataforma 3D onde Mario viaja por vários mundos para salvar a Princesa Peach.',
    price: 49.99,
  },
  {
    id: '3',
    title: 'God of War',
    description: 'Um jogo de ação e aventura que segue Kratos e seu filho Atreus na mitologia nórdica.',
    price: 39.99,
  },
  {
    id: '4',
    title: 'Red Dead Redemption 2',
    description: 'Um jogo de ação e aventura em mundo aberto ambientado no final dos anos 1800.',
    price: 59.99,
  },
  {
    id: '5',
    title: 'The Witcher 3: Wild Hunt',
    description: 'Um RPG de mundo aberto onde você joga como Geralt de Rivia, um caçador de monstros.',
    price: 29.99,
  },
  {
    id: '6',
    title: 'Minecraft',
    description: 'Um jogo sandbox onde os jogadores podem construir e explorar seus próprios mundos.',
    price: 26.95,
  },
  {
    id: '7',
    title: 'Fortnite',
    description: 'Um jogo de batalha real onde os jogadores lutam para ser o último sobrevivente.',
    price: 0.00,
  },
  {
    id: '8',
    title: 'Cyberpunk 2077',
    description: 'Um RPG de mundo aberto ambientado em um futuro distópico onde os jogadores assumem o papel de V.',
    price: 59.99,
  },
  {
    id: '9',
    title: 'Animal Crossing: New Horizons',
    description: 'Um jogo de simulação de vida onde os jogadores desenvolvem uma ilha deserta em uma comunidade.',
    price: 59.99,
  },
];

@Controller('products')
export class ProductsController {
  constructor() {}

  @Get()
  async index(): Promise<Product[]> {
    return products;
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Product> {
    return products.find((product) => product.id === id);
  }

  @Post()
  async create(@Body() { title, description, price }: { title: string; description: string; price: number }): Promise<Product> {
    const product = {
      id: (products.length + 1).toString(),
      title,
      description,
      price,
    };
    products.push(product);
    return product;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Product>): Promise<Product> {
    products = products.map((product) =>
      product.id === id ? { ...product, ...data } : product,
    );

    return products.find((product) => product.id === id);
  }

  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id') id: string): Promise<string> {
    products = products.filter((product) => product.id !== id);
    return id;
  }
}
