import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../src/models/Product';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wool-shop';

const sampleProducts = [
  {
    name: 'Móc khóa gấu bông mini',
    slug: 'moc-khoa-gau-bong-mini',
    price: 45000,
    images: [
      'https://picsum.photos/400/400?random=1',
      'https://picsum.photos/400/400?random=2',
      'https://picsum.photos/400/400?random=3'
    ],
    tags: ['móc khóa', 'gấu bông', 'mini', 'handmade'],
    description: 'Móc khóa gấu bông mini được làm thủ công từ len cao cấp, mềm mại và đáng yêu. Kích thước nhỏ gọn, phù hợp làm quà tặng hoặc trang trí túi xách.'
  },
  {
    name: 'Gấu bông len trung bình',
    slug: 'gau-bong-len-trung-binh',
    price: 120000,
    images: [
      'https://picsum.photos/400/400?random=4',
      'https://picsum.photos/400/400?random=5'
    ],
    tags: ['gấu bông', 'len', 'trung bình', 'handmade', 'quà tặng'],
    description: 'Gấu bông len kích thước trung bình, cao khoảng 20cm. Được móc thủ công tỉ mỉ với chất liệu len mềm mại, an toàn cho trẻ em.'
  },
  {
    name: 'Móc khóa hoa tulip',
    slug: 'moc-khoa-hoa-tulip',
    price: 35000,
    images: [
      'https://picsum.photos/400/400?random=6',
      'https://picsum.photos/400/400?random=7'
    ],
    tags: ['móc khóa', 'hoa', 'tulip', 'handmade', 'xinh xắn'],
    description: 'Móc khóa hoa tulip xinh xắn, được móc thủ công từ len nhiều màu sắc. Thiết kế tinh tế, phù hợp làm quà tặng cho bạn gái.'
  },
  {
    name: 'Gấu bông len lớn',
    slug: 'gau-bong-len-lon',
    price: 200000,
    images: [
      'https://picsum.photos/400/400?random=8',
      'https://picsum.photos/400/400?random=9',
      'https://picsum.photos/400/400?random=10'
    ],
    tags: ['gấu bông', 'len', 'lớn', 'handmade', 'quà tặng', 'ôm'],
    description: 'Gấu bông len kích thước lớn, cao khoảng 35cm. Hoàn hảo để ôm và làm bạn đồng hành. Chất liệu len cao cấp, mềm mại và bền đẹp.'
  },
  {
    name: 'Móc khóa cactus mini',
    slug: 'moc-khoa-cactus-mini',
    price: 40000,
    images: [
      'https://picsum.photos/400/400?random=11',
      'https://picsum.photos/400/400?random=12'
    ],
    tags: ['móc khóa', 'cactus', 'mini', 'handmade', 'độc đáo'],
    description: 'Móc khóa cactus mini độc đáo, được móc thủ công với màu xanh tự nhiên. Thiết kế đơn giản nhưng rất dễ thương và bắt mắt.'
  },
  {
    name: 'Bộ móc khóa động vật',
    slug: 'bo-moc-khoa-dong-vat',
    price: 150000,
    images: [
      'https://picsum.photos/400/400?random=13',
      'https://picsum.photos/400/400?random=14',
      'https://picsum.photos/400/400?random=15'
    ],
    tags: ['móc khóa', 'động vật', 'bộ sưu tập', 'handmade', 'quà tặng'],
    description: 'Bộ sưu tập 5 móc khóa động vật đáng yêu gồm: gấu, thỏ, mèo, chó và heo. Mỗi con đều được móc thủ công tỉ mỉ với màu sắc tươi sáng.'
  },
  {
    name: 'Gấu bông len pastel',
    slug: 'gau-bong-len-pastel',
    price: 95000,
    images: [
      'https://picsum.photos/400/400?random=16',
      'https://picsum.photos/400/400?random=17'
    ],
    tags: ['gấu bông', 'len', 'pastel', 'handmade', 'màu nhẹ'],
    description: 'Gấu bông len với tông màu pastel nhẹ nhàng, tạo cảm giác dịu mắt và thư giãn. Kích thước vừa phải, phù hợp trang trí hoặc làm quà.'
  },
  {
    name: 'Móc khóa bánh donut',
    slug: 'moc-khoa-banh-donut',
    price: 38000,
    images: [
      'https://picsum.photos/400/400?random=18',
      'https://picsum.photos/400/400?random=19'
    ],
    tags: ['móc khóa', 'bánh donut', 'đồ ăn', 'handmade', 'ngọt ngào'],
    description: 'Móc khóa bánh donut siêu dễ thương với lớp kem và topping đầy màu sắc. Được móc thủ công tỉ mỉ, mang lại cảm giác vui tươi và ngọt ngào.'
  },
  {
    name: 'Thỏ bông len tai dài',
    slug: 'tho-bong-len-tai-dai',
    price: 110000,
    images: [
      'https://picsum.photos/400/400?random=20',
      'https://picsum.photos/400/400?random=21',
      'https://picsum.photos/400/400?random=22'
    ],
    tags: ['thỏ bông', 'len', 'tai dài', 'handmade', 'dễ thương'],
    description: 'Thỏ bông len với đôi tai dài đáng yêu, được móc thủ công từ len mềm mại. Biểu cảm ngây thơ và dễ thương, phù hợp làm quà tặng cho mọi lứa tuổi.'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${sampleProducts.length} sample products`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
