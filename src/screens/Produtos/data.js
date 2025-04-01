export class Produtos {
  constructor(data) {
    this.id = data.id;
    this.nome = data.nome;
    this.preco = data.preco;
    this.categoria = data.categoria;
    this.descricao = data.descricao;
    this.qtd_estoque = data.qtd_estoque;
  }
}


export const products = [
    {
      id: 1,
      name: 'Camiseta Básica',
      price: 49.90,
      category: 'clothes',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      description: 'Camiseta 100% algodão, confortável e estilosa',
      stock: 15
    },
    {
      id: 2,
      name: 'Tênis Casual',
      price: 199.90,
      category: 'shoes',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      description: 'Tênis casual para o dia a dia',
      stock: 8
    },
    {
      id: 3,
      name: 'Bolsa de Couro',
      price: 299.90,
      category: 'bags',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500',
      description: 'Bolsa de couro legítimo',
      stock: 5
    },
    {
      id: 4,
      name: 'Relógio Clássico',
      price: 399.90,
      category: 'watches',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
      description: 'Relógio analógico elegante',
      stock: 3
    },
    {
      id: 5,
      name: 'Chapéu Panamá',
      price: 89.90,
      category: 'hats',
      image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=500',
      description: 'Chapéu estilo panamá',
      stock: 10
    },
    {
      id: 6,
      name: 'Calça Jeans',
      price: 159.90,
      category: 'pants',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
      description: 'Calça jeans tradicional',
      stock: 20
    },
    {
      id: 7,
      name: 'Óculos de Sol',
      price: 199.90,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
      description: 'Óculos de sol estilo aviador',
      stock: 12
    },
    {
      id: 8,
      name: 'Vestido Floral',
      price: 179.90,
      category: 'clothes',
      image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500',
      description: 'Vestido floral para o verão',
      stock: 7
    }
  ];
  